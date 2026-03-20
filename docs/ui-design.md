# UI面板设计（ScriptUI）

## 1. ScriptUI面板结构与布局

### 1.1 面板架构
Auto_Tinify 使用 ScriptUI 框架构建，采用经典的三栏式布局：

```
┌─────────────────────────────────────────────┐
│                标题栏                        │
│  [关闭] [最小化] [最大化] Auto_Tinify v2.0.4  │
├─────────────────────────────────────────────┤
│                 主内容区                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  压缩区域 │ │  设置区域 │ │  日志区域 │   │
│  └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────┤
│                 状态栏                        │
│  剩余 450/500 | 路径：C:\Projects            │
└─────────────────────────────────────────────┘
```

### 1.2 面板尺寸规格
- **最小尺寸**：300×400 像素
- **推荐尺寸**：400×600 像素
- **最大尺寸**：不限（支持动态调整）

### 1.3 布局容器类型
```javascript
// 主面板容器
var panel = new Window("palette", "Auto_Tinify", undefined, {resizeable: true});
panel.orientation = "column";
panel.alignChildren = ["fill", "top"];
panel.spacing = 10;
panel.margins = 16;

// 分组容器
var group = panel.add("group");
group.orientation = "row";
group.alignChildren = ["left", "center"];
group.spacing = 8;
```

## 2. 视觉设计原则

### 2.1 设计语言
采用 Adobe 原生 ScriptUI 风格，与 After Effects 界面保持一致性：

- **配色方案**：深色主题（与AE界面匹配）
- **字体**：系统默认UI字体
- **控件尺寸**：符合AE标准高度（24-28像素）
- **间距**：使用8像素基准间距系统

### 2.2 颜色规范
```javascript
// 颜色定义
var COLORS = {
    background: [0.2, 0.2, 0.2],      // 深灰背景
    foreground: [0.9, 0.9, 0.9],      // 浅灰前景
    accent: [0.2, 0.6, 1.0],          // 蓝色强调色
    success: [0.2, 0.8, 0.4],         // 绿色成功
    warning: [1.0, 0.7, 0.0],         // 橙色警告
    error: [1.0, 0.3, 0.3],           // 红色错误
    disabled: [0.5, 0.5, 0.5]         // 灰色禁用
};
```

### 2.3 字体规范
```javascript
// 字体定义
var FONTS = {
    regular: ScriptUI.newFont("Arial", "REGULAR", 12),
    bold: ScriptUI.newFont("Arial", "BOLD", 12),
    small: ScriptUI.newFont("Arial", "REGULAR", 10),
    large: ScriptUI.newFont("Arial", "BOLD", 14)
};
```

## 3. 控件类型与设计

### 3.1 按钮控件
```javascript
// 主操作按钮（强调样式）
var compressBtn = group.add("button", undefined, "开始压缩");
compressBtn.helpTip = "压缩选中的图片文件";
compressBtn.graphics.foregroundColor = compressBtn.graphics.newPen(
    compressBtn.graphics.PenType.SOLID_COLOR, 
    COLORS.accent, 
    1
);

// 次要按钮
var settingsBtn = group.add("button", undefined, "设置");
settingsBtn.helpTip = "打开设置面板";
```

### 3.2 输入控件
```javascript
// 文本输入框
var pathInput = panel.add("edittext", undefined, "");
pathInput.characters = 30;
pathInput.helpTip = "输入图片路径，支持 ${projectPath} 变量";

// 数字输入框
var workersInput = panel.add("edittext", undefined, "4");
workersInput.characters = 5;
workersInput.helpTip = "并发处理数量（1-8）";
```

### 3.3 选择控件
```javascript
// 下拉选择框
var formatDropdown = panel.add("dropdownlist", undefined, ["JPG", "PNG", "WebP"]);
formatDropdown.selection = 0;
formatDropdown.helpTip = "选择输出格式";

// 复选框
var replaceCheckbox = panel.add("checkbox", undefined, "替换原图");
replaceCheckbox.value = false;
replaceCheckbox.helpTip = "压缩后直接替换原文件";
```

### 3.4 显示控件
```javascript
// 状态文本
var statusText = panel.add("statictext", undefined, "就绪");
statusText.graphics.foregroundColor = statusText.graphics.newPen(
    statusText.graphics.PenType.SOLID_COLOR, 
    COLORS.success, 
    1
);

// 进度条
var progressGroup = panel.add("group");
var progressBar = progressGroup.add("progressbar", undefined, 0, 100);
progressBar.preferredSize = [200, 20];
var progressText = progressGroup.add("statictext", undefined, "0%");
```

