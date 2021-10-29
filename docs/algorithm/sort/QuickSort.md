# 快速排序

## 1. 原理

大致分为两个步骤：

1、将当前序列分为 A 和 B 两个子序列，并保证 A 中所有元素均小于 B 中所有元素。

2、对 A 和 B 分别再进行步骤 1，迭代直至整个序列有序。



## 2. 性质

| 性质           |          | 描述                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| 稳定性         | 不稳定   |                                                              |
| 最坏时间复杂度 | O(n^2)   | 1、内层子序列一次排序需要left指针和right指针相遇，时间复杂度为O(n)<br />2、快排的分治次数可以类比为遍历二叉树的高度，最坏情况下二叉树退化为链表，因此分治的次数最坏为 N，总体时间复杂度为 O(N^2)<br />3、最坏情况下，每次选择的基准都是当前序列的最值，导致每次分治只能排序1个数（即当前基准数）需要分治 N 次。 |
| 最好时间复杂度 | O(nlogn) |                                                              |
| 平均时间复杂度 | O(nlogn) |                                                              |
| 空间复杂度     | O(logn)  | 虽然一次分治的排序只需要 1 个额外空间存储交换时的临时元素，但是递归需要至少 logn 深度的栈空间来实现，迭代写法的集合也需要同时记录至少 logn 个 index 数据。 |

## 3.伪代码

递归版：

```java
// start 表示当前序列起点，end表示当前序列终点
public void quickSort(int[] source, int start, int end){
    int stand = source[start]; 	// 选取合适的比较标准，一般可以选择第一个元素，或者优化一下，选择 第一个元素/最后一个元素/中间一个元素 这三者的中位数
    int left = start + 1;		// 左指针，用于迭代小于等于基准的元素，由于上面将第一个元素作为基准元素，所以从 start + 1 开始
    int right = end;			// 右指针，用于迭代比基准大的元素
    while(left <= right){
        while(source[left] > stand && left <= right){ 	// 只比较一个指针所指元素的大小
            swap(source, left, right);					// 只要左指针指向的元素比基准大就和右指针处的元素互换，这样就可以保证右侧一定比基准大
        	right --;									// 内部循环只移动右指针，保证内循环结束时右指针右侧都是比基准大的值，同时当前左指针处元素一定小于基准
        }
        left ++;				// 在外层循环移动左指针
    }
    // 跳出循环时 right 等于内层循环时的 left ,并且内层循环保证 left 是一定小于等于基准而且 right + 1 一定大于基准，因此可以直接 swap 当前 right 和基准元素
    swap(source, start, right);	// 将基准值换到序列中间，right 即是基准分割点
    if(right > start){	// 如果左侧序列长度大于 1，表示还需要继续排列
        quickSort(source, start, right - 1);
    }else if(right < end){// 如果右侧序列长度大于 1，表示还需要排列
        quickSort(source, right + 1, end);
    }
    // 左右两侧都不需要排列时直接结束
}
```



非递归版：

```java
public void quickSort(int[] source){
    Stack<Integer> rangeStack = new Stack<>();	// 非递归就需要用一个集合记录未排序子序列的start和end
    rangeStack.push(0);
    rangeStack.push(source.length - 1);
    while(!rangeStack.isEmpty()){ // 集合不为空时表示还有未完成排序的子序列
        int end = rangeStack.pop();
        int start = rangeStack.pop();
        int left = start + 1;
        int right = end;
        int stand = source[start];	// 选取基准，这里还是以选取第一个元素为例
        while(left <= right){
        	while(source[left] > stand && left <= right){ 	
            	swap(source, left, right);					
        		right --;									
        	}
        	left ++;				
    	}
    	swap(source, start, right);
    	if(right > start){	// 如果左侧序列长度大于 1，表示还需要继续排列
        	rangeStack.push(start);
            rangeStack.push(right - 1);
    	}else if(right < end){// 如果右侧序列长度大于 1，表示还需要排列
        	rangeStack.push(right + 1);
            rangeStack.push(end);
    	}
    // 左右两侧都不需要排列时直接进行下一次排序
    }
    
}
```

