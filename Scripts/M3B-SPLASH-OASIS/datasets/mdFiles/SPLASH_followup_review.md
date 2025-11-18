# Reference-Free Genomic Discovery: from SPLASH to SPLASH2 and Beyond

## Executive Summary

Following the publications of SPLASH (Statistically Primary aLignment Agnostic 
Sequence Homing) and the OASIS statistical framework, three major follow-up studies 
were carroied out.  These works focused on microbial discovery, single-cell analysis, 
and scalable implementation.

## The Fundamental Paradigm Change

### Alignment-Dependent Vs Reference-Free Analysis

**Traditional Paradigm:**

- Requires high-quality reference genomes
- Computationally intensive alignment steps
- Blind to sequences absent from references
- Fragmented, application-specific tools for different biological phenomena
- Limited scalability for massive datasets
- Misses novel biology not captured in annotations

**New SPLASH Paradigm:**

- Operates directly on raw FASTQ files without alignment
- Reference-free and metadata-free discovery
- Statistical detection of sample-regulated sequence variation
- Unified framework for diverse biological mechanisms
- Ultra-efficient computational performance
- Discovers unannotated and novel biology

### Unifying Conceptual Framework

The key insight underlying SPLASH is that many forms of biological 
regulation—alternative splicing, V(D)J recombination, RNA editing,
mobile genetic elements, CRISPR arrays, viral strain variation, and more—share a 
common pattern signature: **sample-specific target diversity following
constant anchor sequences**. Rather than developing separate tools for
each mechanism, SPLASH provides a unified statistical approach using k-mer
composition analysis.

## Study 1: Ultra-Efficient Microbial Discovery (Henderson et al., 2024)

### Paradigm Impact: Unifying Microbial Genomics

This study extends SPLASH to microbial genomics, demonstrating that a single algorithm can:
- Discover novel mobile genetic elements
- Identify CRISPR arrays and spacer diversity
- Perform rapid strain typing without references
- Enable metadata-free classification

**Key Innovation:** Integration of SPLASH with "compactors"—a statistical assembly algorithm that generates longer sequences from anchor-seeded local assemblies. This enables discovery and characterization of larger genetic features while maintaining the reference-free approach.

**Biological Discoveries:**

- Novel mobile elements and CRISPR arrays in bacterial genomes
- Rapid Mycobacterium tuberculosis strain differentiation (83% accuracy) without prior knowledge of strain references
- Discovery of genetic features absent from existing reference assemblies

### Datasets Analyzed

**1. Mycobacterium tuberculosis Clinical Isolates**

- Multiple M. tuberculosis strains from clinical sources
- Used for strain typing and mobile element discovery
- Demonstrated rapid, reference-free strain classification

**2. Bacterial Genomic Datasets**

- Various bacterial species for mobile element and CRISPR discovery
- Focused on identifying genetic plasticity and diversity
- Revealed novel biology not captured in reference genomes

**Technical Achievement:** The combination of SPLASH with compactors enables unified analysis of:
- Transposon and insertion sequence mobilization
- Phage integration sites
- CRISPR array evolution and spacer acquisition
- Strain-defining mutations and polymorphisms

All achieved through a single computational pipeline without custom workflows.

## Study 2: SPLASH2 - Scalable Implementation (Kokot et al., 2024)

### Paradigm Impact: Making Reference-Free Analysis Practical at Scale

SPLASH2 represents the computational reimplementation that makes the SPLASH paradigm feasible for the largest genomic datasets available today.

**Computational Evolution:**

- ~450× faster than original SPLASH
- Drastically reduced memory requirements
- Single-command execution with minimal dependencies
- Processes terabyte-scale datasets efficiently

**Key Innovation:** Leveraging KMC (k-mer counter) for ultra-efficient anchor-target tuple counting, replacing the original implementation's bottleneck step with a highly optimized k-mer counting engine.

### Datasets Analyzed

**1. Cancer Cell Line Encyclopedia (CCLE) - 671 Cell Lines**

- **Scale:** 5.7 terabytes of RNA-seq data
- **Source:** Primary tumor-derived cancer cell lines
- **Coverage:** Comprehensive representation of cancer types
- **Processing time:** ~47 hours with 50 GB memory
- **Key Finding:** 11,226 distinct alternative splicing events in 6,014 genes

