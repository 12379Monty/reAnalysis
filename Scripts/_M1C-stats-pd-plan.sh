#!/bin/bash

css=_M1C-stats-pd-plan-css-tables
report_md=_M1C-stats-pd-plan-final-v35
changeLog_md=_M1C-stats-pd-plan-change-log


# to generate htmls:

 # report
pandoc -s $report_md.md -c $css.css -o $report_md.html 

 # change log
DATE=$(date +%Y-%m-%d)
echo "<br/>" >> $changeLog_md.md
echo "Current Date is: $DATE" >> $changeLog_md.md
pandoc -s $changeLog_md.md -c $css.css -o $changeLog_md.html 







