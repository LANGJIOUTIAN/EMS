# 安装指南

本文档提供了统一监控系统的详细安装说明。

## 📋 目录

- [系统要求](#系统要求)
- [安装方式](#安装方式)
- [独立 Web 版本安装](#独立-web-版本安装)
- [Electron 桌面应用安装](#electron-桌面应用安装)
- [从源码构建](#从源码构建)
- [常见问题](#常见问题)

---

## 系统要求

### 硬件要求

| 组件 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 1 GHz | 2 GHz 及以上 |
| 内存 | 2 GB RAM | 4 GB RAM 及以上 |
| 硬盘 | 200 MB 可用空间 | 500 MB 可用空间 |

### 软件要求

- **操作系统**：Windows 10+ / macOS 10.14+ / Ubuntu 18.04+
- **浏览器**（Web 版）：Chrome/Edge/Firefox（最新版本）
- **Electron 版**：Node.js 16 或更高版本

---

## 安装方式

我们提供多种安装方式，选择最适合您的：

1. **独立 Web 版本**（⭐ 最简单，无需安装）
2. **Electron 桌面应用**（功能最全）
3. **从源码构建**（适合开发者）

---

## 独立 Web 版本安装

### 特点

- ✅ 零依赖，无需安装任何软件
- ✅ 双击即可运行
- ✅ 跨平台，任何系统都能用
- ✅ 包含所有核心功能

### Windows

1. 下载项目或克隆仓库
2. 进入 `examples/standalone/` 目录
3. 双击 `启动监控系统.bat`
4. 系统会在默认浏览器中自动打开

或者直接双击 `unified-monitoring.html` 文件。

### macOS / Linux

1. 下载项目或克隆仓库
2. 进入 `examples/standalone/` 目录
3. 用浏览器打开 `unified-monitoring.html` 文件

**方式1：在文件管理器中双击**
**方式2：用命令行打开**
```bash
# macOS
open examples/standalone/unified-monitoring.html

# Linux
xdg-open examples/standalone/unified-monitoring.html
```

---

## Electron 桌面应用安装

### 前置要求

需要先安装 Node.js 16 或更高版本。

**检查 Node.js 是否安装：**
```bash
node --version
npm --version
```

如果未安装，请访问 [nodejs.org](https://nodejs.org) 下载安装。

### 安装步骤

#### 1. 获取项目

```bash
# 方式1：克隆仓库
git clone https://github.com/your-username/unified-monitoring-system.git
cd unified-monitoring-system

# 方式2：下载 ZIP 文件并解压
# 从 GitHub Releases 页面下载
```

#### 2. 安装依赖

```bash
npm install
```

#### 3. 运行应用

```bash
# 开发模式（包含调试工具）
npm run dev

# 或生产模式
npm start
```

#### 4. 构建安装包（可选）

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# 或构建所有平台
npm run build
```

构建完成后，安装包会在 `dist/` 目录中。

---

## 从源码构建

### 完整构建流程

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/unified-monitoring-system.git
cd unified-monitoring-system

# 2. 检查 Node.js 版本
node --version

# 3. 安装依赖
npm install

# 4. 开发模式运行
npm run dev

# 5. 运行测试
npm test

# 6. 构建应用
npm run build:win
```

### 构建输出

构建完成后，在 `dist/` 目录中会生成：

| 平台 | 文件 | 说明 |
|------|------|------|
| Windows | `UnifiedMonitoringSetup-1.0.0.exe` | 安装包 |
| Windows | `UnifiedMonitoring-1.0.0.exe` | 便携版 |
| macOS | `UnifiedMonitoring-1.0.0.dmg` | 安装包 |
| Linux | `UnifiedMonitoring-1.0.0.AppImage` | 便携版 |

---

## 常见问题

### Q1: npm install 失败怎么办？

**A:** 尝试以下步骤：

```bash
# 1. 清理 npm 缓存
npm cache clean --force

# 2. 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 3. 重新安装
npm install

# 4. 如果还是失败，尝试使用淘宝镜像
npm install --registry=https://registry.npmmirror.com
```

### Q2: Electron 应用打不开？

**A:** 检查以下几点：

- 确保 Node.js 版本 >= 16
- 删除 `node_modules` 重新安装
- 检查是否有防火墙阻止

### Q3: 独立 Web 版数据是真实的吗？

**A:** 独立 Web 版使用模拟数据，方便演示和测试。要获取真实硬件数据，需要使用 Electron 桌面版。

### Q4: 如何更新应用？

**A:**

- Web 版：下载最新版本的 HTML 文件替换即可
- 桌面版：重新构建或下载最新安装包

### Q5: 可以在移动端使用吗？

**A:** 可以！独立 Web 版完全响应式，在手机浏览器中也能正常使用。

---

## 下一步

安装完成后，请查看 [使用指南](USAGE.md) 了解如何使用系统的各项功能。

---

## 获取帮助

如果安装过程中遇到问题：

- 查看 [FAQ 文档](FAQ.md)
- 在 GitHub Issues 中搜索
- 创建新的 Issue 并描述您的问题