
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const generateData = (count: number) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push([
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 2 + 1
    ]);
  }
  return data;
};

const ParticleChart = () => {
  const [options, setOptions] = useState({
    backgroundColor: 'transparent',
    xAxis: {
      show: false,
      type: 'value',
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'value',
      min: 0,
      max: 100
    },
    series: [{
      symbolSize: 4,
      data: generateData(2000),
      type: 'scatter',
      itemStyle: {
        color: '#D946EF'
      }
    }],
    animation: true
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setOptions(prev => ({
        ...prev,
        series: [{
          ...prev.series[0],
          data: generateData(2000)
        }]
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ReactECharts
      option={options}
      style={{ height: '500px', width: '100%' }}
      className="glass-card"
    />
  );
};

export default ParticleChart;
