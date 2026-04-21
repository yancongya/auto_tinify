# 核心功能说明

## 1. 智能压缩功能

### 1.1 压缩引擎集成
Auto_Tinify 集成 Tinify API（TinyPNG/TinyJPG）提供高质量图片压缩：

```javascript
// 压缩核心函数
function compressImage(imageFile, apiKey) {
    // 1. 读取图片文件
    var imageData = readImageFile(imageFile);
    
    // 2. 调用 Tinify API
    var result = callTinifyAPI(imageData, apiKey);
    
    // 3. 保存压缩后的图片
    saveCompressedImage(result, imageFile);
    
    return {
        originalSize: imageData.size,
        compressedSize: result.size,
        savings: calculateSavings(imageData.size, result.size)
    };
}
```

### 1.2 支持的图片格式
- **JPG/JPEG**：最常用的图片格式，适用于照片
- **PNG**：支持透明通道，适用于图形和UI元素
- **WebP**：现代图片格式，提供更好的压缩率

### 1.3 压缩算法特点
1. **智能分析**：根据图片内容自动选择最佳压缩参数
2. **质量保持**：视觉质量几乎无损，文件大小显著减小
3. **格式优化**：针对不同格式使用不同的优化策略

### 1.4 压缩质量控制
```javascript
// 压缩配置选项
var compressionOptions = {
    quality: "auto",        // 自动质量（推荐）
    // quality: 80,         // 手动指定质量（1-100）
    stripMetadata: true,    // 移除元数据
    preserveCopyright: true // 保留版权信息
};
```

## 2. 多密钥支持与轮换机制

### 2.1 密钥管理架构
```javascript
class APIKeyManager {
    constructor() {
        this.keys = [];
        this.currentIndex = 0;
        this.usageStats = {};
    }
    
    addKey(apiKey) {
        this.keys.push(apiKey);
        this.usageStats[apiKey] = {
            used: 0,
            limit: 500,      // 免费额度
            lastUsed: null
        };
    }
    
    getNextKey() {
        // 智能轮换算法
        var availableKeys = this.getAvailableKeys();
        
        if (availableKeys.length === 0) {
            throw new Error("没有可用的API Key");
        }
        
        // 优先使用剩余次数多的Key
        var selectedKey = this.selectBestKey(availableKeys);
        
        return selectedKey;
    }
    
    getAvailableKeys() {
        var available = [];
        
        for (var i = 0; i < this.keys.length; i++) {
            var key = this.keys[i];
            var stats = this.usageStats[key];
            
            if (stats.used < stats.limit) {
                available.push(key);
            }
        }
        
        return available;
    }
}
```

### 2.2 智能轮换策略
1. **顺序轮换**：按添加顺序使用API Key
2. **权重轮换**：根据剩余次数分配使用权重
3. **故障转移**：自动切换到备用Key

### 2.3 使用统计与监控
```javascript
// 实时监控每个Key的状态
function updateKeyStatistics(apiKey, success) {
    var stats = keyManager.usageStats[apiKey];
    
    if (success) {
        stats.used++;
        stats.lastUsed = new Date();
    }
    
    // 更新UI显示
    updateKeyDisplay(apiKey, stats);
    
    // 检查是否需要警告
    if (stats.used >= stats.limit * 0.9) {
        showWarning("API Key " + apiKey.substr(0, 8) + "... 即将达到使用限制");
    }
}
```

## 3. 快捷操作

### 3.1 快捷键设计
```javascript
// 注册快捷键
function registerKeyboardShortcuts() {
    // Ctrl+Shift + 点击：压缩 AE 选中的图片
    var modifierMask = ScriptUI.environment.keyboardState.ctrlKey && 
                      ScriptUI.environment.keyboardState.shiftKey;
    
    return {
        compressSelected: modifierMask
    };
}
```

