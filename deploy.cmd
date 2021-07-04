call npm run docs:build
cd docs/.vuepress/dist
set timestamp=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%

git init
git add -A
git commit -m "deploy %timestamp%"

git push -f git@github.com:deathknighth/deathknighth.github.io.git master:main