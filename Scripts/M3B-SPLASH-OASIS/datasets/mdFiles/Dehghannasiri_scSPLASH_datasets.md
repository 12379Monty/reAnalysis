# Datasets Used in "sc-SPLASH provides ultra-efficient reference-free discovery in barcoded single-cell sequencing"

**Study:** Dehghannasiri R, Kokot M, Starr AL, Maziarz J, Gordon T, Tan SY, Wang PL, Voskoboynik A, Musser JM, Deorowicz S, Salzman J (2024)

**Publication:** bioRxiv 2024.12.24.630263

---

## Overview

sc-SPLASH extends the SPLASH framework to barcoded droplet-based single-cell RNA-seq (10x Chromium) and spatial transcriptomics (10x Visium), enabling reference-free discovery of transcriptomic complexity at single-cell resolution. The study includes analyses of model organisms (human) and non-model organisms (sponge, tunicate) demonstrating broad applicability.

---

## HUMAN DATASETS

### Dataset 1: Tabula Sapiens - Human Cell Atlas

#### Overview
Comprehensive human cell atlas providing the foundation for validating sc-SPLASH performance and rediscovering known biology.

#### Dataset Specifications

**Scale:** 

- **1.1+ million cells** total across full atlas
- **28 organs** from **24 normal human subjects** 
- **10x Chromium** single-cell RNA-seq platform
- Multiple tissues analyzed for sc-SPLASH validation

**Data Source:** 

- Tabula Sapiens Consortium
- Portal: https://tabula-sapiens-portal.ds.czbiohub.org/
- Figshare: https://figshare.com/articles/dataset/Tabula_Sapiens_release_1_0/14267219
- Cell type annotations publicly available

**Original Publication:** 

- Smooth muscle
- Neurons
- Glia
- Stem/progenitor cells
- Specialized cell types per organ

#### sc-SPLASH Analysis Focus

**1. V(D)J Recombination Discovery** 


**Context:** 

- Adaptive immune system generates antibody and T-cell receptor diversity
- V(D)J recombination creates millions of unique sequences
- Critical for immune function and repertoire analysis

**Key Findings:** 


**Immunoglobulin Variable Domain (V-set):** 

- **Highest entropy:** 2.16 (indicating extreme diversity)
- **Highest effect size:** 0.90 (strongest regulation)
- **Highest number of unaligned extendors** among all Pfam domains
- Demonstrates alignment challenges for highly diverse sequences

**Extendor Analysis:** 

- sc-SPLASH generates "extendors" (longer sequences assembled from anchors)
- Pfam domain analysis of extendors shows functional categories
- V-set domain predominates in unaligned extendors
- Confirms previous Smart-seq2 findings about antibody/TCR diversity

**Distribution Across Tissues:** 

- V(D)J transcripts detected in expected immune-rich tissues
- Cell-type specificity matches known biology
- In-frame V(D)J transcripts mapped to specific cell populations

**Integration with IgBLAST:** 

- sc-SPLASH output compatible with IgBLAST
- Enables detailed immunoglobulin repertoire analysis
- Identifies productive vs. non-productive rearrangements

**Novel Discovery:** 

- **HIV transcripts detected** in heart cells from donor 12
- Viral fusion protein domain (F-protein) identified
- Demonstrates power of not relying solely on reference alignment
- Could enable opportunistic pathogen detection

**Biological Significance:** 

- Validates sc-SPLASH on known biology (V(D)J)
- Demonstrates discovery beyond standard gene expression
- Highlights sequences missed by alignment-based approaches
- Enables immune repertoire studies in any 10x dataset

**2. Cell-Type-Specific Altenative Splicing** 


**Context:** 

Different cell types use alternative splicing to generate specialized protein isoforms from shared genes.

**Analysis:** 

- Supervised test using cell type metadata
- L1-regularized logistic regression
- Identifies anchors with cell-type-dependent target distributions

**Findings:** 

- Multiple genes show cell-type-specific splicing
- Recapitulates known biology from bulk RNA-seq
- Demonstrates single-cell resolution of splicing
- Identifies cell-type-specific isoforms

**Advantages of sc-SPLASH:** 

- Reference-free detection of novel isoforms
- No need for splice junction databases
- Discovers unannotated splicing
- Single-cell resolution reveals cell-type specificity

#### Performance Benchmarking

**Comparison with Standard Tools:** 


**sc-SPLASH vs. Cell Ranger:** 

