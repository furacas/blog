#!/bin/bash
npm install
npm run sync
npm run build
npm run talk
if [ -n "$(git status -s)" ];then
    git add .
    git config --global user.name "beimengyeyu"
    git config --global user.email "beimengyeyu@outlook.com"
    git commit -m "update cache"
    git push https://${GITHUB_TOKEN}@github.com/beimengyeyu/blog.git -f
fi
 