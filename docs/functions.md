# 函数参考（ExtendScript）

## 1. 主入口函数

### 1.1 脚本初始化
```javascript
/**
 * 主入口函数 - 脚本启动点
 * @function main
 * @param {string} mode - 运行模式 ("ui"|"cli"|"silent")
 * @returns {Object} 初始化结果
 */
function main(mode) {
    // 检查环境
    if (!checkEnvironment()) {
        return { success: false, error: "环境检查失败" };
    }
    
    // 初始化配置
    var config = ConfigManager.load();
    
    // 初始化API密钥管理器
    var keyManager = new APIKeyManager(config.apiKeys);
    
    // 初始化UI（如果需要）
    if (mode === "ui") {
        var ui = createMainUI();
        ui.show();
    }
    
    return { success: true, config: config };
}
```

### 1.2 环境检查函数
```javascript
/**
 * 检查运行环境
 * @function checkEnvironment
 * @returns {boolean} 环境是否正常
 */
function checkEnvironment() {
    try {
        // 检查AE版本
        var version = app.version;
        var majorVersion = parseInt(version.split(".")[0]);
        
        if (majorVersion < 17) {
            alert("需要 After Effects CC 2020 或更高版本");
            return false;
        }
        
        // 检查网络连接
        if (!checkNetworkConnection()) {
            alert("网络连接不可用");
            return false;
        }
        
        // 检查文件系统权限
        if (!checkFileSystemPermissions()) {
            alert("文件系统权限不足");
            return false;
        }
        
        return true;
    } catch (e) {
        alert("环境检查错误: " + e.message);
        return false;
    }
}

/**
 * 检查网络连接
 * @function checkNetworkConnection
 * @returns {boolean} 网络是否可用
 */
function checkNetworkConnection() {
    try {
        var testURL = "https://api.tinify.com";
        var request = new XMLHttpRequest();
        request.open("HEAD", testURL, false);
        request.send();
        
        return request.status === 200;
    } catch (e) {
        return false;
    }
}
```

## 2. 图像压缩核心函数

### 2.1 压缩引擎类
```javascript
/**
 * 图像压缩引擎
 * @class Compressor
 */
class Compressor {
    constructor(apiKeyManager) {
        this.apiKeyManager = apiKeyManager;
        this.batchSize = 10;
        this.maxRetries = 3;
    }
    
    /**
     * 压缩单个文件
     * @method compressFile
     * @param {File} file - 要压缩的文件
     * @param {Object} options - 压缩选项
     * @returns {Promise} 压缩结果
     */
    compressFile(file, options) {
        return new Promise((resolve, reject) => {
            try {
                // 读取文件
                var imageData = this.readImageFile(file);
                
                // 获取API密钥
                var apiKey = this.apiKeyManager.getNextKey();
                
                // 调用API
                this.callTinifyAPI(imageData, apiKey, options)
                    .then(result => {
                        // 保存结果
                        var savedFile = this.saveCompressedImage(result, file, options);
                        
                        // 更新统计
                        this.updateStatistics(imageData.size, result.size);
                        
                        resolve({
                            success: true,
                            originalFile: file,
                            compressedFile: savedFile,
                            originalSize: imageData.size,
                            compressedSize: result.size,
                            savings: this.calculateSavings(imageData.size, result.size)
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    /**
     * 批量压缩文件
     * @method compressBatch
     * @param {Array<File>} files - 文件数组
     * @param {Function} progressCallback - 进度回调
     * @returns {Promise} 批量压缩结果
     */
    compressBatch(files, progressCallback) {
        return new Promise((resolve, reject) => {
            var results = [];
            var processed = 0;
            
            // 分批处理
            var batches = this.createBatches(files, this.batchSize);
            
            batches.forEach((batch, batchIndex) => {
                // 延迟执行，避免阻塞UI
                app.setTimeout(() => {
                    Promise.all(batch.map(file => this.compressFile(file)))
                        .then(batchResults => {
                            results = results.concat(batchResults);
                            processed += batch.length;
                            
                            // 更新进度
                            if (progressCallback) {
                                progressCallback(processed, files.length, batchResults);
                            }
                            
                            // 检查是否完成
                            if (processed >= files.length) {
                                resolve(results);
                            }
                        })
                        .catch(error => {
                            reject(error);
                        });
                }, batchIndex * 100); // 每批延迟100ms
            });
        });
    }
    
    /**
     * 读取图片文件
     * @method readImageFile
     * @param {File} file - 图片文件
     * @returns {Object} 图片数据
     */
    readImageFile(file) {
        if (!file.exists) {
            throw new Error("文件不存在: " + file.fsName);
        }
        
        // 获取文件信息
        var fileInfo = this.getFileInfo(file);
        
        // 读取文件内容
        file.open("rb");
        var content = file.read();
        file.close();
        
        return {
            file: file,
            content: content,
            size: fileInfo.size,
            type: fileInfo.type
        };
    }
    
    /**
     * 保存压缩后的图片
     * @method saveCompressedImage
     * @param {Object} compressedData - 压缩后的数据
     * @param {File} originalFile - 原始文件
     * @param {Object} options - 保存选项
     * @returns {File} 保存的文件
     */
    saveCompressedImage(compressedData, originalFile, options) {
        var outputPath = options.outputPath || originalFile.parent.fsName;
        var outputName = options.outputName || this.generateOutputName(originalFile);
        
        var outputFile = new File(outputPath + "/" + outputName);
        
        // 创建备份（如果需要）
        if (options.createBackup) {
            this.createBackup(originalFile);
        }
        
        // 保存文件
        outputFile.open("wb");
        outputFile.write(compressedData.content);
        outputFile.close();
        
        return outputFile;
    }
}
```