- Test samples from Tabula Sapiens
- Ordered by dataset size
- sc-SPLASH much faster

**sc-SPLASH vs. STARsolo:** 

- Another state-of-the-art 10x processing tool
- sc-SPLASH shows superior efficiency
- Lower memory footprint
- Faster execution

**BKC Performance:** 

- **43× faster** than UMI-tools
- Handles UMI deduplication efficiently
- Cell barcode extraction and correction
- Critical preprocessing bottleneck eliminated

#### Data Processing Details

**Cell Barcode Handling:** 

- 10x uses 16-bp cell barcodes
- BKC extracts barcodes from read 1
- Error correction using whitelist
- Filters invalid barcodes

**UMI Deduplication:** 

- 10x uses 12-bp UMIs
- BKC performs efficient UMI collapsing
- Removes PCR duplicates
- Retains biological replicates

**Anchor-Target Counting:** 

- Modified for barcoded data
- Each record includes: sample, cell barcode, anchor, target, count
- Sparse matrix representation for efficiency
- Enables single-cell contingency tables

---

### Dataset 2: Human Spatial Transcriptomics

#### A. Human Cutaneous Squamous Cell Carcinoma

**Platform:** 10x Visium spatial transcriptomics

**Dataset Details:** 

- **SRA Accession:** SRP262989
- Spatial resolution: ~55 μm spots
- Each spot contains multiple cells
- Spatial coordinates preserved

**sc-SPLASH Analysis:** 

- Tumor-specific somatic mutations detected
- Spatial patterns of mutations revealed
- Reference-free discovery of variants
- Spatial distribution analysis

**Biological Insights:** 

- Tumor heterogeneity visualization
- Mutation spatial distribution
- Tumor microenvironment characterization
- Clonal evolution patterns

**Clinical Relevance:** 

- Tumor mutation profiling
- Spatial biomarker discovery
- Treatment response prediction
- Minimal residual disease detection

#### B. Human Small Intestine

**Dataset Details:** 

- **SRA Accession:** SRP284357
- 10x Visium platform
- Normal intestinal tissue
- Multiple tissue sections

**Analysis Focus:** 

- Spatial patterns of alternative splicing
- Cell-type-specific splicing in tissue context
- Epithelial-stromal interactions
- Tissue architecture relationships

**Discoveries:** 

- Spatially regulated alternative splicing
- Layer-specific isoforms
- Microenvironment-dependent regulation

---

## NON-MODEL ORGANISM DATASETS

### Dataset 3: Spongilla lacustris (Freshwater Sponge)

#### Overview
Represents one of the earliest-diverging multicellular animals (Porifera), providing insights into ancient immune mechanisms and demonstrating reference-free discovery in organisms with incomplete reference genomes.

#### Dataset Specifications

**Evolutionary Context:** 

- **Phylum:** Porifera (sponges)
- **Divergence:** ~700 million years ago
- One of earliest branching animals
- Lacks complex organs but has specialized cells

**Sequencing Data:** 


**10x Chromium scRNA-seq:** 

- **Four individual sponges** sequenced
- Captures cellular diversity
- Multiple cell types identified

**Genomic Data (Musser Lab):** 

- PacBio long-read genome assembly
- PacBio IsoSeq (full-length transcripts)
- Illumina short-read sequencing
- SRA accession numbers pending publication

**Additional Genomic Data:** 

- PacBio data from Edmonton, Canada
- **SRA Project:** PRJEB58939
- Independent genome assembly for validation

#### Cell Types Identified

**1. Granulocytes:** 

- Immune-like cells
- Contain granules
- Express GranRep genes
- Marker: ACP5 (acid phosphatase 5)

**2. Amoebocytes:** 

- Mobile cells
- Immune function
- Phagocytic capability
- Express specific GranRep variants

**3. Other Cell Types:** 
'
- Pinacocytes (outer layer)
- Choanocytes (feeding cells)
- Archeocytes (stem-like)
- Sclerocytes (skeleton)

#### Major Discovery: GranRep Gene Family

**Discovery Process:** 

1. sc-SPLASH identified "granny" anchor with high target diversity
2. Anchor showed cell-type-specific expression
3. Compactors assembled longer sequences
4. Revealed 30-bp repeat structure
5. Identified five-gene family

**GranRep Gene Characteristics:**  


**Gene Family:** 

