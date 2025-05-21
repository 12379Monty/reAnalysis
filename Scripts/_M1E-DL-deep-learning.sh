#!/bin/bash

css=_M1E-DL-report-styles.css

repositorySetup_md=_M1E-DL-repository-setup
changeLog_md=_M1E-DL-changelog
renderInstructions_md=_M1E-DL-rendering-instructions
deepLearningResource_md=_M1E-DL-deep-learning-resources
reportInstructions_md=_M1E-DL-report-instructions
markdownTemplate_md=_M1E-DL-markdown-template

#pandoc $report_md.md -c $css.css -o $report_md.html 

# repositorySetup_md : Git Repository Setup
echo  ''
echo  ''
echo repositorySetup_md = $repositorySetup_md
Rscript -e   \
   "rmarkdown::render('$repositorySetup_md.md', 
    output_format = rmarkdown::html_document(),
    output_file='$repositorySetup_md.html',
    params=list(css='$css.css'))" > $repositorySetup_md.log

# changeLog_md : Change Log
echo  ''
echo  ''
echo changeLog_md = $changeLog_md
Rscript -e   \
   "rmarkdown::render('$changeLog_md.md', 
    output_format = rmarkdown::html_document(),
    output_file='$changeLog_md.html', 
    params=list(css='$css.css'))" > $changeLog_md.log

# renderInstructions_md : Instructions for Rendering Reports and Changelog
echo  ''
echo  ''
echo renderInstructions_md = $renderInstructions_md
Rscript -e   \
   "rmarkdown::render('$renderInstructions_md.md', 
    output_format = rmarkdown::html_document(),
    output_file='$renderInstructions_md.html', 
    params=list(css='$css.css'))" > $renderInstructions_md.log



# deepLearningResource_md : Comprehensive Resources for Deep Learning in Statistics & Biotech
echo  ''
echo  ''
echo deepLearningResource_md = $deepLearningResource_md
Rscript -e   \
   "rmarkdown::render('$deepLearningResource_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$deepLearningResource_md.html',
    params=list(css='$css.css'))" > $_md.log


# _M1E-DL-report-instructions_md: Instructions for Generating HTML Reports from Markdown
echo  ''
echo  ''
echo reportInstructions_md = $reportInstructions_md
Rscript -e   \
   "rmarkdown::render('$reportInstructions_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$reportInstructions_md.html',
    params=list(css='$css.css'))" > $_md.log



# _M1E-DL-markdown-template.md:
echo  ''
echo  ''
echo markdownTemplate_md = $markdownTemplate_md
Rscript -e   \
   "rmarkdown::render('$markdownTemplate_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$markdownTemplate_md.html',
    params=list(css='$css.css'))" > $_md.log


