# Datasets Used in "SPLASH: A statistical, reference-free genomic algorithm unifies biological discovery"

**Study:** Chaung K, Baharav TZ, Henderson G, Zheludev IN, Wang PL, Salzman J (2023)

**Publication:** Cell 186, 5440–5456 (2023), doi:10.1016/j.cell.2023.10.028

---

## Overview

The original SPLASH publication established the foundational paradigm for reference-free, statistics-first genomic discovery. The study demonstrated that diverse biological phenomena—viral evolution, alternative splicing, immune receptor diversity, and regulation in non-model organisms—could be unified under a single analytical framework detecting sample-specific sequence variation.

**Core Innovation:** SPLASH analyzes raw sequencing reads directly using k-mer composition and statistical testing to identify "anchors" (constant sequences) followed by "targets" (variable sequences) with sample-dependent distributions.

---

## Dataset 1: SARS-CoV-2 Viral Evolution

### Overview
SPLASH was applied to SARS-CoV-2 patient samples to demonstrate reference-free detection of strain-defining mutations during the COVID-19 pandemic.

### Dataset Specifications

**Two Geographic Cohorts:**

#### A. South Africa Dataset
**Context:**

- Site of Beta variant emergence (B.1.351)
- Site of Omicron variant emergence (B.1.1.529)
- Critical for global surveillance

**Strains Present:**

- **Original SARS-CoV-2** (ancestral/Wuhan strain)
- **Delta variant** (B.1.617.2)
- **Omicron BA.1** (B.1.1.529)
- **Omicron BA.2** (B.1.1.529 sub-lineage)

**Sample Characteristics:**

- Patient samples collected during multiple waves
- Represents strain transition periods
- No prior strain assignment required by SPLASH

#### B. France Dataset
**Context:**

- European surveillance data
- Represents Delta and Omicron spread in different population

**Strains Present:**

- Delta variant (B.1.617.2)
- Omicron variants (BA.1, BA.2)
- Original strain

**Sample Collection:**

- December 2021 - January 2022 (Omicron emergence)
- Earlier time points for Delta

### SPLASH Analysis Approach

**Reference-Free Strain Detection:**

- No reference genomes provided to SPLASH
- No sample metadata about strain identity
- Algorithm detects strain differences purely from sequence variation statistics

**Key Findings:**

**1. Strain-Defining Mutation Detection:**

**South Africa Results:**

- **98% precision (126/128)** of SPLASH-identified anchors were strain-defining
- Compared to **3.5% (7/201)** in control set
- Hypergeometric p-value < 1.7E-79

**France Results:**

- **100% precision (39/39)** of SPLASH anchors were strain-defining
- Compared to **8.4% (21/250)** in control set
- Hypergeometric p-value < 2.6E-33

**Control Set:** Most abundant anchors (regardless of strain specificity) - demonstrates SPLASH is not just detecting abundant sequences

**2. Specific Mutations Identified:**

**Major Lineage Discrimination (Example from paper):**

- **Anchor distinguishes Delta vs. Omicron**
- Target 1: No mutations (consistent with Delta)
- Target 2: K417N mutation (found in all Omicron strains, not in Delta/Original)
- Target abundances match strain metadata perfectly

**Sub-Lineage Discrimination (Example from paper):**

- **Anchor discriminates Omicron BA.1 vs. Delta**
- Target 1: No mutation (Delta)
- Target 2: 3-nt deletion (NL211I) + 9-nt insertion (R214REPE) - characteristic of Omicron BA.1
- Not present in Delta or Original strains

**3. Focus on Spike Protein:**
Most mutations detected in Spike (S) gene region:

- Most critical for viral entry
- Target of neutralizing antibodies
- Under strongest selective pressure
- Defines variants of concern (VOCs)

**Biological Significance:**

**Rapid Variant Detection:**

- SPLASH identified strain differences without:
  - Reference genomes
  - Sample metadata
  - Prior knowledge of variant mutations
  - Alignment to consensus sequences

**Clinical/Public Health Applications:**

- Real-time variant surveillance
- No need for variant-specific primers/panels
- Detects novel mutations not in databases
- Applicable to emerging variants immediately

**Outbreak Tracking:**

- Geographic spread patterns
- Transmission chains
- Variant competition dynamics
- Emergence of new sub-lineages

### Technical Details

**Sequencing Platform:** Illumina short-read sequencing

**SPLASH Parameters:**

- Anchor length: 27 nucleotides
- Target length: 27 nucleotides
- Gap: Variable (default 0)
- Statistical test: OASIS framework

