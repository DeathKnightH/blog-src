# 排序算法
排序算法用于解决一类排序问题：

输入：一个 n 个数的序列<a1, a2, a3, ... , an>，这个序列是一个线性的数据结构，通常是一个 n 元数组。

输出： 输入序列的一个重排序<b1, b2, b3, ... , bn>，满足 b1 <= b2 <= b3 <= ... <= bn。

## 1. 性质
### 1.1 稳定性
指序列中`相等`的元素经过排序后相对顺序是否发生改变。

* 稳定排序：基数排序、计数排序、插入排序、冒泡排序、归并排序。
* 不稳定排序：选择排序、堆排序、快速排序。

### 1.2 时间复杂度
分为最优时间复杂度、最坏时间复杂度、平均时间复杂度。

平时一般重点考虑平均复杂度和最坏复杂度。基于比较的排序算法平均时间复杂度的下限为 O(nlogn)，类似计数排序这样的非比较的排序可以突破下限。

需要考虑以下4种场景：
* Random：序列中的元素随机排列。
* Nearly Sorted：接近有序，大部分元素有序，少部分随机。
* Reversed：所有元素完全倒序排列。
* Few Unique：大量重复元素。

### 1.3 空间复杂度
排序算法的空间复杂度通常来自于辅助存储的空间。

## 2. 经典排序算法
### 2.1 [冒泡排序（Bubble Sort）](./BubbleSort.md)
### 2.2 [选择排序（Selection Sort）](./SelectionSort.md)
### 2.3 [插入排序（Insertion Sort）](./InsertionSort.md)
### 2.4 [希尔排序（Shell Sort）](./ShellSort.md)
### 2.5 [归并排序（Merge Sort）](./MergeSort.md)
### 2.6 [堆排序（Heap Sort）](./HeapSort.md)
### 2.7 [快速排序（Quick Sort）](./QuickSort.md)
### 2.8 [计数排序（Counting Sort）](./CountingSort.md)
### 2.9 [基数排序（Radix Sort）](./RadixSort.md)
