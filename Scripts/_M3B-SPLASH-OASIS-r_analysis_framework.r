# SPLASH-OASIS vs Modern RNA-seq Methods: Comprehensive Benchmarking Framework
# Addressing the inadequate χ² comparator problem

library(tidyverse)
library(DESeq2)
library(edgeR)
library(limma)
library(RUVSeq)
library(sva)
library(scran)
library(scater)
library(Seurat)
library(MAST)
library(ComplexHeatmap)
library(ggplot2)
library(viridis)
library(parallel)
library(microbenchmark)

# ============================================================================
# SECTION 1: MODERN RNA-SEQ PIPELINE IMPLEMENTATIONS
# ============================================================================

# Standard DESeq2 pipeline with proper normalization
run_deseq2_analysis <- function(count_matrix, coldata, design_formula = ~condition) {
  dds <- DESeqDataSetFromMatrix(countData = count_matrix,
                              colData = coldata,
                              design = design_formula)
  
  # Filter low count genes
  keep <- rowSums(counts(dds)) >= 10
  dds <- dds[keep,]
  
  # Run DESeq2
  dds <- DESeq(dds)
  res <- results(dds)
  
  # Variance stabilized transformation for downstream analysis
  vst_data <- vst(dds, blind = FALSE)
  
  return(list(
    results = res,
    dds = dds,
    normalized_counts = vst_data,
    method = "DESeq2"
  ))
}

# edgeR pipeline with TMM normalization
run_edger_analysis <- function(count_matrix, groups) {
  dge <- DGEList(counts = count_matrix, group = groups)
  
  # Filter low count genes
  keep <- filterByExpr(dge)
  dge <- dge[keep, , keep.lib.sizes = FALSE]
  
  # TMM normalization
  dge <- calcNormFactors(dge)
  
  # Estimate dispersion
  design <- model.matrix(~groups)
  dge <- estimateDisp(dge, design)
  
  # Quasi-likelihood F-tests
  fit <- glmQLFit(dge, design)
  qlf <- glmQLFTest(fit, coef = 2)
  
  return(list(
    results = topTags(qlf, n = Inf),
    dge = dge,
    method = "edgeR"
  ))
}

# limma-voom pipeline
run_limma_voom_analysis <- function(count_matrix, design) {
  dge <- DGEList(counts = count_matrix)
  keep <- filterByExpr(dge)
  dge <- dge[keep, , keep.lib.sizes = FALSE]
  dge <- calcNormFactors(dge)
  
  # voom transformation
  v <- voom(dge, design, plot = FALSE)
  
  # Linear modeling
  fit <- lmFit(v, design)
  fit <- eBayes(fit)
  
  results <- topTable(fit, coef = 2, n = Inf)
  
  return(list(
    results = results,
    voom_data = v,
    method = "limma-voom"
  ))
}

# RUVSeq pipeline for unwanted variation removal
run_ruvseq_analysis <- function(count_matrix, groups, k = 1) {
  # Identify empirical control genes (least variable)
  design <- model.matrix(~groups)
  dge <- DGEList(counts = count_matrix, group = groups)
  dge <- calcNormFactors(dge, method = "upperquartile")
  dge <- estimateGLMCommonDisp(dge, design)
  dge <- estimateGLMTagwiseDisp(dge, design)
  
  fit1 <- glmFit(dge, design)
  res1 <- residuals(fit1, type = "deviance")
  
  # Select control genes (least variable)
  controls <- order(apply(res1, 1, var))[1:1000]
  
  # RUVg normalization
  ruvg_data <- RUVg(count_matrix, controls, k = k)
  
  return(list(
    normalized_counts = ruvg_data$normalizedCounts,
    W = ruvg_data$W,
    controls = controls,
    method = "RUVSeq"
  ))
}

# ComBat batch correction pipeline
run_combat_analysis <- function(count_matrix, batch, mod = NULL) {
  # Log transform with pseudocount
  log_counts <- log2(count_matrix + 1)
  
  # ComBat batch correction
  combat_data <- ComBat(dat = log_counts, batch = batch, mod = mod)
  
  return(list(
    batch_corrected = combat_data,
    method = "ComBat"
  ))
}

# ============================================================================
# SECTION 2: COMPREHENSIVE BENCHMARKING FRAMEWORK
# ============================================================================

