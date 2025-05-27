#!/bin/bash

# 配置远程仓库地址和分支名称
REPO_URL="https://git.baijiashilian.com/fz/zhlz/frontend/zhlz-frontend.git"  # 替换为你的远程仓库地址
BRANCH_NAME="jx-jw"  # 替换为你的分支名称

# 临时目录名称
TEMP_DIR="temp_repo"

# 检查临时目录是否存在
if [ -d "$TEMP_DIR" ]; then
  # 如果目录存在，进入目录并拉取最新代码
  echo "目录 $TEMP_DIR 已存在，拉取最新代码..."
  cd $TEMP_DIR
  git pull origin $BRANCH_NAME
else
  # 如果目录不存在，克隆仓库
  echo "正在克隆远程仓库 $REPO_URL 的分支 $BRANCH_NAME..."
  git clone -b $BRANCH_NAME $REPO_URL $TEMP_DIR
  cd $TEMP_DIR
fi

# 安装依赖
npm config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/
pnpm install --no-frozen-lockfile
npm run build
echo "正在安装依赖..."
npm install  # 如果是 npm 项目
# yarn install  # 如果是 yarn 项目

# 打包项目
echo "正在打包项目..."
npm run build  # 如果是 npm 项目
# yarn build  # 如果是 yarn 项目

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
  echo "错误: 打包后未生成 dist 目录！"
  exit 1
fi

# 将 dist 目录重命名为 jw
echo "将 dist 目录重命名为 jw..."
mv dist jw

# 替换当前目录中的 jw 文件
echo "替换当前目录中的 jw 文件..."
if [ -d "../jw" ]; then
  rm -rf ../jw  # 删除旧的 jw 目录
fi
mv jw ../  # 将新的 jw 目录移动到上级目录

echo "操作完成！"