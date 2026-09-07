// 设置版本的变量
var version = "2.0.3";

// ======================== Tinify API 配置 ========================
var TINIFY_API_HOST = "api.tinify.com";
var TINIFY_API_PORT = 443;

// ======================== API Key 存储配置 ========================
var configFileName = "auto_tiny_config.txt";
var configFilePath = new File(File($.fileName).parent.fsName + "/" + configFileName);
var API_KEYS_INFO = []; // API Key 信息数组 [{key: "xxx", remaining: 500}, ...]
var currentKeyIndex = 0; // 当前使用的 API Key 索引

// ======================== 路径配置存储 ========================
var PATH_PATTERNS = []; // 路径模式数组 [{name: "xxx", pattern: "xxx"}, ...]
var currentPathPatternIndex = 0; // 当前选中的路径模式索引

// 加载路径模式配置
function loadPathPatterns() {
    PATH_PATTERNS = [];
    if (configFilePath.exists) {
        configFilePath.encoding = "UTF-8";
        configFilePath.open("r");
        var content = configFilePath.read().trim();
        configFilePath.close();
        if (content) {
            var lines = content.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                // 跳过API Key行（以"key:"开头）
                if (line.indexOf("key:") !== 0) {
                    var parts = line.split('|');
                    if (parts.length >= 2) {
                        var name = parts[0].trim();
                        var pattern = parts[1].trim();
                        if (name && pattern) {
                            PATH_PATTERNS.push({name: name, pattern: pattern});
                        }
                    }
                }
            }
        }
    }
    // 如果没有配置，添加默认配置
    if (PATH_PATTERNS.length === 0) {
        PATH_PATTERNS.push({
            name: "默认-输出文件夹",
            pattern: "${projectPath}/输出"
        });
    }
}

// 解析路径模式，获取实际路径
function resolvePathPattern(pattern) {
    var result = pattern;
    // 替换 ${projectPath} 为项目文件所在的父目录
    if (app.project && app.project.file) {
        var projectPath = app.project.file.parent.fsName;
        result = result.replace(/\$\{projectPath\}/g, projectPath);
    } else {
        result = result.replace(/\$\{projectPath\}/g, "未保存项目");
    }
    return result;
}

// 加载 API Keys（包括密钥和剩余次数）
function loadApiKeys() {
    API_KEYS_INFO = [];
    
    if (configFilePath.exists) {
        configFilePath.encoding = "UTF-8";
        configFilePath.open("r");
        var content = configFilePath.read().trim();
        configFilePath.close();
        if (content) {
            var lines = content.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                // 只读取以"key:"开头的行
                if (line.indexOf("key:") === 0) {
                    var keyData = line.substring(4).trim();
                    var parts = keyData.split(',');
                    var key = parts[0].trim();
                    var remaining = parts.length >= 2 ? parseInt(parts[1].trim()) : 500;
                    if (key) {
                        API_KEYS_INFO.push({key: key, remaining: remaining});
                    }
                }
            }
        }
    }
}

// 保存 API Keys（包括密钥和剩余次数到配置文件）
function saveApiKeys() {
    var lines = [];
    // 保存API Keys（格式：key:xxx,remaining）
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        lines.push("key:" + API_KEYS_INFO[i].key + "," + API_KEYS_INFO[i].remaining);
    }
    // 保存路径配置
    for (var i = 0; i < PATH_PATTERNS.length; i++) {
        lines.push(PATH_PATTERNS[i].name + "|" + PATH_PATTERNS[i].pattern);
    }
    configFilePath.encoding = "UTF-8";
    configFilePath.open("w");
    configFilePath.write(lines.join('\n'));
    configFilePath.close();
}

// 更新 API Key 剩余次数（保存到配置文件）
function updateApiKeyRemaining(keyIndex, usedCount) {
    if (keyIndex >= 0 && keyIndex < API_KEYS_INFO.length) {
        API_KEYS_INFO[keyIndex].remaining = 500 - usedCount;
        saveApiKeys();
    }
}

// 获取下一个 API Key
function getNextApiKey() {
    if (API_KEYS_INFO.length === 0) return "";
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS_INFO.length;
    return API_KEYS_INFO[currentKeyIndex].key;
}

// 获取当前 API Key
function getCurrentApiKey() {
    if (API_KEYS_INFO.length === 0) return "";
    return API_KEYS_INFO[currentKeyIndex].key;
}

// 获取当前 API Key 索引
function getCurrentApiKeyIndex() {
    return currentKeyIndex;
}

// 获取所有 API Key 的剩余次数总和
function getTotalRemaining() {
    var total = 0;
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        total += API_KEYS_INFO[i].remaining;
    }
    return total;
}

// 获取所有 API Key 的总配额
function getTotalQuota() {
    return API_KEYS_INFO.length * 500;
}