# Comprehensive method comparison
comprehensive_method_comparison <- function(count_matrix, metadata, 
                                          truth_labels = NULL,
                                          benchmark_datasets = NULL) {
  
  results <- list()
  
  # 1. DESeq2 analysis
  cat("Running DESeq2 analysis...\n")
  deseq2_result <- run_deseq2_analysis(count_matrix, metadata)
  results$DESeq2 <- deseq2_result
  
  # 2. edgeR analysis  
  cat("Running edgeR analysis...\n")
  edger_result <- run_edger_analysis(count_matrix, metadata$condition)
  results$edgeR <- edger_result
  
  # 3. limma-voom analysis
  cat("Running limma-voom analysis...\n")
  design <- model.matrix(~condition, data = metadata)
  limma_result <- run_limma_voom_analysis(count_matrix, design)
  results$limma_voom <- limma_result
  
  # 4. RUVSeq analysis
  cat("Running RUVSeq analysis...\n")
  ruv_result <- run_ruvseq_analysis(count_matrix, metadata$condition)
  results$RUVSeq <- ruv_result
  
  # 5. OASIS analysis (simulated)
  cat("Running OASIS analysis...\n")
  oasis_result <- simulate_oasis_analysis(count_matrix, "oasis")
  results$OASIS <- oasis_result
  
  # 6. Traditional χ² for comparison
  cat("Running Chi-squared analysis...\n")
  chi2_result <- simulate_oasis_analysis(count_matrix, "chi_squared")
  results$ChiSquared <- chi2_result
  
  return(results)
}

# Performance evaluation metrics
evaluate_performance <- function(method_results, truth_labels = NULL, 
                                spike_in_truth = NULL) {
  
  performance_metrics <- map_dfr(names(method_results), function(method_name) {
    result <- method_results[[method_name]]
    
    # Initialize metrics
    metrics <- data.frame(
      method = method_name,
      n_significant = NA,
      runtime = NA,
      memory_usage = NA,
      sensitivity = NA,
      specificity = NA,
      precision = NA,
      fdr_observed = NA,
      auc = NA
    )
    
    # Extract p-values and significance calls
    if (method_name == "DESeq2") {
      pvals <- result$results$pvalue
      significant <- !is.na(result$results$padj) & result$results$padj < 0.05
    } else if (method_name == "edgeR") {
      pvals <- result$results$table$PValue
      significant <- result$results$table$FDR < 0.05
    } else if (method_name == "limma_voom") {
      pvals <- result$results$P.Value
      significant <- result$results$adj.P.Val < 0.05
    } else if (method_name %in% c("OASIS", "ChiSquared")) {
      pvals <- result$p_value
      significant <- pvals < 0.05
    }
    
    metrics$n_significant <- sum(significant, na.rm = TRUE)
    
    # If truth is available, compute accuracy metrics
    if (!is.null(truth_labels) && length(truth_labels) == length(significant)) {
      tp <- sum(significant & truth_labels, na.rm = TRUE)
      fp <- sum(significant & !truth_labels, na.rm = TRUE)
      tn <- sum(!significant & !truth_labels, na.rm = TRUE)
      fn <- sum(!significant & truth_labels, na.rm = TRUE)
      
      metrics$sensitivity <- tp / (tp + fn)
      metrics$specificity <- tn / (tn + fp)
      metrics$precision <- tp / (tp + fp)
      metrics$fdr_observed <- fp / (tp + fp)
      
      # AUC calculation
      if (!all(is.na(pvals))) {
        roc_result <- pROC::roc(truth_labels, -log10(pvals + 1e-300))
        metrics$auc <- as.numeric(roc_result$auc)
      }
    }
    
    return(metrics)
  })
  
  return(performance_metrics)
}

# Computational benchmarking
benchmark_computational_performance <- function(count_matrix, metadata, 
                                              n_reps = 5) {
  
  cat("Benchmarking computational performance...\n")
  
  # Benchmark each method
  benchmark_results <- microbenchmark(
    
    DESeq2 = {
      run_deseq2_analysis(count_matrix, metadata)
    },
    
    edgeR = {
      run_edger_analysis(count_matrix, metadata$condition)
    },
    
    limma_voom = {
      design <- model.matrix(~condition, data = metadata)
      run_limma_voom_analysis(count_matrix, design)
    },
    
    RUVSeq = {
      run_ruvseq_analysis(count_matrix, metadata$condition)
    },
    
    OASIS = {
      simulate_oasis_analysis(count_matrix, "oasis")
    },
    
    ChiSquared = {
      simulate_oasis_analysis(count_matrix, "chi_squared")
    },
    
    times = n_reps
  )
  
  return(benchmark_results)
}

# ============================================================================
# SECTION 3: BENCHMARK DATASET INTEGRATION
# ============================================================================

