Here are the pandoc and R commands you can use to render your presentation from the markdown file into different formats:

### Pandoc Commands

#### 1. Convert to PowerPoint (.pptx)
```bash
pandoc splash_oasis_methodology_presentation_v2.md -o splash_oasis_methodology_presentation_v2.pptx -t pptx
```

#### 2. Convert to HTML Slides (using Reveal.js)
```bash
pandoc splash_oasis_methodology_presentation_v2.md -o splash_oasis_methodology_presentation_v2.html -t revealjs -s -V theme=moon
```

#### 3. Convert to PDF Slides (using Beamer)
```bash
pandoc splash_oasis_methodology_presentation_v2.md -o splash_oasis_methodology_presentation_v2.pdf -t beamer
```

#### 4. Convert to Word Document (.docx)
```bash
pandoc splash_oasis_methodology_presentation_v2.md -o splash_oasis_methodology_presentation_v2.docx -t docx
```

### R Commands (using R Markdown)

If you prefer to use R and R Markdown for rendering:

#### 1. Create an R Markdown (.Rmd) file
First, save your content as an R Markdown file, adding YAML header:

```yaml
---
title: "SPLASH & OASIS Methodology"
subtitle: "Understanding Reference-Free Genomic Analysis"
author: "Your Name"
date: "May 26, 2025"
output:
  powerpoint_presentation:
    reference_doc: reference.pptx  # Optional: custom template
  beamer_presentation:
    theme: "Madrid"
    colortheme: "dolphin"
  revealjs::revealjs_presentation:
    theme: moon
    transition: slide
    self_contained: true
---
```

#### 2. Render using R script
```r
library(rmarkdown)
render("splash_oasis_methodology_presentation_v2.Rmd", "powerpoint_presentation")
render("splash_oasis_methodology_presentation_v2.Rmd", "beamer_presentation")
render("splash_oasis_methodology_presentation_v2.Rmd", "revealjs_presentation")
```

#### 3. Render using RStudio
If you're using RStudio, you can simply open the .Rmd file and click the "Knit" button, selecting your desired output format.

<!--################################## -->            
### Additional Notes

1. **Math Formulas**: The LaTeX mathematical notation in your presentation will be properly rendered by pandoc when converting to most formats.

2. **Custom Styling**: For more control over the appearance:
   ```bash
   pandoc splash_oasis_methodology_presentation_v2.md -o splash_oasis_presentation.pptx -t pptx --reference-doc=template.pptx
   ```
   Where `template.pptx` is a PowerPoint file with your preferred styles and layouts.

3. **Images**: If you're including the interactive visualization screenshots, ensure they're in the same directory or provide the correct path.

4. **Citations**: If you want to include citations properly:
   ```bash
   pandoc splash_oasis_methodology_presentation_v2.md --bibliography=references.bib -o splash_oasis_presentation.pptx -t pptx
   ```

For best results with the mathematical formulas, the PDF output via Beamer tends to render LaTeX expressions most accurately.


