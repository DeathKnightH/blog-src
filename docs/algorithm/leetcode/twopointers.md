# 双指针
多用于线性数据结构，总的来说使用两个指针分别表示两个位置的算法思想都可以叫双指针。

这里只总结两种比较典型的双指针。

## 1. 常见思路
### 1.1 链表里的双指针
常见于单链表中，双指针的一个记录左区间，另一个记录右区间，可以用一次遍历和常数级空间复杂度完成特定区间的链表截取。
例如：
* [19.删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) 使用间隔 N 个结点的两个指针 `l` 和 `r`，当 `r` 到达链表尾部时， `l` 就是倒数第 N 个结点。


另一种思路是 **快慢指针**， 通过两个指针不同遍历步长，可以一次遍历就完成某些操作。
例如：
* [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/) 使用两个步长不一样的指针 `slow` 和 `fast`，`slow` 每次遍历 1 个结点，`fast` 每次遍历 2 个结点，当 `fast` 到达链表尾部时，`slow` 正好处于中间结点。

### 1.2 相向交替移动的两个指针
1、初始化两个指针 `l` 和 `r`，其中 `l` 指向数组开头，`r` 指向数组结尾。

2、`l` 向右移动，`r` 向左移动，交替进行。移动过程中不回头。

3、直到 `l` 和 `r` 相遇，或者达到预期目标。

## 2.习题
* [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
* [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
* [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)
