# Oxford Nanopore Technology: Background for Microbiome Analysis

## Overview of the Nanopore Sequencing Platform

### What Does the Platform Do?

Oxford Nanopore Technologies (ONT) provides a unique sequencing platform based on nanopore sensing technology. At its core, the platform works by:

**Basic Mechanism:**
- DNA or RNA molecules pass through biological nanopores (protein pores embedded in a membrane)
- As nucleotides pass through the pore, they disrupt an ionic current flowing through it
- Each nucleotide creates a characteristic current disruption pattern
- These electrical signals are measured in real-time and decoded to determine the DNA/RNA sequence

**Key Distinguishing Features:**
- **Long reads**: Can sequence fragments from hundreds of bases to megabases in length (typical amplicon reads: 1-5kb; ultra-long reads: >100kb)
- **Real-time sequencing**: Data is generated and available immediately during the sequencing run
- **Direct sequencing**: Can sequence native DNA/RNA without amplification (though PCR amplification is used for amplicon sequencing)
- **Portability**: Devices range from pocket-sized MinION to high-throughput PromethION
- **Accessible**: Relatively low capital cost and simple library preparation

**Current Technology Generation:**
- **R10.4.1 pores**: Latest flow cell chemistry providing improved accuracy
- **Basecalling**: Conversion of electrical signals to DNA sequence using neural network algorithms
- **Accuracy**: Raw read accuracy ~95-99%, with consensus methods achieving >99.9%

---

## Applications of Nanopore Sequencing

### Genomic Applications

**1. Whole Genome Sequencing**
- De novo genome assembly of bacteria, plants, animals
- Structural variant detection
- Haplotype phasing
- Resolution of repetitive regions

**2. Transcriptomics**
- Direct RNA sequencing (no reverse transcription needed)
- Full-length transcript isoform detection
- RNA modification detection (m6A, pseudouridine)

**3. Epigenetics**
- Direct detection of DNA methylation (5mC, 6mA)
- No bisulfite conversion required
- Single-molecule resolution

**4. Metagenomics and Microbiome Analysis**
- Taxonomic profiling of complex microbial communities
- **16S/ITS/23S amplicon sequencing** (our application)
- Whole metagenome shotgun sequencing
- Strain-level resolution
- Real-time pathogen identification

**5. Targeted Sequencing**
- Amplicon panels for specific genes or regions
- Adaptive sampling (enrichment/depletion during sequencing)

**6. Clinical and Diagnostic Applications**
- Rapid pathogen identification
- Antimicrobial resistance gene detection
- Cancer genomics
- Rare disease diagnosis

---

## Microbiome Amplicon Sequencing: Recommended Pipeline

### Overview for 16S/ITS/23S rRNA Amplicon Applications

For bacterial microbiome profiling using ribosomal RNA gene amplicons (16S, 23S, or full 16S-ITS-23S operons), Oxford Nanopore recommends the following workflow:

### 1. Library Preparation

**PCR Amplification:**
- Use primers targeting conserved regions flanking the gene(s) of interest
- Recommended: 16S primers (27F/1492R for full-length) or operon-spanning primers
- PCR product size: typically 1.5-5kb for full operons
- Barcode addition for multiplexing samples

**Library Prep Kit:**
- PCR Barcoding Kit (SQK-PBK004 or SQK-16S024)
- Rapid Barcoding Kit (SQK-RBK004/114)
- Native barcoding for highest accuracy

### 2. Sequencing

**Flow Cell:**
- MinION/GridION: R10.4.1 flow cells
- Run time: 24-72 hours (though data available in real-time)
- Recommended depth: 10,000-50,000 reads per sample for microbiome profiling

### 3. Basecalling

**MinKNOW Software:**
- Real-time basecalling during sequencing run
- Options:
  - Fast basecalling (lower accuracy, ~95%)
  - High-accuracy basecalling (HAC, ~98-99%)
  - Super-accuracy basecalling (SUP, ~99%+, slower)

**Guppy Basecaller** (or Dorado, the newer replacement):
- Recommended: High-accuracy or super-accuracy models
- Output: FASTQ files with quality scores

---

## Quality Control in the Standard Pipeline

### Built-in QC During Sequencing (MinKNOW)

**Real-time Metrics:**
- **Pore occupancy**: Number of active sequencing pores
- **Read length distribution**: N50, mean, median read lengths
- **Throughput**: Bases per hour, cumulative yield
- **Read quality**: Mean Q-score distribution
- **Sequencing speed**: Bases per second

**Flow Cell Health:**
- Mux scan results showing active pore count
- Pore availability over time
- Temperature stability

### Post-Sequencing QC

**1. Raw Read Quality Assessment**

**Tools:**
- **NanoPlot/NanoStat**: Comprehensive read quality statistics
  - Read length distribution
  - Read quality score distribution
  - Yield over time
  - Quality vs. read length plots
  
