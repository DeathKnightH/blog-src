# Optional 类
## 1. 解决什么问题？
Java 开发中 null point exception 是一类很恶心的问题，实际开发中经常要在各种方法里写一大堆判断 null 的 if 语句，一旦漏掉某个判断，运行时出现 `NullPointException` 排查起来又很困难。

Optional 类就是 Java 8 为了解决这类问题的一个解决方案。

## 2. 常用 API
* `isPresent()` 判断是否为 null
* `ifPresent(Consumer<T>)` 如果有值则执行 Consumer，否则什么都不做
* `orElse(T)` 如果有值就返回原有值，否则返回指定的值
* `get()` 如果有值就返回原有值，否则就抛出 NoSuchElementException

## 3. 使用注意事项
尽量使用函数式编程，否则 Optional 只是多了一层封装，还是要 if 判断。

错误的用法：
```
public static String getName(User user) {
    Optional<User> oUser = Optional.ofNullable(user);
    if (!oUser.isPresent())
        return "Unknown";
    return oUser.get().getName();
}
```

正确的用法：
```
public static String getName(User user) {
    return Optional.ofNullable(user).map(User::getName).orElse("Unknown");
}
```