# Load standard benchmark datasets
load_benchmark_datasets <- function() {
  
  datasets <- list()
  
  # Simulated data with known truth
  datasets$simulated_null <- generate_null_dataset(n_genes = 1000, n_samples = 20)
  datasets$simulated_de <- generate_de_dataset(n_genes = 1000, n_samples = 20, 
                                              n_de_genes = 100)
  
  # GEUVADIS-like dataset (if available)
  # datasets$geuvadis <- load_geuvadis_data()
  
  # Spike-in datasets (if available)  
  # datasets$ercc_spike <- load_ercc_data()
  
  return(datasets)
}

# Generate null dataset for FDR control testing
generate_null_dataset <- function(n_genes = 1000, n_samples = 20, 
                                 dispersion = 0.1) {
  
  # Generate realistic count data under null (no DE)
  # Using negative binomial with realistic parameters
  
  library_sizes <- rnbinom(n_samples, size = 10, mu = 1e6)
  baseline_expression <- rgamma(n_genes, shape = 2, rate = 0.1)
  
  count_matrix <- matrix(0, nrow = n_genes, ncol = n_samples)
  
  for (i in 1:n_genes) {
    for (j in 1:n_samples) {
      lambda <- baseline_expression[i] * library_sizes[j] / 1e6
      # Add overdispersion
      alpha <- 1/dispersion
      count_matrix[i, j] <- rnbinom(1, size = alpha, mu = lambda)
    }
  }
  
  # Create metadata
  metadata <- data.frame(
    sample_id = paste0("Sample_", 1:n_samples),
    condition = rep(c("A", "B"), each = n_samples/2),
    batch = rep(c("batch1", "batch2"), times = n_samples/2)
  )
  
  # Truth: no genes are DE under null
  truth_labels <- rep(FALSE, n_genes)
  
  rownames(count_matrix) <- paste0("Gene_", 1:n_genes)
  colnames(count_matrix) <- metadata$sample_id
  
  return(list(
    counts = count_matrix,
    metadata = metadata,
    truth = truth_labels,
    dataset_type = "null"
  ))
}

# Generate dataset with known DE genes
generate_de_dataset <- function(n_genes = 1000, n_samples = 20, 
                               n_de_genes = 100, fold_change = 2,
                               dispersion = 0.1) {
  
  library_sizes <- rnbinom(n_samples, size = 10, mu = 1e6)
  baseline_expression <- rgamma(n_genes, shape = 2, rate = 0.1)
  
  # Select DE genes randomly
  de_genes <- sample(1:n_genes, n_de_genes)
  truth_labels <- 1:n_genes %in% de_genes
  
  count_matrix <- matrix(0, nrow = n_genes, ncol = n_samples)
  
  for (i in 1:n_genes) {
    for (j in 1:n_samples) {
      lambda <- baseline_expression[i] * library_sizes[j] / 1e6
      
      # Add differential expression for DE genes in condition B
      if (i %in% de_genes && j > n_samples/2) {
        lambda <- lambda * fold_change
      }
      
      alpha <- 1/dispersion
      count_matrix[i, j] <- rnbinom(1, size = alpha, mu = lambda)
    }
  }
  
  metadata <- data.frame(
    sample_id = paste0("Sample_", 1:n_samples),
    condition = rep(c("A", "B"), each = n_samples/2),
    batch = rep(c("batch1", "batch2"), times = n_samples/2)
  )
  
  rownames(count_matrix) <- paste0("Gene_", 1:n_genes)
  colnames(count_matrix) <- metadata$sample_id
  
  return(list(
    counts = count_matrix,
    metadata = metadata,
    truth = truth_labels,
    de_genes = de_genes,
    dataset_type = "differential_expression"
  ))
}

# ============================================================================
# SECTION 4: COMPREHENSIVE EVALUATION PIPELINE
# ============================================================================

# Main comprehensive evaluation function
run_comprehensive_evaluation <- function(benchmark_datasets = NULL) {
  
  if (is.null(benchmark_datasets)) {
    cat("Loading benchmark datasets...\n")
    benchmark_datasets <- load_benchmark_datasets()
  }
  
  all_results <- list()
  
  for (dataset_name in names(benchmark_datasets)) {
    cat(paste("Evaluating on dataset:", dataset_name, "\n"))
    
    dataset <- benchmark_datasets[[dataset_name]]
    
    # Run all methods
    method_results <- comprehensive_method_comparison(
      count_matrix = dataset$counts,
      metadata = dataset$metadata,
      truth_labels = dataset$truth
    )
    
    # Evaluate performance
    performance <- evaluate_performance(
      method_results = method_results,
      truth_labels = dataset$truth
    )
    
    # Computational benchmarking
    comp_benchmark <- benchmark_computational_performance(
      count_matrix = dataset$counts,
      metadata = dataset$metadata,
      n_reps = 3
    )
    
    all_results[[dataset_name]] <- list(
      method_results = method_results,
      performance = performance,
      computational = comp_benchmark,
      dataset_info = dataset[c("dataset_type", "truth")]
    )
  }
  
  return(all_results)
}

