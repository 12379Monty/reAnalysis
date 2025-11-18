import React, { useState } from 'react';

const SARSCoV2Analysis = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedExample, setSelectedExample] = useState('spike');
  
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
    content: {
      display: 'flex',
      flex: 1,
    },
    leftPanel: {
      width: '250px',
      borderRight: '1px solid #e0e0e0',
      padding: '10px',
    },
    rightPanel: {
      flex: 1,
      padding: '10px',
      position: 'relative',
    },
    genomeDiagram: {
      height: '80px',
      backgroundColor: '#ecf0f1',
      borderRadius: '4px',
      position: 'relative',
      marginBottom: '20px',
    },
    regionLabel: {
      position: 'absolute',
      fontSize: '10px',
      top: '10px',
      textAlign: 'center',
      color: '#2c3e50',
    },
    region: {
      position: 'absolute',
      height: '30px',
      bottom: '20px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    regionHighlighted: {
      transform: 'translateY(-5px)',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    },
    tooltipContainer: {
      position: 'absolute',
      backgroundColor: 'rgba(44, 62, 80, 0.9)',
      color: 'white',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
      lineHeight: '1.4',
      zIndex: 100,
      maxWidth: '200px',
      visibility: hoveredRegion ? 'visible' : 'hidden',
      opacity: hoveredRegion ? 1 : 0,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    exampleButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    exampleButton: {
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      cursor: 'pointer',
      fontSize: '14px',
      border: 'none',
      textAlign: 'left',
      transition: 'background-color 0.2s',
    },
    activeExampleButton: {
      backgroundColor: '#3498db',
      color: 'white',
      fontWeight: 'bold',
    },
    inactiveExampleButton: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },
    detailContainer: {
      backgroundColor: 'white',
      borderRadius: '6px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      height: '100%',
    },
    detailHeader: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '10px',
    },
    anchorTargetContainer: {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '14px',
      marginBottom: '15px',
    },
    anchor: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '2px 4px',
      borderRadius: '2px',
    },
    targetContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '10px',
    },
    targetRow: {
      display: 'flex',
      marginBottom: '5px',
      alignItems: 'center',
    },
    targetLabel: {
      width: '100px',
      fontSize: '12px',
      color: '#7f8c8d',
    },
    target: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '2px 4px',
      borderRadius: '2px',
      marginRight: '10px',
    },
    frequencyBar: {
      height: '15px',
      backgroundColor: '#ecf0f1',
      borderRadius: '2px',
      overflow: 'hidden',
      flex: 1,
    },
    frequencyFill: {
      height: '100%',
      borderRadius: '2px',
    },
    tableDiagram: {
      marginTop: '20px',
      border: '1px solid #ecf0f1',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: '#ecf0f1',
      padding: '8px',
      fontWeight: 'bold',
      fontSize: '12px',
      textAlign: 'center',
    },
    tableCell: {
      padding: '8px',
      fontSize: '12px',
      textAlign: 'center',
      borderTop: '1px solid #ecf0f1',
    },
    tableCellHighlight: {
      backgroundColor: '#ffffcc',
      fontWeight: 'bold',
    },
    statisticContainer: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    statisticBox: {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      textAlign: 'center',
      width: '120px',
    },
    statisticLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
      marginBottom: '5px',
    },
    statisticValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
  };

  const genomicRegions = [
    { id: 'orf1a', name: 'ORF1a', start: 40, width: 150, color: '#3498db' },
    { id: 'orf1b', name: 'ORF1b', start: 190, width: 150, color: '#2980b9' },
    { id: 'spike', name: 'Spike (S)', start: 340, width: 120, color: '#e74c3c' },
    { id: 'orf3', name: 'ORF3', start: 460, width: 30, color: '#f39c12' },
    { id: 'e', name: 'E', start: 490, width: 30, color: '#27ae60' },
    { id: 'm', name: 'M', start: 520, width: 60, color: '#8e44ad' },
    { id: 'n', name: 'N', start: 580, width: 90, color: '#16a085' },
  ];

  const exampleData = {
    spike: {
      title: 'Spike Protein RBD Mutation',
      description: 'A key mutation in the receptor binding domain of the Spike protein, characteristic of the Alpha variant.',
      anchor: 'CTGTTTTCTAAACATGACTTCACAG',
      targets: [
        { sequence: 'AGTCTCTCGCACCCG', label: 'Wuhan', frequency: 0.92, sample: 'France' },
        { sequence: 'AGTCTTTCGCACCCG', label: 'Alpha', frequency: 0.87, sample: 'UK' },
      ],
      pValue: '1.2e-42',
      effectSize: 0.92,
    },
    orf7a: {
      title: 'ORF7a Deletion',
      description: 'A deletion in the ORF7a gene found predominantly in samples from one geographic region.',
      anchor: 'GTGACAATCTTAAGACACTTCTTT',
      targets: [
        { sequence: 'GCTAACCGCTCGGAA', label: 'Original', frequency: 0.78, sample: 'France' },
        { sequence: 'GC-----------A', label: 'Deletion', frequency: 0.65, sample: 'South Africa' },
      ],
      pValue: '3.8e-24',
      effectSize: 0.81,
    },
    nProtein: {
      title: 'N Protein Mutation',
      description: 'A mutation in the nucleocapsid (N) protein found in the Delta variant.',
      anchor: 'TTGAAGAAGTTCGAGAGGTACGAC',
      targets: [
        { sequence: 'CTAAAGCAACACGT', label: 'Original', frequency: 0.71, sample: 'France' },
        { sequence: 'CTAAAACAACACGT', label: 'Delta', frequency: 0.93, sample: 'India' },
      ],
      pValue: '5.6e-31',
      effectSize: 0.88,
    }
  };

  const selectedData = exampleData[selectedExample];

  const renderTooltip = () => {
    if (!hoveredRegion) return null;
    
    const region = genomicRegions.find(r => r.id === hoveredRegion);
    
    let content = '';
    switch (region.id) {
      case 'orf1a':
        content = 'Encodes non-structural proteins (nsp1-11) involved in viral replication.';
        break;
      case 'orf1b':
        content = 'Encodes non-structural proteins (nsp12-16) including the RNA-dependent RNA polymerase.';
        break;
      case 'spike':
        content = 'Encodes the spike protein that mediates viral entry into host cells. Target of most vaccines.';
        break;
      case 'orf3':
        content = 'Encodes accessory proteins that may modulate host response.';
        break;
      case 'e':
        content = 'Encodes the envelope protein involved in viral assembly and release.';
        break;
      case 'm':
        content = 'Encodes the membrane protein, the most abundant viral protein.';
        break;
      case 'n':
        content = 'Encodes the nucleocapsid protein that packages viral RNA.';
        break;
      default:
        content = 'Genomic region of SARS-CoV-2.';
    }
    
    return (
      <div 
        style={{
          ...styles.tooltipContainer,
          top: '50px',
          left: `${region.start + region.width / 2}px`,
        }}
      >
        <strong>{region.name}</strong><br />
        {content}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>SARS-CoV-2 Variant Detection with SPLASH</div>
        <div style={styles.subtitle}>Reference-free identification of strain-defining mutations</div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.sectionTitle}>Examples</div>
          <div style={styles.exampleButtonContainer}>
            <button 
              style={{
                ...styles.exampleButton, 
                ...(selectedExample === 'spike' ? styles.activeExampleButton : styles.inactiveExampleButton)
              }}
              onClick={() => setSelectedExample('spike')}
            >
              Spike Protein Mutation
            </button>
            <button 
              style={{
                ...styles.exampleButton, 
                ...(selectedExample === 'orf7a' ? styles.activeExampleButton : styles.inactiveExampleButton)
              }}
              onClick={() => setSelectedExample('orf7a')}
            >
              ORF7a Deletion
            </button>
            <button 
              style={{
                ...styles.exampleButton, 
                ...(selectedExample === 'nProtein' ? styles.activeExampleButton : styles.inactiveExampleButton)
              }}
              onClick={() => setSelectedExample('nProtein')}
            >
              N Protein Mutation
            </button>
          </div>
          
          <div style={styles.sectionTitle} style={{marginTop: '20px'}}>Key Findings</div>
          <ul style={{fontSize: '12px', paddingLeft: '20px', color: '#2c3e50'}}>
            <li>Detected strain-defining mutations without reference</li>
            <li>Identified protein domains affected by mutations</li>
            <li>Distinguished samples by geographic origin</li>
            <li>Found emerging variants before formal classification</li>
          </ul>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.genomeDiagram}>
            {genomicRegions.map(region => (
              <React.Fragment key={region.id}>
                <div 
                  style={{
                    ...styles.region, 
                    backgroundColor: region.color,
                    left: `${region.start}px`,
                    width: `${region.width}px`,
                    ...(hoveredRegion === region.id ? styles.regionHighlighted : {})
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                ></div>
                <div 
                  style={{
                    ...styles.regionLabel, 
                    left: `${region.start + region.width/2 - 15}px`,
                  }}
                >
                  {region.name}
                </div>
              </React.Fragment>
            ))}
            
            {renderTooltip()}
          </div>
          
          <div style={styles.detailContainer}>
            <div style={styles.detailHeader}>{selectedData.title}</div>
            <div style={{fontSize: '14px', marginBottom: '15px', color: '#7f8c8d'}}>{selectedData.description}</div>
            
            <div style={styles.anchorTargetContainer}>
              <div>
                <strong>Anchor:</strong> <span style={styles.anchor}>{selectedData.anchor}</span>
              </div>
              <div style={styles.targetContainer}>
                <strong>Targets:</strong>
                {selectedData.targets.map((target, index) => (
                  <div key={index} style={styles.targetRow}>
                    <span style={styles.targetLabel}>{target.label} ({target.sample})</span>
                    <span style={styles.target}>{target.sequence}</span>
                    <div style={styles.frequencyBar}>
                      <div 
                        style={{
                          ...styles.frequencyFill,
                          width: `${target.frequency * 100}%`,
                          backgroundColor: index === 0 ? '#3498db' : '#e74c3c'
                        }}
                      ></div>
                    </div>
                    <span style={{marginLeft: '5px', fontSize: '12px'}}>{(target.frequency * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.tableDiagram}>
              <div style={{display: 'flex'}}>
                <div style={{...styles.tableHeader, width: '120px'}}>Anchor-Target</div>
                <div style={{...styles.tableHeader, flex: 1}}>{selectedData.targets[0].sample}</div>
                <div style={{...styles.tableHeader, flex: 1}}>{selectedData.targets[1].sample}</div>
              </div>
              <div style={{display: 'flex'}}>
                <div style={{...styles.tableCell, width: '120px'}}>{selectedData.targets[0].label}</div>
                <div style={{...styles.tableCell, ...styles.tableCellHighlight, flex: 1}}>
                  {Math.round(selectedData.targets[0].frequency * 100)}
                </div>
                <div style={{...styles.tableCell, flex: 1}}>
                  {Math.round(100 - selectedData.targets[1].frequency * 100)}
                </div>
              </div>
              <div style={{display: 'flex'}}>
                <div style={{...styles.tableCell, width: '120px'}}>{selectedData.targets[1].label}</div>
                <div style={{...styles.tableCell, flex: 1}}>
                  {Math.round(100 - selectedData.targets[0].frequency * 100)}
                </div>
                <div style={{...styles.tableCell, ...styles.tableCellHighlight, flex: 1}}>
                  {Math.round(selectedData.targets[1].frequency * 100)}
                </div>
              </div>
            </div>
            
            <div style={styles.statisticContainer}>
              <div style={styles.statisticBox}>
                <div style={styles.statisticLabel}>OASIS p-value</div>
                <div style={styles.statisticValue}>{selectedData.pValue}</div>
              </div>
              <div style={styles.statisticBox}>
                <div style={styles.statisticLabel}>Effect Size</div>
                <div style={styles.statisticValue}>{selectedData.effectSize}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SARSCoV2Analysis;