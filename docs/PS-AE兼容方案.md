# Auto_Tinify PS/AE 兼容方案

## 背景

Auto_Tinify 原本为 After Effects 开发，使用了大量 AE 专属 API。本次升级目标是让同一份 `.jsx` 脚本在 AE 和 PS 中均可运行，同时不破坏原有 AE 功能。

---

## 一、环境检测

在脚本顶部添加环境变量，后续所有分支逻辑基于此判断：

```javascript
var isPhotoshop = (app.name === "Adobe Photoshop");
var isAfterEffects = !isPhotoshop;
```

> `app.name` 在 AE 中返回 `"Adobe After Effects"`，PS 中返回 `"Adobe Photoshop"`。

---

## 二、窗口类型差异（核心差异）

| 宿主 | `"palette"` | `"dialog"` |
|------|-------------|------------|
| AE   | 常驻悬浮面板，不阻塞 | 模态窗口，阻塞 |
| PS   | 脚本结束即销毁，无法常驻 | 模态窗口，阻塞 |

**结论：PS 必须用 `"dialog"`，AE 用 `"palette"`。**

```javascript
var win = new Window(
    isPhotoshop ? "dialog" : "palette",
    "窗口标题", undefined
);
```

> PS 的 ExtendScript 宿主不支持常驻 palette。曾尝试 `BridgeTalk` 自唤醒、`$.sleep` 循环等方案，均无法在不阻塞 UI 的前提下保持 palette 存活。如需 PS 常驻面板，需改用 CEP 扩展（HTML/JS）。

---

## 三、项目路径获取差异

| 宿主 | 获取项目/文档路径 | 未保存时的行为 |
|------|------------------|---------------|
| AE   | `app.project.file.parent.fsName` | `app.project.file` 为 `null` |
| PS   | `app.activeDocument.path.fsName` | 访问 `.path` 抛异常 |

```javascript
function resolvePathPattern(pattern) {
    var projectPath = null;

    if (isPhotoshop) {
        try {
            if (app.documents.length > 0 && app.activeDocument) {
                var docPath = app.activeDocument.path;
                if (docPath) {
                    projectPath = docPath.fsName;
                }
            }
        } catch (e) {
            // 文档未保存时 app.activeDocument.path 会抛异常
            projectPath = null;
        }
    } else {
        if (app.project && app.project.file) {
            projectPath = app.project.file.parent.fsName;
        }
    }

    if (projectPath) {
        result = result.replace(/\$\{projectPath\}/g, projectPath);
    } else {
        result = result.replace(/\$\{projectPath\}/g, "未保存项目");
    }
    return result;
}
```

**关键注意点：**
- PS 中 `app.activeDocument.path` 在文档未保存时会直接抛异常，必须 `try-catch` 包裹
- PS 的 `app.activeDocument.path` 返回的是 `Folder` 对象（文档所在目录），不是文件路径

---

## 四、AE 专属 API 禁用清单

以下 API 在 PS 中不存在，需要在函数入口加守卫：

| AE 专属 API | 说明 | 处理方式 |
|-------------|------|---------|
| `app.project` | AE 项目对象 | PS 无此对象 |
| `app.project.selection` | 项目面板选中项 | PS 无此概念 |
| `app.project.activeItem` | 当前合成 | PS 无此概念 |
| `FootageItem` | AE 素材类 | PS 无此类型 |
| `CompItem` | AE 合成类 | PS 无此类型 |
| `AVLayer` | AE 音视频图层 | PS 无此类型 |

**禁用方式 — 函数入口守卫：**

```javascript
function getSelectedImageFiles() {
    if (isPhotoshop) {
        addLog("Photoshop 不支持获取选中图片文件功能");
        return [];
    }
    // ... AE 逻辑
}
```

**禁用方式 — 按钮事件守卫：**