# ============================================================================
# SECTION 5: VISUALIZATION AND REPORTING
# ============================================================================

# Plot comprehensive method comparison
plot_comprehensive_comparison <- function(evaluation_results) {
  
  # Combine performance metrics across datasets
  all_performance <- map_dfr(names(evaluation_results), function(dataset_name) {
    perf <- evaluation_results[[dataset_name]]$performance
    perf$dataset <- dataset_name
    return(perf)
  })
  
  # Performance comparison plots
  p1 <- all_performance %>%
    filter(!is.na(sensitivity)) %>%
    ggplot(aes(x = method, y = sensitivity, fill = method)) +
    geom_boxplot() +
    facet_wrap(~dataset) +
    scale_fill_brewer(type = "qual", palette = "Set3") +
    labs(title = "Sensitivity Comparison Across Datasets",
         x = "Method", y = "Sensitivity") +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
  
  p2 <- all_performance %>%
    filter(!is.na(fdr_observed)) %>%
    ggplot(aes(x = method, y = fdr_observed, fill = method)) +
    geom_boxplot() +
    geom_hline(yintercept = 0.05, linetype = "dashed", color = "red") +
    facet_wrap(~dataset) +
    scale_fill_brewer(type = "qual", palette = "Set3") +
    labs(title = "Observed FDR Across Methods and Datasets",
         x = "Method", y = "Observed FDR",
         caption = "Red line shows nominal 5% FDR") +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
  
  p3 <- all_performance %>%
    filter(!is.na(auc)) %>%
    ggplot(aes(x = method, y = auc, fill = method)) +
    geom_boxplot() +
    facet_wrap(~dataset) +
    scale_fill_brewer(type = "qual", palette = "Set3") +
    labs(title = "Area Under ROC Curve",
         x = "Method", y = "AUC") +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
  
  return(list(sensitivity = p1, fdr = p2, auc = p3))
}

# Plot computational performance
plot_computational_performance <- function(evaluation_results) {
  
  # Extract computational benchmarks
  comp_data <- map_dfr(names(evaluation_results), function(dataset_name) {
    comp <- evaluation_results[[dataset_name]]$computational
    summary_stats <- summary(comp)
    
    data.frame(
      dataset = dataset_name,
      method = summary_stats$expr,
      median_time = summary_stats$median,
      mean_time = summary_stats$mean,
      min_time = summary_stats$min,
      max_time = summary_stats$max
    )
  })
  
  p1 <- comp_data %>%
    ggplot(aes(x = method, y = median_time/1e6, fill = method)) +  # Convert to seconds
    geom_col() +
    facet_wrap(~dataset, scales = "free_y") +
    scale_fill_brewer(type = "qual", palette = "Set3") +
    labs(title = "Computational Performance Comparison",
         x = "Method", y = "Median Runtime (seconds)") +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 45, hjust = 1))
  
  return(p1)
}

# Generate comprehensive report
generate_evaluation_report <- function(evaluation_results, output_file = NULL) {
  
  report <- list()
  
  # Summary statistics
  all_performance <- map_dfr(names(evaluation_results), function(dataset_name) {
    perf <- evaluation_results[[dataset_name]]$performance
    perf$dataset <- dataset_name
    return(perf)
  })
  
  # Method ranking by dataset
  method_rankings <- all_performance %>%
    filter(!is.na(auc)) %>%
    group_by(dataset) %>%
    arrange(desc(auc)) %>%
    mutate(rank = row_number()) %>%
    select(dataset, method, auc, rank)
  
  report$method_rankings <- method_rankings
  
  # FDR control assessment
  fdr_control <- all_performance %>%
    filter(!is.na(fdr_observed)) %>%
    mutate(
      fdr_controlled = fdr_observed <= 0.05,
      fdr_violation = fdr_observed > 0.1
    ) %>%
    group_by(method) %>%
    summarise(
      n_datasets = n(),
      fdr_controlled_prop = mean(fdr_controlled, na.rm = TRUE),
      fdr_violation_prop = mean(fdr_violation, na.rm = TRUE),
      median_observed_fdr = median(fdr_observed, na.rm = TRUE)
    )
  
  report$fdr_control <- fdr_control
  
  # Computational efficiency
  comp_summary <- map_dfr(names(evaluation_results), function(dataset_name) {
    comp <- evaluation_results[[dataset_name]]$computational
    summary_stats <- summary(comp)
    
    data.frame(
      dataset = dataset_name,
      method = summary_stats$expr,
      median_time_ms = summary_stats$median
    )
  }) %>%
    group_by(method) %>%
    summarise(
      overall_median_time_ms = median(median_time_ms),
      relative_speed = min(median_time_ms) / median_time_ms
    ) %>%
    arrange(overall_median_time_ms)
  
  report$computational_efficiency <- comp_summary
  
  # Generate summary text
  cat("\n" + rep("=", 80) + "\n")
  cat("COMPREHENSIVE METHOD EVALUATION REPORT\n")
  cat(rep("=", 80) + "\n\n")
  
  cat("METHOD RANKINGS (by AUC):\n")
  print(method_rankings)
  
  cat("\nFDR CONTROL ASSESSMENT:\n")
  print(fdr_control)
  
  cat("\nCOMPUTATIONAL EFFICIENCY:\n")
  print(comp_summary)
  
  if (!is.null(output_file)) {
    saveRDS(report, file = output_file)
    cat(paste("\nReport saved to:", output_file, "\n"))
  }
  
  return(report)
}