// 格式化总次数显示（剩余次数/总次数）
function formatTotalCount() {
    if (API_KEYS_INFO.length === 0) return "剩余 0/0";
    var totalRemaining = 0;
    for (var i = 0; i < API_KEYS_INFO.length; i++) {
        totalRemaining += API_KEYS_INFO[i].remaining;
    }
    return "剩余 " + totalRemaining + "/" + (API_KEYS_INFO.length * 500);
}

// 格式化状态文本（包含路径信息）
function formatStatusText() {
    var countText = formatTotalCount();
    var pathText = "";
    
    if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        var maxLength = 30; // 最大显示长度
        
        if (resolvedPath.length > maxLength) {
            pathText = "|路径：" + resolvedPath.substring(0, maxLength) + "...";
        } else {
            pathText = "|路径：" + resolvedPath;
        }
    }
    
    return countText + pathText;
}

// 更新状态文本（包括文本和helpTip）
function updateStatusText() {
    statusText.text = formatStatusText();
    
    // 更新 helpTip
    if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        statusText.helpTip = "剩余次数: " + getTotalRemaining() + "/" + getTotalQuota() + "\n完整路径: " + resolvedPath;
    } else {
        statusText.helpTip = "剩余次数: " + getTotalRemaining() + "/" + getTotalQuota();
    }
}

// ======================== 全局变量 ========================
var folderPath;
var logContent = ""; // 日志内容（全局变量，必须在函数声明前）
var apiKeySettingsWindow = null;
var pathSettingsWindow = null;
var logWindow = null;

// 跨平台打开URL函数
function urlOpen(url) {
    if ($.os.indexOf("Windows") != -1) {
        // Windows系统
        system.callSystem("cmd.exe /c start \"\" \"" + url + "\"");
    } else {
        // MAC系统
        system.callSystem("open \"" + url + "\"");
    }
}

// 确定源路径
loadPathPatterns();
if (PATH_PATTERNS.length > 0) {
    var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
    folderPath = new Folder(resolvedPath);
}

// ======================== 创建主窗口 ========================
var win = new Window("palette", "Auto_Tiny v " + version + " (Tinify API)", undefined);
win.orientation = "column";
win.alignChildren = ["fill", "top"];
win.spacing = 15;
win.margins = 20;

// ======================== 主控制面板 ========================
var mainPanel = win.add("panel", undefined, "Auto_Tiny");
mainPanel.orientation = "column";
mainPanel.alignChildren = ["fill", "center"];
mainPanel.spacing = 15;
mainPanel.margins = 20;

// 操作按钮组（两行布局）
var buttonRow1 = mainPanel.add("group");
buttonRow1.orientation = "row";
buttonRow1.alignChildren = ["fill", "center"];
buttonRow1.spacing = 15;

var uploadButton = buttonRow1.add("button", undefined, "开始压缩");
uploadButton.preferredSize.width = 150;
uploadButton.helpTip = "默认：压缩到临时文件夹\n按住 Alt 键点击：直接替换原图";

var replaceButton = buttonRow1.add("button", undefined, "替换");
replaceButton.preferredSize.width = 150;
replaceButton.helpTip = "将压缩后的图片从临时文件夹复制到原目录";

// 第二行按钮
var buttonRow2 = mainPanel.add("group");
buttonRow2.orientation = "row";
buttonRow2.alignChildren = ["fill", "center"];
buttonRow2.spacing = 15;

var apiKeySettingsButton = buttonRow2.add("button", undefined, "⚙ API Key设置");
apiKeySettingsButton.preferredSize.width = 150;
apiKeySettingsButton.helpTip = "打开API Key管理对话框";

var pathSettingsButton = buttonRow2.add("button", undefined, "⚙ 路径设置");
pathSettingsButton.preferredSize.width = 150;
pathSettingsButton.helpTip = "打开路径配置对话框";

// 第三行按钮
var buttonRow3 = mainPanel.add("group");
buttonRow3.orientation = "row";
buttonRow3.alignChildren = ["fill", "center"];
buttonRow3.spacing = 15;

var logButton = buttonRow3.add("button", undefined, "📋 日志");
logButton.preferredSize.width = 150;
logButton.helpTip = "打开日志查看窗口";

// 进度条及状态提示
var progressBar = mainPanel.add("progressbar", undefined, 0, 100);
progressBar.preferredSize.width = 300;
progressBar.value = 0;

var statusText = mainPanel.add("statictext", undefined, formatStatusText());
statusText.alignment = ["center", "center"];
updateStatusText();

// ======================== 设置对话框 ========================

// 获取 API Key 的使用次数
function getApiKeyUsageCount(apiKey) {
    try {
        var cmd = 'curl -s -i -X POST --user api:' + apiKey +
                 ' --data-binary "" ' +
                 ' https://api.tinify.com/shrink';

        var result = system.callSystem(cmd);

        addLog("API 响应: " + result);

        var count = 0;

        var headerEnd = result.indexOf("\r\n\r\n");
        if (headerEnd !== -1) {
            var headers = result.substring(0, headerEnd);
            var headerLines = headers.split(/\r?\n/);
            for (var i = 0; i < headerLines.length; i++) {
                var line = headerLines[i];
                addLog("响应头: " + line);
                if (line.toLowerCase().indexOf("compression-count:") === 0) {
                    count = parseInt(line.substring(19).trim());
                    addLog("  找到使用次数: " + count);
                    break;
                }
            }
        }

        if (count === 0) {
            addLog("  警告：未找到 compression-count 头");
        }

        return count;
    } catch (e) {
        addLog("获取使用次数出错: " + e.toString());
        return 0;
    }
}

