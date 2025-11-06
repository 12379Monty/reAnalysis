# PDF Image Extraction Guide

There are several excellent tools for extracting images from PDFs:

## Command-line tools

### 1. pdfimages (part of poppler-utils - best option)

```bash
# Extract all images
pdfimages -all input.pdf output_prefix

# Extract as PNG
pdfimages -png input.pdf images/fig

# Extract as JPEG
pdfimages -j input.pdf images/fig
```

**Installation:**
- Ubuntu/Debian: `sudo apt install poppler-utils`
- macOS: `brew install poppler`
- Windows: Download from poppler website or use WSL

### 2. ImageMagick

```bash
# Convert each page to image
convert -density 300 input.pdf output_%03d.png

# Extract specific pages
convert -density 300 input.pdf[0-5] output_%03d.png
```

**Installation:**
- Ubuntu/Debian: `sudo apt install imagemagick`
- macOS: `brew install imagemagick`
- Windows: Download from imagemagick.org

### 3. pdftoppm (also from poppler)

```bash
# Convert pages to images
pdftoppm -png -r 300 input.pdf output

# Convert specific page range
pdftoppm -png -f 1 -l 10 -r 300 input.pdf output
```

## Python solution

Using PyMuPDF (fitz):

```python
import fitz  # PyMuPDF

pdf_file = "presentation.pdf"
doc = fitz.open(pdf_file)

# Create output directory
import os
os.makedirs("images", exist_ok=True)

for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images()
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Save image
        filename = f"images/page{page_num+1}_img{img_index+1}.{image_ext}"
        with open(filename, "wb") as f:
            f.write(image_bytes)
        print(f"Saved: {filename}")

doc.close()
```

**Installation:**
```bash
pip install PyMuPDF
```

### Alternative: Using pdf2image

```python
from pdf2image import convert_from_path

# Convert PDF pages to PIL Image objects
images = convert_from_path('presentation.pdf', dpi=300)

# Save images
for i, image in enumerate(images):
    image.save(f'images/page_{i+1}.png', 'PNG')
```

**Installation:**
```bash
pip install pdf2image
# Also requires poppler
```

## R solution

```r
library(pdftools)

# Convert PDF pages to images
pdf_convert("presentation.pdf", 
            format = "png", 
            dpi = 300,
            filenames = "images/slide_%d.png")

# Convert specific pages
pdf_convert("presentation.pdf",
            pages = 1:10,
            format = "png",
            dpi = 300,
            filenames = "images/slide_%d.png")
```

**Installation:**
```r
install.packages("pdftools")
```

### Extract images only (not render pages)

```r
library(pdftools)

# Get info about images in PDF
pdf_data("presentation.pdf")

# For actual image extraction, use system call to pdfimages
system("pdfimages -all presentation.pdf images/fig")
```

## GUI tools

### Adobe Acrobat
- File → Export To → Image → Select format (PNG, JPEG, etc.)
- Choose quality/resolution settings
- Export all pages or selected pages

### GIMP
- Open PDF in GIMP (imports as layers)
- Export individual pages as images
- Good for editing images before export

### Inkscape
- Good for vector graphics in PDFs
- Can import PDF pages and export as PNG/SVG
- Useful for presentations with vector graphics

### Preview (macOS)
- Open PDF in Preview
- File → Export → Select PNG format
- Can export current page or all pages

## Recommendations

### Best for extracting embedded images:
Use **pdfimages** from poppler-utils - it extracts the actual embedded images rather than rendering the pages.

```bash
pdfimages -all presentation.pdf images/figure
```

### Best for rendering pages as images:
Use **pdf2image** in Python or **pdftools** in R for high-quality page rendering.

### Best for batch processing:
Write a shell script with pdfimages:

```bash
#!/bin/bash
# extract_pdf_images.sh

PDF_FILE=$1
OUTPUT_DIR=${2:-images}

mkdir -p "$OUTPUT_DIR"
pdfimages -png "$PDF_FILE" "$OUTPUT_DIR/fig"

echo "Images extracted to $OUTPUT_DIR"
```

Usage:
```bash
chmod +x extract_pdf_images.sh
./extract_pdf_images.sh presentation.pdf images/
```

## Tips

1. **DPI/Resolution**: Use 300 DPI for high-quality images suitable for presentations
2. **Format**: PNG is best for diagrams/charts, JPEG for photographs
3. **Naming**: Use consistent naming schemes (e.g., `figure_01.png`, `figure_02.png`)
4. **Organization**: Create an `images/` directory to keep files organized
5. **Quality check**: Always verify extracted images look correct before using in presentation
