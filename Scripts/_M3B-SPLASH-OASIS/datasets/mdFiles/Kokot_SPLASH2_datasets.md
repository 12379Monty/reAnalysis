# Datasets Used in "Scalable and unsupervised discovery from raw sequencing reads using SPLASH2"

**Study:** Kokot M, Dehghannasiri R, Baharav T, Salzman J, Deorowicz S (2024)

**Publication:** Nature Biotechnology (2024), doi:10.1038/s41587-024-02381-2

---

## Overview

SPLASH2 represents the computational reimplementation of SPLASH that makes reference-free discovery practical for massive genomic datasets. The study demonstrates biological discovery across multiple data types while achieving ~450× speed improvement over the original implementation.

---

## Dataset 1: Cancer Cell Line Encyclopedia (CCLE)

### Overview
The CCLE is one of the most comprehensive cancer genomics resources, providing multi-omic characterization of human cancer cell lines for functional cancer biology research.

### Dataset Specifications

**Scale:**

- **671 primary cancer cell lines** from primary tumors
- **5.7 terabytes** of raw FASTQ RNA-seq data
- **~64 billion** 100-bp reads total
- **Comprehensive coverage** of major cancer types

**Data Source:**

- Downloaded from Sequence Read Archive (SRA)
- Cell line annotations from Broad Institute CCLE project
- Integration with Genomics of Drug Sensitivity in Cancer (GDSC)

**Data Access:**

- SRA database
- CCLE portal: https://sites.broadinstitute.org/ccle/
- DepMap portal for integrated data

**Cancer Types Represented:**

- Hematopoietic and lymphoid tissue
- Lung
- Colon/colorectal
- Ovary
- Breast
- Brain (including glioma and glioblastoma)
- Skin (melanoma)
- Stomach
- Pancreas
- Kidney
- Liver
- Esophagus
- Urinary tract
- Prostate
- Bone
- Soft tissue
- And many others across 30+ lineages

### Computational Performance

**SPLASH2 Processing:**

- **Run time:** ~47 hours
- **Memory:** 50 GB
- **Output:** 30 million 54-bp extendors

**STAR Alignment Comparison (for context):**

- **Run time:** ~80 hours (same memory)
- **Storage:** ~4 TB for BAM files
- **Data reduction:** SPLASH2 achieved 2000-fold reduction in data volume

**Efficiency Gain:**

- Previous SPLASH: 26 hours for just 2 cell lines (CCK-81 and HS616T)
- SPLASH2: 3.5 minutes for same 2 cell lines
- **Speed improvement: ~450× faster**


### Alternative Splicing Discovery

**Overall Statistics:**

- **11,226 distinct alternative splicing events** detected across entire CCLE
- **6,014 genes** with alternative splicing (excluding intron retention)
- **59%** of AS events were annotated (known from reference)
- **41%** of AS events were unannotated (novel discoveries)
- **85.6%** of reads corresponded to annotated AS
- **14.4%** of reads from unannotated AS

**Unannotated Alternative Splicing Categories:**


1. **One junction with annotated exon boundaries (62.8% of unannotated AS)**

   - One splice junction uses known exon boundaries
   - Other junction is novel
   - Most common unannotated category

2. **Both junctions at unannotated positions**

   - Completely novel splicing events
   - May indicate cryptic splice sites
   - Particularly enriched in cancer

3. **Complex events**

   - Multiple novel junctions
   - May involve exon skipping with novel boundaries

**Genes with Unannotated AS:**

- **2,356 genes** had at least one unannotated AS event (with >10% of anchor reads)
- **199 genes** with unannotated AS are in COSMIC database (Cancer Gene Census)
- These represent potential cancer-specific biomarkers and neoantigens

**Cancer-Type Specific Patterns:**


**Elevated Intron Retention:**

- **Glioma:** Significantly higher intron retention
- **Melanoma:** Significantly higher intron retention
- Compared to other cancer types

**Biological Significance:**

- Intron retention is associated with:
  - Spliceosome mutations
  - DNA damage response
  - Cellular stress
  - Potential biomarker for these cancer types

### Cryptic Splicing in Cancer

**Context:**

Many tumors acquire mutations in spliceosome components (SF3B1, U2AF1, SRSF2) leading to activation of cryptic splicing programs that contribute to pathology.

**SPLASH2 Advantages for Cancer:**


1. **Mutation tolerance:** Cancer genomes have high mutational burden
   - Alignment-based methods fail with extensive exonic mutations
   - SPLASH2 detects splicing regardless of sequence changes

2. **Structural variant handling:**

   - Cancer cells accumulate large structural variants
   - These can be absent from or misaligned to reference
   - SPLASH2 discovers events without alignment

