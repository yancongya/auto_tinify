# Auto_Tinify 文档目录（AE/PS 双平台脚本）

## 文档清单（优化版）

以下是针对 After Effects / Photoshop 脚本开发的文档结构，涵盖 AE/PS 集成、ScriptUI、ExtendScript 等内容：

### 1. 项目概述
- **文件名**: `overview.md`
- **内容**: 
  - 项目介绍与设计目标
  - AE脚本技术栈（ExtendScript、ScriptUI、Tinify API）
  - 核心功能概述
  - 系统要求与兼容性

### 2. AE脚本集成指南
- **文件名**: `ae-integration.md`
- **内容**:
  - 脚本类型说明（.jsx/.jsxbin）
  - 安装位置（Scripts/ScriptUI Panels目录）
  - 在After Effects中的启动方式
  - 面板停靠与布局
  - 与其他AE脚本/扩展的兼容性
  - 权限与安全考虑

### 3. UI面板设计（ScriptUI）
- **文件名**: `ui-design.md`
- **内容**:
  - ScriptUI面板结构与布局
  - 视觉设计（颜色、字体、图标）
  - 控件类型（按钮、下拉框、输入框等）
  - 事件处理机制（onClick、onChange等）
  - 响应式设计与窗口缩放
  - 关键UI组件实现详解

### 4. 与After Effects交互
- **文件名**: `ae-interaction.md`
- **内容**:
  - AE对象模型概述（app、project、item、layer等）
  - 选择图片文件的方式（FolderItem、File对象）
  - 脚本执行上下文（全局/局部）
  - 与AE面板的通信
  - 错误处理与AE API限制
  - 性能优化建议

### 5. 核心功能说明
- **文件名**: `features.md`
- **内容**:
  - 智能压缩功能（Tinify API集成）
  - 多API密钥管理与轮换
  - 快捷键操作（Ctrl+Shift、Alt点击）
  - 路径配置（变量替换、正则表达式）
  - 实时状态监控（剩余次数、当前路径）
  - 日志记录系统（输出面板、文件日志）
  - 配置文件持久化（JSON格式）
  - 批量处理逻辑

### 6. 函数参考（ExtendScript）
- **文件名**: `functions.md`
- **内容**:
  - 主入口函数（main、runScript）
  - UI事件处理函数
  - 图像压缩核心函数
  - API密钥管理函数
  - 文件路径处理函数
  - AE对象操作函数
  - 配置读写函数
  - 工具函数（字符串处理、日期格式化等）

### 7. 技术实现细节
- **文件名**: `technical-implementation.md`
- **内容**:
  - 架构设计（MVC模式）
  - ExtendScript限制与解决方案
  - 异步操作实现（setTimeout、$.sleep）
  - 网络请求处理（XMLHttpRequest）
  - 文件系统操作（Folder、File对象）
  - 内存管理与垃圾回收
  - 错误恢复机制
  - 性能优化策略

### 8. 安装与配置
- **文件名**: `installation.md`
- **内容**:
  - 系统要求（AE版本、操作系统）
  - 安装方法（手动、脚本面板、kbar）
  - API Key获取与配置
  - 路径配置详细说明
  - 首次运行设置向导
  - 卸载与清理

### 9. 使用手册
- **文件名**: `user-guide.md`
- **内容**:
  - 基本操作流程（从启动到完成）
  - 快捷操作详解
  - 状态栏信息解读
  - 日志查看与分析
  - 配置文件管理
  - 常见问题解答
  - 最佳实践建议

### 10. 开发者指南
- **文件名**: `developer-guide.md`
- **内容**:
  - 开发环境搭建（ ExtendScript Toolkit、VS Code）
  - 代码结构说明
  - 调试方法（日志输出、断点调试）
  - 扩展功能开发
  - 与现有代码集成
  - 贡献规范（代码风格、提交规范）

### 11. API参考
- **文件名**: `api-reference.md`
- **内容**:
  - 公共函数接口（参数、返回值）
  - 事件类型定义
  - 配置文件格式（JSON Schema）
  - 数据结构说明
  - 常量定义（错误码、状态码）

### 12. 打包与分发
- **文件名**: `packaging.md`
- **内容**:
  - .jsxbin编译方法
  - 版本号管理
  - 发布流程
  - 更新机制
  - 数字签名（可选）

### 13. 故障排除
- **文件名**: `troubleshooting.md`
- **内容**:
  - 常见错误与解决方案
  - AE兼容性问题
  - 网络连接问题
  - 文件权限问题
  - 性能问题诊断

### 14. 更新日志
- **文件名**: `changelog.md`
- **内容**: 版本历史、功能更新、问题修复、API变更

### 15. 许可证与贡献
- **文件名**: `license-contributing.md`
- **内容**: MIT许可证说明、贡献指南、行为准则

## 特别注意

1. **AE特定内容**：所有文档应明确指出与After Effects相关的部分
2. **代码示例**：提供ExtendScript语法示例（区别于标准JavaScript）
3. **版本兼容性**：注明支持的After Effects版本
4. **安全考虑**：强调脚本在AE中的安全限制

## 文档编写顺序

1. 项目概述、AE集成指南
2. UI面板设计、AE交互
3. 核心功能、函数参考
4. 技术实现、安装配置
5. 使用手册、开发者指南
6. API参考、打包分发
7. 故障排除、更新日志

## 格式规范

- 所有文档使用Markdown格式
- 代码块标注语言为`javascript`（ExtendScript）
- 包含AE版本兼容性表格
- 使用AE对象模型图（可选）
- 保持专业、简洁的技术写作风格