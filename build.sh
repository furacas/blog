#!/bin/bash
set -e
npm install
npm run sync
npm run build
# npm run talk
if [ -n "$(git status -s)" ];then
    git add .
    git config --global user.name "furacas"
    git config --global user.email "gh@yeyu.im"
    git commit -m "update cache"
    git push https://${GITHUB_TOKEN}@github.com/furacas/blog.git -f
fi
 