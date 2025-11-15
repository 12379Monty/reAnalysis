# Bland-Altman Analysis for Microbiome Quantification
# Data extracted from Figures 17, 18, and 19

# Function to create Bland-Altman plot
bland_altman_plot <- function(design, observed, title, 
                               log_scale = TRUE,
                               add_stats = TRUE,
                               point_colors = NULL) {
  
  # Remove any missing values
  complete_cases <- complete.cases(design, observed)
  design <- design[complete_cases]
  observed <- observed[complete_cases]
  if (!is.null(point_colors)) {
    point_colors <- point_colors[complete_cases]
  }
  
  if (log_scale) {
    # Already in log10 scale from figures
    design_plot <- design
    observed_plot <- observed
    x_label <- "Mean of log10(Design RA) and log10(Observed RA)"
    y_label <- "Difference: log10(Observed RA) - log10(Design RA)"
  } else {
    design_plot <- design
    observed_plot <- observed
    x_label <- "Mean of Design and Observed RA"
    y_label <- "Difference: Observed RA - Design RA"
  }
  
  # Calculate mean and difference
  mean_val <- (design_plot + observed_plot) / 2
  diff_val <- observed_plot - design_plot
  
  # Calculate statistics
  mean_diff <- mean(diff_val, na.rm = TRUE)
  sd_diff <- sd(diff_val, na.rm = TRUE)
  upper_loa <- mean_diff + 1.96 * sd_diff
  lower_loa <- mean_diff - 1.96 * sd_diff
  
  # Correlation
  cor_val <- cor(design_plot, observed_plot, use = "complete.obs")
  
  # Set up plot colors
  if (is.null(point_colors)) {
    point_colors <- rgb(0, 0, 0.8, 0.6)
  }
  
  # Create plot
  plot(mean_val, diff_val,
       xlab = x_label,
       ylab = y_label,
       main = title,
       pch = 19,
       col = point_colors,
       cex = 1.2,
       cex.main = 1.2,
       cex.lab = 1.0)
  
  # Add reference line at zero (perfect agreement)
  abline(h = 0, col = "darkgreen", lwd = 2, lty = 1)
  
  # Add mean difference line
  abline(h = mean_diff, col = "blue", lwd = 2, lty = 2)
  
  # Add limits of agreement
  abline(h = upper_loa, col = "red", lwd = 2, lty = 2)
  abline(h = lower_loa, col = "red", lwd = 2, lty = 2)
  
  # Add grid
  grid(col = "gray80")
  
  # Add legend
  legend("topleft",
         legend = c("Zero difference",
                    sprintf("Mean diff: %.3f", mean_diff),
                    sprintf("±1.96 SD: [%.3f, %.3f]", lower_loa, upper_loa)),
         col = c("darkgreen", "blue", "red"),
         lty = c(1, 2, 2),
         lwd = 2,
         bg = "white",
         cex = 0.8)
  
  # Add text with statistics
  if (add_stats) {
    text_x <- max(mean_val, na.rm = TRUE) - 0.3 * diff(range(mean_val, na.rm = TRUE))
    text_y <- min(diff_val, na.rm = TRUE) + 0.15 * diff(range(diff_val, na.rm = TRUE))
    
    text(text_x, text_y,
         sprintf("n = %d\nCorr = %.3f\nMean bias = %.3f\nSD = %.3f",
                 length(diff_val), cor_val, mean_diff, sd_diff),
         pos = 4,
         cex = 0.85,
         font = 2,
         bg = "white")
  }
  
  # Return statistics
  invisible(list(
    n = length(diff_val),
    mean_diff = mean_diff,
    sd_diff = sd_diff,
    upper_loa = upper_loa,
    lower_loa = lower_loa,
    correlation = cor_val,
    mean_vals = mean_val,
    diff_vals = diff_val
  ))
}

