@echo off
echo ========================================
echo   CommunityHub - Complete Setup Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

echo Installing Backend Dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Frontend Dependencies...
cd client
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [OK] All dependencies installed successfully!
echo.

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo   npm run dev         - Start both frontend and backend
echo   npm run server      - Start backend only
echo   npm run client      - Start frontend only
echo.
echo The application will be available at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo.
echo ========================================
echo.

set /p start="Would you like to start the application now? (y/n) "
if /i "%start%"=="y" (
    echo.
    echo Starting CommunityHub...
    echo.
    npm run dev
)

pause
