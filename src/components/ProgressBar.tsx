
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label: string;
  value: string;
}

const ProgressBar = ({ percentage, label, value }: ProgressBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
