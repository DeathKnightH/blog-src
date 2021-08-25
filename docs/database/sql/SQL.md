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

## 2. 存储程序
Stored Program 是一种存储对象，功能和高级语言编写的程序类似，封装了一系列的 SQL 操作，有的可以被调用、有的可以被触发。

*ps:由于存储程序大多依赖于具体数据库实现，这里仅以 MySQL 为例进行描述。*

### 2.1 复合语句
编写存储程序常用到复合语句，这种语句包含多条 SQL 语句，同时还可以使用逻辑判断/条件语句/循环/变量，每个语句由分号 `;` 结束。

整体的复合语句由 `BEGIN` 开始，`END;` 结束。

特别的，如果使用MySQL客户端命令行编写复合语句，由于 `;` 同时也是客户端的默认分隔符，可以使用 `delimiter` 命令将分隔符先临时改为其他符号，在编写完复合语句后再改回来，以包含在存储过程中的复合语句为例：
```
delimiter $
CREATE PROCEDURE test()
BEGIN
  SELECT ...... ;
  SELECT ...... ;
END$
delimiter ;
```

### 2.2 存储函数
Stored Function 可以看做用户自定义的函数，创建/修改存储函数需要有管理权限。

存储函数不能修改数据，只能包含查询语句和计算过程。基本语法如下:
```
CREATE FUNCTION test([param_list])
  RETURN type
  routine_stmt # 复合语句
```

存储函数有且只能有一个返回值。要返回多个值，要么在一个查询语句中调用多个存储函数，要么使用存储过程。

调用存储函数和使用系统内建函数一样（如果和内建函数同名，需要在前面加数据库限定名），直接在表达式中使用。

### 2.3 存储过程
Stored procedure 可以看做一组预编译的 SQL 集合，SQL 能做的操作，存储过程基本都能做。

存储过程不包含 RETURN 子句，基本语法如下：
```
CREATE FUNCTION test([param_list])
  routine_stmt # 复合语句
  
CALL test([param_list]); # 调用存储过程
```

存储过程的参数分为3种类型：
* `IN` 默认类型，传入参数，存储过程可以把这个参数作为变量使用，也可以在过程中修改此参数，但是修改对调用者不可见。
* `OUT` 传出参数，存储过程可以通过 `SET` 子句赋值给这些变量，而调用者可以在过程返回后，可以使用这些参数获取返回值。
* `INOUT`顾名思义，同时作为传入和传出参数，类似代码中的引用传递。

与存储函数的区别：
||返回值|参数|能否修改数据库中的数据|调用方式|
|---|---|---|---|---|
|存储函数|用RETURN子句返回，只能有1个返回值|只有 `IN` 参数|不能|直接在表达式中使用，和内建函数一样|
|存储过程|通过 `OUT` 或 `INOUT` 类型参数返回，可以有多个|可以有 `IN`/`OUT`/`INOUT`等 3 种参数|能|必须使用 `CALL` 子句调用|

### 2.4 触发器
Trigger 可以看做和特定表关联的存储过程，其中定义的内容会在执行特定表的 `INSERT`/`DELETE`/`UPDATE` 语句时被自动激活，激活时机可以设置在语句执行前或者执行后。

定义触发器时需要显式指定触发它的语句类型和触发时机，基本语法如下：
```
CREATE TRIGGER trigger_test
  {BEFORE | AFTER}
  {INSERT | UPDATE | DELETE}
  ON table_name             # 关联表
  FOR EACH ROW trigger_stmt # 触发器内容
```

在触发器内容体内可以使用 `NEW` 限定名代指 `INSERT` 或 `UPDATE` 操作中被插入或修改的新行数据，用 `NEW.column` 表示该行的某一个属性。

相同的，可以使用 `OLD` 限定名代指 `DELETE` 或 `UPDATE` 操作中被删除或修改的旧行数据，用 `OLD.column` 表示该行的某个属性。

需要注意的是触发器的权限属于特定表，需要拥有对应表的 `TRIGGER` 权限才能创建/删除触发器。

### 2.5 事件
MySQL 有内置的事件调度器，可以拥有定时执行一系列的数据库操作。默认是不会启用的，要使用事件调度器执行事件需要先设置配置项：
```
SET GLOBAL event_scheduler = ON;
```

事件定义由计划时间和事件内容组成，基本语法如下：
```
CREATE EVENT event_name
  ON SCHEDULE {AT datetime | EVERY expr interval [STARTS datetime] [ENDS datetime]}
  DO event_stmt
```

例如，每4小时清理历史记录表中超过一天的记录：
```
CREATE EVENT expire_web_history
  ON SCHEDULE EVERY 4 HOUR
  DO
    DELETE FROM web_history
    WHERE last_visit < CURRENT_TIMESTAMP - INTERVAL 1 DAY;
```
