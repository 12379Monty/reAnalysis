# Instructions for Rendering Reports and Changelog

This document provides step-by-step instructions for rendering the resource guide, report templates, and changelog into professional HTML documents.

## Prerequisites

Ensure you have the following tools installed:

- **Pandoc**: For converting markdown to HTML
  - Download from [pandoc.org](https://pandoc.org/installing.html)
- **Git**: For version control (optional but recommended)
  - Download from [git-scm.com](https://git-scm.com/downloads)

## File Organization

Maintain the following file structure for optimal organization:

```
deep-learning-resources/
├── docs/
│   ├── deep-learning-resources.md     # Main resource guide
│   ├── markdown-template.md           # Report template
│   ├── report-instructions.md         # Rendering instructions
│   └── changelog.md                   # Version history
├── css/
│   └── report-styles.css              # CSS for HTML reports
├── output/
│   └── [generated HTML files]         # Generated reports
└── scripts/
    └── render.sh                      # Automation script
```

## Rendering Individual Files

### 1. Rendering the Resource Guide

```bash
pandoc docs/deep-learning-resources.md -o output/deep-learning-resources.html \
  --standalone \
  --toc --toc-depth=3 \
  --metadata title="Comprehensive Resources for Deep Learning in Statistics & Biotech" \
  --css css/report-styles.css
```

### 2. Rendering the Report Template

```bash
pandoc docs/markdown-template.md -o output/report-template.html \
  --standalone \
  --metadata title="Template for Omics Analysis Reports" \
  --css css/report-styles.css
```

### 3. Rendering the Changelog

```bash
pandoc docs/changelog.md -o output/changelog.html \
  --standalone \
  --metadata title="Changelog - Deep Learning Resources" \
  --css css/report-styles.css
```

## Automated Rendering (All Files)

Create a script file `scripts/render.sh` with the following content:

```bash
#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p output

# Set current date for document metadata
CURRENT_DATE=$(date +"%B %d, %Y")

# Define common Pandoc options
COMMON_OPTS="--standalone --css css/report-styles.css"

# Render main resource guide
echo "Rendering main resource guide..."
pandoc docs/deep-learning-resources.md -o output/deep-learning-resources.html \
  $COMMON_OPTS \
  --toc --toc-depth=3 \
  --metadata title="Comprehensive Resources for Deep Learning in Statistics & Biotech" \
  --metadata date="$CURRENT_DATE"

# Render report template
echo "Rendering report template..."
pandoc docs/markdown-template.md -o output/report-template.html \
  $COMMON_OPTS \
  --metadata title="Template for Omics Analysis Reports" \
  --metadata date="$CURRENT_DATE"

# Render instructions
echo "Rendering instructions..."
pandoc docs/report-instructions.md -o output/report-instructions.html \
  $COMMON_OPTS \
  --metadata title="Instructions for Generating HTML Reports" \
  --metadata date="$CURRENT_DATE"

# Render changelog
echo "Rendering changelog..."
pandoc docs/changelog.md -o output/changelog.html \
  $COMMON_OPTS \
  --metadata title="Changelog - Deep Learning Resources" \
  --metadata date="$CURRENT_DATE"

echo "Done! All documents have been rendered to the output directory."
```

Make the script executable and run it:

```bash
chmod +x scripts/render.sh
./scripts/render.sh
```

## Updating the Changelog

When making changes to any document:

1. Update the appropriate file(s)
2. Add an entry to the changelog in `docs/changelog.md`
   - Create a new version number (following [Semantic Versioning](https://semver.org/))
   - Add the current date
   - Document what was added, changed, or fixed
3. Re-render all documents using the instructions above

Example changelog entry:

```markdown
## Version 1.2.0 - May 19, 2025
### Added
- New section on transformer models for protein structure prediction
- Additional online courses from Stanford

### Changed
- Reorganized the software tools section for better clarity
- Updated several outdated links

### Fixed
- Corrected author name for "Deep Learning in Biomedicine" paper
```

## Version Control Best Practices

If using Git for version control:

1. Commit changes with clear, descriptive messages
   ```bash
   git add .
   git commit -m "Add new resources on transformer models for protein structure"
   ```

2. Tag releases that correspond to changelog versions
   ```bash
   git tag -a v1.2.0 -m "Version 1.2.0"
   ```

3. Push changes and tags to remote repository
   ```bash
   git push origin main
   git push origin --tags
   ```

## Publishing Options

Consider these options for sharing your rendered documents:

1. **GitHub Pages**: If using GitHub, enable GitHub Pages in your repository settings
2. **Departmental Website**: Upload to your organization's web server
3. **Cloud Storage**: Use services like Google Drive or Dropbox for simple sharing
4. **PDF Distribution**: Generate PDF versions for email distribution
   ```bash
   pandoc docs/deep-learning-resources.md -o output/deep-learning-resources.pdf \
     --pdf-engine=xelatex \
     --toc --toc-depth=3
   ```

## Troubleshooting

- **Styling not applied**: Ensure CSS paths are correct relative to the HTML file
- **Table of Contents issues**: Check heading levels in markdown files
- **Pandoc errors**: Verify your Pandoc installation with `pandoc --version`
- **Image rendering problems**: Make sure image paths are correct

For additional help, refer to the [Pandoc documentation](https://pandoc.org/MANUAL.html).
