# 网络工具
## 1.ping
声呐探测，探测网络连通性。

## 2.ifconfig
显示当前系统的网络设备。

## 3.netstat
显示当前系统的网络连接状态。

会显示所有 IPv4 的 TCP，IPv6 的 TCP/UDP/UNIX 套接字。

## 4.lsof
可以找出哪个进程在使用某个文件/ip/端口

## 5.tcpdump
抓包工具

可以使用 `-i` 指定网卡：
```
tcpdump -i <网卡名>
```

可以使用 `host` 过滤主机，也可以同时加上 `src` 过滤从 `host` 发出的数据:
```
tcpdump src host <hostname>
```

可以使用 `-w` 输出到 pcap 文件，供 wireshark 等图形化工具分析：
```
tcpdump -i <网卡名> -w xx.pcap
```

可以使用 `-l` 行缓冲将抓包的数据传递给其他工具进行处理：
```
tcpdump -i <网卡名> | grep ''
```
