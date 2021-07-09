# 摩尔投票算法
Boyer-Moore Majority Vote 算法，中文称多数投票算法、摩尔投票算法，是一种用来寻找一组元素中占多数元素的`常数级`空间复杂度算法，也是处理数据流的一种典型算法。

算法基本思想是：
* 每一轮投票从集合中删除两个互不相同的元素，直到集合为空或者集合元素全部相等。
* 如果集合为空，则不存在主要元素。
* 如果剩下元素全部相等，则剩下元素可能为主要元素。

## 1. 算法实现思路
根据基本思想，算法实现思路如下：

1、维护两个变量，一个为候选主要元素 `candidate`，另一个为该主要元素出现的次数 `count`；其中 `candidate` 初始为任意值，`count` 初始为 0。

2、遍历所有元素，遍历到任意元素 x 时：
* 如果 count = 0，则 candidate = x，否则不改变 candidate。
* 如果 x == candidate，则 count += 1，否则 count -= 1。

3、遍历结束，如果该集合中存在主要元素，则 `candidate` 为主要元素；否则 `candidate` 为任意元素。

## 2. 伪代码表示
```
m = x;
i = 0;
for n in Array
  if i == 0;
    m = n;
    i = 1;
  else if m == x;
    i = i + 1;
  else
    i = i - 1;
return m;
```


## 3. 习题
* [面试题 17.10. 主要元素](https://leetcode-cn.com/problems/find-majority-element-lcci/)
