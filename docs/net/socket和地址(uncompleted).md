# Socket 和地址
## 1.socket 是什么
socket 是操作系统网络通信的标准途径和工具。

服务器通过

`初始化socket` ->`bind socket 到特定的地址和端口` -> `执行 listen 操作` -> `阻塞到 accept 等待客户端请求` 

来使用 socket。

客户端通过

`初始化socket` -> `执行 connect 向服务端绑定的地址和端口发起连接请求`

来使用socket。

当客户端发起的连接请求通过3次握手和服务端建立起 TCP 连接，就可以双向发送字节流了。

## 2.socket 怎么来的
最初由加州伯克利分校的研究人员在 1980s 年代提出，意图屏蔽底层协议栈的区别来实现网络通信。

第一版实现的 socket 就是基于 TCP/IP 协议，最早出现在 Unix 上的 socket 在 BSD 4.2 Unix 内核上实现。

后面 Linux 借鉴 Unix 的思路，也基于 TCP/IP 协议实现了 socket，后续 windows 也跟进加入了 socket，至此 socket 也成为了事实的网络通信标准实现。

## 3.socket 使用的地址是怎样的
POSIX 规范规定了 socket 地址族的格式：
* 由 2 字节表示地址族：常见的有
  * AF_LOCAL：本地地址，用于本地socket通信
  * AF_INET：IPV4
  * AF_INET6：IPV6

* 剩下的部分是各地址族自己的具体实现，比如：
  * AF_INET 中就有一个 16-bit 的端口号和一个 32-bit 的 ip 地址。

