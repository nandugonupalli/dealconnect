param([string]$Message = "chore: auto-deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')")

Write-Host "`n=== Deploy ===" -ForegroundColor Magenta

Write-Host "`n> Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed" -ForegroundColor Red; exit 1 }

Write-Host "`n> Git commit..." -ForegroundColor Cyan
$status = git status --porcelain
if ($status) {
  git add .
  git commit -m $Message
} else {
  Write-Host "  No changes" -ForegroundColor Yellow
}

Write-Host "`n> Pull + push..." -ForegroundColor Cyan
git pull origin main --rebase
git push origin main

Write-Host "`n=== Deploy Complete! Vercel will auto-deploy ===" -ForegroundColor Green
