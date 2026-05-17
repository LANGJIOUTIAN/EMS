/**
 * ========================================
 * 统一监控系统 - Preload 预加载脚本
 * ========================================
 * 
 * 功能说明：
 * 1. 提供安全的上下文桥接（Context Bridge）
 * 2. 暴露受限制的 API 给渲染进程
 * 3. 防止渲染进程直接访问 Node.js API
 * 
 * 安全说明：
 * - 不暴露完整的 Node.js API
 * - 只暴露经过验证的功能
 * - 使用 contextIsolation 隔离
 */

const { contextBridge, ipcRenderer } = require('electron');

/**
 * 暴露安全的 API 给渲染进程
 * 在浏览器环境中可通过 window.electronAPI 访问
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // ========================================
  // 系统信息相关
  // ========================================
  
  /**
   * 获取系统信息（CPU/GPU/内存/温度）
   * @returns {Promise<Object>} 系统信息对象
   */
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // ========================================
  // 风扇控制相关
  // ========================================
  
  /**
   * 获取风扇信息
   * @returns {Promise<Object>} 风扇信息
   */
  getFanInfo: () => ipcRenderer.invoke('get-fan-info'),
  
  /**
   * 设置风扇速度
   * @param {number} fanId - 风扇 ID
   * @param {number} speed - 转速百分比（0-100）
   * @param {string} mode - 模式 ('auto' | 'manual')
   * @returns {Promise<Object>} 设置结果
   */
  setFanSpeed: (fanId, speed, mode) => 
    ipcRenderer.invoke('set-fan-speed', { fanId, speed, mode }),
  
  // ========================================
  // 应用设置相关
  // ========================================
  
  /**
   * 获取应用设置
   * @returns {Promise<Object>} 设置对象
   */
  getSettings: () => ipcRenderer.invoke('get-settings'),
  
  /**
   * 保存应用设置
   * @param {Object} settings - 要保存的设置
   * @returns {Promise<Object>} 操作结果
   */
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  // ========================================
  // 应用信息相关
  // ========================================
  
  /**
   * 获取应用信息（版本、平台等）
   * @returns {Promise<Object>} 应用信息
   */
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // ========================================
  // 窗口控制相关
  // ========================================
  
  /**
   * 最小化窗口到托盘
   */
  minimizeToTray: () => ipcRenderer.send('minimize-to-tray'),
  
  // ========================================
  // 外部链接相关
  // ========================================
  
  /**
   * 用默认浏览器打开外部链接
   * @param {string} url - 要打开的 URL
   */
  openExternal: (url) => ipcRenderer.send('open-external', url),
  
  // ========================================
  // 事件监听相关
  // ========================================
  
  /**
   * 监听导航事件
   * @param {Function} callback - 回调函数
   */
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, data) => callback(data)),
  
  /**
   * 监听刷新事件
   * @param {Function} callback - 回调函数
   */
  onRefresh: (callback) => ipcRenderer.on('refresh', (event, data) => callback(data)),
  
  /**
   * 监听风扇模式变化
   * @param {Function} callback - 回调函数
   */
  onFanMode: (callback) => ipcRenderer.on('fan-mode', (event, data) => callback(data)),
  
  /**
   * 移除所有事件监听器（清理用）
   * @param {string} channel - 事件频道
   */
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});

console.log('Preload 脚本加载完成');