### 2.2 压缩选项配置
```javascript
/**
 * 压缩选项配置
 * @typedef {Object} CompressionOptions
 * @property {string} quality - 压缩质量 ("auto" 或 1-100)
 * @property {boolean} stripMetadata - 是否移除元数据
 * @property {boolean} preserveCopyright - 是否保留版权信息
 * @property {string} outputPath - 输出路径
 * @property {boolean} createBackup - 是否创建备份
 * @property {number} timeout - 超时时间（毫秒）
 */

// 默认选项
var DEFAULT_COMPRESSION_OPTIONS = {
    quality: "auto",
    stripMetadata: true,
    preserveCopyright: true,
    outputPath: null,
    createBackup: false,
    timeout: 30000
};
```

## 3. API密钥管理函数

### 3.1 密钥管理器类
```javascript
/**
 * API密钥管理器
 * @class APIKeyManager
 */
class APIKeyManager {
    constructor(keys) {
        this.keys = keys || [];
        this.currentIndex = 0;
        this.usage = {};
        this.lastRotation = Date.now();
        
        // 初始化使用统计
        this.keys.forEach(key => {
            this.usage[key] = {
                used: 0,
                limit: 500,
                lastUsed: null,
                failed: 0
            };
        });
    }
    
    /**
     * 获取下一个可用密钥
     * @method getNextKey
     * @returns {string} API密钥
     */
    getNextKey() {
        // 检查是否需要轮换
        if (this.shouldRotateKeys()) {
            this.rotateKeys();
        }
        
        // 获取可用密钥
        var availableKeys = this.getAvailableKeys();
        
        if (availableKeys.length === 0) {
            throw new Error("没有可用的API密钥");
        }
        
        // 选择最佳密钥
        var selectedKey = this.selectBestKey(availableKeys);
        
        // 更新使用统计
        this.updateUsage(selectedKey, true);
        
        return selectedKey;
    }
    
    /**
     * 获取可用密钥列表
     * @method getAvailableKeys
     * @returns {Array<string>} 可用密钥数组
     */
    getAvailableKeys() {
        var available = [];
        var now = Date.now();
        var resetTime = 24 * 60 * 60 * 1000; // 24小时
        
        this.keys.forEach(key => {
            var usage = this.usage[key];
            
            // 检查是否已过重置时间
            if (usage.lastUsed && (now - usage.lastUsed) > resetTime) {
                usage.used = 0;
                usage.failed = 0;
            }
            
            // 检查是否还有剩余次数
            if (usage.used < usage.limit) {
                available.push(key);
            }
        });
        
        return available;
    }
    
    /**
     * 记录使用情况
     * @method recordUsage
     * @param {string} key - API密钥
     * @param {boolean} success - 是否成功
     */
    recordUsage(key, success) {
        this.updateUsage(key, success);
    }
    
    /**
     * 更新使用统计
     * @method updateUsage
     * @param {string} key - API密钥
     * @param {boolean} success - 是否成功
     */
    updateUsage(key, success) {
        var usage = this.usage[key];
        
        if (!usage) {
            return;
        }
        
        usage.lastUsed = Date.now();
        
        if (success) {
            usage.used++;
        } else {
            usage.failed++;
        }
    }
}
```

