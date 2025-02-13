
import React from 'react';

const QuarterSelector = () => {
  return (
    <div className="flex justify-between items-center">
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
  );
};

export default QuarterSelector;