// 打开 API Key 设置对话框
function openApiKeySettingsWindow() {
    if (apiKeySettingsWindow) {
        loadApiKeys();
        refreshApiKeyList();
        apiKeySettingsWindow.show();
        return;
    }

    // 加载配置
    loadApiKeys();

    apiKeySettingsWindow = new Window("dialog", "API Key 设置 - Auto_Tiny", undefined);
    apiKeySettingsWindow.orientation = "column";
    apiKeySettingsWindow.alignChildren = ["fill", "top"];
    apiKeySettingsWindow.spacing = 8;
    apiKeySettingsWindow.margins = 10;
    apiKeySettingsWindow.preferredSize = [550, 360];

    var newApiKeyInput = apiKeySettingsWindow.add("edittext", undefined, "");
    newApiKeyInput.characters = 50;

    var apiKeyButtonGroup = apiKeySettingsWindow.add("group");
    apiKeyButtonGroup.orientation = "row";
    apiKeyButtonGroup.alignChildren = ["center", "center"];
    apiKeyButtonGroup.spacing = 10;

    var addApiKeyButton = apiKeyButtonGroup.add("button", undefined, "添加");
    addApiKeyButton.preferredSize.width = 80;

    var removeApiKeyButton = apiKeyButtonGroup.add("button", undefined, "删除选中");
    removeApiKeyButton.preferredSize.width = 100;

    var refreshButton = apiKeyButtonGroup.add("button", undefined, "刷新次数");
    refreshButton.preferredSize.width = 100;

    var linkButton = apiKeyButtonGroup.add("button", undefined, "获取 API Key");
    linkButton.preferredSize.width = 120;
    linkButton.onClick = function() {
        urlOpen("https://tinify.com/developers");
    };

    var apiKeyList = apiKeySettingsWindow.add("listbox", undefined, [], {
        multiselect: true
    });
    apiKeyList.preferredSize = [510, 150];
    apiKeyList.alignment = ["fill", "top"];

    var apiKeyCountText = apiKeySettingsWindow.add("statictext", undefined, "当前有 " + API_KEYS_INFO.length + " 个 API Key");
    apiKeyCountText.alignment = "left";

    function refreshApiKeyList() {
        apiKeyList.removeAll();
        for (var i = 0; i < API_KEYS_INFO.length; i++) {
            var keyInfo = API_KEYS_INFO[i];
            var maskedKey = keyInfo.key.substring(0, 12) + "..." + keyInfo.key.substring(keyInfo.key.length - 6);
            var usageInfo = "剩余: " + keyInfo.remaining + "/500";
            var formattedItem = maskedKey + "                                  " + usageInfo;
            apiKeyList.add("item", formattedItem);
        }
        apiKeyCountText.text = "当前有 " + API_KEYS_INFO.length + " 个 API Key";
    }

    addApiKeyButton.onClick = function() {
        var key = newApiKeyInput.text.trim();
        if (key) {
            var exists = false;
            for (var i = 0; i < API_KEYS_INFO.length; i++) {
                if (API_KEYS_INFO[i].key === key) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                API_KEYS_INFO.push({key: key, remaining: 500});
                refreshApiKeyList();
                newApiKeyInput.text = "";
            } else {
                alert("该 API Key 已存在！");
            }
        } else {
            alert("请输入有效的 API Key！");
        }
    };

    removeApiKeyButton.onClick = function() {
        var selectedItems = apiKeyList.selection;
        if (selectedItems && selectedItems.length > 0) {
            var indices = [];
            for (var i = 0; i < selectedItems.length; i++) {
                indices.push(selectedItems[i].index);
            }
            indices.sort(function(a, b) { return b - a; });
            for (var j = 0; j < indices.length; j++) {
                API_KEYS_INFO.splice(indices[j], 1);
            }
            refreshApiKeyList();
        } else {
            alert("请先选择要删除的 API Key！");
        }
    };

    refreshButton.onClick = function() {
        if (API_KEYS_INFO.length === 0) {
            alert("没有可刷新的 API Key！");
            return;
        }

        var originalText = refreshButton.text;
        refreshButton.text = "刷新中...";
        refreshButton.enabled = false;

        apiKeySettingsWindow.update();

        for (var i = 0; i < API_KEYS_INFO.length; i++) {
            refreshButton.text = "刷新中 (" + (i + 1) + "/" + API_KEYS_INFO.length + ")...";
            apiKeySettingsWindow.update();
            addLog("正在刷新 API Key " + (i + 1) + " 的使用次数...");
            var usedCount = getApiKeyUsageCount(API_KEYS_INFO[i].key);
            addLog("  获取到的使用次数: " + usedCount);
            API_KEYS_INFO[i].remaining = 500 - usedCount;
        }

        saveApiKeys();
        updateStatusText();
        refreshApiKeyList();

        refreshButton.text = originalText;
        refreshButton.enabled = true;

        alert("刷新完成！\n\n" + formatTotalCount());
    };

    var buttonGroup = apiKeySettingsWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var saveButton = buttonGroup.add("button", undefined, "保存");
    var cancelButton = buttonGroup.add("button", undefined, "取消");

    saveButton.onClick = function() {
        if (API_KEYS_INFO.length === 0) {
            alert("请至少添加一个 API Key！");
            return;
        }
        saveApiKeys();
        updateStatusText();
        alert("API Key 设置已保存！");
        apiKeySettingsWindow.close();
    };

    cancelButton.onClick = function() {
        apiKeySettingsWindow.close();
    };

    apiKeySettingsWindow.onClose = function() {
    };

    refreshApiKeyList();
    apiKeySettingsWindow.center();
    apiKeySettingsWindow.show();
}

