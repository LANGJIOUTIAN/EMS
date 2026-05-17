@echo off
chcp 65001 >nul
title 统一监控系统 - 构建脚本

echo.
echo ========================================
echo    统一监控系统 v1.0.0
echo    Windows 版本构建脚本
echo ========================================
echo.

cd /d "%~dp0"

echo [1. 检查 Node.js 环境...
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js！
    echo 请从 https://nodejs.org 下载安装 Node.js 16.x 或更高版本
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js 版本:
node --version
echo [OK] npm 版本:
npm --version
echo.

echo [2. 安装依赖...
echo.
call npm install
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败！
    echo.
    pause
    exit /b 1
)
echo [OK] 依赖安装完成！
echo.

echo [3. 创建资源目录...
if not exist "assets" mkdir assets
echo [OK] 资源目录已准备
echo.

echo [4. 开始构建应用...
echo.
echo 提示: 构建过程可能需要几分钟，请耐心等待...
echo.

call npm run build:win
if %errorlevel% neq 0 (
    echo [错误] 构建失败！
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    ✅ 构建成功！
echo ========================================
echo.
echo [信息] 构建产物位置:
echo   dist\ 目录
echo.
echo 生成的文件:
dir /b "dist\" 2>nul
echo.
echo 提示:
echo   - .exe 文件是安装包（推荐）
echo   - -win.zip 是便携版
echo.
pause