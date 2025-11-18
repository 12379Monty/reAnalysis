import React, { useState } from 'react';

const SPLASHConceptDiagram = () => {
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
      position: 'relative',
      overflow: 'hidden',
    },
    title: {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#2c3e50',
    },
    step: {
      position: 'absolute',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    sequenceContainer: {
      position: 'absolute',
      top: '70px',
      left: '40px',
      width: 'calc(100% - 80px)',
      height: '60px',
      display: 'flex',
      flexDirection: 'column',
    },
    sequenceLabel: {
      fontSize: '14px',
      marginBottom: '5px',
      color: '#34495e',
    },
    readContainer: {
      display: 'flex',
      height: '30px',
      alignItems: 'center',
    },
    read: {
      height: '25px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontFamily: 'monospace',
      color: 'white',
      marginRight: '2px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    anchor: {
      backgroundColor: '#3498db',
      width: '80px',
    },
    target: {
      backgroundColor: '#e74c3c',
      width: '80px',
    },
    rest: {
      backgroundColor: '#95a5a6',
      width: '120px',
      color: '#2c3e50',
    },
    arrow: {
      position: 'absolute',
      left: '50%',
      width: '40px',
      height: '40px',
      transform: 'translateX(-50%)',
      fontSize: '24px',
      textAlign: 'center',
      color: '#7f8c8d',
    },
    tableContainer: {
      position: 'absolute',
      top: '180px',
      left: '100px',
      width: 'calc(100% - 200px)',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#34495e',
      color: 'white',
      padding: '8px',
      textAlign: 'center',
      fontSize: '12px',
      border: '1px solid #2c3e50',
    },
    tableCell: {
      padding: '6px',
      textAlign: 'center',
      fontSize: '12px',
      border: '1px solid #bdc3c7',
      backgroundColor: 'white',
      position: 'relative',
    },
    highlightedCell: {
      backgroundColor: '#ffffcc',
    },
    tableCellValue: {
      fontWeight: 'bold',
    },
    tableAnchorCell: {
      backgroundColor: '#ebf5fb',
      fontWeight: 'bold',
      fontSize: '11px',
    },
    tableTargetCell: {
      backgroundColor: '#fef5f5',
      fontWeight: 'bold',
      fontSize: '11px',
    },
    statisticsContainer: {
      position: 'absolute',
      bottom: '30px',
      left: '40px',
      width: 'calc(100% - 80px)',
      height: '100px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    statisticBox: {
      width: '180px',
      height: '80px',
      backgroundColor: 'white',
      borderRadius: '6px',
      padding: '10px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: '1px solid #e0e0e0',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    statisticBoxHighlighted: {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      border: '1px solid #3498db',
    },
    statisticTitle: {
      fontSize: '12px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#2c3e50',
    },
    statisticValue: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#e74c3c',
    },
    tooltipContainer: {
      position: 'absolute',
      bottom: '150px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '300px',
      backgroundColor: 'rgba(44, 62, 80, 0.9)',
      color: 'white',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
      lineHeight: '1.4',
      visibility: hoveredElement ? 'visible' : 'hidden',
      opacity: hoveredElement ? 1 : 0,
      transition: 'opacity 0.3s',
      zIndex: 100,
    },
  };

  const tooltipContent = {
    anchor: "Anchors are fixed k-mer sequences (e.g., 27 nucleotides) that SPLASH uses as reference points. These are conserved sequences found across samples.",
    target: "Targets are the adjacent k-mer sequences that may vary between samples. SPLASH analyzes how these targets differ across conditions.",
    contingencyTable: "SPLASH builds contingency tables for each anchor, counting how often each target appears in each sample/condition. This structure captures the biological variation.",
    oasisTest: "OASIS is a statistical test that identifies significant sample-specific variation in the contingency tables, with advantages over traditional chi-squared tests.",
    pValue: "P-values indicate the statistical significance of observed differences. Lower values suggest real biological variation rather than random chance.",
    effectSize: "Effect size measures the magnitude of difference between samples. Larger values indicate stronger biological signals.",
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>SPLASH Methodology: From Reads to Discoveries</div>
      
      <div style={styles.step} style={{top: '50px', left: '20px'}}>1. Extract anchors & targets from reads</div>
      
      <div style={styles.sequenceContainer}>
        <div style={styles.readContainer}>
          <div 
            style={{...styles.read, ...styles.rest}} 
            onMouseEnter={() => setHoveredElement(null)}
          >
            ACGTACGT...
          </div>
          <div 
            style={{...styles.read, ...styles.anchor}} 
            onMouseEnter={() => setHoveredElement('anchor')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            ANCHOR
          </div>
          <div 
            style={{...styles.read, ...styles.target}} 
            onMouseEnter={() => setHoveredElement('target')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            TARGET-A
          </div>
          <div 
            style={{...styles.read, ...styles.rest}}
            onMouseEnter={() => setHoveredElement(null)}
          >
            ACGTACGT...
          </div>
        </div>
        
        <div style={styles.readContainer}>
          <div 
            style={{...styles.read, ...styles.rest}}
            onMouseEnter={() => setHoveredElement(null)}
          >
            TGCATGCA...
          </div>
          <div 
            style={{...styles.read, ...styles.anchor}}
            onMouseEnter={() => setHoveredElement('anchor')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            ANCHOR
          </div>
          <div 
            style={{...styles.read, ...styles.target}}
            onMouseEnter={() => setHoveredElement('target')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            TARGET-B
          </div>
          <div 
            style={{...styles.read, ...styles.rest}}
            onMouseEnter={() => setHoveredElement(null)}
          >
            TGCATGCA...
          </div>
        </div>
      </div>
      
      <div style={{...styles.arrow, top: '140px'}}>↓</div>
      
      <div style={styles.step} style={{top: '160px', left: '20px'}}>2. Build contingency tables</div>
      
      <table 
        style={styles.tableContainer}
        onMouseEnter={() => setHoveredElement('contingencyTable')}
        onMouseLeave={() => setHoveredElement(null)}
      >
        <thead>
          <tr>
            <th style={styles.tableHeader}>ANCHOR</th>
            <th style={styles.tableHeader}>TARGET</th>
            <th style={styles.tableHeader}>Sample 1</th>
            <th style={styles.tableHeader}>Sample 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableAnchorCell} rowSpan="3">GACTCTA</td>
            <td style={styles.tableTargetCell}>TARGET-A</td>
            <td style={{...styles.tableCell, ...styles.highlightedCell}}>
              <span style={styles.tableCellValue}>87</span>
            </td>
            <td style={styles.tableCell}>
              <span style={styles.tableCellValue}>12</span>
            </td>
          </tr>
          <tr>
            <td style={styles.tableTargetCell}>TARGET-B</td>
            <td style={styles.tableCell}>
              <span style={styles.tableCellValue}>14</span>
            </td>
            <td style={{...styles.tableCell, ...styles.highlightedCell}}>
              <span style={styles.tableCellValue}>93</span>
            </td>
          </tr>
          <tr>
            <td style={styles.tableTargetCell}>TARGET-C</td>
            <td style={styles.tableCell}>
              <span style={styles.tableCellValue}>3</span>
            </td>
            <td style={styles.tableCell}>
              <span style={styles.tableCellValue}>2</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div style={{...styles.arrow, top: '280px'}}>↓</div>
      
      <div style={styles.step} style={{top: '300px', left: '20px'}}>3. Apply statistical test (OASIS)</div>
      
      <div style={styles.statisticsContainer}>
        <div 
          style={{
            ...styles.statisticBox, 
            ...(hoveredElement === 'oasisTest' ? styles.statisticBoxHighlighted : {})
          }}
          onMouseEnter={() => setHoveredElement('oasisTest')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div style={styles.statisticTitle}>OASIS Test Statistic</div>
          <div style={styles.statisticValue}>T = 142.87</div>
        </div>
        
        <div 
          style={{
            ...styles.statisticBox, 
            ...(hoveredElement === 'pValue' ? styles.statisticBoxHighlighted : {})
          }}
          onMouseEnter={() => setHoveredElement('pValue')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div style={styles.statisticTitle}>P-value</div>
          <div style={styles.statisticValue}>p < 0.0001</div>
        </div>
        
        <div 
          style={{
            ...styles.statisticBox, 
            ...(hoveredElement === 'effectSize' ? styles.statisticBoxHighlighted : {})
          }}
          onMouseEnter={() => setHoveredElement('effectSize')}
          onMouseLeave={() => setHoveredElement(null)}
        >
          <div style={styles.statisticTitle}>Effect Size</div>
          <div style={styles.statisticValue}>0.876</div>
        </div>
      </div>
      
      {hoveredElement && (
        <div style={styles.tooltipContainer}>
          {tooltipContent[hoveredElement]}
        </div>
      )}
    </div>
  );
};

export default SPLASHConceptDiagram;