# ReDos 攻击
全称是 Regular Expressions Denial of Service（正则表达式拒绝服务），是一种 Dos 攻击方法，通过有缺陷的正则表达式，攻击者可以构造特殊的字符串来大量消耗服务器资源，造成服务中断。

## 1. 攻击原理和危害
各语言/类库实现正则表达式引擎的算法大多是 NFA 的回溯式搜索算法，攻击者可以构造一个最坏情况的字符串让搜索算法的时间复杂度达到指数级，这样几十个字符也能造成大量的重复计算，从而消耗服务器资源。

ReDos 攻击会造成服务器满载（CPU占用100），此时服务器没有更多资源处理其他正常请求，造成服务中断。

## 2. 防御措施
* 降低正则复杂度，尽量少用分组
* 使用正则表达式时限制用户输入长度
* 避免高危写法
  * 包含替换的重复性分组，例如：
    * (\d|\d|\d)+
  * 包含自我重复的重复性分组，例如：
    * (\d+)+
    * (\d*)*
* 写完正则使用工具检测，例如：
  * [ReScue](https://2bdenny.github.io/ReScue/)
  * SDL Regex Fuzzer
* OpenJDK 也正在尝试提供更安全的正则引擎，但是至今（JDK 16）还没有结果：[JDK-8260688](https://bugs.openjdk.java.net/browse/JDK-8260688)

## 3. 实例
遇到过这样的写法：
> ^([a-zA-Z0-9]+)+$

输入一串连续相同的字符串时，例如：`aaaaaaaaaa`，这个正则需要枚举 `2^10` 种可能，连续相同的子字符串越长，枚举数量呈指数级上升。
> ^([a-zA-Z0-9]+.)+$

与上个正则类似。