3. **Repetitive region analysis:**

   - Alignment often fails in repetitive sequences
   - SPLASH2 k-mer approach handles repetitive regions
   - May discover splicing in previously inaccessible regions

4. **Neoantigen discovery:**

   - Unannotated splicing can generate novel proteins
   - These may serve as tumor-specific antigens
   - Potential for personalized cancer vaccines

**Clinical Relevance:**

- Biomarker discovery for cancer subtypes
- Therapeutic target identification
- Understanding resistance mechanisms
- Personalized medicine applications

---

## Dataset 2: Amyotrophic Lateral Sclerosis (ALS) RNA-seq

### Overview
Large-scale RNA-seq study investigating transcriptomic changes in ALS, a neurodegenerative disease characterized by TDP-43 protein pathology affecting RNA processing.

### Dataset Specifications

**Scale:**

- **550 gigabytes** of raw FASTQ files
- Large sample cohort
- Deep RNA sequencing

**Data Source:**

- SRA database: **SRP185789**

- Published dataset from Ma et al. (2022) study on ALS

**Original Study Context:**

Ma et al. investigated TDP-43-mediated cryptic exon inclusion in ALS patients, focusing on the UNC13A gene as a key example of pathogenic splicing.

### Biological Context

**ALS Pathophysiology:**

- Motor neuron degeneration
- TDP-43 protein aggregation in 97% of cases
- TDP-43 normally regulates RNA splicing
- Loss of TDP-43 function causes cryptic splicing

**Key Gene: UNC13A**

- Encodes synaptic protein
- Contains cryptic exons normally repressed by TDP-43
- Cryptic exons cause nonsense-mediated decay
- Loss of UNC13A contributes to neurodegeneration

### SPLASH2 Analysis

**Processing Achievement:**

- Original SPLASH could NOT process this dataset (too large)
- SPLASH2 successfully completed analysis
- Demonstrated scalability breakthrough

**Discovery Focus:**

1. **Cryptic splicing events**

   - TDP-43-dependent cryptic exons
   - Novel cryptic splice sites not previously annotated

2. **RNA editing patterns**

   - A-to-I editing changes
   - Disease-specific editing patterns

3. **Alternative splicing dysregulation**

   - Broad splicing changes beyond cryptic exons
   - Potential new disease mechanisms

**Significance:**

- Demonstrates SPLASH2 can handle neuroscience datasets
- Enables discovery of therapeutic targets
- May identify biomarkers for disease progression
- Reveals previously unknown disease mechanisms

---

## Dataset 3: Smart-seq2 (SS2) Human Muscle Cells

### Overview
Single-cell RNA-sequencing from the Tabula Sapiens project, representing one of the first comprehensive human cell atlases.

### Dataset Specifications

**Scale:**

- **1,553 FASTQ files**

- **Average file size: 657 MB**

- **Total: ~1 TB of data**

- Plate-based scRNA-seq (Smart-seq2 technology)

**Data Source:**

- Tabula Sapiens consortium
- Downloaded from: https://tabula-sapiens-portal.ds.czbiohub.org/
- Cell type annotations from figshare
- Part of larger Tabula Sapiens v1 (Science, 2022)

**Biological Context:**

- Normal human muscle tissue
- Multiple donors (24 subjects in full Tabula Sapiens)
- Part of 28-organ atlas
- Over 1.1 million cells in complete dataset

### SPLASH2 Analysis

**Discovery Focus:**


1. **RNA Editing Events**

   - A-to-I editing by ADAR enzymes
   - Cell-type-specific editing patterns
   - Muscle-specific editing sites

2. **Alternative Splicing**

   - Cell-type-specific isoforms
   - Muscle-specific splicing programs
   - Developmental splicing patterns

3. **Circular RNA**

   - circRNA expression in muscle cells
   - Cell-type specificity

**Performance Characteristics:**


**Scalability Testing:**

- Linear scaling with number of samples
- Memory and time increase predictably
- Stage 1 (parsing) and Stage 2 (merging) profiled separately

**Thread Parallelization:**

- Trade-off between speed and memory usage
- More threads = faster but more memory
- Configurable for different computing environments

**Memory Requirements:**

- Depends on:
  - Number of samples
  - Sequencing depth per sample
  - Number of detected anchors
  - Target diversity per anchor

### Comparison with Bulk RNA-seq

**Smart-seq2 vs. 10x Chromium:**

- Smart-seq2: Full-length transcript coverage
- Smart-seq2: Higher reads per cell
- Smart-seq2: Better for isoform analysis
- 10x Chromium: More cells, lower coverage per cell

**SPLASH2 Performance:**

- Efficient on both platforms
- Demonstrates versatility across technologies
- Different computational profiles optimized separately

