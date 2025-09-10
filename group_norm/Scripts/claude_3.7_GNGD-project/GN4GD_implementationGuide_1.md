# Group Normalization for Genomic Data - Implementation Guide

This document provides a guide to reproducing figures from the paper "Group Normalization for Genomic Data" by Ghandi and Beer (2012). The implementation uses R to process nucleosome positioning data and generate visualizations similar to those in the original paper.

## Background

The Group Normalization method addresses both global variation and local biases (probe effects) in genomic data. It works by finding a set of reference probes with similar responses for each probe, then using these reference sets to normalize the probe signal.

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