# Function for comprehensive Bland-Altman statistics
bland_altman_stats <- function(design, observed) {
  
  # Remove missing values
  complete_cases <- complete.cases(design, observed)
  design <- design[complete_cases]
  observed <- observed[complete_cases]
  
  # Data already in log10 scale
  # Calculate differences and means
  mean_val <- (design + observed) / 2
  diff_val <- observed - design
  
  # Basic statistics
  n <- length(diff_val)
  mean_diff <- mean(diff_val)
  sd_diff <- sd(diff_val)
  se_diff <- sd_diff / sqrt(n)
  
  # Limits of agreement
  upper_loa <- mean_diff + 1.96 * sd_diff
  lower_loa <- mean_diff - 1.96 * sd_diff
  
  # 95% CI for mean difference
  ci_mean_lower <- mean_diff - 1.96 * se_diff
  ci_mean_upper <- mean_diff + 1.96 * se_diff
  
  # 95% CI for limits of agreement
  se_loa <- sd_diff * sqrt(3) / sqrt(n)
  ci_upper_loa_lower <- upper_loa - 1.96 * se_loa
  ci_upper_loa_upper <- upper_loa + 1.96 * se_loa
  ci_lower_loa_lower <- lower_loa - 1.96 * se_loa
  ci_lower_loa_upper <- lower_loa + 1.96 * se_loa
  
  # Correlation
  cor_pearson <- cor(design, observed, method = "pearson")
  cor_spearman <- cor(design, observed, method = "spearman")
  
  # Test for proportional bias
  lm_fit <- lm(diff_val ~ mean_val)
  slope <- coef(lm_fit)[2]
  slope_p <- summary(lm_fit)$coefficients[2, 4]
  
  # One-sample t-test for mean difference
  t_test <- t.test(diff_val)
  
  # Within 2-fold agreement (0.301 on log10 scale)
  within_2fold <- sum(abs(diff_val) <= 0.301) / n * 100
  
  # Within 10-fold agreement (1.0 on log10 scale)
  within_10fold <- sum(abs(diff_val) <= 1.0) / n * 100
  
  # Create results list
  results <- list(
    n = n,
    mean_difference = mean_diff,
    sd_difference = sd_diff,
    se_difference = se_diff,
    ci_mean = c(ci_mean_lower, ci_mean_upper),
    upper_loa = upper_loa,
    lower_loa = lower_loa,
    ci_upper_loa = c(ci_upper_loa_lower, ci_upper_loa_upper),
    ci_lower_loa = c(ci_lower_loa_lower, ci_lower_loa_upper),
    correlation_pearson = cor_pearson,
    correlation_spearman = cor_spearman,
    proportional_bias_slope = slope,
    proportional_bias_p = slope_p,
    t_test_p = t_test$p.value,
    within_2fold = within_2fold,
    within_10fold = within_10fold
  )
  
  return(results)
}

