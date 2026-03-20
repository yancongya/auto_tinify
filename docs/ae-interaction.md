# 与After Effects交互

## 1. AE对象模型概述

### 1.1 核心对象层次
After Effects 使用层次化的对象模型，主要对象包括：

```
app (Application)
├── project (Project)
│   ├── folderItem (FolderItem)
│   ├── footageItem (FootageItem)
│   ├── composition (Composition)
│   └── ...
├── preferences (Preferences)
└── ...
```

### 1.2 与图片压缩相关的核心对象
1. **app**：应用程序根对象
2. **project**：当前项目对象
3. **item**：项目中的各种项目项
4. **file**：文件系统对象
5. **folder**：文件夹系统对象

## 2. 选择图片文件的方式

### 2.1 通过AE项目面板选择
```javascript
// 获取当前选中的项目项
function getSelectedItems() {
    var project = app.project;
    var selectedItems = [];
    
    for (var i = 1; i <= project.numItems; i++) {
        var item = project.item(i);
        if (item.selected) {
            selectedItems.push(item);
        }
    }
    
    return selectedItems;
}

// 过滤出图片文件
function filterImageItems(items) {
    var imageItems = [];
    var imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "bmp"];
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item instanceof FootageItem) {
            var file = item.file;
            if (file) {
                var ext = file.name.split(".").pop().toLowerCase();
                if (imageExtensions.indexOf(ext) !== -1) {
                    imageItems.push(item);
                }
            }
        }
    }
    
    return imageItems;
}
```

### 2.2 通过文件对话框选择
```javascript
// 使用系统文件对话框选择图片
function selectFilesDialog() {
    var fileFilter = "图片文件:*.jpg;*.jpeg;*.png;*.webp;*.gif;*.bmp";
    var files = File.openDialog("选择图片文件", fileFilter, true);
    
    if (files && files.length > 0) {
        return files;
    }
    
    return [];
}

// 选择文件夹并扫描其中的图片
function selectFolderDialog() {
    var folder = Folder.selectDialog("选择包含图片的文件夹");
    
    if (folder) {
        return scanFolderForImages(folder);
    }
    
    return [];
}

// 递归扫描文件夹中的图片
function scanFolderForImages(folder) {
    var imageFiles = [];
    var imageExtensions = ["jpg", "jpeg", "png", "webp", "gif", "bmp"];
    
    var items = folder.getFiles();
    
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        
        if (item instanceof Folder) {
            // 递归扫描子文件夹
            var subFiles = scanFolderForImages(item);
            imageFiles = imageFiles.concat(subFiles);
        } else if (item instanceof File) {
            // 检查文件扩展名
            var ext = item.name.split(".").pop().toLowerCase();
            if (imageExtensions.indexOf(ext) !== -1) {
                imageFiles.push(item);
            }
        }
    }
    
    return imageFiles;
}
```

### 2.3 从AE项目路径获取图片
```javascript
// 根据项目路径模式匹配图片
function getImagesByPathPattern(pattern) {
    var project = app.project;
    var projectFile = project.file;
    
    if (!projectFile) {
        return [];
    }
    
    var projectFolder = projectFile.parent;
    var searchFolder = new Folder(projectFolder.fsName + "/" + pattern);
    
    if (searchFolder.exists) {
        return scanFolderForImages(searchFolder);
    }
    
    return [];
}

// 使用 ${projectPath} 变量解析路径
function resolvePathVariables(path) {
    var project = app.project;
    var projectFile = project.file;
    
    if (projectFile) {
        var projectPath = projectFile.parent.fsName;
        path = path.replace(/\$\{projectPath\}/g, projectPath);
    }
    
    return path;
}
```

## 3. 脚本执行上下文

### 3.1 全局上下文与局部上下文
```javascript
// 全局脚本（在ScriptUI面板中运行）
// 可以访问 app、project 等全局对象
function main() {
    var project = app.project;  // 全局对象
    
    // 创建面板
    var panel = new Window("palette", "Auto_Tinify");
    // ...
}

// 脚本模块（在运行时加载）
// 使用 (function() { ... })() 创建独立作用域
(function() {
    // 私有变量和函数
    var privateVar = "private";
    
    function privateFunction() {
        // 私有函数
    }
    
    // 导出公共接口
    this.publicFunction = function() {
        // 公共函数
    };
})();
```