**Discovery Highlights:**

- 59% annotated alternative splicing events
- 41% unannotated alternative splicing (including cryptic splicing)
- 2,356 genes with unannotated alternative splicing
- 199 genes with unannotated AS cataloged in COSMIC database
- Higher intron retention in glioma and melanoma

**Biological Significance:** Cancer cells often acquire spliceosome mutations leading to cryptic splicing programs that contribute to pathology. SPLASH2's reference-free approach is particularly powerful for detecting these unannotated events that traditional alignment-based methods miss, especially in highly mutated tumor genomes.

**2. Amyotrophic Lateral Sclerosis (ALS) Dataset**

- **Scale:** 550 GB of raw FASTQ files
- **Source:** SRA database (SRP185789)
- **Focus:** Discovery of cryptic splicing and RNA editing events in ALS
- **Context:** ALS is characterized by TDP-43 protein pathology, which affects RNA splicing

**Significance:** This dataset was previously too large for the original SPLASH implementation to process. SPLASH2 enabled comprehensive analysis of splicing dysregulation in neurodegeneration.

**3. Smart-seq2 (SS2) Human Muscle Cells**

- **Scale:** 1,553 FASTQ files (average 657 MB each)
- **Source:** Tabula Sapiens dataset
- **Application:** Single-cell RNA-seq analysis
- **Discovery:** Cell-type-specific alternative splicing and RNA editing

**Performance Metrics:**

- Demonstrates linear scaling with sample number
- Thread parallelization enables speed-memory tradeoffs
- Efficient processing of single-cell data at scale

**4. Circular RNA (circRNA) Validation Datasets**

- RNase R treated vs. untreated samples
- Amplicon sequencing of validated circRNAs
- Demonstrates SPLASH2's precision without task-specific tuning

**Key Finding:** 521 differentially represented circRNAs detected with statistical significance, showing larger circular-to-linear ratios in RNase R treatment compared to non-significant anchors.

## Study 3: sc-SPLASH - Single-Cell Discovery (Dehghannasiri et al., 2024)

### Paradigm Impact: Extending Reference-Free Discovery to Barcoded Single-Cell Data

sc-SPLASH adapts the SPLASH framework to handle the unique challenges of high-throughput barcoded single-cell RNA-seq (10x Chromium) and spatial transcriptomics (10x Visium).

**Key Innovation:** 
- Development of BKC (Barcoded K-mer Counter)—optimized for UMI deduplication and cell barcode extraction
- 43× faster than UMI-tools
- Sparse matrix representation for efficient memory usage with large contingency tables

**Novel Biological Insight:** sc-SPLASH enables discovery of transcriptomic complexity beyond gene expression at single-cell resolution, revealing regulatory mechanisms invisible to standard alignment-based approaches.

### Datasets Analyzed

**1. Tabula Sapiens (Human) - Multiple Tissues**

- **Scale:** Over 1.1 million cells from 28 organs
- **Source:** 24 normal human subjects
- **Platform:** 10x Chromium single-cell RNA-seq
- **Data Access:** SRA and figshare

**Key Discoveries:**

- V(D)J recombination detection across diverse cell types and tissues
- Immunoglobulin variable domain (V-set) showed highest entropy (2.16) and effect size (0.90)
- V-set domain had highest number of unaligned extendors, highlighting alignment challenges
- Distribution of in-frame V(D)J transcripts across cell types and tissues
- Viral fusion protein domain (F-protein) detected in heart cells from donor 12, revealing HIV transcripts—demonstrating utility of not relying solely on genome alignment

**Significance:** This demonstrates that sc-SPLASH can rediscover known biology (V(D)J) while also uncovering unexpected findings (viral transcripts) that would be missed by gene-centric, alignment-based approaches.

**2. Human Cutaneous Squamous Cell Carcinoma (Spatial)**

- **Platform:** 10x Visium spatial transcriptomics
- **Source:** SRA (SRP262989)
- **Discovery:** Tumor-specific somatic mutations detected spatially

**3. Human Small Intestine (Spatial)**

- **Source:** SRA (SRP284357)
- **Platform:** 10x Visium
- **Application:** Spatial patterns of alternative splicing

**4. Electric Eel Muscle (Spatial)**

