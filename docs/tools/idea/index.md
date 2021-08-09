# IDEA 开发环境随笔
## 1.启动问题
## 2.运行问题
- 运行报 `command line is too long` 错误，无法启动 jvm

  原因是在 dependency 里手动加了过多的额外依赖，IDEA 在启动程序时会把这些依赖放到 java 命令的 classpath 参数中去，造成命令超长。一种常见的解决方法是改变命令行使用 classpath 的方式，改为 JAR 模式：
  ![image](https://user-images.githubusercontent.com/19852729/128659506-5d04205f-043c-4add-b179-35c951e157f6.png)

  
## 3.配置文件
