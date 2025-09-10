$css.css#!/bin/bash

css=CSS_FILE_NAME
GN4GD_implementationGuide_md=GN4GD_implementationGuide
changeLog_md=cHANGElOg
article_summary_md=article_summary

# to generate htmls:

 # GN4GD_analysisGuide
#pandoc $GN4GD_implementationGuide_md.md -c $css.css -o $GN4GD_implementationGuide_md.html 
Rscript -e "rmarkdown::render('$GN4GD_implementationGuide_md.md', output_format = rmarkdown::html_document(),
    output_file='$GN4GD_implementationGuide_md.html')"  > $GN4GD_implementationGuide_md.log
     
#    output_file='$GN4GD_implementationGuide_md.html', 
#    params=list(css='$css.css'))" > $GN4GD_implementationGuide_md.log

 # article_summary
Rscript -e "rmarkdown::render('$article_summary_md.md', output_format = rmarkdown::html_document(),
     output_file='$article_summary_md.html')"  > $article_summary_md.log

#    params=list(css='$css.css'))" > $article_summary.log



 # change log
#DATE=$(date +%Y-%m-%d)
#cho "<br/>" >> $changeLog_md.md
#echo "Current Date is: $DATE" >> $changeLog_md.md
##pandoc -s $changeLog_md.md -c $css.css -o $changeLog_md.html 
#Rscript -e "rmarkdown::render('$changeLog_md.md', output_format = rmarkdown::html_document(),
#     output_file='$changeLog_md.html', 
#     params=list(css='$css.css'))" > $changeLog_md.log
#





