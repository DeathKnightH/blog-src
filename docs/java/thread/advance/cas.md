# CAS
## 1. CAS 的优势
CAS 全称为 `Compare-And-Swap`，意思是比较交换，java 中依靠 Unsafe 类的 3 个 native 方法实现，而这些 native 方法又依赖于具体操作系统，最终依赖于硬件的 CAS 指令。

CAS 操作是一种无锁的原子操作，又被称为乐观锁。在大多数情况（竞争不激烈）下，性能优于重量级锁（悲观锁），因此在 JDK 的 concurrent 包中可以看到各种使用 CAS 的同步操作。
例如 AQS 中更新 state 的值，线程池中更新 worker 线程数量，ConcurrentHashMap 中更新 sizeCtl 的值、putVal 遇到数组位置为空时会先尝试 CAS 把元素放入等。

## 2. CAS 的问题
### 2.1 ABA
这是由于 CAS 操作先要 Compare，如果一个值一开始是 `A`，修改一次后变成了 `B`，再修改一次又变成了 `A`，那么此时使用 CAS 操作检查时会认为值没有修改过。

通常的解决思路是版本号或者时间戳，即用一个每次操作都单调递增/单调递减的值来标识变量是否改变过。

JDK 中也有解决方案， `AtomicStampedReference` 类，此类中将要修改的对象 Reference 和标志 Stamp 封装成一个 Pair，对这个 Pair 整体进行 CAS 操作，Stamp 可由用户自定义为一个固定增长的值，这样就可以防止 ABA 问题。

### 2.2 自旋 CAS 时间开销大
如果自旋 CAS 长时间不成功，会占用 CPU 的资源，可能给 CPU 带来很大的执行开销。
两种优化思路：
* pause 指令，CPU 为自旋锁专门设计了 pause 指令， CAS 失败时不会马上进行重试，而是会 pause 一小段时间再重试。
  另外 pause 指令还会减少并行的 load 指令，由此减少因内存顺序冲突（Memory Order Violation）引起的 CPU流水线清空（CPU Pipeline Flush）。
* 限制自旋次数，或者干脆不自旋，CAS 失败直接返回。例如 JVM 实现中的偏向锁和轻量级锁。

## 3. Unsafe 类
  Unsafe 类位于 sun.misc 包下，类中方法都是直接访问内存、系统资源的方法，错误地使用 Unsafe 类会造成更严重的后果，所以使用 Unsafe 类是受限的。
  
  该类的构造函数为 private 修饰，且是单例的，而获取单例的方法 `getUnsafe()` 中有关于调用方类加载器的检查，如果调用方不是 BootstrapClassLoader(启动类加载器) 加载的类就会直接抛 SecurityException，这也是防止 JDK 以外的类误用 Unsafe类。
  
  Unsafe 类中基于 CAS 提供的方法有很多，但是最终调用的都是这 3 个 native 方法：
  * compareAndSwapObject
  * compareAndSwapInt
  * compareAndSwapLong
  
  这 3 个方法的参数列表都类似：
  * 第一个参数为要 CAS 的变量所属的对象/数组；
  * 第二个参数为该变量在所属的对象/数组中的所处的相对位置 offset；
  * 第三个参数为 compare 的对照值；
  * 第四个参数为 swap 的目标值。

## 4. Atomic 类
在 `java.util.concurrent.atomic` 包下有12个原子类。大致可以分为4类：
### 4.1 基本类型
* AtomicBoolean
* AtomicInteger
* AtomicLong

共性是内部用一个 volatile 变量记录当前值，使用 CAS 进行更新。

### 4.2 数组
* AtomicIntegerArray
* AtomicLongArray
* AtomicReferenceArray

因为 array 类型无法使用 volatile 修饰，所以使用的是 Unsafe 类的 getXXXVolatile() 的方法，通过元素在 array 对象中的偏移量使用 volatile read 的语义直接从主存中获取元素值。
  
### 4.3 引用类型
* AtomicReference 
  内部使用一个 volatile 变量存储当前引用，直接使用 CAS 修改。
* AtomicStampedReference
  内部构造一个 Pair 封装引用和 stamp，再对 Pair 使用 CAS 修改， stamp 为 int，通常是自定义的版本号。
* AtomicMarkableReference
  内部构造一个 Pair 封装引用和 mark，再对 Pair 使用 CAS 修改，mark 为 boolean，通常为引用的状态标志。

### 4.4 对象字段修改
基于反射，原子性地修改对象内部的字段。
* AtomicIntegerFieldUpdater 更新 int 字段
* AtomicLongFieldUpdater 更新 long 字段
* AtomicReferenceFieldUpdater 更新引用字段

这三个类对应要修改的字段是有严格要求的：
* 不能是 static 变量
* 不能是 final 变量
* 对字段的访问权限（public/protected/default/private）和要修改的对象一致
* 字段一定要是用 volatile 修饰的
