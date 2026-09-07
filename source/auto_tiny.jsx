// 控制是否使用当前文件目录下的"输出"文件夹作为源路径
var useOutputFolder = 1; // 0: 不使用，1: 使用

// 创建主窗口
var win = new Window("palette", "文件处理", undefined);
win.orientation = "column";

// 创建按钮组
var buttonGroup = win.add("group");
buttonGroup.orientation = "row"; // 设置为横向排列

// 创建上传和替换按钮
var uploadButton = buttonGroup.add("button", undefined, "开始压缩");
var replaceButton = buttonGroup.add("button", undefined, "替换");

// 创建设置目录按钮
var setPathButton = buttonGroup.add("button", undefined, "设置目录");

// 添加设置目录按钮的点击事件
setPathButton.onClick = function() {
    var newFolder = Folder.selectDialog("选择新的输出路径");
    if (newFolder) {
        folderPath = newFolder; // 更新输出路径
        pathButton.text = folderPath.fsName; // 更新按钮显示的路径
    }
};

// 确定源路径
var folderPath;
if (useOutputFolder === 1) {
    folderPath = new Folder(app.project.file.parent.fsName + "/输出");
} else {
    folderPath = app.project.file ? app.project.file.parent.fsName : "未保存项目";
}

// 创建显示源路径的按钮
var pathButton = win.add("button", undefined, folderPath.fsName);
pathButton.preferredSize.width = 300; // 设置按钮宽度

// 添加点击事件
pathButton.onClick = function() {
    if (folderPath.exists) {
        folderPath.execute(); // 打开"输出"文件夹
    } else {
        alert("文件夹不存在: " + folderPath.fsName);
    }
};

// 递归复制文件夹及其内容
function copyFolder(source, destination) {
    if (!destination.exists) {
        destination.create();
    }
    var files = source.getFiles();
    var copiedFiles = []; // 用于存储复制的文件名
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var destFile = new File(destination.fsName + "/" + file.name);
        if (file instanceof Folder) {
            copyFolder(file, destFile); // 递归复制子文件夹
        } else {
            // 检查文件扩展名，只复制图片文件
            var ext = file.name.split('.').pop().toLowerCase();
            if (["jpg", "jpeg", "png", "gif", "bmp", "tiff"].indexOf(ext) !== -1) {
                file.copy(destFile); // 复制文件
                copiedFiles.push(decodeURI(file.name)); // 记录复制的文件名并解码
            }
        }
    }
    
    // 检查是否有文件被复制
    if (copiedFiles.length > 0) {
        alert("已复制以下图片文件:\n" + copiedFiles.join("\n")); // 弹窗显示复制的文件
    } else {
        alert("没有复制任何文件。"); // 提示没有复制文件
        return; // 退出执行
    }
}

// 删除文件夹内所有内容
function clearFolder(folder) {
    if (folder.exists) {
        var files = folder.getFiles();
        for (var i = 0; i < files.length; i++) {
            files[i].remove(); // 删除文件或文件夹
        }
    }
}

// 按钮点击事件
uploadButton.onClick = function() {
    var sourceFolder = folderPath; // 使用设置的源路径
    var destinationFolder = new Folder("D:/auto_tiny/source");

    if (sourceFolder.exists) {
        copyFolder(sourceFolder, destinationFolder);
        // 运行 tiny.exe
        var tinyExePath = new File("D:/auto_tiny/tiny.exe");
        if (tinyExePath.exists) {
            // 检查操作系统类型（Windows）
            if ($.os.indexOf("Windows") === -1) {
                alert("此脚本仅支持 Windows 操作系统。");
            } else {
                // 定义 tiny.exe 的路径
                var tinyPath = "D:\\auto_tiny\\tiny.exe";

                // 定义工作目录（解决默认路径问题）
                var workingDirectory = "D:\\auto_tiny"; // 替换为实际的有效路径

                // 检查文件是否存在
                var file = new File(tinyPath);
                if (!file.exists) {
                    alert("找不到 tiny.exe 文件，请检查路径是否正确。");
                } else {
                    try {
                        // 设置命令，切换到工作目录并运行 tiny.exe
                        var command = 'cmd /c "cd /d ' + workingDirectory + ' && tiny.exe"'; // 确保正确切换目录
                        var result = system.callSystem(command);

                        // 检查执行结果
                        if (result === null) {
                            alert("执行 tiny.exe 时发生错误。");
                        } else {
                            alert("压缩完成！");
                        }
                    } catch (e) {
                        alert("运行 tiny.exe 时发生异常：\n" + e.toString());
                    }
                }
            }
        } else {
            alert("找不到 tiny.exe 文件，路径为: " + tinyExePath.fsName);
        }
    } else {
        alert("源文件夹不存在: " + sourceFolder.fsName);
    }
};

// 替换按钮点击事件
replaceButton.onClick = function() {
    var outputFolder = new Folder("D:/auto_tiny/output");
    var destinationFolder = folderPath; // 使用设置的源路径
    var tempSourceFolder = new Folder("D:/auto_tiny/source"); // 定义临时源文件夹

    if (outputFolder.exists) {
        // 清空临时源文件夹
        clearFolder(tempSourceFolder); // 清空临时源文件夹

        // 先复制文件
        copyFolder(outputFolder, destinationFolder); // 替换文件
        
        // 清空输出文件夹
        clearFolder(outputFolder); // 清空输出文件夹
    } else {
        alert("输出文件夹不存在: " + outputFolder.fsName);
    }
};

// 显示窗口
win.center();
win.show();