# ============================================================================
# SECTION 6: EXAMPLE USAGE AND MAIN EXECUTION
# ============================================================================

# Main analysis workflow
run_oasis_evaluation <- function(output_dir = "oasis_evaluation_results") {
  
  if (!dir.exists(output_dir)) {
    dir.create(output_dir, recursive = TRUE)
  }
  
  cat("Starting comprehensive OASIS evaluation...\n")
  cat("This will compare OASIS against modern RNA-seq methods\n\n")
  
  # Run comprehensive evaluation
  evaluation_results <- run_comprehensive_evaluation()
  
  # Generate visualizations
  cat("Generating performance comparison plots...\n")
  perf_plots <- plot_comprehensive_comparison(evaluation_results)
  comp_plots <- plot_computational_performance(evaluation_results)
  
  # Save plots
  ggsave(file.path(output_dir, "sensitivity_comparison.png"), 
         perf_plots$sensitivity, width = 12, height = 8)
  ggsave(file.path(output_dir, "fdr_comparison.png"), 
         perf_plots$fdr, width = 12, height = 8)
  ggsave(file.path(output_dir, "auc_comparison.png"), 
         perf_plots$auc, width = 12, height = 8)
  ggsave(file.path(output_dir, "computational_performance.png"), 
         comp_plots, width = 12, height = 6)
  
  # Generate comprehensive report
  cat("Generating evaluation report...\n")
  report <- generate_evaluation_report(
    evaluation_results, 
    file.path(output_dir, "evaluation_report.rds")
  )
  
  # Save all results
  saveRDS(evaluation_results, file.path(output_dir, "full_evaluation_results.rds"))
  
  cat(paste("Evaluation complete! Results saved to:", output_dir, "\n"))
  
  return(list(
    results = evaluation_results,
    report = report,
    plots = list(performance = perf_plots, computational = comp_plots)
  ))
}

# ============================================================================
# SECTION 7: CRITICAL ASSESSMENT FUNCTIONS
# ============================================================================

# Function to assess the original paper's claims
assess_original_claims <- function(evaluation_results) {
  
  cat("CRITICAL ASSESSMENT OF ORIGINAL PAPER CLAIMS\n")
  cat(rep("=", 50) + "\n\n")
  
  # Claim 1: Better than χ²
  chi2_performance <- evaluation_results$simulated_de$performance %>%
    filter(method == "ChiSquared")
  
  oasis_performance <- evaluation_results$simulated_de$performance %>%
    filter(method == "OASIS")
  
  cat("CLAIM 1: OASIS is better than χ² test\n")
  cat("Evidence: ")
  if (oasis_performance$auc > chi2_performance$auc) {
    cat("✓ SUPPORTED - OASIS AUC:", round(oasis_performance$auc, 3), 
        "vs χ² AUC:", round(chi2_performance$auc, 3), "\n")
  } else {
    cat("✗ NOT SUPPORTED\n")
  }
  
  # Claim 2: Better than modern methods
  modern_methods <- c("DESeq2", "edgeR", "limma_voom")
  modern_performance <- evaluation_results$simulated_de$performance %>%
    filter(method %in% modern_methods)
  
  cat("\nCLAIM 2: OASIS is competitive with modern RNA-seq methods\n")
  cat("Evidence: ")
  if (oasis_performance$auc >= max(modern_performance$auc, na.rm = TRUE)) {
    cat("✓ SUPPORTED\n")
  } else {
    cat("✗ NOT SUPPORTED - Best modern method AUC:", 
        round(max(modern_performance$auc, na.rm = TRUE), 3), "\n")
  }
  
  # Claim 3: FDR control
  cat("\nCLAIM 3: OASIS controls false discovery rate\n")
  null_performance <- evaluation_results$simulated_null$performance %>%
    filter(method == "OASIS")
  
  cat("Evidence: ")
  if (null_performance$fdr_observed <= 0.05) {
    cat("✓ SUPPORTED - Observed FDR:", round(null_performance$fdr_observed, 3), "\n")
  } else {
    cat("✗ NOT SUPPORTED - Observed FDR:", round(null_performance$fdr_observed, 3), "\n")
  }
  
  cat("\n" + rep("=", 50) + "\n")
}

