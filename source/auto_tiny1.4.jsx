// 设置版本的变量
var version = "1.4";

// 控制是否使用当前文件目录下的"输出"文件夹作为源路径
var useOutputFolder = 1; // 0: 不使用，1: 使用

// 声明全局变量 folderPath
var folderPath;
if (useOutputFolder === 1) {
    folderPath = new Folder(app.project.file.parent.fsName + "/输出");
} else {
    folderPath = app.project.file ? new Folder(app.project.file.parent.fsName) : "未保存项目";
}

// 创建主窗口（使用 dialog 类型）
var win = new Window("dialog", "Auto_Tiny v " + version, undefined);
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

// 当前目录显示组（仅保留按钮，按钮居中）
var dirGroup = controlPanel.add("group");
dirGroup.orientation = "row";
dirGroup.alignChildren = ["center", "center"];
dirGroup.spacing = 15;
dirGroup.margins = 5;

var pathButton = dirGroup.add("button", undefined, folderPath instanceof Folder ? folderPath.fsName : folderPath);
pathButton.preferredSize.width = 300;
// 设置鼠标悬停提示
pathButton.helpTip = "默认压缩目录，点击打开目录";

pathButton.onClick = function() {
    if (folderPath instanceof Folder && folderPath.exists) {
        folderPath.execute(); // 打开当前目录
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
var replaceButton = buttonGroup.add("button", undefined, "替换");
var setPathButton = buttonGroup.add("button", undefined, "设置目录");

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

// 添加日志输出函数
function addLog(message) {
    logText.text += message + "\n";
    win.update();
}

// 递归复制文件夹及其内容，返回复制的文件数量
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
            var ext = file.name.split('.').pop().toLowerCase();
            if (["jpg", "jpeg", "png", "gif", "bmp", "tiff"].indexOf(ext) !== -1) {
                try {
                    if (file.copy(destFile)) {
                        copiedCount++;
                    }
                } catch (e) {
                    addLog("复制文件出错：" + file.fsName + "\n" + e.toString());
                }
            }
        }
        // 定期更新UI
        if (i % 10 === 0) {
            win.update();
        }
    }
    return copiedCount;
}

// 删除文件夹内所有内容（递归清空子文件夹）
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

// ================ 按钮点击事件 - 开始压缩 =================
uploadButton.onClick = function() {
    // 直接使用 folderPath 作为操作目录
    var sourceFolder = folderPath;
    
    // 如果项目未保存或 sourceFolder 不是 Folder 对象，则退出
    if (!(sourceFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        statusText.text = "状态：错误，项目未保存";
        return;
    }
    
    addLog("当前操作目录为：" + sourceFolder.fsName);
    statusText.text = "状态：开始压缩...";
    progressBar.value = 0;
    
    var tempSourceFolder = new Folder("D:/auto_tiny/source");
    var outputFolder = new Folder("D:/auto_tiny/output");
    
    if (!sourceFolder.exists) {
        alert("源文件夹不存在: " + sourceFolder.fsName);
        addLog("错误：源文件夹不存在：" + sourceFolder.fsName);
        statusText.text = "状态：错误，源文件夹不存在";
        return;
    }
    
    addLog("开始清理临时源文件夹和输出文件夹...");
    if (tempSourceFolder.exists) {
        clearFolder(tempSourceFolder);
    } else {
        tempSourceFolder.create();
        addLog("创建临时源文件夹：" + tempSourceFolder.fsName);
    }
    if (outputFolder.exists) {
        clearFolder(outputFolder);
    } else {
        outputFolder.create();
        addLog("创建输出文件夹：" + outputFolder.fsName);
    }
    
    addLog("开始复制文件...");
    var copiedFilesCount = copyFolder(sourceFolder, tempSourceFolder);
    if (copiedFilesCount === 0) {
        alert("没有复制任何文件。");
        addLog("没有复制任何文件，终止操作。");
        statusText.text = "状态：未复制文件";
        progressBar.value = 0;
        return;
    }
    addLog("复制完成，共复制 " + copiedFilesCount + " 个文件。");
    progressBar.value = 50;
    
    var tinyExePath = new File("D:/auto_tiny/tiny.exe");
    if (!tinyExePath.exists) {
        alert("找不到 tiny.exe 文件，路径为: " + tinyExePath.fsName);
        addLog("错误：找不到 tiny.exe 文件，路径为：" + tinyExePath.fsName);
        statusText.text = "状态：错误，找不到 tiny.exe";
        progressBar.value = 0;
        return;
    }
    
    if ($.os.indexOf("Windows") === -1) {
        alert("此脚本仅支持 Windows 操作系统。");
        addLog("错误：此脚本仅支持 Windows 操作系统。");
        statusText.text = "状态：错误，操作系统不支持";
        progressBar.value = 0;
        return;
    }
    
    addLog("开始执行 tiny.exe 进行压缩...");
    try {
        var workingDirectory = "D:\\auto_tiny";
        // 修改了 start 命令，增加空的标题参数
        var command = 'cmd /c "cd /d ' + workingDirectory + ' && start "" tiny.exe"';
        addLog("执行命令：" + command);
        var result = system.callSystem(command);
        addLog("命令执行结果：" + result);
        alert("压缩完成！");
        addLog("压缩完成！");
        statusText.text = "状态：压缩完成！";
        progressBar.value = 100;
    } catch (e) {
        alert("运行 tiny.exe 时发生异常：\n" + e.toString());
        addLog("异常：运行 tiny.exe 时发生异常：\n" + e.toString());
        statusText.text = "状态：错误，运行 tiny.exe异常";
        progressBar.value = 0;
    }
};

// ================ 按钮点击事件 - 替换 =================
replaceButton.onClick = function() {
    // 直接使用 folderPath 作为目标目录
    var destinationFolder = folderPath;
    
    if (!(destinationFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        statusText.text = "状态：错误，项目未保存";
        return;
    }
    
    var outputFolder = new Folder("D:/auto_tiny/output");
    var tempSourceFolder = new Folder("D:/auto_tiny/source");
    
    if (!outputFolder.exists) {
        alert("输出文件夹不存在: " + outputFolder.fsName);
        addLog("错误：输出文件夹不存在：" + outputFolder.fsName);
        statusText.text = "状态：错误，输出文件夹不存在";
        return;
    }
    
    addLog("开始执行文件替换操作...");
    statusText.text = "状态：正在替换文件...";
    clearFolder(tempSourceFolder);
    var replacedCount = copyFolder(outputFolder, destinationFolder);
    addLog("替换操作完成，共替换 " + replacedCount + " 个文件。");
    clearFolder(outputFolder);
    addLog("输出文件夹已清空。");
    statusText.text = "状态：替换完成";
    progressBar.value = 100;
};

// ================ 按钮点击事件 - 设置目录 =================
setPathButton.onClick = function() {
    var newFolder = Folder.selectDialog("选择新的目录");
    if (newFolder) {
        folderPath = newFolder; // 更新当前目录
        pathButton.text = folderPath.fsName; // 更新显示路径的按钮文本
        addLog("设置新目录为：" + folderPath.fsName);
        alert("设置目录成功, 当前目录为：" + folderPath.fsName);
    }
};

// 显示窗口
win.center();
win.show();