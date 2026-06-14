@echo off
cd /d "%~dp0.."
echo [%date% %time%] Starting BOCHK TradeSafe dev server from %cd% > dev-server.log
echo Using npm.cmd: D:\Program Files\nodejs\npm.cmd >> dev-server.log
"D:\Program Files\nodejs\npm.cmd" run dev -- --hostname 127.0.0.1 --port 3000 >> dev-server.log 2>&1
echo [%date% %time%] npm.cmd exited with %errorlevel% >> dev-server.log