### 3.2 脚本启动方式的影响
```javascript
// 通过 File > Scripts > Run Script File 启动
// 具有完整的 AE API 访问权限

// 通过 ScriptUI Panels 启动
// 具有完整的 AE API 访问权限，且可以创建持久面板

// 通过 startup scripts 启动
// 在 AE 启动时运行，可以初始化全局设置
```

## 4. 与AE面板的通信

### 4.1 ScriptUI面板内部通信
```javascript
// 创建事件处理器
function createEventHandlers(panel) {
    var handlers = {
        compressStart: [],
        compressComplete: [],
        fileSelected: [],
        errorOccurred: []
    };
    
    return {
        on: function(event, callback) {
            if (handlers[event]) {
                handlers[event].push(callback);
            }
        },
        
        emit: function(event, data) {
            var callbacks = handlers[event] || [];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](data);
            }
        }
    };
}
```

### 4.2 与其他脚本的通信
```javascript
// 通过全局变量通信
if (typeof AUTO_TINIFY === "undefined") {
    var AUTO_TINIFY = {
        version: "2.0.4",
        compress: function(files) {
            // 压缩函数
        },
        getStatus: function() {
            // 获取状态
        }
    };
}

// 其他脚本可以调用
// AUTO_TINIFY.compress(files);
```

### 4.3 通过文件通信
```javascript
// 临时文件通信
function communicateViaTempFile(data) {
    var tempFile = new File(Folder.temp.fsName + "/auto_tinify_comm.json");
    
    // 写入数据
    tempFile.open("w");
    tempFile.write(JSON.stringify(data));
    tempFile.close();
    
    // 其他脚本可以读取此文件
    return tempFile;
}
```

## 5. 错误处理与AE API限制

### 5.1 AE API限制
```javascript
// 检查API可用性
function checkAPIAvailability() {
    try {
        // 测试基本API
        var project = app.project;
        if (!project) {
            throw new Error("无法访问项目");
        }
        
        // 测试文件系统API
        var testFile = new File(Folder.temp.fsName + "/test.txt");
        testFile.open("w");
        testFile.write("test");
        testFile.close();
        testFile.remove();
        
        return true;
    } catch (e) {
        alert("API不可用: " + e.message);
        return false;
    }
}

// 处理AE版本兼容性
function checkAEVersion() {
    var version = app.version;
    var majorVersion = parseInt(version.split(".")[0]);
    
    if (majorVersion < 17) {
        alert("需要 After Effects CC 2020 或更高版本");
        return false;
    }
    
    return true;
}
```

### 5.2 常见错误处理
```javascript
// 文件操作错误处理
function safeFileOperation(file, operation) {
    try {
        if (!file.exists) {
            throw new Error("文件不存在: " + file.fsName);
        }
        
        if (!file.readonly) {
            throw new Error("文件只读: " + file.fsName);
        }
        
        return operation(file);
    } catch (e) {
        logError("文件操作失败: " + e.message);
        return null;
    }
}

// 网络错误处理
function safeNetworkRequest(url, data) {
    var maxRetries = 3;
    var retryDelay = 1000; // 毫秒
    
    for (var i = 0; i < maxRetries; i++) {
        try {
            var response = makeNetworkRequest(url, data);
            if (response) {
                return response;
            }
        } catch (e) {
            if (i < maxRetries - 1) {
                $.sleep(retryDelay * (i + 1));
            } else {
                throw new Error("网络请求失败，已重试" + maxRetries + "次: " + e.message);
            }
        }
    }
    
    return null;
}
```

### 5.3 内存管理
```javascript
// 监控内存使用
function monitorMemoryUsage() {
    var memoryInfo = {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0
    };
    
    try {
        // ExtendScript 没有直接的内存API，通过性能监控估算
        var startTime = new Date().getTime();
        
        // 创建测试对象
        var testArray = [];
        for (var i = 0; i < 100000; i++) {
            testArray.push(i);
        }
        
        var endTime = new Date().getTime();
        var memoryUsage = (endTime - startTime) * 1000; // 估算字节数
        
        // 清理
        testArray = null;
        
        return {
            estimatedUsage: memoryUsage,
            performanceTime: endTime - startTime
        };
    } catch (e) {
        return null;
    }
}

// 清理资源
function cleanupResources() {
    // 强制垃圾回收（ExtendScript不保证）
    $.gc && $.gc();
    
    // 清理临时文件
    cleanupTempFiles();
    
    // 释放图像缓存
    clearImageCache();
}
```

## 6. 性能优化建议

