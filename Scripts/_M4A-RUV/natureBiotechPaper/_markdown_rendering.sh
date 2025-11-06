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

 #########################################
md_folder=.
md_file=Molania_2023_RUV-III_PRPS_Summary
rmd_file=Molania_2023_RUV-III_PRPS_Summary

md_file_path=$md_folder/$md_file
rmd_file_path=$md_folder/$rmd_file

echo  ''
echo  ''
echo rmd_file_path = $rmd_file_path
Rscript -e   \
   "rmarkdown::render('$rmd_file_path.Rmd',
    output_format = rmarkdown::html_document(),
    output_file='$rmd_file.html',
    output_yaml = '_site.yml',
    params=list(css='$css_file'))" > $md_file_path.log

	 

 #########################################
md_folder=.
md_file=AI_Enhanced_RUV_Proposal

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


 #########################################
md_folder=.
md_file=AI_Enhanced_RUV_Part1_current_state

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


 #########################################
md_folder=.
md_file=AI_Enhanced_RUV_Part2_Research_Proposal

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



