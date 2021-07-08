# Happens-Before 原则
为保证程序有序性，JVM 定义了 Happens-Before 原则。

要特别注意，这里的有序性并不是实际执行的时间顺序，而是前面操作产生的结果对于后面的操作可见。

## 1. 八大原则
### 1.1 Single Thread (单一线程原则)
在一个线程内，在程序中前面的操作 `happens-before` 于后面的操作。

需要特别注意这里有序的是执行结果，如果两个语句没有任何关联，有可能发生指令重排，这时实际执行顺序不一定是代码书写顺序。比如在一个线程内：
```
int a = 5; // 1
int b = 6; // 2
```

最终的结果肯定是 `a` 被赋值为 5，`b` 被赋值为 6。但是实际执行顺序不一定是先 1 后 2，可能是先 2 后 1。再看一个例子：
```
int a = 5;     // 1
int b = a + 1; // 2
```

最终结果也是 `a` 被赋值为 5，`b` 被赋值为 6。因为 1 的执行结果要对 2 可见，所以这里 1 一定是先于 2 实际执行的。

JVM在单个线程内部要维护类似严格串行的语义，如果多个操作之间有先后依赖关系，则不允许对这些操作进行重排序。

### 1.2 Monitor Lock (管程锁定原则)
对一个锁的 unlock 操作 `happens-before` 于后续对同一个锁的 lock 操作。

### 1.3 Volatile Variable (volatile 变量原则)
对一个 volatile 变量的写操作 `happens-before` 于后续对这个变量的读操作。

### 1.4 Thread Start (线程启动原则)
Thread 对象的 start() 方法调用 `happens-before` 于任何发生在这个 Thread 内的操作。

把调用 start() 的线程视为主线程，主线程在 start() 方法调用前的操作结果对 Thread 对象都是可见的。

### 1.5 Thread Termination (线程终止原则)
Thread 对象内的任何操作都 `happens-before` 于对同一个 Thread 的终止检测。

终止检测，例如 Thread.join() 方法返回，又例如 Thread.isAlive() 返回 false。

### 1.6 Thread Interruption (线程中断原则)
调用 Thread 对象的 interrupt() 方法 `happens-before` 于该 Thread 对象的代码检测到中断事件发生。

如何算检测到中断事件发生？
* 抛出 InterruptedException
* 调用 interrupted() 方法
* 调用 isInterrupted() 方法

### 1.7 Finalizer (对象终结原则)
对象的初始化完成 `happens-before` 于同一个对象的 finalize() 方法调用。

### 1.8 Transitivity (传递性原则)
以上 `happens-before` 原则具有传递性，如有3个操作 A、B、C，根据以上原则判断有 A `happens-before` B，且 B `happens-before` C，则一定有 A `happens-before` C。

## 2. 实例分析