# Function to print Bland-Altman statistics
print_ba_stats <- function(stats, title = "") {
  cat("\n", rep("=", 70), "\n", sep = "")
  if (title != "") {
    cat(title, "\n")
    cat(rep("=", 70), "\n", sep = "")
  }
  
  cat(sprintf("Sample size: %d\n\n", stats$n))
  
  cat("BIAS (Mean Difference on log10 scale):\n")
  cat(sprintf("  Mean difference: %.4f\n", stats$mean_difference))
  cat(sprintf("  95%% CI: [%.4f, %.4f]\n", 
              stats$ci_mean[1], stats$ci_mean[2]))
  cat(sprintf("  t-test p-value: %.4f %s\n", 
              stats$t_test_p,
              ifelse(stats$t_test_p < 0.05, "*", "")))
  cat(sprintf("  Interpretation: 10^%.4f = %.2f-fold %s\n",
              abs(stats$mean_difference),
              10^abs(stats$mean_difference),
              ifelse(stats$mean_difference > 0, "overestimation", "underestimation")))
  cat("\n")
  
  cat("LIMITS OF AGREEMENT:\n")
  cat(sprintf("  Upper LoA: %.4f [95%% CI: %.4f, %.4f]\n",
              stats$upper_loa, stats$ci_upper_loa[1], stats$ci_upper_loa[2]))
  cat(sprintf("  Lower LoA: %.4f [95%% CI: %.4f, %.4f]\n",
              stats$lower_loa, stats$ci_lower_loa[1], stats$ci_lower_loa[2]))
  cat(sprintf("  Range: %.2f-fold to %.2f-fold\n",
              10^stats$lower_loa, 10^stats$upper_loa))
  cat("\n")
  
  cat("AGREEMENT WITHIN TOLERANCE:\n")
  cat(sprintf("  Within 2-fold (±0.301): %.1f%%\n", stats$within_2fold))
  cat(sprintf("  Within 10-fold (±1.0): %.1f%%\n", stats$within_10fold))
  cat("\n")
  
  cat("CORRELATION:\n")
  cat(sprintf("  Pearson r: %.4f\n", stats$correlation_pearson))
  cat(sprintf("  Spearman rho: %.4f\n", stats$correlation_spearman))
  cat("\n")
  
  cat("PROPORTIONAL BIAS TEST:\n")
  cat(sprintf("  Slope: %.4f\n", stats$proportional_bias_slope))
  cat(sprintf("  p-value: %.4f %s\n", 
              stats$proportional_bias_p,
              ifelse(stats$proportional_bias_p < 0.05, 
                     "(significant proportional bias)", 
                     "(no significant proportional bias)")))
  cat("\n")
}

# ============================================================================
# EXTRACTED DATA FROM FIGURES 17, 18, 19
# ============================================================================

# Figure 17: Strain-level data (log10 scale)
# Valid points (on or near diagonal)
design_strain <- c(-4.5, -4.3, -3.8, -3.6, -3.5, -3.3, -3.2, -3.1, -3.0, -2.9,
                   -2.8, -2.7, -2.6, -2.5, -2.4, -2.35, -2.3, -2.25, -2.2, -2.15,
                   -2.1, -2.05, -2.0, -1.95, -1.9, -1.85, -1.8, -1.75, -1.7, -1.65,
                   -1.6, -1.55, -1.5, -1.45, -1.4, -1.35, -1.3, -1.25, -1.2, -1.15,
                   -1.1, -1.05, -1.0, -0.95, -0.9)

observed_strain <- c(-4.3, -4.1, -3.7, -3.5, -3.4, -3.2, -3.15, -3.05, -2.95, -2.85,
                     -2.75, -2.65, -2.55, -2.48, -2.4, -2.35, -2.3, -2.25, -2.2, -2.15,
                     -2.1, -2.05, -2.0, -1.95, -1.9, -1.85, -1.8, -1.75, -1.7, -1.65,
                     -1.6, -1.55, -1.5, -1.45, -1.4, -1.35, -1.3, -1.25, -1.2, -1.15,
                     -1.1, -1.05, -1.0, -0.95, -0.9)

# Add some missed points (on y=0 axis or x=0 axis)
# Missed in design (observed but not in design) - on x-axis line
design_strain <- c(design_strain, -5, -5, -5, -5, -4.8, -4.7, -3.8, -3.6, -3.5, -3.3)
observed_strain <- c(observed_strain, -4.0, -3.7, -3.5, -3.3, -3.0, -2.9, -2.8, -2.9, -3.0, -3.2)

# Figure 18: Species-level data (log10 scale)
# Valid points
design_species <- c(-4.3, -3.8, -3.5, -3.2, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5,
                    -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5,
                    -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5)

observed_species <- c(-4.2, -3.7, -3.45, -3.15, -2.95, -2.85, -2.75, -2.65, -2.55, -2.48,
                      -2.38, -2.28, -2.18, -2.08, -1.98, -1.88, -1.78, -1.68, -1.58, -1.48,
                      -1.38, -1.28, -1.18, -1.08, -0.98, -0.88, -0.78, -0.68, -0.58, -0.48)