### 3.2 密钥验证函数
```javascript
/**
 * 验证API密钥
 * @function validateAPIKey
 * @param {string} apiKey - API密钥
 * @returns {Promise} 验证结果
 */
function validateAPIKey(apiKey) {
    return new Promise((resolve, reject) => {
        try {
            var request = new XMLHttpRequest();
            var url = "https://api.tinify.com";
            
            request.open("GET", url, true);
            request.setRequestHeader("Authorization", "Basic " + 
                btoa("api:" + apiKey));
            
            request.onload = function() {
                if (request.status === 200) {
                    var response = JSON.parse(request.responseText);
                    resolve({
                        valid: true,
                        info: response
                    });
                } else {
                    resolve({
                        valid: false,
                        error: "无效的API密钥"
                    });
                }
            };
            
            request.onerror = function() {
                reject(new Error("网络请求失败"));
            };
            
            request.send();
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * 测试API密钥
 * @function testAPIKey
 * @param {string} apiKey - API密钥
 * @returns {Promise} 测试结果
 */
function testAPIKey(apiKey) {
    return new Promise((resolve, reject) => {
        // 创建测试图片
        var testImage = createTestImage();
        
        // 调用压缩API
        compressWithKey(testImage, apiKey)
            .then(result => {
                resolve({
                    success: true,
                    compression: result
                });
            })
            .catch(error => {
                resolve({
                    success: false,
                    error: error.message
                });
            });
    });
}
```

## 4. 文件路径处理函数

### 4.1 路径解析器类
```javascript
/**
 * 路径解析器
 * @class PathResolver
 */
class PathResolver {
    constructor() {
        this.variables = {
            '${projectPath}': this.getProjectPath.bind(this),
            '${timestamp}': this.getTimestamp.bind(this),
            '${date}': this.getDate.bind(this),
            '${time}': this.getTime.bind(this),
            '${random}': this.getRandomString.bind(this),
            '${user}': this.getUserName.bind(this)
        };
    }
    
    /**
     * 解析路径变量
     * @method resolve
     * @param {string} path - 包含变量的路径
     * @returns {string} 解析后的路径
     */
    resolve(path) {
        var result = path;
        
        // 替换所有变量
        for (var key in this.variables) {
            if (this.variables.hasOwnProperty(key)) {
                var value = this.variables[key]();
                result = result.replace(
                    new RegExp(this.escapeRegExp(key), 'g'), 
                    value
                );
            }
        }
        
        // 标准化路径
        result = this.normalizePath(result);
        
        return result;
    }
    
    /**
     * 获取项目路径
     * @method getProjectPath
     * @returns {string} 项目路径
     */
    getProjectPath() {
        var project = app.project;
        
        if (project && project.file) {
            return project.file.parent.fsName;
        }
        
        return Folder.myDocuments.fsName;
    }
    
    /**
     * 标准化路径
     * @method normalizePath
     * @param {string} path - 原始路径
     * @returns {string} 标准化后的路径
     */
    normalizePath(path) {
        // 统一使用正斜杠
        path = path.replace(/\\/g, "/");
        
        // 移除重复的斜杠
        path = path.replace(/\/+/g, "/");
        
        // 处理..和.
        path = this.resolveRelativePaths(path);
        
        return path;
    }
}
```

