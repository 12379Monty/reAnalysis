# Datasets Used in "Ultra-efficient, unified discovery from microbial sequencing with SPLASH and precise statistical assembly"

**Study:** Henderson G, Gudys A, Baharav T, Sundaramurthy P, Kokot M, Wang PL, Deorowicz S, Carey AF, Salzman J (2024)

**Publication:** bioRxiv 2024.01.18.576133

---

## Overview

This study applied SPLASH to microbial genomics, demonstrating that a single reference-free algorithm could unify diverse analytical tasks typically requiring separate, specialized bioinformatic workflows. The key innovation was integrating SPLASH with "compactors"—a statistical assembly approach that generates longer sequences from anchor-seeded local assemblies while maintaining statistical rigor.

## Core Datasets

### 1. Mycobacterium tuberculosis Clinical Isolates

**Purpose:** Demonstration of rapid, reference-free strain typing and discrimination

**Key Application:** Bacterial strain classification without prior knowledge of strain reference sequences or sample metadata

**Dataset Characteristics:**

- Multiple *M. tuberculosis* clinical isolate sequences
- Represents diverse strain backgrounds
- Used to validate SPLASH's ability to discriminate bacterial sub-populations

**Analysis Approach:**

- SPLASH identified anchor-target patterns characteristic of different strains
- Strain-defining mutations detected without alignment to reference genomes
- Compactors generated longer assembled sequences for more complete characterization

**Key Results:**

- 83% accuracy in strain classification
- Rapid typing compared to traditional methods (spoligotyping, MIRU-VNTR)
- Metadata-free classification (no prior strain information required)

**Biological Significance:**

- *M. tuberculosis* strain typing is crucial for:
  - Epidemiological tracking of TB outbreaks
  - Understanding transmission dynamics
  - Monitoring emergence of drug-resistant strains
  - Clinical diagnostic applications

**Technical Innovation:** Demonstrated that SPLASH can replace time-consuming and resource-intensive traditional strain typing methods with a fast, reference-free alternative that works directly from raw sequencing data.

---

### 2. Bacterial Genomes for Mobile Element Discovery

**Purpose:** Discovery of novel mobile genetic elements and CRISPR arrays

**Dataset Scope:** Multiple bacterial species with focus on:
- Genome plasticity
- Horizontal gene transfer elements
- CRISPR-Cas system diversity

**Types of Mobile Elements Investigated:**


**a) Transposable Elements and Insertion Sequences**

- Insertion sequence (IS) elements
- Composite transposons
- Complex transposons
- Detection of mobilization and insertion sites

**b) Phage-Related Elements**

- Prophage integration sites
- Phage attachment (att) sites
- Lysogenic conversion genes
- Temperate phage sequences

**c) CRISPR Arrays**

- CRISPR repeat-spacer-repeat structures
- Novel spacer sequences not in databases
- Evidence of recent phage/plasmid exposure
- CRISPR array evolution and diversity

**Analysis Strategy:**


**Mobile Element Detection:**

- SPLASH identified constant flanking sequences (anchors) adjacent to variable insertion sites (targets)
- Compactors assembled longer sequences to characterize complete element structures
- Reference-free approach enabled discovery of novel elements not in existing databases

**CRISPR Array Analysis:**

- Direct repeats served as anchors
- Variable spacers detected as targets with high entropy
- Statistical significance testing identified recently acquired vs. ancient spacers
- Spacer diversity patterns revealed recent viral/plasmid challenges

**Key Findings:**


1. **Novel Mobile Elements:**

   - Discovery of mobile elements absent from reference databases
   - Characterization of insertion site preferences
   - Evidence of recent mobilization events

2. **CRISPR Diversity:**

   - New CRISPR spacer sequences indicating recent adaptive immunity
   - Geographic and temporal variation in CRISPR content
   - Functional vs. degraded CRISPR systems

3. **Genome Plasticity:**

   - Quantification of genetic flux in bacterial populations
   - Identification of hotspots for genetic element integration
   - Evidence of ongoing horizontal gene transfer

**Biological Significance:**


