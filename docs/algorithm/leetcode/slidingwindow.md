# 滑动窗口
## 1. 基本思路
滑动窗口算是一种进阶版的双指针方法。适用的前提条件是最终解在集合/数组中是连续的。

首先初始化左右两个指针 `left`/`right`，然后使用嵌套两层循环，外层循环处理每次的结果并让 `right` 向右移动，内层循环向右移动 `left` 来保证`窗口`内的区间满足目标条件。

## 2. 伪代码
```
int left = 0;
int right = 1;
int total = ...;          // 初始化 total
while(right < length){
  计算当前 total 值;
  while(total 不符合目标){
    更新 total 值；
    left ++;
  }
  依据 total 值做相应的计算/判断;
  right ++;
}
```

## 3. 习题
* [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
* [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
* [567. 字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/).
* [76. 最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)