## 4. 事件处理机制

### 4.1 事件类型
```javascript
// 点击事件
compressBtn.onClick = function() {
    startCompression();
};

// 值改变事件
pathInput.onChanging = function() {
    validatePath(this.text);
};

// 选择改变事件
formatDropdown.onChange = function() {
    updateFormatSettings(this.selection.index);
};

// 窗口事件
panel.onResizing = panel.onResize = function() {
    this.layout.resize();
};
```

### 4.2 事件处理函数
```javascript
// 事件分发器
var EventHandler = {
    handlers: {},
    
    register: function(event, callback) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(callback);
    },
    
    trigger: function(event, data) {
        var callbacks = this.handlers[event] || [];
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    }
};
```

### 4.3 异步事件处理
```javascript
// 使用 setTimeout 处理长时间操作
function processFilesAsync(files) {
    app.setTimeout(function() {
        for (var i = 0; i < files.length; i++) {
            compressFile(files[i]);
            updateProgress(i + 1, files.length);
        }
        onComplete();
    }, 0);
}
```

## 5. 响应式设计

### 5.1 窗口缩放支持
```javascript
// 启用窗口调整大小
panel.resizeable = true;

// 响应窗口大小变化
panel.onResizing = panel.onResize = function() {
    // 调整内部组件布局
    var bounds = this.bounds;
    var width = bounds[2] - bounds[0];
    var height = bounds[3] - bounds[1];
    
    // 动态调整组件大小
    compressBtn.preferredSize = [Math.min(200, width - 40), 30];
    
    // 重新布局
    this.layout.layout(true);
};
```

### 5.2 断点设计
```javascript
// 根据宽度调整布局
function updateLayoutForSize(width) {
    if (width < 400) {
        // 紧凑布局
        panel.orientation = "column";
        group.orientation = "column";
    } else {
        // 宽松布局
        panel.orientation = "column";
        group.orientation = "row";
    }
    panel.layout.layout(true);
}
```

## 6. 关键UI组件详解

### 6.1 压缩面板
```javascript
function createCompressionPanel(parent) {
    var panel = parent.add("panel", undefined, "图片压缩");
    panel.orientation = "column";
    panel.alignChildren = ["fill", "top"];
    panel.spacing = 8;
    
    // 文件选择区域
    var fileGroup = panel.add("group");
    fileGroup.orientation = "row";
    
    var fileBtn = fileGroup.add("button", undefined, "选择文件");
    var folderBtn = fileGroup.add("button", undefined, "选择文件夹");
    var clearBtn = fileGroup.add("button", undefined, "清空");
    
    // 文件列表
    var fileList = panel.add("listbox", undefined, [], {
        numberOfColumns: 3,
        showHeaders: true,
        columnWidths: [150, 80, 100]
    });
    fileList.columns = ["文件名", "大小", "状态"];
    
    // 操作按钮
    var btnGroup = panel.add("group");
    var startBtn = btnGroup.add("button", undefined, "开始压缩");
    var pauseBtn = btnGroup.add("button", undefined, "暂停");
    
    return {
        panel: panel,
        fileList: fileList,
        startBtn: startBtn
    };
}
```

### 6.2 设置面板
```javascript
function createSettingsPanel(parent) {
    var panel = parent.add("panel", undefined, "设置");
    panel.orientation = "column";
    panel.alignChildren = ["left", "center"];
    
    // API Key 设置
    var keyGroup = panel.add("group");
    keyGroup.add("statictext", undefined, "API Key:");
    var keyInput = keyGroup.add("edittext", undefined, "");
    keyInput.characters = 30;
    var addKeyBtn = keyGroup.add("button", undefined, "添加");
    
    // 路径设置
    var pathGroup = panel.add("group");
    pathGroup.add("statictext", undefined, "压缩路径:");
    var pathInput = pathGroup.add("edittext", undefined, "");
    pathInput.characters = 25;
    var browseBtn = pathGroup.add("button", undefined, "浏览");
    
    // 高级设置
    var advancedPanel = panel.add("panel", undefined, "高级设置");
    var workersGroup = advancedPanel.add("group");
    workersGroup.add("statictext", undefined, "并发数:");
    var workersDropdown = workersGroup.add("dropdownlist", undefined, ["1", "2", "4", "8"]);
    
    return {
        panel: panel,
        keyInput: keyInput,
        pathInput: pathInput
    };
}
```