**Validation:**

- Compared to CoVariants.org database
- Confirmed by Sanger sequencing
- Cross-referenced with metadata (post-hoc)

---

## Dataset 2: Human Single-Cell RNA-Sequencing

### Overview
Demonstration of SPLASH's ability to discover regulated RNA isoforms at single-cell resolution using Smart-seq2 plate-based scRNA-seq.

### Dataset Specifications

**Technology:** Smart-seq2 (full-length transcript sequencing)

**Sample Type:** Human cells from multiple tissues/contexts

**Key Advantage:** Smart-seq2 provides full-length transcript coverage, enabling isoform analysis unlike 10x droplet-based methods (which capture only 3' or 5' ends)

### Applications Demonstrated

#### A. Alternative Splicing Discovery

**Context:**

- Different cell types express different isoforms
- Alternative splicing regulates protein function
- Critical for cell identity and function

**SPLASH Detection:**

- Anchors identify splice junctions
- Targets represent alternative splice forms
- Statistical significance indicates regulated splicing

**Findings:**

- Cell-type-specific isoform patterns
- Tissue-specific splicing programs
- Novel splicing events not in annotations

#### B. RNA Editing Detection

**Context:**

- A-to-I editing by ADAR enzymes
- C-to-U editing by APOBEC
- Generates sequence diversity at RNA level

**SPLASH Detection:**

- Anchors flank editing sites
- Targets differ by edited nucleotide
- Sample-dependent editing patterns

**Example Applications:**

- Neuron-specific editing
- Development stage-specific editing
- Cell-type-specific editing programs

### Biological Insights

**Cell Type Resolution:**

- SPLASH operates at single-cell level
- Reveals heterogeneity within populations
- Identifies rare cell types with unique regulation

**Isoform Discovery:**

- Many novel isoforms detected
- Not dependent on annotation quality
- Discovers cryptic exons and splice sites

---

## Dataset 3: Adaptive Immune Receptor Diversity

### Overview
Analysis of antibody (immunoglobulin) and T-cell receptor (TCR) repertoires demonstrating SPLASH's ability to capture extreme sequence diversity.

### Dataset Specifications

**Source:** Human B cells and T cells

**Platform:** Smart-seq2 single-cell RNA-seq

**Biological Context:**

- V(D)J recombination creates millions of unique sequences
- Each cell has unique antibody or TCR
- Diversity critical for immune function

### V(D)J Recombination Analysis

**Process:**

- Variable (V), Diversity (D), and Joining (J) gene segments recombine
- Creates unique complementarity-determining regions (CDRs)
- Junctional diversity adds further variation
- Each lymphocyte has unique receptor

**SPLASH Detection:**

**Anchor Location:**

- Constant regions (shared across all cells)
- Framework regions (partially conserved)

**Target Location:**

- CDR3 regions (highly diverse)
- V(D)J junctions (unique recombination sites)
- Variable domains (allelic diversity)

**Key Findings:**

**Immunoglobulin Analysis:**

- **Ig heavy chain** and **Ig light chain** detected
- Anchors in constant regions have high target diversity
- Highest entropy anchors correspond to CDR regions
- **Lambda 5 (λ5) surrogate light chain** also detected
  - Associates with heavy chain before light chain rearrangement
  - Proof-of-principle of SPLASH sensitivity

**TCR Analysis:**

- T-cell receptor α and β chains
- Extreme diversity in CDR3 regions
- Cell-specific receptor sequences
- Clonotype identification

### Biological Significance

**Immune Repertoire Profiling:**

- Complete diversity catalog without:
  - Specialized V(D)J-specific pipelines
  - Reference databases of V/D/J segments
  - Prior knowledge of recombination sites

**Clonal Expansion:**

- Identifies expanded clones (same receptor in multiple cells)
- Tracks immune responses
- Disease-associated repertoires

**Clinical Applications:**

- Cancer immunotherapy monitoring
- Autoimmune disease characterization
- Vaccine response assessment
- Transplant compatibility

---

## Dataset 4: Octopus (Octopus bimaculoides)

### Overview
Application to a non-model organism demonstrating SPLASH's power when reference genomes are incomplete or misassembled.

### Dataset Specifications

**Species:** *Octopus bimaculoides* (California two-spot octopus)

**Data Type:** Bulk RNA-sequencing

**Sample Source:**

- Multiple tissues from single individual
- Variety of specialized tissues
- Focus on nervous system and sensory organs

