## 参数异常
## SQLException
* Cause: java.sql.SQLException: 无效的列类型: 1111

插入数据库的值为 null，没有指定类型，这个错和具体的 jdbc 实现有关，ojdbc 会报这个错，此时需要在插值处使用 `jdbctype` 属性显式指定类型。例如：
```
SELECT <include refid="columns"/> FROM user WHERE uid=#{uid, jdbcType=INTEGER}
```

指定 `uid` jdbc type 为 `INTEGER`。