### 4.2 文件搜索函数
```javascript
/**
 * 搜索文件
 * @function searchFiles
 * @param {Folder} folder - 起始文件夹
 * @param {Object} criteria - 搜索条件
 * @returns {Array<File>} 找到的文件
 */
function searchFiles(folder, criteria) {
    var results = [];
    
    // 递归搜索函数
    function searchRecursive(currentFolder) {
        var items = currentFolder.getFiles();
        
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            
            if (item instanceof Folder) {
                // 递归搜索子文件夹
                if (criteria.recursive !== false) {
                    searchRecursive(item);
                }
            } else if (item instanceof File) {
                // 检查文件是否符合条件
                if (matchesCriteria(item, criteria)) {
                    results.push(item);
                }
            }
        }
    }
    
    searchRecursive(folder);
    return results;
}

/**
 * 检查文件是否匹配条件
 * @function matchesCriteria
 * @param {File} file - 文件对象
 * @param {Object} criteria - 匹配条件
 * @returns {boolean} 是否匹配
 */
function matchesCriteria(file, criteria) {
    // 检查扩展名
    if (criteria.extensions) {
        var ext = file.name.split(".").pop().toLowerCase();
        if (criteria.extensions.indexOf(ext) === -1) {
            return false;
        }
    }
    
    // 检查文件名模式
    if (criteria.pattern) {
        var regex = new RegExp(criteria.pattern);
        if (!regex.test(file.name)) {
            return false;
        }
    }
    
    // 检查文件大小
    if (criteria.minSize && file.length < criteria.minSize) {
        return false;
    }
    
    if (criteria.maxSize && file.length > criteria.maxSize) {
        return false;
    }
    
    // 检查修改时间
    if (criteria.modifiedAfter) {
        var modDate = file.modified;
        if (modDate < criteria.modifiedAfter) {
            return false;
        }
    }
    
    return true;
}
```

## 5. UI事件处理函数

### 5.1 事件管理器类
```javascript
/**
 * UI事件管理器
 * @class EventHandler
 */
class EventHandler {
    constructor() {
        this.handlers = {};
        this.history = [];
    }
    
    /**
     * 注册事件处理器
     * @method on
     * @param {string} event - 事件名称
     * @param {Function} handler - 处理函数
     */
    on(event, handler) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        
        this.handlers[event].push(handler);
    }
    
    /**
     * 触发事件
     * @method emit
     * @param {string} event - 事件名称
     * @param {*} data - 事件数据
     */
    emit(event, data) {
        var handlers = this.handlers[event] || [];
        
        // 记录历史
        this.history.push({
            event: event,
            data: data,
            timestamp: new Date()
        });
        
        // 执行处理器
        for (var i = 0; i < handlers.length; i++) {
            try {
                handlers[i](data);
            } catch (error) {
                console.error("事件处理错误: " + error.message);
            }
        }
    }
    
    /**
     * 移除事件处理器
     * @method off
     * @param {string} event - 事件名称
     * @param {Function} handler - 要移除的处理函数
     */
    off(event, handler) {
        var handlers = this.handlers[event];
        
        if (handlers) {
            var index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }
}
```

