import React from 'react';
import { BusinessCaseData } from '../lib/data';

interface ResearchGuidanceProps {
  data: BusinessCaseData;
}

const ResearchGuidance: React.FC<ResearchGuidanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Research-Based Guidance</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Survey Findings</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-[#3A0A3A] pl-4">
              <p className="font-medium">System Refresh Issues</p>
              <p className="text-sm text-gray-600">76.3% of staff report refreshing the system "constantly" or "frequently" (Q34)</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.refreshMinutesSavedPerDay >= 45 ? 'Optimal' : data.refreshMinutesSavedPerDay >= 30 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#3A0A3A] pl-4">
              <p className="font-medium">Workaround Issues</p>
              <p className="text-sm text-gray-600">68.4% describe the Front Office as having "a lot of inefficiencies, but I've learned workarounds" (Q6)</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.workaroundMinutesSavedPerDay >= 15 ? 'Optimal' : data.workaroundMinutesSavedPerDay >= 10 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#3A0A3A] pl-4">
              <p className="font-medium">Extra Steps Issues</p>
              <p className="text-sm text-gray-600">52.6% describe patient search as "Takes Extra Steps" (Q9), 62.8% selected "Too many steps & dropdowns" for checkout (Q19)</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.extraStepsSavedPerVisit >= 1 ? 'Optimal' : data.extraStepsSavedPerVisit >= 0.5 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#3A0A3A] pl-4">
              <p className="font-medium">Payment Processing Issues</p>
              <p className="text-sm text-gray-600">53.4% reported payment processing failures in the past week (Q32), 38.6% experienced double charges or incorrect charges (Q20)</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.revenueLeakageReductionPercent >= 50 ? 'Optimal' : data.revenueLeakageReductionPercent >= 30 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#3A0A3A] pl-4">
              <p className="font-medium">Patient Retention</p>
              <p className="text-sm text-gray-600">Wellness plan retention dropping from 70% to 64% (conference data)</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.retentionImprovementPercent >= 6 ? 'Optimal' : data.retentionImprovementPercent >= 3 ? 'Good' : 'Consider increasing'}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Industry Research</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-[#1D7D63] pl-4">
              <p className="font-medium">McKinsey & Company</p>
              <p className="text-sm text-gray-600">"Organizations implementing microservices architecture have reported up to a 30% reduction in IT costs through optimized resource utilization, reduced maintenance overhead, and independent service scaling."</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.itCostReductionPercent >= 25 ? 'Optimal' : data.itCostReductionPercent >= 15 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#1D7D63] pl-4">
              <p className="font-medium">Gartner</p>
              <p className="text-sm text-gray-600">"By 2025, 80% of digital businesses will adopt a composable architecture approach, resulting in improved application delivery by 80% and faster business value realization."</p>
            </div>
            
            <div className="border-l-4 border-[#1D7D63] pl-4">
              <p className="font-medium">Forrester</p>
              <p className="text-sm text-gray-600">"Healthcare organizations that modernize legacy systems through microservices architecture report 40% faster development cycles and 25-35% reduction in operational costs."</p>
              <p className="text-sm text-gray-600 mt-1">Recommended setting: {data.downtimeReductionPercent >= 40 ? 'Optimal' : data.downtimeReductionPercent >= 25 ? 'Good' : 'Consider increasing'}</p>
            </div>
            
            <div className="border-l-4 border-[#1D7D63] pl-4">
              <p className="font-medium">Market Growth</p>
              <p className="text-sm text-gray-600">The global microservices architecture market is projected to reach $15.97 billion by 2029, growing at a CAGR of 21% from 2022 to 2029.</p>
            </div>
            
            <div className="border-l-4 border-[#1D7D63] pl-4">
              <p className="font-medium">Implementation Cost Benchmark</p>
              <p className="text-sm text-gray-600">Industry average for similar healthcare software modernization projects ranges from $250,000 to $500,000.</p>
              <p className="text-sm text-gray-600 mt-1">Your setting: {data.implementationCost <= 350000 ? 'Competitive' : data.implementationCost <= 450000 ? 'Average' : 'Above average'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchGuidance;
