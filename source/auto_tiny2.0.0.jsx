// 设置版本的变量
var version = "2.0";

// ======================== Tinify API 配置 ========================
var TINIFY_API_HOST = "api.tinify.com";
var TINIFY_API_PORT = 443;

// ======================== API Key 存储配置 ========================
var configFileName = "auto_tiny_config.txt";
var configFilePath = new File(File($.fileName).parent.fsName + "/" + configFileName);
var TINIFY_API_KEY = loadApiKey(); // 从配置文件加载 API Key

// ======================== 全局变量 ========================
var folderPath;
var useOutputFolder = 1; // 0: 不使用，1: 使用

// 确定源路径
if (useOutputFolder === 1) {
    folderPath = new Folder(app.project.file.parent.fsName + "/输出");
} else {
    folderPath = app.project.file ? new Folder(app.project.file.parent.fsName) : "未保存项目";
}

// ======================== 辅助函数：API Key 存储 ========================

// 加载 API Key
function loadApiKey() {
    if (configFilePath.exists) {
        configFilePath.encoding = "UTF-8";
        configFilePath.open("r");
        var key = configFilePath.read().trim();
        configFilePath.close();
        return key;
    }
    return "";
}

// 保存 API Key
function saveApiKey(key) {
    configFilePath.encoding = "UTF-8";
    configFilePath.open("w");
    configFilePath.write(key);
    configFilePath.close();
}

// ======================== 创建主窗口 ========================
var win = new Window("dialog", "Auto_Tiny v " + version + " (Tinify API)", undefined);
win.orientation = "column";
win.alignChildren = ["fill", "top"];
win.spacing = 10;
win.margins = 15;

// ======================== 控制面板 ========================
var controlPanel = win.add("panel", undefined, "控制面板");
controlPanel.orientation = "column";
controlPanel.alignChildren = ["fill", "top"];
controlPanel.spacing = 10;
controlPanel.margins = 10;

// API Key 输入组
var apiKeyGroup = controlPanel.add("group");
apiKeyGroup.orientation = "row";
apiKeyGroup.alignChildren = ["fill", "center"];
apiKeyGroup.spacing = 10;

apiKeyGroup.add("statictext", undefined, "API Key:");
var apiKeyInput = apiKeyGroup.add("edittext", undefined, TINIFY_API_KEY);
apiKeyInput.characters = 40;
apiKeyInput.onDeactivate = function() {
    saveApiKey(this.text);
    addLog("API Key 已保存");
};

// 当前目录显示组
var dirGroup = controlPanel.add("group");
dirGroup.orientation = "row";
dirGroup.alignChildren = ["center", "center"];
dirGroup.spacing = 15;
dirGroup.margins = 5;

var pathButton = dirGroup.add("button", undefined, folderPath instanceof Folder ? folderPath.fsName : folderPath);
pathButton.preferredSize.width = 300;
pathButton.helpTip = "默认压缩目录，点击打开目录";

pathButton.onClick = function() {
    if (folderPath instanceof Folder && folderPath.exists) {
        folderPath.execute();
    } else {
        alert("文件夹不存在: " + folderPath.fsName);
        addLog("错误：文件夹不存在：" + folderPath.fsName);
    }
};

// 操作按钮组
var buttonGroup = controlPanel.add("group");
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["fill", "center"];
buttonGroup.spacing = 10;

var uploadButton = buttonGroup.add("button", undefined, "开始压缩");
uploadButton.helpTip = "默认：压缩到临时文件夹\n按住 Alt 键点击：直接替换原图";

var replaceButton = buttonGroup.add("button", undefined, "替换");
replaceButton.helpTip = "将压缩后的图片从临时文件夹复制到原目录";

var setPathButton = buttonGroup.add("button", undefined, "设置目录");
setPathButton.helpTip = "选择要压缩的图片目录";

// 进度条及状态提示
var progressBar = controlPanel.add("progressbar", undefined, 0, 100);
progressBar.preferredSize.width = 300;
progressBar.value = 0;

var statusText = controlPanel.add("statictext", undefined, "状态：等待操作");
statusText.preferredSize.width = 300;

// ======================== 日志面板 ========================
var logPanel = win.add("panel", undefined, "日志");
logPanel.orientation = "column";
logPanel.alignChildren = ["fill", "fill"];
logPanel.spacing = 5;
logPanel.margins = 10;

var logText = logPanel.add("edittext", undefined, "", { multiline: true, scrolling: true });
logText.preferredSize = [300, 150];

// 刷新日志按钮
var refreshButton = win.add("button", undefined, "↻ 刷新日志");
refreshButton.onClick = function() {
    logText.text = "";
};

// ======================== 辅助函数 ========================

// 添加日志输出函数
function addLog(message) {
    logText.text += message + "\n";
    win.update();
}

