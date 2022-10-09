# 工程实践-安全相关
## 1.注入安全
### 1.1 SQL 注入
* 预编译，可以一定程度上防止 SQL 注入，在工程实践中：
  * jdbc 使用 prepareStatement 构建 SQL 语句。
  * MyBatis 的 `#{}` 插值。
* 用户输入预防，不使用用户输入的原始数据进行 SQL 查询，在实践中有如下做法：
  * 格式化用户输入，比如格式化为纯数字/转义后的字符串
  * 校验原始输入，前后端一起校验，规避特殊字符和数据库关键字
* 异常信息脱敏，不返回原始的 SQLException，在实践中：
  * 只记录错误日志，返回给前端的只有统一的`数据库异常`

### 1.2 xml 外部实体注入
xml 的 XXE 外部实体功能强大，可以执行查看系统文件、远程执行代码等高危操作。

解决办法：
* 在解析 xml 前，对 xml 内容进行校验，过滤 `<!ENTITY` 或 `SYSTEM` 字段
* 在使用开源库解析 xml 时尽可能禁用不使用的功能，例如：
  * 禁用 DTD，dom4j 禁用 `disallow-doctype-decl`。
  * 禁用 部分外部实体，dom4j 禁用 `external-general-entities` 和 `external-parameter-entities`。

### 1.3 CLRF 注入
指`回车`和`换行`字符注入，有些协议数据、文件使用这两个特殊字符进行命令分割、内容分割，例如 HTTP。通过在特殊位置插入`回车换行`字符，造成数据不正确的切割，可能执行一些有危害的操作。

解决方法：
* 对外部输入进行编码，对特殊字符进行转义

### 1.4 命令注入
java 中使用
```
System.Runtime.getRuntime().exec(cmd);
```
或者
```
ProcessBuilder pb = new ProcessBuilder(cmd, arg...);
pb.start()
```
在目标机器上执行的系统命令行，这种命令行可能权限很大，注入风险也较高。

解决思路：
* 尽量不在发行版本中携带执行命令行的代码
* 尽量不要使用外部输入作为命令，比如要在命令行中处理文件，那就将文件路径写死或者使用随机生成的名称并在操作时全程只读。
* 如果一定要使用外部输入作为命令，那就转义/校验所有的命令行元字符，例如 shell 就校验 `#&;`,|*?~<>^()[]{}$\`

## 2.XSS
跨站脚本攻击(Cross Site Scripting)，外部输入文本时携带了js脚本内容，让网页在客户端渲染时执行了恶意脚本。

危害比 CRSF 还要大，XSS 甚至可以盗用 cookie

解决思路：
* 对用户输入文本在存储和显示进行编码，转义相关特殊字符，例如 java 中可以使用 org.springframework.web.util.HtmlUtils#htmlEscape(java.lang.String, java.lang.String)
* 使用 Content Security Policy 策略配置，可以限制下载资源来源。
 * 在 http headers 中添加如下配置，限制资源只能来自于本站：
 ```
 Content-Security-Policy: default-src 'self'
 ```
* 防止盗用 cookie
 * 设置 http-only
 * 设置 cookie 有效期

## 3.CRSF
跨站请求伪造(Cross-site request forgery)，通过在外站链接伪造为本站链接，借用存储在用户客户端本地的 cookie 伪装成用户通过链接发送请求。

解决思路：
* 为本站的请求添加 CRSFToken，不存储在 cookie 中
 * 可以添加到 request 参数中
 * 也可以添加到 httpheaders 中
* 后台对更改数据的请求限定为 post，并对 post 请求进行过滤，校验 CRSFToken

## 4.安全加密算法

## 5.安全随机数
