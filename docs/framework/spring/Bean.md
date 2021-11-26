# Spring Bean
## 1. 怎么配置
3种方式：
* xml 配置
* 注解配置
* java 配置类

## 2. 作用域
bean 在声明时默认是单例模式的，即整个应用上下文中只有一个实例。实际 bean 的作用域可以在配置时一起声明：
* singleton：单例，默认就是这个。
* prototype：每次调用都是一个新的实例。
* request：HTTP 的每次 Request 请求都会创建一个，仅在当前的 Request 中有效。
* session：每一个来自新 session 的 HTTP 请求都会创建一个，仅在当前 session 中有效。

使用 xml 配置 bean 时配置作用域，写在 `scope` 属性中：
```
<bean id="..." class="..." scope="prototype"></bean>
```

使用注解配置 bean 时配置作用域，可以使用 `@Scope` 注解：
@Bean
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public Person personPrototype() {
    return new Person();
}


## 3. 生命周期
这部分只针对 `singleton` 作用域的 bean，其他作用域 spring 只负责创建 bean。

以这个经典的生命周期图为主线：

## 4. 单例 bean 的线程安全问题
因为 bean 在 IOC 中默认是全局单例的，在多线程应用中会有线程安全问题。一般开发中会采用如下方法解决：
* 使用单例 bean 时尽量保证无状态（即不声明实例变量）。
* 一定要使用实例变量尽量放在 ThreadLocal 中。
* 需要使用多线程的功能尽量自己在代码中 new 对象，自己管理生命周期和共享数据。
