# LockSupport
  `LockSupport` 用来创建锁和其他同步类的基本**线程阻塞原语**。
  
  具体而言，调用 `LockSupport.park` 方法会阻塞当前线程。调用 `LockSupport.unpark` 并传入阻塞线程作为参数，可以唤醒阻塞的线程。
  
## 1. 实现细节分析
### 1.1 静态属性和构造函数
  `LockSupport` 内部存储了 `Thread` 类中几个关键属性的偏移地址和一个 Unsafe 类引用:
  ```
    private static final sun.misc.Unsafe UNSAFE;  // Unsafe 类引用
    private static final long parkBlockerOffset;  // Thread 类中 parkBlocker 字段的偏移地址
    private static final long SEED;               // Thread 类中 threadLocalRandomSeed 字段的偏移地址
    private static final long PROBE;              // Thread 类中 threadLocalRandomProbe 字段的偏移地址
    private static final long SECONDARY;          // Thread 类中 threadLocalRandomSecondarySeed 字段的偏移地址
  ```
  
  构造函数为 `private` 修饰，且内部没有调用。
  对外开放的方法均为 `static` 方法，一般使用时不会创建 `LockSupport` 对象，直接通过类名使用 static 方法。
  
### 1.2 park
park 方法有很多变种，用于实现不同场景的 park 功能，但是 park 功能本身还是依赖于 `Unsafe.park`。

调用 `Unsafe.park` 后会阻塞当前线程，直到以下情况之一发生：

* 调用了 `unpark` 函数，释放了该线程的许可。
* 该线程被中断。
* park 设置的限制时间到了。

需要注意这里是阻塞线程，而不是挂起线程，实际效果和 Thread.sleep() 方法类似。

#### 1.2.1 park 方法
```
public static void park();  // 直接调用 Unsafe.park(false, 0L)

public static void park(Object blocker);  // 调用 Unsafe.park(false, 0L) 之前先把 blocker 设置到当前线程的 parkBlocker 字段
```

#### 1.2.2 parkNanos 方法
```
public static void parkNanos(Object blocker, long nanos); // 调用 Unsafe.park(false, nanos) 之前先把 blocker 设置到当前线程的 parkBlocker 字段
```

额外传入一个等待时间，等待时间完会自动解除阻塞。

#### 1.2.3 parkUntil 方法
```
public static void parkUntil(Object blocker, long deadline);  // 调用 Unsafe.park(true, deadline) 之前先把 blocker 设置到当前线程的 parkBlocker 字段
```

额外传入一个指定的时间点，到了指定时间点会自动解除阻塞。

### 1.3 unpark
从方法声明上看：
```
public static void unpark(Thread thread);
```

需要传入指定线程作为参数，如果线程正被 park，则解除阻塞状态；否则让下一次 park 失效。

如果线程还没有启动，不保证有任何效果。

## 2. 使用示例
### 2.1 使用 park/unpark 实现线程同步

### 2.2 中断响应
中断线程后，会退出阻塞。
