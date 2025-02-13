
import { useMemo } from 'react';
import { Department } from '@/types/department';

export const useMainChartOptions = (departments: Department[]) => {
  return useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'Departments',
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '50%'],
        startAngle: 90,
        label: {
          show: true,
          position: 'outside',
          formatter: function(params: any) {
            return [
              `{title|${params.data.id} ${params.name.toUpperCase()}}`,
              `{value|${params.value.toLocaleString()}}`
            ].join('\n');
          },
          rich: {
            title: {
              color: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
              padding: [0, 0, 4, 0]
            },
            value: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          padding: [0, 20]
        },
        labelLine: {
          length: 20,
          length2: 60,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        data: departments.map(dept => ({
          value: dept.totalReports,
          name: dept.name,
          id: dept.id,
          itemStyle: {
            color: dept.color,
            borderColor: '#1A1F2C',
            borderWidth: 2
          },
          emphasis: {
            scale: true,
            scaleSize: 10
          }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    polar: {
      radius: ['45%', '75%']
    },
    angleAxis: {
      type: 'value',
      startAngle: 90,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    radiusAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    }
  }), [departments]);
};
