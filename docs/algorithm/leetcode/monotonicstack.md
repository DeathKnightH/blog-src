# 单调栈
  Monotonic stack 是一种特殊的栈，栈中的元素保持单调递增/递减。

  单调栈形式特殊，只用于解决一种典型问题：`下一个更大/更小的元素`。即最终结果只与每次循环的下一个更大/更小的元素有关，其他元素可以忽略/抛弃。

## 1. 基本思路
使用一个栈记录结果，以结果单调递增为例，从后向前遍历输入集合，当前元素 `current` 入栈有两种操作：
* `current < stack.peek()` 当前元素比栈顶小，直接入栈，然后遍历下一个元素。
* `current > stack.peek()` 当前元素比栈顶大，入栈会 `挡住` 栈顶元素，由于问题的特殊性，被 `挡住` 的元素与结果无关，需要循环出栈直到 `current < stack.peek()`，此时入栈 `current`。

完整遍历整个集合后，栈中的元素就是单调递增排列的了（从栈顶至栈底）。

需要注意的细节：
* 重复元素，视情况，大多数情况下要求去重，此时在入栈前先判断 `current` 是否在当前栈中，如果在就忽略，直接进入下一轮。
* 循环数组，有时输入集合是一个环状结构，此时有可能比 `current` 大的元素在前方，需要循环绕一圈回来，解决思路是遍历两遍集合，在一遍遍历结束后接着从头开始遍历。

## 2. 伪代码
```
Stack<Integer> monotonicStack = new Stack<>();
for(int i = array.length - 1; i >= 0; i --){
  int current = array[i];
  if(monotonicStack.contains(curremt)){
    continue;
  }
  while(!stack.isEmpty() && current > stack.peek()){
    stack.pop();
  }
  stack.push(current);
}
```

## 3. 习题

* [496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)
* [503. 下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)
* [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)
* [316. 去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)
