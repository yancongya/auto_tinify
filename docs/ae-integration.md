# AE脚本集成指南

## 1. AE脚本类型说明

### 1.1 脚本文件格式
- **.jsx 文件**：未编译的 ExtendScript 源代码文件，可读性好，便于调试
- **.jsxbin 文件**：编译后的二进制文件，保护源代码，适合分发

### 1.2 脚本类型
- **Startup Scripts**：AE 启动时自动运行的脚本
- **Scripts Menu**：位于 File > Scripts 菜单下的脚本
- **ScriptUI Panels**：可停靠的面板脚本（本脚本类型）

## 2. 安装位置与结构

### 2.1 标准安装目录

#### Windows
```
C:\Program Files\Adobe\Adobe After Effects [版本]\Support Files\Scripts\
├── ScriptUI Panels\          # 可停靠面板脚本（本脚本位置）
├── Startup\                  # 启动脚本
└── ScriptUI\                 # ScriptUI 相关文件
```

#### macOS
```
/Applications/Adobe After Effects [版本]/Scripts/
├── ScriptUI Panels/          # 可停靠面板脚本（本脚本位置）
├── Startup/                  # 启动脚本
└── ScriptUI/                 # ScriptUI 相关文件
```

### 2.2 推荐安装路径
对于 Auto_Tinify，建议安装到 `ScriptUI Panels` 目录：
```
[AE安装目录]/Scripts/ScriptUI Panels/auto_tinify.jsxbin
```

