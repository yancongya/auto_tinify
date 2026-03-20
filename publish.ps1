# 自动化脚本：同步并推送到公开分支

Write-Host "===== Auto_Tinify 自动发布脚本 =====" -ForegroundColor Cyan
Write-Host ""

# 1. 确保在dev分支
$currentBranch = git branch --show-current
if ($currentBranch -ne "dev") {
    Write-Host "当前分支: $currentBranch，切换到dev分支..." -ForegroundColor Yellow
    git checkout dev
}

# 2. 检查是否有更改
$status = git status --porcelain
if (-not $status) {
    Write-Host "没有检测到文件更改" -ForegroundColor Yellow
    $response = Read-Host "是否继续发布？(y/n)"
    if ($response -ne "y") {
        exit
    }
}

# 3. 提交源代码更改到dev分支
Write-Host "步骤1: 提交源代码到dev分支（私有）..." -ForegroundColor Yellow
git add .
git commit -m "更新源代码"
git push origin dev
Write-Host "✓ 源代码已推送到dev分支" -ForegroundColor Green
Write-Host ""

# 4. 检查public文件夹
Write-Host "步骤2: 检查public文件夹..." -ForegroundColor Yellow
$publicFiles = Get-ChildItem -Path "public" -Filter "*.jsxbin" -File -ErrorAction SilentlyContinue
if (-not $publicFiles -or $publicFiles.Count -eq 0) {
    Write-Host "⚠ public文件夹中没有找到.jsxbin文件" -ForegroundColor Yellow
    Write-Host "提示：请手动编译JSX文件并保存到public文件夹后再运行此脚本" -ForegroundColor Cyan
    Read-Host "按Enter键退出"
    exit
}

Write-Host "✓ 找到 $($publicFiles.Count) 个加密文件" -ForegroundColor Green
Write-Host ""

# 5. 切换到main分支
Write-Host "步骤3: 切换到main分支（公开）..." -ForegroundColor Yellow
git checkout main

# 6. 同步文件夹内容
Write-Host "步骤4: 同步public、assets文件夹和文档..." -ForegroundColor Yellow
git checkout dev -- public/
git checkout dev -- assets/
git add public/
git add assets/
git add "更新日志.md"
git add README.md

# 检查是否有更改
$mainStatus = git status --porcelain
if (-not $mainStatus) {
    Write-Host "没有需要提交的更改" -ForegroundColor Yellow
} else {
    # 7. 提交到main分支
    git commit -m "发布加密版本 ($($publicFiles.Count) 个文件)"
    git push origin main
    Write-Host "✓ 加密版本已推送到main分支" -ForegroundColor Green
}

Write-Host ""

# 8. 切回dev分支
Write-Host "步骤5: 切回dev分支..." -ForegroundColor Yellow
git checkout dev

Write-Host ""
Write-Host "===== 发布完成 =====" -ForegroundColor Green
Write-Host "✓ 源码已推送到 dev 分支（私有）" -ForegroundColor Green
Write-Host "✓ 加密版本已推送到 main 分支（公开）" -ForegroundColor Green
Write-Host ""

# 显示公开仓库地址
Write-Host "公开仓库地址：" -ForegroundColor Cyan
gh repo view --web