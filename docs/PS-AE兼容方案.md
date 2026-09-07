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

## 四、快捷键功能映射

| 快捷键 | AE | PS |
|--------|----|----|
| 点击 | 压缩配置路径下的文件夹 | 压缩配置路径下的文件夹 |
| Ctrl+Shift | 导出选中图层为 PNG 并压缩 | 导出选中图层为 PNG 并压缩 |
| Alt | 压缩项目中选中的图片素材文件 | — |

按钮文本随按键动态切换：`开始压缩` / `导出图层并压缩` / `压缩选中素材`（通过 `keydown`/`keyup` 事件监听）。

### PS 图层导出压缩流程

1. 检查文档是否已保存（未保存则提示并退出）
2. 在文档旁边创建导出目录（默认 `images`，可通过输入框修改）
3. 通过 ActionManager `targetLayers` 获取所有选中图层
4. 逐个图层处理：
   - 选中 → 复制 → 新建透明文档（按图层边界尺寸）
   - 粘贴 → 导出为 PNG 到导出目录
   - 关闭临时文档（不保存）
5. 对所有导出的 PNG 进行 Tinify 压缩
6. 用压缩后的文件替换导出文件

### PS 图层多选检测

PS 的 ExtendScript 不支持直接获取 Ctrl 多选图层的 ID（`getIdentifier` 报错）。解决方案：

1. 通过 `targetLayers` ActionReference 获取选中数量
2. 对列表中每个引用调用 `executeActionGet(layerRef)` 获取图层描述符
3. 从描述符中提取 `layerID` 和 `name`
4. 用 ID 匹配文档中实际的图层对象

```javascript
var list = desc.getList(stringIDToTypeID("targetLayers"));
for (var i = 0; i < list.count; i++) {
    var layerRef = list.getReference(i);
    var layerDesc = executeActionGet(layerRef);
    var layerID = layerDesc.getInteger(stringIDToTypeID("layerID"));
    var layerName = layerDesc.getString(stringIDToTypeID("name"));
}
```

> **踩坑记录**：`getReference(i).getIdentifier(charIDToTypeID("Lyr "))` 在部分 PS 版本中报"常规 Photoshop 错误"，改用 `executeActionGet` 可绕过。

### PS 导出目录输入框

在面板中"开始压缩"按钮下方增加导出目录输入行（AE/PS 均显示）：
- 默认值 `images`，修改后自动保存
- 点击 **"导出目录:"** 标签 → 读取当前选中图层，弹窗显示列表并写入日志
- 悬浮提示显示待导出图层名称

> PS 参考脚本：`source/reference/导出选中图层为PSD.jsx`，简化为直接导出 PNG 而非先存 PSD。
> AE 参考脚本：`source/reference/Eagle2Ae-Ae/jsx/hostscript.jsx`，使用渲染队列导出单帧 PNG。

### AE 图层导出压缩流程

1. 检查项目已保存、合成已打开、有选中图层
2. 在项目文件旁边创建导出目录
3. 保存渲染队列状态，清空现有渲染项
4. 逐个图层处理：
   - 创建临时合成（按图层源素材尺寸）
   - 添加图层源到临时合成
   - 渲染队列渲染为 PNG（使用最后一个输出模板）
   - AE 单帧渲染会加 `00000` 后缀，需重命名
   - 清理临时合成和渲染队列项
5. 恢复渲染队列状态
6. 对所有导出的 PNG 进行 Tinify 压缩替换

### AE 专属 API 禁用清单

以下 API 在 PS 中不存在，需要在函数入口加守卫：

