// PhotoRoom 抠图测试

var API_KEY = "sk_pr_default_24d2959f0b1aee890d7dde26afe47fe4b5a87303";

function testPhotoRoom() {
    if (!API_KEY || API_KEY.trim() === "") {
        alert("请先配置 API Key！");
        return;
    }

    // 选择图片
    var inputFile = File.openDialog("选择要抠图的图片", "*.jpg;*.jpeg;*.png;*.webp");
    if (!inputFile) return;

    // 复制到临时目录
    var tempInputFile = new File(Folder.temp.fsName + "/photoroom_input.png");
    inputFile.copy(tempInputFile);

    // 临时输出文件
    var tempOutputFile = new File(Folder.temp.fsName + "/photoroom_output.png");

    // 使用 curl.exe (不是 curl!)
    var cmd = 'curl.exe -s -L -X POST "https://sdk.photoroom.com/v1/segment" ';
    cmd += '-H "x-api-key: ' + API_KEY + '" ';
    cmd += '-F "image_file=@' + tempInputFile.fsName + '" ';
    cmd += '-o "' + tempOutputFile.fsName + '"';

    // 执行
    var result = system.callSystem(cmd);

    // 检查临时输出
    if (tempOutputFile.exists && tempOutputFile.length > 0) {
        // 复制到目标位置
        var outputFilePath = inputFile.parent.fsName + "/" + inputFile.name.replace(/\.[^.]+$/, "_nobg.png");
        var outputFile = new File(outputFilePath);
        tempOutputFile.copy(outputFile);

        // 清理临时文件
        tempInputFile.remove();
        tempOutputFile.remove();

        alert("抠图完成！\n\n输出: " + outputFilePath);
        outputFile.parent.execute();
    } else {
        alert("处理失败！\n\n结果: " + result);
    }
}

testPhotoRoom();