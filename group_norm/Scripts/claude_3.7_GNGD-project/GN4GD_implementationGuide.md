# Group Normalization for Genomic Data - Implementation Guide

This document provides a guide to reproducing figures from the paper "Group Normalization for Genomic Data" by Ghandi and Beer (2012). The implementation uses R to process nucleosome positioning data and generate visualizations similar to those in the original paper.

## Background

The Group Normalization method addresses both global variation and local biases (probe effects) in genomic data. It works by finding a set of reference probes with similar responses for each probe, then using these reference sets to normalize the probe signal.

## Biological Context: Nucleosome Positioning

### What are Nucleosomes?

Nucleosomes are the fundamental unit of chromatin structure in eukaryotic cells. Each nucleosome consists of approximately 147 base pairs of DNA wrapped around an octamer of histone proteins (two copies each of H2A, H2B, H3, and H4). Nucleosomes are connected by "linker DNA" of variable length (typically 10-80 bp), creating a "beads-on-a-string" structure that represents the first level of DNA packaging in the nucleus.

### Why are Nucleosomes Important?

Nucleosomes play critical roles in genome function:

1. **Genome Accessibility**: Nucleosomes restrict access to the DNA they wrap, acting as physical barriers to DNA-binding proteins. This affects all DNA-dependent processes including transcription, replication, and repair.

2. **Transcriptional Regulation**: Nucleosome positioning at promoters and regulatory elements can determine whether transcription factors can access their binding sites, directly impacting gene expression.

3. **Epigenetic Regulation**: Histone modifications on nucleosomes serve as signals for recruiting chromatin-modifying enzymes and transcription factors.

### Nucleosome Positioning Patterns

Nucleosomes are not randomly distributed along the genome but show specific positioning patterns:

1. **Nucleosome-Depleted Regions (NDRs)**: Typically found at active promoters, enhancers, and transcription termination sites. These regions allow transcription factors and the transcription machinery to access DNA.

2. **Well-Positioned Nucleosomes**: The +1 nucleosome (immediately downstream of the transcription start site) and -1 nucleosome (upstream of the promoter) are often precisely positioned.

3. **Phased Arrays**: Downstream of the +1 nucleosome, subsequent nucleosomes often form regular arrays with consistent spacing.

4. **Sequence Preferences**: DNA sequence composition influences nucleosome formation, with some sequences (like poly(dA:dT) tracts) disfavoring nucleosome formation.

In yeast (*Saccharomyces cerevisiae*), which was studied in the paper, a stereotypical nucleosome organization exists around gene promoters: a nucleosome-depleted region (NDR) upstream of the transcription start site (TSS), flanked by well-positioned -1 and +1 nucleosomes, followed by an array of regularly spaced nucleosomes over the gene body.

### Tiling Array Technology for Nucleosome Mapping

**Tiling Array Design**:
- High-density oligonucleotide microarrays with probes spaced at regular intervals across the genome
- For yeast studies like Lee et al. (2007), Affymetrix arrays with ~2.6 million 25-bp oligonucleotide probes covering the entire yeast genome at ~4-5 bp resolution were used
- Each probe measures the abundance of DNA fragments that hybridize to its sequence

**Experimental Assay (MNase-chip)**:
1. **Crosslinking**: Cells are treated with formaldehyde to crosslink DNA to histones, preserving nucleosome positions
2. **Nuclease Digestion**: Micrococcal nuclease (MNase) preferentially digests linker DNA between nucleosomes, leaving nucleosome-protected DNA intact
3. **DNA Isolation**: Nucleosome-protected DNA fragments (~147 bp) are purified
4. **Labeling and Hybridization**: The DNA is labeled and hybridized to the tiling array
5. **Control**: A control sample of randomly sheared genomic DNA is also hybridized to normalize for sequence-specific hybridization biases (probe effects)

### Experimental Design

A typical nucleosome positioning experiment using tiling arrays might include:

1. **Multiple Conditions**: e.g., wild-type vs. mutant strains, different growth conditions
2. **Biological Replicates**: Multiple independent biological samples to assess reproducibility
3. **Controls**: Genomic DNA samples to normalize for probe-specific effects
4. **Reference Samples**: Defined nucleosome positions (e.g., +1 nucleosomes at well-studied genes)

### Data Analysis and Expected Results

**Raw Data Characteristics**:
- Probe intensity values across the genome
- Substantial probe-to-probe variation due to sequence-specific hybridization differences
- Biological signal (nucleosome occupancy) superimposed on these technical variations

**Analysis Steps**:
1. **Normalization**: Correct for probe-specific effects (the focus of the Group Normalization method)
2. **Smoothing**: Apply running average or other smoothing techniques to reduce noise
3. **Peak Calling**: Identify nucleosome positions based on signal peaks
4. **Comparative Analysis**: Compare nucleosome positions between conditions

