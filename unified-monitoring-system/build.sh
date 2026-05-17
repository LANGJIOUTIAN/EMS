#!/bin/bash

# 统一监控系统 - Linux/Mac 构建脚本

echo "========================================"
echo "   统一监控系统 v1.0.0"
echo "   跨平台构建脚本"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "[1] 检查 Node.js 环境..."
echo ""

if ! command -v node &> /dev/null; then
    echo "[错误] 未找到 Node.js！"
    echo "请从 https://nodejs.org 下载安装 Node.js 16.x 或更高版本"
    echo ""
    exit 1
fi

echo "[OK] Node.js 版本:"
node --version
echo "[OK] npm 版本:"
npm --version
echo ""

echo "[2] 安装依赖..."
echo ""
npm install

if [ $? -ne 0 ]; then
    echo "[错误] 依赖安装失败！"
    echo ""
    exit 1
fi
echo "[OK] 依赖安装完成！"
echo ""

echo "[3] 创建资源目录..."
mkdir -p assets
echo "[OK] 资源目录已准备"
echo ""

echo "[4] 开始构建应用..."
echo ""
echo "提示: 构建过程可能需要几分钟，请耐心等待..."
echo ""

# 检测平台
case "$(uname -s)" in
    Darwin*)
    echo "正在构建 macOS 版本..."
    npm run build:mac
    ;;
    Linux*)
    echo "正在构建 Linux 版本..."
    npm run build:linux
    ;;
    MINGW*|CYGWIN*|MSYS*)
    echo "正在构建 Windows 版本..."
    npm run build:win
    ;;
    *)
    echo "未知系统，正在构建所有版本..."
    npm run build
    ;;
esac

if [ $? -ne 0 ]; then
    echo "[错误] 构建失败！"
    echo ""
    exit 1
fi

echo ""
echo "========================================"
echo "   ✅ 构建成功！"
echo "========================================"
echo ""
echo "[信息] 构建产物位置:"
echo "  dist/ 目录"
echo ""
echo "生成的文件:"
ls -la dist/
echo ""
echo "提示:"
echo "  请查看 dist/ 目录获取安装包"
echo ""