- **GranRep1** and **GranRep2:** Linked on same genomic contig
- **GranRep3:** Independent locus
- **GranRep4** and **GranRep5:** Linked, allelic to GranRep3

**Gene Structure (All Five Genes):** 

- **Exon 1:** Signal peptide
- **Exon 2:** Linking sequence
- **Exon 3:** Main functional domains
  - Granny repeat region (30-bp repeats)
  - Lysine-rich region
  - C-terminal repeats (18-bp repeats)

**Encoded Protein Features:** 

- **Signal peptide:** Indicates secretion
- **10-amino acid granny repeats:** Variable number
- **Lysine-rich region:** Positive charge
- **6-amino acid C-terminal repeats:** Additional structure
- **O-glycosylation predicted:** Post-translational modification

**Sequence Diversity:** 

- High diversity across granny repeats
- Multiple sequence alignment shows variation
- 2-6 alleles per gene found across four individuals
- Target diversity entropy indicative of functional diversification

**Expression Patterns:**
**Cell-Type Specificity:** 

- **Granulocytes:** Primarily express GranRep1 and GranRep2
- **Amoebocytes:** Primarily express GranRep3
- Differential expression suggests specialized functions

**Quantification:** 

- Normalized expression: (aligned reads / UMI count) × 10^5
- Clear separation between cell types
- Specific cells show high expression (>10 reads, normalized expression ≥5)

**Validation by RNA-FISH:** 

- HCR (Hybridization Chain Reaction) RNA-FISH performed
- Probe sets designed against different granny versions
- **Co-localization** with ACP5 (granulocyte marker)
- Confirms granulocyte expression
- Yellow signal (granny) overlaps red signal (ACP5)

**Critical Finding:** 

**GranRep genes were ABSENT from the reference genome assembly!** 


This demonstrates:
- Power of transcriptome-based discovery
- Limitations of genome assemblies, even with long reads
- sc-SPLASH discovers biology invisible to reference-based methods
- Importance of reference-free approaches for non-model organisms

**Functional Hypotheses:** 


**Immune Function:** 

- Expression in immune-like cells (granulocytes, amoebocytes)
- Secreted proteins (signal peptide)
- Repeat structure common in immune receptors
- O-glycosylation typical of extracellular proteins

**Pattern Recognition:** 

- Repeat proteins often bind pathogens
- Variable regions may recognize different targets
- Similar to pattern recognition receptors (PRRs)

**Evolutionary Significance:** 

- Ancient immune mechanism in early animals
- Predates adaptive immunity
- Innate immune system component
- Diversification through repeat variation

**Comparative Biology:** 

- Parallel to vertebrate toll-like receptors (TLRs)
- Similar to invertebrate fibrinogen-related proteins (FREPs)
- Represents convergent evolution of repeat-based immunity

#### Biological Context

**Sponge Biology:** 

- Filter feeders
- Constant pathogen exposure
- No adaptive immune system
- Rely on innate immunity

**Cellular Immunity:** 

- Granulocytes and amoebocytes are key immune cells
- Phagocytosis of bacteria
- Recognition of non-self
- Inflammatory responses

**Ecological Context:** 

- Freshwater environment
- Diverse microbial communities
- Host-microbe interactions
- Symbiotic bacteria

---

### Dataset 4: Ciona robusta (Tunicate/Sea Squirt)

#### Overview
Tunicates are the closest living invertebrate relatives to vertebrates (Phylum Chordata), making them crucial for understanding vertebrate evolution. Ciona provides insights into chordate development and immune system origins.

#### Dataset Specifications

**Evolutionary Context:** 

- **Phylum:** Chordata
- **Subphylum:** Tunicata (Urochordata)
- **Sister group to vertebrates** 

- Shared chordate features: notochord, dorsal nerve cord, pharyngeal slits

**Taxonomy Note:** 

Formerly known as *Ciona intestinalis*, now recognized as *Ciona robusta* (Type A) and *Ciona intestinalis* (Type B) - distinct species.

**Sequencing Data:** 


**1. 10x Chromium scRNA-seq:** 

- **SRA Accession:** SRP198321
- Multiple developmental stages
- Thousands of cells per stage
- Comprehensive cellular diversity

**2. Developmental Time Course:** 

- **SRA Accessions:** SRP339256, DRP003810
- Early embryo through larva stages
- Captures development progression
- Multiple time points

**Developmental Stages Covered:** 

