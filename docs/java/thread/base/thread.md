# Thread 基础
## 1. 线程使用方式/构造一个线程有几种方式
* 继承 Thread 类
  * 使用方便，自身就是一个线程，可以直接使用。
  * 因为 java 不支持多继承，所有这样无法继承其他类。
* 实现 Runnable 接口 
  * 构造灵活。
  * 没有返回值。
  * 不是真正意义上的一个线程，最终使用时还是通过 Thread 类来调用。
* 实现 Callable 接口
  * 构造灵活。
  * 有返回值。
  * 不是真正意义上的一个线程，最终使用时还是通过 Thread 类来调用。

## 2. 守护线程
JVM 中线程分为两类
* 普通线程
* 守护线程

守护线程属于非必要线程，相当于后台无关紧要的辅助程序，因此当所有非守护线程都结束时，守护线程都会直接被丢弃（kill）。

调用 Thread 对象的
```
setDaemon(true)
```

方法可以将一个 Thread 设置为守护线程，但是因为守护线程的推出非常直接（不会执行finally块，也不会执行回卷栈，而是直接退出），如果守护线程中有类似I/O这样的有关对外操作时会很危险，所以要谨慎使用守护线程，尽量在实现一些不重要的辅助功能时使用守护线程，例如清理无效缓存等。

一个 JVM 在启动时创建的线程中，除了主线程（main 方法所在的线程），其他都是守护线程（垃圾回收线程等）。

## 3. 线程中断
线程结束有两种情况，
* 一是线程任务执行完毕之后自动结束，
* 二是线程执行过程中抛出异常而结束。

线程中断就是利用了这两种情况。

### 3.1 InterruptedException
调用线程的 interrupt() 方法，可以中断在阻塞/等待状态的线程，抛出 InterruptedException，但是不能中断因 I/O 阻塞或者因锁阻塞的线程。

### 3.2 interrupted()
在自定义线程任务时，通过在循环或者其他长耗时的任务中插入 interrupted() 判断来检测线程是否中断来通过 return/抛异常 来及时中断长耗时任务。

同时外部通过调用线程的 interrupt() 将线程状态设置为中断，使 interrupted() 方法返回 true。
例如：
```
public class ThreadExample extends Thread{
  @Override
  public void run(){
    while(!interrupted()){ // 判断线程状态，中断就跳出循环
     // do somthing
    }
    System.out.println("Thread exit");
  }
}
```

```
public static void main(String[] args){
  Thread test = new ThreadExample();
  test.start();
  test.interrupt();
}
```


## 4. 线程间协作
当一个线程的运行依赖于其他线程的结果，此时简单的做法可以利用线程间协作的写法。

### join()
假设有两个线程 a 和 b；

在 a 中调用 b.join() 会使 a 线程 **挂起** ，等到 b 线程执行完毕才会唤醒 a 线程。

### wait()/notify()/notifyAll()
### await()/signal()/signalAll()