- **PycoQC**: Quality control metrics visualization
  - Interactive HTML reports
  - Barcode demultiplexing statistics
  - Channel performance analysis

**Key Metrics:**
- **Mean read quality (Q-score)**: Should be >10, ideally >12-15
- **Read length**: Check against expected amplicon size
- **Yield**: Total bases sequenced
- **Pass vs. fail reads**: Reads passing quality threshold

**2. Filtering Criteria**

**Length Filtering:**
- Minimum length: Typically 1000-1200bp for 16S
- Maximum length: 2000-2500bp for 16S (to remove chimeras/concatenated reads)
- For full operons: 3500-5000bp

**Quality Filtering:**
- Minimum mean Q-score: Often set at Q7-Q10
- Maximum expected error rate: 1-2%
- Remove reads with homopolymer errors >10bp

**3. Amplicon-Specific QC**

**Primer Trimming:**
- Remove primer sequences from read ends
- Tools: Porechop, Cutadapt, or custom scripts
- Verify successful removal

**Orientation:**
- Check read orientation (forward/reverse)
- Orient all reads in same direction

**Chimera Detection:**
- Identify and remove chimeric sequences
- Tools: VSEARCH, UCHIME

### 4. ONT-Recommended Analysis Tools

**EPI2ME Platform:**
- Cloud-based or local workflows
- **16S workflow**: 
  - Automatic quality filtering
  - Taxonomic classification using NCBI database
  - Diversity analysis
  - QC reporting with plots

**Workflow Features:**
- Demultiplexing of barcoded samples
- Quality filtering (Q>7 default, adjustable)
- Length filtering
- Taxonomic assignment using Minimap2 + BLAST
- Output: KRONA plots, abundance tables, QC reports

### 5. Community Standard Tools for Amplicon Analysis

**Denoising (Error Correction):**
- **DADA2**: Amplicon sequence variant (ASV) inference
- **Medaka**: ONT-specific error correction using neural networks
- **RACON**: Consensus polishing

**Quality Metrics for Denoised Reads:**
- Number of unique ASVs
- Read depth per ASV
- Estimated error rate per ASV
- Clustering statistics

**Taxonomic Assignment:**
- **Minimap2**: Fast alignment to reference databases
- **BLAST/BLASTN**: High-sensitivity alignment
- **Kraken2/Centrifuge**: k-mer based classification
- **EPI2ME WIMP**: What's In My Pot workflow

**Reference Databases:**
- NCBI 16S rRNA database
- SILVA ribosomal RNA database
- RDP (Ribosomal Database Project)
- GTDB (Genome Taxonomy Database)
- Custom databases for specific applications

---

## Alternative Analysis Pipelines Supported by R Packages

Several R-based analysis pipelines have been developed specifically for nanopore amplicon sequencing and have demonstrated excellent performance in peer-reviewed studies:

### 1. NanoCLUST

**Description:**
- Complete R-based pipeline for nanopore 16S/ITS amplicon clustering and classification
- Published by Rodriguez-Perez et al. (2021) in Bioinformatics
- Designed specifically for long nanopore reads

**R Package:**
- Available through Bioconductor
- Package name: `NanoCLUST`
- Installation: `BiocManager::install("NanoCLUST")`

**Key Features:**
- Quality filtering adapted for nanopore error profiles
- UMAP-based clustering for ASV detection
- Consensus sequence generation
- Taxonomic classification using BLAST
- Handles variable-length reads well
- Built-in QC reporting

**Performance:**
- Demonstrated high accuracy with nanopore R9.4.1 and R10 data
- Superior to standard Illumina-based methods for long reads
- Effective at genus and species-level classification

**Workflow:**
1. Quality filtering (length and quality score)
2. Clustering using UMAP dimensionality reduction
3. Consensus sequence generation per cluster
4. Taxonomic assignment via BLAST
5. Output: OTU table, taxonomic assignments, QC plots

### 2. DADA2 (with Nanopore Adaptations)

**Description:**
- Originally developed for Illumina, but adapted for nanopore long reads
- Callahan et al. (2016) Nature Methods; nanopore implementation by Calus et al. (2018)
- Gold standard for ASV inference

**R Package:**
- CRAN package: `dada2`
- Installation: `install.packages("dada2")`
- Bioconductor: `BiocManager::install("dada2")`

**Nanopore-Specific Modifications:**
- Modified error model for nanopore systematic errors
- Adjusted quality filtering thresholds
- Custom pooling strategies for lower coverage
- Loess-based error rate estimation

**Key Features:**
- Infers true biological sequences (ASVs) from noisy reads
- Error correction without clustering
- Removes chimeras
- Assigns taxonomy using reference databases
- Reproducible results (no arbitrary similarity thresholds)

