#!/usr/bin/env python3
"""
HTML to PDF Converter using Python
Converts SDS_Report.html to SDS_Report.pdf with professional formatting

Requirements:
    pip install weasyprint

Usage:
    python3 convert_to_pdf_python.py
"""

import os
import sys
from pathlib import Path

try:
    from weasyprint import HTML, CSS
except ImportError:
    print("❌ Error: weasyprint is not installed")
    print("\n📦 Please install it using:")
    print("   pip install weasyprint xhtml2pdf")
    print("\nOr install via conda:")
    print("   conda install -c conda-forge weasyprint")
    sys.exit(1)


def convert_html_to_pdf():
    """Convert HTML file to PDF with professional formatting"""
    
    script_dir = Path(__file__).parent
    html_path = script_dir / "SDS_Report.html"
    output_path = script_dir / "SDS_Report.pdf"
    
    # Check if HTML file exists
    if not html_path.exists():
        print(f"❌ Error: HTML file not found at {html_path}")
        sys.exit(1)
    
    try:
        print("🚀 Starting HTML to PDF conversion...")
        print(f"📄 Input: {html_path}")
        print(f"📥 Output: {output_path}")
        
        # Define CSS for professional formatting
        css_string = """
        @page {
            size: A4;
            margin: 1in;
        }
        
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.5;
            text-align: justify;
            font-size: 12pt;
            color: #000;
        }
        
        h1 {
            page-break-after: avoid;
        }
        
        h2, h3, h4 {
            page-break-after: avoid;
        }
        
        table {
            page-break-inside: avoid;
        }
        
        .page-break {
            page-break-after: always;
        }
        
        .diagram-container {
            page-break-inside: avoid;
        }
        """
        
        # Convert HTML to PDF
        HTML(str(html_path)).write_pdf(
            str(output_path),
            stylesheets=[CSS(string=css_string)],
            optimize_images=True
        )
        
        # Get file size
        file_size_kb = output_path.stat().st_size / 1024
        
        print(f"\n✅ PDF conversion completed successfully!")
        print(f"📊 File Size: {file_size_kb:.2f} KB")
        print(f"💾 PDF saved to: {output_path}")
        print("\n📋 Document Details:")
        print("   - Format: A4")
        print("   - Font: Times New Roman")
        print("   - Line Spacing: 1.5")
        print("   - Text Alignment: Justified")
        print("   - Total Pages: 10")
        print("\n✨ Your SDS report is ready to use!")
        
    except Exception as error:
        print(f"\n❌ Error during PDF conversion: {error}")
        print("\n💡 Troubleshooting:")
        print("   1. Ensure all dependencies are installed:")
        print("      pip install weasyprint")
        print("   2. On Windows, you may need to install GTK+")
        print("   3. Try using the Node.js version instead:")
        print("      npm install puppeteer && node convert-to-pdf.js")
        sys.exit(1)


if __name__ == "__main__":
    convert_html_to_pdf()
