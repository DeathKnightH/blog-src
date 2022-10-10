# Fork/Join 框架
## 1.作用
并行分治，将大任务分为小任务并行执行。

主要包含 3 个部分：
* ForkJoinTask 任务对象，包含以下 3 种抽象，一般通过继承实现这 3 种抽象来定义具体的 Fork 任务：
  * RecursiveTask 可递归执行的 ForkJoin 任务，有返回值
  * RecursiveAction  无返回值的 RecursiveTask
  * CountedCompleter  任务执行完成后可以触发一个自定义的钩子函数
* ForkJoinWorkerThread 执行线程
* ForkJoinPool  线程池

## 2.原理和流程
* 分治
* 工作窃取：工作线程之间可以取对方未完成但已提交的任务来执行。
  * ForkJoinPool 中的每个 ForkJoinWorkerThread 都有一个工作队列
  * 这些工作队列用数组保存 `WorkQueue[]`，偶数下标的工作队列用来保存外部提交的任务，不属于任何 ForkJoinWorkerThread
  * 每个工作队列是一个双端队列，同时支持 FIFO 和 LIFO
  * ForkJoinWorkerThread 可以对自己的工作队列 push 和 pop，可以对别的工作队列 poll "窃取"任务
  * 调用 fork 会把划分的子任务 push 到自己的工作队列，当自己的工作队列为空（任务已执行完），就可以调用其他工作队列的 poll 窃取任务来执行

整体流程如下图
![fork/join flow]()

## 3.使用注意事项
* 注意 fork()/compute()/join() 方法的调用顺序。
  * 因为 join() 会挂起当前线程，所以要在所有 fork() 调用完之后再调用 join()。
  * 调用 compute() 会使用当前工作线程直接执行任务，所以调用 compute() 也要在其他任务 fork() 之后，但也要在 join() 之前。
* fork 的任务粒度需要实际测试绝定，通常情况下 1000~10000 个纯计算步骤放一个子任务比较好。
* 如果每个 task 只是简单分为有限数量个子任务，可以用 compute() 执行一个子任务，比 fork() 加入队列再从队列中取出执行要快。嫌麻烦可以直接使用 java.util.concurrent.ForkJoinTask#invokeAll(java.util.concurrent.ForkJoinTask<?>...) 方法就行，，
