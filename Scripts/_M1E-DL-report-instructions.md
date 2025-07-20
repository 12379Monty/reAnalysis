# Instructions for Generating HTML Reports from Markdown

This guide explains how to generate professional HTML reports from markdown files for presenting deep learning analyses of omics data.

## Overview of the Process

1. Write your report content in markdown format
2. Convert markdown to HTML using Pandoc
3. Apply custom CSS styling
4. Add interactive elements (optional)
5. Publish or share the report

## Detailed Instructions

### 1. Prerequisites

Install the following tools:

- **Pandoc**: Universal document converter
  - Download from [pandoc.org](https://pandoc.org/installing.html)
- **Python** (if you want to add interactive visualizations)
  - Python 3.7+ recommended
  - Packages: jupyter, nbconvert, plotly, matplotlib, seaborn

### 2. Preparing Your Markdown File

Start with the provided markdown template (`markdown-template.md`). Fill in your analysis details, including:

- Executive summary
- Methods and model architecture
- Results and visualizations
- Discussions and conclusions

#### Code for Embedding Visualizations

You can include code blocks for visualizations that will be rendered when converted:

````markdown
```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Your visualization code
plt.figure(figsize=(10, 6))
sns.heatmap(correlation_matrix, annot=True, cmap='viridis')
plt.title('Feature Correlation Matrix')
plt.savefig('correlation_heatmap.png')
```
````

### 3. Basic Conversion with Pandoc

Open a terminal/command prompt and run:

```bash
pandoc report.md -o report.html --standalone --metadata title="Deep Learning Omics Analysis"
```

This creates a basic HTML file from your markdown.

### 4. Applying Custom CSS

For a professional look, use the provided CSS file:

```bash
pandoc report.md -o report.html --standalone --metadata title="Deep Learning Omics Analysis" --css report-styles.css
```

Make sure `report-styles.css` is in the same directory or provide the full path.

### 5. Advanced HTML Report with Template

For even better results, create an HTML template with proper structure and navigation:

1. Create a file named `template.html` with this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title$</title>
    <link rel="stylesheet" href="$css$">
    $if(math)$
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML-full"></script>
    $endif$
</head>
<body>
    <header>
        <h1>$title$</h1>
        <p>$date$</p>
    </header>
    
    <nav>
        <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#methodology">Methodology</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#discussion">Discussion</a></li>
            <li><a href="#conclusions">Conclusions</a></li>
        </ul>
    </nav>
    
    <div class="container">
        $body$
    </div>
    
    <footer>
        <p>Generated on $date$</p>
        <p>Author: $author$</p>
    </footer>
</body>
</html>
```

2. Convert your markdown with the template:

```bash
pandoc report.md -o report.html --standalone --template template.html --metadata title="Deep Learning Omics Analysis" --metadata author="Your Name" --metadata date="$(date +"%B %d, %Y")" --css report-styles.css --mathjax
```

### 6. Adding Interactive Visualizations

For interactive visualizations, you have several options:

#### Option 1: Using Jupyter Notebooks and nbconvert

1. Create your analysis and visualizations in a Jupyter notebook
2. Add markdown cells for report text
3. Convert to HTML:

```bash
jupyter nbconvert --to html --template full analysis.ipynb --output report.html
```

#### Option 2: Using Plotly and HTML

1. Generate interactive plots with Plotly in Python
2. Save as standalone HTML:

```python
import plotly.express as px
import pandas as pd

# Create interactive plot
fig = px.scatter(df, x="feature1", y="feature2", color="class", 
                 hover_data=["sample_id"])

# Save as HTML
fig.write_html("plot.html")
```

3. Embed the HTML in your report or link to it

#### Option 3: Using R Markdown (if you work with R)

1. Create an R Markdown file (.Rmd)
2. Include your analysis and plots
3. Knit to HTML with:

```r
rmarkdown::render("analysis.Rmd", output_format = "html_document")
```

### 7. Enhancing Reports with JavaScript Libraries

To add more advanced visualizations, consider these libraries:

- **D3.js**: For custom data visualizations
- **BioJS**: For biological data visualization
- **Vega-Lite**: For declarative interactive visualizations

Include them in your template's head section:

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
```

### 8. Creating a Table of Contents

Add a table of contents with this pandoc option:

```bash
pandoc report.md -o report.html --standalone --template template.html --toc --toc-depth=3 --css report-styles.css
```

### 9. Generating PDFs (if needed)

You can also generate PDF reports:

```bash
pandoc report.md -o report.pdf --pdf-engine=wkhtmltopdf --css report-styles.css
```

Or with LaTeX for better math rendering:

```bash
pandoc report.md -o report.pdf --pdf-engine=xelatex
```

### 10. Sample Automation Script

Here's a bash script to automate the process:

```bash
#!/bin/bash

# Variables
REPORT_MD="report.md"
OUTPUT_HTML="report.html"
OUTPUT_PDF="report.pdf"
CSS_FILE="report-styles.css"
AUTHOR="Your Name"
TITLE="Deep Learning Analysis of Omics Data"

# Generate HTML report
echo "Generating HTML report..."
pandoc "$REPORT_MD" -o "$OUTPUT_HTML" \
  --standalone \
  --template template.html \
  --toc --toc-depth=3 \
  --metadata title="$TITLE" \
  --metadata author="$AUTHOR" \
  --metadata date="$(date +"%B %d, %Y")" \
  --css "$CSS_FILE" \
  --mathjax

# Generate PDF report
echo "Generating PDF report..."
pandoc "$REPORT_MD" -o "$OUTPUT_PDF" \
  --pdf-engine=xelatex \
  --toc --toc-depth=3 \
  --metadata title="$TITLE" \
  --metadata author="$AUTHOR" \
  --metadata date="$(date +"%B %d, %Y")" \
  --css "$CSS_FILE"

echo "Done! Reports generated: $OUTPUT_HTML and $OUTPUT_PDF"
```

## Tips for Creating Effective Reports

1. **Start with a clear structure**: Follow the template's organization
2. **Be concise**: Use bullet points and clear summaries for key findings
3. **Visualize data**: Include relevant plots and diagrams
4. **Explain methods**: Describe your deep learning approach clearly
5. **Provide context**: Relate your findings to the biological question
6. **Include limitations**: Acknowledge constraints of your analysis
7. **Add references**: Cite relevant literature
8. **Use consistent formatting**: Follow a consistent style throughout

## Troubleshooting

- **Missing dependencies**: Run `pandoc --version` to check installation
- **CSS not applied**: Ensure the path to CSS file is correct
- **Visualization issues**: Try different formats (PNG, SVG) for static images
- **TOC not working**: Check heading structure in markdown
- **Math rendering issues**: Ensure MathJax is included correctly

## Resources

- [Pandoc Documentation](https://pandoc.org/MANUAL.html)
- [Markdown Syntax Guide](https://www.markdownguide.org/basic-syntax/)
- [Plotly Python Documentation](https://plotly.com/python/)
- [Matplotlib Documentation](https://matplotlib.org/stable/contents.html)
- [Jupyter Notebook Documentation](https://jupyter-notebook.readthedocs.io/en/stable/)

By following these instructions, you can create professional-grade HTML reports to effectively communicate your deep learning analyses of omics data.