### 2.3 用户自定义脚本目录
AE 也支持用户自定义脚本目录：
- **Windows**：`%USERPROFILE%\Documents\Adobe\After Effects [版本]\Scripts\`
- **macOS**：`~/Documents/Adobe/After Effects [版本]/Scripts/`

## 3. 在After Effects中的启动方式

### 3.1 通过菜单启动
1. 打开 After Effects
2. 前往 `Window` 菜单
3. 在菜单底部找到 `auto_tinify.jsx` 或 `auto_tinify.jsxbin`
4. 点击即可打开脚本面板

### 3.2 通过脚本面板启动
1. 前往 `File > Scripts > Run Script File...`
2. 浏览到脚本文件位置
3. 选择并打开脚本

### 3.3 自动加载（仅限 ScriptUI Panels）
安装在 `ScriptUI Panels` 目录的脚本会自动出现在 `Window` 菜单中，无需手动运行。

## 4. 面板停靠与布局

### 4.1 面板停靠特性
ScriptUI Panels 脚本具有以下特性：
- **可停靠性**：可以停靠到 AE 界面的任何面板区域
- **可浮动**：可以拖出成为独立窗口
- **可调整大小**：支持动态调整面板大小
- **记住位置**：AE 会记住面板最后的位置和大小

### 4.2 最佳停靠位置
建议将 Auto_Tinify 面板停靠在：
- **右侧区域**：与项目面板、效果控件面板一起
- **底部区域**：与时间线面板一起
- **左侧区域**：与工具栏一起

### 4.3 面板布局代码示例
```javascript
// 创建可调整大小的面板
var panel = (this instanceof Panel) ? this : new Window("palette", "Auto_Tinify", undefined, {resizeable: true});
panel.orientation = "column";
panel.alignChildren = ["fill", "top"];
panel.add("statictext", undefined, "Auto_Tinify v2.0.4");
```

## 5. 与其他AE脚本/扩展的兼容性

### 5.1 脚本冲突避免
- **命名空间**：使用唯一的全局变量名（如 `AUTO_TINIFY`）
- **事件处理**：避免覆盖其他脚本的事件监听器
- **资源管理**：及时清理创建的临时文件和对象

### 5.2 扩展兼容性
- **CEP 扩展**：Auto_Tinify 作为传统脚本，与 CEP 扩展兼容
- **其他脚本**：遵循 AE 脚本开发最佳实践，避免冲突

### 5.3 共享资源
```javascript
// 检查是否已加载
if (typeof AUTO_TINIFY_LOADED === "undefined") {
    var AUTO_TINIFY_LOADED = true;
    // 脚本初始化代码
}
```

## 6. 权限与安全考虑

### 6.1 AE 脚本安全模型
After Effects 脚本运行在安全沙箱中，具有以下限制：
- **文件系统访问**：需要用户授权或位于受信任位置
- **网络访问**：允许但可能受系统防火墙限制
- **系统命令执行**：严格限制，需要特殊权限

### 6.2 受信任位置
为确保脚本正常运行，建议将脚本安装到以下受信任位置：
1. AE 安装目录内的 Scripts 文件夹
2. 用户文档目录中的 Adobe 脚本文件夹
3. 通过 AE 首选项设置的自定义脚本文件夹

### 6.3 安全最佳实践
- **不存储敏感信息**：不在脚本中硬编码 API 密钥
- **加密存储**：配置文件使用简单的编码保护
- **用户确认**：删除文件等危险操作前请求确认
- **错误处理**：优雅处理权限错误，提供清晰的错误信息

## 7. 安装方法详解

### 7.1 手动安装（推荐）
1. 下载 `auto_tinify.jsxbin` 文件
2. 复制到 `ScriptUI Panels` 目录
3. 重启 After Effects
4. 从 `Window` 菜单打开

### 7.2 通过脚本面板安装
1. 在 AE 中打开 `File > Scripts > Run Script File...`
2. 运行安装脚本（如有提供）
3. 按照提示完成安装

### 7.3 通过 kbar 安装（强烈推荐）
1. 安装 [kbar](https://kbar.itycon.cn/) 脚本管理器
2. 在 kbar 中搜索 `Auto_Tinify`
3. 点击安装按钮自动完成

## 8. 卸载与清理

### 8.1 卸载步骤
1. 关闭 After Effects
2. 删除 `ScriptUI Panels` 目录中的脚本文件
3. 删除用户文档目录中的配置文件（如有）

### 8.2 配置文件位置
配置文件通常存储在：
- **Windows**：`%APPDATA%\Auto_Tinify\config.json`
- **macOS**：`~/Library/Application Support/Auto_Tinify/config.json`

### 8.3 清理注册表/首选项
AE 会记住面板位置和状态，可通过以下方式重置：
1. 按住 `Ctrl+Alt+Shift`（Windows）或 `Cmd+Opt+Shift`（Mac）启动 AE
2. 在弹出的对话框中选择"重置首选项"

## 9. 故障排除

### 9.1 常见安装问题
1. **脚本未出现在 Window 菜单**
   - 检查文件是否放在正确的 ScriptUI Panels 目录
   - 确保文件扩展名正确（.jsx 或 .jsxbin）
   - 重启 After Effects

2. **脚本无法运行**
   - 检查 AE 版本兼容性
   - 查看脚本控制台错误信息（`Window > Console`）
   - 确保网络连接正常（用于 API 调用）

### 9.2 权限问题
- **Windows**：以管理员身份运行 AE 进行安装
- **macOS**：检查系统安全设置，允许运行未签名脚本

### 9.3 版本兼容性
- **AE CC 2020 (17.0)**：完全支持
- **AE CC 2019**：可能需要调整部分 API 调用
- **更早版本**：不保证兼容性

## 10. 开发者注意事项

### 10.1 脚本调试
```javascript
// 调试输出到控制台
$.writeln("调试信息: " + variable);

// 显示警告对话框
alert("错误信息");
```

### 10.2 性能优化
- 避免在 UI 线程执行耗时操作
- 使用 `app.scheduleTask()` 实现异步操作
- 及时释放不需要的对象引用

### 10.3 打包为.jsxbin
使用 Adobe ExtendScript Toolkit 编译：
1. 打开 .jsx 文件
2. 选择 `File > Export...`
3. 选择 `.jsxbin` 格式
4. 保存到目标位置

---

**文档版本**：1.0  
**最后更新**：2026-03-21  
**适用版本**：Auto_Tinify v2.0.4