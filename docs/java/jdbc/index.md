null 值处理：
在 ResultSet 调用了 get 方法获取数据后，就可以通过 wasNull() 判断该字段数据是不是 NULL。例如：
```
  ResultSet rs;
  ...
  rs.getString(index);
  if(rs.wasNull){
    // 处理 null 值
  }

```