### 3.2 快捷操作实现
```javascript
// 根据快捷键执行不同操作
function handleQuickAction(files, modifiers) {
    if (modifiers.compressSelected) {
        // 压缩 AE 选中的文件
        return compressSelectedFiles(files);
    } else {
        // 默认操作：压缩配置路径下的文件夹
        return compressConfigFolder();
    }
}
```

### 3.3 操作反馈
```javascript
// 提供视觉反馈
function showActionFeedback(action) {
    var feedbackText = "";
    var feedbackColor = "";
    
    switch(action) {
        case "compress_selected":
            feedbackText = "压缩选中文件";
            feedbackColor = COLORS.accent;
            break;
        default:
            feedbackText = "压缩文件夹";
            feedbackColor = COLORS.success;
    }
    
    // 显示临时反馈
    showTemporaryMessage(feedbackText, feedbackColor);
}
```

## 4. 路径配置与变量支持

### 4.1 路径变量系统
```javascript
class PathResolver {
    constructor() {
        this.variables = {
            '${projectPath}': this.getProjectPath(),
            '${timestamp}': this.getTimestamp(),
            '${random}': this.getRandomString()
        };
    }
    
    resolve(path) {
        var resolvedPath = path;
        
        // 替换所有变量
        for (var key in this.variables) {
            if (this.variables.hasOwnProperty(key)) {
                var value = this.variables[key];
                resolvedPath = resolvedPath.replace(
                    new RegExp(this.escapeRegExp(key), 'g'), 
                    value
                );
            }
        }
        
        return resolvedPath;
    }
    
    getProjectPath() {
        var project = app.project;
        if (project && project.file) {
            return project.file.parent.fsName;
        }
        return Folder.myDocuments.fsName;
    }
}
```

### 4.2 正则表达式支持
```javascript
// 使用正则表达式匹配文件
function matchFilesByPattern(folder, pattern) {
    var matchedFiles = [];
    var regex = new RegExp(pattern);
    
    var files = folder.getFiles();
    
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        
        if (file instanceof File) {
            if (regex.test(file.name)) {
                matchedFiles.push(file);
            }
        }
    }
    
    return matchedFiles;
}
```

### 4.3 路径验证与修复
```javascript
// 验证和修复路径
function validateAndFixPath(path) {
    // 转换为绝对路径
    if (!Path.isAbsolute(path)) {
        var projectPath = resolver.getProjectPath();
        path = projectPath + "/" + path;
    }
    
    // 标准化路径分隔符
    path = path.replace(/\\/g, "/");
    
    // 确保目录存在
    var folder = new Folder(path);
    if (!folder.exists) {
        folder.create();
    }
    
    return path;
}
```

## 5. 实时监控与状态显示

### 5.1 状态监控系统
```javascript
class StatusMonitor {
    constructor() {
        this.currentStatus = "idle";
        this.currentFile = null;
        this.progress = 0;
        this.stats = {
            total: 0,
            processed: 0,
            succeeded: 0,
            failed: 0,
            totalSavings: 0
        };
    }
    
    updateProgress(processed, total) {
        this.progress = Math.round((processed / total) * 100);
        
        // 更新进度条
        progressBar.value = this.progress;
        progressText.text = this.progress + "%";
        
        // 更新状态文本
        statusText.text = "处理中: " + processed + "/" + total;
    }
    
    updateQuota(used, limit) {
        quotaText.text = "剩余: " + (limit - used) + "/" + limit;
        
        // 更新颜色表示状态
        var usageRate = used / limit;
        if (usageRate > 0.9) {
            quotaText.graphics.foregroundColor = 
                quotaText.graphics.newPen(
                    quotaText.graphics.PenType.SOLID_COLOR, 
                    COLORS.error, 1);
        } else if (usageRate > 0.7) {
            quotaText.graphics.foregroundColor = 
                quotaText.graphics.newPen(
                    quotaText.graphics.PenType.SOLID_COLOR, 
                    COLORS.warning, 1);
        }
    }
}
```

