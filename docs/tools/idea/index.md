# IDEA 开发环境随笔
## 1.启动问题
## 2.运行问题
- 运行报 `command line is too long` 错误，无法启动 jvm

  原因是在 dependency 里手动加了过多的额外依赖，IDEA 在启动程序时会把这些依赖放到 java 命令的 classpath 参数中去，造成命令超长。一种常见的解决方法是改变命令行使用 classpath 的方式，改为 JAR 模式：
  ![image](https://user-images.githubusercontent.com/19852729/128659506-5d04205f-043c-4add-b179-35c951e157f6.png)

  
## 3.配置文件
## 4.常用快捷键
以下均为默认快捷键
|快捷键|功能|技巧|
|---|---|---|
|ctrl + F12|查找当前类及其继承的所有成员和方法|使用快捷键后直接输入需要查找的方法名/成员名称即可自动过滤查询|
|ctrl + G|在当前文件里定位指定的行号和列号|
|F2|定位当前文件下一个 error|

## 5. 实用插件
* jclasslib

字节码查看工具。

* Maven Helper

可以更直观地查看依赖树，打开工程的 pom 文件，在编辑视窗的左下角选择 `Dependency Analyzer`。
