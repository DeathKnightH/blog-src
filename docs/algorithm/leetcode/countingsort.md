# 计数排序

**基于比较的时间复杂度存在下界** O(nlogn)。

Counting Sort 是一种非基于比较的排序，主要思路是用空间换时间，当集合中整数取值范围不大时可以使用，它的复杂度为Ο(n+k)（其中k是整数的范围）。

## 1. 实现思路

​	适用计数排序需满足以下条件：

* 输入的线性表的元素属于有限偏序集S；

* 设输入的线性表的长度为n，|S|=k（表示集合S中元素的总数目为k），满足 k=O(n)。

​	计数排序的基本思想是对于给定的输入序列中的每一个元素 x，确定该序列中值小于 x 的元素的个数（此处并非比较各元素的大小，而是通过对元素值的计数和计数值的累加来确定）。一旦有了这个信息，就可以将x直接存放到最终的输出序列的正确位置上。



## 2. 代码实现

```
int n = s.length;
int result = new int[n];

int max = 0;
int min = 0;
for(int temp : s){
	max = Math.max(max, temp);
    min = Math.min(min, temp);
}
int k = max - min + 1
int[] countArray = new int[k];
// 计数
for(int temp : s){
	countArray[temp - min] ++;
}
int count = 0
for(int i = 0; i < k; i++){
	count += countArray[i];
	countArray[i] = count;
}

// 排序
for(int i = n - 1; i >= 0; i--){
	countArray[s[i] - min] --;
	int currentIndex = countArray[s[i] - min];
	result[currentIndex] = s[i];
}

```



## 3. 习题

* [[274. H 指数](https://leetcode-cn.com/problems/h-index/)]