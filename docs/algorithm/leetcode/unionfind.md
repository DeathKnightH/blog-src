# 并查集
Union Find 常用于动态处理**不相交**集合的查询与合并，也就是动态连通性问题。典型应用是最小生成树算法。

不相交：意思是多个集合/元素互不关联，典型的例子是图中不连通的点。

Union Find 就是给不连通的点连通成一个图。

## 1. 基本思路
并查集的核心思路是实现两个 API ：
* connected(x, y)   查找 `x` 和 `y` 是否连通
* union(x, y)       将 `x` 和 `y` 连通起来

## 2. 伪代码
基本实现
```
// parent[x] 就是 x 的父节点
T[] parentArray;

// 连通分量
count;

// 构造并查集，初始情况下每个元素的父节点就是自己
constructor(n){
  count = n;
  for i in n
    parent[i] = i;
}

// 查询 x 所属的根节点
find(x){
  T p = parent[x];
  while(p != parent[p]){
    p = parent[p];
  }
  return p;
}

// 连通 x 和 y
union(x, y){
  T xp = find(x);
  T yp = find(y);
  if(xp != yp){
    parent[xp] = yp;
  }
  count --;
}

// 判断是否连通
connected(x, y){
  return find(x) == find(y);
}

// 查询当前连通分量
count(){
  return count;
}

```

优化结构，修改 `find(x)` 使每次查找时自动进行路径压缩，把树的高度全部变为常数（2）：
```
...
// 查询 x 所属的根节点
find(x){
  if(x != parent[x]){
    parent[x] = find(x);
  }
  return parent[x];
}
...
```

## 3. 习题
