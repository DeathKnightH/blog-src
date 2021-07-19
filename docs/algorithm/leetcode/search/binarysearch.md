# 二分查找
## 1. 二分查找基本思路
二分查找需要以一个有序的集合为前提。以下均以升序排列为例。

代码框架，以在 `int` 数组中查询为例：
```
int binarySearch(int[] nums, int target){
  int left = 0;
  int right = nums.length - 1;
  while(left <= right){
    int mid = left + (right - left) / 2;
    int current = nums[mid];
    if(current == target){
      找到target，返回；或者继续查找
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
#### 2.1.1 思路
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

需要注意3个细节：
* while 的退出条件
  * `left < right` 表示退出条件为 
  ```
  left == right:
  ```

  此时最终形成区间为`[right, right]`，`right` 本身还没有检查过，这样需要单独判断 `right` 的值。
  * `left < right` 表示退出条件为
  ```
  left = right + 1;
  ```
  
  此时最终形成区间为 `[right + 1, right]`，这样所有的区间都已经计算过了，不需要额外判断。

* 当 target 不在搜索区间时下一个区间的变化
  * target < current

  当前区间中 mid 本身和其右侧的值均大于 target值，所以 mid 本身和其右侧的均可以抛弃，将下次循环的 `right` 设置为 `mid - 1`。
  * target > current

  当前区间中 mid 本身和其左侧的值均小于 target 值，所以 mid 本身和其左侧的可以抛弃，将下次循环的 `left` 设置为 `mid + 1`。
* 当 `target == mid` 时下一个区间的变化

  因为只需要得到一个确定的 target 的位置，当 `target == mid` 时说明已经找到一个 target 的位置，可以直接返回了。

#### 2.1.2 习题
* [704. 二分查找](https://leetcode-cn.com/problems/binary-search/)

### 2.2 搜索一个 target 的左/右边界
如果一个集合/数组中的元素有重复的，那么可能会找到多个 target，这时候需要确定多个 target 左/右边界的位置。

#### 2.2.1 思路
以左边界为例，
```
int binarySearch(int[] nums, int target){
  int left = 0;
  int right = nums.length - 1;
  while(left <= right){
    int mid = left + (right - left) / 2;
    int current = nums[mid];
    if(current == target){
      right = mid - 1;            // 重点是这里，确保 right + 1 处的值是 target
    }else if(current < target){
      left = mid + 1;
    }else if(current > target){
      right = mid - 1;
    }
  }
  if(left >= nums.length || nums[left] != target){    // 如果 right + 1 越界或者所在位置的值不是 target，说明 target 不在数组中
    return -1;
  }
  return left;
}
```

与无重复元素的查找区别在于遇到 `current == target` 的情况，不会马上返回，而是以此确定下次查找的边界：
* 结果要查 target 的左边界，那么就使 `right = mid - 1`，保证 right + 1 为要找的左边界。
* 结果要查 target 的右边界，那么就使 `left = mid + 1`，保证 left - 1 为要找的右边界。

#### 2.2.2 习题
* [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

### 2.3 搜索一个最接近 target 的值
#### 2.3.1 思路
```
int binarySearch(int[] nums, int target){
  int left = 0;
  int right = nums.length - 1;
  while(left <= right){
    int mid = left + (right - left) / 2;
    int current = nums[mid];
    if(current == target){
      return mid;                 // 相等当然差值最小，可以直接返回
    }else if(current < target){
      left = mid + 1;
    }else if(current > target){
      right = mid - 1;
    }
  }
  
  if(right == -1){
    return left;
  }
  
  if(left == nums.length){
    return right;
  }
  
  return Math.abs(nums[right] - target) > Math.abs(nums[left] - target) ? left : right;
}
```

区别在于最后的判断，因为 target 不在数组中时不能直接返回，需要判断哪个位置的值最接近，而又因为循环退出条件为：
```
left = right + 1;
```

所以：
* 当 right 越界时， left 即为最接近的值；
* 反之当 left 越界时，right 即为最接近的值；
* 都没越界需要比较 left 和 right 处的值得出最接近的值。

#### 2.3.2 习题
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
