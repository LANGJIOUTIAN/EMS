@echo off
chcp 65001 >nul
title 统一监控系统 - 快速启动

echo.
echo ========================================
echo    统一监控系统 v1.0.0
echo ========================================
echo.
echo [启动中...] 正在打开监控界面
echo.

REM 获取当前脚本所在目录
cd /d "%~dp0"

REM 打开 HTML 文件
start "" "unified-monitoring.html"

REM 等待 2 秒让浏览器有时间打开
timeout /t 2 /nobreak >nul

echo.
echo [成功] 系统已在浏览器中打开
echo.
echo 如果浏览器没有自动打开：
echo   请手动双击 'unified-monitoring.html' 文件
echo.
echo ========================================
echo    按任意键关闭此窗口...
echo ========================================
echo.

pause >nul