- Early embryo
- Gastrula
- Neurula
- Tail-bud stage (early, mid, late)
- Larva
- Metamorphosis
- Juvenile

#### Major Discovery: YYD Repeat Protein

**Discovery Process:** 

1. sc-SPLASH queried marine invertebrates
2. Searched for high-diversity anchors in repeats
3. Top hit: Anchor TGACAACAAAGCCGATGGTTACTATGA
4. Found in *Ciona robusta* 10x data
5. Moderate entropy: 4.80-5.97
6. Dozens of distinct targets

**Gene Identification:**  
- NCBI BLASTN of anchor finds two *C. robusta* genes
- Genes encode secreted proteins
- Contain YYD repeat motifs
- Similar domain structure to Spongilla GranReps

**Protein Structure:**  
- **N-terminus:** Signal peptide (secreted protein)
- **Repeat region:** Variable YYD-containing repeats
- **Additional domains:** To be characterized
- **Post-translational modifications:** Likely glycosylation

**Sequence Diversity:**  
- Multiple sequence alignment shows high diversity
- Variable repeat number
- Allelic variation
- Target sequences differ substantially

**Expression Patterns:**  

**Developmental Timing:**  
- Not detected in early embryo
- First appears at **late tail-bud stage**  
- More prevalent in **larva**  
- Peaks during **metamorphosis** (early rotation stage)
- Expressed in **juvenile** stage

**Temporal Dynamics:**  
- Expression increases through development
- Peak during metamorphosis
- Suggests role in development or immunity during transition

**Cell Type Expression:** 

**10x Developmental Data:** 

- Multiple annotated cell types show expression
- Predominantly from **mesenchyme** 
- Some cells designated only by number
- **1,221 unannotated cells** form largest category

**RNA-FISH Validation (Juvenile Stage):** 

- Performed at juvenile stage (post-metamorphosis)
- **Expression limited to circulating hemocytes** 
- Found within hemolymph vessels
- Hemocytes are immune cells

**Immune Cell Connection:** 

- Ciona hemocytes implicated in immune defense
- Multiple hemocyte types exist
- Functions include:
  - Phagocytosis
  - Encapsulation
  - Cytotoxicity
  - Pattern recognition

**Parallel to Spongilla:** 

**Striking similarity:** 

- Both organisms: Aquatic filter-feeders
- Both genes: Secreted repeat proteins
- Both locations: Immune-type cells
- Spongilla: Granulocytes and amoebocytes
- Ciona: Hemocytes
- **Phylogenetic distance:** Porifera vs. Chordata

**Convergent Evolution:** 

- Independent evolution of repeat proteins in immune cells
- Suggests fundamental importance of this strategy
- Ancient mechanism preserved across animal kingdom

#### Trans-Splicing Discovery

**Biological Context:** 

Trans-splicing joins exons from separate pre-mRNA molecules (vs. cis-splicing from same molecule).

**Ciona Trans-Splicing:** 

- Well-documented in tunicates
- Spliced leader (SL) addition common
- Important for gene regulation
- Creates complexity beyond genome

**sc-SPLASH Detection:** 

- Reference-free identification of trans-splicing
- Anchors at trans-splice junctions
- Targets represent alternative trans-splice partners
- Validates known biology

**Significance:** 

- Demonstrates sc-SPLASH handles complex splicing
- Trans-splicing difficult for standard aligners
- Reference-free approach advantageous

#### Additional Biological Insights

**Cell Type Complexity:** 

- Mesenchyme cells diverse and understudied
- Many unannotated cells (1,221)
- sc-SPLASH helps characterize cryptic cell types
- Discovery-driven annotation

**Developmental Regulation:** 

- Gene expression changes across development
- Metamorphosis is critical transition
- Adult immune system establishment
- sc-SPLASH tracks dynamic changes

**Evolutionary Biology:** 

- Chordate immune system origins
- Shared features with vertebrates
- Unique tunicate-specific features
- Model for studying vertebrate evolution

---

### Dataset 5: Electric Eel Muscle (Spatial)

#### Overview
Demonstrates sc-SPLASH applicability to non-human vertebrate tissues using spatial transcriptomics.

#### Dataset Specifications

**Species:** *Electrophorus electricus*

**Platform:** 10x Visium spatial transcriptomics

**Data Source:** 

- **SRA Accession:** SRP432489
- **Samples:** P4_ST_vis_rep1, P4_ST_vis_rep2
- Biological replicates

