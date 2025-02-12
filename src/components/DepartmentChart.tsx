
import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

interface Department {
  id: string;
  name: string;
  totalReports: number;
  totalPayroll: string;
  chiefOfficer: string;
  chiefTitle: string;
  directReports: number;
  color: string;
}

interface DepartmentChartProps {
  departments: Department[];
}

const DepartmentChart = ({ departments }: DepartmentChartProps) => {
  const options = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Departments',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        startAngle: 90,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}',
          color: '#fff',
          fontSize: 14
        },
        data: departments.map(dept => ({
          value: dept.totalReports,
          name: dept.name,
          itemStyle: {
            color: dept.color
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
    ]
  }), [departments]);

  return (
    <div className="glass-card">
      <ReactECharts
        option={options}
        style={{ height: '600px', width: '100%' }}
      />
    </div>
  );
};

export default DepartmentChart;