// 打开路径配置对话框
function openPathSettingsWindow() {
    if (pathSettingsWindow) {
        loadPathPatterns();
        refreshPathConfig();
        pathSettingsWindow.show();
        return;
    }

    // 加载配置
    loadPathPatterns();

    pathSettingsWindow = new Window("dialog", "路径配置 - Auto_Tiny", undefined);
    pathSettingsWindow.orientation = "column";
    pathSettingsWindow.alignChildren = ["fill", "top"];
    pathSettingsWindow.spacing = 8;
    pathSettingsWindow.margins = 10;
    pathSettingsWindow.preferredSize = [550, 360];

    var selectGroup = pathSettingsWindow.add("group");
    selectGroup.orientation = "row";
    selectGroup.alignChildren = ["left", "center"];
    selectGroup.spacing = 10;

    selectGroup.add("statictext", undefined, "当前选择:");
    var pathSelectDropdown = selectGroup.add("dropdownlist", undefined, []);
    pathSelectDropdown.preferredSize.width = 300;

    var pathButtonGroup = pathSettingsWindow.add("group");
    pathButtonGroup.orientation = "row";
    pathButtonGroup.alignChildren = ["center", "center"];
    pathButtonGroup.spacing = 10;

    var addPathButton = pathButtonGroup.add("button", undefined, "添加");
    addPathButton.preferredSize.width = 60;

    var updatePathButton = pathButtonGroup.add("button", undefined, "更新");
    updatePathButton.preferredSize.width = 60;

    var removePathButton = pathButtonGroup.add("button", undefined, "删除");
    removePathButton.preferredSize.width = 60;

    var testAndViewButton = pathButtonGroup.add("button", undefined, "测试与查看");
    testAndViewButton.preferredSize.width = 100;

    var helpButton = pathButtonGroup.add("button", undefined, "帮助");
    helpButton.preferredSize.width = 60;

    var pathList = pathSettingsWindow.add("listbox", undefined, [], {
        multiselect: false
    });
    pathList.preferredSize = [510, 150];
    pathList.alignment = ["fill", "top"];

    var pathCountText = pathSettingsWindow.add("statictext", undefined, "当前有 " + PATH_PATTERNS.length + " 个路径配置");
    pathCountText.alignment = "left";

    function refreshPathConfig() {
        pathSelectDropdown.removeAll();
        for (var i = 0; i < PATH_PATTERNS.length; i++) {
            var patternInfo = PATH_PATTERNS[i];
            var displayName = patternInfo.name;
            if (i === currentPathPatternIndex) {
                displayName = "★ " + displayName;
            }
            pathSelectDropdown.add("item", displayName);
        }
        
        if (PATH_PATTERNS.length > 0 && currentPathPatternIndex >= 0 && currentPathPatternIndex < PATH_PATTERNS.length) {
            pathSelectDropdown.selection = currentPathPatternIndex;
        }
        
        pathList.removeAll();
        for (var i = 0; i < PATH_PATTERNS.length; i++) {
            var patternInfo = PATH_PATTERNS[i];
            var resolvedPath = resolvePathPattern(patternInfo.pattern);
            var displayName = patternInfo.name;
            if (i === currentPathPatternIndex) {
                displayName = "★ " + displayName;
            }
            var formattedItem = displayName + "                         " + patternInfo.pattern;
            var item = pathList.add("item", formattedItem);
            item.helpTip = "名称: " + patternInfo.name + "\n路径模式: " + patternInfo.pattern + "\n解析路径: " + resolvedPath;
        }
        pathCountText.text = "当前有 " + PATH_PATTERNS.length + " 个路径配置";
    }

    pathSelectDropdown.onChange = function() {
        if (pathSelectDropdown.selection !== null) {
            currentPathPatternIndex = pathSelectDropdown.selection.index;
            refreshPathConfig();
        }
    };

    addPathButton.onClick = function() {
        var dialog = new Window("dialog", "添加路径配置", undefined);
        dialog.orientation = "column";
        dialog.alignChildren = ["fill", "top"];
        dialog.spacing = 10;
        dialog.margins = 20;

        var nameGroup = dialog.add("group");
        nameGroup.orientation = "row";
        nameGroup.add("statictext", undefined, "名称:");
        var nameInput = nameGroup.add("edittext", undefined, "");
        nameInput.characters = 30;

        var patternGroup = dialog.add("group");
        patternGroup.orientation = "row";
        patternGroup.add("statictext", undefined, "路径模式:");
        var patternInput = patternGroup.add("edittext", undefined, "");
        patternInput.characters = 40;

        var helpText = dialog.add("statictext", undefined, "可用变量: ${projectPath}");
        helpText.alignment = "center";

        var buttonGroup = dialog.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["center", "center"];
        buttonGroup.spacing = 10;

        var okButton = buttonGroup.add("button", undefined, "确定");
        var cancelButton = buttonGroup.add("button", undefined, "取消");

        okButton.onClick = function() {
            var name = nameInput.text.trim();
            var pattern = patternInput.text.trim();
            if (name && pattern) {
                PATH_PATTERNS.push({name: name, pattern: pattern});
                currentPathPatternIndex = PATH_PATTERNS.length - 1;
                refreshPathConfig();
                dialog.close();
            } else {
                alert("请输入有效的名称和路径模式！");
            }
        };

        cancelButton.onClick = function() {
            dialog.close();
        };

        dialog.center();
        dialog.show();
    };

    updatePathButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可更新的路径配置！");
            return;
        }
        
        var currentConfig = PATH_PATTERNS[currentPathPatternIndex];
        
        var dialog = new Window("dialog", "更新路径配置", undefined);
        dialog.orientation = "column";
        dialog.alignChildren = ["fill", "top"];
        dialog.spacing = 10;
        dialog.margins = 20;

        var nameGroup = dialog.add("group");
        nameGroup.orientation = "row";
        nameGroup.add("statictext", undefined, "名称:");
        var nameInput = nameGroup.add("edittext", undefined, currentConfig.name);
        nameInput.characters = 30;

        var patternGroup = dialog.add("group");
        patternGroup.orientation = "row";
        patternGroup.add("statictext", undefined, "路径模式:");
        var patternInput = patternGroup.add("edittext", undefined, currentConfig.pattern);
        patternInput.characters = 40;

        var helpText = dialog.add("statictext", undefined, "可用变量: ${projectPath}");
        helpText.alignment = "center";

        var buttonGroup = dialog.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["center", "center"];
        buttonGroup.spacing = 10;

        var okButton = buttonGroup.add("button", undefined, "确定");
        var cancelButton = buttonGroup.add("button", undefined, "取消");

        okButton.onClick = function() {
            var name = nameInput.text.trim();
            var pattern = patternInput.text.trim();
            if (name && pattern) {
                PATH_PATTERNS[currentPathPatternIndex].name = name;
                PATH_PATTERNS[currentPathPatternIndex].pattern = pattern;
                refreshPathConfig();
                dialog.close();
            } else {
                alert("请输入有效的名称和路径模式！");
            }
        };

        cancelButton.onClick = function() {
            dialog.close();
        };

        dialog.center();
        dialog.show();
    };

    removePathButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可删除的路径配置！");
            return;
        }
        
        if (PATH_PATTERNS.length === 1) {
            alert("不能删除最后一个路径配置！");
            return;
        }
        
        if (currentPathPatternIndex < 0 || currentPathPatternIndex >= PATH_PATTERNS.length) {
            alert("请先选择一个有效的路径配置！");
            return;
        }
        
        var deleteIndex = currentPathPatternIndex;
        PATH_PATTERNS.splice(deleteIndex, 1);
        currentPathPatternIndex = 0;
        refreshPathConfig();
    };

    testAndViewButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("没有可测试的路径配置！");
            return;
        }
        
        var patternInfo = PATH_PATTERNS[currentPathPatternIndex];
        var resolvedPath = resolvePathPattern(patternInfo.pattern);
        var testFolder = new Folder(resolvedPath);
        
        if (testFolder.exists) {
            var files = testFolder.getFiles();
            var imageFiles = [];
            for (var i = 0; i < files.length; i++) {
                if (!(files[i] instanceof Folder)) {
                    var ext = files[i].name.split('.').pop().toLowerCase();
                    if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                        try {
                            var decodedName = decodeURI(files[i].name);
                            imageFiles.push(decodedName);
                        } catch (e) {
                            imageFiles.push(files[i].name);
                        }
                    }
                }
            }
            
            var message = "路径测试结果：\n\n" +
                "名称: " + patternInfo.name + "\n" +
                "路径模式: " + patternInfo.pattern + "\n" +
                "解析路径: " + resolvedPath + "\n\n" +
                "✓ 路径存在，找到 " + imageFiles.length + " 个图片文件\n\n";
            
            if (imageFiles.length > 0) {
                message += "文件列表:\n";
                for (var i = 0; i < Math.min(imageFiles.length, 20); i++) {
                    message += "  " + imageFiles[i] + "\n";
                }
                if (imageFiles.length > 20) {
                    message += "  ... 还有 " + (imageFiles.length - 20) + " 个文件\n";
                }
            } else {
                message += "(无图片文件)";
            }
            
            alert(message);
        } else {
            alert("路径测试结果：\n\n" +
                "名称: " + patternInfo.name + "\n" +
                "路径模式: " + patternInfo.pattern + "\n" +
                "解析路径: " + resolvedPath + "\n\n" +
                "✗ 路径不存在，请检查配置！");
        }
    };

    helpButton.onClick = function() {
        var promptText = "给 AI 的 Prompt：\n\n" +
            "我需要为 After Effects 项目配置图片压缩路径，请帮我生成以下情况的路径模式：\n\n" +
            "【可用变量】\n" +
            "${projectPath} - 当前项目文件所在的父目录\n\n" +
            "【常见场景示例】\n" +
            "1. 项目旁边的\"输出\"文件夹：${projectPath}/输出\n" +
            "2. 项目文件夹下的\"images\"子文件夹：${projectPath}/images\n" +
            "3. 项目旁边的\"assets/images\"文件夹：${projectPath}/../assets/images\n" +
            "4. 指定绝对路径：D:/MyProject/images\n\n" +
            "【我的需求】\n" +
            "（请在这里描述你的具体需求）\n\n" +
            "【请返回格式】\n" +
            "名称: [简短描述]\n" +
            "路径模式: [使用${projectPath}变量的路径]";

        var helpWindow = new Window("dialog", "给 AI 的 Prompt", undefined);
        helpWindow.orientation = "column";
        helpWindow.alignChildren = ["fill", "top"];
        helpWindow.spacing = 10;
        helpWindow.margins = 15;
        helpWindow.preferredSize = [500, 300];

        helpWindow.add("statictext", undefined, "给 AI 的 Prompt（可手动复制）：");

        var helpTextPanel = helpWindow.add("edittext", undefined, promptText, {
            multiline: true,
            scrolling: true
        });
        helpTextPanel.preferredSize = [480, 250];

        helpWindow.center();
        helpWindow.show();
    };

    var buttonGroup = pathSettingsWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 10;

    var saveButton = buttonGroup.add("button", undefined, "保存");
    var cancelButton = buttonGroup.add("button", undefined, "取消");

    saveButton.onClick = function() {
        if (PATH_PATTERNS.length === 0) {
            alert("请至少添加一个路径配置！");
            return;
        }
        saveApiKeys();
        var resolvedPath = resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern);
        folderPath = new Folder(resolvedPath);
        updateStatusText();
        alert("路径配置已保存！");
        pathSettingsWindow.close();
    };

    cancelButton.onClick = function() {
        pathSettingsWindow.close();
    };

    pathSettingsWindow.onClose = function() {
    };

    refreshPathConfig();
    pathSettingsWindow.center();
    pathSettingsWindow.show();
}

