#!/bin/bash

css=_M1D-genAI.css

changeLog_md=_M1D-genAI-changelog


# changeLog_md : Change Log
echo  ''
echo  ''
echo changeLog_md = $changeLog_md
Rscript -e   \
   "rmarkdown::render('$changeLog_md.md', 
    output_format = rmarkdown::html_document(),
    output_file='$changeLog_md.html', 
    params=list(css='$css.css'))" > $changeLog_md.log


reportUpdated_md=_M1D-genAI-report-updated 
echo  ''
echo  ''
echo reportUpdated_md = $reportUpdated_md
Rscript -e   \
   "rmarkdown::render('$reportUpdated_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$reportUpdated_md.html',
    params=list(css='$css.css'))" > $reportUpdated_md.log

 


instructions_md=_M1D-genAI-instructions
echo  ''
echo  ''
echo instructions_md = $instructions_md
Rscript -e   \
   "rmarkdown::render('$instructions_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$instructions_md.html',
    params=list(css='$css.css'))" > $instructions_md.log

