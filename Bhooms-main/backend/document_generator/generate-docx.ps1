#!/usr/bin/env pwsh
<#
.SYNOPSIS
    HTML to DOCX Converter - PowerShell Script
.DESCRIPTION
    Converts SDS_Report.html to SDS_Report.docx using Python
.EXAMPLE
    .\generate-docx.ps1
#>

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HTML to DOCX Converter" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if required packages are installed
Write-Host "Checking for required packages..." -ForegroundColor Yellow
$packageCheck = python -c "import htmldocx" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing required packages..." -ForegroundColor Yellow
    python -m pip install python-docx htmldocx beautifulsoup4
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ ERROR: Failed to install required packages" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "✓ Packages installed successfully" -ForegroundColor Green
} else {
    Write-Host "✓ Required packages are installed" -ForegroundColor Green
}

# Run the conversion script
Write-Host ""
Write-Host "Running conversion..." -ForegroundColor Yellow
python convert_to_docx_python.py

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "✗ ERROR: Conversion failed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✓ SUCCESS: Conversion completed!" -ForegroundColor Green
Read-Host "Press Enter to exit"
