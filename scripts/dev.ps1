param([switch]$Clean)

Write-Host "`n=== Dev Environment ===" -ForegroundColor Magenta

if ($Clean) {
  @("node_modules\.vite", ".vite", "dist") | ForEach-Object {
    if (Test-Path $_) { Remove-Item -Recurse -Force $_ -EA SilentlyContinue }
  }
  Write-Host "  OK  Caches cleared" -ForegroundColor Green
}

Write-Host "`n> Starting Vite dev server..." -ForegroundColor Cyan
Write-Host "  URL: http://localhost:3000" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop`n" -ForegroundColor Yellow

npm run dev
