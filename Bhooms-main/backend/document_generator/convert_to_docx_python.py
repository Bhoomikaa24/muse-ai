#!/usr/bin/env python3
"""
HTML to DOCX Converter using Python
Converts SDS_Report.html to SDS_Report.docx with professional formatting

Requirements:
    pip install python-docx htmldocx beautifulsoup4

Usage:
    python convert_to_docx_python.py
"""

import os
import sys
from pathlib import Path

try:
    from htmldocx import HtmlToDocx
    from docx import Document
    from docx.shared import Inches, Pt
    from docx.enum.text import WD_ALIGN_PARAGRAPH
except ImportError:
    print("❌ Error: Required libraries are not installed")
    print("\n📦 Please install them using:")
    print("   pip install python-docx htmldocx beautifulsoup4")
    sys.exit(1)


def convert_html_to_docx():
    """Convert HTML file to DOCX with professional formatting"""
    
    script_dir = Path(__file__).parent
    html_path = script_dir / "SDS_Report.html"
    output_path = script_dir / "SDS_Report.docx"
    
    # Check if HTML file exists
    if not html_path.exists():
        print(f"❌ Error: HTML file not found at {html_path}")
        sys.exit(1)
    
    try:
        print("🚀 Starting HTML to DOCX conversion...")
        print(f"📄 Input: {html_path}")
        print(f"📥 Output: {output_path}")
        
        # Read HTML content
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Create a new Document
        document = Document()
        
        # Set document margins (1 inch = 914400 EMUs)
        sections = document.sections
        for section in sections:
            section.top_margin = Inches(1)
            section.bottom_margin = Inches(1)
            section.left_margin = Inches(1)
            section.right_margin = Inches(1)
        
        # Convert HTML to DOCX
        parser = HtmlToDocx()
        parser.add_html_to_document(html_content, document)
        
        # Save the document
        document.save(str(output_path))
        
        print("✅ Conversion successful!")
        print(f"📄 DOCX file created: {output_path}")
        print(f"📊 File size: {output_path.stat().st_size / 1024:.2f} KB")
        
        return True
        
    except Exception as e:
        print(f"❌ Error during conversion: {e}")
        print(f"\n🔍 Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return False


def main():
    """Main function"""
    print("=" * 60)
    print("HTML to DOCX Converter")
    print("=" * 60)
    print()
    
    success = convert_html_to_docx()
    
    print()
    print("=" * 60)
    
    if success:
        print("✨ All done! Your DOCX file is ready.")
        sys.exit(0)
    else:
        print("❌ Conversion failed. Please check the errors above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
