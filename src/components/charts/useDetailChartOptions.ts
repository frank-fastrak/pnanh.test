
import { useMemo } from 'react';
import { Department, DepartmentData, GrowthData } from '@/types/department';

const generateDepartmentData = (department: Department): DepartmentData[] => {
  const total = department.totalReports;
  const directReports = department.directReports;
  const managersCount = Math.floor(total * 0.15);
  const specialistsCount = Math.floor(total * 0.35);
  const associatesCount = total - managersCount - specialistsCount - directReports;

  return [
    { value: directReports, name: 'Direct Reports', itemStyle: { color: department.color } },
    { value: managersCount, name: 'Managers', itemStyle: { color: '#9b87f5' } },
    { value: specialistsCount, name: 'Specialists', itemStyle: { color: '#7E69AB' } },
    { value: associatesCount, name: 'Associates', itemStyle: { color: '#D6BCFA' } },
  ];
};

const generateGrowthData = (department: Department): GrowthData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const baseValue = department.totalReports;
  
  return months.map((month, index) => ({
    month,
    value: Math.floor(baseValue * (1 + (index * 0.05)))
  }));
};

export const useDetailChartOptions = (department: Department) => {
  return useMemo(() => {
    const growthData = generateGrowthData(department);
    
    return {
      backgroundColor: 'transparent',
      grid: [
        { left: '5%', right: '55%', top: '10%', bottom: '10%' },
        { left: '55%', right: '5%', top: '10%', bottom: '10%' }
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Department Breakdown',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['30%', '50%'],
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c} ({d}%)',
            color: '#fff'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            }
          },
          data: generateDepartmentData(department),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        {
          name: 'Growth Trend',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
            color: department.color
          },
          itemStyle: {
            color: department.color,
            borderWidth: 2,
            borderColor: '#1A1F2C'
          },
          areaStyle: {
            opacity: 0.2,
            color: department.color
          },
          data: growthData.map(item => item.value)
        }
      ],
      xAxis: [
        { show: false },
        {
          type: 'category',
          gridIndex: 1,
          data: growthData.map(item => item.month),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        }
      ],
      yAxis: [
        { show: false },
        {
          type: 'value',
          gridIndex: 1,
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 12
          }
        }
      ]
    };
  }, [department]);
};
