# 批量编译JSX为JSXBIN，输出到public文件夹
$sourceFolder = "source"  # 源文件夹
$outputFolder = "public"   # 输出文件夹

Write-Host "===== JSX 批量编译工具 =====" -ForegroundColor Cyan
Write-Host ""

# 检查源文件夹是否存在
if (-not (Test-Path $sourceFolder)) {
    Write-Host "✗ 源文件夹不存在: $sourceFolder" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit
}

# 创建输出文件夹
if (-not (Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder | Out-Null
    Write-Host "创建输出文件夹: $outputFolder" -ForegroundColor Green
}

# 获取所有JSX文件
$jsxFiles = Get-ChildItem -Path $sourceFolder -Filter "*.jsx" -File

if ($jsxFiles.Count -eq 0) {
    Write-Host "✗ 在 $sourceFolder 文件夹中未找到 JSX 文件" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit
}

Write-Host "找到 $($jsxFiles.Count) 个 JSX 文件待编译" -ForegroundColor Green
Write-Host ""

# 检查ExtendScript Toolkit是否存在
$estkPath = "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\ExtendScript Toolkit\ExtendScript Toolkit.exe"
$useESTK = $false

if (Test-Path $estkPath) {
    Write-Host "✓ 检测到 ExtendScript Toolkit" -ForegroundColor Green
    $useESTK = $true
} else {
    Write-Host "✗ 未找到 ExtendScript Toolkit" -ForegroundColor Yellow
    Write-Host "尝试其他编译路径..." -ForegroundColor Yellow

    # 尝试其他可能的位置
    $possiblePaths = @(
        "C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\ExtendScript Toolkit\ExtendScript Toolkit.exe",
        "C:\Program Files (x86)\Adobe\Adobe After Effects 2024\Support Files\ExtendScript Toolkit\ExtendScript Toolkit.exe",
        "C:\Program Files\Adobe\Adobe After Effects CC 2024\Support Files\ExtendScript Toolkit\ExtendScript Toolkit.exe"
    )

    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $estkPath = $path
            $useESTK = $true
            Write-Host "✓ 找到 ExtendScript Toolkit: $estkPath" -ForegroundColor Green
            break
        }
    }
}

if (-not $useESTK) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Yellow
    Write-Host "未找到 ExtendScript Toolkit" -ForegroundColor Yellow
    Write-Host "====================================" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请使用以下方式之一编译：" -ForegroundColor Cyan
    Write-Host "1. 手动使用 Adobe ExtendScript Toolkit 编译" -ForegroundColor White
    Write-Host "2. 访问在线编译器: https://extendscriptevaluator.com/" -ForegroundColor White
    Write-Host "3. 安装 Node.js 工具: npm install -g jsxbin" -ForegroundColor White
    Write-Host ""
    Write-Host "编译后请将 JSXBIN 文件保存到: $outputFolder" -ForegroundColor Cyan
    Read-Host "按Enter键退出"
    exit
}

Write-Host ""
Write-Host "开始编译..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

# 遍历所有JSX文件并编译
foreach ($jsxFile in $jsxFiles) {
    $inputFile = $jsxFile.FullName
    $outputFile = Join-Path $outputFolder ($jsxFile.BaseName + ".jsxbin")

    Write-Host "编译: $($jsxFile.Name)" -ForegroundColor Cyan

    try {
        # 使用ExtendScript Toolkit编译
        $process = Start-Process -FilePath $estkPath -ArgumentList "-cmd `"compile('$inputFile', '$outputFile')`"" -Wait -PassThru -NoNewWindow -ErrorAction Stop

        if ($process.ExitCode -eq 0 -and (Test-Path $outputFile)) {
            Write-Host "  ✓ 成功: $($jsxFile.BaseName).jsxbin" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "  ✗ 失败: $($jsxFile.Name)" -ForegroundColor Red
            $failCount++
        }
    } catch {
        Write-Host "  ✗ 错误: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "===== 编译完成 =====" -ForegroundColor Cyan
Write-Host "成功: $successCount 个文件" -ForegroundColor Green
Write-Host "失败: $failCount 个文件" -ForegroundColor Red
Write-Host ""

# 列出编译后的文件
$compiledFiles = Get-ChildItem -Path $outputFolder -Filter "*.jsxbin" -File
if ($compiledFiles.Count -gt 0) {
    Write-Host "编译后的文件 ($outputFolder):" -ForegroundColor Cyan
    foreach ($file in $compiledFiles) {
        $size = [math]::Round($file.Length / 1KB, 2)
        Write-Host "  - $($file.Name) ($size KB)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "按Enter键退出..."
Read-Host