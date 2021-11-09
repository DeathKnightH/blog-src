# 虚拟机修改
## 1. 仅针对 Hotspot 虚拟机
Oracle-Sun Hotspot 虚拟机是应用范围最广的虚拟机，是 OracleJDK 和 OpenJDK 中默认的 jvm。

Java 8 这项改动仅针对 Oracle-Sun Hotspot 虚拟机，其他虚拟机如 Oralce JRockit(被 Oracle收购后已停止发展，停留在 JDK 1.6)， IBM J9 没有影响。

## 2. 移除了 PermGen Space
PermGen Space 即 Permanent Generation Space，俗称永久代。

Hotspot 虚拟机中内存区域在 JDK 8 之前存在 3 块区域：新生代、老年代、永久代。永久代存储的是方法区和各种常量池，但是需要注意 Java 7 开始字符串常量池移到了**堆**中。

JDK 8 移除了永久代，改用 Metaspace 替代。Metaspace 又称元空间，使用本地内存来存储类元数据，这和 JRockit/J9 类似。需要注意 Java 8 的 Hotspot 字符串常量池依旧在**堆**中。

## 3. 虚拟机参数修改
- 移除了 PermGen 相关参数：
```
PermGen
MaxPermSize
```
如果在虚拟机启动时继续使用这两个参数会被忽略并告警。

+ 新增了 Metaspace 相关参数：
```
MaxMetaspaceSize
```
元空间大小会随实际情况动态变动，如果不设置 MaxMetaspaceSize，则最大容量取决于操作系统可用虚拟内存大小。
