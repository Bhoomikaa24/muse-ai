@echo off
REM HTML to DOCX Converter - Windows Batch Script
REM Converts SDS_Report.html to SDS_Report.docx

echo ========================================
echo HTML to DOCX Converter
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

REM Check if required packages are installed
echo Checking for required packages...
python -c "import htmldocx" >nul 2>&1
if errorlevel 1 (
    echo Installing required packages...
    python -m pip install python-docx htmldocx beautifulsoup4
    if errorlevel 1 (
        echo ERROR: Failed to install required packages
        pause
        exit /b 1
    )
)

REM Run the conversion script
echo.
echo Running conversion...
python convert_to_docx_python.py

if errorlevel 1 (
    echo.
    echo ERROR: Conversion failed
    pause
    exit /b 1
)

echo.
echo SUCCESS: Conversion completed!
pause