**Biological Context:** 

- Electric organ modified muscle tissue
- Specialized for electrical discharge
- Unique cellular organization
- Model for studying muscle specialization

**Analysis:** 

- Spatial patterns of sequence variation
- Muscle-specific splicing
- Electrocyte vs. muscle comparison
- Reference-free discovery in non-model vertebrate

---

## TECHNICAL METHODS AND INNOVATIONS

### BKC: Barcoded K-mer Counter

**Purpose:** Optimized preprocessing for barcoded single-cell data

**Key Features:** 


**1. Cell Barcode Extraction:** 

- 16-bp cell barcodes from read 1 (10x Chromium)
- Whitelist-based error correction
- Filters invalid barcodes
- Assigns reads to cells

**2. UMI Deduplication:** 

- 12-bp UMIs from read 1
- Collapses PCR duplicates
- Graph-based UMI clustering
- Retains biological variation

**3. K-mer Counting:** 

- Anchor-target tuple enumeration
- Barcoded records: (sample, cell, anchor, target, count)
- Efficient memory usage
- Parallel processing

**Performance:** 

- **43× faster than UMI-tools** 

- Lower memory footprint
- Scales to millions of cells
- Standalone tool (can be used independently)

### Statistical Framework

**Stage 1: Parsing and Counting (BKC)** 

- Extract cell barcodes and UMIs
- Deduplicate reads
- Count anchor-target pairs per cell
- Output barcoded SATC format

**Stage 2: Statistical Analysis** 

- Construct contingency tables (anchors × cells × targets)
- **Sparse matrix representation** (critical for memory efficiency)
- Compute p-values using OASIS framework
- Each anchor gets a p-value

**Stage 3: Multiple Testing Correction** 

- Benjamini-Hochberg FDR control
- Identifies statistically significant anchors
- Filters for effect size and abundance

**Optional: Supervised Analysis** 

- Uses cell type metadata when available
- L1-regularized logistic regression
- Identifies cell-type-specific anchors
- Distinguishes metadata-dependent from cell-level regulation

### Assembly: Extendors

**Concept:** Extend anchors to longer sequences for biological characterization

**Method:** 

- Similar to compactors but for single-cell data
- Probabilistic assembly from anchors
- Multiple extendors per anchor when variation exists
- Longer sequences enable functional analysis

**Applications:** 

- Pfam domain identification
- Protein structure prediction
- Alignment to references (when available)
- Functional annotation

---

## COMPARATIVE ANALYSES

### Performance Benchmarking

**sc-SPLASH vs. Cell Ranger:** 

- Tested on Tabula Sapiens samples
- Ordered by increasing size
- sc-SPLASH consistently faster
- Lower memory usage

**sc-SPLASH vs. STARsolo:** 

- STARsolo: Modern, efficient aligner
- sc-SPLASH: Reference-free alternative
- Speed advantage maintained
- Additional discoveries (unannotated features)

**BKC vs. UMI-tools:** 

- UMI-tools: Standard for UMI deduplication
- BKC: 43× faster
- Equivalent accuracy
- Integrated with SPLASH pipeline

### Discovery Comparison

**Gene Expression (Standard):** 

- Quantifies known genes
- Reference-dependent
- Misses unannotated features
- Limited to gene-level

**sc-SPLASH (This Study):** 

- Discovers known + unknown
- Reference-free
- Multiple biological mechanisms
- Isoform-level resolution

**Complementary Approaches:** 

Both provide value:
- Use gene expression for standard analysis
- Use sc-SPLASH for discovery
- Integration reveals complete picture

---

## DATA PROCESSING WORKFLOWS

### Standard 10x Pipeline (Cell Ranger)
```
Raw FASTQ → Cell Ranger → 
Barcode/UMI processing → 
Alignment to reference → 
Gene expression matrix → 
Downstream analysis
```

### sc-SPLASH Pipeline
```
Raw FASTQ → BKC →
Barcode/UMI processing → 
Anchor-target counting (no alignment) →
Statistical testing →
Biological classification →
Downstream analysis
```

**Key Differences:** 

- sc-SPLASH skips alignment
- Works without reference
- Unified discovery framework
- Faster preprocessing (BKC)

---

## BIOLOGICAL INSIGHTS ACROSS DATASETS

### Universal Findings

**1. V(D)J Recombination:** 

- Detected in all human datasets
- Tissue-specific patterns
- Immune repertoire diversity
- Beyond standard immune cells

