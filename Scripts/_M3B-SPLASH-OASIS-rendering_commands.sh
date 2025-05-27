# ============================================================================
# RENDERING COMMANDS FOR SPLASH-OASIS PRESENTATION
# ============================================================================

# Method 1: Using Pandoc (Recommended)
# ----------------------------------------------------------------------------
# Install pandoc if you haven't already:
# conda install pandoc  # or brew install pandoc on Mac

# Basic HTML rendering with custom CSS:
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation.html \
  --css presentation_styles.css \
  --standalone \
  --toc \
  --toc-depth=2 \
  --number-sections \
  --highlight-style=tango

# PDF rendering (requires LaTeX):
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation.pdf \
  --pdf-engine=xelatex \
  --toc \
  --number-sections \
  --geometry="margin=1in" \
  --fontsize=11pt

# PowerPoint presentation:
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation.pptx \
  --slide-level=2

# Reveal.js slides (interactive web slides):
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation_slides.html \
  -t revealjs \
  --standalone \
  --slide-level=2 \
  --theme=white \
  --transition=slide \
  --highlight-style=tango

# ============================================================================
# Method 2: Using R Markdown (if you prefer R ecosystem)
# ============================================================================

# Create an R Markdown file header and add to the markdown:
cat > splash_oasis_presentation.Rmd << 'EOF'
---
title: "SPLASH and OASIS: Reference-Free Genomic Analysis"
subtitle: "A Critical Assessment of Statistical Methods"
author: "Your Name"
date: "`r Sys.Date()`"
output:
  html_document:
    theme: flatly
    highlight: tango
    toc: true
    toc_float: true
    number_sections: true
    css: _M3B-SPLASH-OASIS-presentation_css.css
# pdf_document:
#   toc: true
#   number_sections: true
  powerpoint_presentation:
    slide_level: 2
  revealjs::revealjs_presentation:
    theme: sky
    highlight: tango
    transition: slide
    slide_level: 2
---

EOF

# Then render with R:
# Rscript -e "rmarkdown::render('splash_oasis_presentation.Rmd', 'all')"

# ============================================================================
# Method 3: Using Jupyter with RISE for interactive slides
# ============================================================================

# Convert markdown to Jupyter notebook:
pandoc _M3B-SPLASH-OASIS-splash_oasis_presentation.md \
  -o _M3B-SPLASH-OASIS-splash_oasis_presentation.ipynb \
  --to=ipynb

# Then use RISE extension in Jupyter for live presentation

# ============================================================================
# Method 4: Using GitPitch or similar platforms
# ============================================================================

# For GitPitch, create PITCHME.md file with the content
# and push to GitHub, then access via gitpitch.com

# ============================================================================
# ADDITIONAL STYLING OPTIONS
# ============================================================================

# Advanced Pandoc HTML with custom template:
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation.html \
  --template=custom_template.html \
  --css=presentation_styles.css \
  --standalone \
  --toc \
  --toc-depth=2 \
  --number-sections \
  --highlight-style=tango \
  --metadata title="SPLASH and OASIS Analysis" \
  --metadata author="Your Name" \
  --metadata date="`date`"

# With MathJax for mathematical expressions:
pandoc splash_oasis_presentation.md \
  -o splash_oasis_presentation.html \
  --css=presentation_styles.css \
  --standalone \
  --mathjax \
  --toc \
  --number-sections

# ============================================================================
# QUICK START COMMANDS
# ============================================================================

# 1. Save the markdown content to a file:
echo "Save the markdown artifact as 'splash_oasis_presentation.md'"

# 2. Save the CSS content to a file:
echo "Save the CSS artifact as 'presentation_styles.css'"

# 3. Render HTML version (most versatile):
echo "pandoc splash_oasis_presentation.md -o presentation.html --css presentation_styles.css --standalone --toc --number-sections"

# 4. For slides, use reveal.js:
echo "pandoc splash_oasis_presentation.md -t revealjs -o slides.html --standalone --slide-level=2"

# ============================================================================
# FILE STRUCTURE
# ============================================================================

echo "
Expected file structure:
├── splash_oasis_presentation.md    # Main markdown content
├── presentation_styles.css         # CSS styling
├── images/                        # Any images (optional)
└── output/                        # Generated files
    ├── presentation.html
    ├── presentation.pdf
    ├── slides.html
    └── presentation.pptx
"

# ============================================================================
# TROUBLESHOOTING
# ============================================================================

echo "
Common issues and solutions:

1. 'pandoc: command not found'
   → Install pandoc: conda install pandoc or brew install pandoc

2. LaTeX errors for PDF generation
   → Install LaTeX: conda install texlive-core or install MikTeX/MacTeX

3. CSS not loading
   → Check file paths, use --css=./presentation_styles.css

4. Math expressions not rendering
   → Add --mathjax flag for HTML output

5. Slides not working properly
   → Ensure slide-level is set correctly (usually --slide-level=2)
"
