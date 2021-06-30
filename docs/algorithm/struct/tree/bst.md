# 二叉搜索树
## 1 基本性质
* 对于任意结点 x，假设 y 是 x 的左子树的一个结点，则 y.key <= x.key。如果 y 是 x 右子树的一个结点，则 y.key >= x.key。
* 在一个有 n 个节点的二叉搜索树中，动态集合的基本操作平均运行时间是Θ(lgn)

## 2 遍历
使用中序遍历可以按从小到大的顺序输出一颗二叉搜索树。

```
INORDER-TREE-WALK(x)
if x != NIL
	INORDER-TREE-WALK(x.left)
	print x.key
	INORDER-TREE-WALK(x.right)
```