**Bacterial Adaptation:** Mobile genetic elements and CRISPR systems are critical for:
- Antibiotic resistance spread (often on mobile elements)
- Metabolic capability acquisition
- Virulence factor transfer
- Adaptive immunity against phages
- Bacterial evolution and diversification

**Clinical Relevance:**

- Understanding antibiotic resistance transmission
- Tracking pathogen evolution
- Identifying novel resistance mechanisms
- Developing anti-microbial strategies

---

### 3. Integration with Compactors Assembly

**Technical Innovation:** Precise Statistical Assembly

The study introduced "compactors" as a novel statistical assembly approach specifically designed for SPLASH-identified anchors.

**Compactor Characteristics:**

- Anchor-seeded assembly (anchors serve as assembly seeds)
- Probabilistic extension from anchors
- Generates multiple alternative sequences when variation exists
- Maintains statistical rigor (unlike traditional assembly)
- Typically 81 nucleotides in length (in this study)

**Assembly Strategy:**

- Anchors (27-mers) form the initial seeds
- Extension proceeds using probabilistic methods
- Each anchor can generate multiple compactors reflecting biological variation
- "Trimmed compactors" (54-mer following anchor) used for downstream analysis

**Applications in This Study:**


**1. Mobile Element Characterization:**

- Extended anchor sequences to capture more of insertion site context
- Assembled regions spanning element boundaries
- Characterized element termini and direct repeats

**2. CRISPR Array Reconstruction:**

- Assembled repeat-spacer-repeat structures
- Captured complete CRISPR units
- Enabled analysis of array organization

**3. Strain-Defining Regions:**

- Extended strain-specific sequences
- Captured mutation clusters
- Improved discrimination of closely related strains

**Advantages Over Traditional Assembly:**

- No need for complete genome assembly
- Focused on regions of biological interest (high entropy anchors)
- Maintains statistical framework from SPLASH
- Computationally efficient
- Works with diverse sample types and coverage

---

## Dataset Comparison to Traditional Approaches

### Traditional Microbial Genomics Workflow

**Strain Typing:**

- Spoligotyping (PCR-based, limited resolution)
- MIRU-VNTR (labor-intensive, specialized primers)
- Whole genome sequencing + SNP calling (requires high-quality reference)

**Mobile Element Discovery:**

- Custom bioinformatic pipelines for each element type
- Requires element-specific knowledge and databases
- Alignment-dependent (misses novel elements)

**CRISPR Analysis:**

- CRISPRFinder and similar tools (require references)
- Manual curation often necessary
- Database-dependent spacer identification

### SPLASH + Compactors Approach

**Unified Analysis:**

- Single algorithm for all discovery tasks
- Reference-free operation
- Discovers novel biology not in databases
- Rapid execution (minutes to hours vs. days)
- No custom pipeline development needed

**Statistical Rigor:**

- Formal hypothesis testing for each anchor
- Multiple testing correction
- Interpretable p-values
- No arbitrary thresholds

---

## Data Availability and Access

**Publication Status:** bioRxiv preprint (2024.01.18.576133)

**Code Availability:**

- SPLASH2 pipeline includes compactors functionality
- GitHub: https://github.com/refresh-bio/SPLASH
- Integrated compactors module accessible through SPLASH2

**Sequencing Data:**

- Specific SRA accession numbers not fully detailed in available abstracts
- Clinical isolate data likely subject to privacy restrictions
- Bacterial genome data likely from public repositories

---

## Key Methodological Details

### SPLASH Parameters
- Anchor length: 27 nucleotides (typical)
- Gap length: Variable (parameter)
- Target length: 27 nucleotides (typical)
- Statistical threshold: FDR-corrected p-values

### Compactor Parameters
- Total length: 81 nucleotides
- Anchor portion: 27 nucleotides (at beginning)
- Trimmed compactor: 54 nucleotides (following anchor)
- Multiple compactors per anchor when variation exists

### Classification Approach
- Unsupervised clustering of anchor-target patterns
- No metadata required during discovery
- Post-hoc validation against known strain types

---

## Biological Insights from Dataset Analysis

### 1. Bacterial Genetic Diversity

**Finding:** Bacteria exhibit extensive genetic plasticity not fully captured by single reference genomes.

