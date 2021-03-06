# 计数排序
计数排序（Counting Sort）是一种基于`非比较`的具有线性时间复杂度的排序算法。

计数排序高效的前提是元素的值域（基数）较小。

## 1. 工作原理
使用一个额外的数组 `C[i]`，其中第 i 个元素是待排序序列中排序值等于 i 的个数。

工作流程大致分为以下3步：
* 遍历序列，计数每个元素出现的次数，放入数组 `C[i]`
* 遍历数组 `C[i]`，计算前缀和。
* 根据前缀和，遍历原序列重新构造一个数组

如果原序列中的元素本身就是整形，后两步可以简化为直接按出现次数输出一个新的整形序列，不需要计算前缀和。

## 2. 性质
|性质||描述|
|---|---|---|
|稳定性|稳定|稳定性来自于工作流程的第三步，输出最终排序序列时还是会按原序列的相对顺序遍历一遍，用前缀和确定相同一组元素的起始位置，但是一组相同元素内部的相对位置没有变化|
|最坏时间复杂度|O(n + w)||
|最好时间复杂度|O(n + w)||
|平均时间复杂度|O(n + w)|w是值域大小，各需遍历原序列和值域数组有限次数|
|空间复杂度|O(n + w)|需要一个和原序列大小相同的新序列，以及一个满足值域大小（w）的数组用于计数|

## 3. 伪代码
通用场景：
```
public Object[] countingSort(Object[] source){
  // 先找出最大值和最小值
  int max = Arrays.stream(source).max(comparator).getAsInt();
  int min = Arrays.stream(source).min(comparator).getAsInt();
  int n = max - min + 1;
  int[] counting = new int[n];      // 构造计数用的数组
  
  // 计数
  for(Object temp : source){
    counting[temp.key - min] ++;    // 通过与 min 的偏移量在counting数组中计数
  }
  
  // 计算前缀和
  for(int i = 1; i < n; i ++){
    counting[i] += counting[i - 1];
  }
  
  // 构造有序的结果序列
  int[] result = new int[source.length];
  Arrays.fill(result, inf);         // 数组元素初始化为范围外的值
  for(int i = 0; i < source.length; i ++){
    int temp = source[i];
    int tempIndex = counting[temp - min];
    if(result[tempIndex] != inf){
      tempIndex ++;
    }
    result[tempIndex] = temp;
    counting[temp - min] = tempIndex;
  }
  
  return result;
}
```

整形序列场景：
```
public int[] countingSort(int[] source){
  // 先找出最大值和最小值
  int max = Arrays.stream(source).max().getAsInt();
  int min = Arrays.stream(source).min().getAsInt();
  int n = max - min + 1;
  int[] counting = new int[n];      // 构造计数用的数组
  
  // 计数
  for(Object temp : source){
    counting[temp.key - min] ++;    // 通过与 min 的偏移量在counting数组中计数
  }
  
  // 直接根据计数数组输出结果，不需要计算前缀和
  int[] result = new int[source.length];
  int currentIndex = 0;
  for(int i = 0; i < n; i++){
    int temp = counting[i];
    while(temp > 0){
      result[currentIndex] = i;
      currentIndex ++;
      temp --;
    }
  }
}
```

## 4. 优化细节
* 第一遍遍历时可以记录最小值和最大值，并将最小值作为数组的起点，相对 index 为 0，方便构造尽可能小的计数数组。

## 5. 实例
* [274.H 指数](https://leetcode-cn.com/problems/h-index/) ，没有实际排序，只是用到了计数排序的思想
* [912.排序数组](https://leetcode-cn.com/problems/sort-an-array/)
