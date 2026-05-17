# 贡献指南

感谢您对统一监控系统项目的关注！我们欢迎所有形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [提交规范](#提交规范)
- [代码风格](#代码风格)

---

## 行为准则

我们致力于为所有参与者提供一个友好、安全、包容的环境。参与本项目即表示您同意遵守以下准则：

- 尊重所有贡献者和用户
- 保持专业和礼貌的沟通
- 乐于接受和提供建设性的反馈
- 共同努力，保持项目的健康和活力

---

## 如何贡献

您可以通过以下方式贡献：

### 1. 🐛 报告 Bug

请在 GitHub Issues 中报告问题，包含以下信息：

- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 系统环境（操作系统、浏览器版本等）
- 截图（如适用）

### 2. 💡 提出新功能

在 Issues 中提出功能建议，请说明：

- 功能描述
- 使用场景
- 可能的实现方案

### 3. 📝 改进文档

文档改进也是重要的贡献！包括：

- 纠正拼写或语法错误
- 优化内容表达
- 添加使用示例
- 补充遗漏的文档

### 4. 💻 提交代码

修复 bug、实现新功能、重构代码都可以！

---

## 开发流程

### 环境准备

1. Fork 本仓库
2. Clone 到本地
   ```bash
   git clone https://github.com/YOUR_USERNAME/unified-monitoring-system.git
   cd unified-monitoring-system
   ```
3. 安装依赖
   ```bash
   npm install
   ```

### 开发工作流

1. 创建特性分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 进行开发和测试
   ```bash
   # 开发模式运行
   npm run dev
   
   # 运行测试
   npm test
   ```

3. 提交更改
   ```bash
   git add .
   git commit -m "feat: 添加 XXX 功能"
   ```

4. 推送到你的分支
   ```bash
   git push origin feature/your-feature-name
   ```

5. 打开 Pull Request

---

## 提交规范

我们使用约定式提交规范（Conventional Commits）：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

### 示例

```
feat: 添加风扇手动控制模式

- 新增滑块控制组件
- 实现 RPM 实时显示
- 添加模式切换动画

Closes #123
```

---

## 代码风格

### JavaScript/Node.js

- 使用 2 空格缩进
- 使用单引号
- 末尾加分号
- 使用 ES6+ 语法

```javascript
// 示例
function greet(name) {
  console.log(`Hello, ${name}!`);
}

const data = {
  key: 'value',
  number: 42
};
```

### HTML/CSS

- HTML 标签小写
- CSS 使用类名而非 ID
- 使用有意义的变量名

```html
<div class="card">
  <h2>Title</h2>
</div>
```

```css
.card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
}
```

---

## Pull Request 流程

1. 创建 PR 时，请填写 PR 模板
2. 确保所有测试通过
3. 等待代码审查
4. 根据反馈进行修改（如需）
5. 代码合并！

---

## 💡 第一次贡献

如果您是第一次贡献，可以从这些问题开始：

- 标记为 `good first issue` 的问题
- 文档改进
- 代码格式优化
- 添加注释

---

## 📞 需要帮助？

如果您有任何问题，请：

- 查看相关文档
- 搜索已有的 Issues
- 或者直接在新 Issue 中提问！

---

感谢您的贡献！🎉