- **Source:** SRA (SRP432489)
- **Samples:** P4_ST_vis_rep1 and P4_ST_vis_rep2
- **Platform:** 10x Visium spatial transcriptomics

**5. Spongilla (Freshwater Sponge) - Novel Biology Discovery**

- **Species:** Spongilla lacustris (Porifera)
- **Samples:** Four individuals
- **Platform:** 10x Chromium scRNA-seq
- **Genomic Data:** PacBio long-read genome assembly and IsoSeq
- **Additional Data:** Illumina short-read sequencing

**Major Discovery: GranRep Gene Family**

- Five novel genes (GranRep1-5) encoding secreted repeat proteins
- **Structure:** Signal peptide + 10-amino acid granny repeats + lysine-rich region + 6-amino acid C-terminal repeats
- **Expression:** Predominantly in granulocytes and amoebocytes (immune-type cells)
- **Repeats:** 30-bp "granny repeats" with high sequence diversity
- **Critical Finding:** These genes were **absent from the reference genome assembly**

- Found 2-6 alleles per gene across just four individuals
- Validated by HCR RNA-FISH showing co-expression with ACP5 (granulocyte marker)

**Evolutionary Significance:** This represents discovery of immune-related genes in a non-model organism using only transcriptomic data, demonstrating the power of reference-free discovery.

**6. Ciona robusta (Tunicate) - Developmental Biology**

- **Species:** Ciona robusta (also called Ciona intestinalis Type A)
- **Phylogeny:** Phylum Chordata (sister group to vertebrates)
- **Datasets:**

  - 10x Chromium scRNA-seq (SRA: SRP198321)
  - Developmental time course (SRA: SRP339256, DRP003810)

**Major Discovery: YYD Repeat Protein**

- Novel secreted repeat protein expressed in hemocytes
- **Structure:** Signal peptide + YYD repeats (high diversity) + additional domains
- **Expression pattern:**

  - Peaks during metamorphosis (early rotation stage)
  - Detected from late tail-bud stage through larva
  - In juveniles: limited to circulating hemocytes in hemolymph vessels
- **Immune function:** Hemocytes implicated in immune defense
- **Trans-splicing:** sc-SPLASH detected trans-splicing events in Ciona

**Parallel Finding:** Striking parallel between Spongilla GranReps (granulocytes/amoebocytes) and Ciona YYD protein (hemocytes)—both secreted repeat proteins in immune cells, across phylogenetically distant aquatic filter-feeders.

**Evolutionary Context:** These discoveries in early-diverging metazoans (sponges) and our closest invertebrate relatives (tunicates) reveal conserved principles of immune gene structure (secreted repeat proteins) while highlighting the limitations of reference genomes.

## Comparative Analysis Across Studies

### Computational Performance Evolution

| Metric | Original SPLASH | SPLASH2 | sc-SPLASH |
|--------|----------------|---------|-----------|
| Speed improvement | Baseline | 450× faster | 43× faster than UMI-tools |
| CCLE processing | Not feasible | 47 hours | N/A |
| Memory optimization | Limited | KMC-based | Sparse matrices |
| Scale capability | Small datasets | Terabytes | Millions of cells |

### Biological Discoveries Unified

All three studies demonstrate that diverse biological mechanisms can be discovered through a single statistical framework:

**Henderson et al. (Microbial):**

- Mobile genetic elements
- CRISPR diversity
- Strain variation
- Phage integration

**Kokot et al. (SPLASH2):**

- Alternative splicing (annotated and unannotated)
- Circular RNA
- Gene fusions (BCR-ABL)
- RNA editing

**Dehghannasiri et al. (sc-SPLASH):**

- V(D)J recombination
- Trans-splicing
- Alternative splicing (cell-type-specific)
- Novel repeat proteins in non-model organisms
- Somatic mutations (spatial)

## Impact on Genomic Analysis Workflows

### Before SPLASH
```
Raw Reads → Quality Control → Alignment to Reference → 
Application-Specific Tools (separate for each phenomenon) → 
Manual Integration → Biological Interpretation
```

Challenges:
- Reference genome required (and must be high quality)
- Computationally intensive alignment
- Multiple tools needed for different biological questions
- Misses unannotated features
- Biased by reference quality

