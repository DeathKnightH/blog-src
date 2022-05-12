# ReentrantLock
## 1. 内部结构
ReentrantLock 没有直接继承 AbstractQueuedSynchronizer，而是通过组合的方式在内部声明了一个 Sync，由这个 Sync 继承 AQS 来实现同步器的功能。
### 1.1 内部类
* Sync 继承自 AbstractQueuedSynchronizer 
* NonFairSync 非公平同步器，继承自 Sync
* FairSync 公平同步器，继承自 Sync

## 2. 核心函数
### 2.1 lock()
### 2.2 unlock()

## 3. 使用示例
[配合 condition 使用的示例](https://leetcode.cn/problems/design-bounded-blocking-queue/)
