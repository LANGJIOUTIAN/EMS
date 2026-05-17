/**
 * ========================================
 * 统一监控系统 - Electron 主进程
 * ========================================
 * 
 * 功能说明：
 * 1. 创建和管理应用窗口
 * 2. 系统托盘集成
 * 3. IPC 通信处理（与渲染进程通信）
 * 4. 硬件监控数据获取
 * 5. 风扇控制功能
 * 6. 配置管理
 */

const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, shell } = require('electron');
const path = require('path');
const log = require('electron-log');
const AutoLaunch = require('auto-launch');
const Store = require('electron-store');

// ========================================
// 1. 基础配置初始化
// ========================================

// 配置日志
log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.info('应用启动中...');

// 初始化配置存储（持久化用户设置）
const store = new Store();

// 全局变量
let mainWindow = null;  // 主窗口对象
let tray = null;       // 系统托盘对象
let isQuitting = false; // 是否正在退出标志

// 自动启动配置
const autoLauncher = new AutoLaunch({
  name: '统一监控系统',
  path: app.getPath('exe'),
});

// ========================================
// 2. 主窗口创建函数
// ========================================

function createWindow() {
  log.info('创建主窗口...');

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1400,               // 窗口宽度
    height: 900,               // 窗口高度
    minWidth: 1000,            // 最小宽度
    minHeight: 700,            // 最小高度
    title: '统一监控系统',      // 窗口标题
    icon: path.join(__dirname, '../assets/icon.png'), // 窗口图标
    webPreferences: {
      nodeIntegration: false,  // 禁用 Node 集成（安全考虑）
      contextIsolation: true,  // 启用上下文隔离
      preload: path.join(__dirname, 'preload.js')  // 预加载脚本
    },
    show: false,               // 先不显示，等待 ready-to-show
    backgroundColor: '#050510' // 深色背景
  });

  // 加载监控界面 HTML
  const indexPath = path.join(__dirname, '../server/public/index.html');
  log.info('加载页面:', indexPath);
  mainWindow.loadFile(indexPath);

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    log.info('主窗口已显示');
    
    // 如果是开发模式，打开开发者工具
    if (process.argv.includes('--dev')) {
      mainWindow.webContents.openDevTools();
    }
  });

  // 关闭窗口时的处理
  mainWindow.on('close', (event) => {
    // 如果不是真正退出，只是隐藏到托盘
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
  });

  // 窗口完全关闭后
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 处理页面加载错误
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    log.error('页面加载失败:', errorCode, errorDescription);
  });

  // 渲染进程崩溃处理
  mainWindow.webContents.on('crashed', (event, killed) => {
    log.error('渲染进程崩溃:', killed);
  });
}

// ========================================
// 3. 系统托盘创建
// ========================================

function createTray() {
  log.info('创建系统托盘...');

  // 加载托盘图标
  const iconPath = path.join(__dirname, '../assets/icon.png');
  let trayIcon;
  
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      // 如果图标不存在，创建空图标
      trayIcon = nativeImage.createEmpty();
    }
  } catch (err) {
    log.warn('托盘图标加载失败:', err);
    trayIcon = nativeImage.createEmpty();
  }

  // 创建托盘对象
  tray = new Tray(trayIcon);

  // 托盘右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主界面',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'CPU/GPU 监控',
      submenu: [
        { label: '查看详情', click: () => sendToRenderer('navigate', 'cpu') },
        { type: 'separator' },
        { label: '刷新数据', click: () => sendToRenderer('refresh', 'cpu') }
      ]
    },
    {
      label: '风扇控制',
      submenu: [
        { label: '自动模式', click: () => sendToRenderer('fan-mode', 'auto') },
        { label: '手动模式', click: () => sendToRenderer('fan-mode', 'manual') },
        { type: 'separator' },
        { label: '风扇设置...', click: () => sendToRenderer('navigate', 'fan') }
      ]
    },
    { type: 'separator' },
    {
      label: '开机自启',
      type: 'checkbox',
      checked: store.get('autoLaunch', false),
      click: (menuItem) => {
        store.set('autoLaunch', menuItem.checked);
        if (menuItem.checked) {
          autoLauncher.enable();
        } else {
          autoLauncher.disable();
        }
      }
    },
    {
      label: '后台运行',
      type: 'checkbox',
      checked: store.get('backgroundRun', true),
      click: (menuItem) => {
        store.set('backgroundRun', menuItem.checked);
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  // 设置托盘提示
  tray.setToolTip('统一监控系统');
  tray.setContextMenu(contextMenu);

  // 双击托盘显示主窗口
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  log.info('系统托盘创建完成');
}

// ========================================
// 4. 辅助函数
// ========================================

/**
 * 向渲染进程发送消息
 * @param {string} channel - 消息频道
 * @param {any} data - 消息数据
 */
function sendToRenderer(channel, data) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send(channel, data);
  }
}

// ========================================
// 5. 应用生命周期事件处理
// ========================================