### 6.1 批量操作优化
```javascript
// 批量处理文件，减少API调用
function batchProcessFiles(files, processFunction) {
    var batchSize = 10; // 每批处理数量
    var results = [];
    
    for (var i = 0; i < files.length; i += batchSize) {
        var batch = files.slice(i, i + batchSize);
        
        // 批量处理
        var batchResults = processFunction(batch);
        results = results.concat(batchResults);
        
        // 更新进度
        updateProgress(i + batch.length, files.length);
        
        // 避免UI冻结
        if (i % 50 === 0) {
            $.sleep(10); // 短暂休息
        }
    }
    
    return results;
}
```

### 6.2 缓存机制
```javascript
// 文件信息缓存
var fileCache = {};
function getCachedFileInfo(file) {
    var key = file.fsName;
    
    if (fileCache[key]) {
        // 检查缓存是否过期
        var cached = fileCache[key];
        var currentTime = new Date().getTime();
        
        if (currentTime - cached.timestamp < 300000) { // 5分钟过期
            return cached.info;
        }
    }
    
    // 重新获取文件信息
    var info = getFileInfo(file);
    fileCache[key] = {
        info: info,
        timestamp: new Date().getTime()
    };
    
    return info;
}
```

### 6.3 异步操作
```javascript
// 使用 setTimeout 实现异步
function processFilesAsync(files, callback) {
    var index = 0;
    
    function processNext() {
        if (index < files.length) {
            var file = files[index];
            processFile(file);
            index++;
            
            // 更新UI
            updateProgress(index, files.length);
            
            // 安排下一个任务
            app.setTimeout(processNext, 10);
        } else {
            // 完成回调
            if (callback) {
                callback();
            }
        }
    }
    
    processNext();
}
```

## 7. 调试技巧

### 7.1 日志输出
```javascript
// 扩展日志功能
function createLogger() {
    var logLevels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };
    
    var currentLevel = logLevels.INFO;
    
    return {
        debug: function(message) {
            if (currentLevel <= logLevels.DEBUG) {
                $.writeln("[DEBUG] " + message);
            }
        },
        
        info: function(message) {
            if (currentLevel <= logLevels.INFO) {
                $.writeln("[INFO] " + message);
            }
        },
        
        warn: function(message) {
            if (currentLevel <= logLevels.WARN) {
                $.writeln("[WARN] " + message);
            }
        },
        
        error: function(message) {
            if (currentLevel <= logLevels.ERROR) {
                $.writeln("[ERROR] " + message);
            }
        }
    };
}
```

### 7.2 错误堆栈跟踪
```javascript
// 获取错误堆栈
function getStackTrace(error) {
    var stack = [];
    
    // ExtendScript 不支持完整的堆栈跟踪，但可以手动记录
    if (error.fileName) {
        stack.push("文件: " + error.fileName);
    }
    
    if (error.lineNumber) {
        stack.push("行号: " + error.lineNumber);
    }
    
    if (error.message) {
        stack.push("消息: " + error.message);
    }
    
    return stack.join("\n");
}
```

### 7.3 性能分析
```javascript
// 简单的性能计时器
function createTimer() {
    var startTime = new Date().getTime();
    
    return {
        start: function() {
            startTime = new Date().getTime();
        },
        
        stop: function() {
            var endTime = new Date().getTime();
            return endTime - startTime;
        },
        
        log: function(operation) {
            var duration = this.stop();
            $.writeln(operation + " 耗时: " + duration + "ms");
        }
    };
}
```

## 8. 最佳实践

### 8.1 错误预防
1. **输入验证**：验证所有用户输入和文件路径
2. **边界检查**：检查数组边界、文件存在性等
3. **异常捕获**：使用 try-catch 包裹关键操作

### 8.2 资源管理
1. **及时释放**：不再使用的对象设为 null
2. **文件句柄**：确保文件正确关闭
3. **内存监控**：监控内存使用，避免泄漏

### 8.3 用户体验
1. **进度反馈**：长时间操作提供进度指示
2. **可取消操作**：允许用户取消长时间操作
3. **清晰错误信息**：提供用户友好的错误信息

---

**注意事项**：
1. After Effects 的 ExtendScript 基于 ES3 标准，不支持现代 JavaScript 特性
2. 某些 API 可能因 AE 版本不同而有差异
3. 脚本执行速度可能受系统性能影响

**文档版本**：1.0  
**最后更新**：2026-03-21