
import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // Generate scatter points for the overlay effect
  const generateScatterData = (count: number) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const r = 0.7 + Math.random() * 0.3; // Between 0.7 and 1 for outer ring
      data.push([
        r * Math.cos(theta),
        r * Math.sin(theta),
        1
      ]);
    }
    return data;
  };

  const onChartClick = (params: any) => {
    if (params.data && params.data.id) {
      navigate(`/detail/${params.data.id}`);
    }
  };

  const options = useMemo(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
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
      },
      {
        // Particle overlay effect
        name: 'Scatter',
        type: 'scatter',
        coordinateSystem: 'polar',
        symbolSize: 1,
        animation: false,
        data: generateScatterData(2000),
        itemStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      }
    ],
    polar: {
      radius: ['45%', '75%']
    },
    angleAxis: {
      type: 'value',
      startAngle: 90,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  }), [departments]);

  return (
    <div className="glass-card">
      <ReactECharts
        option={options}
        style={{ height: '600px', width: '100%' }}
        onEvents={{
          click: onChartClick
        }}
      />
    </div>
  );
};

export default DepartmentChart;