### 6.3 日志面板
```javascript
function createLogPanel(parent) {
    var panel = parent.add("panel", undefined, "处理日志");
    panel.orientation = "column";
    
    // 日志文本区域
    var logText = panel.add("edittext", undefined, "", {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    logText.preferredSize = [300, 150];
    
    // 日志控制按钮
    var btnGroup = panel.add("group");
    var clearBtn = btnGroup.add("button", undefined, "清空");
    var saveBtn = btnGroup.add("button", undefined, "保存");
    var copyBtn = btnGroup.add("button", undefined, "复制");
    
    // 日志级别过滤
    var filterGroup = panel.add("group");
    var infoCheck = filterGroup.add("checkbox", undefined, "信息");
    var warnCheck = filterGroup.add("checkbox", undefined, "警告");
    var errorCheck = filterGroup.add("checkbox", undefined, "错误");
    
    return {
        panel: panel,
        logText: logText,
        addLog: function(message, level) {
            var timestamp = new Date().toLocaleTimeString();
            var levelText = level || "INFO";
            logText.text += "[" + timestamp + "] [" + levelText + "] " + message + "\n";
            logText.scrollSelection = [logText.text.length, logText.text.length];
        }
    };
}
```

### 6.4 状态栏
```javascript
function createStatusBar(parent) {
    var panel = parent.add("group");
    panel.orientation = "row";
    panel.alignChildren = ["left", "center"];
    
    // 状态文本
    var statusText = panel.add("statictext", undefined, "就绪");
    
    // 分隔符
    panel.add("statictext", undefined, "|");
    
    // 剩余次数显示
    var quotaText = panel.add("statictext", undefined, "剩余: 500/500");
    
    // 进度指示器
    var progressGroup = panel.add("group");
    var progressBar = progressGroup.add("progressbar", undefined, 0, 100);
    progressBar.preferredSize = [100, 15];
    
    return {
        panel: panel,
        statusText: statusText,
        quotaText: quotaText,
        updateStatus: function(message, type) {
            statusText.text = message;
            // 根据类型更新颜色
        }
    };
}
```

## 7. 图标与视觉反馈

### 7.1 图标使用
```javascript
// 使用字符图标
var icons = {
    folder: "\u{1F4C1}",      // 文件夹图标
    file: "\u{1F4C4}",        // 文件图标
    settings: "\u2699",       // 齿轮图标
    success: "\u2713",        // 对勾图标
    error: "\u2717",          // 叉号图标
    warning: "\u26A0"         // 警告图标
};

// 在按钮中使用图标
var folderBtn = group.add("button", undefined, icons.folder + " 选择文件夹");
```

### 7.2 颜色反馈
```javascript
// 根据状态改变颜色
function updateStatusColor(statusText, status) {
    var color;
    switch(status) {
        case "success":
            color = COLORS.success;
            break;
        case "warning":
            color = COLORS.warning;
            break;
        case "error":
            color = COLORS.error;
            break;
        default:
            color = COLORS.foreground;
    }
    
    statusText.graphics.foregroundColor = statusText.graphics.newPen(
        statusText.graphics.PenType.SOLID_COLOR, 
        color, 
        1
    );
}
```

## 8. 最佳实践

### 8.1 性能优化
1. **延迟加载**：复杂面板在首次显示时创建
2. **批量更新**：避免频繁的UI更新
3. **资源释放**：及时释放不需要的图像资源

### 8.2 可访问性
1. **键盘导航**：支持Tab键切换焦点
2. **帮助提示**：为所有控件添加helpTip
3. **错误提示**：清晰的错误信息和解决建议

### 8.3 国际化准备
```javascript
// 文本资源分离
var TEXTS = {
    title: "Auto_Tinify",
    compressBtn: "开始压缩",
    settingsBtn: "设置",
    // ... 其他文本
};

// 使用文本资源
var title = TEXTS.title;
```

---

**设计原则**：保持与 After Effects 原生界面的一致性，提供直观、高效的用户体验。

**文档版本**：1.0  
**最后更新**：2026-03-21