### 5.2 进度可视化
```javascript
// 创建进度动画
function createProgressAnimation() {
    var dots = [".", "..", "..."];
    var index = 0;
    
    return {
        start: function() {
            this.interval = setInterval(function() {
                statusText.text = "处理中" + dots[index];
                index = (index + 1) % dots.length;
            }, 300);
        },
        
        stop: function() {
            clearInterval(this.interval);
        }
    };
}
```

## 6. 日志记录系统

### 6.1 多级日志
```javascript
class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 1000;
    }
    
    log(message, level, data) {
        var entry = {
            timestamp: new Date(),
            level: level || "INFO",
            message: message,
            data: data || {}
        };
        
        this.logs.push(entry);
        
        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        // 输出到控制台
        this.outputToConsole(entry);
        
        // 更新UI
        this.updateLogDisplay(entry);
    }
    
    info(message, data) {
        this.log(message, "INFO", data);
    }
    
    warn(message, data) {
        this.log(message, "WARN", data);
    }
    
    error(message, data) {
        this.log(message, "ERROR", data);
    }
}
```

### 6.2 日志输出格式
```javascript
// 格式化日志输出
function formatLogEntry(entry) {
    var timestamp = entry.timestamp.toISOString();
    var level = entry.level.padEnd(5);
    var message = entry.message;
    
    var formatted = "[" + timestamp + "] " + level + " " + message;
    
    // 如果有额外数据，添加JSON格式
    if (entry.data && Object.keys(entry.data).length > 0) {
        formatted += "\n" + JSON.stringify(entry.data, null, 2);
    }
    
    return formatted;
}
```

### 6.3 日志文件管理
```javascript
// 保存日志到文件
function saveLogToFile(logs, filename) {
    var logFile = new File(Folder.desktop.fsName + "/" + filename);
    
    logFile.open("w");
    
    for (var i = 0; i < logs.length; i++) {
        var entry = logs[i];
        logFile.writeln(formatLogEntry(entry));
    }
    
    logFile.close();
    
    return logFile;
}
```

## 7. 配置持久化

### 7.1 配置文件结构
```javascript
// 默认配置
var defaultConfig = {
    version: "2.0.5",
    apiKeys: [],
    settings: {
        outputPath: "${projectPath}/compressed",
        maxWorkers: 4,
        preserveOriginal: false,
        autoReplace: false,
        logLevel: "INFO"
    },
    lastUsed: null,
    statistics: {
        totalCompressions: 0,
        totalSavings: 0
    }
};

// 配置管理器
class ConfigManager {
    constructor() {
        this.config = this.loadConfig();
    }
    
    getConfigPath() {
        var appData = Folder.fsName + "/Application Support/Auto_Tinify";
        var configDir = new Folder(appData);
        
        if (!configDir.exists) {
            configDir.create();
        }
        
        return configDir.fsName + "/config.json";
    }
    
    loadConfig() {
        try {
            var configFile = new File(this.getConfigPath());
            
            if (configFile.exists) {
                configFile.open("r");
                var content = configFile.read();
                configFile.close();
                
                return JSON.parse(content);
            }
        } catch (e) {
            // 使用默认配置
        }
        
        return defaultConfig;
    }
    
    saveConfig() {
        try {
            var configFile = new File(this.getConfigPath());
            
            configFile.open("w");
            configFile.write(JSON.stringify(this.config, null, 2));
            configFile.close();
            
            return true;
        } catch (e) {
            return false;
        }
    }
}
```

### 7.2 配置加密（简单编码）
```javascript
// 简单的Base64编码（不是真正的加密，但可以防止明文）
function simpleEncode(text) {
    return Utilities.base64Encode(text);
}

function simpleDecode(encoded) {
    return Utilities.base64Decode(encoded);
}

// 保存编码后的配置
function saveEncodedConfig(config) {
    var encoded = simpleEncode(JSON.stringify(config));
    // 保存到文件...
}
```

## 8. 项目集成方式

