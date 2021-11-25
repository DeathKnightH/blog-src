# 归并排序
## 1. 原理
归并排序（merge sort）采用了分治的思想，整个流程大概可以描述为以下3步：
1、将当前序列分为两个子序列
2、对子序列进行归并排序
3、合并两个子序列

其中最关键的是第3步，需要保证两个有序的子序列合并后仍然是有序的。

## 2. 性质
| 性质           |          | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| 稳定性         | 稳定   | 因为实现排序的是合并操作，只要保证合并时前后两个序列的相对顺序就能保证稳定了|
| 最坏时间复杂度 | O(nlogn) | 时间复杂度均为 O(nlogn)，因为无论什么情况归并排序总是二分的，就像一颗二叉树，实际外层循环的次数是树的高度，即 logn，内层循环因为合并需要遍历一遍整个序列|，所以合计就是 O(nlogn)
| 最好时间复杂度 | O(nlogn) |                                                              |
| 平均时间复杂度 | O(nlogn) |                                                              |
| 空间复杂度     | O(n)     | 虽然一次分治的排序只需要 1 个额外空间存储交换时的临时元素，但是递归需要至少 logn 深度的栈空间来实现，迭代写法的集合也需要同时记录至少 logn 个 index 数据。 |

## 3. java 实现