$css.css#!/bin/bash

css=_M1C-stats-pd-plan-css-tables
report_md=_M1C-stats-pd-plan-final-v35
changeLog_md=_M1C-stats-pd-plan-change-log
assistGuide_md=_M1C-ai-assistant-guide


# to generate htmls:

 # report
#pandoc $report_md.md -c $css.css -o $report_md.html 
Rscript -e "rmarkdown::render('$report_md.md', output_format = rmarkdown::html_document(),
     output_file='$report_md.html', 
     params=list(css='$css.css'))" > $report_md.log

 # change log
DATE=$(date +%Y-%m-%d)
echo "<br/>" >> $changeLog_md.md
echo "Current Date is: $DATE" >> $changeLog_md.md
#pandoc -s $changeLog_md.md -c $css.css -o $changeLog_md.html 
Rscript -e "rmarkdown::render('$changeLog_md.md', output_format = rmarkdown::html_document(),
     output_file='$changeLog_md.html', 
     params=list(css='$css.css'))" > $changeLog_md.log


 # guide
#pandoc -s $assistGuide_md.md -c $css.css -o $assistGuide_md.html 
Rscript -e "rmarkdown::render('$assistGuide_md.md', output_format = rmarkdown::html_document(),
     output_file='$assistGuide_md.html',
     params=list(css='$css.css'))" > $assistGuide_md.log







