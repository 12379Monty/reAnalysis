import React, { useState } from 'react';

const EelgrassAnalysis = () => {
  const [selectedComparison, setSelectedComparison] = useState('geographic');
  const [selectedExample, setSelectedExample] = useState('diatom');
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
      width: '250px',
      borderRight: '1px solid #e0e0e0',
      padding: '0 15px 0 0',
    },
    rightPanel: {
      flex: 1,
      padding: '0 0 0 15px',
    },
    mapContainer: {
      position: 'relative',
      height: '200px',
      backgroundColor: '#d6eaf8',
      borderRadius: '8px',
      marginBottom: '20px',
      overflow: 'hidden',
    },
    countryShape: {
      position: 'absolute',
      backgroundColor: '#bdc3c7',
    },
    franceLand: {
      width: '80px',
      height: '60px',
      bottom: '40px',
      left: '60px',
      borderRadius: '10px',
    },
    norwayLand: {
      width: '50px',
      height: '100px',
      top: '30px',
      right: '70px',
      borderRadius: '10px 10px 0 0',
    },
    locationMarker: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '2px solid white',
      transition: 'transform 0.2s',
    },
    locationMarkerHighlighted: {
      transform: 'scale(1.3)',
      zIndex: 2,
    },
    franceMarker: {
      backgroundColor: '#e74c3c',
      bottom: '50px',
      left: '90px',
    },
    norwayMarker: {
      backgroundColor: '#3498db',
      top: '70px',
      right: '90px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      fontSize: '12px',
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '8px',
      border: '1px solid white',
    },
    seasonContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '10px',
    },
    seasonMarker: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
    },
    seasonIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '5px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '12px',
    },
    seasonLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
    },
    exampleButtonContainer: {
      marginTop: '20px',
    },
    exampleButton: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      cursor: 'pointer',
      fontSize: '13px',
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
    },
    detailContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
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
    barChartContainer: {
      height: '200px',
      position: 'relative',
      marginTop: '30px',
      marginBottom: '40px',
    },
    axisLine: {
      position: 'absolute',
      backgroundColor: '#bdc3c7',
    },
    xAxis: {
      height: '1px',
      bottom: '0',
      left: '40px',
      right: '20px',
    },
    yAxis: {
      width: '1px',
      bottom: '0',
      top: '0',
      left: '40px',
    },
    barGroup: {
      position: 'absolute',
      display: 'flex',
      bottom: '0',
    },
    bar: {
      width: '40px',
      marginRight: '15px',
      transition: 'height 0.5s',
    },
    barLabel: {
      position: 'absolute',
      bottom: '-25px',
      fontSize: '12px',
      textAlign: 'center',
      width: '100%',
      color: '#7f8c8d',
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
    },
    sequenceContainer: {
      marginTop: '20px',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
    },
    sequenceTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    sequenceBlock: {
      fontFamily: 'monospace',
      fontSize: '13px',
      marginBottom: '15px',
    },
    sequenceLabel: {
      fontSize: '12px',
      color: '#7f8c8d',
      marginBottom: '5px',
    },
    sequenceText: {
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      overflowX: 'auto',
    },
    highlightBlock: {
      backgroundColor: '#ffffcc',
    },
    statContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    statBox: {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      width: '120px',
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
    blastResultContainer: {
      marginTop: '20px',
    },
    blastResultTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    blastResult: {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#2c3e50',
      fontFamily: 'monospace',
    },
    anchor: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '2px 4px',
      borderRadius: '2px',
      margin: '0 2px',
    },
    target: {
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '2px 4px',
      borderRadius: '2px',
      margin: '0 2px',
    },
  };

  const comparisonExamples = {
    geographic: {
      title: 'Geographic Variation in Eelgrass',
      description: 'Comparing eelgrass samples from France and Norway',
      examples: {
        diatom: {
          title: 'Diatom Association',
          description: 'Detection of diatom sequences associated with eelgrass in different locations',
          chartData: [
            { label: 'France', value: 78, color: '#e74c3c' },
            { label: 'Norway', value: 32, color: '#3498db' },
          ],
          sequences: {
            title: 'Fucoxanthin Chlorophyll Protein (FCP)',
            description: 'Diatom-specific light-harvesting protein detected in eelgrass samples',
            sequences: [
              { 
                label: 'Anchor', 
                sequence: 'GACTCAAGCTCGTAGACCACTGAGG', 
                type: 'anchor' 
              },
              { 
                label: 'Target 1 (France)', 
                sequence: 'CTGACTGCTTACGCCAAGGTCGCCT', 
                type: 'target',
                highlight: true
              },
              { 
                label: 'Target 2 (Norway)', 
                sequence: 'GAGGCTGCCCAACGCTATGCTCAAG', 
                type: 'target' 
              },
            ],
            blast: {
              title: 'BLAST Result',
              result: 'Phaeodactylum tricornutum fucoxanthin chlorophyll a/c protein',
              identity: '95% identity (42/44 amino acids)'
            }
          },
          stats: {
            pValue: '3.2e-17',
            effectSize: 0.89,
            france: '78%',
            norway: '32%',
          }
        },
        stress: {
          title: 'Temperature Stress Response',
          description: 'Differential expression of heat shock proteins in different geographic locations',
          chartData: [
            { label: 'France', value: 45, color: '#e74c3c' },
            { label: 'Norway', value: 92, color: '#3498db' },
          ],
          sequences: {
            title: 'Heat Shock Protein (HSP70)',
            description: 'Protein involved in response to temperature stress',
            sequences: [
              { 
                label: 'Anchor', 
                sequence: 'GACTGCAAGACCTTCGACGTCAAGG', 
                type: 'anchor' 
              },
              { 
                label: 'Target 1 (France)', 
                sequence: 'CTGGTCAAGACTGCGCTCGAGGGTA', 
                type: 'target' 
              },
              { 
                label: 'Target 2 (Norway)', 
                sequence: 'ATCGCCAAGAACGCCATCACCAGCA', 
                type: 'target',
                highlight: true 
              },
            ],
            blast: {
              title: 'BLAST Result',
              result: 'Zostera marina heat shock protein 70',
              identity: '98% identity (47/48 amino acids)'
            }
          },
          stats: {
            pValue: '1.7e-22',
            effectSize: 0.91,
            france: '45%',
            norway: '92%',
          }
        },
      }
    },
    seasonal: {
      title: 'Seasonal Variation in Eelgrass',
      description: 'Comparing eelgrass samples from different seasons and day/night cycles',
      examples: {
        circadian: {
          title: 'Circadian Regulation',
          description: 'Day/night differences in photosynthesis-related gene expression',
          chartData: [
            { label: 'Day', value: 95, color: '#f39c12' },
            { label: 'Night', value: 38, color: '#34495e' },
          ],
          sequences: {
            title: 'Chlorophyll a/b Binding Protein',
            description: 'Light-harvesting protein showing circadian regulation',
            sequences: [
              { 
                label: 'Anchor', 
                sequence: 'GTCAAGCACTACCCGGACGTCTACG', 
                type: 'anchor' 
              },
              { 
                label: 'Target (Day)', 
                sequence: 'ACGTCGCCAAGGCCATCGAGAAGCT', 
                type: 'target',
                highlight: true 
              },
              { 
                label: 'Target (Night)', 
                sequence: 'ACGTCGCCAAGGCCATCGAGAAGCT', 
                type: 'target' 
              },
            ],
            blast: {
              title: 'BLAST Result',
              result: 'Zostera marina light-harvesting chlorophyll a/b-binding protein',
              identity: '100% identity (50/50 amino acids)'
            }
          },
          stats: {
            pValue: '4.8e-26',
            effectSize: 0.93,
            day: '95%',
            night: '38%',
          }
        },
        seasonal: {
          title: 'Seasonal Adaptation',
          description: 'Expression differences between summer and winter samples',
          chartData: [
            { label: 'Summer', value: 30, color: '#e74c3c' },
            { label: 'Winter', value: 85, color: '#3498db' },
          ],
          sequences: {
            title: 'Antifreeze Protein',
            description: 'Protein involved in cold tolerance during winter months',
            sequences: [
              { 
                label: 'Anchor', 
                sequence: 'CTGACCTACGGCATCAAGGTCGACT', 
                type: 'anchor' 
              },
              { 
                label: 'Target (Summer)', 
                sequence: 'GATCCAGTCCTACGAGCTGAACCAG', 
                type: 'target' 
              },
              { 
                label: 'Target (Winter)', 
                sequence: 'GGTCAACGCCGAGATCCTCGACTGC', 
                type: 'target',
                highlight: true 
              },
            ],
            blast: {
              title: 'BLAST Result',
              result: 'Zostera marina cold-regulated protein',
              identity: '87% identity (39/45 amino acids)'
            }
          },
          stats: {
            pValue: '7.3e-19',
            effectSize: 0.86,
            summer: '30%',
            winter: '85%',
          }
        },
      }
    }
  };

  const activeComparison = comparisonExamples[selectedComparison];
  const activeExample = activeComparison.examples[selectedExample];

  const handleLocationHover = (location, event) => {
    const rect = event.target.getBoundingClientRect();
    const containerRect = event.target.parentElement.getBoundingClientRect();
    
    setHoveredElement({
      name: location.label,
      description: `${location.label} sampling site: ${location.description}`,
      top: rect.top - containerRect.top + 20,
      left: rect.left - containerRect.left,
    });
  };

  const renderTooltip = () => {
    if (!hoveredElement) return null;
    
    return (
      <div 
        style={{
          ...styles.tooltipContainer,
          top: hoveredElement.top,
          left: hoveredElement.left,
        }}
      >
        <strong>{hoveredElement.name}</strong><br />
        {hoveredElement.description}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Eelgrass Geographic and Seasonal Variation</div>
        <div style={styles.subtitle}>Novel biology discovered without complete reference genome</div>
      </div>
      
      <div style={styles.tabContainer}>
        <div 
          style={{
            ...styles.tab, 
            ...(selectedComparison === 'geographic' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => {
            setSelectedComparison('geographic');
            setSelectedExample('diatom');
          }}
        >
          Geographic Variation
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(selectedComparison === 'seasonal' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => {
            setSelectedComparison('seasonal');
            setSelectedExample('circadian');
          }}
        >
          Seasonal Variation
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.leftPanel}>
          {selectedComparison === 'geographic' && (
            <div style={styles.mapContainer}>
              <div style={{...styles.countryShape, ...styles.franceLand}}></div>
              <div style={{...styles.countryShape, ...styles.norwayLand}}></div>
              
              <div 
                style={{
                  ...styles.locationMarker, 
                  ...styles.franceMarker,
                  ...(activeExample.chartData[0].label === 'France' ? styles.locationMarkerHighlighted : {})
                }}
                onMouseEnter={(e) => handleLocationHover({
                  label: 'France',
                  description: 'Mediterranean coastal region with warmer water temperatures'
                }, e)}
                onMouseLeave={() => setHoveredElement(null)}
              ></div>
              
              <div 
                style={{
                  ...styles.locationMarker, 
                  ...styles.norwayMarker,
                  ...(activeExample.chartData[0].label === 'Norway' ? styles.locationMarkerHighlighted : {})
                }}
                onMouseEnter={(e) => handleLocationHover({
                  label: 'Norway',
                  description: 'North Atlantic coastal region with colder water temperatures'
                }, e)}
                onMouseLeave={() => setHoveredElement(null)}
              ></div>
              
              <div style={{position: 'absolute', bottom: '10px', left: '10px'}}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#e74c3c'}}></div>
                  <span>France</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: '#3498db'}}></div>
                  <span>Norway</span>
                </div>
              </div>
              
              {renderTooltip()}
            </div>
          )}
          
          {selectedComparison === 'seasonal' && (
            <div style={styles.mapContainer}>
              <div style={styles.seasonContainer}>
                <div style={styles.seasonMarker}>
                  <div style={{...styles.seasonIcon, backgroundColor: '#f39c12'}}>Day</div>
                  <div style={styles.seasonLabel}>Day samples</div>
                </div>
                <div style={styles.seasonMarker}>
                  <div style={{...styles.seasonIcon, backgroundColor: '#34495e'}}>Night</div>
                  <div style={styles.seasonLabel}>Night samples</div>
                </div>
              </div>
              
              <div style={styles.seasonContainer} style={{marginTop: '30px'}}>
                <div style={styles.seasonMarker}>
                  <div style={{...styles.seasonIcon, backgroundColor: '#e74c3c'}}>Sum</div>
                  <div style={styles.seasonLabel}>Summer</div>
                </div>
                <div style={styles.seasonMarker}>
                  <div style={{...styles.seasonIcon, backgroundColor: '#3498db'}}>Win</div>
                  <div style={styles.seasonLabel}>Winter</div>
                </div>
              </div>
            </div>
          )}
          
          <div style={styles.exampleButtonContainer}>
            {Object.entries(activeComparison.examples).map(([key, example]) => (
              <button 
                key={key}
                style={{
                  ...styles.exampleButton, 
                  ...(selectedExample === key ? styles.activeExampleButton : styles.inactiveExampleButton)
                }}
                onClick={() => setSelectedExample(key)}
              >
                {example.title}
              </button>
            ))}
          </div>
          
          <div style={{fontSize: '12px', marginTop: '20px', color: '#7f8c8d'}}>
            <strong>Key Findings:</strong>
            <ul style={{paddingLeft: '20px'}}>
              <li>Discovered diatom association with eelgrass</li>
              <li>Identified geographic adaptations between populations</li>
              <li>Found circadian regulation in photosynthesis genes</li>
              <li>Detected seasonal variation related to temperature</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.rightPanel}>
          <div style={styles.detailContainer}>
            <div style={styles.detailHeader}>{activeExample.title}</div>
            <div style={{fontSize: '14px', marginBottom: '15px', color: '#7f8c8d'}}>{activeExample.description}</div>
            
            <div style={styles.barChartContainer}>
              <div style={{...styles.axisLine, ...styles.xAxis}}></div>
              <div style={{...styles.axisLine, ...styles.yAxis}}></div>
              
              {activeExample.chartData.map((item, index) => {
                const leftPosition = 80 + index * 80;
                return (
                  <div 
                    key={index}
                    style={{
                      ...styles.barGroup,
                      left: `${leftPosition}px`,
                    }}
                  >
                    <div 
                      style={{
                        ...styles.bar,
                        backgroundColor: item.color,
                        height: `${item.value * 1.5}px`,
                      }}
                    >
                      <div style={styles.barLabel}>{item.label}</div>
                    </div>
                  </div>
                );
              })}
              
              {/* Y-axis labels */}
              <div style={{position: 'absolute', left: '25px', top: '0', fontSize: '12px', color: '#7f8c8d'}}>100%</div>
              <div style={{position: 'absolute', left: '25px', top: '75px', fontSize: '12px', color: '#7f8c8d'}}>50%</div>
              <div style={{position: 'absolute', left: '25px', bottom: '0', fontSize: '12px', color: '#7f8c8d'}}>0%</div>
            </div>
            
            <div style={styles.sequenceContainer}>
              <div style={styles.sequenceTitle}>{activeExample.sequences.title}</div>
              <div style={{fontSize: '12px', marginBottom: '15px', color: '#7f8c8d'}}>{activeExample.sequences.description}</div>
              
              {activeExample.sequences.sequences.map((seq, index) => (
                <div key={index} style={styles.sequenceBlock}>
                  <div style={styles.sequenceLabel}>{seq.label}:</div>
                  <div 
                    style={{
                      ...styles.sequenceText,
                      ...(seq.highlight ? styles.highlightBlock : {})
                    }}
                  >
                    <span style={seq.type === 'anchor' ? styles.anchor : seq.type === 'target' ? styles.target : {}}>
                      {seq.sequence}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.blastResultContainer}>
              <div style={styles.blastResultTitle}>{activeExample.sequences.blast.title}</div>
              <div style={styles.blastResult}>
                <strong>Match:</strong> {activeExample.sequences.blast.result}<br />
                <strong>Identity:</strong> {activeExample.sequences.blast.identity}
              </div>
            </div>
            
            <div style={styles.statContainer}>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>OASIS p-value</div>
                <div style={styles.statValue}>{activeExample.stats.pValue}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statLabel}>Effect Size</div>
                <div style={styles.statValue}>{activeExample.stats.effectSize}</div>
              </div>
              
              {Object.entries(activeExample.stats).map(([key, value]) => {
                if (key === 'pValue' || key === 'effectSize') return null;
                
                const color = key === 'france' || key === 'day' || key === 'summer' ? '#e74c3c' : '#3498db';
                
                return (
                  <div key={key} style={styles.statBox}>
                    <div style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div style={{...styles.statValue, color}}>{value}</div>
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

export default EelgrassAnalysis;