# 冒泡排序
冒泡排序（Bubble Sort）是一种简单的排序算法，在执行过程中，较小（大）的元素像'气泡'一样'浮'到序列顶端，所以称为冒泡排序。

## 1. 原理
每次比较相邻两个元素，如果前面的元素与后面的元素不满足排序条件，就将相邻的两个元素互换。直到一次扫描没有元素需要互换，排序就完成了。

最坏情况下，冒泡排序需要扫描 `n - 1` 遍序列才能完成排序。

## 2. 性质
|性质||描述|
|---|---|---|
|稳定性|稳定||
|最坏时间复杂度|O(n^2)|最坏情况需要执行 (n - 1)*n/2 次交换操作|
|最好时间复杂度|O(n)|完全有序的序列只需要扫描一次全序列就可以完成排序|
|平均时间复杂度|O(n^2)||
|空间复杂度|O(1)|可以只用 1 个额外空间存储交换时的临时元素，某些特殊情况甚至可以不使用额外空间|

## 3. 伪代码
```
Input:一个包含n个可排序元素的序列 A[n]。
Output:把输入序列按非递减排序的序列 A[n]。
Method:
flag <- true
while flag
  flag <- false
  for i <- 0 to n - 1
    if A[i] > A[i + 1]
      flag <- true
      Swap A[i] And A[i + 1]
```

## 4. Java实现
```
public void bubbleSort(int[] array){
  boolean sortFlag = true;
  while(sortFlag){
    sortFlag = false;
    for(int i = 0; i < array.length; ++i){
      if(array[i] > array[i +1]){
        sortFlag = true;
        int temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
  }
}
```
