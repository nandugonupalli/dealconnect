param(
    [Parameter(Position=0)]
    [ValidateSet('setup', 'dev', 'fix', 'quality', 'deploy', 'health', 'clean', 'help')]
    [string]$Command = 'help'
)

function Show-Help {
    Write-Host @"

  DealConnect Automation
  ======================

  Usage: .\scripts\auto.ps1 [command]

  Commands:
    setup     - Initial project setup
    dev       - Start dev server (auto-clean)
    fix       - Auto-fix BOM and caches
    clean     - Clear all caches
    health    - Show project health
    quality   - Run lint/format checks
    deploy    - Build + commit + push + deploy
    help      - Show this help

"@ -ForegroundColor Cyan
}

switch ($Command) {
    'setup'   { & ".\scripts\setup.ps1" }
    'dev'     { & ".\scripts\dev.ps1" -Clean }
    'fix'     { & ".\scripts\fix.ps1" }
    'clean'   { & ".\scripts\clean.ps1" }
    'health'  { & ".\scripts\health-check.ps1" }
    'quality' { & ".\scripts\quality.ps1" }
    'deploy'  { & ".\scripts\deploy.ps1" }
    'help'    { Show-Help }
    default   { Show-Help }
}
