# 回溯算法
  回溯算法是基于 DFS 的一种**穷举**算法，DFS 一般在搜索到 target 后返回，而回溯算法会遍历所有元素。

## 1. 基本思路
  核心思路是内嵌在循环中的递归调用，其实这也是 `n叉树` 遍历的核心思路。主要需要关注一下几个点：
  * 退出条件 满足目标或者已经无法继续遍历的条件。
  * 路径 一条符合退出条件的决策树路径。
  * 当前选择集合 当前层能够选择的元素集合。
  
## 2. 伪代码
 ```
 public void backTrace(int[] set, LinkedList trace， 结果集){
  if(达到退出条件){
    将 trace 添加到结果集;
    return;
  }
  for(int temp : set){
    trace.addLast(temp);             // 选择当前元素
    backTrace(set, trace, 结果集);    // 进行下一层选择
    trace.removeLast();               // 取消选择当前元素，等下次循环进行同层元素的下一个选择
  }
 }
 
 ```
 
## 3. 习题
* [46. 全排列](https://leetcode-cn.com/problems/permutations/)
* [17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)
* [51. N 皇后](https://leetcode-cn.com/problems/n-queens/)
* [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)
