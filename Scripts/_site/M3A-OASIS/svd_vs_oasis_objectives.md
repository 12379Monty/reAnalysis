# SVD vs OASIS: Mathematical Objectives Comparison

## The Two Optimization Objectives

From Section S.3.E of the OASIS supplementary materials (Baharav, Tse, and Salzman):

### SVD Objective

The Singular Value Decomposition (SVD) computes:

$$\argmax_{c, f} \frac{f^{\top} \tilde{X} c}{\|f\|_2 \|c\|_2}$$

### OASIS p-value Bound Objective

In contrast, OASIS optimizes the p-value bound by computing:

$$\argmax_{c, f} \frac{f^{\top} \tilde{X} c}{\|f\|_{\infty} \|c\|_2}$$

## The Key Difference

**The only difference is in how $f$ is normalized:**

- **SVD uses:** $\|f\|_2 = \sqrt{\sum_i f_i^2}$ (Euclidean/L2 norm)
- **OASIS uses:** $\|f\|_{\infty} = \max_i |f_i|$ (maximum/L-infinity norm)

Both use $\|c\|_2$ for the column vector $c$.

## What This Means

### Notation
- $\tilde{X}$ is the centered and normalized contingency table
- $f$ is the row embedding vector (weights for rows/features)
- $c$ is the column embedding vector (weights for samples)
- $f^{\top} \tilde{X} c$ is the test statistic (a bilinear form)

### SVD Interpretation

$$\frac{f^{\top} \tilde{X} c}{\|f\|_2 \|c\|_2}$$

- Maximizes the correlation-like quantity between rows and columns
- Penalizes $f$ based on its **total squared magnitude**
- Encourages $f$ to distribute weight across multiple rows
- **Effect:** Finds principal directions capturing the most variance
- This is equivalent to finding the largest singular value

### OASIS Interpretation

$$\frac{f^{\top} \tilde{X} c}{\|f\|_{\infty} \|c\|_2}$$

- Maximizes the same numerator (test statistic)
- Penalizes $f$ based only on its **largest element**
- **Does not penalize** spreading weight across many rows (as long as max is controlled)
- **Effect:** Can put weight on many rows simultaneously
- This leads to the p-value bound via Hoeffding's inequality

## Why OASIS Uses $\|f\|_{\infty}$

### The Statistical Reason

From the OASIS paper, the test statistic is:

$$T = f^{\top} \tilde{X} c = \sum_{i,j} f_i \tilde{X}_{ij} c_j$$

Under the null hypothesis, $\tilde{X}_{ij}$ are (approximately) independent random variables.

**Hoeffding's inequality** bounds the probability that a weighted sum of bounded random variables deviates from its mean. The bound depends on:
- The range of each random variable
- The **maximum weight** (not the sum of squared weights)

**Key insight:** For concentration inequalities, what matters is $\max_i |f_i|$, not $\sqrt{\sum_i f_i^2}$.

### The Mathematical Connection

**Hoeffding's bound:** If $X_1, \ldots, X_n$ are independent with $X_i \in [a_i, b_i]$ and $\sum_i w_i X_i$ is their weighted sum, then:

$$P\left(\left|\sum_i w_i X_i - \mathbb{E}\left[\sum_i w_i X_i\right]\right| \geq t\right) \leq 2\exp\left(\frac{-2t^2}{\sum_i w_i^2(b_i - a_i)^2}\right)$$

For OASIS's setup:
- Want to bound $P(f^{\top} \tilde{X} c \geq t)$
- The bound involves $\sum_i f_i^2 \times (\text{range})^2$
- With appropriate normalization, this becomes $\|f\|_{\infty}^2$

**Therefore:** The $\|f\|_{\infty}$ term in the denominator is **exactly what appears in the p-value bound**, not an arbitrary choice.

## Practical Implications

### SVD Behavior

When you maximize $\frac{f^{\top} \tilde{X} c}{\|f\|_2 \|c\|_2}$:

**Example:** Suppose you have two rows with signal:
- Row 1 has moderate correlation with column pattern
- Row 2 has moderate correlation with column pattern

**SVD solution:** Put weight on both rows (e.g., $f_1 = f_2 = 0.707$)
- Numerator: Gets contribution from both rows
- Denominator: $\|f\|_2 = \sqrt{0.707^2 + 0.707^2} = 1$
- **Combines signal from multiple rows**

### OASIS Behavior

When you maximize $\frac{f^{\top} \tilde{X} c}{\|f\|_{\infty} \|c\|_2}$:

**Same example:**

**OASIS solution:** Put weight on both rows (e.g., $f_1 = f_2 = 1$)
- Numerator: Gets contribution from both rows (twice as much as SVD)
- Denominator: $\|f\|_{\infty} = \max(1, 1) = 1$
- **Can freely combine multiple rows without additional penalty**

**Key difference:** OASIS is not penalized for using many rows (as long as no single weight is too large), while SVD is penalized by the sum of squares.

## The Trade-off

### SVD Advantages
- **Variance maximization:** Finds directions explaining most variation
- **Orthogonal decomposition:** Subsequent components are uncorrelated
- **Well-understood:** Decades of theory and practice
- **Stable:** Small data changes → small solution changes

### OASIS Advantages  
- **Statistical validity:** P-value bound is mathematically justified
- **Sparse-data robustness:** $\|f\|_{\infty}$ term handles low counts better
- **Interpretability (claimed):** Binary $f$ for clustering
- **Focused power:** Can concentrate on specific row patterns

