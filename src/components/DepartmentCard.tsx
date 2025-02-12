
import React from 'react';

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

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center mb-4">
        <div 
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-medium"
          style={{ backgroundColor: department.color }}
        >
          {department.id}
        </div>
        <h3 className="ml-3 text-lg font-semibold">{department.name}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-2xl font-bold">{department.totalReports.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Reports</div>
        </div>
        <div>
          <div className="text-2xl font-bold">${department.totalPayroll}</div>
          <div className="text-sm text-gray-400">Total Payroll</div>
        </div>
      </div>
      
      <div className="text-sm text-gray-400">{department.chiefTitle}</div>
      <div className="font-medium">{department.chiefOfficer}</div>
      
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-400">Direct Reports</span>
        <span>{department.directReports}</span>
      </div>
    </div>
  );
};

export default DepartmentCard;