// 打开日志对话框
function openLogWindow() {
    addLog("打开日志窗口，当前日志长度: " + logContent.length);

    if (logWindow) {
        var logText = logWindow.logTextEdit;
        if (logText) {
            logText.text = logContent;
            logWindow.update();
        }
        logWindow.show();
        return;
    }

    logWindow = new Window("dialog", "日志 - Auto_Tiny", undefined);
    logWindow.orientation = "column";
    logWindow.alignChildren = ["fill", "fill"];
    logWindow.spacing = 10;
    logWindow.margins = 20;

    logWindow.add("statictext", undefined, "操作日志：");

    var logText = logWindow.add("edittext", undefined, logContent, {
        multiline: true,
        scrolling: true
    });
    logText.preferredSize = [500, 300];
    logWindow.logTextEdit = logText;

    addLog("日志窗口已创建");

    var buttonGroup = logWindow.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];
    buttonGroup.spacing = 15;

    var clearButton = buttonGroup.add("button", undefined, "清空日志");
    var closeButton = buttonGroup.add("button", undefined, "关闭");

    clearButton.onClick = function() {
        logContent = "";
        logText.text = "";
    };

    closeButton.onClick = function() {
        logWindow.close();
    };

    logWindow.onClose = function() {
        logWindow = null;
    };

    logWindow.center();
    logWindow.show();
}

