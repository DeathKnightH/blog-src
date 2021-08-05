# 常用命令
## 打包两个 commit id 之间的修改文件
例如 commit 1 的 id 为 84bbab17，
commit 2 的 id 为 234910f1，
导出 1 到 2 的差异文件，并压缩为一个tar压缩包
```
git diff-tree -r --no-commit-id --name-only 84bbab17 234910f1 | xargs tar -rf file.tar
```
