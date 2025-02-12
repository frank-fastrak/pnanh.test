import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { departmentId } = useParams();
  const selectedDepartment = departments.find(dept => dept.id === departmentId);

  // Generate mock data for the department breakdown
  const generateDepartmentData = () => {
    if (!selectedDepartment) return null;

    const total = selectedDepartment.totalReports;
    const directReports = selectedDepartment.directReports;
    const managersCount = Math.floor(total * 0.15); // 15% are managers
    const specialistsCount = Math.floor(total * 0.35); // 35% are specialists
    const associatesCount = total - managersCount - specialistsCount - directReports;

    return [
      { value: directReports, name: 'Direct Reports', itemStyle: { color: selectedDepartment.color } },
      { value: managersCount, name: 'Managers', itemStyle: { color: '#9b87f5' } },
      { value: specialistsCount, name: 'Specialists', itemStyle: { color: '#7E69AB' } },
      { value: associatesCount, name: 'Associates', itemStyle: { color: '#D6BCFA' } },
    ];
  };

  const generateGrowthData = () => {
    if (!selectedDepartment) return [];
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const baseValue = selectedDepartment.totalReports;
    
    return months.map((month, index) => ({
      month,
      value: Math.floor(baseValue * (1 + (index * 0.05))) // 5% growth each month
    }));
  };

  const options = useMemo(() => {
    if (!selectedDepartment) {
      return {
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
      };
    }

    const growthData = generateGrowthData();
    
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
          data: generateDepartmentData(),
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
            color: selectedDepartment.color
          },
          itemStyle: {
            color: selectedDepartment.color,
            borderWidth: 2,
            borderColor: '#1A1F2C'
          },
          areaStyle: {
            opacity: 0.2,
            color: selectedDepartment.color
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
  }, [selectedDepartment, departments]);

  return (
    <div className="glass-card">
      <ReactECharts
        option={options}
        style={{ height: '600px', width: '100%' }}
        onEvents={{
          click: (params) => {
            if (!selectedDepartment && params.data?.id) {
              navigate(`/detail/${params.data.id}`);
            }
          }
        }}
      />
    </div>
  );
};

export default DepartmentChart;
