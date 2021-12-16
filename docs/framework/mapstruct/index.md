# MapStruct
MapStruct 是一个自动生成 bean mapper 类的代码生成器。

开源地址：[https://github.com/mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)

官方指导文档十分详细，这里只描述一下实际使用遇到的小问题和需要注意的细节。

## 1. 环境配置
由于 MapStruct 的原理是根据注解和接口/抽象类自动生成实现类代码，所以需要在编译时添加额外的编译插件才能生成代码。比如在 maven 中需要在 <build> 标签里添加mapstruct-processor插件：
```
  <build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.mapstruct</groupId>
                        <artifactId>mapstruct-processor</artifactId>
                        <version>${org.mapstruct.version}</version>
                    </path>
                </annotationProcessorPaths>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 2. expression 写 java 代码
这里有一个小坑，如果 `expression` 返回的是一个已经映射过的对象类型时，mapstruct 不会自动生成对应的映射代码，需要在 `expression` 的表达式里写全整个转换过程代码。

比如：
```
@Mapper(uses = ActivityMapper.class)
public interface ActionMapper{
    @Mapping(target = "activity", expression = "java(someThing.getActivityOther()")
    Action toAction(SomeThing someThing)
}
```

本来是想通过 `getActivityOther()` 返回的对象通过 `ActivityMapper` 和 `Activity` 进行自动映射，但是实际 mapstruct 还不能识别这样的场景，需要手动把表达式写全，即：
```
@Mapper(uses = ActivityMapper.class)
public interface ActionMapper{
    @Mapping(target = "activity", expression = "java(ActivityMapper.INSTANCE.toActivity(someThing.getActivityOther())")
    Action toAction(SomeThing someThing)
}
```

## 3. 映射方法的返回值
查看生成的映射代码，实际返回的目标实例都是 new 出来的，所以返回类型必须为实现类，而不能为 `Interface` 或者 抽象类。

如果一定要返回抽象类或者接口，需要额外写一个工厂方法类用于创建对象，可以参见官方文档的 `Object factories` 部分。
