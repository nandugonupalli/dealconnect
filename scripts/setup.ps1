param([switch]$Force, [switch]$SkipInstall)
$ErrorActionPreference = "Continue"

function Write-Ok { param($m) Write-Host "  OK  $m" -ForegroundColor Green }
function Write-Err { param($m) Write-Host "  ERR $m" -ForegroundColor Red }
function Write-Step { param($m) Write-Host "`n> $m" -ForegroundColor Cyan }

Write-Host "`n=== DealConnect Setup ===`n" -ForegroundColor Magenta

Write-Step "Check prerequisites"
if (-not (node -v)) { Write-Err "Node.js missing"; exit 1 }
Write-Ok "Node $(node -v)"
Write-Ok "npm $(npm -v)"

Write-Step "Clean BOM"
$utf8 = New-Object System.Text.UTF8Encoding $false
$count = 0
Get-ChildItem -Path "." -Recurse -Include *.json, *.ts, *.tsx, *.js, *.css, *.html -File -EA SilentlyContinue |
  Where-Object { $_.FullName -notmatch "node_modules|\\dist\\|\\.git\\" } |
  ForEach-Object {
    try {
      $c = Get-Content $_.FullName -Raw -Encoding UTF8 -EA SilentlyContinue
      if ($c -and $c[0] -eq [char]0xFEFF) {
        [System.IO.File]::WriteAllText($_.FullName, $c.TrimStart([char]0xFEFF), $utf8)
        $count++
      }
    } catch {}
  }
Write-Ok "Cleaned $count files"

if (-not $SkipInstall) {
  Write-Step "Installing dependencies"
  if ($Force -or -not (Test-Path "node_modules")) {
    npm install
  } else {
    Write-Ok "node_modules already present"
  }
}

Write-Host "`n=== Setup Complete ===" -ForegroundColor Green