**Evidence:**

- Novel mobile elements discovered
- Strain-specific variation detected
- Active CRISPR systems with recent spacer acquisition

**Implication:** Reference genomes provide incomplete pictures of bacterial species. Population-level sequencing reveals true genetic diversity.

### 2. Rapid Strain Classification

**Finding:** Strain-defining features can be identified statistically without prior knowledge.

**Evidence:**

- 83% accuracy in *M. tuberculosis* strain typing
- Metadata-free classification successful
- Rapid execution time

**Implication:** Clinical and epidemiological strain typing could be revolutionized with rapid, reference-free approaches applicable even to novel outbreak strains.

### 3. Functional Mobile Elements

**Finding:** Many bacterial genomes contain active mobile genetic elements undergoing recent mobilization.

**Evidence:**

- Detection of insertion site variation within populations
- CRISPR spacers targeting contemporary phages
- Evidence of ongoing horizontal gene transfer

**Implication:** Bacterial genomes are dynamic, with implications for:

- Antibiotic resistance spread
- Virulence acquisition
- Evolutionary adaptation

### 4. CRISPR System Activity

**Finding:** CRISPR arrays reflect recent and ongoing viral challenges.

**Evidence:**

- Novel spacers not in databases
- Population-level variation in spacer content
- Correlation with environmental phage presence

**Implication:** CRISPR systems provide real-time records of virus-host interactions, useful for:
- Ecological studies
- Phage therapy development
- Understanding bacterial immunity

---

## Technical Achievements

### Computational Performance
- Unified analysis of multiple phenomena (previously requiring separate tools)
- Fast execution enabling rapid turnaround
- Minimal memory footprint
- Scalable to large bacterial population studies

### Discovery Power
- Novel elements not in reference databases
- Unannotated genetic features
- Population-level variation
- Functional vs. degraded genetic systems

### Clinical Potential
- Rapid diagnostics (strain typing)
- Real-time outbreak tracking
- Resistance mechanism discovery
- Point-of-care testing feasibility

---

## Comparison with Existing Tools

### Traditional Tools vs. SPLASH + Compactors

| Feature | Traditional Approach | SPLASH + Compactors |
|---------|---------------------|---------------------|
| Reference requirement | Required | Not required |
| Strain typing speed | Hours to days | Minutes |
| Mobile element discovery | Element-specific tools | Unified algorithm |
| CRISPR analysis | Database-dependent | De novo discovery |
| Novel element detection | Poor | Excellent |
| Scalability | Limited | High |
| Expertise required | High (bioinformatics) | Moderate |
| Multiple phenomena | Multiple tools needed | Single tool |

---

## Future Directions Enabled by These Datasets

### 1. Clinical Diagnostics
- Real-time pathogen identification
- Rapid resistance profiling
- Outbreak source tracking
- Point-of-care testing

### 2. Evolutionary Studies
- Population genomics at scale
- Horizontal gene transfer dynamics
- CRISPR-phage co-evolution
- Emergence of novel strains

### 3. Synthetic Biology
- Identification of useful mobile elements
- CRISPR system engineering
- Understanding genome organization principles

### 4. Public Health
- Antimicrobial resistance surveillance
- Vaccine escape monitoring
- Epidemiological tracking
- Pandemic preparedness

---

## Summary

The microbial datasets analyzed in Henderson et al. (2024) demonstrate that:

1. **Reference-free analysis is feasible and powerful** for bacteria, where genome plasticity and diversity make single references inadequate.

2. **Unified discovery** of diverse phenomena (mobile elements, CRISPR, strain variation) through a single algorithm is possible, eliminating the need for fragmented, specialized tools.

3. **Compactors extend discovery** by providing statistical assembly that maintains the rigor of SPLASH while generating longer sequences for biological characterization.

4. **Clinical translation is realistic**, with rapid strain typing demonstrated and potential for diagnostic applications.

5. **Novel biology emerges** when not constrained by reference databases—many discoveries would be impossible with alignment-based methods.

This work establishes SPLASH as a transformative approach for microbial genomics, with implications spanning basic science, clinical medicine, and public health.
