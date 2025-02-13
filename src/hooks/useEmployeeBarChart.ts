
import { useMemo } from 'react';

export const useEmployeeBarChart = (employeesByRegion: { name: string; value: number }[]) => {
  return useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    yAxis: {
      type: 'category',
      data: employeesByRegion.map(item => item.name),
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        name: 'Employees',
        type: 'bar',
        data: employeesByRegion.map(item => item.value),
        itemStyle: {
          color: '#7B7FFF'
        }
      }
    ]
  }), [employeesByRegion]);
};
