$ErrorActionPreference = "Continue"
Write-Host "`n=== Auto Fix ===`n" -ForegroundColor Magenta

# Clean BOM
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
Write-Host "  OK  Cleaned BOM from $count files" -ForegroundColor Green

# Clear caches
@("node_modules\.vite", ".vite", "dist", "tsconfig.tsbuildinfo") | ForEach-Object {
  if (Test-Path $_) {
    Remove-Item -Recurse -Force $_ -EA SilentlyContinue
    Write-Host "  OK  Cleared: $_" -ForegroundColor Green
  }
}

Write-Host "`n=== Fix Complete ===" -ForegroundColor Green
