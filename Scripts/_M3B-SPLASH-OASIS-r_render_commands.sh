# ===========================================================================
# RENDERING COMMANDS FOR SPLASH-OASIS PRESENTATION
# ============================================================================

# Method 1: Using Pandoc (Recommended)
# See _M3B-SPLASH-OASIS-rendering_commands.sh
#

# ============================================================================
# Method 2: Using R Markdown (if you prefer R ecosystem 
# Works best for static web sites
# ============================================================================

css=_M3B-SPLASH-OASIS-presentation_css

changeLog_md=_M3B-SPLASH-OASIS-changelog
# changeLog_md : Change Log
echo  ''
echo  ''
echo changeLog_md = $changeLog_md
Rscript -e   \
   "rmarkdown::render('$changeLog_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$changeLog_md.html',
    params=list(css='$css.css'))" > $changeLog_md.log


markdownSource_md=_M3B-SPLASH-OASIS-markdown_source
# markdownSource_md :  SPLASH and OASIS: Reference-Free Genomic Analysis
echo  ''
echo  ''
echo markdownSource_md = $markdownSource_md
Rscript -e   \
   "rmarkdown::render('$markdownSource_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$markdownSource_md.html',
    params=list(css='$css.css'))" > $markdownSource_md.log


analysisFramework_r=_M3B-SPLASH-OASIS-r_analysis_framework

#ex -sc "analysisFramework_f = function() { \n" -cx $analysisFramework_r
#exho "\n}" >> $analysisFramework_r
#echo  ''
#echo analysisFramework_r = $analysisFramework_r
#Rscript -e   \
   #"rmarkdown::render('$analysisFramework_r.r',
    #output_format = rmarkdown::html_document(),
    #output_file='$analysisFramework_r.html',
    #params=list(css='$css.css'))" > $analysisFramework_r.log
#


splash_oasis_presentation_md=_M3B-SPLASH-OASIS-splash_oasis_presentation
# splash_oasis_presentation_md :  SPLASH and OASIS: Reference-Free Genomic Analysis
echo  ''
echo  ''
echo splash_oasis_presentation_md = $splash_oasis_presentation_md
Rscript -e   \
   "rmarkdown::render('$splash_oasis_presentation_md.md',
    output_format = rmarkdown::html_document(),
    output_file='$splash_oasis_presentation_md.html',
    params=list(css='$css.css'))" > $splash_oasis_presentation_md.log
