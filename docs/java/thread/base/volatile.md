# volatile 关键字
## 1. 实现原理
volatile 关键字主要有两个作用，**防止指令重排**和**保证变量可见性**。

### 1.1 保证可见性的原理
一句话概括：通过内存栅格（Memory Barrier）实现。
参考资料：[volatile内存屏障及实现原理分析(JMM和MESI)](https://juejin.cn/post/6876395693854949389)

CPU层面有三种内存栅格：
* Load Barrier
* Store Barrier
* Full Barrier

通过查看汇编代码，可以看到在对 volatile 修饰的变量进行写操作时，多了一个 lock 前缀的指令。
这个 lock 前缀的指令相对于一个完全的内存屏障指令，这个指令有两个效果：
* 将当前处理器缓存里缓存变量数据的缓存行（Cache Line）写回主存。
* 使其他缓存里对应的缓存行失效，需要重新从主存读取。

### 1.2 防止重排的原理
还是通过内存栅格（Memory Barrier）实现。
不过这里要提到的是编译器层面的内存栅格（上一节主要是处理器层面的内存栅格）。
JMM 层面的内存栅格分为四种：

| Memory Barrier | 作用                                                | 插入位置          |
| -------------- | --------------------------------------------------- | ----------------- |
| StoreStore     | 禁止上方普通写和下方 volatile 写重排                | volatile 写操作前 |
| StoreLoad      | 禁止上方 volatile 写和下方可能的 volatile 读/写重排 | volatile 写操作后 |
| LoadLoad       | 禁止下方所有的普通读和上方的 volatile 读重排        | volatile 读操作后 |
| LoadStore      | 禁止下方所有普通写和上方的 volatile 读重排          | volatile 读操作后 |

如上的4种 Memory Barrier 同时也保证了 Happens-Before 原则中关于 volatile 的原则：
[对一个 volatile 变量的写操作 happens-before 于后续对这个 volatile 变量的读操作](./happensbefore.md)

## 2. 应用场景
要正确使用`volatile`关键字要满足3个条件：
* 对当前变量的写操作不依赖当前变量值。
* 该变量没有包含在具有其他变量的不变式中。
* 该变量的状态独立于其他内容。

### 2.1 一次性安全发布
保证类似：
```
Instance something = new Instance();
```

这样new对象并赋值的操作线程安全，防止未初始化的对象被赋值，即防止初始化操作和赋值操作重排。
常用于单例模式的双重检查写法。

### 2.2 实现简单读-写锁
用 volatile 修饰变量，用 synchronized 锁变量写操作，但是不对读操作加锁。
```
volatile int count = 0;

private void increase(){
	synchronized(this){
		count ++;
	}
}

private int getCount(){
	return count;
}
```
适用于读多，写少的多线程场景。

### 2.3 独立观察
类似一个简单的观察者模式，一个线程用于更新 volatile 变量，其他线程实时观察 volatile 变量的值。
一个线程只写，其他线程只读。

### 2.4 volatile bean
线程安全的简单 java bean，所有类成员都用 volatile 修饰，只包含基本的 get/set 方法。
