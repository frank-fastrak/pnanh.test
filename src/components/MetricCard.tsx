
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  className?: string;
}

const MetricCard = ({ label, value, className = '' }: MetricCardProps) => {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </div>
  );
};

export default MetricCard;
