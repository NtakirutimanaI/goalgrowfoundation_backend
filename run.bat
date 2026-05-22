@echo off
set "PATH=C:\Program Files\nodejs;C:\Program Files\PostgreSQL\18\bin;%PATH%"
if "%~1"=="" (
    echo Goal Grow Foundation Backend Environment Runner
    echo Usage: run.bat ^<command^> [args...]
    echo Examples:
    echo   run.bat npm install
    echo   run.bat npm run start:dev
    exit /b 0
)
%*