// 添加日志输出函数
function addLog(message) {
    logContent += message + "\n";
    if (logWindow && logWindow.visible && logWindow.logTextEdit) {
        logWindow.logTextEdit.text = logContent;
        logWindow.update();
    }
    win.update();
}

// ======================== 辅助函数 ========================

// 使用 curl 命令压缩单个图片文件
function compressImage(apiKey, inputFile, outputFile, keyIndex) {
    addLog("正在压缩: " + inputFile.name);
    addLog("  使用 API Key: " + apiKey.substring(0, 8) + "..." + apiKey.substring(apiKey.length - 4));

    var headerFile = new File(Folder.temp.fsName + "/tinify_headers_" + (new Date().getTime()) + ".txt");
    var tempInputFile = new File(Folder.temp.fsName + "/tinify_temp_" + (new Date().getTime()) + ".temp");
    inputFile.copy(tempInputFile);

    var uploadCmd = 'curl -s -D "' + headerFile.fsName + '" --user api:' + apiKey +
                    ' --data-binary @"' + tempInputFile.fsName + '" ' +
                    ' https://api.tinify.com/shrink';

    try {
        var uploadResult = system.callSystem(uploadCmd);

        var headers = "";
        var location = "";
        var compressionCount = 0;

        if (headerFile.exists) {
            headerFile.encoding = "UTF-8";
            headerFile.open("r");
            headers = headerFile.read();
            headerFile.close();
            headerFile.remove();

            var headerLines = headers.split(/\r?\n/);
            for (var i = 0; i < headerLines.length; i++) {
                var line = headerLines[i];
                if (line.toLowerCase().indexOf("location:") === 0) {
                    location = line.substring(10).trim();
                } else if (line.toLowerCase().indexOf("compression-count:") === 0) {
                    compressionCount = parseInt(line.substring(19).trim());
                }
            }
        }

        if (!location) {
            addLog("  错误：未获取到压缩后的图片 URL");
            addLog("  响应: " + uploadResult);
            if (tempInputFile.exists) tempInputFile.remove();
            if (headerFile.exists) headerFile.remove();
            return false;
        }

        addLog("  上传成功，正在下载压缩后的图片...");

        var tempDownloadFile = new File(Folder.temp.fsName + "/tinify_download_" + (new Date().getTime()) + ".temp");

        var downloadCmd = 'curl -s --user api:' + apiKey +
                         ' -o "' + tempDownloadFile.fsName + '" ' +
                         ' "' + location + '"';

        var downloadResult = system.callSystem(downloadCmd);

        var success = false;

        if (tempDownloadFile.exists && tempDownloadFile.length > 0) {
            var outputFileObj = new File(outputFile);
            if (tempDownloadFile.copy(outputFileObj)) {
                var originalSize = inputFile.length;
                var compressedSize = outputFileObj.length;
                var savings = ((1 - compressedSize / originalSize) * 100).toFixed(2);
                addLog("  压缩完成！原始: " + formatFileSize(originalSize) +
                       " → 压缩后: " + formatFileSize(compressedSize) +
                       " (节省 " + savings + "%)");
                if (compressionCount > 0) {
                    addLog("  本月已使用压缩次数: " + compressionCount + "/500");
                    addLog("  剩余压缩次数: " + (500 - compressionCount) + "/500");
                    updateApiKeyRemaining(keyIndex, compressionCount);
                    updateStatusText();
                }
                success = true;
            } else {
                addLog("  错误：无法将压缩后的文件复制到目标位置");
            }
        } else {
            addLog("  错误：下载压缩后的图片失败");
        }

        if (tempDownloadFile.exists) tempDownloadFile.remove();
        if (tempInputFile.exists) tempInputFile.remove();
        if (headerFile.exists) headerFile.remove();

        return success;

    } catch (e) {
        addLog("  异常：压缩过程中出错 - " + e.toString());
        if (tempInputFile.exists) tempInputFile.remove();
        if (headerFile.exists) headerFile.remove();
        return false;
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// 递归压缩文件夹内的图片
function compressFolder(sourceFolder, outputFolder, apiKey) {
    if (!outputFolder.exists) {
        outputFolder.create();
    }

    var files = sourceFolder.getFiles();
    var successCount = 0;
    var failCount = 0;
    var totalSize = 0;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var destFile = new File(outputFolder.fsName + "/" + file.name);

        if (file instanceof Folder) {
            var subResult = compressFolder(file, destFile, apiKey);
            successCount += subResult.success;
            failCount += subResult.fail;
        } else {
            var ext = file.name.split('.').pop().toLowerCase();
            if (["jpg", "jpeg", "png", "webp"].indexOf(ext) !== -1) {
                var currentApiKey = getNextApiKey();
                var keyIndex = getCurrentApiKeyIndex();
                if (compressImage(currentApiKey, file, destFile, keyIndex)) {
                    successCount++;
                    var compressedFile = new File(destFile);
                    totalSize += compressedFile.length;
                } else {
                    failCount++;
                }
            }
        }

        var progress = Math.floor(((i + 1) / files.length) * 100);
        progressBar.value = progress;
        statusText.text = "状态：正在压缩 (" + (i + 1) + "/" + files.length + ")";
        win.update();
    }

    return { success: successCount, fail: failCount, totalSize: totalSize };
}

// 递归复制文件夹及其内容
function copyFolder(source, destination) {
    if (!destination.exists) {
        destination.create();
    }
    var files = source.getFiles();
    var copiedCount = 0;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var destFile = new File(destination.fsName + "/" + file.name);
        if (file instanceof Folder) {
            copiedCount += copyFolder(file, destFile);
        } else {
            try {
                if (file.copy(destFile)) {
                    copiedCount++;
                }
            } catch (e) {
                addLog("复制文件出错：" + file.fsName + "\n" + e.toString());
            }
        }
    }
    return copiedCount;
}

