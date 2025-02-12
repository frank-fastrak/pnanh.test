
import React from 'react';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';
import ParticleChart from '../components/ParticleChart';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1F2C] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Whole Company</h1>
          <p className="text-gray-400">CEO Dashboard</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ParticleChart />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <MetricCard label="Total Headcount" value="15,639" />
              <MetricCard label="Total Payroll" value="$650M" />
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-bold mb-2">15,639</h3>
                <p className="text-gray-400">Total Headcount</p>
                <div className="mt-4">
                  <ProgressBar 
                    percentage={100}
                    label="Full-Time"
                    value="15,639 (86%)"
                  />
                  <ProgressBar 
                    percentage={14}
                    label="Contractors"
                    value="2,510 (14%)"
                  />
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-4xl font-bold mb-2">$650M</h3>
                <p className="text-gray-400">Total Payroll</p>
                <div className="mt-4">
                  <ProgressBar 
                    percentage={100}
                    label="Direct Reports"
                    value="8"
                  />
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/detail')}
                className="flex items-center justify-center w-full py-3 mt-4 glass-card hover:bg-white/5 transition-colors"
              >
                <span className="mr-2">View Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
