# Load required libraries
library(cluster)
library(ggplot2)
library(dplyr)

# Set seed for reproducibility
set.seed(42)

# Function to calculate silhouette score for given parameters
simulate_and_score <- function(n_per_cluster = 50, 
                               centers = list(c(0, 0), c(3, 0), c(1.5, 2.6), c(1.5, -2.6)),
                               cluster_sd = 0.8) {
  
  # Generate data for 4 clusters
  data_list <- list()
  labels <- c()
  
  for (i in 1:4) {
    # Generate points around each center
    cluster_data <- matrix(rnorm(n_per_cluster * 2, mean = 0, sd = cluster_sd), 
                          ncol = 2)
    cluster_data[, 1] <- cluster_data[, 1] + centers[[i]][1]
    cluster_data[, 2] <- cluster_data[, 2] + centers[[i]][2]
    
    data_list[[i]] <- cluster_data
    labels <- c(labels, rep(i, n_per_cluster))
  }
  
  # Combine all data
  data <- do.call(rbind, data_list)
  
  # Calculate silhouette scores
  dist_matrix <- dist(data)
  sil_scores <- silhouette(labels, dist_matrix)
  overall_silhouette <- mean(sil_scores[, 3])
  
  return(list(
    data = data,
    labels = labels,
    silhouette_scores = sil_scores,
    overall_silhouette = overall_silhouette
  ))
}

# Iteratively tune parameters to get close to 0.50
target_silhouette <- 0.50
best_result <- NULL
best_diff <- Inf

# Try different parameter combinations
n_per_cluster <- 60
centers_configs <- list(
  list(c(0, 0), c(2.8, 0), c(1.4, 2.4), c(1.4, -2.4)),
  list(c(0, 0), c(3.2, 0), c(1.6, 2.8), c(1.6, -2.8)),
  list(c(0, 0), c(3.5, 0), c(1.75, 3.0), c(1.75, -3.0))
)

sd_values <- seq(0.7, 1.1, by = 0.05)

cat("Searching for optimal parameters...\n")

for (centers in centers_configs) {
  for (cluster_sd in sd_values) {
    for (seed_val in 40:50) {
      set.seed(seed_val)
      result <- simulate_and_score(n_per_cluster, centers, cluster_sd)
      diff <- abs(result$overall_silhouette - target_silhouette)
      
      if (diff < best_diff) {
        best_diff <- diff
        best_result <- result
        best_params <- list(
          n_per_cluster = n_per_cluster,
          centers = centers,
          cluster_sd = cluster_sd,
          seed = seed_val
        )
      }
    }
  }
}

# Use the best result found
final_result <- best_result
cat(sprintf("Best overall silhouette achieved: %.4f (target: %.2f)\n", 
            final_result$overall_silhouette, target_silhouette))
cat(sprintf("Parameters: n_per_cluster=%d, cluster_sd=%.2f, seed=%d\n",
            best_params$n_per_cluster, best_params$cluster_sd, best_params$seed))

# Create the final dataset
data_df <- data.frame(
  x = final_result$data[, 1],
  y = final_result$data[, 2],
  cluster = as.factor(final_result$labels),
  silhouette = final_result$silhouette_scores[, 3]
)

# Summary statistics
cat("\nSilhouette Summary:\n")
print(summary(final_result$silhouette_scores[, 3]))

cat("\nSilhouette by Cluster:\n")
sil_by_cluster <- data_df %>%
  group_by(cluster) %>%
  summarise(
    mean_silhouette = mean(silhouette),
    min_silhouette = min(silhouette),
    max_silhouette = max(silhouette),
    .groups = 'drop'
  )
print(sil_by_cluster)

# Create visualization
p1 <- ggplot(data_df, aes(x = x, y = y, color = cluster)) +
  geom_point(alpha = 0.7, size = 2) +
  scale_color_brewer(type = "qual", palette = "Set1") +
  labs(title = sprintf("4-Cluster Data in R² (Overall Silhouette = %.4f)", 
                      final_result$overall_silhouette),
       x = "X coordinate", y = "Y coordinate") +
  theme_minimal() +
  theme(legend.position = "bottom") +
  coord_equal()

print(p1)

# Silhouette plot
p2 <- ggplot(data_df, aes(x = reorder(1:nrow(data_df), silhouette), 
                         y = silhouette, fill = cluster)) +
  geom_bar(stat = "identity", width = 1) +
  geom_hline(yintercept = final_result$overall_silhouette, 
             linetype = "dashed", color = "red", size = 1) +
  scale_fill_brewer(type = "qual", palette = "Set1") +
  labs(title = "Silhouette Plot by Sample",
       x = "Sample (ordered by silhouette score)", 
       y = "Silhouette coefficient",
       caption = sprintf("Red line: Overall silhouette = %.4f", 
                        final_result$overall_silhouette)) +
  theme_minimal() +
  theme(axis.text.x = element_blank(), axis.ticks.x = element_blank())

print(p2)

# Export the data coordinates and cluster assignments
cat("\nFirst 10 rows of generated data:\n")
print(head(data_df, 10))

cat("\nCluster centers used:\n")
for (i in 1:length(best_params$centers)) {
  cat(sprintf("Cluster %d: (%.2f, %.2f)\n", 
              i, best_params$centers[[i]][1], best_params$centers[[i]][2]))
}

# Verify silhouette calculation manually for first few points
cat("\nManual verification for first 3 points:\n")
dist_matrix <- as.matrix(dist(final_result$data))
for (i in 1:3) {
  cluster_i <- final_result$labels[i]
  same_cluster <- which(final_result$labels == cluster_i & 1:length(final_result$labels) != i)
  a_i <- mean(dist_matrix[i, same_cluster])
  
  b_i <- Inf
  for (k in setdiff(1:4, cluster_i)) {
    other_cluster <- which(final_result$labels == k)
    b_k <- mean(dist_matrix[i, other_cluster])
    b_i <- min(b_i, b_k)
  }
  
  s_i <- (b_i - a_i) / max(a_i, b_i)
  cat(sprintf("Point %d (cluster %d): a(i)=%.3f, b(i)=%.3f, s(i)=%.3f\n", 
              i, cluster_i, a_i, b_i, s_i))
}