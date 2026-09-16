Write-Host "`n=== Health Check ===`n" -ForegroundColor Magenta

$srcFiles = (Get-ChildItem -Path "src" -Recurse -File -EA SilentlyContinue).Count
Write-Host "  Source files: $srcFiles" -ForegroundColor Cyan

if (Test-Path "node_modules") {
  $m = (Get-ChildItem -Path "node_modules" -Directory).Count
  Write-Host "  Packages: $m" -ForegroundColor Green
} else {
  Write-Host "  Packages: MISSING" -ForegroundColor Red
}

$status = git status --porcelain 2>$null
if ($status) {
  Write-Host "  Git: uncommitted changes" -ForegroundColor Yellow
} else {
  Write-Host "  Git: clean" -ForegroundColor Green
}

$branch = git branch --show-current 2>$null
Write-Host "  Branch: $branch" -ForegroundColor Cyan

$last = git log -1 --format="%h %s" 2>$null
Write-Host "  Last commit: $last" -ForegroundColor Cyan

Write-Host "`n=== Done ===" -ForegroundColor Green