---

## Dataset 4: Circular RNA (circRNA) Validation Datasets

### Overview
Specialized datasets for validating SPLASH2's ability to detect circular RNAs without task-specific parameter tuning.

### Dataset Types

**1. RNase R Treatment Experiments**


**Design:**

- Matched samples with and without RNase R treatment
- RNase R degrades linear RNA but not circular RNA
- Enrichment strategy for circRNA validation

**Analysis:**

- Compare circular vs. linear isoform ratios
- RNase R (+) should show elevated circular/linear ratio
- Statistical validation of circRNA calls

**SPLASH2 Results:**

- **1,265 circRNAs** initially detected
- **521 circRNAs** called statistically significant
- Significant circRNAs showed larger circular-to-linear ratio changes
- No specialized circRNA parameters required

**2. Amplicon Sequencing of Validated circRNAs**


**Purpose:**

Validate SPLASH2 circRNA calls against experimentally confirmed circRNAs

**Validation Criteria:**

1. **Database validation:** Match to known circRNA databases
2. **Exon boundary analysis:** Involvement of annotated exon boundaries
3. **Proximity analysis:** Distance to detected circRNAs in original cell lines

**Specificity Assessment:**


**Validated circRNAs:**

- Use annotated exon boundaries
- Match database entries
- High confidence calls

**Unvalidated but likely real:**

- Close to annotated exon boundaries (within ~100 bp)
- Close to other detected circRNAs in original cell lines
- BLAT alignment confirms back-splice junctions

**True Negative Candidates:**

- >100 bp from annotated boundaries
- No nearby detected circRNAs
- May represent false positives or very rare events

**Key Finding:**

SPLASH2's statistical framework (using OASIS) effectively distinguishes true circRNAs from noise without requiring circRNA-specific tuning.

---

## Dataset 5: BCR-ABL Fusion Gene Detection

### Overview
Chronic myeloid leukemia (CML) cell lines with the characteristic BCR-ABL fusion gene.

### Biological Context

**BCR-ABL Fusion:**

- Result of t(9;22) Philadelphia chromosome translocation
- BCR gene (chromosome 22) fused to ABL1 gene (chromosome 9)
- Driver mutation in CML
- Therapeutic target (imatinib/Gleevec)

**Clinical Importance:**

- Diagnostic marker for CML
- Monitoring minimal residual disease
- Tracking therapy response
- Detecting resistance emergence

### SPLASH2 Analysis

**Fusion Detection:**

- BCR-ABL fusion creates novel junction
- Junction sequence serves as anchor
- Fusion-specific vs. wild-type isoforms as targets

**Key Result:**

SPLASH2 successfully recovered the BCR-ABL fusion from CCLE CML cell lines without:
- Fusion-specific parameters
- Prior knowledge of the fusion
- Specialized fusion-calling algorithms

**Significance:**

- Demonstrates generality of SPLASH2 approach
- Same algorithm detects:
  - Alternative splicing
  - Circular RNA  
  - Gene fusions
  - RNA editing
- No task-specific tuning required

---

## Cross-Dataset Insights

### 1. Algorithmic Generality

**Same SPLASH2 algorithm (untuned) successfully analyzed:**

- Cancer cell lines (CCLE) → alternative splicing
- ALS neurodegeneration → cryptic splicing
- Muscle single cells → RNA editing
- circRNA validation → circular RNAs
- CML cells → gene fusions

**Implication:** True unification of diverse discovery tasks under single statistical framework.

### 2. Scalability Validation

**Dataset Size Range:**

- Small: Single cell files (~657 MB)
- Medium: ALS cohort (550 GB)
- Large: CCLE (5.7 TB)

**Performance:** Linear scaling maintained across range

**Implication:** SPLASH2 ready for even larger datasets (e.g., UK Biobank scale)

### 3. Technology Independence

**Platforms Supported:**

- Illumina bulk RNA-seq
- Smart-seq2 single-cell
- 10x Chromium (via sc-SPLASH extension)
- Amplicon sequencing

**Implication:** Universal applicability across sequencing technologies

---

## Computational Resource Requirements

### Memory Usage

**Factors Affecting Memory:**

- Number of samples
- Sequencing depth
- Number of significant anchors
- Target diversity

**Typical Requirements:**

- Small datasets: <10 GB
- CCLE: 50 GB
- Can be reduced with:
  - Fewer parallel processes
  - Parameter tuning
  - Staged processing

### Storage Requirements

**SPLASH2 Advantages:**

- Processes FASTQ directly (no BAM files)
- Outputs compact SATC format
- 2000-fold reduction vs. BAM for CCLE
- Minimal intermediate files