**Reference Genome Status:**

- Recently assembled (2015)
- Known to have gaps and misassemblies
- Incomplete gene annotations
- Complex genome organization

### Biological Context

**Octopus as a Model:**

- Most complex nervous system among invertebrates
- Exceptional sensory capabilities
- High levels of RNA editing (unusual)
- Camouflage and adaptive behaviors
- Large genome with unique features

**RNA Editing in Octopus:**

- Unusually high A-to-I editing rates
- Extensive editing in neuronal transcripts
- Potentially adaptive for rapid neural plasticity
- Editing recodes protein sequences

### Major Discovery: Myo-VIIa Alternative Transcripts

**Gene:** Myosin-VIIa motor protein

**Human Homolog Context:**

- MYO7A mutations cause **Usher syndrome** (deafness and blindness)
- Critical for sensory organ function
- Inner ear hair cells and retinal photoreceptors

**SPLASH Findings:**

**Alternative First Exons:**

- Two distinct first exons identified
- **Target 1:** Broadly expressed across tissues
- **Target 2:** **Exclusively expressed in statocyst**

**Statocyst Specificity:**

- Statocyst is octopus sensory organ for **sound and balance**
- Analogous to vertebrate inner ear
- Critical finding: tissue-specific isoform in sensory organ

**Reference Genome Problems:**

- **Anchor and exon 2 MISSING** from *O. bimaculoides* genome assembly
- Found in closely related *O. sinensis* genome
- Both targets present in both genomes
- Statocyst-specific transcript NOT ANNOTATED in either genome
- *O. sinensis* assembly has Myo-VIIa gene broken into two inverted pieces

**Biological Significance:**

**Functional Homology:**

- Suggests conserved gene function across phyla
- Octopus statocyst ↔ Vertebrate inner ear
- Same gene, sensory organ-specific expression
- Parallel evolution of sensory systems

**Discovery Implications:**

- SPLASH discovered this WITHOUT relying on reference
- Reference-based methods would have missed it
- Demonstrates incomplete genome problem
- Shows power for non-model organisms

### Additional Octopus Findings

**1. RNA Editing:**

- Netrin receptor: Variation consistent with A-to-I editing
- Axon guidance and apoptosis functions
- Potentially allelic variation vs. editing

**2. Allelic Variation:**

- **Carboxypeptidase D:** 13-nt deletion polymorphism
- **Upf2 (nonsense-mediated decay):** CAG repeat polymorphism
- Differential allelic expression

**Note on Analysis:**
Study focused on anchors where **no more than one target mapped to reference** - deliberately showcasing discoveries impossible for reference-based methods. Many more findings consistent with reference were observed but not highlighted.

---

## Dataset 5: Eelgrass (Zostera marina)

### Overview
Marine angiosperm (flowering plant) adapted to oceanic environments, demonstrating SPLASH on ecologically important non-model plant.

### Dataset Specifications

**Species:** *Zostera marina* (eelgrass)

**Ecological Importance:**

- Most widely distributed seagrass globally
- Critical for coastal ecosystems
- Carbon sequestration ("blue carbon")
- Nursery habitat for fish
- Erosion control
- Impacted by climate change

**Sequencing Design:**

**Geographic Locations:**

1. **Montpellier, France** (Mediterranean climate)
2. **Rovika, Norway** (near-arctic climate)

**Temporal Sampling:**

- **Two seasons:** Winter (December) and Summer (June)
- **Two time points:** Day and Night

**Total Conditions:** 2 locations × 2 seasons × 2 times = 8 sample groups

**Data Type:** Bulk RNA-sequencing

**Reference Genome:**

- *Zostera marina* genome available but incomplete
- Complex polyploid genome
- Incomplete annotations
- Environmental adaptations poorly characterized

### Major Discovery: Epiphytic Diatom Association

**Key Finding:**
Many sequences detected by SPLASH came from **epiphytic diatoms** (microscopic algae) growing on eelgrass surfaces, not from eelgrass itself!

**Diatom Characteristics:**

- Single-celled photosynthetic algae
- Form biofilms on plant surfaces (epiphytes)
- Microbiome component
- Ecological relationships with host plant

**Geographic and Seasonal Variation:**

**Example 1: HMG Box Domain Protein**

**Target 1:**

- Found **only in Norway/December** samples
- Specific nucleotide sequence

**Target 2:**

- Found **only in France/June** samples
- Several nucleotide differences from Target 1
- Result in two amino acid differences

**BLASTP Analysis:**

