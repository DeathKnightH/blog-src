# LRU 算法
## 0. 概念
LRU（Least Recently Used）是一种常见的缓存淘汰策略，即淘汰`最近最少使用`的部分。

常用于各类缓存场景，例如 ecache、redis。

## 1. 算法描述
对外暴露以下接口：
```
class LRUCache {
    // 构造时传入缓存容量
    public LRUCache(int capacity) {

    }
    
    // 随机取，key 不存在缓存中就返回 -1
    public int get(int key) {

    }
    
    // 随机存，如果 key 存在缓存中则刷新其 value 值
    public void put(int key, int value) {

    }
}
```

由于是 LRU 算法，所以当缓存中 key 的数量达到容量上限时，再放入新的 key，就会先删除缓存中最近最少使用的 key，再将新 key 存入。

## 2. 算法设计
分析算法要求：

1、get 接口需要快速的随机读取。

2、LRU 策略要求内部元素按照最近使用时序排序，这样容量满了之后能很方便地删除最久未使用的元素。

3、每次取元素都要将对应元素更新为最近使用，综合2/3两点，需要在头尾位置快速删除、添加元素。

Hash 表可以快速随机读取，而双向链表可以保证元素有序排列的同时能快速在头尾删除、添加元素。两者结合就是 LRU 算法的核心，在 Java 中与之对应的就是 `LinkedHashMap`。

## 3. 算法实现
### 3.1 手搓轮子
### 3.2 使用现有类库的 LinkedHashMap
