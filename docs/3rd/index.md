# 第三方开源软件使用问题记录

## 0. 
## 1. 前端
## 2. 后端

### 2.1 Apache Common Configuration2
`AbstractConfiguration` 默认使用的是 `DisabledListDelimiterHandler`，即不启用定界符，遇到类似：
```
MY_CONFIG = test1, test2, test3
```
这样的以特定字符分隔的配置项，会直接读取为一整个字符串。

以此配置项为例：
```
# chart colors
colors.pie = #FF0000, #00FF00, #0000FF
```

需要在 Configuration 对象实例中显示地指定定界符：
```
Parameters params = new Parameters();
FileBasedConfigurationBuilder<Configuration> builder =
    new FileBasedConfigurationBuilder<Configuration>(PropertiesConfiguration.class)
    .configure(params.properties()
        .setFileName("usergui.properties")
        .setListDelimiterHandler(new DefaultListDelimiterHandler(','));
Configuration config = builder.getConfiguration();
List<Object> colorList = config.getList("colors.pie");
```