### SVD Disadvantages
- **No p-values:** Doesn't provide statistical significance
- **Asymmetric treatment:** Both rows and columns use L2 norm
- **Arbitrary scaling:** How "significant" is the first singular value?

### OASIS Disadvantages
- **Computational complexity:** $\|f\|_{\infty}$ constraint makes optimization harder (NP-hard)
- **Local optima:** Alternating maximization doesn't guarantee global optimum
- **Data splitting:** Uses train/test split, throwing away half the data
- **Limited theory:** Asymptotic properties less developed than SVD

## A Critical Perspective

### Is This Really Better?

**The claim:** OASIS provides "statistically valid" p-values while SVD doesn't.

**The reality:**
1. **Both are fitting a model to high-dimensional data** (K rows, N columns)
2. **Both involve optimization** that may not find the global optimum
3. **Both make assumptions** (independence, distributional forms)
4. **OASIS adds data splitting** (train/test), which reduces power

**The question:** When K is in the thousands and N is in the tens:
- Is an "exact finite-sample p-value" more trustworthy than SVD's eigenvalue?
- Or have both methods entered the "complex model fit to sparse data" regime?

### The Optimization Problem

Both objectives try to maximize $f^{\top} \tilde{X} c$, just with different normalization.

**But:** With K rows and N columns:
- There are $2^K$ possible binary vectors $f$ (if restricting to {-1, 1})
- Finding the optimal $f$ is **NP-hard** for both formulations
- **In practice:** Use greedy algorithms (alternating maximization)
- **Result:** You get a local optimum, not the global optimum

**Implication:** The "exact p-value" is for **the $f$ you found**, not the optimal $f$. This introduces unquantified uncertainty.

## When Does the Difference Matter?

### Scenario 1: Strong Signal in Few Rows

**Setup:** 2-3 rows have strong signal, rest are noise

**SVD:** Puts most weight on those 2-3 rows, some weight on noise rows (due to L2 penalty)

**OASIS:** Puts weight primarily on those 2-3 rows (L∞ doesn't penalize this)

**Winner:** OASIS might have slightly better power (but probably small difference)

### Scenario 2: Diffuse Signal Across Many Rows

**Setup:** 50 rows each have weak signal

**SVD:** Spreads weight across all 50 rows, captures cumulative signal

**OASIS:** Can also spread weight across 50 rows (no penalty from L∞ as long as weights are similar)

**Winner:** Similar performance, but SVD has cleaner interpretation

### Scenario 3: Sparse Contingency Table

**Setup:** Many cells with zero or small counts

**SVD:** Standardization by $\sqrt{\sum_i f_i^2}$ can amplify noise in low-count rows

**OASIS:** Standardization by $\max_i |f_i|$ is more conservative

**Winner:** OASIS may be more robust (this is the claimed advantage)

## The Bottom Line

### Mathematical Perspective

The difference between $\|f\|_2$ and $\|f\|_{\infty}$ reflects:
- **SVD:** Variance decomposition framework
- **OASIS:** Concentration inequality framework

These are genuinely different mathematical approaches.

### Statistical Perspective

The key question is: **Does the framework matter when K is large and N is small?**

**Arguments for "No":**
1. Both involve optimization that finds local optima
2. Both fit complex models to sparse data
3. Both make distributional assumptions that are approximate
4. OASIS throws away half the data (train/test split)
5. In high dimensions, the distinction between "exact p-value" and "useful approximation" becomes philosophical

**Arguments for "Yes":**
1. Having a p-value bound (even approximate) is better than no p-value
2. Concentration inequalities provide interpretable guarantees
3. Robustness to sparse data is valuable
4. The $\|f\|_{\infty}$ normalization is mathematically justified by Hoeffding

### Practical Perspective

**For most genomics applications:**
- Prediction accuracy and biological validation matter more than exact p-values
- Replication in independent cohorts is the gold standard
- Whether you use SVD or OASIS is less important than:
  - Quality of data
  - Appropriate preprocessing
  - Biological interpretation
  - Independent validation

**OASIS's real contribution may be:**
- Not the p-value itself
- But rather: A different way to think about matrix decomposition
- That happens to be more robust to sparsity
- And provides a statistical framework (even if approximate)

## Conclusion

The mathematical difference between SVD and OASIS is clear and principled:

$$\text{SVD: } \|f\|_2 \quad \text{vs.} \quad \text{OASIS: } \|f\|_{\infty}$$

This difference:
- **Is mathematically justified** (Hoeffding's inequality requires $\|f\|_{\infty}$)
- **May provide practical benefits** (robustness to sparsity)
- **Enables p-value bounds** (unlike SVD)

But in the context of genomics with K >> N:
- **Both methods enter the "complex model" regime**
- **Both make approximations**
- **Both have limitations**
- **The "exact" p-value may be illusory** (due to optimization, data splitting, assumptions)

The deeper question remains: **In high-dimensional genomics, is optimizing for statistical validity (exact p-values) the right goal, or have we entered a regime where prediction, robustness, and biological interpretation matter more?**

---

## References

1. Baharav, T.Z., Tse, D., and Salzman, J. (2024). "OASIS: An interpretable, finite-sample valid alternative to Pearson's X² for scientific discovery." *PNAS* 121(15). Supplementary Section S.3.E.

2. Hoeffding, W. (1963). "Probability inequalities for sums of bounded random variables." *Journal of the American Statistical Association* 58(301): 13-30.

3. Eckart, C. and Young, G. (1936). "The approximation of one matrix by another of lower rank." *Psychometrika* 1(3): 211-218. [Original SVD paper]