```javascript
if (ctrlPressed && shiftPressed) {
    if (isPhotoshop) {
        alert("Photoshop 不支持此功能！");
        return;
    }
    // ... AE 逻辑
}
```

---

## 五、ExtendScript (ES3) 兼容问题

PS 和 AE 的 ExtendScript 均基于 ES3，但部分实现有差异。PS 缺失的 ES5 方法比 AE 更多，需要逐一添加 polyfill。

### 1. `String.prototype.trim` 缺失

PS 部分版本的 ExtendScript 不包含 `trim()` 方法，需添加 polyfill：

```javascript
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
```

> 影响位置：`loadPathPatterns()`、`loadApiKeys()` 中的 `.trim()` 调用。

### 2. `Array.prototype.indexOf` 缺失

PS 的 ExtendScript 不包含 `indexOf()` 方法，调用 `["jpg","png"].indexOf(ext)` 会报错。

```javascript
if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function(searchElement) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === searchElement) return i;
        }
        return -1;
    };
}
```

> 影响位置：`compressFolder()`、`compressFolderWithSuffix()`、`getSelectedImageFiles()` 等文件扩展名判断。

---

## 六、系统命令执行差异

| 宿主 | 执行 shell 命令 |
|------|----------------|
| AE   | `system.callSystem(cmd)` |
| PS   | `app.system(cmd)` |

需封装统一函数：

```javascript
function callSystem(cmd) {
    if (isPhotoshop) {
        return app.system(cmd);
    } else {
        return system.callSystem(cmd);
    }
}
```

> 影响位置：`compressImage()` 中的 curl 上传/下载命令、`urlOpen()` 中的打开链接命令、`getApiKeyUsageCount()` 中的 API 查询命令。

---

## 七、修改清单总览

| 文件位置 | 修改内容 |
|---------|---------|
| 顶部 | 新增 `isPhotoshop` / `isAfterEffects` 环境检测变量 |
| 顶部 | 新增 `String.prototype.trim` polyfill |
| 顶部 | 新增 `Array.prototype.indexOf` polyfill |
| 顶部 | 新增 `callSystem()` 兼容包装函数 |
| 副标题 | `"After Effects 图片压缩工具"` → `"支持AE/PS"` |
| `resolvePathPattern` | PS 用 `app.activeDocument.path`，AE 用 `app.project.file` |
| `getSelectedImageFiles` | PS 入口直接返回空数组 |
| `uploadButton.onClick` | Ctrl+Shift 检测到 PS 时弹窗提示并 return |
| `urlOpen` | `system.callSystem` → `callSystem` |
| `getApiKeyUsageCount` | `system.callSystem` → `callSystem` |
| `compressImage` | `system.callSystem` → `callSystem` |
| `win` 创建 | PS 用 `"dialog"`，AE 用 `"palette"` |
| 未保存提示 | PS/PS 分别显示不同文案 |
| 启动日志 | 输出当前运行环境 |
| 帮助文本 | 移除 "After Effects" 特定描述 |

---

## 八、测试要点

| 测试项 | AE | PS |
|--------|----|----|
| 窗口打开 | palette 常驻 | dialog 模态 |
| 未保存时 `${projectPath}` | 显示 "未保存项目" | 显示 "未保存项目" |
| 已保存时 `${projectPath}` | 项目文件所在目录 | 文档所在目录 |
| Ctrl+Shift 压缩选中文件 | 正常工作 | 弹窗提示不支持 |
| 选择文件压缩 | 正常工作 | 正常工作 |
| 选择文件夹压缩 | 正常工作 | 正常工作 |
| curl 命令执行 | `system.callSystem` | `app.system` |
| 打开外部链接 | 正常工作 | 正常工作 |
| API Key 管理 | 正常工作 | 正常工作 |
| 路径设置 | 正常工作 | 正常工作 |
| `String.trim` | 正常工作 | polyfill |
| `Array.indexOf` | 正常工作 | polyfill |