**Comparison:**

- Traditional pipeline: Requires TB of BAM storage
- SPLASH2: GB of output files
- Enables analysis in storage-constrained environments

### Processing Time

**Stage-Specific Times (SS2 muscle example):**

- Stage 1 (Parsing): Most time-consuming
- Stage 2 (Merging): Memory-intensive
- Stage 3 (Statistics): Fast
- Total: Hours to days depending on dataset

**Parallelization:**

- Stage 1: Embarrassingly parallel (per-sample)
- Stage 2: Parallel by anchor
- Thread scaling: Linear speedup observed

---

## Data Availability

### Public Access

**CCLE:**

- SRA database (specific accessions in paper)
- CCLE portal: https://sites.broadinstitute.org/ccle/
- DepMap portal with integrated data

**ALS Dataset:**

- SRA: SRP185789
- Original paper: Ma et al. (2022)

**Tabula Sapiens:**

- Portal: https://tabula-sapiens-portal.ds.czbiohub.org/
- Figshare: Cell annotations
- AWS S3: Raw data

**Software:**

- GitHub: https://github.com/refresh-bio/SPLASH
- SPLASH2 implementation
- Documented with examples

---

## Key Methodological Details

### SPLASH2 Pipeline Parameters

**Default Settings:**

- Anchor length: 27 nt
- Gap length: 0 nt (can be adjusted)
- Target length: 27 nt
- k-mer counting: KMC3 engine

**Statistical Testing:**

- OASIS framework for p-values
- Multiple testing correction (Benjamini-Hochberg)
- FDR control at specified level (typically 0.05)

**Output Format:**

- SATC (Sample-Anchor-Target-Count) format
- Efficient binary representation
- Enables downstream analysis

---

## Novel Biological Insights

### 1. Cancer Splicing Landscape

**Finding:** Extensive unannotated alternative splicing in cancer, with 41% of detected AS events being novel.

**Cancer-Specific Patterns:**

- Glioma and melanoma show elevated intron retention
- Spliceosome-mutant cancers have cryptic splicing
- Many cancer genes show unannotated AS

**Implication:**

- Hundreds of potential biomarkers
- Novel therapeutic targets
- Neoantigen sources for immunotherapy

### 2. ALS Cryptic Splicing

**Finding:** SPLASH2 enables comprehensive analysis of TDP-43-mediated cryptic splicing at scale.

**Discovery Potential:**

- Beyond known genes like UNC13A
- Genome-wide cryptic exon catalog
- Cell-type-specific splicing changes

**Implication:**

- Better understanding of disease mechanism
- Potential therapeutic targets
- Biomarkers for progression

### 3. circRNA Biology

**Finding:** Statistical framework distinguishes functional circRNAs from noise without specialized tuning.

**Validation:**

- High specificity using exon boundaries
- Enrichment in RNase R treatment
- Agreement with databases

**Implication:**

- circRNA discovery in any RNA-seq data
- No specialized library prep needed
- Functional circRNA identification

### 4. Unified Detection Framework

**Finding:** Single algorithm detects diverse phenomena (AS, editing, fusions, circRNA) without task-specific tuning.

**Validation:** Across all datasets with high accuracy

**Implication:**

- Fragmented toolkits no longer necessary
- One analysis yields multiple discoveries
- Lower barriers to comprehensive analysis

---

## Impact on Field

### Computational Biology

**Benchmark Established:**

- CCLE processing in <2 days on single machine
- Sets new standard for scalability
- Demonstrates reference-free feasibility at scale

### Cancer Research

**Resources Created:**

- Comprehensive AS catalog for CCLE
- Novel splicing events in cancer genes
- Foundation for biomarker development

### Neuroscience

**Capability Demonstrated:**

- Large-scale neurodegeneration studies feasible
- Cryptic splicing discovery enabled
- Therapeutic target identification

### Technology Development

**Proof of Concept:**

- Reference-free analysis practical
- Statistical rigor maintained at scale
- Applicable across biology

---

## Summary

The SPLASH2 study datasets collectively demonstrate:

1. **Scalability from gigabytes to terabytes** with maintained efficiency

2. **Biological discovery across diverse contexts:** cancer, neurodegeneration, normal tissue

3. **Technology independence:** bulk, single-cell, multiple platforms

4. **Task generality:** splicing, editing, fusions, circRNA with single algorithm

5. **Clinical relevance:** biomarkers, therapeutics, diagnostics

6. **Computational practicality:** feasible on standard hardware, minimal storage

The computational reimplementation in SPLASH2 transforms SPLASH from a promising prototype into a production-ready tool capable of analyzing the largest genomic datasets available, while maintaining the statistical rigor and biological discovery power of the original approach.