### 8.1 AE项目集成
```javascript
// 检测当前项目
function detectProject() {
    var project = app.project;
    
    if (!project) {
        return {
            detected: false,
            message: "没有打开的项目"
        };
    }
    
    var projectFile = project.file;
    
    return {
        detected: true,
        name: projectFile ? projectFile.name : "未保存的项目",
        path: projectFile ? projectFile.parent.fsName : null,
        itemCount: project.numItems
    };
}
```

### 8.2 批量处理项目资源
```javascript
// 扫描项目中的所有图片
function scanProjectImages() {
    var project = app.project;
    var imageItems = [];
    
    for (var i = 1; i <= project.numItems; i++) {
        var item = project.item(i);
        
        if (item instanceof FootageItem) {
            var file = item.file;
            
            if (file && isImageFile(file)) {
                imageItems.push({
                    item: item,
                    file: file,
                    name: item.name,
                    path: file.fsName
                });
            }
        }
    }
    
    return imageItems;
}

// 压缩项目中的图片
function compressProjectImages() {
    var images = scanProjectImages();
    
    if (images.length === 0) {
        alert("项目中没有找到图片文件");
        return;
    }
    
    // 批量压缩
    var results = batchCompressImages(images);
    
    // 更新项目中的引用
    updateProjectReferences(results);
}
```

### 8.3 项目文件管理
```javascript
// 智能文件管理
function manageProjectFiles(compressedFiles) {
    var project = app.project;
    var projectPath = project.file.parent.fsName;
    var backupPath = projectPath + "/backup_" + getTimestamp();
    
    // 创建备份目录
    var backupDir = new Folder(backupPath);
    if (!backupDir.exists) {
        backupDir.create();
    }
    
    // 移动原文件到备份
    for (var i = 0; i < compressedFiles.length; i++) {
        var file = compressedFiles[i];
        var backupFile = new File(backupPath + "/" + file.name);
        
        file.copy(backupFile);
        // 删除原文件或保留
    }
}
```

## 9. 功能演示流程

### 9.1 完整压缩流程
```javascript
// 用户操作流程
function demonstrateCompressionWorkflow() {
    // 1. 选择文件
    var files = selectFilesDialog();
    
    if (files.length === 0) {
        return;
    }
    
    // 2. 显示预览
    showCompressionPreview(files);
    
    // 3. 开始压缩
    compressFiles(files, {
        onStart: function() {
            showProgressWindow();
        },
        onProgress: function(progress) {
            updateProgressWindow(progress);
        },
        onComplete: function(results) {
            showResults(results);
        },
        onError: function(error) {
            showError(error);
        }
    });
}
```

### 9.2 错误恢复机制
```javascript
// 断点续传
function resumeCompression(files, startIndex) {
    for (var i = startIndex; i < files.length; i++) {
        try {
            var result = compressFile(files[i]);
            
            // 保存进度
            saveProgress(i + 1, files.length);
            
        } catch (error) {
            // 记录错误但继续
            logger.error("文件压缩失败: " + files[i].name, error);
            
            // 可以选择跳过或重试
            if (shouldRetry(error)) {
                i--; // 重试当前文件
                $.sleep(1000);
            }
        }
    }
}
```

---

**功能特点总结**：
1. **高质量压缩**：保持视觉质量的同时最大化文件压缩
2. **智能管理**：多API密钥自动轮换，避免使用限制
3. **便捷操作**：Ctrl+Shift快捷键压缩选中文件
4. **灵活配置**：支持变量路径和正则表达式匹配
5. **实时反馈**：清晰的进度指示和状态显示
6. **完整日志**：详细的处理记录，便于问题排查
7. **持久配置**：自动保存用户设置，下次启动恢复
8. **项目集成**：直接操作AE项目中的图片资源
9. **便捷选择**：通过对话框快速选择文件/文件夹进行压缩
10. **压缩对比**：压缩前预先保存文件大小，完成后准确显示对比数据
11. **统一交互**：所有压缩入口统一询问"替换原图"或"添加后缀保存副本"，无Alt键快捷键

**文档版本**：1.1  
**最后更新**：2026-04-21