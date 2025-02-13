
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';
import QuarterSelector from '../components/QuarterSelector';
import { departmentData } from '../data/departmentDetailData';
import { useEmployeeBarChart } from '../hooks/useEmployeeBarChart';
import { useRolePieChart } from '../hooks/useRolePieChart';
import { useGrowthLineChart } from '../hooks/useGrowthLineChart';

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const barChartOptions = useEmployeeBarChart(departmentData.employeesByRegion);
  const pieChartOptions = useRolePieChart(departmentData.employeesByRole);
  const lineChartOptions = useGrowthLineChart(departmentData.monthlyGrowth);

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/detail')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Department
        </button>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Department Dashboard</h1>
          <div className="mt-4">
            <QuarterSelector />
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
