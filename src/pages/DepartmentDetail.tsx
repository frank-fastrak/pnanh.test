
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useParams } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';

const DepartmentDetail = () => {
  const { departmentId } = useParams();

  // Mock data - in a real app, this would come from an API
  const departmentData = {
    metrics: {
      totalEmployees: '438K',
      totalPositions: '5615',
      totalBudget: '37K',
      totalProjects: '121K'
    },
    employeesByRegion: [
      { name: 'North Region', value: 2800 },
      { name: 'South Region', value: 2100 },
      { name: 'East Region', value: 1200 },
      { name: 'West Region', value: 800 }
    ],
    employeesByRole: {
      'Senior Manager': 17,
      'Team Lead': 21,
      'Individual Contributor': 63
    },
    monthlyGrowth: [
      { month: 'Jan', value: 9500 },
      { month: 'Feb', value: 8500 },
      { month: 'Mar', value: 8000 },
      { month: 'Apr', value: 4500 },
      { month: 'May', value: -3000 },
      { month: 'Jun', value: 500 },
      { month: 'Jul', value: -2000 },
      { month: 'Aug', value: 2500 },
      { month: 'Sep', value: -1500 },
      { month: 'Oct', value: 3000 },
      { month: 'Nov', value: 9800 },
      { month: 'Dec', value: -2000 }
    ],
    topPerformers: [
      { name: 'Team A', value: 9500 },
      { name: 'Team B', value: 8900 },
      { name: 'Team C', value: 7200 },
      { name: 'Team D', value: 6800 }
    ]
  };

  const barChartOptions = {
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
      data: departmentData.employeesByRegion.map(item => item.name),
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
        data: departmentData.employeesByRegion.map(item => item.value),
        itemStyle: {
          color: '#7B7FFF'
        }
      }
    ]
  };

  const pieChartOptions = {
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
        data: Object.entries(departmentData.employeesByRole).map(([name, value]) => ({
          name,
          value,
          itemStyle: {
            color: name === 'Senior Manager' ? '#FF9B7B' : 
                   name === 'Team Lead' ? '#7B7FFF' : '#B47BFF'
          }
        }))
      }
    ]
  };

  const lineChartOptions = {
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
      data: departmentData.monthlyGrowth.map(item => item.month),
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
        data: departmentData.monthlyGrowth.map(item => item.value),
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
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Department Dashboard</h1>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
                <button
                  key={quarter}
                  className="px-6 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {quarter}
                </button>
              ))}
            </div>
            <select className="bg-white/10 text-white px-4 py-2 rounded-md">
              <option value="all">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Employees"
            value={departmentData.metrics.totalEmployees}
          />
          <MetricCard
            label="Open Positions"
            value={departmentData.metrics.totalPositions}
          />
          <MetricCard
            label="Budget (M)"
            value={departmentData.metrics.totalBudget}
          />
          <MetricCard
            label="Active Projects"
            value={departmentData.metrics.totalProjects}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Employees by Region</h2>
            <ReactECharts option={barChartOptions} style={{ height: '300px' }} />
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Role Distribution</h2>
            <ReactECharts option={pieChartOptions} style={{ height: '300px' }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="glass-card p-6 col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Monthly Growth</h2>
            <ReactECharts option={lineChartOptions} style={{ height: '300px' }} />
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Top Performing Teams</h2>
            <div className="space-y-4">
              {departmentData.topPerformers.map((team) => (
                <ProgressBar
                  key={team.name}
                  label={team.name}
                  value={`${team.value}`}
                  percentage={(team.value / 10000) * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
