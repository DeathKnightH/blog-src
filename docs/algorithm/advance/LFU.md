# LFU 算法
## 0. 概念
LFU(Least Frequently Used)算法，也是一种常用的缓存淘汰算法，意为淘汰`使用次数最少`的部分，如果使用次数相同，则淘汰其中`最近最少使用`的部分。

可见 LFU 是在 LRU 的基础上增加了使用次数的比较。

## 1. 算法描述
算法对外暴露的接口与 LRU 算法相似：
```
class LFUCache {
    // 构造时传入 cache 容量
    public LFUCache(int capacity) {

    }
    
    // 随机取，如果 key 在  cache 中不存在则返回 -1
    public int get(int key) {

    }
    
    // 存入 key-value，如果 key 在 cache 中存在则更新对应的 value，否则新增。新增时保证元素总量不超过容量
    public void put(int key, int value) {

    }
}
```

## 2. 算法设计
看上去只是比 LRU 多了一个使用次数的比较，但是需要考虑的问题多了不少：

1、每次都要从最少使用次数开始删除，因此需要维护一个当前 cache 内最少使用次数的计数器。

2、访问/更新元素都会增加对应 key 的访问次数，要能快速地获取、更新使用次数，因此需要一个 Hash 表存储 key 和 使用次数的映射。

3、需要能通过最少使用次数的值找到对应 key，而且可能找到的是一系列使用次数相同的 key，这些 key 要按使用次序排列，方便二次过滤，因此需要为相同使用次数的 key 维护一个按使用时序排列的的双向链表。

4、当然对于最基本的 get/set 功能，还需要维护一个 hash 表用于存储 key-value。
