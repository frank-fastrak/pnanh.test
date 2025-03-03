
import React from 'react';
import DepartmentChart from '../components/DepartmentChart';
import DepartmentCard from '../components/DepartmentCard';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  
  const departments = [
    {
      id: '01',
      name: 'Revenue',
      totalReports: 9885,
      totalPayroll: '181M',
      chiefOfficer: 'Paul Dickson',
      chiefTitle: 'Chief Revenue Officer',
      directReports: 15,
      color: '#FF9B7B'
    },
    {
      id: '02',
      name: 'Field Operations',
      totalReports: 3777,
      totalPayroll: '324M',
      chiefOfficer: 'Patrick Kent',
      chiefTitle: 'Chief Field Ops Officer',
      directReports: 8,
      color: '#FF7B7B'
    },
    {
      id: '03',
      name: 'Experience',
      totalReports: 3623,
      totalPayroll: '99M',
      chiefOfficer: 'Patrick Kent',
      chiefTitle: 'Chief Field Ops Officer',
      directReports: 8,
      color: '#FF7BE9'
    },
    {
      id: '04',
      name: 'Financial',
      totalReports: 310,
      totalPayroll: '30M',
      chiefOfficer: 'Danny Abajian',
      chiefTitle: 'Chief Financial Officer',
      directReports: 7,
      color: '#DA7BFF'
    },
    {
      id: '05',
      name: 'Legal + People',
      totalReports: 156,
      totalPayroll: '15M',
      chiefOfficer: 'Jeanna Steele',
      chiefTitle: 'Legal + People',
      directReports: 6,
      color: '#B47BFF'
    },
    {
      id: '06',
      name: 'Public Policy',
      totalReports: 10,
      totalPayroll: '1.3M',
      chiefOfficer: 'Amy Heart',
      chiefTitle: 'SVP Public Policy',
      directReports: 7,
      color: '#7B7FFF'
    }
  ];

  // If we have a departmentId, find that department
  const selectedDepartment = departmentId 
    ? departments.find(dept => dept.id === departmentId)
    : null;

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Overview
        </button>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {selectedDepartment ? selectedDepartment.name : 'Level 2'}
          </h1>
          <p className="text-gray-400">
            {selectedDepartment ? 'Department Details' : '6 Departments'}
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DepartmentChart departments={departments} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 content-start">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
