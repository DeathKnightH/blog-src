# 快速幂
快速幂算法（Binary Exponentiation）又称平方法、二进制取幂法。是一个在 O(logn) 时间内快速计算 `a^n` 的小技巧。

## 1. 原理
以计算 a 的 n 次方为例，
> a^n = a * a * a *...* a

由于幂的性质：
> a^(b+c) = a^b * a^c
> a^2b = a^b * a^b = (a^b)^2

二进制取幂法初见雏形了，计算 `a^2b`时乘法计算的次数由 `2b` 次减少为 `b + 1`次。进一步泛化算法，把任意整数幂用二进制表示例如：
> a^13 = a^8 * a^4 * a^1 //因为 13 用 2 进制表示为 1101

公式化就是：
> 将 n 转换为等价的二进制 $(n_0n_1...n_k-1n_k)_2$


$$
a^n = a^{n_02^0} \times a^{n_12^1} \times a^{n_22^2} \times ... \times a^{n_k2^k}
$$

## 2. Java 实现
* 递归实现：
```
// 由于结果太大，使用取 10^9 + 7 的模
public int binPow(int a, int n){
  if(n == 0){
    return 1;
  }
  int sub = binPow(a, n / 2);
  if((n % 2) != 0){
    return (int)((long)sub * (long)sub * a) % 1000000007;
  }else{
    return (int)((long)sub * (long)sub) % 1000000007;
  }
}
```

* 非递归实现：
```
// 由于结果太大，使用取 10^9 + 7 的模
public int binPow(int a, int n){
  int result = 1;
  while(n > 0){
    if((b & 1) == 1){
      result = (int)((long)result * a) % 1000000007;
    }
    a = (int)((long)a * a) % 1000000007;
    n >> 1;
  }
  return result;
}
```


## 3. 应用
### 3.1 矩阵乘快速幂
* 552. 学生出勤记录 II
* 1137. 第 N 个泰波那契数