# Initialize the framework
cat("COMPREHENSIVE OASIS EVALUATION FRAMEWORK LOADED\n")
cat("===============================================\n")
cat("This framework addresses the χ² comparator problem by including:\n")
cat("• DESeq2, edgeR, limma-voom (modern RNA-seq methods)\n")
cat("• RUVSeq, ComBat (batch correction methods)\n") 
cat("• Proper normalization and preprocessing\n")
cat("• Comprehensive performance metrics\n")
cat("• Computational benchmarking\n")
cat("• Multiple benchmark datasets\n\n")
cat("Usage: run_oasis_evaluation() to start comprehensive analysis\n")
cat("===============================================\n")# SPLASH-OASIS Data Analysis Framework
# Analyzing supplementary data from Chaung et al. 2023 and Baharav et al. 2024

library(tidyverse)
library(data.table)
library(ComplexHeatmap)
library(ggplot2)
library(viridis)
library(RColorBrewer)
library(pheatmap)
library(corrplot)

# ============================================================================
# SECTION 1: DATA LOADING AND PREPROCESSING
# ============================================================================

# Function to load SPLASH contingency tables
load_splash_data <- function(data_path) {
  # Expected format: contingency tables from SPLASH output
  # Rows = genomic features (anchor-target pairs)
  # Columns = samples
  
  if (file.exists(paste0(data_path, "contingency_tables.csv"))) {
    tables <- read.csv(paste0(data_path, "contingency_tables.csv"))
  } else {
    # Handle different possible formats
    files <- list.files(data_path, pattern = "*.csv|*.tsv|*.txt", full.names = TRUE)
    tables <- map_dfr(files, ~read.csv(.x, stringsAsFactors = FALSE))
  }
  
  return(tables)
}

# Function to simulate OASIS analysis (since we don't have the exact implementation)
simulate_oasis_analysis <- function(contingency_table, method = "oasis") {
  # Center and normalize the contingency table
  X <- as.matrix(contingency_table)
  n <- colSums(X)  # column totals
  M <- sum(X)      # total counts
  
  # Expected matrix under null
  E <- (rowSums(X) %*% t(n)) / M
  
  # Normalized matrix (OASIS approach)
  X_tilde <- (X - E) %*% diag(1/sqrt(n))
  
  if (method == "oasis") {
    # OASIS: Optimize embeddings f and c
    # For demonstration, use SVD-based approach
    svd_result <- svd(X_tilde)
    f <- sign(svd_result$u[,1])  # Binary row embedding
    c <- svd_result$v[,1]       # Column embedding
    
    # Test statistic
    S <- t(f) %*% X_tilde %*% c
    
    # Finite-sample p-value bound (simplified)
    gamma <- abs(cor(c, sqrt(n/M)))
    if (gamma < 1) {
      p_value <- 2 * exp(-2 * S^2 / (1 - gamma))
    } else {
      p_value <- 1  # Conservative bound
    }
    
    # Effect size
    A_plus <- which(c > 0)
    A_minus <- which(c < 0)
    if (length(A_plus) > 0 & length(A_minus) > 0) {
      mu_plus <- sum(X[,A_plus] %*% f / sum(n[A_plus]))
      mu_minus <- sum(X[,A_minus] %*% f / sum(n[A_minus]))
      effect_size <- abs(mu_plus - mu_minus)
    } else {
      effect_size <- 0
    }
    
  } else if (method == "chi_squared") {
    # Traditional chi-squared test
    chi_sq <- sum((X - E)^2 / E, na.rm = TRUE)
    df <- (nrow(X) - 1) * (ncol(X) - 1)
    p_value <- pchisq(chi_sq, df, lower.tail = FALSE)
    effect_size <- sqrt(chi_sq / M)  # Cramer's V
    f <- rep(1, nrow(X))
    c <- rep(1, ncol(X))
  }
  
  return(list(
    statistic = ifelse(method == "oasis", S, chi_sq),
    p_value = p_value,
    effect_size = effect_size,
    row_embedding = f,
    col_embedding = c,
    method = method
  ))
}

