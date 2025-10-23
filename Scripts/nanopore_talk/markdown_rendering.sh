#!/bin/bash

css_file=ioslides_css.css

 #########################################
md_folder=.
md_file=pdf_image_extraction
md_file_path=$md_folder/$md_file

echo  ''
echo  ''
echo md_file_path = $md_file_path
Rscript -e   \
   "rmarkdown::render('$md_file_path.md',
    output_format = rmarkdown::html_document(),
    output_file='$md_file.html',
    output_yaml = '_site.yml',
    params=list(css='$css_file'))" > $md_file_path.log

 