// Electron 应用准备就绪
app.whenReady().then(() => {
  log.info('Electron 应用就绪');

  // 创建主窗口
  createWindow();
  
  // 创建系统托盘
  createTray();

  // 恢复开机自启设置
  if (store.get('autoLaunch', false)) {
    autoLauncher.enable().catch(err => {
      log.error('设置开机自启失败:', err);
    });
  }

  // macOS 特性：激活应用时重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

// 所有窗口关闭时
app.on('window-all-closed', () => {
  // macOS 上不退出应用，保留在托盘
});

// 应用退出前
app.on('before-quit', () => {
  isQuitting = true;
  log.info('应用即将退出');
});

// ========================================
// 6. IPC 通信处理 - 处理渲染进程请求
// ========================================

/**
 * 获取系统信息（CPU/GPU/内存/温度）
 */
ipcMain.handle('get-system-info', async () => {
  try {
    const si = require('systeminformation');
    const [cpu, cpuTemp, mem, gpu] = await Promise.all([
      si.cpu(),
      si.cpuTemperature(),
      si.mem(),
      si.graphics()
    ]);

    return {
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        speed: cpu.speed,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores
      },
      cpuTemp: cpuTemp.main || 0,
      memory: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
        usedPercent: (mem.used / mem.total) * 100
      },
      gpu: gpu.controllers.map(g => ({
        model: g.model,
        vendor: g.vendor,
        vram: g.memoryTotal,
        driver: g.driverVersion
      }))
    };
  } catch (error) {
    log.error('获取系统信息失败:', error);
    return { error: error.message };
  }
});

/**
 * 获取风扇信息
 */
ipcMain.handle('get-fan-info', async () => {
  try {
    const si = require('systeminformation');
    const fanData = await si.fans();
    
    return {
      fans: fanData.map((fan, index) => ({
        id: index,
        name: fan.name || `风扇 ${index + 1}`,
        speed: fan.speed || 0,
        minSpeed: 0,
        maxSpeed: fan.max || 2500,
        mode: store.get(`fan.mode.${index}`, 'auto'),
        targetSpeed: store.get(`fan.target.${index}`, null)
      })),
      controlSupported: fanData.length > 0,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    log.error('获取风扇信息失败:', error);
    return {
      fans: [],
      controlSupported: false,
      error: error.message
    };
  }
});

/**
 * 设置风扇转速和模式
 * @param {Object} param - 参数对象
 * @param {number} param.fanId - 风扇 ID
 * @param {number} param.speed - 转速百分比
 * @param {string} param.mode - 模式 ('auto' | 'manual')
 */
ipcMain.handle('set-fan-speed', async (event, { fanId, speed, mode }) => {
  try {
    log.info(`设置风扇 ${fanId}: 速度=${speed}, 模式=${mode}`);
    
    // 保存设置到配置存储
    if (mode !== undefined) {
      store.set(`fan.mode.${fanId}`, mode);
    }
    if (speed !== undefined) {
      store.set(`fan.target.${fanId}`, speed);
    }

    // TODO: 真实硬件风扇控制
    // 注意：在真实环境中，需要调用系统底层 API 来实际控制风扇
    // Windows 上可能需要使用: WMI, Open Hardware Monitor, 或硬件厂商 SDK
    // 这里模拟成功返回
    return {
      success: true,
      fanId,
      speed,
      mode,
      message: mode === 'auto' ? '风扇已设置为自动模式' : `风扇速度设置为 ${speed}%`
    };
  } catch (error) {
    log.error('设置风扇速度失败:', error);
    return { success: false, error: error.message };
  }
});

/**
 * 获取应用设置
 */
ipcMain.handle('get-settings', () => {
  return {
    autoLaunch: store.get('autoLaunch', false),
    backgroundRun: store.get('backgroundRun', true),
    theme: store.get('theme', 'dark'),
    language: store.get('language', 'zh-CN'),
    notifications: store.get('notifications', true)
  };
});

/**
 * 保存应用设置
 */
ipcMain.handle('save-settings', (event, settings) => {
  try {
    // 保存所有设置
    Object.keys(settings).forEach(key => {
      store.set(key, settings[key]);
    });
    
    // 处理特殊设置
    if (settings.autoLaunch !== undefined) {
      if (settings.autoLaunch) {
        autoLauncher.enable();
      } else {
        autoLauncher.disable();
      }
    }

    return { success: true };
  } catch (error) {
    log.error('保存设置失败:', error);
    return { success: false, error: error.message };
  }
});

/**
 * 获取应用信息
 */
ipcMain.handle('get-app-info', () => {
  return {
    version: app.getVersion(),
    name: app.getName(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
    platform: process.platform,
    arch: process.arch
  };
});

/**
 * 最小化到托盘
 */
ipcMain.on('minimize-to-tray', () => {
  if (mainWindow) {
    mainWindow.hide();
  }
});

/**
 * 打开外部链接
 */
ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});

// ========================================
// 7. 全局错误处理
// ========================================

process.on('uncaughtException', (error) => {
  log.error('未捕获的异常:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('未处理的 Promise 拒绝:', reason);
});

log.info('主进程初始化完成');