### 5.2 快捷键处理器
```javascript
/**
 * 快捷键处理器
 * @class ShortcutHandler
 */
class ShortcutHandler {
    constructor() {
        this.shortcuts = {};
        this.modifierState = {
            ctrl: false,
            shift: false,
            alt: false
        };
    }
    
    /**
     * 注册快捷键
     * @method register
     * @param {string} keys - 快捷键组合 (如 "Ctrl+Shift+A")
     * @param {Function} callback - 回调函数
     */
    register(keys, callback) {
        var keyParts = keys.split("+");
        var mainKey = keyParts.pop().toLowerCase();
        
        var shortcut = {
            mainKey: mainKey,
            ctrl: keyParts.indexOf("Ctrl") !== -1,
            shift: keyParts.indexOf("Shift") !== -1,
            alt: keyParts.indexOf("Alt") !== -1,
            callback: callback
        };
        
        this.shortcuts[mainKey] = this.shortcuts[mainKey] || [];
        this.shortcuts[mainKey].push(shortcut);
    }
    
    /**
     * 检查快捷键
     * @method check
     * @param {KeyboardEvent} event - 键盘事件
     * @returns {boolean} 是否匹配
     */
    check(event) {
        var mainKey = event.key.toLowerCase();
        var shortcuts = this.shortcuts[mainKey];
        
        if (!shortcuts) {
            return false;
        }
        
        for (var i = 0; i < shortcuts.length; i++) {
            var shortcut = shortcuts[i];
            
            // 仅 Ctrl+Shift 组合
            if (shortcut.ctrl === event.ctrlKey &&
                shortcut.shift === event.shiftKey &&
                !event.altKey) {
                
                shortcut.callback(event);
                return true;
            }
        }
        
        return false;
    }
}
```

## 6. 配置读写函数

### 6.1 配置管理器类
```javascript
/**
 * 配置管理器
 * @class ConfigManager
 */
class ConfigManager {
    constructor(configPath) {
        this.configPath = configPath || this.getDefaultConfigPath();
        this.config = this.load();
    }
    
    /**
     * 加载配置
     * @method load
     * @returns {Object} 配置对象
     */
    load() {
        try {
            var configFile = new File(this.configPath);
            
            if (configFile.exists) {
                configFile.open("r");
                var content = configFile.read();
                configFile.close();
                
                var config = JSON.parse(content);
                
                // 验证配置版本
                if (this.validateConfig(config)) {
                    return config;
                }
            }
        } catch (error) {
            console.warn("加载配置失败: " + error.message);
        }
        
        // 返回默认配置
        return this.getDefaultConfig();
    }
    
    /**
     * 保存配置
     * @method save
     * @param {Object} config - 配置对象
     * @returns {boolean} 是否成功
     */
    save(config) {
        try {
            // 验证配置
            if (!this.validateConfig(config)) {
                throw new Error("配置验证失败");
            }
            
            var configFile = new File(this.configPath);
            
            // 确保目录存在
            var configDir = configFile.parent;
            if (!configDir.exists) {
                configDir.create();
            }
            
            // 保存配置
            configFile.open("w");
            configFile.write(JSON.stringify(config, null, 2));
            configFile.close();
            
            // 更新内存中的配置
            this.config = config;
            
            return true;
        } catch (error) {
            console.error("保存配置失败: " + error.message);
            return false;
        }
    }
    
    /**
     * 获取默认配置
     * @method getDefaultConfig
     * @returns {Object} 默认配置
     */
    getDefaultConfig() {
        return {
            version: "2.0.5",
            apiKeys: [],
            settings: {
                outputPath: "${projectPath}/compressed",
                maxWorkers: 4,
                preserveOriginal: false,
                autoReplace: false,
                logLevel: "INFO",
                backupEnabled: true
            },
            ui: {
                windowSize: [400, 600],
                windowPosition: [100, 100],
                theme: "dark"
            },
            statistics: {
                totalCompressions: 0,
                totalSavings: 0,
                lastCompression: null
            }
        };
    }
}
```

## 7. 日志记录函数