- Both targets match diatom HMG box proteins
- Different diatom species
- Geographic/seasonal-specific diatom communities

**Example 2: Ferredoxin**

**Sequence Variation:**

- Silent single nucleotide polymorphism (no amino acid change)
- Both targets match ferredoxin from diatom species

**Biological Interpretation:**

- Different diatom species or strains
- Geographic distribution patterns
- Seasonal succession
- Environmental adaptation

### Eelgrass-Specific Findings

**Beyond Diatoms:**
While the highlighted examples focused on diatom sequences (to show unexpected discovery), SPLASH also detected:

1. **Allelic variation** in eelgrass genes
2. **Alternative splicing** in eelgrass transcripts
3. **Gene expression** differences by location/season

**Note:** Study focused on non-reference-mapping anchors, so many eelgrass findings consistent with genome were not highlighted.

### Ecological and Climate Significance

**Climate Change Context:**

- Eelgrass meadows declining globally
- Ocean warming impacts
- Sea level rise effects
- Need to understand adaptive capacity

**SPLASH Applications:**

- **Adaptation mechanisms:** Geographic variation suggests local adaptation
- **Microbiome interactions:** Diatom associations may be functional
- **Environmental responses:** Day/night and seasonal patterns
- **Conservation genomics:** Genetic diversity assessment

**Metagenomic Discovery:**

- SPLASH revealed multi-organism community
- Without targeted analysis
- Microbiome characterization as byproduct
- Ecological interactions visible in transcriptome

---

## Cross-Dataset Insights

### Unified Analytical Framework

**Diverse Biological Phenomena Detected:**
1. **Viral evolution** (SARS-CoV-2 mutations)
2. **Alternative splicing** (human isoforms)
3. **RNA editing** (octopus and human)
4. **V(D)J recombination** (immune receptors)
5. **Allelic variation** (octopus, eelgrass)
6. **Tissue-specific expression** (octopus Myo-VIIa)
7. **Geographic variation** (eelgrass/diatoms)
8. **Seasonal variation** (eelgrass/diatoms)
9. **Species interactions** (eelgrass-diatom)

**Single Algorithm:** All detected by same untuned SPLASH pipeline

### Reference-Free Power Demonstrated

**Where References Failed:**

- **Octopus:** Gene missing from genome assembly
- **Eelgrass:** Diatom sequences unexpected
- **SARS-CoV-2:** Novel mutations not in databases
- **Human immune:** Extreme diversity at junctions

**Where References Not Needed:**

- Strain typing without prior variant knowledge
- Isoform discovery without splice databases
- Species identification without targeted primers

### Scale and Efficiency

**Dataset Sizes:**

- **SARS-CoV-2:** 100s of patient samples
- **Human scRNA-seq:** 100s-1000s of single cells
- **Bulk RNA-seq:** Multiple tissues/conditions

**Computational Performance:**

- Runs in hours to days on standard hardware
- Processes FASTQ files directly
- No alignment bottleneck
- No intermediate BAM files

---

## Statistical Framework: OASIS

### Integration with SPLASH

SPLASH's statistical rigor comes from **OASIS (Optimized Adaptive Statistic for Inferring Structure)**, a novel statistical test for contingency tables.

**Key Properties:**

1. **Closed-form p-values:** No permutation testing required
2. **Finite-sample validity:** Rigorous for any sample size
3. **Computationally efficient:** Fast calculation
4. **Interpretable:** Decomposes signal for biological insight

**Application in SPLASH:**

- Each anchor generates a contingency table
- Rows = samples
- Columns = targets
- Values = counts
- OASIS tests for sample-dependent target distribution

---

## Data Availability

### Public Data

**SARS-CoV-2:**

- Sequences available from GISAID
- Metadata from public health databases
- Strain assignments from CoVariants.org

**Human scRNA-seq:**

- Publicly available datasets
- Specific SRA accessions in supplementary materials

**Octopus:**

- RNA-seq data from published studies
- Genome assembly: NCBI
- Original data from Albertin et al. (2015) Nature study

**Eelgrass:**

- RNA-seq from published climate adaptation studies
- Genome assembly available
- Likely from Jueterbock et al. and related studies

### Software

**SPLASH Pipeline:**

- GitHub: https://github.com/salzman-lab/SPLASH (original Python implementation)
- Containerized Nextflow pipeline
- Docker/Singularity support
- Minimal installation requirements

**OASIS:**

- Integrated into SPLASH
- Standalone implementation available
- Mathematical framework in accompanying PNAS paper

