import React, { useState } from 'react';

const OctopusTranscriptsAnalysis = () => {
  const [selectedTissue, setSelectedTissue] = useState('brain');
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
    content: {
      display: 'flex',
      flex: 1,
    },
    leftPanel: {
      width: '300px',
      padding: '0 15px 0 0',
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    octopusContainer: {
      height: '250px',
      position: 'relative',
      marginBottom: '20px',
    },
    octopusImage: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: '260px',
      height: '220px',
      backgroundImage: 'radial-gradient(circle at 130px 130px, #9b59b6 10px, transparent 0), radial-gradient(circle at 150px 110px, #8e44ad 50px, transparent 0)',
      backgroundRepeat: 'no-repeat',
    },
    tissueLabel: {
      position: 'absolute',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '3px 6px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    tissueHighlighted: {
      transform: 'scale(1.1)',
      boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
      zIndex: 2,
      border: '1px solid #3498db',
    },
    brainLabel: {
      top: '90px',
      left: '145px',
      color: '#8e44ad',
    },
    eyeLabel: {
      top: '70px',
      left: '80px',
      color: '#e74c3c',
    },
    tentacleLabel: {
      top: '190px',
      left: '60px',
      color: '#2980b9',
    },
    armLabel: {
      top: '150px',
      left: '230px',
      color: '#16a085',
    },
    muscleLabel: {
      top: '130px',
      left: '170px',
      color: '#f39c12',
    },
    detailContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    detailHeader: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#2c3e50',
      borderBottom: '1px solid #ecf0f1',
      paddingBottom: '10px',
    },
    tissueButtons: {
      display: 'flex',
      marginBottom: '15px',
    },
    tissueButton: {
      padding: '8px 15px',
      borderRadius: '4px',
      marginRight: '10px',
      cursor: 'pointer',
      fontSize: '13px',
      border: 'none',
      transition: 'background-color 0.2s',
    },
    activeTissueButton: {
      backgroundColor: '#3498db',
      color: 'white',
      fontWeight: 'bold',
    },
    inactiveTissueButton: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
    },
    spliceVariantContainer: {
      marginBottom: '20px',
    },
    spliceVariantTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    exonContainer: {
      height: '30px',
      position: 'relative',
      marginBottom: '20px',
    },
    exon: {
      position: 'absolute',
      height: '20px',
      backgroundColor: '#3498db',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
    },
    exonAlternative: {
      backgroundColor: '#e74c3c',
    },
    exonIncluded: {
      backgroundColor: '#27ae60',
    },
    transcriptLabel: {
      position: 'absolute',
      left: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    proteinDomainSection: {
      marginTop: '20px',
    },
    domainContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    domainBar: {
      flex: 1,
      height: '25px',
      backgroundColor: '#ecf0f1',
      borderRadius: '4px',
      position: 'relative',
      overflow: 'hidden',
    },
    domain: {
      position: 'absolute',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '11px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    domainLabel: {
      width: '120px',
      fontSize: '12px',
      color: '#7f8c8d',
      marginRight: '10px',
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
    statContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      marginTop: '15px',
    },
    statBox: {
      textAlign: 'center',
    },
    statLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
      marginBottom: '5px',
    },
    statValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2c3e50',
    },
    anchorTarget: {
      fontFamily: 'monospace',
      fontSize: '13px',
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      marginTop: '15px',
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
    },
  };

  const tissueExamples = {
    brain: {
      title: 'Brain Tissue - Neural Tropomyosin Isoform',
      description: 'Brain-specific alternative exon in tropomyosin gene',
      exons: [
        { id: 1, start: 30, width: 80, type: 'normal', label: 'E1' },
        { id: 2, start: 120, width: 60, type: 'alternative', label: 'E2a' },
        { id: 3, start: 190, width: 60, type: 'alternative', label: 'E2b' },
        { id: 4, start: 260, width: 80, type: 'normal', label: 'E3' },
      ],
      transcripts: [
        { name: 'Brain isoform', exons: [1, 2, 4] },
        { name: 'Muscle isoform', exons: [1, 3, 4] },
      ],
      domains: [
        { name: 'Tropomyosin', start: 100, width: 300, color: '#3498db' },
        { name: 'Actin binding', start: 120, width: 60, color: '#e74c3c' },
        { name: 'Calcium binding', start: 240, width: 120, color: '#2ecc71' },
      ],
      anchor: 'GATCCACTGAAGCGTTCCACTGAAG',
      targetA: 'ATCGCTGACCCAGTCAAGGCTATC',
      targetALabel: 'Brain-specific exon (E2a)',
      targetB: 'GATCCTAGACGGTCAGCCTGGATC',
      targetBLabel: 'Muscle-specific exon (E2b)',
      stats: {
        pValue: '4.7e-28',
        effectSize: 0.89,
        brainExpression: '93%',
        muscleExpression: '8%',
      }
    },
    eye: {
      title: 'Eye Tissue - Photosensitive Protein Isoform',
      description: 'Light-responsive transcript variant in photoreceptive tissue',
      exons: [
        { id: 1, start: 30, width: 80, type: 'normal', label: 'E1' },
        { id: 2, start: 120, width: 140, type: 'included', label: 'Light-responsive domain' },
        { id: 3, start: 270, width: 80, type: 'normal', label: 'E3' },
      ],
      transcripts: [
        { name: 'Eye isoform', exons: [1, 2, 3] },
        { name: 'Other tissues', exons: [1, 3] },
      ],
      domains: [
        { name: 'Opsin', start: 50, width: 350, color: '#3498db' },
        { name: 'Retinal binding', start: 120, width: 140, color: '#e74c3c' },
        { name: 'G-protein coupled', start: 270, width: 80, color: '#2ecc71' },
      ],
      anchor: 'CTGAACCTGTACGACTACCTGCAA',
      targetA: 'GGACTGGTTCGACACCACTGGTTA',
      targetALabel: 'With light-responsive domain',
      targetB: 'GTCCAGCTGCAGTGCAACTTCTAC',
      targetBLabel: 'Without light-responsive domain',
      stats: {
        pValue: '8.2e-31',
        effectSize: 0.94,
        eyeExpression: '97%',
        otherExpression: '3%',
      }
    },
    muscle: {
      title: 'Muscle Tissue - Myosin Heavy Chain Isoform',
      description: 'Muscle-specific alternative exon in myosin heavy chain',
      exons: [
        { id: 1, start: 30, width: 80, type: 'normal', label: 'E1' },
        { id: 2, start: 120, width: 80, type: 'alternative', label: 'E2a' },
        { id: 3, start: 210, width: 80, type: 'alternative', label: 'E2b' },
        { id: 4, start: 300, width: 80, type: 'normal', label: 'E3' },
      ],
      transcripts: [
        { name: 'Fast muscle', exons: [1, 2, 4] },
        { name: 'Slow muscle', exons: [1, 3, 4] },
      ],
      domains: [
        { name: 'Myosin head', start: 50, width: 200, color: '#3498db' },
        { name: 'ATP binding', start: 120, width: 80, color: '#e74c3c' },
        { name: 'Actin binding', start: 250, width: 100, color: '#2ecc71' },
      ],
      anchor: 'GGAACTGGCCATCATCGAGGACTCT',
      targetA: 'TCGACCCGTACTCCAAGGTCATCC',
      targetALabel: 'Fast muscle isoform',
      targetB: 'TCCTCGAGCAGCTGTGGCACCAAG',
      targetBLabel: 'Slow muscle isoform',
      stats: {
        pValue: '3.1e-22',
        effectSize: 0.85,
        fastExpression: '74%',
        slowExpression: '26%',
      }
    },
    arm: {
      title: 'Arm Tissue - Unique Suckers Protein',
      description: 'Novel gene with arm/sucker-specific expression',
      exons: [
        { id: 1, start: 30, width: 100, type: 'normal', label: 'E1' },
        { id: 2, start: 140, width: 120, type: 'normal', label: 'E2' },
        { id: 3, start: 270, width: 80, type: 'normal', label: 'E3' },
      ],
      transcripts: [
        { name: 'Sucker isoform', exons: [1, 2, 3] },
        { name: 'Non-detected', exons: [] },
      ],
      domains: [
        { name: 'Adhesion', start: 30, width: 100, color: '#3498db' },
        { name: 'Unknown', start: 140, width: 120, color: '#e74c3c' },
        { name: 'Neurosensory', start: 270, width: 80, color: '#2ecc71' },
      ],
      anchor: 'CTGGTCAACTACGGCTACCAGTGG',
      targetA: 'GACTCGTACGGCAACCTGGGCAAC',
      targetALabel: 'Sucker-specific expression',
      targetB: 'Not detected in other tissues',
      targetBLabel: '',
      stats: {
        pValue: '1.8e-19',
        effectSize: 0.91,
        suckerExpression: '100%',
        otherExpression: '0%',
      }
    },
    tentacle: {
      title: 'Tentacle Tissue - Unique Prey Capture Protein',
      description: 'Novel gene with tentacle-specific expression',
      exons: [
        { id: 1, start: 30, width: 90, type: 'normal', label: 'E1' },
        { id: 2, start: 130, width: 100, type: 'normal', label: 'E2' },
        { id: 3, start: 240, width: 120, type: 'normal', label: 'E3' },
      ],
      transcripts: [
        { name: 'Tentacle isoform', exons: [1, 2, 3] },
        { name: 'Non-detected', exons: [] },
      ],
      domains: [
        { name: 'Fast-twitch', start: 30, width: 120, color: '#3498db' },
        { name: 'Adhesion', start: 160, width: 80, color: '#e74c3c' },
        { name: 'Sensory', start: 250, width: 100, color: '#2ecc71' },
      ],
      anchor: 'GTCAAGTACTCGGACATCGTCCAG',
      targetA: 'CAGCTGGCCAGCAACGAGCTCAAG',
      targetALabel: 'Tentacle-specific expression',
      targetB: 'Not detected in other tissues',
      targetBLabel: '',
      stats: {
        pValue: '2.5e-17',
        effectSize: 0.88,
        tentacleExpression: '100%',
        otherExpression: '0%',
      }
    }
  };

  const activeTissue = tissueExamples[selectedTissue];
  
  const handleDomainHover = (domain, event) => {
    const rect = event.target.getBoundingClientRect();
    const containerRect = event.target.parentElement.parentElement.getBoundingClientRect();
    
    setHoveredElement({
      name: domain.name,
      description: `${domain.name} domain, important for ${domain.name.toLowerCase()} function in ${selectedTissue} tissue.`,
      top: rect.top - containerRect.top + 30,
      left: rect.left - containerRect.left + (rect.width / 2),
    });
  };

  const renderTooltip = () => {
    if (!hoveredElement) return null;
    
    return (
      <div style={styles.tooltipContainer}>
        <strong>{hoveredElement.name}</strong><br />
        {hoveredElement.description}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Octopus Tissue-Specific Transcripts</div>
        <div style={styles.subtitle}>Novel isoforms discovered by SPLASH without comprehensive reference</div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          <div style={styles.octopusContainer}>
            <div style={styles.octopusImage}></div>
            
            <div 
              style={{
                ...styles.tissueLabel, 
                ...styles.brainLabel,
                ...(selectedTissue === 'brain' ? styles.tissueHighlighted : {})
              }}
              onClick={() => setSelectedTissue('brain')}
            >
              Brain
            </div>
            
            <div 
              style={{
                ...styles.tissueLabel, 
                ...styles.eyeLabel,
                ...(selectedTissue === 'eye' ? styles.tissueHighlighted : {})
              }}
              onClick={() => setSelectedTissue('eye')}
            >
              Eye
            </div>
            
            <div 
              style={{
                ...styles.tissueLabel, 
                ...styles.tentacleLabel,
                ...(selectedTissue === 'tentacle' ? styles.tissueHighlighted : {})
              }}
              onClick={() => setSelectedTissue('tentacle')}
            >
              Tentacle
            </div>
            
            <div 
              style={{
                ...styles.tissueLabel, 
                ...styles.armLabel,
                ...(selectedTissue === 'arm' ? styles.tissueHighlighted : {})
              }}
              onClick={() => setSelectedTissue('arm')}
            >
              Arm
            </div>
            
            <div 
              style={{
                ...styles.tissueLabel, 
                ...styles.muscleLabel,
                ...(selectedTissue === 'muscle' ? styles.tissueHighlighted : {})
              }}
              onClick={() => setSelectedTissue('muscle')}
            >
              Muscle
            </div>
          </div>
          
          <div style={styles.tissueButtons}>
            {Object.keys(tissueExamples).map(tissue => (
              <button 
                key={tissue}
                style={{
                  ...styles.tissueButton, 
                  ...(selectedTissue === tissue ? styles.activeTissueButton : styles.inactiveTissueButton)
                }}
                onClick={() => setSelectedTissue(tissue)}
              >
                {tissue.charAt(0).toUpperCase() + tissue.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.detailContainer}>
            <div style={styles.detailHeader}>{activeTissue.title}</div>
            <div style={{fontSize: '14px', marginBottom: '15px', color: '#7f8c8d'}}>{activeTissue.description}</div>
            
            <div style={styles.spliceVariantContainer}>
              <div style={styles.spliceVariantTitle}>Exon Structure</div>
              
              {activeTissue.transcripts.map((transcript, tIndex) => (
                <div key={tIndex} style={{marginBottom: '10px'}}>
                  <div style={{...styles.exonContainer, marginTop: tIndex === 0 ? '30px' : '20px'}}>
                    <div style={{...styles.transcriptLabel, top: '-20px'}}>{transcript.name}</div>
                    
                    {transcript.exons.map(exonId => {
                      const exon = activeTissue.exons.find(e => e.id === exonId);
                      if (!exon) return null;
                      
                      return (
                        <div 
                          key={exonId}
                          style={{
                            ...styles.exon,
                            left: `${exon.start}px`,
                            width: `${exon.width}px`,
                            ...(exon.type === 'alternative' ? styles.exonAlternative : {}),
                            ...(exon.type === 'included' ? styles.exonIncluded : {})
                          }}
                        >
                          {exon.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.proteinDomainSection}>
              <div style={styles.spliceVariantTitle}>Protein Domains</div>
              
              <div style={styles.domainContainer}>
                <div style={styles.domainLabel}>Domains:</div>
                <div style={styles.domainBar}>
                  {activeTissue.domains.map((domain, index) => (
                    <div 
                      key={index}
                      style={{
                        ...styles.domain,
                        left: `${domain.start}px`,
                        width: `${domain.width}px`,
                        backgroundColor: domain.color,
                      }}
                      onMouseEnter={(e) => handleDomainHover(domain, e)}
                      onMouseLeave={() => setHoveredElement(null)}
                    >
                      {domain.name}
                    </div>
                  ))}
                </div>
              </div>
              
              {renderTooltip()}
            </div>
            
            <div style={styles.anchorTarget}>
              <div style={{marginBottom: '5px'}}>
                <strong>Anchor:</strong> <span style={styles.anchor}>{activeTissue.anchor}</span>
              </div>
              <div style={{marginBottom: '5px'}}>
                <strong>Target A:</strong> <span style={styles.target}>{activeTissue.targetA}</span>
                <span style={{fontSize: '11px', marginLeft: '5px', color: '#7f8c8d'}}>{activeTissue.targetALabel}</span>
              </div>
              {activeTissue.targetB && (
                <div>
                  <strong>Target B:</strong> <span style={styles.target}>{activeTissue.targetB}</span>
                  <span style={{fontSize: '11px', marginLeft: '5px', color: '#7f8c8d'}}>{activeTissue.targetBLabel}</span>
                </div>
              )}
            </div>
            
            <div style={styles.statContainer}>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>OASIS p-value</div>
                <div style={styles.statValue}>{activeTissue.stats.pValue}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>Effect Size</div>
                <div style={styles.statValue}>{activeTissue.stats.effectSize}</div>
              </div>
              
              {Object.entries(activeTissue.stats).map(([key, value]) => {
                if (key === 'pValue' || key === 'effectSize') return null;
                
                return (
                  <div key={key} style={styles.statBox}>
                    <div style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                    <div style={styles.statValue}>{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OctopusTranscriptsAnalysis;