### After SPLASH/SPLASH2/sc-SPLASH
```
Raw Reads → SPLASH Pipeline (single command) → 
Statistical Significance Testing → 
Classification (optional) → 
Biological Interpretation
```

Advantages:
- No reference required
- Single unified framework
- Discovers annotated AND unannotated features
- Computationally efficient
- Works for model and non-model organisms
- Applicable to bulk and single-cell data

## Novel Capabilities Enabled

### 1. Non-Model Organism Discovery
The Spongilla and Ciona analyses demonstrate that meaningful biological discovery is possible even with:
- Incomplete reference genomes
- Limited prior annotation
- Understudied phylogenetic groups

### 2. Cancer Genomics Without Alignment Bias
CCLE analysis shows that:
- Highly mutated tumor genomes don't impede discovery
- Cryptic splicing from spliceosome mutations can be detected
- Structural variants and complex rearrangements are accessible

### 3. Single-Cell Resolution Discovery
sc-SPLASH enables:
- Cell-type-specific regulatory mechanism discovery
- Spatial patterns of sequence variation
- Detection of rare cells with unique biology (HIV+ heart cells)

### 4. Rapid Clinical Application
Microbial strain typing without reference databases enables:
- Point-of-care diagnostics potential
- Real-time outbreak tracking
- Discovery of novel pathogen variants

## Methodological Innovations

### Statistical Foundation: OASIS  (this is possibly crap)
The OASIS framework provides interpretable, finite-sample-valid hypothesis testing that underlies all SPLASH applications. This gives:
- Rigorous p-values for each anchor
- Multiple testing correction
- No need for arbitrary thresholds

### Compactors: Statistical Assembly
Henderson et al.'s compactors provide:
- Longer sequence context from short reads
- Probabilistic assembly without full genome reconstruction
- Seed-based extension maintaining statistical rigor

### BKC: Barcoded K-mer Counting
Dehghannasiri et al.'s BKC module handles:
- UMI deduplication
- Cell barcode extraction and correction
- Dramatically faster preprocessing for single-cell data

## Broader Implications

### 1. Democratization of Genomics
By removing the requirement for high-quality references, SPLASH makes genomic discovery accessible for:
- Non-model organisms
- Understudied populations
- Resource-limited settings
- Rapidly evolving pathogens

### 2. Discovery Over Confirmation
SPLASH shifts the focus from confirming known biology (alignment to known references) to discovering novel biology through unsupervised, statistics-first analysis.

### 3. Unified Bioinformatics
Rather than maintaining dozens of specialized tools, researchers can use a single framework for diverse biological questions, reducing:
- Technical barriers to entry
- Computational infrastructure requirements
- Analysis complexity and potential for errors

### 4. Clinical Translation Potential
The speed and accuracy demonstrated (especially in microbial applications) suggest near-term clinical utility for:
- Infectious disease diagnostics
- Cancer mutation profiling
- Rare disease variant discovery
- Transplant compatibility assessment (V(D)J)

## Future Directions

Based on these three studies, future development likely includes:

### 1. Additional Sequencing Modalities
- DNA sequencing for genomic variation
- Hi-C for chromatin interaction
- Spatial multi-omics
- Long-read sequencing integration

### 2. Enhanced Assembly Methods
- Improved compactors for even longer sequences
- Integration with long-read data for complete gene structures
- Reference-guided options for hybrid approaches

### 3. Clinical Validation
- Prospective clinical trials for microbial diagnostics
- Cancer biomarker validation studies
- Integration with electronic health records

### 4. Machine Learning Integration
- Automated biological classification
- Pattern recognition across anchors
- Predictive modeling for phenotypes

## Conclusion

The trio of Henderson et al., Kokot et al., and Dehghannasiri et al. studies collectively
establish that reference-free, statistics-first genomic analysis is feasible
By unifying diverse biological discovery tasks under a single computational framework, 
operating efficiently at scale, and enabling discovery in both model and non-model
organisms, these works change how genomic sequence analysis can be performed.

Key achievements:
- **Henderson et al.:** Unified microbial discovery and statistical assembly
- **Kokot et al.:** Scalable implementation enabling terabyte-scale analysis
- **Dehghannasiri et al.:** Single-cell and spatial reference-free discovery

