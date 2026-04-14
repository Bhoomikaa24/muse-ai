@echo off
REM ============================================================================
REM SDS Report PDF Generator - Windows Batch Script
REM ============================================================================
REM This script automatically converts SDS_Report.html to SDS_Report.pdf
REM using the Python WeasyPrint library (simplest method)
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║           SDS Report PDF Generator - Muse AI Project                  ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not found in PATH
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo [OK] Python is installed
python --version

echo.
echo [INFO] Installing/checking WeasyPrint package...
pip install --quiet weasyprint 2>nul

if errorlevel 1 (
    echo [WARNING] WeasyPrint installation may have failed
    echo Trying alternative installation method...
    pip install --upgrade weasyprint xhtml2pdf
)

echo.
echo [INFO] Starting PDF conversion...
echo Source: SDS_Report.html
echo Output: SDS_Report.pdf
echo.

python convert_to_pdf_python.py

if errorlevel 1 (
    echo.
    echo [ERROR] PDF conversion failed!
    echo.
    echo Trying alternative method using Node.js/Puppeteer...
    echo.
    
    REM Try Node.js method
    node --version >nul 2>&1
    if errorlevel 1 (
        echo [ERROR] Node.js is also not installed
        echo.
        echo Please try one of the following:
        echo.
        echo 1. Install Python dependencies:
        echo    pip install weasyprint
        echo.
        echo 2. Install Node.js dependencies:
        echo    npm install puppeteer
        echo    node convert-to-pdf.js
        echo.
        echo 3. Use browser Print-to-PDF:
        echo    - Open SDS_Report.html in your browser
        echo    - Press Ctrl+P
        echo    - Select "Save as PDF"
        echo.
        pause
        exit /b 1
    )
    
    echo [INFO] Node.js found, installing Puppeteer...
    npm install --silent puppeteer 2>nul
    
    echo [INFO] Running Puppeteer converter...
    node convert-to-pdf.js
    
    if errorlevel 1 (
        echo [ERROR] Both methods failed. Please use browser print-to-PDF
        pause
        exit /b 1
    )
)

echo.
echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                    PDF GENERATION COMPLETED!                          ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.
echo [SUCCESS] SDS_Report.pdf has been generated successfully
echo.
echo Next steps:
echo   1. Open the PDF file to verify formatting
echo   2. Check page count (should be 10 pages)
echo   3. Verify colorful diagrams are visible
echo   4. Test printing to ensure quality
echo.

REM Automatically open the PDF if it exists
if exist SDS_Report.pdf (
    echo [INFO] Opening generated PDF...
    start SDS_Report.pdf
) else (
    echo [WARNING] PDF file not found in current directory
    echo Please check error messages above
)

echo.
pause
