# I/O 在日常工作中的应用
## 1. 资源定位
### 1.1 URI 和 URL
URI 全称是统一资源标志符。

URI 有不同的确定唯一资源的实现方式，URL 可以看做用资源定位实现唯一标志的 URI，所以 URL 是 URI 的一个子集。

java 中这两者靠字符串形式来互相转换，具体参考 java.net.URL#toURI 和 java.net.URI#toURL。

### 1.2 绝对路径和相对路径
#### 1.2.1 Windows 系统下
* 绝对路径：

从盘符开始，包含全路径，例如记事本：
> C:\Windows\notepad.exe

* 相对路径：

从当前目录开始，`.` 代指当前目录，`..`表示上层目录，例如当前目录是`C:\` 时，用相对路径表示记事本：
> .\Windows\notepad.exe

例如当前目录是`C:\Windows\` 时,表示同为 C 盘目录下的 `office word`：
> ..\Program Files\Microsoft Office\Office15\WINWORD.EXE

#### 1.2.2 linux 系统下
* 绝对路径：

当前计算机的全路径：
> 

#### 1.2.3 网络


### 1.3 File
### 1.4 Files/Path/FileSystem
jdk 7 新引入的文件处理类，在 nio 包下。

## 2. 读文件
### 2.1 按文件位置
#### 2.1.1 从压缩包中读
* jdk 1.7 之前的写法

ZipFile 读取压缩包，遍历 ZipEntry 读取压缩包内容：
```
ZipFile zip = new ZipFile(file);

```

* jdk 1.7 的写法

创建压缩包的 FileSystem，从 FileSystem 中查找需要读取的文件 path，再用 Flies 工具读取：
```
```

#### 2.1.2 从网络上读

### 2.2 按文件类型分
#### 2.2.1 文本文件
#### 2.2.2 class
#### 2.2.3 XML
#### 2.2.4 properties
#### 2.2.5 yml
#### 2.2.6 Excel
#### 2.2.7 二进制
#### 2.2.8 序列化

## 2. 写文件

## 3. 网络IO
### 3.1 Socket
### 3.2 Datagram