---

## Methodological Details

### SPLASH Workflow

**Stage 1: K-mer Extraction**

- Parse FASTQ files
- Extract all k-mers (anchors)
- Extract downstream k-mers (targets, offset by gap)
- Count anchor-target pairs per sample

**Stage 2: Statistical Testing**

- Build contingency tables per anchor
- Apply OASIS test
- Calculate p-values
- Multiple testing correction (Benjamini-Hochberg)

**Stage 3: Biological Classification**

- Map significant anchors to genome (optional)
- Classify by mechanism (splicing, editing, mutation, etc.)
- Protein domain profiling
- Functional annotation

### Parameters

**Default Settings:**

- **k (anchor/target length):** 27 nucleotides
- **R (gap):** 0 nucleotides (adjustable)
- **Minimum anchor count:** 10 reads
- **FDR threshold:** 0.05

**Tuning:**

- Same parameters used across all datasets
- No task-specific optimization
- Demonstrates generality

---

## Validation Strategies

### SARS-CoV-2

- **Database comparison:** CoVariants.org
- **Metadata validation:** Strain assignments
- **Sanger sequencing:** Selected mutations confirmed

### Human scRNA-seq

- **Known biology:** Recapitulates published findings
- **Marker genes:** Cell type-specific patterns
- **IgBLAST:** V(D)J annotation confirmation

### Octopus

- **Comparative genomics:** *O. sinensis* validation
- **Functional homology:** Human MYO7A comparison
- **Literature:** RNA editing databases

### Eelgrass

- **BLASTP:** Diatom identity confirmation
- **Pfam:** Protein domain validation
- **Geographic coherence:** Patterns make biological sense

---

## Impact and Significance

### Paradigm Shift

**From:**

- Align reads → Call variants/isoforms/editing sites
- Separate tools for each phenomenon
- Reference-dependent
- Annotation-dependent
- Computationally intensive

**To:**

- Statistical detection of variation → Classify mechanism
- Unified framework
- Reference-free
- Discovers unannotated features
- Efficient computation

### Novel Biological Discoveries

**Published Findings:**

1. **Octopus Myo-VIIa:** Statocyst-specific isoform (gene missing from assembly)
2. **Eelgrass diatoms:** Unexpected community members with geographic/seasonal patterns
3. **SARS-CoV-2:** Strain discrimination without prior knowledge
4. **Human immune:** Expanded λ5 detection

**Broader Implications:**

- Existing datasets have undiscovered biology
- Reference genomes are incomplete
- Communities and interactions matter
- Geographic and temporal variation is pervasive

### Democratization of Genomics

**Enables:**

- Non-model organism studies
- Under-resourced laboratories
- Rapid pathogen surveillance
- Ecological genomics
- Conservation genomics

**Removes Barriers:**

- No need for high-quality reference
- No specialized bioinformatics per application
- Accessible to non-experts
- Open-source software

---

## Future Directions Enabled

### Additional Biological Contexts

- More non-model organisms
- Environmental samples
- Ancient DNA
- Metagenomic communities
- Spatial transcriptomics

### Enhanced Capabilities

- Long-read sequencing integration
- Protein diversity (future)
- Epigenetic variation
- Chromosome-level variation
- Cross-species comparisons

### Clinical Translation

- Diagnostic applications
- Therapeutic monitoring
- Precision medicine
- Outbreak response
- Drug resistance tracking

---

## Summary

The original SPLASH publication established a foundational paradigm shift in genomics:

**Core Insight:** Diverse biological phenomena share a common statistical signature—sample-specific sequence variation—enabling unified discovery.

**Key Datasets:**

1. **SARS-CoV-2:** Viral strain evolution and mutation detection
2. **Human scRNA-seq:** Isoform discovery and immune repertoire profiling
3. **Octopus:** Non-model organism with incomplete reference
4. **Eelgrass:** Ecological genomics with unexpected microbiome discovery

**Demonstrated Capabilities:**

- Reference-free discovery
- Metadata-free analysis
- Multi-mechanism detection
- Model and non-model organisms
- Computational efficiency
- Statistical rigor

**Impact:**

- Unifies fragmented genomics workflows
- Discovers biology invisible to reference-based methods
- Democratizes genomic discovery
- Enables new biological questions
- Provides foundation for SPLASH2, sc-SPLASH, and future developments

This work transformed genomic sequence analysis from "align and query" to "discover and classify," with profound implications for basic research, clinical medicine, ecology, and evolution.
