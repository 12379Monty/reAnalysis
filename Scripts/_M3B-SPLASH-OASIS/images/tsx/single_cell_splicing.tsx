import React, { useState } from 'react';

const SingleCellSplicingAnalysis = () => {
  const [activeTab, setActiveTab] = useState('myl6');
  const [hoveredCell, setHoveredCell] = useState(null);
  
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
      width: '65%',
      padding: '0 10px 0 0',
    },
    rightPanel: {
      width: '35%',
      padding: '0 0 0 10px',
    },
    sashimiContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '210px',
      position: 'relative',
      marginBottom: '15px',
    },
    umapContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '300px',
      position: 'relative',
    },
    statsContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '170px',
      marginBottom: '15px',
    },
    anchorTargetContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '170px',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '5px',
    },
    exonContainer: {
      height: '30px',
      position: 'relative',
      marginTop: '60px',
    },
    exon: {
      position: 'absolute',
      height: '20px',
      backgroundColor: '#3498db',
      borderRadius: '4px',
    },
    exonLabel: {
      position: 'absolute',
      fontSize: '10px',
      top: '-15px',
      textAlign: 'center',
      color: '#2c3e50',
    },
    spliceCurve: {
      position: 'absolute',
      borderTop: '2px solid #e74c3c',
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
    },
    spliceLabel: {
      position: 'absolute',
      fontSize: '10px',
      color: '#e74c3c',
      fontWeight: 'bold',
    },
    cellDot: {
      position: 'absolute',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      cursor: 'pointer',
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
      maxWidth: '180px',
      visibility: hoveredCell ? 'visible' : 'hidden',
      opacity: hoveredCell ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    },
    legend: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '15px',
      fontSize: '12px',
    },
    legendColor: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginRight: '5px',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      padding: '8px 0',
      borderBottom: '1px solid #ecf0f1',
    },
    statLabel: {
      color: '#7f8c8d',
    },
    statValue: {
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    anchorTarget: {
      fontFamily: 'monospace',
      fontSize: '13px',
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      marginTop: '10px',
    },
    anchor: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '2px',
      borderRadius: '2px',
    },
    target: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '2px',
      borderRadius: '2px',
    }
  };

  // Generate random cell positions for UMAP
  const generateCells = (n, cellType, centerX, centerY, radius) => {
    const cells = [];
    for (let i = 0; i < n; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.sqrt(Math.random()) * radius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      
      const targetA = Math.random() > 0.7 ? 1 : 0;
      const targetB = Math.random() > 0.3 ? 1 : 0;
      
      cells.push({
        id: `${cellType}-${i}`,
        x,
        y,
        type: cellType,
        color: cellTypeColors[cellType],
        targetA,
        targetB
      });
    }
    return cells;
  };

  const cellTypeColors = {
    macrophage: '#e74c3c',
    epithelial: '#3498db',
    lymphocyte: '#2ecc71',
    fibroblast: '#f39c12'
  };

  const macrophageCells = generateCells(100, 'macrophage', 220, 100, 60);
  const epithelialCells = generateCells(120, 'epithelial', 120, 200, 70);
  const lymphocyteCells = generateCells(80, 'lymphocyte', 240, 220, 50);
  const fibroblastCells = generateCells(60, 'fibroblast', 100, 100, 40);
  
  const allCells = [...macrophageCells, ...epithelialCells, ...lymphocyteCells, ...fibroblastCells];

  // Data for different examples
  const exampleData = {
    myl6: {
      title: 'MYL6 Alternative Splicing',
      description: 'Cassette exon inclusion/exclusion in myosin light chain 6',
      exons: [
        { id: 1, start: 30, width: 80, label: 'Exon 5' },
        { id: 2, start: 170, width: 60, label: 'Exon 6 (alt)' },
        { id: 3, start: 290, width: 90, label: 'Exon 7' }
      ],
      splices: [
        { start: 110, end: 170, label: 'Inclusion', color: '#e74c3c' },
        { start: 110, end: 290, label: 'Skipping', color: '#9b59b6' }
      ],
      anchor: 'GATCCTGAAGCACTTCCTGGAGGAG',
      targetA: 'ATCACTGCTGCCTTTGCTCGGAAG',
      targetALabel: 'Exon 6 included',
      targetB: 'GATCCAAGTACCTCGGGCACAAGG',
      targetBLabel: 'Exon 6 skipped',
      cellTypes: {
        macrophage: 'High inclusion (78%)',
        epithelial: 'Mixed (42%)',
        lymphocyte: 'Low inclusion (23%)',
        fibroblast: 'High inclusion (82%)'
      },
      pValue: '3.7e-29',
      effectSize: 0.83
    },
    hladrb: {
      title: 'HLA-DRB1/DRB4 Expression',
      description: 'Differential expression of highly similar HLA class II paralogs',
      exons: [
        { id: 1, start: 30, width: 80, label: 'Coding Region' },
        { id: 2, start: 170, width: 90, label: '3\' UTR' }
      ],
      splices: [],
      anchor: 'CGCTTCGACAGCGACGTGGGGGAGT',
      targetA: 'CTGAGTACTGGAAGTAGCCTAAGA',
      targetALabel: 'HLA-DRB1 specific',
      targetB: 'CTGAGCACTGGAACTAGCCCAATA',
      targetBLabel: 'HLA-DRB4 specific',
      cellTypes: {
        macrophage: 'DRB1 dominant (91%)',
        epithelial: 'DRB4 dominant (87%)',
        lymphocyte: 'Mixed (53%/47%)',
        fibroblast: 'DRB1 dominant (84%)'
      },
      pValue: '5.2e-41',
      effectSize: 0.94
    }
  };

  const activeExample = exampleData[activeTab];

  const renderCellTooltip = () => {
    if (!hoveredCell) return null;
    
    const cell = allCells.find(c => c.id === hoveredCell);
    if (!cell) return null;
    
    let targetContent = '';
    if (activeTab === 'myl6') {
      targetContent = cell.targetA > 0.5 ? 'Includes Exon 6' : 'Skips Exon 6';
    } else {
      targetContent = cell.targetA > 0.5 ? 'Expresses HLA-DRB1' : 'Expresses HLA-DRB4';
    }
    
    return (
      <div 
        style={{
          ...styles.tooltipContainer,
          top: `${cell.y - 10}px`,
          left: `${cell.x + 10}px`,
        }}
      >
        <strong>{cell.type.charAt(0).toUpperCase() + cell.type.slice(1)} cell</strong><br />
        {targetContent}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Single-Cell Alternative Splicing Analysis</div>
        <div style={styles.subtitle}>Cell-type specific RNA isoforms detected with SPLASH</div>
      </div>
      
      <div style={styles.tabContainer}>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'myl6' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('myl6')}
        >
          MYL6 Alternative Splicing
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'hladrb' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('hladrb')}
        >
          HLA-DRB1/DRB4 Expression
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.sashimiContainer}>
            <div style={styles.sectionTitle}>{activeExample.title} - Splicing Structure</div>
            
            <div style={styles.exonContainer}>
              {activeExample.exons.map(exon => (
                <React.Fragment key={exon.id}>
                  <div 
                    style={{
                      ...styles.exon,
                      left: `${exon.start}px`,
                      width: `${exon.width}px`,
                    }}
                  ></div>
                  <div 
                    style={{
                      ...styles.exonLabel,
                      left: `${exon.start + exon.width/2 - 15}px`,
                    }}
                  >
                    {exon.label}
                  </div>
                </React.Fragment>
              ))}
              
              {activeExample.splices.map((splice, index) => {
                const width = splice.end - splice.start;
                const height = 40 + index * 15;
                
                return (
                  <React.Fragment key={index}>
                    <div 
                      style={{
                        ...styles.spliceCurve,
                        left: `${splice.start}px`,
                        width: `${width}px`,
                        height: `${height}px`,
                        borderColor: splice.color,
                      }}
                    ></div>
                    <div 
                      style={{
                        ...styles.spliceLabel,
                        left: `${splice.start + width/2 - 20}px`,
                        top: `${-height - 5}px`,
                        color: splice.color,
                      }}
                    >
                      {splice.label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          
          <div style={styles.umapContainer}>
            <div style={styles.sectionTitle}>Cell Type-Specific Expression (UMAP)</div>
            
            {allCells.map(cell => (
              <div 
                key={cell.id}
                style={{
                  ...styles.cellDot,
                  backgroundColor: cell.color,
                  left: `${cell.x}px`,
                  top: `${cell.y}px`,
                }}
                onMouseEnter={() => setHoveredCell(cell.id)}
                onMouseLeave={() => setHoveredCell(null)}
              ></div>
            ))}
            
            {renderCellTooltip()}
            
            <div style={styles.legend}>
              {Object.entries(cellTypeColors).map(([type, color]) => (
                <div key={type} style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: color}}></div>
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.statsContainer}>
            <div style={styles.sectionTitle}>Cell Type Statistics</div>
            
            {Object.entries(activeExample.cellTypes).map(([cellType, stat]) => (
              <div key={cellType} style={styles.statItem}>
                <div style={styles.statLabel}>{cellType.charAt(0).toUpperCase() + cellType.slice(1)}</div>
                <div style={{...styles.statValue, color: cellTypeColors[cellType]}}>{stat}</div>
              </div>
            ))}
            
            <div style={styles.statItem}>
              <div style={styles.statLabel}>OASIS p-value</div>
              <div style={styles.statValue}>{activeExample.pValue}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Effect Size</div>
              <div style={styles.statValue}>{activeExample.effectSize}</div>
            </div>
          </div>
          
          <div style={styles.anchorTargetContainer}>
            <div style={styles.sectionTitle}>SPLASH Anchor-Target Structure</div>
            <div style={{fontSize: '12px', marginBottom: '10px', color: '#7f8c8d'}}>
              {activeExample.description}
            </div>
            
            <div style={styles.anchorTarget}>
              <div style={{marginBottom: '5px'}}>
                <strong>Anchor:</strong> <span style={styles.anchor}>{activeExample.anchor}</span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <strong>Target A:</strong> <span style={styles.target}>{activeExample.targetA}</span>
                <span style={{fontSize: '11px', marginLeft: '5px', color: '#7f8c8d'}}>{activeExample.targetALabel}</span>
              </div>
              <div>
                <strong>Target B:</strong> <span style={styles.target}>{activeExample.targetB}</span>
                <span style={{fontSize: '11px', marginLeft: '5px', color: '#7f8c8d'}}>{activeExample.targetBLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCellSplicingAnalysis;