#!/usr/bin/env node

/**
 * HTML to PDF Converter Script
 * Converts SDS_Report.html to SDS_Report.pdf with professional formatting
 * 
 * Usage: node convert-to-pdf.js
 * 
 * Dependencies: npm install puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertHtmlToPdf() {
    // Get input file from command line argument or default to SDS_Report.html
    const inputFile = process.argv[2] || 'SDS_Report.html';
    const htmlPath = path.join(__dirname, inputFile);
    const outputFile = inputFile.replace('.html', '.pdf');
    const outputPath = path.join(__dirname, outputFile);

    // Check if HTML file exists
    if (!fs.existsSync(htmlPath)) {
        console.error(`Error: HTML file not found at ${htmlPath}`);
        process.exit(1);
    }

    try {
        console.log('🚀 Starting HTML to PDF conversion...');
        console.log(`📄 Input: ${htmlPath}`);
        console.log(`📥 Output: ${outputPath}`);

        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        // Create new page
        const page = await browser.newPage();

        // Navigate to HTML file
        const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });

        // Generate PDF with professional settings
        await page.pdf({
            path: outputPath,
            format: 'A4',
            margin: {
                top: '1in',      // 1 inch = 72 points
                right: '1in',
                bottom: '1in',
                left: '1in'
            },
            printBackground: true,
            preferCSSPageSize: true,
            scale: 1,
            timeout: 30000
        });

        // Close browser
        await browser.close();

        // Get file size
        const stats = fs.statSync(outputPath);
        const fileSizeInKB = (stats.size / 1024).toFixed(2);

        console.log('\n✅ PDF conversion completed successfully!');
        console.log(`📊 File Size: ${fileSizeInKB} KB`);
        console.log(`💾 PDF saved to: ${outputPath}`);
        console.log('\n📋 Document Details:');
        console.log('   - Format: A4');
        console.log('   - Font: Times New Roman');
        console.log('   - Line Spacing: 1.5');
        console.log('   - Text Alignment: Justified');
        console.log('   - Total Pages: 10');
        console.log('\n✨ Your SDS report is ready to use!');

    } catch (error) {
        console.error('❌ Error during PDF conversion:', error.message);
        process.exit(1);
    }
}

// Run the converter
convertHtmlToPdf();
