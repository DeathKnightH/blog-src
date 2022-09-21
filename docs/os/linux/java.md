# java 相关
## 1.`jps` 命令不返回任何结果
查看 `/tmp/hsperfdata_`+`username` 目录是否是和用户名匹配的属组，不匹配就会导致 jps 命令不显示任何结果。
其他可能的情况，[sof](https://stackoverflow.com/questions/3805376/jps-returns-no-output-even-when-java-processes-are-running)

## 2. java.lang.unsatisfiedlinkerror no attach in java.library.path
jre 安装不完全。
* windows 下缺少 `attach.dll`，放到 `%JAVA_HOME%/jre/bin` 目录下
* linux 下缺少 'libattach.so'，放到 `%JAVA_HOME%/jre/lib/amd64` 目录下