**2. Alternative Splicing:** 

- Cell-type-specific patterns
- Spatial regulation
- Novel isoforms discovered
- Both model and non-model organisms

**3. Immune Repeat Proteins:** 

- Spongilla: GranReps in granulocytes/amoebocytes
- Ciona: YYD protein in hemocytes
- Convergent evolution across phyla
- Ancient immune mechanism

### Novel Biology Discovered

**1. Absent from Reference:** 

- Spongilla GranRep genes
- Demonstrates reference limitations
- Transcriptome-first discovery
- Impossible with alignment-based methods

**2. Unexpected Findings:** 

- HIV in human heart cells (Donor 12)
- Opportunistic pathogen detection
- Clinical relevance

**3. Cross-Species Patterns:** 

- Repeat proteins in immune cells
- Conserved across phyla
- Secreted, O-glycosylated
- Pattern recognition role

---

## COMPUTATIONAL RESOURCES

### Memory Requirements

**Factors:** 

- Number of cells
- Sequencing depth per cell
- Number of genes expressed
- Target diversity per anchor

**Typical Usage:** 

- Small datasets (1,000 cells): <5 GB
- Medium datasets (10,000 cells): 10-20 GB
- Large datasets (100,000+ cells): 50-100 GB
- Sparse matrix representation critical

### Storage Requirements

**Input:** 

- FASTQ files (100 GB - 1 TB typical for 10x)

**Output:** 

- SATC files (compact)
- Results tables (small)
- Total: <10 GB typically

**Advantage:** No BAM files needed

### Processing Time

**Tabula Sapiens Samples:** 

- Variable by tissue/cell count
- Hours to days per tissue
- Parallelizable across tissues
- Much faster than alignment pipelines

---

## DATA AVAILABILITY

### Public Data Access

**Human Datasets:** 

- Tabula Sapiens: https://tabula-sapiens-portal.ds.czbiohub.org/
- SRA accessions for spatial data: SRP284357, SRP262989, SRP432489

**Ciona Datasets:** 

- 10x data: SRP198321
- Time course: SRP339256, DRP003810

**Spongilla Datasets:** 

- Musser Lab PacBio: Accession pending
- Edmonton PacBio: PRJEB58939

**Software:** 

- GitHub: https://github.com/refresh-bio/SPLASH
- sc-SPLASH integrated into SPLASH2
- BKC available standalone

---

## IMPACT AND FUTURE DIRECTIONS

### Immediate Applications

**1. Immune Repertoire Analysis:** 

- V(D)J discovery in any 10x dataset
- No specialized library prep
- IgBLAST integration
- Clonal expansion tracking

**2. Non-Model Organism Discovery:** 

- Applicable to any organism
- No reference required
- Novel gene discovery
- Evolutionary studies

**3. Spatial Biology:** 

- Sequence variation mapping
- Tissue architecture relationships
- Tumor heterogeneity
- Microenvironment interactions

**4. Clinical Applications:** 

- Pathogen detection
- Tumor mutation profiling
- Immune repertoire diagnostics
- Treatment response prediction

### Future Development

**1. Enhanced Assembly:** 

- Longer extendors
- Integration with long-read data
- Complete transcript reconstruction

**2. Multi-Modal Integration:** 

- Combine with CITE-seq
- Integrate with ATAC-seq
- Spatial multi-omics

**3. Clinical Validation:** 

- Diagnostic applications
- Biomarker validation
- Treatment selection
- Disease monitoring

**4. Expanded Organisms:** 

- More non-model organisms
- Agricultural species
- Conservation biology
- Ecological studies

---

## SUMMARY

The sc-SPLASH datasets demonstrate:

1. **Scalability to millions of cells** while maintaining reference-free discovery

2. **Model organism validation** (human) with rediscovery of known biology (V(D)J, splicing, trans-splicing)

3. **Non-model organism discovery** (sponge, tunicate) revealing novel genes absent from references

4. **Spatial transcriptomics** enabling tissue-context discovery

5. **Cross-species insights** showing convergent evolution of immune mechanisms

6. **Computational efficiency** through BKC and optimized pipeline

7. **Biological breadth** from immune repertoires to developmental biology to cancer

The study establishes sc-SPLASH as a transformative tool for single-cell genomics, democratizing discovery across the tree of life by removing the reference genome bottleneck while maintaining statistical rigor and biological interpretability.
