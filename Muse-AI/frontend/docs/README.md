# Documentation Folder

This folder contains formatted documentation for the Muse AI project.

## Files

- **SDS_DOCUMENT.md** - Software Design Specification with professional formatting

## Formatting

All documents are formatted with:
- **Font:** Times New Roman, 12pt
- **Line Spacing:** 1.5
- **Text Alignment:** Justified
- **Tables:** Professionally structured with borders
- **Diagrams:** Properly formatted and organized

## Converting to Word/PDF

### Method 1: Using Pandoc (Recommended)

Install Pandoc from https://pandoc.org/installing.html, then run:

```bash
# Convert to Word (.docx)
pandoc SDS_DOCUMENT.md -o SDS_DOCUMENT.docx --reference-doc=custom-reference.docx

# Convert to PDF
pandoc SDS_DOCUMENT.md -o SDS_DOCUMENT.pdf --pdf-engine=xelatex
```

### Method 2: Using Visual Studio Code Extensions

1. Install "Markdown PDF" extension
2. Open the markdown file
3. Right-click and select "Markdown PDF: Export (pdf)"

### Method 3: Using Online Converters

- **Markdown to Word:** https://www.markdowntoword.com/
- **Markdown to PDF:** https://www.markdowntopdf.com/

### Method 4: Copy to Word Directly

1. Open the markdown file in a browser (with markdown preview)
2. Copy the rendered content
3. Paste into Microsoft Word
4. The CSS styling will be preserved

## Styling Notes

The CSS embedded in the markdown files will automatically apply when:
- Viewed in markdown preview extensions
- Converted using tools that support embedded styles
- Rendered to HTML first, then converted to Word/PDF

For Word conversion, you may need to:
1. Convert MD → HTML first
2. Then HTML → DOCX to preserve all formatting

## Manual Word Formatting

If automatic conversion doesn't preserve formatting:

1. **Font:** Select all text (Ctrl+A) → Set to Times New Roman, 12pt
2. **Line Spacing:** Format → Paragraph → Line spacing: 1.5
3. **Alignment:** Format → Paragraph → Alignment: Justified
4. **Tables:** Should auto-format, or use "Table Design" to apply borders
5. **Page Setup:** 
   - Margins: 1 inch all sides
   - Paper size: A4 or Letter

## Document Structure

The SDS document includes:
- Cover page with project details
- Comprehensive table of contents
- 12 main sections covering all design aspects
- Professional tables replacing text lists
- Structured diagrams and flowcharts
- Appendices with technical details

---

**Last Updated:** February 26, 2026
