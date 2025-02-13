
import { useMemo } from 'react';

export const useRolePieChart = (employeesByRole: Record<string, number>) => {
  return useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderColor: '#1A1F2C',
          borderWidth: 2
        },
        label: {
          show: true,
          color: '#fff'
        },
        data: Object.entries(employeesByRole).map(([name, value]) => ({
          name,
          value,
          itemStyle: {
            color: name === 'Senior Manager' ? '#FF9B7B' : 
                   name === 'Team Lead' ? '#7B7FFF' : '#B47BFF'
          }
        }))
      }
    ]
  }), [employeesByRole]);
};
