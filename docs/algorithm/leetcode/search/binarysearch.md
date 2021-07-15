# 二分查找
## 1. 二分查找基本思路
以在 `int` 数组中查询为例
```
int binarySearch(int[] nums, int target){
  int left = 0;
  int right = 右边界;
  while(满足的左右区间条件){
    int mid = left + (right - left) / 2;
    int current = nums[mid];
    if(current == target){
      找到target。。。
    }else if(current < target){
      重置 left
    }else if(current > target){
      重置 right
    }
  }
  return 结果或者异常;
}
```

## 2. 实现细节
### 2.1 搜索确定的一个 target
```
int binarySearch(int[] nums, int target){
  int left = 0;
  int right = nums.length - 1;
  while(left <= right){
    int mid = left + (right - left) / 2;
    int current = nums[mid];
    if(current == target){
      return mid;
    }else if(current < target){
      left = mid + 1;
    }else if(current > target){
      right = mid - 1;
    }
  }
  return -1;
}
```

### 2.2 搜索一个 target 的左边界
### 2.3 搜索一个 target 的右边界
### 2.4 搜索一个最接近 target 的值
#### 2.4.1 思路
#### 2.4.2 习题
* [1818. 绝对差值和](https://leetcode-cn.com/problems/minimum-absolute-sum-difference/)

## 3.小技巧
### 3.1 防止数值溢出
  在计算 mid 时使用：
```
mid = left + (right - left) / 2; // 实际值还是 (left + right) / 2
```

  可以防止 `left + right` 值过大，超过变量可表示的范围，带来不可预知的结果。

### 3.2 多用 else if 帮助理清思路
  在每次循环中分块时，如果思路还不够清晰，建议只使用 `if` 和 `else if` 列举所有情况，不用 `else` 语句简化。
  
  等到完全理清思路再用 `else` 进行简化。
