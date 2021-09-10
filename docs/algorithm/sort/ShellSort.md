# 希尔排序
希尔排序（Shell Sort）也称为缩小增量排序，是一种改进的[插入排序](./InsertionSort.md)。以它的发明者 Donald Shell 命名。

## 1. 原理
对不相邻的元素进行比较和移动：
1、将原序列分为自身元素间距相同的若干子序列。比如：
> [1,2,3,4,5,6,7,8,9] 分为 [1,4,7]/[2,5,8]/[3,6,9] 这3个子序列

2、对这些子序列分别执行插入排序。

3、减少每个子序列中各元素间的间距。

4、重复以上过程直至间距减少为 1，此时排序完成。

## 2.性质
|性质||描述|
|---|---|---|
|稳定性|不稳定|因为是分组排序的，不能保证相等元素的最终顺序|
|最坏时间复杂度|O(n^2)|最坏情况间距为1，退化为直接插入排序|
|最好时间复杂度|O(n)|完全有序的序列只需要扫描一次全序列就可以完成排序|
|平均时间复杂度|O(n^3/2)|希尔排序的时间复杂度与分组间距有关，通常采用每次间距除以3来计算所以是 $n^{3/2}$|
|空间复杂度|O(1)|可以只用 1 个额外空间存储交换时的临时元素，某些特殊情况甚至可以不使用额外空间|

## 3. Java 实现
```
    public void shellSort(int[] array){
        int n = array.length;
        int step = 1;
        while(step < n/3){
            step = step * 3 + 1;
        }
        // 外层循环每次除以3来减少间距直到1
        while(step >= 1){
            insertionSort(array, step);
            step /= 3;
        }
    }
    
    // 对每个分组进行插入排序
    private void insertionSort(int[] array, int step){
        for(int i = step; i < array.length; ++i){
            int temp = array[i];
            int j;
            for(j = i; j >= step && temp < array[j- step]; j -= step){
                array[j] = array[j- step];
            }
            array[j] = temp;
        }
    }
```
