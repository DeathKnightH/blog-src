## 参数异常
## SQLException
* Cause: java.sql.SQLException: 无效的列类型: 1111

插入数据库的值为 null，没有指定类型，这个错和具体的 jdbc 实现有关。

比如 oracle 的 ojdbc 会报这个错，因为 null 会被转换为 jdbctype.OTHER，此时有两种解决方法：
1、在插值处使用 `jdbctype` 属性显式指定类型。例如：
```
SELECT <include refid="columns"/> FROM user WHERE uid=#{uid, jdbcType=INTEGER}
```

指定 `uid` jdbc type 为 `INTEGER`。

2、在全局的 settings 中设置 `jdbcTypeForNull` 配置项：
```
<settings>
  <setting name="jdbcTypeForNull" value="BLOB"/>
</settings>
```

以上两种方法，优先级 1 > 2，特定插值的设置会覆盖全局配置。
