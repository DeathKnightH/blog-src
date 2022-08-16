## 1. 修改 commit
step 1. 打开指定范围的 rebase-todo-list，参数为 一个 commitid 会打开当前 head 至该 commitid 的所有提交记录（不包含）；参数为两个 commitid，会打开范围间的提交记录：
> git rebase -i <hash-commitid>
  
修改文件中的命令，命令选项在文件中有注释。比如要修改 commit message，可以将 `pick` 命令更改为 `reword` 命令。
  
step 2. 保存并关闭编辑器（注意如果是多页签的编辑器如 vscode 需要关闭整个编辑器，单独关闭一个页签不会继续执行命令）
  
step 3. 关闭 rebase-todo-list 文件后，会自动打开需要修改的 commit 文件，依次修改、保存、关闭编辑器即可。
 
step 4. 如果是没有 push 到远程仓库的代码，此时已经可以结束了。
  
如果是已经 push 到远程仓库的代码，一定要改远程仓库已提交的 commit，可以执行 force push，但是注意 rebase 后的 commitid 会改变，如果有其他人也 track 了同一个远程仓库，会导致很多问题，需要谨慎使用:
> git push --force origin remote