**Workflow for Nanopore:**
1. Quality filtering: `filterAndTrim()` with nanopore-appropriate parameters
2. Learn error rates: `learnErrors()` with modified settings
3. Denoise: `dada()` algorithm to infer ASVs
4. Merge paired ends (if applicable)
5. Remove chimeras: `removeBimeraDenovo()`
6. Assign taxonomy: `assignTaxonomy()` against SILVA/RDP/GTDB

**Performance:**
- Achieves <1% error rate after denoising
- Works well with R10.4.1 chemistry (Q>15 reads)
- Requires quality pre-filtering for best results

### 3. QIIME2 (R Interface via qiime2R)

**Description:**
- QIIME2 is Python-based but fully accessible through R via qiime2R package
- Extensive validation for microbiome analysis
- Bolyen et al. (2019) Nature Biotechnology

**R Package:**
- `qiime2R` for importing QIIME2 artifacts into R
- Installation: `devtools::install_github("jbisanz/qiime2R")`
- Integrates with phyloseq, ggplot2, tidyverse

**Key Features:**
- Complete pipeline from raw reads to publication figures
- Multiple denoising options (Deblur, DADA2)
- Extensive taxonomic databases
- Diversity analysis (alpha/beta diversity)
- Differential abundance testing
- Visualization tools

**Nanopore Support:**
- Import FASTQ files from nanopore sequencing
- Quality filtering adapted for long reads
- VSEARCH-based clustering
- Integration with minimap2 for taxonomic assignment

**Workflow:**
1. Import data into QIIME2
2. Quality control and filtering
3. Denoising (DADA2 or Deblur)
4. Taxonomic classification
5. Export to R using qiime2R
6. Statistical analysis and visualization in R

### 4. LongQC + Custom R Analysis

**Description:**
- LongQC provides comprehensive QC for long reads
- Fukasawa et al. (2020) G3: Genes, Genomes, Genetics
- Pairs well with custom R analysis scripts

**R Integration:**
- Output can be parsed and analyzed in R
- Works with tidyverse, ggplot2, phyloseq
- Custom R scripts for downstream analysis

**Key Features:**
- Detailed QC metrics for nanopore reads
- Identifies systematic errors
- Quality score distribution analysis
- Read length and GC content assessment
- Output: HTML reports, TSV files for R import

**Custom R Analysis Components:**
- Read quality filtering using `ShortRead` or `Biostrings`
- Clustering with `DECIPHER` package
- Taxonomic assignment using BLAST via `rBLAST`
- Community analysis with `vegan` and `phyloseq`

### 5. NanoComp + R-based Statistical Analysis

**Description:**
- NanoComp (part of NanoPack suite) for comparing multiple nanopore datasets
- R packages for downstream statistical analysis
- De Coster et al. (2018) Bioinformatics

**R Packages Used:**
- `phyloseq`: Microbiome data handling and visualization
- `vegan`: Community ecology analysis
- `DESeq2`: Differential abundance analysis
- `microbiome`: Microbiome-specific tools

**Workflow:**
1. QC with NanoComp (compare samples)
2. Import filtered data into R
3. Create phyloseq object
4. Diversity analysis (vegan)
5. Differential abundance (DESeq2)
6. Visualization (ggplot2)

### 6. Porechop + Minimap2 + R Analysis

**Description:**
- Streamlined pipeline combining command-line tools with R
- Highly cited and widely used in microbiome studies
- Flexible and customizable

**R Components:**
- `Biostrings`: Sequence manipulation
- `taxonomizr`: Taxonomy assignment in R
- `DECIPHER`: Multiple sequence alignment and classification
- `phyloseq`: Data management and analysis

**Pipeline:**
1. Porechop: Remove adapters and demultiplex
2. Quality filter: Custom R scripts or NanoFilt
3. Minimap2: Align to reference database
4. Parse alignments in R
5. Taxonomic assignment and abundance estimation
6. Statistical analysis and visualization

**Key Features:**
- Fast alignment with minimap2
- Flexible R-based analysis
- Integration with existing R microbiome tools
- Custom QC and filtering parameters

### 7. Emu (Expectation-Maximization)

**Description:**
- Probabilistic taxonomic assignment for amplicon data
- Particularly good for handling multi-mapping reads
- Dougherty et al. (2022) Nature Methods

**R Integration:**
- Output compatible with phyloseq
- Can be analyzed using standard R microbiome packages
- CSV/TSV output easily imported to R

**Key Features:**
- EM algorithm for abundance estimation
- Handles ambiguous alignments well
- Strain-level resolution capability
- Faster than BLAST-based methods
- Integrates with minimap2

---

## Comparison of R-Based Pipelines

