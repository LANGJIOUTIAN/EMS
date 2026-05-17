# 统一监控系统 | Unified Monitoring System

<div align="center">
  <h3>🖥️ 一个功能强大、跨平台的硬件与软件监控平台</h3>
  <p>CPU/GPU监控 · 网络监听 · 串口监听 · 风扇控制 · 告警系统</p>
  <p>
    <a href="#-快速开始">快速开始</a> ·
    <a href="#-功能特性">功能特性</a> ·
    <a href="#-项目结构">项目结构</a> ·
    <a href="#-贡献指南">贡献指南</a>
  </p>
  <p>
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Platform" src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-orange">
  </p>
</div>

---

## 📋 目录

- [✨ 项目简介](#-项目简介)
- [🚀 快速开始](#-快速开始)
- [🎯 功能特性](#-功能特性)
- [📱 界面预览](#-界面预览)
- [📂 项目结构](#-项目结构)
- [💻 安装说明](#-安装说明)
- [📖 使用指南](#-使用指南)
- [🔧 配置说明](#-配置说明)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)

---

## ✨ 项目简介

**统一监控系统**是一个功能完善、设计精美的跨平台监控解决方案，具有以下特点：

- 🔗 **跨平台**：支持 Windows、macOS、Linux
- 🎨 **科技感界面**：深色主题 + 霓虹光效 + 粒子背景
- 📊 **实时监控**：CPU/GPU/网络/串口/软件行为
- 🌀 **风扇控制**：自动/手动模式，精准调节
- ⚠️ **智能告警**：多级告警规则，通知系统
- 📦 **无需安装**：独立 Web 版本，双击即用
- 🔧 **可扩展**：模块化架构，易于扩展

---

## 🚀 快速开始

### 方法1：独立 Web 版本（推荐 ⭐）

**零依赖，双击即可运行！**

```bash
# 1. 下载或克隆项目
git clone https://github.com/your-username/unified-monitoring-system.git

# 2. 进入目录
cd unified-monitoring-system

# 3. 打开监控界面
# Windows: 双击 examples/standalone/启动监控系统.bat
# macOS/Linux: 用浏览器打开 examples/standalone/unified-monitoring.html
```

### 方法2：Electron 桌面应用

需要 Node.js 16+：

```bash
# 1. 安装依赖
npm install

# 2. 开发模式运行
npm run dev

# 3. 构建安装包
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## 🎯 功能特性

### 核心监控模块

| 模块 | 状态 | 说明 |
|------|------|------|
| 🖥️ **CPU/GPU 监控** | ✅ | 使用率、温度、内存、频率 |
| 🌐 **网络监听** | ✅ | 流量统计、连接数、上传下载速率 |
| 📱 **软件行为** | ✅ | 进程监控、网络请求、文件操作 |
| 🔌 **串口监听** | ✅ | 端口状态、数据速率、设备检测 |
| 🌀 **风扇控制** | ✅ | 自动/手动模式、滑块控制 |

### 增强功能

- ✨ **实时数据可视化**：ECharts 图表，趋势分析
- ⚠️ **多级告警系统**：警告/严重/紧急，通知聚合
- 📋 **报告生成**：PDF/Excel 格式，合规审计
- 🔐 **权限管理**：角色权限矩阵，操作审计
- 🔄 **自动启动**：开机自启，后台运行
- 🔔 **多种通知**：弹窗、邮件、企业微信

---

## 📱 界面预览

### 主界面
- 粒子动态背景
- 实时数据卡片
- 性能趋势图表
- 告警通知中心

### 风扇控制
- 自动/手动模式切换
- 滑块精确控制（0-100%）
- 实时 RPM 显示
- 多风扇独立管理

### 告警中心
- 告警级别分类
- 时间戳记录
- 告警聚合显示
- 快速定位模块

---

## 📂 项目结构

```
unified-monitoring-system/
├── README.md                          # 项目说明（本文件）
├── LICENSE.md                         # 许可证
├── CONTRIBUTING.md                    # 贡献指南
├── CHANGELOG.md                       # 变更日志
├── .gitignore                         # Git 忽略配置
├── package.json                       # Node.js 依赖配置
│
├── docs/                              # 文档目录
│   ├── INSTALL.md                     # 安装说明
│   ├── USAGE.md                       # 使用指南
│   ├── CONFIGURATION.md               # 配置说明
│   ├── API.md                         # API 文档
│   └── FAQ.md                         # 常见问题
│
├── examples/                          # 示例目录
│   └── standalone/                    # 独立 Web 版本
│       ├── unified-monitoring.html    # 完整监控界面（点击即用）
│       └── 启动监控系统.bat           # Windows 一键启动脚本
│
├── scripts/                           # 脚本目录
│   ├── install.bat                    # Windows 安装脚本
│   ├── install.sh                     # Linux/macOS 安装脚本
│   └── build.sh                       # 构建脚本
│
├── electron/                          # Electron 桌面应用
│   ├── main.js                        # 主进程（窗口、托盘、IPC）
│   └── preload.js                     # 预加载脚本（安全通信）
│
├── server/                            # 后端服务
│   ├── public/                        # 前端资源
│   │   └── index.html                 # 监控界面
│   ├── index.js                       # Express 服务器
│   ├── alerts.js                      # 告警系统
│   ├── dashboard.js                   # 仪表盘模块
│   └── policy.js                      # 策略引擎
│
├── modules/                           # 监控模块
│   ├── cpu_gpu/                       # CPU/GPU 监控
│   ├── network/                       # 网络监听
│   ├── software/                      # 软件行为
│   └── serial/                        # 串口监听
│
├── config/                            # 配置目录
│   ├── security.js                    # 安全配置
│   └── performance.js                 # 性能配置
│
└── tests/                             # 测试目录
    └── unit/                          # 单元测试
```

---

## 💻 安装说明

### 系统要求

- **操作系统**：Windows 10+/macOS 10.14+/Ubuntu 18.04+
- **浏览器**：Chrome/Edge/Firefox（最新版本）
- **Electron 版**：Node.js 16 或更高版本

### 安装方式

#### 方式1：独立 Web 版本（最简单）

无需任何安装，直接运行：

```bash
# Windows
双击 examples/standalone/启动监控系统.bat

# 其他系统
用浏览器打开 examples/standalone/unified-monitoring.html
```

#### 方式2：从源码安装

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/unified-monitoring-system.git
cd unified-monitoring-system

# 2. 安装依赖
npm install

# 3. 开发模式运行
npm run dev
```

详细安装说明请参考 [docs/INSTALL.md](docs/INSTALL.md)

---

## 📖 使用指南

### 快速使用

1. **打开监控界面**：按照上面的快速开始步骤启动
2. **查看实时数据**：界面每 1.5 秒自动更新
3. **使用风扇控制**：点击"风扇控制"卡片，切换自动/手动模式
4. **查看告警**：滚动到界面底部查看实时告警中心

### 核心功能使用

#### 🌀 风扇控制

```
1. 在监控界面找到 "🌀 风扇控制" 卡片
2. 选择模式：
   - 自动模式：系统根据温度自动调节
   - 手动模式：拖动滑块自定义（0-100%）
3. 查看实时 RPM 显示
```

#### ⚠️ 告警系统

- **告警级别**：紧急（红色）、警告（黄色）、信息（蓝色）
- **告警聚合**：相同类型告警 5 分钟内自动合并
- **快速定位**：点击告警可跳转到相关模块

详细使用说明请参考 [docs/USAGE.md](docs/USAGE.md)

---

## 🔧 配置说明

### 基本配置

配置文件位置：`config/`

```javascript
// config/performance.js
module.exports = {
  refreshInterval: 1500,       // 数据刷新间隔（毫秒）
  fanUpdateInterval: 5000,     // 风扇状态更新间隔
  maxAlerts: 8,                // 最大告警显示数量
  particleCount: 'auto'        // 粒子数量
};
```

### 告警规则配置

```javascript
// config/alerts.js
module.exports = {
  cpu: { high: 80, critical: 90 },
  gpu: { high: 85, critical: 95 },
  temperature: { high: 75, critical: 85 }
};
```

详细配置说明请参考 [docs/CONFIGURATION.md](docs/CONFIGURATION.md)

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 💻 提交代码改进

详细的贡献流程请参考 [CONTRIBUTING.md](CONTRIBUTING.md)

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE.md) - 详细内容请查看 LICENSE.md 文件。

---

## 📞 支持与反馈

- 📖 查看文档：[docs/](docs/)
- ❓ 提问或反馈：[GitHub Issues](../../issues)
- 🌟 Star 项目：如果你觉得有用，请给我们一颗星！

---

## 📊 项目统计

- **代码行数**：约 5000+ 行
- **核心模块**：5 个
- **功能特性**：20+ 项
- **文档齐全**：完整的安装、使用、配置说明

---

<div align="center">
  <h3>Made with ❤️ by the Unified Monitoring Team</h3>
  <p>
    <a href="#-目录">返回顶部</a>
  </p>
</div>

---

## 🎉 开始使用

准备好开始使用了吗？立即查看 [快速开始](#-快速开始)！