# 核心知识点
## 1. 事务
### 1.1 ACID
* 原子性：事务被视为不可分割的最基本单元，一个事务中的操作要么全部成功，要么全部失败回滚。
* 一致性：数据库在事务执行前后都处于一致性状态，在一致性状态下，所有事务对同一数据读取的状态是一致的。
* 隔离性：一个事务在提交之前，对其他事务不可见。
* 持久性：针对数据库崩溃的情况，保证事务一旦完成提交，则必须保证执行结果保存在数据库中不丢失。
### 1.2 commit
MySQL 有自动提交配置，默认为 true。

如果不需要自动提交事务，有两种方法：
* 将 `autocommit` 配置设为 false。
* 使用 `START TRANSACTION`/`BEGIN` 语句手动开启事务，使用 `ROLLBACK` 回滚，使用 `COMMIT` 提交。

## 2. 并发一致性问题
非并发环境中，只要满足了原子性，就可以保证事务的一致性。

并发环境下，如果仅满足原子性，会造成以下一致性问题：
### 2.1 丢失修改
### 2.2 读脏数据
### 2.3 不可重复读
### 2.4 幻读

## 3. 锁
解决并发一致性问题，可以利用数据库自带的锁机制。

## 4. 事务隔离级别
由于锁需要自行手动操作，比较繁琐，在实际使用中更常用的是利用事务的隔离级别来处理并发一致性问题。

隔离级别分为 4 种。

### 4.1 Read uncommited 未提交读
### 4.2 Read commited 提交读
### 4.3 Repeatable read 可重复读
### 4.4 Serializable 串行