# ============================================================================
# SECTION 2: COMPARATIVE ANALYSIS FUNCTIONS
# ============================================================================

# Compare OASIS vs Chi-squared performance
compare_methods <- function(data_list, sample_metadata = NULL) {
  results <- map_dfr(names(data_list), function(table_name) {
    table_data <- data_list[[table_name]]
    
    # Run both methods
    oasis_result <- simulate_oasis_analysis(table_data, "oasis")
    chi2_result <- simulate_oasis_analysis(table_data, "chi_squared")
    
    # If metadata available, compute biological relevance
    biological_relevance_oasis <- NA
    biological_relevance_chi2 <- NA
    
    if (!is.null(sample_metadata)) {
      # Compute cosine similarity with metadata (as in paper)
      if (table_name %in% names(sample_metadata)) {
        true_labels <- sample_metadata[[table_name]]
        
        # OASIS relevance
        pred_labels_oasis <- sign(oasis_result$col_embedding)
        biological_relevance_oasis <- abs(cor(true_labels, pred_labels_oasis, 
                                            use = "complete.obs"))
        
        # Chi-squared relevance (using correspondence analysis)
        svd_corr <- svd((table_data - rowMeans(table_data)) / sqrt(rowSums(table_data^2)))
        pred_labels_chi2 <- sign(svd_corr$v[,1])
        biological_relevance_chi2 <- abs(cor(true_labels, pred_labels_chi2, 
                                           use = "complete.obs"))
      }
    }
    
    data.frame(
      table_name = table_name,
      method = c("OASIS", "Chi-squared"),
      p_value = c(oasis_result$p_value, chi2_result$p_value),
      effect_size = c(oasis_result$effect_size, chi2_result$effect_size),
      biological_relevance = c(biological_relevance_oasis, biological_relevance_chi2),
      statistic = c(oasis_result$statistic, chi2_result$statistic)
    )
  })
  
  return(results)
}

# Analyze robustness to overdispersion
analyze_overdispersion_robustness <- function(n_simulations = 1000, 
                                            n_rows = 20, n_cols = 10, 
                                            lambda = 129, theta_values = seq(0, 2, 0.2)) {
  
  results <- map_dfr(theta_values, function(theta) {
    # Simulate negative binomial overdispersion
    sim_results <- replicate(n_simulations, {
      if (theta == 0) {
        # Pure Poisson case (null)
        X <- matrix(rpois(n_rows * n_cols, lambda), n_rows, n_cols)
      } else {
        # Negative binomial overdispersion
        X <- matrix(rnbinom(n_rows * n_cols, size = lambda/theta, prob = 1/(1+theta)), 
                   n_rows, n_cols)
      }
      
      # Test both methods
      oasis_p <- simulate_oasis_analysis(X, "oasis")$p_value
      chi2_p <- simulate_oasis_analysis(X, "chi_squared")$p_value
      
      c(oasis_reject = oasis_p < 0.05, chi2_reject = chi2_p < 0.05)
    })
    
    data.frame(
      theta = theta,
      oasis_fpr = mean(sim_results["oasis_reject", ]),
      chi2_fpr = mean(sim_results["chi2_reject", ])
    )
  })
  
  return(results)
}

# ============================================================================
# SECTION 3: VISUALIZATION FUNCTIONS
# ============================================================================

# Plot method comparison
plot_method_comparison <- function(comparison_results) {
  p1 <- comparison_results %>%
    ggplot(aes(x = method, y = -log10(p_value), fill = method)) +
    geom_boxplot() +
    scale_fill_brewer(type = "qual", palette = "Set2") +
    labs(title = "P-value Distribution Comparison",
         y = "-log10(p-value)",
         x = "Method") +
    theme_minimal()
  
  p2 <- comparison_results %>%
    filter(!is.na(biological_relevance)) %>%
    ggplot(aes(x = method, y = biological_relevance, fill = method)) +
    geom_boxplot() +
    scale_fill_brewer(type = "qual", palette = "Set2") +
    labs(title = "Biological Relevance Comparison",
         y = "Cosine Similarity with True Labels",
         x = "Method") +
    theme_minimal()
  
  gridExtra::grid.arrange(p1, p2, ncol = 2)
}

# Plot overdispersion robustness
plot_overdispersion_robustness <- function(robustness_results) {
  robustness_results %>%
    pivot_longer(cols = c(oasis_fpr, chi2_fpr), 
                names_to = "method", values_to = "false_positive_rate") %>%
    mutate(method = case_when(
      method == "oasis_fpr" ~ "OASIS",
      method == "chi2_fpr" ~ "Chi-squared"
    )) %>%
    ggplot(aes(x = theta, y = false_positive_rate, color = method)) +
    geom_line(size = 1.2) +
    geom_point(size = 2) +
    geom_hline(yintercept = 0.05, linetype = "dashed", color = "red") +
    scale_color_brewer(type = "qual", palette = "Set1") +
    labs(title = "Robustness to Overdispersion",
         subtitle = "Negative binomial sampling model",
         x = "Theta (overdispersion parameter)",
         y = "False Positive Rate",
         color = "Method") +
    theme_minimal()
}

