#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 1. 生成静态文件 (打包)
npm run build

# 2. 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# 3. 初始化 git 并强制推送到 gh-pages 分支
git init
git add -A
git commit -m 'deploy'

# ⚠️ 注意：下面这行要换成你自己的仓库地址
# 格式为: git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
git push -f https://github.com/AshenoneZJX/AshenoneZJX.github.io.git main:gh-pages

cd -