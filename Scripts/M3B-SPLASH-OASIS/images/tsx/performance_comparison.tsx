import React, { useState } from 'react';

const PerformanceComparison = () => {
  const [activeTab, setActiveTab] = useState('power');
  
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      height: '500px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#2c3e50',
    },
    subtitle: {
      fontSize: '14px',
      color: '#7f8c8d',
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
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
    },
    contentContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    chartContainer: {
      flex: 1,
      display: 'flex',
      position: 'relative',
    },
    axisLabel: {
      position: 'absolute',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#7f8c8d',
    },
    xAxisLabel: {
      bottom: '5px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    yAxisLabel: {
      top: '50%',
      left: '5px',
      transform: 'translateX(-50%) rotate(-90deg)',
      transformOrigin: 'center',
    },
    legend: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
      fontSize: '12px',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
    },
    legendColor: {
      width: '12px',
      height: '12px',
      marginRight: '5px',
      borderRadius: '2px',
    },
    chartArea: {
      flex: 1,
      height: '100%',
      padding: '30px',
      boxSizing: 'border-box',
      position: 'relative',
    },
    axisLine: {
      position: 'absolute',
      backgroundColor: '#bdc3c7',
    },
    xAxis: {
      height: '1px',
      bottom: '30px',
      left: '50px',
      right: '30px',
    },
    yAxis: {
      width: '1px',
      bottom: '30px',
      top: '30px',
      left: '50px',
    },
    gridLine: {
      position: 'absolute',
      backgroundColor: '#ecf0f1',
    },
    axisText: {
      position: 'absolute',
      fontSize: '10px',
      color: '#95a5a6',
    },
    barContainer: {
      display: 'flex',
      position: 'absolute',
      bottom: '30px',
      alignItems: 'flex-end',
    },
    bar: {
      width: '40px',
      marginRight: '20px',
      transition: 'height 0.5s',
    },
    barLabel: {
      position: 'absolute',
      bottom: '-25px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#7f8c8d',
    },
    lineChartPoint: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    },
    lineChartLine: {
      position: 'absolute',
      height: '2px',
      transformOrigin: 'left center',
    },
    tableContainer: {
      flex: 1,
      margin: '20px 40px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#ecf0f1',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
      color: '#2c3e50',
    },
    tableHeaderCenter: {
      textAlign: 'center',
    },
    tableCell: {
      padding: '10px 15px',
      borderBottom: '1px solid #ecf0f1',
      fontSize: '13px',
    },
    tableCellCenter: {
      textAlign: 'center',
    },
    betterValue: {
      color: '#27ae60',
      fontWeight: 'bold',
    },
    worseValue: {
      color: '#e74c3c',
    },
    neutralValue: {
      color: '#f39c12',
    },
  };

  // Test case data
  const testCases = [
    { 
      id: 1, 
      name: 'Sparse data', 
      description: 'Tables with many zero counts', 
      oasis: 'Excellent', 
      chiSquared: 'Poor',
      oasisValue: 0.92,
      chiSquaredValue: 0.45
    },
    { 
      id: 2, 
      name: 'Small sample size', 
      description: 'Few observations per cell', 
      oasis: 'Good', 
      chiSquared: 'Poor',
      oasisValue: 0.85,
      chiSquaredValue: 0.40
    },
    { 
      id: 3, 
      name: 'Large tables', 
      description: 'Many rows and columns', 
      oasis: 'Good', 
      chiSquared: 'Moderate',
      oasisValue: 0.78,
      chiSquaredValue: 0.65
    },
    { 
      id: 4, 
      name: 'Unbalanced tables', 
      description: 'Highly skewed distributions', 
      oasis: 'Good', 
      chiSquared: 'Moderate',
      oasisValue: 0.80,
      chiSquaredValue: 0.70
    },
    { 
      id: 5, 
      name: 'Well-behaved data', 
      description: 'Sufficient counts in all cells', 
      oasis: 'Excellent', 
      chiSquared: 'Good',
      oasisValue: 0.95,
      chiSquaredValue: 0.90
    },
  ];

  // Power curve data
  const powerCurveData = [
    { effectSize: 0.1, oasis: 0.22, chiSquared: 0.15 },
    { effectSize: 0.2, oasis: 0.38, chiSquared: 0.30 },
    { effectSize: 0.3, oasis: 0.61, chiSquared: 0.48 },
    { effectSize: 0.4, oasis: 0.78, chiSquared: 0.65 },
    { effectSize: 0.5, oasis: 0.88, chiSquared: 0.78 },
    { effectSize: 0.6, oasis: 0.94, chiSquared: 0.85 },
    { effectSize: 0.7, oasis: 0.97, chiSquared: 0.91 },
    { effectSize: 0.8, oasis: 0.99, chiSquared: 0.94 },
  ];

  // Compute metrics data
  const computeTimeData = [
    { dataSize: '1K', oasis: 0.2, chiSquared: 0.2 },
    { dataSize: '10K', oasis: 0.5, chiSquared: 0.7 },
    { dataSize: '100K', oasis: 1.2, chiSquared: 1.8 },
    { dataSize: '1M', oasis: 4.5, chiSquared: 12.7 },
    { dataSize: '10M', oasis: 15.8, chiSquared: 35.4 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'power':
        return renderPowerCurve();
      case 'compute':
        return renderComputeTime();
      case 'comparison':
        return renderComparison();
      default:
        return renderPowerCurve();
    }
  };

  const renderPowerCurve = () => {
    const chartHeight = 300;
    const chartWidth = 600;
    
    return (
      <div style={styles.chartContainer}>
        <div style={styles.axisLabel} style={{...styles.xAxisLabel, bottom: '10px'}}>Effect Size</div>
        <div style={styles.axisLabel} style={{...styles.yAxisLabel, left: '15px'}}>Statistical Power</div>
        
        <div style={styles.chartArea}>
          {/* X-axis */}
          <div style={{...styles.axisLine, ...styles.xAxis}}></div>
          {/* Y-axis */}
          <div style={{...styles.axisLine, ...styles.yAxis}}></div>
          
          {/* X-axis labels */}
          {[0, 0.2, 0.4, 0.6, 0.8].map((value, index) => (
            <div 
              key={`x-${index}`} 
              style={{
                ...styles.axisText, 
                bottom: '15px', 
                left: `${50 + (value / 0.8) * (chartWidth - 80)}px`
              }}
            >
              {value}
            </div>
          ))}
          
          {/* Y-axis labels */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((value, index) => (
            <div 
              key={`y-${index}`} 
              style={{
                ...styles.axisText, 
                bottom: `${30 + (value) * (chartHeight - 60)}px`, 
                left: '35px'
              }}
            >
              {value}
            </div>
          ))}
          
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((value, index) => (
            <div 
              key={`grid-y-${index}`} 
              style={{
                ...styles.gridLine, 
                height: '1px',
                bottom: `${30 + (value) * (chartHeight - 60)}px`, 
                left: '50px',
                right: '30px'
              }}
            ></div>
          ))}
          
          {[0.2, 0.4, 0.6, 0.8].map((value, index) => (
            <div 
              key={`grid-x-${index}`} 
              style={{
                ...styles.gridLine, 
                width: '1px',
                bottom: '30px',
                top: '30px',
                left: `${50 + (value / 0.8) * (chartWidth - 80)}px`
              }}
            ></div>
          ))}
          
          {/* OASIS curve */}
          {powerCurveData.map((point, index) => {
            if (index < powerCurveData.length - 1) {
              const nextPoint = powerCurveData[index + 1];
              const x1 = 50 + (point.effectSize / 0.8) * (chartWidth - 80);
              const y1 = 30 + (1 - point.oasis) * (chartHeight - 60);
              const x2 = 50 + (nextPoint.effectSize / 0.8) * (chartWidth - 80);
              const y2 = 30 + (1 - nextPoint.oasis) * (chartHeight - 60);
              
              const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
              
              return (
                <div 
                  key={`oasis-line-${index}`}
                  style={{
                    ...styles.lineChartLine,
                    backgroundColor: '#3498db',
                    width: `${length}px`,
                    left: `${x1}px`,
                    top: `${y1}px`,
                    transform: `rotate(${angle}deg)`
                  }}
                ></div>
              );
            }
            return null;
          })}
          
          {/* Chi-squared curve */}
          {powerCurveData.map((point, index) => {
            if (index < powerCurveData.length - 1) {
              const nextPoint = powerCurveData[index + 1];
              const x1 = 50 + (point.effectSize / 0.8) * (chartWidth - 80);
              const y1 = 30 + (1 - point.chiSquared) * (chartHeight - 60);
              const x2 = 50 + (nextPoint.effectSize / 0.8) * (chartWidth - 80);
              const y2 = 30 + (1 - nextPoint.chiSquared) * (chartHeight - 60);
              
              const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
              
              return (
                <div 
                  key={`chi-line-${index}`}
                  style={{
                    ...styles.lineChartLine,
                    backgroundColor: '#e74c3c',
                    width: `${length}px`,
                    left: `${x1}px`,
                    top: `${y1}px`,
                    transform: `rotate(${angle}deg)`
                  }}
                ></div>
              );
            }
            return null;
          })}
          
          {/* OASIS points */}
          {powerCurveData.map((point, index) => (
            <div 
              key={`oasis-point-${index}`}
              style={{
                ...styles.lineChartPoint,
                backgroundColor: '#3498db',
                left: `${50 + (point.effectSize / 0.8) * (chartWidth - 80)}px`,
                top: `${30 + (1 - point.oasis) * (chartHeight - 60)}px`
              }}
            ></div>
          ))}
          
          {/* Chi-squared points */}
          {powerCurveData.map((point, index) => (
            <div 
              key={`chi-point-${index}`}
              style={{
                ...styles.lineChartPoint,
                backgroundColor: '#e74c3c',
                left: `${50 + (point.effectSize / 0.8) * (chartWidth - 80)}px`,
                top: `${30 + (1 - point.chiSquared) * (chartHeight - 60)}px`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  const renderComputeTime = () => {
    const maxHeight = 250;
    
    return (
      <div style={styles.chartContainer}>
        <div style={styles.axisLabel} style={{...styles.xAxisLabel, bottom: '10px'}}>Dataset Size</div>
        <div style={styles.axisLabel} style={{...styles.yAxisLabel, left: '15px'}}>Compute Time (s)</div>
        
        <div style={styles.chartArea}>
          {/* X-axis */}
          <div style={{...styles.axisLine, ...styles.xAxis}}></div>
          {/* Y-axis */}
          <div style={{...styles.axisLine, ...styles.yAxis}}></div>
          
          {/* Bars */}
          {computeTimeData.map((item, index) => {
            const leftPosition = 80 + index * 100;
            return (
              <div 
                key={`bar-group-${index}`} 
                style={{
                  ...styles.barContainer,
                  left: `${leftPosition}px`,
                }}
              >
                {/* OASIS bar */}
                <div 
                  style={{
                    ...styles.bar,
                    backgroundColor: '#3498db',
                    height: `${(item.oasis / 40) * maxHeight}px`,
                  }}
                ></div>
                
                {/* Chi-squared bar */}
                <div 
                  style={{
                    ...styles.bar,
                    backgroundColor: '#e74c3c',
                    height: `${(item.chiSquared / 40) * maxHeight}px`,
                  }}
                ></div>
                
                {/* X-axis label */}
                <div style={styles.barLabel}>{item.dataSize}</div>
              </div>
            );
          })}
          
          {/* Y-axis labels */}
          {[0, 10, 20, 30, 40].map((value, index) => (
            <div 
              key={`y-${index}`} 
              style={{
                ...styles.axisText, 
                bottom: `${30 + (value / 40) * maxHeight}px`, 
                left: '35px'
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderComparison = () => {
    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Test Case</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={{...styles.tableHeader, ...styles.tableHeaderCenter}}>OASIS</th>
              <th style={{...styles.tableHeader, ...styles.tableHeaderCenter}}>Chi-Squared</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase) => (
              <tr key={testCase.id}>
                <td style={styles.tableCell}>{testCase.name}</td>
                <td style={styles.tableCell}>{testCase.description}</td>
                <td 
                  style={{
                    ...styles.tableCell, 
                    ...styles.tableCellCenter,
                    ...(testCase.oasisValue > testCase.chiSquaredValue ? styles.betterValue : styles.neutralValue)
                  }}
                >
                  {testCase.oasis}
                </td>
                <td 
                  style={{
                    ...styles.tableCell, 
                    ...styles.tableCellCenter,
                    ...(testCase.chiSquaredValue > testCase.oasisValue ? styles.betterValue : 
                        testCase.chiSquaredValue < testCase.oasisValue ? styles.worseValue : styles.neutralValue)
                  }}
                >
                  {testCase.chiSquared}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>OASIS vs Chi-Squared Performance Comparison</div>
        <div style={styles.subtitle}>Comparing statistical power, computational efficiency, and use cases</div>
      </div>
      
      <div style={styles.tabContainer}>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'power' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('power')}
        >
          Statistical Power
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'compute' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('compute')}
        >
          Compute Efficiency
        </div>
        <div 
          style={{
            ...styles.tab, 
            ...(activeTab === 'comparison' ? styles.activeTab : styles.inactiveTab)
          }}
          onClick={() => setActiveTab('comparison')}
        >
          Test Case Comparison
        </div>
      </div>
      
      <div style={styles.contentContainer}>
        {renderContent()}
      </div>
      
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{...styles.legendColor, backgroundColor: '#3498db'}}></div>
          <span>OASIS</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{...styles.legendColor, backgroundColor: '#e74c3c'}}></div>
          <span>Chi-Squared</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparison;