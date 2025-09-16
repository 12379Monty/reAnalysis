# Load required libraries
library(cluster)
library(ggplot2)
library(dplyr)
library(gridExtra)
library(RColorBrewer)

# Set seed for reproducibility
set.seed(42)

# Function to generate 4 clusters targeting silhouette ~0.50
generate_silhouette_data <- function(n_per_cluster = 60, 
                                   centers = list(c(0, 0), c(3.2, 0), c(1.6, 2.8), c(1.6, -2.8)),
                                   cluster_sd = 0.85) {
  
  # Initialize containers
  data_list <- list()
  labels <- c()
  
  # Generate data for each cluster
  for (i in 1:4) {
    # Generate normally distributed points around each center
    cluster_data <- matrix(rnorm(n_per_cluster * 2, mean = 0, sd = cluster_sd), 
                          ncol = 2)
    # Shift to cluster center
    cluster_data[, 1] <- cluster_data[, 1] + centers[[i]][1]
    cluster_data[, 2] <- cluster_data[, 2] + centers[[i]][2]
    
    data_list[[i]] <- cluster_data
    labels <- c(labels, rep(i, n_per_cluster))
  }
  
  # Combine all data
  data <- do.call(rbind, data_list)
  colnames(data) <- c("x", "y")
  
  return(list(data = data, labels = labels))
}

# Generate the data
result <- generate_silhouette_data()
data <- result$data
labels <- result$labels

# Calculate silhouette scores
dist_matrix <- dist(data)
sil_scores <- silhouette(labels, dist_matrix)
overall_silhouette <- mean(sil_scores[, 3])

# Create data frame for visualization
data_df <- data.frame(
  x = data[, 1],
  y = data[, 2],
  cluster = as.factor(labels),
  silhouette = sil_scores[, 3],
  point_id = 1:nrow(data)
)

# Print summary statistics
cat("=== SILHOUETTE ANALYSIS RESULTS ===\n")
cat(sprintf("Overall Silhouette Score: %.4f\n", overall_silhouette))
cat(sprintf("Target: 0.50 (Difference: %.4f)\n", abs(overall_silhouette - 0.50)))
cat(sprintf("Total points: %d (%d per cluster)\n", nrow(data), nrow(data)/4))

cat("\n=== SILHOUETTE SCORE DISTRIBUTION ===\n")
print(summary(sil_scores[, 3]))

cat("\n=== SILHOUETTE BY CLUSTER ===\n")
sil_by_cluster <- data_df %>%
  group_by(cluster) %>%
  summarise(
    count = n(),
    mean_silhouette = mean(silhouette),
    median_silhouette = median(silhouette),
    min_silhouette = min(silhouette),
    max_silhouette = max(silhouette),
    sd_silhouette = sd(silhouette),
    .groups = 'drop'
  )
print(sil_by_cluster)

# Define color palette
cluster_colors <- c("#e74c3c", "#3498db", "#2ecc71", "#f39c12")
names(cluster_colors) <- 1:4

# Plot 1: Scatter plot of clusters
p1 <- ggplot(data_df, aes(x = x, y = y, color = cluster)) +
  geom_point(alpha = 0.7, size = 2) +
  scale_color_manual(values = cluster_colors) +
  labs(
    title = sprintf("4-Cluster Data in R² (Overall Silhouette = %.4f)", overall_silhouette),
    subtitle = sprintf("Target: 0.50 | Difference: %.4f", abs(overall_silhouette - 0.50)),
    x = "X coordinate", 
    y = "Y coordinate",
    color = "Cluster"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold"),
    plot.subtitle = element_text(size = 12),
    legend.position = "bottom"
  ) +
  coord_equal()

print(p1)

# Plot 2: Silhouette plot (ordered by silhouette score)
data_df_ordered <- data_df %>% arrange(silhouette)
data_df_ordered$order <- 1:nrow(data_df_ordered)

p2 <- ggplot(data_df_ordered, aes(x = order, y = silhouette, fill = cluster)) +
  geom_bar(stat = "identity", width = 1) +
  geom_hline(yintercept = overall_silhouette, 
             linetype = "dashed", color = "red", size = 1) +
  scale_fill_manual(values = cluster_colors) +
  labs(
    title = "Silhouette Plot by Sample",
    subtitle = sprintf("Red line: Overall silhouette = %.4f", overall_silhouette),
    x = "Sample (ordered by silhouette score)", 
    y = "Silhouette coefficient",
    fill = "Cluster"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold"),
    axis.text.x = element_blank(),
    axis.ticks.x = element_blank(),
    legend.position = "bottom"
  ) +
  ylim(-1, 1)

print(p2)

# Plot 3: Silhouette histogram by cluster
p3 <- ggplot(data_df, aes(x = silhouette, fill = cluster)) +
  geom_histogram(alpha = 0.7, bins = 30, position = "identity") +
  geom_vline(xintercept = overall_silhouette, 
             linetype = "dashed", color = "red", size = 1) +
  scale_fill_manual(values = cluster_colors) +
  facet_wrap(~ paste("Cluster", cluster), scales = "free_y") +
  labs(
    title = "Silhouette Score Distribution by Cluster",
    subtitle = sprintf("Red line: Overall silhouette = %.4f", overall_silhouette),
    x = "Silhouette coefficient",
    y = "Count",
    fill = "Cluster"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold"),
    legend.position = "none"
  )

print(p3)

# Plot 4: Box plot of silhouette scores by cluster
p4 <- ggplot(data_df, aes(x = cluster, y = silhouette, fill = cluster)) +
  geom_boxplot(alpha = 0.7, outlier.alpha = 0.5) +
  geom_hline(yintercept = overall_silhouette, 
             linetype = "dashed", color = "red", size = 1) +
  scale_fill_manual(values = cluster_colors) +
  labs(
    title = "Silhouette Score Distribution by Cluster",
    subtitle = sprintf("Red line: Overall silhouette = %.4f", overall_silhouette),
    x = "Cluster",
    y = "Silhouette coefficient",
    fill = "Cluster"
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold"),
    legend.position = "none"
  )

print(p4)

# Manual verification of silhouette calculation for first 5 points
cat("\n=== MANUAL SILHOUETTE VERIFICATION ===\n")
cat("Verifying silhouette calculation for first 5 points:\n")

# Convert distance matrix to matrix for easier indexing
dist_mat <- as.matrix(dist_matrix)

for (i in 1:5) {
  cluster_i <- labels[i]
  
  # Find points in same cluster (excluding point i)
  same_cluster <- which(labels == cluster_i & 1:length(labels) != i)
  
  # Calculate a(i) - mean distance to same cluster
  if (length(same_cluster) > 0) {
    a_i <- mean(dist_mat[i, same_cluster])
  } else {
    a_i <- 0  # Only point in cluster
  }
  
  # Calculate b(i) - minimum mean distance to other clusters
  b_i <- Inf
  for (k in setdiff(1:4, cluster_i)) {
    other_cluster <- which(labels == k)
    if (length(other_cluster) > 0) {
      b_k <- mean(dist_mat[i, other_cluster])
      b_i <- min(b_i, b_k)
    }
  }
  
  # Calculate silhouette coefficient
  if (b_i == Inf) {
    s_i <- 0
  } else {
    s_i <- (b_i - a_i) / max(a_i, b_i)
  }
  
  cat(sprintf("Point %d (Cluster %d): a(i)=%.3f, b(i)=%.3f, s(i)=%.3f (Library: %.3f)\n", 
              i, cluster_i, a_i, b_i, s_i, sil_scores[i, 3]))
}

# Sample of the generated data
cat("\n=== SAMPLE DATA ===\n")
cat("First 10 rows of generated data:\n")
sample_data <- data_df %>% 
  select(point_id, x, y, cluster, silhouette) %>%
  head(10)
print(sample_data)

# Cluster centers used
cat("\n=== CLUSTER CENTERS ===\n")
centers_used <- list(c(0, 0), c(3.2, 0), c(1.6, 2.8), c(1.6, -2.8))
for (i in 1:length(centers_used)) {
  cat(sprintf("Cluster %d: (%.1f, %.1f)\n", i, centers_used[[i]][1], centers_used[[i]][2]))
}

# Points with extreme silhouette scores
cat("\n=== EXTREME SILHOUETTE SCORES ===\n")
cat("Points with highest silhouette scores:\n")
best_points <- data_df %>% 
  arrange(desc(silhouette)) %>% 
  head(5) %>%
  select(point_id, cluster, x, y, silhouette)
print(best_points)

cat("\nPoints with lowest silhouette scores:\n")
worst_points <- data_df %>% 
  arrange(silhouette) %>% 
  head(5) %>%
  select(point_id, cluster, x, y, silhouette)
print(worst_points)

# Export data to CSV (optional)
# write.csv(data_df, "silhouette_data_050.csv", row.names = FALSE)
# cat("\nData exported to 'silhouette_data_050.csv'\n")

# Interpretation guide
cat("\n=== INTERPRETATION GUIDE ===\n")
interpretation <- if (overall_silhouette > 0.7) {
  "Strong clustering structure"
} else if (overall_silhouette > 0.5) {
  "Reasonable clustering structure"
} else if (overall_silhouette > 0.25) {
  "Weak clustering structure"
} else {
  "Poor clustering structure"
}

cat(sprintf("Overall Silhouette Score %.4f indicates: %s\n", overall_silhouette, interpretation))
cat("• Scores close to 1: Well-clustered points\n")
cat("• Scores close to 0: Points on cluster boundaries\n")
cat("• Negative scores: Likely misclassified points\n")
cat("• Target 0.50: Moderately good clustering with some boundary ambiguity\n")