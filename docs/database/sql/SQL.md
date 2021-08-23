# SQL 基础
Structured Query Language（SQL，结构化查询语言）又称 ANSI SQL，由 ANSI 标准委员会管理。具体商业应用中每个数据库产品通常都有自己的 SQL 增强实现，比如 oracle 的 PL/SQL，sql server 的 Transact-SQL。

## 1. 语法基础
### 1.1 DDL
Data definition language 数据定义语言。现在常用的数据库设计软件都可以直接导出 DDL 语句，通常不会自己手写 DDL，这里只列举一下常用 DDL 的使用方法，不做深入研究。
#### 数据库
```
CREATE DATABASE test; // 创建名为 test 的数据库
USE test; // 使用名为 test 的数据库
DROP DATABASE test; // 删除名为 test 的数据库
```

#### 表
```
CREATE TABLE testtable(
  column1 datatype1,
  ...
  columnn datatypen
  {,key define}{,index define}
); // 创建名为 testtable 的数据表

DROP TABLE testtable; // 删除名为 testtable 的数据表

ALTER TABLE testtable ADD columnx datatypex; // 修改数据表，增加列
ALTER TABLE testtable DROP COLUMN column1;   // 修改数据表，删除列 column1
```

#### 视图
```
CREATE VIEW testview AS subquery; // 根据子查询 subquery 创建视图 testview
DROP VIEW testview; // 删除视图 testview
```

### 1.2 DML
Data manipulation language 数据操纵语言。日常开发中使用频率最高的 sql，通常说的增删改查都属于 DML。
#### 1.2.1 insert 插入
* 普通插入，将一条记录插入 tablename 表，其中 column1 值为 value1，column2 值为 value2。
```
INSERT INTO tablename(column1, column2)
VALUES(value1, value2);
```

* 将查询结果集直接插入。
```
INSERT INTO tablename(column1, column2)
SELECT col1, col2
FROM table2;
```

#### 1.2.2 update 更新
更新 tablename 表，将其中所有符合 condition 记录的 column1 属性更新为 value1
```
UPDATE tablename
SET column1 = value1
WHERE condition;
```

#### 1.2.3 delete 删除
删除 tablename 表中所有符合 condition 的记录，如果 condition 恒为 true，则删除表的所有记录。
```
DELETE FROM tablename
WHERE condition;
```

还有一个 DDL 语句可以实现删除表的所有记录：
```
TRUNCATE TABLE tablename;
```

#### 1.2.4 select 查询
* 基本查询

查询 tablename 表中的所有数据。
```
SELECT * FROM tablename;
```

也可以不跟 `FROM` 子句，用于直接计算表达式。常用于检查数据库连接，比如：
```
SELECT 1;
```

* 条件查询

可以只查询符合条件的数据。
```
SELECT * FROM tablename 
WHERE condition;
```

`condition` 由逻辑表达式或者子条件组成，各子条件可以由 `NOT`/`AND`/`OR` 来修饰和连接。
不使用括号时，优先级从高到低依次是 `NOT`/`AND`/`OR`。

* 投影查询

可以只查询部分属性(列)，这种操作称为投影。同时列名也可以映射为自定义的名称：
```
SELECT column1 AS col1, column2 AS col2
FROM tablename
WHERE condition;
```

查询 `tablename` 表中符合 `condition` 条件的数据，最后只显示 column1 和 column2 的属性值，同时将 column1 的名称映射为 col1，将 column2 的名称映射为 col2.

* 查询结果排序

查询结果默认是以主键排序的。用户可以使用 `ORDER BY` 子句实现自定义的结果集排序：
```
SELECT id, name, age
FROM person
WHERE id < 100
ORDER BY age;
```

顺序分为升序(ASC) 和降序(DESC)，默认不写就是升序，如果使用降序：
```
SELECT id, name, age
FROM person
WHERE id < 100
ORDER BY age DESC;
```

可以同时对多列属性进行排序，比如有两个列参与排序：
```
SELECT id, name, age, score
FROM person
WHERE id < 100
ORDER BY age DESC, score;
```

先按照 age 倒序排列，age 属性相同时按照 score 正序排列。

* 查询结果分组

使用 `GROUP BY` 子句对结果集进行分组：
```
SELECT age, score, count(*) AS sum
FROM person
WHERE id < 100
GROUP BY age, score
ORDER BY sum;
```

1、`GROUP BY` 在 `WHERE` 后，`ORDER BY` 前。

2、`SELECT` 子句选择的属性必须在 `GROUP BY` 中出现（除汇总函数外，例如 count(*)）。

3、如果分组的属性在某些记录中为 NULL，则 NULL 会单独分组。


* 分页查询

当结果集过大而一次不用使用全部结果集时，可以使用 `LIMIT m OFFSET n` 子句进行手动分页：
```
SELECT id, name, age, score
FROM person
ORDER BY age DESC, score
LIMIT 5 OFFSET 0;
```

每页5条记录，当前取第1页。

* 连接查询
  * 内连接，又称等值连接，只保留两表匹配字段。
  * 左(外)连接，保留左侧表未匹配字段。
  * 右(外)连接，保留右侧表未匹配字段。
  * 全外连接 ，保留所有未匹配字段。
* 笛卡尔积查询

假设有两张表，记录数分别为 M 和 N，将两张表的记录一一组合形成 M*N 行记录的结果集就是笛卡尔积。
```
SELECT * 
FROM students, classes;
```

实际应用中要尽量避免使用笛卡尔积，因为查询结果可能会很大，比如两张超过1万条记录的表进行笛卡尔积查询，结果集超过1亿条。

* 组合查询

使用 `UNION` 关键字可以将两个查询结果组合起来，两个查询结果集分别为 M 行和 N 行，则组合结果有 M + N 行。

使用前提是两个查询结果集列一致。
```
SELECT name,age,score
FROM student1
WHERE age = 10
UNION
SELECT name,age,score
FROM student2
WHERE age = 18
ORDER BY score;
```

组合查询只能有一个 `ORDER BY` 子句，且必须在最后。

默认会去重，如果不去重，需要使用 `UNION ALL` 关键字。

* 子查询

子查询也是查询的一种，结果集只能有 1 列。结果集常用做其他查询的条件/结果的组成部分。
```
SELECT *
FROM student
WHERE classid IN(SELECT classid
                  FROM class
                  WHERE rank > 1)
```

## 2. 存储过程