| Pipeline | R Package | Best For | QC Features | Speed | Accuracy |
|----------|-----------|----------|-------------|-------|----------|
| NanoCLUST | Bioconductor | 16S/ITS amplicons | Built-in | Moderate | High |
| DADA2 | CRAN/Bioconductor | ASV inference | Extensive | Moderate | Very High |
| qiime2R | GitHub | Full pipeline | Via QIIME2 | Moderate | High |
| phyloseq | Bioconductor | Data analysis | Visualization | Fast | N/A* |
| Custom (Biostrings) | Bioconductor | Flexibility | Custom | Variable | Variable |

*phyloseq is for analysis after taxonomic assignment

---

## Recommended R-Based Workflow for Your Application

Based on your work with strain-level resolution and emphasis on quality control:

### Option 1: High-Quality ASV Inference (Recommended)

```r
# Install packages
if (!requireNamespace("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
BiocManager::install(c("dada2", "phyloseq", "DECIPHER"))
install.packages(c("ggplot2", "vegan"))

# Workflow
1. Quality filter with DADA2 (adjusted for nanopore)
2. Denoise to ASVs (error rate <0.01)
3. Taxonomic assignment (SILVA/GTDB)
4. Import to phyloseq
5. Statistical analysis
```

**Advantages:**
- Proven track record
- Excellent error correction
- Strong R ecosystem
- Reproducible ASVs

### Option 2: Nanopore-Optimized (Alternative)

```r
# Install NanoCLUST
BiocManager::install("NanoCLUST")

# Workflow
1. Run NanoCLUST pipeline
2. Export results
3. Downstream analysis with phyloseq
```

**Advantages:**
- Designed for nanopore
- Built-in QC
- UMAP clustering handles long reads well

---

## Critical QC Checkpoints for Microbiome Studies

### Pre-Sequencing
1. PCR product verification (gel electrophoresis, Bioanalyzer)
2. Concentration and purity assessment
3. Library QC (fragment size, concentration)

### During Sequencing
1. Monitor pore occupancy (should remain >50% of initial)
2. Real-time read length distribution
3. Throughput rates

### Post-Sequencing
1. **Read quality distribution**: Majority should have Q>10
2. **Read length filtering**: Remove outliers, keep expected size ±500bp
3. **Yield per sample**: Ensure adequate coverage (>10,000 reads minimum)
4. **Demultiplexing efficiency**: Check for barcode cross-contamination

### Post-Denoising
1. **ASV quality**: Mean error rate <0.01 (1%)
2. **Chimera rate**: Should be <5% of total reads
3. **Taxonomic assignment rate**: >80% of ASVs should classify
4. **Negative controls**: Verify minimal contamination

---

## Key Considerations for Your Microbiome Analysis

Based on your presentation work with the Sereika, Srinivas, and simulated datasets:

**Quality Threshold of 0.008 Error Rate:**
- Your analysis identified this as a critical threshold
- Sereika data achieved this; Srinivas data did not
- This aligns with ONT recommendations for Q>12 reads
- Error rate of 0.008 ≈ Q21 (very high quality for nanopore)

**R10.4.1 Flow Cells:**
- Both Sereika and Srinivas used this latest chemistry
- Improved accuracy over older R9.4.1 pores
- Better suited for strain-level resolution

**Full Operon Sequencing:**
- 16S-ITS-23S provides superior taxonomic resolution
- Longer reads (3-5kb) require careful quality filtering
- Higher information content enables strain-level identification

**Denoising Importance:**
- RAD denoiser (used in your work) is critical for quality
- Reduces error rate from ~2-5% to <1%
- Essential for accurate ASV generation
- DADA2 in R provides comparable or better results

---

## References and Resources

**Official ONT Documentation:**
- Oxford Nanopore Technologies Community (community.nanoporetech.com)
- Protocol documentation for amplicon sequencing
- MinKNOW user manual
- EPI2ME workflow documentation

**R Package Documentation:**
- DADA2: https://benjjneb.github.io/dada2/
- phyloseq: https://joey711.github.io/phyloseq/
- qiime2R: https://github.com/jbisanz/qiime2R
- NanoCLUST: https://bioconductor.org/packages/NanoCLUST/

**Key Publications:**
- Sereika et al. (2022) - R10.4.1 performance validation
- Srinivas et al. (2025) - 16S-ITS-23S operon sequencing evaluation
- Callahan et al. (2016) - DADA2 methodology
- Rodriguez-Perez et al. (2021) - NanoCLUST for nanopore
- Bolyen et al. (2019) - QIIME2 platform

**Software Resources:**
- MinKNOW/EPI2ME: Oxford Nanopore official software
- Guppy/Dorado: Basecallers
- NanoPack: QC tools suite
- QIIME2: Comprehensive microbiome analysis platform with nanopore support
- Bioconductor: R packages for sequence analysis