### 7.1 日志管理器类
```javascript
/**
 * 日志管理器
 * @class Logger
 */
class Logger {
    constructor(options) {
        this.options = options || {
            level: "INFO",
            maxEntries: 1000,
            outputPath: null
        };
        
        this.entries = [];
        this.levelPriority = {
            "DEBUG": 0,
            "INFO": 1,
            "WARN": 2,
            "ERROR": 3
        };
    }
    
    /**
     * 记录日志
     * @method log
     * @param {string} level - 日志级别
     * @param {string} message - 日志消息
     * @param {Object} data - 附加数据
     */
    log(level, message, data) {
        // 检查日志级别
        if (this.levelPriority[level] < this.levelPriority[this.options.level]) {
            return;
        }
        
        var entry = {
            timestamp: new Date(),
            level: level,
            message: message,
            data: data || {}
        };
        
        // 添加到日志
        this.entries.push(entry);
        
        // 限制日志数量
        if (this.entries.length > this.options.maxEntries) {
            this.entries.shift();
        }
        
        // 输出到控制台
        this.outputToConsole(entry);
        
        // 保存到文件
        if (this.options.outputPath) {
            this.saveToFile(entry);
        }
    }
    
    /**
     * 记录信息日志
     * @method info
     * @param {string} message - 日志消息
     * @param {Object} data - 附加数据
     */
    info(message, data) {
        this.log("INFO", message, data);
    }
    
    /**
     * 记录警告日志
     * @method warn
     * @param {string} message - 日志消息
     * @param {Object} data - 附加数据
     */
    warn(message, data) {
        this.log("WARN", message, data);
    }
    
    /**
     * 记录错误日志
     * @method error
     * @param {string} message - 日志消息
     * @param {Object} data - 附加数据
     */
    error(message, data) {
        this.log("ERROR", message, data);
    }
}
```

## 8. 错误处理函数

### 8.1 错误处理器类
```javascript
/**
 * 错误处理器
 * @class ErrorHandler
 */
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.recoveryStrategies = {};
    }
    
    /**
     * 处理错误
     * @method handle
     * @param {Error} error - 错误对象
     * @param {Object} context - 错误上下文
     * @returns {Object} 处理结果
     */
    handle(error, context) {
        var errorInfo = this.analyzeError(error, context);
        
        // 记录错误
        this.errors.push(errorInfo);
        
        // 尝试恢复
        var recoveryResult = this.attemptRecovery(errorInfo);
        
        // 显示错误信息
        this.showErrorToUser(errorInfo, recoveryResult);
        
        return {
            handled: true,
            recovery: recoveryResult,
            error: errorInfo
        };
    }
    
    /**
     * 分析错误
     * @method analyzeError
     * @param {Error} error - 错误对象
     * @param {Object} context - 错误上下文
     * @returns {Object} 错误信息
     */
    analyzeError(error, context) {
        return {
            message: error.message,
            stack: error.stack,
            type: this.getErrorType(error),
            context: context,
            timestamp: new Date(),
            severity: this.getErrorSeverity(error)
        };
    }
    
    /**
     * 尝试恢复
     * @method attemptRecovery
     * @param {Object} errorInfo - 错误信息
     * @returns {Object} 恢复结果
     */
    attemptRecovery(errorInfo) {
        var strategy = this.recoveryStrategies[errorInfo.type];
        
        if (strategy) {
            return strategy(errorInfo);
        }
        
        // 默认恢复策略
        return this.defaultRecovery(errorInfo);
    }
}
```

## 9. 工具函数

### 9.1 通用工具函数
```javascript
/**
 * 生成唯一ID
 * @function generateUUID
 * @returns {string} 唯一ID
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 格式化文件大小
 * @function formatFileSize
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 延迟执行
 * @function delay
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise} 延迟Promise
 */
function delay(ms) {
    return new Promise(resolve => {
        app.setTimeout(resolve, ms);
    });
}
```

---

**函数分类**：
1. **核心功能函数**：压缩、API调用、文件处理
2. **管理函数**：配置、日志、错误处理
3. **UI函数**：事件处理、界面控制
4. **工具函数**：通用辅助函数

**注意**：所有函数都基于 ExtendScript (ECMAScript 3) 标准，不支持现代 JavaScript 特性。

**文档版本**：1.1  
**最后更新**：2026-04-21