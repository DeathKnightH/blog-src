# 网络编程的发展历史
## 1. TCP/IP
* 分层区别

参考模型 OSI 七层
事实行业标准 TCP/IP 四层

TCP/IP 的网络接口层对应 OSI 的数据链路层和物理层

TCP/IP 的应用层对应 OSI 的应用层，表示层，会话层

其他两层网络层和传输层是一致的

* 为何 TCP/IP 会成为事实标准

OSI 模型制定完成的时间太晚了，直到 1984 才发布，此前就已经有 TCP/IP 了。

1983 年，广泛应用的操作系统 4.2 BSD 发布了网络套接字相关接口的设计与实现，使用的就是 TCP/IP 协议栈，这也为 TCP/IP 成为事实标准添了一把火。

## 2. Linux
* 为什么要讨论 linux

TCP/IP 协议栈的发展离不开 Unix 操作系统的发展，两者相辅相成。

当前最成功的 Unix 继承者就是 linux，包括移动端的 Android，就是一个裁剪过的 linux 系统。

因此 TCP/IP 协议的应用也就绕不开 linux 操作系统。

* linux 怎么来的

unix 发展有 3 条路线：
1.闭源的商用系统，例如 oracle 的 solaris
2.基于分享的研究系统，BSD，Minix
3.完全开源的系统，例如 linux

linux 的出现就是为了创造一个完全开源的 unix 操作系统，借鉴 Minix 的一些思路，实现了 POSIX 标准，最后和 GNU 强强联手，造就了当今服务器领域应用最广的 linux。
