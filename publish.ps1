# Auto-Tinify Publish Script
Write-Host "===== Auto_Tinify Publish Script =====" -ForegroundColor Cyan
Write-Host ""

# 1. Ensure we're on dev branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "dev") {
    Write-Host "Current branch: $currentBranch, switching to dev..." -ForegroundColor Yellow
    git checkout dev
}

# 2. Check for changes
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes detected" -ForegroundColor Yellow
    $response = Read-Host "Continue publishing? (y/n)"
    if ($response -ne "y") {
        exit
    }
}

# 3. Commit source code changes to dev branch
Write-Host "Step 1: Committing source code to dev branch (private)..." -ForegroundColor Yellow
git add .
git commit -m "Update source code"
git push origin dev
Write-Host "Source code pushed to dev branch" -ForegroundColor Green
Write-Host ""

# 4. Check public folder
Write-Host "Step 2: Checking public folder..." -ForegroundColor Yellow
$publicFiles = Get-ChildItem -Path "public" -Filter "*.jsxbin" -File -ErrorAction SilentlyContinue
if (-not $publicFiles -or $publicFiles.Count -eq 0) {
    Write-Host "No .jsxbin files found in public folder" -ForegroundColor Yellow
    Write-Host "Please manually compile JSX files and save to public folder" -ForegroundColor Cyan
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "Found $($publicFiles.Count) encrypted files" -ForegroundColor Green
Write-Host ""

# 5. Switch to main branch
Write-Host "Step 3: Switching to main branch (public)..." -ForegroundColor Yellow
git checkout main

# 6. Sync folders
Write-Host "Step 4: Syncing public, assets folders and docs..." -ForegroundColor Yellow
git checkout dev -- public/
git checkout dev -- assets/
git add public/
git add assets/
git add "更新日志.md"
git add README.md

# Check for changes
$mainStatus = git status --porcelain
if (-not $mainStatus) {
    Write-Host "No changes to commit" -ForegroundColor Yellow
} else {
    # 7. Commit to main branch
    git commit -m "Release encrypted version ($($publicFiles.Count) files)"
    git push origin main
    Write-Host "Encrypted version pushed to main branch" -ForegroundColor Green
}

Write-Host ""

# 8. Switch back to dev branch
Write-Host "Step 5: Switching back to dev branch..." -ForegroundColor Yellow
git checkout dev

Write-Host ""
Write-Host "===== Publish Complete =====" -ForegroundColor Green
Write-Host "Source code pushed to dev branch (private)" -ForegroundColor Green
Write-Host "Encrypted version pushed to main branch (public)" -ForegroundColor Green
Write-Host ""

# Show repository URL
Write-Host "Repository URL:" -ForegroundColor Cyan
gh repo view --web
