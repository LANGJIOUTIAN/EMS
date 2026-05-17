# 配置说明

本文档详细介绍了统一监控系统的各项配置选项。

## 📋 目录

- [配置文件位置](#配置文件位置)
- [基础配置](#基础配置)
- [性能配置](#性能配置)
- [告警配置](#告警配置)
- [界面配置](#界面配置)
- [风扇控制配置](#风扇控制配置)

---

## 配置文件位置

### 项目配置（开发时）

```
config/
├── security.js       # 安全配置
└── performance.js    # 性能配置
```

### 用户配置（运行时）

使用 `electron-store` 存储，位置：

- **Windows**：`%APPDATA%\unified-monitoring-system\config.json`
- **macOS**：`~/Library/Application Support/unified-monitoring-system/config.json`
- **Linux**：`~/.config/unified-monitoring-system/config.json`

---

## 基础配置

### config/performance.js

```javascript
/**
 * 性能配置
 */
module.exports = {
  // 数据刷新间隔（毫秒）
  refreshInterval: 1500,
  
  // 风扇状态更新间隔（毫秒）
  fanUpdateInterval: 5000,
  
  // 最大告警显示数量
  maxAlerts: 8,
  
  // 粒子数量（'auto' 或数字）
  particleCount: 'auto',
  
  // 是否启用性能优化
  performanceMode: true
};
```

### 配置项说明

| 配置项 | 类型 | 说明 | 默认值 |
|--------|------|------|--------|
| refreshInterval | number | 数据刷新间隔（毫秒） | 1500 |
| fanUpdateInterval | number | 风扇更新间隔 | 5000 |
| maxAlerts | number | 最大告警显示数 | 8 |
| particleCount | 'auto'\|number | 粒子系统数量 | 'auto' |
| performanceMode | boolean | 性能优化模式 | true |

---

## 性能配置

### 调整刷新频率

如果您的电脑性能有限，可以降低刷新频率：

```javascript
{
  // 降低刷新频率以节省资源
  refreshInterval: 3000,    // 从 1500ms 改为 3000ms
  fanUpdateInterval: 10000  // 从 5000ms 改为 10000ms
}
```

如果追求最高实时性，可以提高刷新频率：

```javascript
{
  refreshInterval: 1000,    // 1秒刷新一次
  fanUpdateInterval: 2000   // 2秒更新一次风扇
}
```

### 粒子系统配置

```javascript
{
  // 自动：根据屏幕大小计算粒子数
  particleCount: 'auto',
  
  // 或指定数量：
  particleCount: 50,    // 较少粒子（省电）
  particleCount: 200,   // 较多粒子（效果好）
  particleCount: 0      // 禁用粒子系统
}
```

---

## 告警配置

### 告警阈值配置

配置各项指标的告警阈值：

```javascript
// config/alerts.js
module.exports = {
  // CPU 告警阈值
  cpu: {
    warning: 70,    // 警告级别
    critical: 90    // 紧急级别
  },
  
  // GPU 告警阈值
  gpu: {
    warning: 75,
    critical: 95
  },
  
  // 温度告警阈值
  temperature: {
    warning: 70,    // °C
    critical: 85
  },
  
  // 内存告警阈值（百分比）
  memory: {
    warning: 80,
    critical: 95
  }
};
```

### 告警通知配置

```javascript
{
  // 是否启用通知
  notifications: true,
  
  // 通知方式
  notificationMethods: ['desktop', 'sound'],
  
  // 告警聚合时间（秒）
  alertAggregationTime: 300
}
```

---

## 界面配置

### 主题配置

```javascript
{
  // 主题：'dark' 或 'light'
  theme: 'dark',
  
  // 语言：'zh-CN' 或 'en-US'
  language: 'zh-CN',
  
  // 颜色方案
  colors: {
    primary: '#00ffff',     // 主色调：青色
    secondary: '#ff00ff',   // 辅助色：品红
    accent: '#00ff00',      // 强调色：绿色
    warning: '#ffaa00',     // 警告色：黄色
    danger: '#ff0055'       // 危险色：红色
  }
}
```

### 界面元素可见性

```javascript
{
  // 是否显示粒子背景
  showParticles: true,
  
  // 是否显示扫描线效果
  showScanline: true,
  
  // 是否显示日志区域
  showLogs: false
}
```

---

## 🌀 风扇控制配置

### 自动模式配置

```javascript
{
  // 风扇模式：'auto' 或 'manual'
  fanMode: 'auto',
  
  // 自动模式配置
  autoMode: {
    // 温度曲线：温度 -> 转速百分比
    temperatureCurve: [
      { temp: 30, speed: 20 },   // 30°C -> 20%
      { temp: 45, speed: 35 },   // 45°C -> 35%
      { temp: 60, speed: 55 },   // 60°C -> 55%
      { temp: 75, speed: 80 },   // 75°C -> 80%
      { temp: 85, speed: 100 }   // 85°C -> 100%
    ],
    
    // 是否启用平滑过渡
    smoothTransition: true,
    
    // 过渡时间（毫秒）
    transitionTime: 2000
  }
}
```

### 手动模式配置

```javascript
{
  // 手动模式时的默认转速
  defaultManualSpeed: 50,
  
  // 最小/最大转速限制
  minSpeed: 0,
  maxSpeed: 100,
  
  // 步进值（滑块的精度）
  speedStep: 5
}
```

---

## 🔧 修改配置的方法

### 方法1：修改配置文件（高级用户）

直接编辑配置文件，然后重启应用。

### 方法2：使用设置界面（推荐）

在 Electron 桌面版中，使用设置界面修改配置。

### 方法3：通过代码修改

```javascript
// 在 Electron 主进程中
const Store = require('electron-store');
const store = new Store();

// 修改配置
store.set('fanMode', 'manual');
store.set('refreshInterval', 2000);

// 获取配置
const config = store.get();
console.log(config);
```

---

## 💡 推荐配置

### 日常使用（默认）

```javascript
{
  refreshInterval: 1500,
  fanMode: 'auto',
  particleCount: 'auto',
  theme: 'dark'
}
```

### 性能优先（旧电脑）

```javascript
{
  refreshInterval: 3000,
  fanUpdateInterval: 10000,
  particleCount: 30,
  performanceMode: true
}
```

### 效果优先（高性能电脑）

```javascript
{
  refreshInterval: 1000,
  particleCount: 200,
  showParticles: true,
  showScanline: true
}
```

---

## ⚠️ 注意事项

1. 过于频繁的刷新可能导致 CPU 占用过高
2. 修改配置后需要重启应用才能生效
3. 重要配置修改前建议备份原配置文件
4. 如果配置出错，删除配置文件即可恢复默认

---

## 📞 需要帮助？

如果配置有问题，请查看 [FAQ 文档](FAQ.md) 或在 Issues 中提问。