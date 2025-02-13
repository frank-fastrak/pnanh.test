
export interface Department {
  id: string;
  name: string;
  totalReports: number;
  totalPayroll: string;
  chiefOfficer: string;
  chiefTitle: string;
  directReports: number;
  color: string;
}

export interface DepartmentChartProps {
  departments: Department[];
}

export interface DepartmentData {
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
}

export interface GrowthData {
  month: string;
  value: number;
}