// 删除文件夹内所有内容
function clearFolder(folder) {
    if (folder.exists) {
        var items = folder.getFiles();
        for (var i = 0; i < items.length; i++) {
            if (items[i] instanceof Folder) {
                clearFolder(items[i]);
                try {
                    items[i].remove();
                } catch (e) {
                    addLog("无法删除文件夹：" + items[i].fsName);
                }
            } else {
                try {
                    items[i].remove();
                } catch (e) {
                    addLog("无法删除文件：" + items[i].fsName);
                }
            }
        }
    }
}

// ======================== 按钮点击事件 ========================

// 开始压缩
uploadButton.onClick = function() {
    loadApiKeys();
    loadPathPatterns();

    if (API_KEYS_INFO.length === 0) {
        alert("请先设置 API Key！\n点击'设置'按钮进行配置。");
        return;
    }

    addLog("当前配置了 " + API_KEYS_INFO.length + " 个 API Key，将自动轮换使用");
    addLog("剩余次数：" + formatTotalCount());

    var sourceFolder = folderPath;

    if (!(sourceFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        statusText.text = "状态：错误，项目未保存";
        return;
    }

    addLog("当前操作目录为：" + sourceFolder.fsName);
    statusText.text = "状态：开始压缩...";
    progressBar.value = 0;

    if (!sourceFolder.exists) {
        alert("源文件夹不存在: " + sourceFolder.fsName);
        addLog("错误：源文件夹不存在：" + sourceFolder.fsName);
        statusText.text = "状态：错误，源文件夹不存在";
        return;
    }

    var altPressed = ScriptUI.environment.keyboardState.altKey;

    if (altPressed) {
        var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
        if (!confirmResult) {
            addLog("用户取消了操作");
            updateStatusText();
            return;
        }
        addLog("开始压缩图片（将直接替换原图）...");
        var result = compressFolder(sourceFolder, sourceFolder, getCurrentApiKey());
    } else {
        var tempOutputFolder = new Folder(Folder.temp.fsName + "/auto_tiny_output");
        if (tempOutputFolder.exists) {
            clearFolder(tempOutputFolder);
        } else {
            tempOutputFolder.create();
        }
        addLog("开始压缩图片（压缩到临时文件夹）...");
        var result = compressFolder(sourceFolder, tempOutputFolder, getCurrentApiKey());
        addLog("\n临时文件夹路径：" + tempOutputFolder.fsName);
        addLog("压缩完成后请点击'替换'按钮将文件复制到原目录");
    }

    addLog("\n========== 压缩完成 ==========");
    addLog("成功: " + result.success + " 个文件");
    addLog("失败: " + result.fail + " 个文件");
    addLog("压缩后总大小: " + formatFileSize(result.totalSize));
    updateStatusText();
    progressBar.value = 100;

    alert("压缩完成！\n成功: " + result.success + " 个文件\n失败: " + result.fail + " 个文件");
};

// 替换
replaceButton.onClick = function() {
    var destinationFolder = folderPath;

    if (!(destinationFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        statusText.text = "状态：错误，项目未保存";
        return;
    }

    var tempOutputFolder = new Folder(Folder.temp.fsName + "/auto_tiny_output");

    if (!tempOutputFolder.exists) {
        alert("临时输出文件夹不存在，请先执行压缩操作！");
        addLog("错误：临时输出文件夹不存在");
        statusText.text = "状态：错误，未执行压缩";
        return;
    }

    addLog("开始执行文件替换操作...");
    statusText.text = "状态：正在替换文件...";

    var replacedCount = copyFolder(tempOutputFolder, destinationFolder);
    addLog("替换操作完成，共替换 " + replacedCount + " 个文件。");
    updateStatusText();
    progressBar.value = 100;

    alert("替换完成！共替换 " + replacedCount + " 个文件。");
};

// API Key设置按钮
apiKeySettingsButton.onClick = function() {
    openApiKeySettingsWindow();
};

// 路径设置按钮
pathSettingsButton.onClick = function() {
    openPathSettingsWindow();
};

// 日志按钮
logButton.onClick = function() {
    openLogWindow();
};

// ======================== 显示窗口 ========================
loadApiKeys();
loadPathPatterns();
updateStatusText();
addLog("Auto_Tiny v" + version + " 已启动");
addLog("当前配置了 " + API_KEYS_INFO.length + " 个 API Key");
addLog("剩余/总计：" + getTotalRemaining() + "/" + getTotalQuota());
addLog("当前路径配置：" + PATH_PATTERNS[currentPathPatternIndex].name);
addLog("实际路径：" + resolvePathPattern(PATH_PATTERNS[currentPathPatternIndex].pattern));

win.center();
win.show();