
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate, useParams } from 'react-router-dom';
import { DepartmentChartProps } from '@/types/department';
import { useMainChartOptions } from './charts/useMainChartOptions';
import { useDetailChartOptions } from './charts/useDetailChartOptions';

const DepartmentChart = ({ departments }: DepartmentChartProps) => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const selectedDepartment = departments.find(dept => dept.id === departmentId);

  const mainOptions = useMainChartOptions(departments);
  const detailOptions = selectedDepartment ? useDetailChartOptions(selectedDepartment) : null;

  const options = selectedDepartment ? detailOptions : mainOptions;

  return (
    <div className="glass-card">
      <ReactECharts
        option={options}
        style={{ height: '600px', width: '100%' }}
        onEvents={{
          click: (params) => {
            if (!selectedDepartment && params.data?.id) {
              navigate(`/department/${params.data.id}`);
            }
          }
        }}
      />
    </div>
  );
};

export default DepartmentChart;
