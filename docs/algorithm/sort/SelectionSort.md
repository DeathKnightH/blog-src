# 选择排序
选择排序（Selection Sort）是一种简单直观的排序算法。每次扫描都会寻找最小（大）的元素，将其'选择'出来，所以叫做选择排序。

## 1. 原理
第 i 轮扫描会寻找序列中第 i 小（大）的元素，将这个元素与数组第 i 个位置上的元素交换，这样可以把空间复杂度降到 O(1)。

## 2. 性质
|性质||描述|
|---|---|---|
|稳定性|不稳定|交换操作时不会比较两个元素的大小，所以是不稳定的|
|最坏时间复杂度|O(n^2)|最坏情况需要执行 (n - 1)*n/2 次比较操作|
|最好时间复杂度|O(n^2)|完全有序的序列也需要执行 (n - 1)*n/2 次比较操作|
|平均时间复杂度|O(n^2)||
|空间复杂度|O(1)|可以只用 1 个额外空间存储交换时的临时元素，某些特殊情况甚至可以不使用额外空间|

可以通过额外的代码实现稳定的选择排序，在交换前比较两个元素即可，相等时不交换就是稳定的算法。

## 3. 伪代码
```
Input:一个包含n个可排序元素的序列 A[n]。
Output:把输入序列按非递减排序的序列 A[n]。
Method:
for i <- 0 to n - 1
  itemp <- i
  for j <- 0 to n - 1
    if A[j] < A[itemp]
      item <- j
      Swap A[i] And A[itemp]    // 这样是不稳定的算法，如果在这里 swap 前先判断 A[i] 和 A[itemp] 的值，相等时不交换，那么算法就是稳定的。
```

## 4. Java 实现
稳定版：
```
public void selectionSort(int[] array){
  for(int i = 0; i < array.length; ++i){
    int temp = i;
    for(int j = i + 1; j < array.length; ++j){
      if(array[j] < array[temp]){
        temp = j;
      }
    }
    
    // 先判断是否相等，可以让排序成为稳定算法
    if(array[temp] != array[i]){
      int change = array[i];
      array[i] = array[temp];
      array[temp] = change;
    }
  }
}
```
