# Set up the environment PATH with Node.js and PostgreSQL 18
$env:PATH = "C:\Program Files\nodejs;C:\Program Files\PostgreSQL\18\bin;" + $env:PATH

# Helper to run a command
if ($args.Count -eq 0) {
    Write-Host "Goal Grow Foundation Backend Environment Runner" -ForegroundColor Cyan
    Write-Host "Usage: ./run.ps1 <command> [args...]" -ForegroundColor Yellow
    Write-Host "Examples:"
    Write-Host "  ./run.ps1 npm install"
    Write-Host "  ./run.ps1 npm run start:dev" -ForegroundColor Green
    Exit 0
}

# Run the command with arguments
& $args[0] $args[1..($args.Length-1)]
