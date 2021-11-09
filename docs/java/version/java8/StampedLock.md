# StampedLock
## 相较于 ReentrantLock
* ReentrantLock 还是悲观锁实现，语义和 synchronized 关键字一样
* StampedLock 有乐观锁模式
* StampedLock 并不是 ReentrantLock 和 synchronized 的替代，而是一种补充

## 不同的锁适用的场景
* 竞争少： synchronized
* 竞争多但是线程增长能预估： ReentrantLock
* 竞争多且线程增长不可控： StampedLock