// 使用 curl 命令压缩单个图片文件
function compressImage(apiKey, inputFile, outputFile) {
    addLog("正在压缩: " + inputFile.name);

    // 创建临时文件用于存储响应头
    var headerFile = new File(Folder.temp.fsName + "/tinify_headers_" + (new Date().getTime()) + ".txt");

    // 将文件复制到临时目录（避免中文路径问题）
    var tempInputFile = new File(Folder.temp.fsName + "/tinify_temp_" + (new Date().getTime()) + ".temp");
    inputFile.copy(tempInputFile);

    // 构建上传命令（使用临时文件）
    var uploadCmd = 'curl -s -D "' + headerFile.fsName + '" --user api:' + apiKey +
                    ' --data-binary @"' + tempInputFile.fsName + '" ' +
                    ' https://api.tinify.com/shrink';

    // 执行上传
    try {
        var uploadResult = system.callSystem(uploadCmd);

        // 读取响应头
        var headers = "";
        var location = "";
        var compressionCount = 0;

        if (headerFile.exists) {
            headerFile.encoding = "UTF-8";
            headerFile.open("r");
            headers = headerFile.read();
            headerFile.close();
            headerFile.remove();

            // 解析响应头获取 Location
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
            // 清理临时文件
            if (tempInputFile.exists) tempInputFile.remove();
            if (headerFile.exists) headerFile.remove();
            return false;
        }

        addLog("  上传成功，正在下载压缩后的图片...");

        // 创建临时下载文件（避免中文路径问题）
        var tempDownloadFile = new File(Folder.temp.fsName + "/tinify_download_" + (new Date().getTime()) + ".temp");

        // 构建下载命令（使用临时文件）
        var downloadCmd = 'curl -s --user api:' + apiKey +
                         ' -o "' + tempDownloadFile.fsName + '" ' +
                         ' "' + location + '"';

        var downloadResult = system.callSystem(downloadCmd);

        // 检查下载结果
        var success = false;

        if (tempDownloadFile.exists && tempDownloadFile.length > 0) {
            // 将临时文件复制到目标位置
            var outputFileObj = new File(outputFile);
            if (tempDownloadFile.copy(outputFileObj)) {
                var originalSize = inputFile.length;
                var compressedSize = outputFileObj.length;
                var savings = ((1 - compressedSize / originalSize) * 100).toFixed(2);
                addLog("  压缩完成！原始: " + formatFileSize(originalSize) +
                       " → 压缩后: " + formatFileSize(compressedSize) +
                       " (节省 " + savings + "%)");
                if (compressionCount > 0) {
                    addLog("  本月已使用压缩次数: " + compressionCount);
                }
                success = true;
            } else {
                addLog("  错误：无法将压缩后的文件复制到目标位置");
            }
        } else {
            addLog("  错误：下载压缩后的图片失败");
        }

        // 清理临时下载文件
        if (tempDownloadFile.exists) tempDownloadFile.remove();

        // 清理临时文件
        if (tempInputFile.exists) tempInputFile.remove();
        if (headerFile.exists) headerFile.remove();

        return success;

    } catch (e) {
        addLog("  异常：压缩过程中出错 - " + e.toString());
        // 清理临时文件
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
                if (compressImage(apiKey, file, destFile)) {
                    successCount++;
                    var compressedFile = new File(destFile);
                    totalSize += compressedFile.length;
                } else {
                    failCount++;
                }
            }
        }

        // 更新进度条
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
    var apiKey = apiKeyInput.text;
    if (!apiKey) {
        alert("请先输入 Tinify API Key！");
        addLog("错误：未输入 API Key");
        return;
    }

    // 保存 API Key
    saveApiKey(apiKey);

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

    // 检测是否按住 Alt 键
    var altPressed = ScriptUI.environment.keyboardState.altKey;

    if (altPressed) {
        // Alt + 点击：直接替换原图
        var confirmResult = confirm("即将压缩并直接替换原图！\n\n⚠️ 此操作将覆盖原始文件，请确认是否继续？");
        if (!confirmResult) {
            addLog("用户取消了操作");
            statusText.text = "状态：已取消";
            return;
        }
        addLog("开始压缩图片（将直接替换原图）...");
        var result = compressFolder(sourceFolder, sourceFolder, apiKey);
    } else {
        // 默认：压缩到临时文件夹
        var tempOutputFolder = new Folder(Folder.temp.fsName + "/auto_tiny_output");
        if (tempOutputFolder.exists) {
            clearFolder(tempOutputFolder);
        } else {
            tempOutputFolder.create();
        }
        addLog("开始压缩图片（压缩到临时文件夹）...");
        var result = compressFolder(sourceFolder, tempOutputFolder, apiKey);
        addLog("\n临时文件夹路径：" + tempOutputFolder.fsName);
        addLog("压缩完成后请点击'替换'按钮将文件复制到原目录");
    }

    addLog("\n========== 压缩完成 ==========");
    addLog("成功: " + result.success + " 个文件");
    addLog("失败: " + result.fail + " 个文件");
    addLog("压缩后总大小: " + formatFileSize(result.totalSize));
    statusText.text = "状态：压缩完成！";
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
    statusText.text = "状态：替换完成";
    progressBar.value = 100;

    alert("替换完成！共替换 " + replacedCount + " 个文件。");
};

// 设置目录
setPathButton.onClick = function() {
    var newFolder = Folder.selectDialog("选择新的目录");
    if (newFolder) {
        folderPath = newFolder;
        pathButton.text = folderPath.fsName;
        addLog("设置新目录为：" + folderPath.fsName);
        alert("设置目录成功, 当前目录为：" + folderPath.fsName);
    }
};

// ======================== 显示窗口 ========================
win.center();
win.show();