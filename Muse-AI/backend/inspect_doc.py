from docx import Document

if __name__ == '__main__':
    doc = Document(r'c:\Users\Harsha\Documents\muse-ai\muse-ai\Muse_AI_College_Project_Report_Final_Structured.docx')
    for i, p in enumerate(doc.paragraphs[:100]):
        if p.text.strip():
            print(f"{i}: [{p.style.name}] {p.text.strip()[:60]}...")