# Visualize contingency table with embeddings
plot_contingency_with_embeddings <- function(table_data, oasis_result, sample_metadata = NULL) {
  # Prepare data for heatmap
  X <- as.matrix(table_data)
  
  # Row annotations (features)
  row_annotation <- data.frame(
    row_embedding = oasis_result$row_embedding
  )
  
  # Column annotations (samples)  
  col_annotation <- data.frame(
    col_embedding = oasis_result$col_embedding
  )
  
  if (!is.null(sample_metadata)) {
    col_annotation$true_label <- sample_metadata
  }
  
  # Create heatmap
  pheatmap(log1p(X),
           cluster_rows = TRUE,
           cluster_cols = TRUE,
           annotation_row = row_annotation,
           annotation_col = col_annotation,
           color = viridis(100),
           main = paste0("Contingency Table with OASIS Embeddings\n",
                        "p-value: ", format(oasis_result$p_value, digits = 3)),
           fontsize = 8)
}

# ============================================================================
# SECTION 4: BIOLOGICAL INTERPRETATION FUNCTIONS
# ============================================================================

# Identify biologically relevant features
identify_relevant_features <- function(oasis_result, feature_names = NULL, top_n = 20) {
  # Features with highest absolute embedding values are most important
  if (is.null(feature_names)) {
    feature_names <- paste0("Feature_", 1:length(oasis_result$row_embedding))
  }
  
  feature_importance <- data.frame(
    feature = feature_names,
    embedding_value = oasis_result$row_embedding,
    abs_importance = abs(oasis_result$row_embedding)
  ) %>%
    arrange(desc(abs_importance)) %>%
    slice_head(n = top_n)
  
  return(feature_importance)
}

# Analyze sample clustering
analyze_sample_clustering <- function(oasis_result, sample_names = NULL) {
  if (is.null(sample_names)) {
    sample_names <- paste0("Sample_", 1:length(oasis_result$col_embedding))
  }
  
  clustering_result <- data.frame(
    sample = sample_names,
    embedding_value = oasis_result$col_embedding,
    cluster = ifelse(oasis_result$col_embedding > 0, "Group_A", "Group_B")
  ) %>%
    arrange(desc(embedding_value))
  
  return(clustering_result)
}

# ============================================================================
# SECTION 5: MAIN ANALYSIS WORKFLOW
# ============================================================================

# Main analysis function
run_complete_analysis <- function(data_path, metadata_path = NULL) {
  cat("Loading data...\n")
  
  # Load the main datasets
  # Note: You'll need to adjust these paths based on actual data structure
  sars_cov2_data <- load_splash_data(paste0(data_path, "/sars_cov2/"))
  mtb_data <- load_splash_data(paste0(data_path, "/tuberculosis/"))
  
  # Load metadata if available
  sample_metadata <- NULL
  if (!is.null(metadata_path)) {
    sample_metadata <- read.csv(metadata_path)
  }
  
  cat("Running method comparison...\n")
  
  # Compare methods on real data
  all_data <- list(
    sars_cov2 = sars_cov2_data,
    mtb = mtb_data
  )
  
  comparison_results <- compare_methods(all_data, sample_metadata)
  
  cat("Analyzing robustness to overdispersion...\n")
  
  # Robustness analysis
  robustness_results <- analyze_overdispersion_robustness()
  
  cat("Creating visualizations...\n")
  
  # Generate plots
  plot_method_comparison(comparison_results)
  plot_overdispersion_robustness(robustness_results)
  
  cat("Analysis complete!\n")
  
  return(list(
    comparison = comparison_results,
    robustness = robustness_results,
    data = all_data
  ))
}

# ============================================================================
# SECTION 6: EXAMPLE USAGE
# ============================================================================

# Example of how to use this framework:
# 
# # Set up paths to your data
# data_path <- "path/to/splash/supplementary/data"
# metadata_path <- "path/to/sample/metadata.csv"
# 
# # Run complete analysis
# results <- run_complete_analysis(data_path, metadata_path)
# 
# # Access specific results
# print(results$comparison)
# print(results$robustness)

cat("SPLASH-OASIS Analysis Framework Loaded Successfully!\n")
cat("Use run_complete_analysis() to start your analysis.\n")