| AE 专属 API | 说明 | 处理方式 |
|-------------|------|---------|
| `app.project` | AE 项目对象 | PS 无此对象 |
| `app.project.selection` | 项目面板选中项 | PS 无此概念 |
| `app.project.activeItem` | 当前合成 | PS 无此概念 |
| `FootageItem` | AE 素材类 | PS 无此类型 |
| `CompItem` | AE 合成类 | PS 无此类型 |
| `AVLayer` | AE 音视频图层 | PS 无此类型 |

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
| 全局变量 | 新增 `psExportFolderName`（导出目录名）和 `psSelectedLayerNames`（选中图层缓存） |
| 副标题 | `"After Effects 图片压缩工具"` → `"支持AE/PS"` |
| `resolvePathPattern` | PS 用 `app.activeDocument.path`，AE 用 `app.project.file` |
| `getSelectedImageFiles` | PS 入口直接返回空数组 |
| `getPSSelectedLayers` | **新增** PS 多选图层检测（targetLayers + executeActionGet） |
| `getSelectedLayerNames` | **新增** AE/PS 双平台选中图层名称列表 |
| `updateExportTooltip` | **新增** 更新导出目录悬浮提示（AE/PS） |
| `exportAndCompressPSSelectedLayers` | **新增** PS 图层导出压缩函数 |
| `exportAndCompressAESelectedLayers` | **新增** AE 图层导出压缩函数（渲染队列） |
| UI | 新增导出目录输入行（AE/PS 均显示），点击标签读取选中图层 |
| `uploadButton.onClick` | Ctrl+Shift 双平台导出 / Alt 仅 AE 素材压缩 |
| `keydown`/`keyup` | **新增** 按钮文本动态切换 |
| `urlOpen` | `system.callSystem` → `callSystem` |
| `getApiKeyUsageCount` | `system.callSystem` → `callSystem` |
| `compressImage` | `system.callSystem` → `callSystem` |
| `win` 创建 | PS 用 `"dialog"`，AE 用 `"palette"` |
| 窗口标题 | 末尾添加 `[PS]` / `[AE]` 环境标识 |
| 未保存提示 | PS/AE 分别显示不同文案 |
| 启动日志 | 输出当前运行环境 |
| 帮助文本 | 更新快捷键功能描述（三模式） |

---

## 八、踩坑记录

| 问题 | 表现 | 解决方案 |
|------|------|---------|
| PS palette 不常驻 | 脚本结束后窗口销毁 | PS 改用 `"dialog"` 模态窗口 |
| `String.trim` 不可用 | `read().trim()` 报错 | 添加 ES3 polyfill |
| `Array.indexOf` 不可用 | `[].indexOf(ext)` 报错 | 添加 ES3 polyfill |
| `system.callSystem` 不存在 | curl 命令执行报错 | PS 改用 `app.system()` |
| `getIdentifier` 报错 | PS 多选图层只识别一个 | 改用 `executeActionGet(layerRef)` 提取信息 |
| dialog 标题被覆盖 | PS 标题栏显示宿主版本 | PS 固有行为，无法改变 |
| `onDraw` 覆盖按钮绘制 | 按钮不显示 | 改用 `keydown`/`keyup` 事件监听 |
| AE 单帧渲染后缀 | 渲染文件名加 `00000` | 渲染后重命名去掉后缀 |

---

## 九、测试要点

| 测试项 | AE | PS |
|--------|----|----|
| 窗口打开 | palette 常驻 | dialog 模态 |
| 窗口标题 | 正常显示版本 | PS 追加宿主版本（固有行为） |
| 导出目录输入框 | 显示，默认 `images`，可修改 | 显示，默认 `images`，可修改 |
| 点击"导出目录:"标签 | 读取选中图层，弹窗+日志 | 读取选中图层，弹窗+日志 |
| 图层多选识别 | `selectedLayers` | `executeActionGet` 提取 layerID + name |
| 按钮文本切换 | 三模式动态切换 | 三模式动态切换 |
| Ctrl+Shift | 导出选中图层渲染 PNG 并压缩 | 导出选中图层复制 PNG 并压缩 |
| Alt | 压缩项目中选中的图片素材 | — |
| 选择文件压缩 | 正常工作 | 正常工作 |
| 选择文件夹压缩 | 正常工作 | 正常工作 |
| curl 命令执行 | `system.callSystem` | `app.system` |
| 打开外部链接 | 正常工作 | 正常工作 |
| API Key 管理 | 正常工作 | 正常工作 |
| 路径设置 | 正常工作 | 正常工作 |
| `String.trim` | 正常工作 | polyfill |
| `Array.indexOf` | 正常工作 | polyfill |
