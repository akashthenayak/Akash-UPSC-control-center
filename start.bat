@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo ========================================================
echo   Starting Sankalp 2027 -- UPSC CSE Prep OS
echo   Local URL: http://localhost:3000
echo ========================================================
call "C:\Program Files\nodejs\npm.cmd" run dev
pause
