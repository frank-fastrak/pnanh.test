
import { useMemo } from 'react';

export const useGrowthLineChart = (monthlyGrowth: { month: string; value: number }[]) => {
  return useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyGrowth.map(item => item.month),
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        data: monthlyGrowth.map(item => item.value),
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: {
          color: '#7B7FFF'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(123, 127, 255, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(123, 127, 255, 0)'
              }
            ]
          }
        }
      }
    ]
  }), [monthlyGrowth]);
};