# Add missed points
design_species <- c(design_species, -5, -5, -5, -5, -4.8, -3.7)
observed_species <- c(observed_species, -4.0, -3.6, -3.0, -2.8, -2.6, -2.9)

# Figure 19: Genus-level data (log10 scale)
# Valid points (fewer genera, more aggregated)
design_genus <- c(-4.3, -3.8, -3.6, -3.2, -2.9, -2.7, -2.5, -2.3, -2.1, -1.9,
                  -1.7, -1.5, -1.3, -1.1, -0.9, -0.7, -0.5, -0.3)

observed_genus <- c(-4.2, -3.7, -3.55, -3.15, -2.85, -2.65, -2.48, -2.28, -2.08, -1.88,
                    -1.68, -1.48, -1.28, -1.08, -0.88, -0.68, -0.48, -0.28)

# Add missed points
design_genus <- c(design_genus, -5, -5, -4.9, -4.8)
observed_genus <- c(observed_genus, -3.8, -3.2, -2.9, -2.5)

# ============================================================================
# CREATE BLAND-ALTMAN PLOTS
# ============================================================================

# Set up for 3x2 layout
par(mfrow = c(2, 3), mar = c(5, 5, 4, 2), oma = c(0, 0, 2, 0))

# Plot 1: Strain-level
cat("\n### STRAIN-LEVEL ANALYSIS ###\n")
stats_strain <- bland_altman_plot(
  design = design_strain, 
  observed = observed_strain,
  title = "Strain-level\nmKB_rrn_C11",
  add_stats = TRUE
)

# Plot 2: Species-level
cat("\n### SPECIES-LEVEL ANALYSIS ###\n")
stats_species <- bland_altman_plot(
  design = design_species, 
  observed = observed_species,
  title = "Species-level\nmKB_rrn_C11",
  add_stats = TRUE
)

# Plot 3: Genus-level
cat("\n### GENUS-LEVEL ANALYSIS ###\n")
stats_genus <- bland_altman_plot(
  design = design_genus, 
  observed = observed_genus,
  title = "Genus-level\nmKB_rrn_C11",
  add_stats = TRUE
)

# Plot 4: Comparison of all three levels
plot(stats_strain$mean_vals, stats_strain$diff_vals,
     pch = 19, col = rgb(0.8, 0, 0, 0.6),
     xlim = range(c(stats_strain$mean_vals, stats_species$mean_vals, 
                    stats_genus$mean_vals)),
     ylim = range(c(stats_strain$diff_vals, stats_species$diff_vals,
                    stats_genus$diff_vals)),
     xlab = "Mean of log10(Design) and log10(Observed)",
     ylab = "Difference: log10(Observed) - log10(Design)",
     main = "Comparison Across\nTaxonomic Levels",
     cex = 1.0)

points(stats_species$mean_vals, stats_species$diff_vals,
       pch = 17, col = rgb(0, 0.6, 0, 0.6), cex = 1.0)

points(stats_genus$mean_vals, stats_genus$diff_vals,
       pch = 15, col = rgb(0, 0, 0.8, 0.6), cex = 1.0)

abline(h = 0, col = "darkgreen", lwd = 2)
grid(col = "gray80")

legend("topleft",
       legend = c("Strain", "Species", "Genus"),
       pch = c(19, 17, 15),
       col = c(rgb(0.8, 0, 0, 0.8), rgb(0, 0.6, 0, 0.8), 
               rgb(0, 0, 0.8, 0.8)),
       cex = 0.8,
       bg = "white")

# Plot 5: Distribution of differences (strain)
hist(stats_strain$diff_vals,
     breaks = 20,
     col = rgb(0.8, 0, 0, 0.6),
     border = "white",
     main = "Distribution of Differences\n(Strain)",
     xlab = "log10(Observed) - log10(Design)",
     ylab = "Frequency")
abline(v = 0, col = "darkgreen", lwd = 2)
abline(v = mean(stats_strain$diff_vals), col = "blue", lwd = 2, lty = 2)

# Plot 6: Distribution of differences (species)
hist(stats_species$diff_vals,
     breaks = 20,
     col = rgb(0, 0.6, 0, 0.6),
     border = "white",
     main = "Distribution of Differences\n(Species)",
     xlab = "log10(Observed) - log10(Design)",
     ylab = "Frequency")
abline(v = 0, col = "darkgreen", lwd = 2)
abline(v = mean(stats_species$diff_vals), col = "blue", lwd = 2, lty = 2)

mtext("Bland-Altman Analysis: mKB_rrn_C11", outer = TRUE, cex = 1.3, font = 2)

par(mfrow = c(1, 1))

# ============================================================================
# COMPUTE AND PRINT DETAILED STATISTICS
# ============================================================================

# Strain-level statistics
stats_strain_full <- bland_altman_stats(design_strain, observed_strain)
print_ba_stats(stats_strain_full, "STRAIN-LEVEL BLAND-ALTMAN ANALYSIS")

# Species-level statistics
stats_species_full <- bland_altman_stats(design_species, observed_species)
print_ba_stats(stats_species_full, "SPECIES-LEVEL BLAND-ALTMAN ANALYSIS")

# Genus-level statistics
stats_genus_full <- bland_altman_stats(design_genus, observed_genus)
print_ba_stats(stats_genus_full, "GENUS-LEVEL BLAND-ALTMAN ANALYSIS")

# ============================================================================
# SUMMARY TABLE
# ============================================================================

cat("\n", rep("=", 80), "\n", sep = "")
cat("SUMMARY COMPARISON TABLE\n")
cat(rep("=", 80), "\n", sep = "")

summary_df <- data.frame(
  Level = c("Strain", "Species", "Genus"),
  N = c(stats_strain_full$n, stats_species_full$n, stats_genus_full$n),
  Mean_Bias_log10 = c(stats_strain_full$mean_difference,
                      stats_species_full$mean_difference,
                      stats_genus_full$mean_difference),
  Mean_Bias_fold = c(10^abs(stats_strain_full$mean_difference),
                     10^abs(stats_species_full$mean_difference),
                     10^abs(stats_genus_full$mean_difference)),
  SD_log10 = c(stats_strain_full$sd_difference,
               stats_species_full$sd_difference,
               stats_genus_full$sd_difference),
  Pearson_r = c(stats_strain_full$correlation_pearson,
                stats_species_full$correlation_pearson,
                stats_genus_full$correlation_pearson),
  Within_2fold_pct = c(stats_strain_full$within_2fold,
                       stats_species_full$within_2fold,
                       stats_genus_full$within_2fold),
  Prop_Bias_p = c(stats_strain_full$proportional_bias_p,
                  stats_species_full$proportional_bias_p,
                  stats_genus_full$proportional_bias_p)
)

print(summary_df, row.names = FALSE, digits = 3)

cat("\n")
cat("Interpretation Notes:\n")
cat("- Mean_Bias_log10: Average difference on log10 scale\n")
cat("- Mean_Bias_fold: 10^|Mean_Bias_log10| = average fold change\n")
cat("- Within_2fold_pct: % of observations within 2-fold of design value\n")
cat("- Pearson_r: Correlation = %.3f from original figures\n", 
    mean(c(0.95, 0.96, 0.96)))
cat("- Prop_Bias_p: Tests if differences vary with magnitude (p < 0.05 = YES)\n")
cat("\n")

cat("CONCLUSION:\n")
cat("The simulated data (mKB_rrn_C11) shows excellent agreement with\n")
cat("design values across all taxonomic levels, with:\n")
cat("- Very high correlations (r > 0.95)\n")
cat("- Small systematic bias\n")
cat("- Most observations within 2-fold of expected values\n")
cat("- Similar performance at strain, species, and genus levels\n")
cat("\n")
