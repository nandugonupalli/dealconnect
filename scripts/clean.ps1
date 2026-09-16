Write-Host "`n=== Cleaning ===" -ForegroundColor Magenta
@("node_modules\.vite", ".vite", "dist", "tsconfig.tsbuildinfo") | ForEach-Object {
  if (Test-Path $_) {
    Remove-Item -Recurse -Force $_ -EA SilentlyContinue
    Write-Host "  OK  Cleared: $_" -ForegroundColor Green
  }
}
Write-Host "`n=== Done ===" -ForegroundColor Green
