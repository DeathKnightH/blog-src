# MVCC
Muti-Version Concurrency Control，多版本并发控制，主流的RDBMS例如 Oracle/PostgreSQL/Microsoft SQL Server 都提供了 MVCC 能力。

在 MySQL 中 InnoDB/Falcon/Archive 等支持事务的引擎都使用了 MVCC。

## 1. 基本概念
### 1.1 锁定读（Locking Reads）
会读取数据的最新版本，因此又称当前读（current reads），锁定读会对数据加锁：
* `Select ... lock in share mode`：加 `S` 锁，和 `X` 锁互斥。但是不排斥其他 `S` 锁。
* `Select ... for update`、`insert`、`update`、`delete`：加 `X` 锁，排斥其他所有锁。

### 1.2 快照读（snapshot reads）
会读取数据的快照，即当前时间点之前所有提交的事务。

所有不加锁的 `select` 查询都是快照读。

## 2. 解决的问题
MVCC 的目的是减少锁的使用，同时保证事务的隔离性，主要解决以下问题：
* 解决读写之间的阻塞，提升并发事务的效率。
* 降低死锁的概率。
* 解决快照读的问题。

## 3. 基本原理
实现 MVCC 的基本思路就是通过数据行的多个版本管理来实现并发控制，简单来说就是保存数据的历史版本，通过版本号决定数据是否显示。

InnoDB 对 MVCC 的实现依赖于**隐藏字段**、**undo 日志**、**Read View**。

这三者配合，再加上使用 `Read commited` 或者 `Repeatable read` 隔离级别，就可以实现 MVCC。 

### 3.1 隐藏字段
* db_row_id:6 byte，隐藏的自增行 ID，当建表时没有显示指定主键索引的话，InnoDB 会使用这个隐藏字段来创建默认的[主键索引](./index.md)。
* db_trx_id:6 byte，最后一个修改该行的事务的 ID。创建行/修改行都会记录。
* db_roll_ptr:7 byte，回滚指针，指向这行记录的 Undo log 信息。

### 3.2 Undo log
[Undo log](./MySQL_Log.md) 保存了所有的事务操作，行数据的快照保存在 undo segment 中。

`db_roll_ptr` 指针会把该数据行的所有快照记录通过链表结构串联起来，每一个当前行的指针指向上一个版本的行数据快照。

### 3.3 Read View 与可见性算法
`Read View` 保存了当前事务开启时所有活跃（还未提交）的事务列表。为了实现 MVCC 而不是简单的把 Read View 中所有的事务均认定为不可见，需要一种可见性算法来计算各事务间的数据可见性。

这里需要用到 `Read View` 中记录的几个重要的属性：
* `trx_ids`：当前正在活跃（还未提交）的事务 ID 合集。
* `low_limit_id`：活跃事务中最大的事务 ID。
* `up_limit_id`：活跃事务中最小的事务 ID。
* `creator_trx_id`：创建这个 `Read View` 的事务 ID。

假设当前事务的 ID 为 `trx_id`，按以下顺序判断：
1、 `trx_id` < `up_limit_id`：说明 `trx_id` 发生在所有活跃事务创建之前，所以当前行对 `trx_id` 事务可见。
2、 `trx_id` >= `low_limit_id`：说明 `trx_id` 发生在所有活跃事务创建之后，所以当前行对 `trx_id` 事务不可见。
3、 判断 `trx_id` 是否在 `trx_ids` 集合中，如果在，说明当前事务还未提交，当前行不可见。如果不在，说明当前事务已提交，当前行可见。
