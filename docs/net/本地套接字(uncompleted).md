# 本地套接字
## 1.作用
用于本机进程间通信。

## 2.和网络套接字的区别
地址为本地的文件路径，不是目录，是一个具体的文件。
* 如果文件不存在，那么在第一次 bind 时会生成对应文件。
* 要保证 client 和 server 都对文件有读/写权限，否则通信时可能会报 Permission deny 错误。
* client 一般也要 bind，这是为了确认两者通信使用的文件路径，避免造成额外的麻烦。

## 3.实际应用
docker

kubernetes

都大量使用了本地套接字