**Expected Patterns**:
- Regular oscillations in signal intensity with a periodicity of ~165 bp (nucleosome + linker)
- Consistent depletion of signal at promoters (NDRs)
- Well-defined peaks at +1 and -1 positions
- More variable positioning in gene bodies and intergenic regions

**Visualization**:
- Heatmaps aligned to TSSs showing nucleosome positioning across genes
- Average profiles showing nucleosome occupancy patterns around genomic features
- Gene-specific tracks showing nucleosome positions in regions of interest

This biological and technical context is essential for understanding the significance of the Group Normalization method, which aims to improve signal quality by addressing the substantial probe effects inherent in tiling array data.

## Data Sources

The original paper used several datasets:

1. **Lee et al. 2007** - Nucleosome positioning data in yeast (Figure 1)
   - Available from ArrayExpress: E-MEXP-1172
2. **Zawadzki et al. 2009** - Nucleosome data before and after glucose addition (Figures 4, 5, 7)
3. **He et al. 2008** - Histone H3 mutant data (Figure 6)
4. **Johnson et al. 2008** - Spike-in benchmark dataset (Figure 8)

The implementation supports both:
- **Simulated data**: Creates synthetic data that mimics the properties of nucleosome positioning data
- **Real data**: Downloads and processes the actual Lee et al. 2007 dataset from ArrayExpress (E-MEXP-1172)

## Implementation Details

### 1. Group Normalization Algorithm

The core algorithm has two variants:

**Binary Group Normalization**:
- For each probe, find N (~1000) reference probes with similar values in a reference dataset
- Use the low (~30%) and high (~30%) signals from these reference probes to estimate the dynamic range
- Normalize using these parameters: `normalized_value = (value - μ_low) / (μ_high - μ_low)`

**Quantile-based Group Normalization**:
- Similar to binary method but uses the rank of the probe in its reference set
- Normalization is based on the quantile position rather than just low/high values

### 2. Cross Normalization

Cross Normalization is a variant that amplifies biologically relevant differences between two datasets:
- Normalize dataset B using A as reference
- Normalize dataset A using B as reference
- The two resulting datasets highlight differences between conditions

### 3. Signal Quality Measure

The paper uses a Signal Quality measure (in dB) to compare normalization methods:
- Signal (S): Mean square change between conditions at significantly changed probes
- Noise (N): Mean square difference between replicates
- Signal Quality = 10 * log10(S/N)

## Running the Analysis

The main function `run_analysis()` will:
1. Generate data (either simulated or real from ArrayExpress)
2. Process the data using Group Normalization methods
3. Create figures similar to those in the paper
4. Save the figures to the specified output directory

To use real data instead of simulated data, set the `use_real_data` parameter to `TRUE`:
```r
run_analysis(use_real_data = TRUE)
```

## Reproduced Figures

The script reproduces:

- **Figure 1**: Reproducibility of genomic assays
  - 1A: Two genomic hybridization signals along a portion of chromosome
  - 1B: Correlation between replicates across the genome

- **Figure 5**: Group Normalization results at the HXT3 locus
  - 5B: Raw nucleosome occupancy data
  - 5C: Cross normalization highlighting differential nucleosome occupancy

- **Figure 7**: Signal Quality comparison across normalization methods

## Value of Using Both Real and Simulated Data

Having both options provides several advantages:

1. **Validation**: Test the algorithm on real data to ensure it works in practice
2. **Control**: Simulated data allows testing under controlled conditions where you know the ground truth
3. **Reproducibility**: Simulated data doesn't rely on external data sources that may change or become unavailable
4. **Educational**: Simulated data provides a cleaner example for understanding the method
5. **Robustness**: If there are issues accessing the real data, the simulation provides a fallback

## Usage Notes

- The real data download may take some time depending on your internet connection
- The structure of the ArrayExpress data may change over time, so the parser might need updates
- The parameters for Group Normalization (reference group size, low/high percentages) can be adjusted

## Future Improvements

- Implement more sophisticated nucleosome peak calling
- Add additional visualizations from the paper
- Extend to additional genomic data types
- Optimize the processing of large datasets

## References

- Ghandi, M., & Beer, M. A. (2012). Group normalization for genomic data. PLoS ONE, 7(8), e38695.
- Lee, W., et al. (2007). A high-resolution atlas of nucleosome occupancy in yeast. Nature Genetics, 39(10), 1235-1244.
- Zawadzki, K. A., et al. (2009). Chromatin-dependent transcription factor accessibility rather than nucleosome remodeling predominates during global transcriptional restructuring in Saccharomyces cerevisiae. Molecular Biology of the Cell, 20(15), 3503-3513.
- Kornberg, R. D., & Lorch, Y. (1999). Twenty-five years of the nucleosome, fundamental particle of the eukaryote chromosome. Cell, 98(3), 285-294.
- Jiang, C., & Pugh, B. F. (2009). Nucleosome positioning and gene regulation: advances through genomics. Nature Reviews Genetics, 10(3), 161-172.

