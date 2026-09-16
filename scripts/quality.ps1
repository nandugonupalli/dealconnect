param([switch]$Fix)

Write-Host "`n=== Quality Checks ===" -ForegroundColor Magenta
Write-Host "  (Requires eslint + prettier installed)" -ForegroundColor Yellow
Write-Host "  Run: npm install -D eslint prettier" -ForegroundColor Yellow
Write-Host "`n  Skipping - not yet configured`n" -ForegroundColor Cyan
