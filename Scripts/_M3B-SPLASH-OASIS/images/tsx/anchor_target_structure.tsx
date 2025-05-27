import React, { useState } from 'react';

const AnchorTargetStructure = () => {
  const [activeExample, setActiveExample] = useState('splicing');
  const [hoveredElement, setHoveredElement] = useState(null);
  
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      height: '500px',
      backgroundColor: '#f5f8fa',
      borderRadius: '8px',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      marginBottom: '20px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#2c3e50',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
      textAlign: 'center',
    },
    tabContainer: {
      display: 'flex',
      borderBottom: '1px solid #e0e0e0',
      marginBottom: '20px',
    },
    tab: {
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '4px 4px 0 0',
      marginRight: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
    },
    activeTab: {
      backgroundColor: '#3498db',
      color: 'white',
      borderBottom: '2px solid #2980b9',
    },
    inactiveTab: {
      backgroundColor: '#ecf0f1',
      color: '#7f8c8d',
    },
    content: {
      display: 'flex',
      flex: 1,
    },
    leftPanel: {
      width: '40%',
      padding: '0 15px 0 0',
    },
    rightPanel: {
      width: '60%',
      padding: '0 0 0 15px',
    },
    illustrationContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '100%',
      position: 'relative',
    },
    illustrationTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '10px',
    },
    sequenceContainer: {
      marginTop: '30px',
      position: 'relative',
    },
    sequenceRow: {
      height: '30px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    sequenceLabel: {
      position: 'absolute',
      left: '-80px',
      width: '80px',
      fontSize: '12px',
      color: '#7f8c8d',
      textAlign: 'right',
    },
    sequence: {
      display: 'flex',
      height: '25px',
    },
    nucleotide: {
      width: '18px',
      height: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      marginRight: '1px',
    },
    nucleotideA: { backgroundColor: '#e74c3c' },
    nucleotideT: { backgroundColor: '#3498db' },
    nucleotideG: { backgroundColor: '#2ecc71' },
    nucleotideC: { backgroundColor: '#f39c12' },
    nucleotideN: { backgroundColor: '#95a5a6', color: '#2c3e50' },
    anchor: {
      position: 'absolute',
      bottom: '-20px',
      height: '3px',
      backgroundColor: '#8e44ad',
    },
    target: {
      position: 'absolute',
      bottom: '-20px',
      height: '3px',
      backgroundColor: '#e74c3c',
    },
    annotationLabel: {
      position: 'absolute',
      bottom: '-35px',
      fontSize: '11px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    anchorLabel: {
      color: '#8e44ad',
    },
    targetLabel: {
      color: '#e74c3c',
    },
    exampleContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '100%',
    },
    exampleTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '10px',
    },
    conceptDescription: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#2c3e50',
      marginBottom: '20px',
    },
    benefitsList: {
      paddingLeft: '20px',
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#2c3e50',
    },
    benefitItem: {
      marginBottom: '10px',
    },
    keyPoint: {
      backgroundColor: '#f8f9fa',
      padding: '10px 15px',
      borderLeft: '4px solid #3498db',
      marginTop: '20px',
      fontSize: '14px',
      color: '#2c3e50',
    },
    highlightText: {
      fontWeight: 'bold',
      color: '#3498db',
    },
    tooltipContainer: {
      position: 'absolute',
      backgroundColor: 'rgba(44, 62, 80, 0.9)',
      color: 'white',
      borderRadius: '5px',
      padding: '8px',
      fontSize: '12px',
      lineHeight: '1.4',
      zIndex: 100,
      maxWidth: '200px',
      visibility: hoveredElement ? 'visible' : 'hidden',
      opacity: hoveredElement ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
      top: hoveredElement?.top || 0,
      left: hoveredElement?.left || 0,
    },
  };

  const examples = {
    splicing: {
      title: 'Alternative Splicing',
      description: 'Alternative splicing creates different RNA transcripts from the same gene. The anchor-target structure naturally captures this biological pattern.',
      benefits: [
        'Anchors in conserved exons detect splicing events regardless of reference',
        'Targets reveal different splice junctions specific to each cell type',
        'Enables discovery of novel splice variants missing from reference annotations',
        'Identifies cell type-specific regulation without prior knowledge'
      ],
      keyPoint: 'In single-cell RNA-seq data, SPLASH identified MYL6 alternative splicing patterns across different cell types without requiring alignment to a reference transcriptome.',
      sequence1: 'ATCGATCGATCGATCGTACGTATCGGACTCAAGCAGACTGCTTACGCCAAGGTCGCCTAAGCTCAAGCGCTACGAT',
      sequence2: 'ATCGATCGATCGATCGTACGTATCGGACTCAAGCGATCCAAGTACCTCGGGCACAAGGAAGCTCAAGCGCTACGAT',
      anchorStart: 30,
      anchorEnd: 54,
      targetStart1: 55,
      targetEnd1: 79,
      targetStart2: 55,
      targetEnd2: 79,
      anchorLabel: 'Exon Junction Anchor',
      targetLabel1: 'Exon Inclusion',
      targetLabel2: 'Exon Skipping'
    },
    snv: {
      title: 'Single Nucleotide Variants',
      description: 'SNVs are single base changes in DNA sequence. The anchor-target structure efficiently identifies these variations across samples.',
      benefits: [
        'Anchors in conserved regions provide context for variants',
        'Targets capture the actual nucleotide changes',
        'Works without reference genome or variant database',
        'Can detect strain-specific or population-specific variants'
      ],
      keyPoint: 'SPLASH identified strain-defining mutations in SARS-CoV-2, including mutations in the spike protein receptor binding domain, without requiring a reference genome or strain metadata.',
      sequence1: 'CTGAACCTGTACGACTACCTGCAACTGTTTTCTAAACATGACTTCACAGAGTCTCTCGCACCCGGGACTGGTGGACT',
      sequence2: 'CTGAACCTGTACGACTACCTGCAACTGTTTTCTAAACATGACTTCACAGAGTCTTTCGCACCCGGGACTGGTGGACT',
      anchorStart: 30,
      anchorEnd: 54,
      targetStart1: 55,
      targetEnd1: 69,
      targetStart2: 55,
      targetEnd2: 69,
      anchorLabel: 'Conserved Region',
      targetLabel1: 'Wild-type',
      targetLabel2: 'Variant (C→T)'
    },
    microbial: {
      title: 'Microbial Diversity',
      description: 'Microbiomes contain diverse organisms with regions of sequence conservation and variation. The anchor-target approach captures this diversity efficiently.',
      benefits: [
        'Anchors in conserved genes capture taxonomic relationships',
        'Targets reveal strain-specific variations',
        'Enables discovery without complete reference genomes',
        'Identifies mobile genetic elements and horizontal gene transfer'
      ],
      keyPoint: 'Henderson et al. demonstrated how SPLASH can efficiently discover mobile genetic elements and CRISPR arrays in microbial genomes without relying on complete reference sequences.',
      sequence1: 'GACTCAAGCTCGTAGACCACTGAGGTGCAGCTCAAGCAGACCGGTCTAGCCGTTAACGACCTCAAGGTCGAGTACTGG',
      sequence2: 'GACTCAAGCTCGTAGACCACTGAGGCTGACTGCTTACGCCAAGGTCGCCTGTTAACGACCTCAAGGTCGAGTACTGG',
      anchorStart: 5,
      anchorEnd: 29,
      targetStart1: 30,
      targetEnd1: 54,
      targetStart2: 30,
      targetEnd2: 54,
      anchorLabel: 'Conserved Gene',
      targetLabel1: 'Strain A',
      targetLabel2: 'Strain B'
    }
  };

  const activeExampleData = examples[activeExample];

  // Generate color-coded nucleotide display
  const renderSequence = (sequence, isSecond = false) => {
    const nucleotides = sequence.split('');
    
    return (
      <div style={styles.sequenceRow}>
        <div style={styles.sequenceLabel}>{isSecond ? 'Sample B:' : 'Sample A:'}</div>
        <div style={styles.sequence}>
          {nucleotides.map((nuc, index) => {
            const isInAnchor = index >= activeExampleData.anchorStart && index < activeExampleData.anchorEnd;
            const isInTarget = isSecond ? 
              (index >= activeExampleData.targetStart2 && index < activeExampleData.targetEnd2) : 
              (index >= activeExampleData.targetStart1 && index < activeExampleData.targetEnd1);
            
            let nucleotideStyle;
            switch(nuc) {
              case 'A': nucleotideStyle = styles.nucleotideA; break;
              case 'T': nucleotideStyle = styles.nucleotideT; break;
              case 'G': nucleotideStyle = styles.nucleotideG; break;
              case 'C': nucleotideStyle = styles.nucleotideC; break;
              default: nucleotideStyle = styles.nucleotideN;
            }
            
            // Highlight if position differs between sequences
            const isDifferent = isSecond && activeExampleData.sequence1[index] !== nuc;
            
            return (
              <div 
                key={index} 
                style={{
                  ...styles.nucleotide, 
                  ...nucleotideStyle,
                  ...(isDifferent ? {border: '2px solid #e74c3c', fontWeight: 'bold'} : {})
                }}
                onMouseEnter={() => {
                  if (isInAnchor || isInTarget) {
                    setHoveredElement({
                      type: isInAnchor ? 'anchor' : 'target',
                      position: index,
                      top: isSecond ? 40 : 10,
                      left: index * 19 + 10,
                    });
                  }
                }}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {nuc}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAnnotations = () => {
    return (
      <>
        <div 
          style={{
            ...styles.anchor,
            left: `${activeExampleData.anchorStart * 19}px`,
            width: `${(activeExampleData.anchorEnd - activeExampleData.anchorStart) * 19}px`,
          }}
        ></div>
        <div 
          style={{
            ...styles.annotationLabel,
            ...styles.anchorLabel,
            left: `${activeExampleData.anchorStart * 19 + ((activeExampleData.anchorEnd - activeExampleData.anchorStart) * 19) / 2 - 40}px`,
          }}
        >
          {activeExampleData.anchorLabel}
        </div>
        <div 
          style={{
            ...styles.target,
            left: `${activeExampleData.targetStart1 * 19}px`,
            width: `${(activeExampleData.targetEnd1 - activeExampleData.targetStart1) * 19}px`,
          }}
        ></div>
        <div 
          style={{
            ...styles.annotationLabel,
            ...styles.targetLabel,
            left: `${activeExampleData.targetStart1 * 19 + ((activeExampleData.targetEnd1 - activeExampleData.targetStart1) * 19) / 2 - 40}px`,
          }}
        >
          {activeExampleData.targetLabel1}
        </div>
      </>
    );
  };

  const renderTooltip = () => {
    if (!hoveredElement) return null;
    
    let tooltipText = '';
    if (hoveredElement.type === 'anchor') {
      tooltipText = `Anchor: Conserved sequence used as reference point across samples`;
    } else {
      tooltipText = `Target: Variable sequence that captures biological variation between samples`;
    }
    
    return (
      <div 
        style={{
          ...styles.tooltipContainer,
          top: hoveredElement.top,
          left: hoveredElement.left,
        }}
      >
        {tooltipText}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Why the Anchor-Target Structure Works</div>
        <div style={styles.subtitle}>Capturing the natural structure of biological variation</div>
      </div>
      
      <div style={styles.tabContainer}>
        <div 
          style={{
            ...styles.tab, 
            ...(activeExample === 'splicing' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveExample('splicing')}
        >
          Alternative Splicing
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeExample === 'snv' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveExample('snv')}
        >
          Genetic Variants
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeExample === 'microbial' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveExample('microbial')}
        >
          Microbial Diversity
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.illustrationContainer}>
            <div style={styles.illustrationTitle}>{activeExampleData.title} Example</div>
            
            <div style={styles.sequenceContainer}>
              {renderSequence(activeExampleData.sequence1)}
              {renderSequence(activeExampleData.sequence2, true)}
              {renderAnnotations()}
              {renderTooltip()}
            </div>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.exampleContainer}>
            <div style={styles.exampleTitle}>How It Works: {activeExampleData.title}</div>
            
            <div style={styles.conceptDescription}>
              {activeExampleData.description}
            </div>
            
            <div style={styles.benefitsList}>
              {activeExampleData.benefits.map((benefit, index) => (
                <div key={index} style={styles.benefitItem}>
                  • {benefit}
                </div>
              ))}
            </div>
            
            <div style={styles.keyPoint}>
              <span style={styles.highlightText}>Key insight:</span> {activeExampleData.keyPoint}
            </div>
            
            <div style={styles.keyPoint} style={{marginTop: '30px'}}>
              <span style={styles.highlightText}>Why this matters:</span> The anchor-target approach enables statistical analysis of sequence variation <u>without requiring reference genomes</u>, providing a unified framework for discovery across diverse biological domains.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnchorTargetStructure;