# 查询优化
## 1. 索引
索引是查询优化首选的技术，其他技术多是在建立索引的基础上进行优化。

### 1.1 索引类型
- 按底层实现分类
  - B+ Tree：大多数索引的实现方式。
  - HashTable：
  - R Tree：空间索引
  - 倒排索引：全文索引

- 按存放位置分类
  - 聚簇索引
  - 非聚簇索引

- 按索引字段分类
  - 主（键）索引
  - 二级索引（辅助索引）
### 1.2 创建索引
创建、修改、删除索引的语句。

### 1.3 索引优化
索引要如何创建才能优化查询。

## 2. MySQL 查询优化程序
介绍 MySQL 内置的查询优化程序。

### 2.1 查询优化的工作原理
前面介绍 MySQL 中执行 sql 的工作流程时，提到了在正式执行 sql 前会进行一系列的查询优化，最终生成查询计划。

这里介绍查询优化的工作原理。

### 2.2 EXPLAN 解析查询计划
`EXPLAN` 可以帮助开发者分析当前 SQL 语句是否影响了索引的使用，可以辨别索引的效果，也可以为优化 sql 语句提供指导。

## 3. 选择数据类型
## 4. 选择表存储格式
## 5. 高效加载数据
## 6. 应用层面优化
