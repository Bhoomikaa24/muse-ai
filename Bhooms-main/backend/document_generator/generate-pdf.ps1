# ============================================================================
# SDS Report PDF Generator - PowerShell Script
# ============================================================================
# This script automatically converts SDS_Report.html to SDS_Report.pdf
# Usage: powershell -ExecutionPolicy Bypass -File generate-pdf.ps1
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           SDS Report PDF Generator - Muse AI Project                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Get current directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Check if HTML file exists
if (-not (Test-Path "SDS_Report.html")) {
    Write-Host "[ERROR] SDS_Report.html not found in current directory" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] SDS_Report.html found" -ForegroundColor Green

# Method 1: Try Python WeasyPrint
Write-Host ""
Write-Host "[INFO] Checking for Python installation..." -ForegroundColor Yellow

$pythonCheck = & python --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Python is installed: $pythonCheck" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "[INFO] Installing WeasyPrint package..." -ForegroundColor Yellow
    & pip install --quiet weasyprint 2>$null
    
    Write-Host "[INFO] Starting PDF conversion with WeasyPrint..." -ForegroundColor Yellow
    & python convert_to_pdf_python.py
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ PDF conversion successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║                    PDF GENERATION COMPLETED!                          ║" -ForegroundColor Green
        Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
        Write-Host "Opening PDF file..." -ForegroundColor Cyan
        Start-Process "SDS_Report.pdf"
        exit 0
    }
}

# Method 2: Try Node.js Puppeteer
Write-Host ""
Write-Host "[INFO] Checking for Node.js installation..." -ForegroundColor Yellow

$nodeCheck = & node --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Node.js is installed: $nodeCheck" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "[INFO] Installing Puppeteer package..." -ForegroundColor Yellow
    & npm install --silent puppeteer 2>$null
    
    Write-Host "[INFO] Starting PDF conversion with Puppeteer..." -ForegroundColor Yellow
    & node convert-to-pdf.js
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ PDF conversion successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║                    PDF GENERATION COMPLETED!                          ║" -ForegroundColor Green
        Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
        Write-Host ""
        Write-Host "Opening PDF file..." -ForegroundColor Cyan
        Start-Process "SDS_Report.pdf"
        exit 0
    }
}

# Fallback: Browser Print-to-PDF instructions
Write-Host ""
Write-Host "[INFO] Neither Python nor Node.js found or conversion failed" -ForegroundColor Yellow
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Yellow
Write-Host "║           Browser Print-to-PDF Method (Manual)                        ║" -ForegroundColor Yellow
Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Yellow
Write-Host ""
Write-Host "Follow these steps to generate PDF:" -ForegroundColor Cyan
Write-Host "  1. Opening HTML file in default browser..." -ForegroundColor White

$htmlPath = Join-Path $scriptDir "SDS_Report.html"
Start-Process $htmlPath

Write-Host ""
Write-Host "  2. Wait for browser to open" -ForegroundColor White
Write-Host "  3. Press Ctrl+P to open Print dialog" -ForegroundColor White
Write-Host "  4. Instead of printer, select 'Save as PDF'" -ForegroundColor White
Write-Host "  5. Configure:" -ForegroundColor White
Write-Host "     - Page size: A4" -ForegroundColor White
Write-Host "     - Margins: 1 inch" -ForegroundColor White
Write-Host "     - Enable 'Background graphics'" -ForegroundColor White
Write-Host "  6. Save as: SDS_Report.pdf" -ForegroundColor White
Write-Host ""
Write-Host "For future automated conversions, install:" -ForegroundColor Yellow
Write-Host "  - Python: pip install weasyprint" -ForegroundColor White
Write-Host "  - Node.js: npm install puppeteer" -ForegroundColor White
Write-Host ""
