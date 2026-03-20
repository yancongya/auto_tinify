// 控制是否使用当前文件目录下的"输出"文件夹作为源路径
var useOutputFolder = 1; // 0: 不使用，1: 使用

// 创建主窗口
var win = new Window("palette", "文件处理", undefined);
win.orientation = "column";
win.alignChildren = ["fill", "top"];

// 创建按钮组
var buttonGroup = win.add("group");
buttonGroup.orientation = "row";

// 创建上传、替换和设置目录按钮
var uploadButton = buttonGroup.add("button", undefined, "开始压缩");
var replaceButton = buttonGroup.add("button", undefined, "替换");
var setPathButton = buttonGroup.add("button", undefined, "设置目录");

// 声明全局变量 folderPath
var folderPath;
if (useOutputFolder === 1) {
    folderPath = new Folder(app.project.file.parent.fsName + "/输出");
} else {
    folderPath = app.project.file ? new Folder(app.project.file.parent.fsName) : "未保存项目";
}

// 点击"设置目录"按钮后更新 folderPath
setPathButton.onClick = function() {
    var newFolder = Folder.selectDialog("选择新的目录");
    if (newFolder) {
        folderPath = newFolder; // 更新当前目录
        pathButton.text = folderPath.fsName; // 更新显示路径的按钮文本
        addLog("设置新目录为：" + folderPath.fsName);
        alert("设置目录成功, 当前目录为：" + folderPath.fsName);
    }
};

// 创建显示路径的按钮，默认显示 folderPath.fsName
var pathButton = win.add("button", undefined, folderPath instanceof Folder ? folderPath.fsName : folderPath);
pathButton.preferredSize.width = 300;
pathButton.onClick = function() {
    if (folderPath instanceof Folder && folderPath.exists) {
        folderPath.execute(); // 打开当前目录
    } else {
        alert("文件夹不存在: " + folderPath.fsName);
        addLog("错误：文件夹不存在：" + folderPath.fsName);
    }
};

// 增加日志显示区域
var logGroup = win.add("panel", undefined, "日志");
logGroup.alignChildren = "fill";
var logText = logGroup.add("edittext", undefined, "", { multiline: true, scrolling: true });
logText.preferredSize = [300, 100];

// 添加刷新日志按钮（刷新的icon）
var refreshGroup = win.add("group", undefined);
refreshGroup.orientation = "row";
var refreshButton = refreshGroup.add("button", undefined, "↻ 刷新日志");
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

// 按钮点击事件 - 点击"开始压缩"
uploadButton.onClick = function() {
    // 直接使用 folderPath 作为操作目录
    var sourceFolder = folderPath;
    
    // 如果项目未保存或 sourceFolder 不是 Folder 对象，则退出
    if (!(sourceFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        return;
    }
    
    addLog("当前操作目录为：" + sourceFolder.fsName);
    
    var tempSourceFolder = new Folder("D:/auto_tiny/source");
    var outputFolder = new Folder("D:/auto_tiny/output");
    
    if (!sourceFolder.exists) {
        alert("源文件夹不存在: " + sourceFolder.fsName);
        addLog("错误：源文件夹不存在：" + sourceFolder.fsName);
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
        return;
    }
    addLog("复制完成，共复制 " + copiedFilesCount + " 个文件。");
    
    var tinyExePath = new File("D:/auto_tiny/tiny.exe");
    if (!tinyExePath.exists) {
        alert("找不到 tiny.exe 文件，路径为: " + tinyExePath.fsName);
        addLog("错误：找不到 tiny.exe 文件，路径为：" + tinyExePath.fsName);
        return;
    }
    
    if ($.os.indexOf("Windows") === -1) {
        alert("此脚本仅支持 Windows 操作系统。");
        addLog("错误：此脚本仅支持 Windows 操作系统。");
        return;
    }
    
    addLog("开始执行 tiny.exe 进行压缩...");
    try {
        var workingDirectory = "D:\\auto_tiny";
        // 使用 start 命令，使 tiny.exe 在新进程中启动，不阻塞脚本执行
        var command = 'cmd /c "cd /d ' + workingDirectory + ' && start tiny.exe"';
        addLog("执行命令：" + command);
        var result = system.callSystem(command);
        addLog("命令执行结果：" + result);
        // 注意：result可能为空字符串，但只要命令发送成功即可点击压缩完成的提示
        alert("压缩完成！");
        addLog("压缩完成！");
    } catch (e) {
        alert("运行 tiny.exe 时发生异常：\n" + e.toString());
        addLog("异常：运行 tiny.exe 时发生异常：\n" + e.toString());
    }
};

// 按钮点击事件 - 点击"替换"
replaceButton.onClick = function() {
    // 直接使用 folderPath 作为目标目录
    var destinationFolder = folderPath;
    
    if (!(destinationFolder instanceof Folder)) {
        alert("项目未保存，请先保存项目！");
        addLog("错误：项目未保存！");
        return;
    }
    
    var outputFolder = new Folder("D:/auto_tiny/output");
    var tempSourceFolder = new Folder("D:/auto_tiny/source");
    
    if (!outputFolder.exists) {
        alert("输出文件夹不存在: " + outputFolder.fsName);
        addLog("错误：输出文件夹不存在：" + outputFolder.fsName);
        return;
    }
    
    addLog("开始执行文件替换操作...");
    clearFolder(tempSourceFolder);
    var replacedCount = copyFolder(outputFolder, destinationFolder);
    addLog("替换操作完成，共替换 " + replacedCount + " 个文件。");
    clearFolder(outputFolder);
    addLog("输出文件夹已清空。");
};

// 显示窗口
win.center();
win.show();