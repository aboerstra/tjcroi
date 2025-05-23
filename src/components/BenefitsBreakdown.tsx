import React from 'react';

interface BenefitsBreakdownProps {
  timeSavingsValue: number;
  revenueLeakageRecovery: number;
  retentionImprovementValue: number;
  itCostReduction: number;
  totalBenefits: number;
  showCorporateView: boolean;
}

const BenefitsBreakdown: React.FC<BenefitsBreakdownProps> = ({
  timeSavingsValue,
  revenueLeakageRecovery,
  retentionImprovementValue,
  itCostReduction,
  totalBenefits,
  showCorporateView
}) => {
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  
  const calculatePercentage = (value: number) => {
    return ((value / totalBenefits) * 100).toFixed(1) + '%';
  };
  
  return (
    <div className="benefits-breakdown bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blueberry">Benefits Breakdown</h2>
          <p className="text-grey text-sm">Annual value by category</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tech-violet mr-2"></div>
              <span className="font-medium text-blueberry">Time Savings</span>
            </div>
            <span className="font-medium text-tech-violet">{formatCurrency(timeSavingsValue)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-tech-violet h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(timeSavingsValue) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate receives " + formatCurrency(timeSavingsValue) + " through royalties on franchise revenue increases" 
              : "Reduced system refreshing, fewer workarounds, and streamlined patient processing"}
          </p>
        </div>
        
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tech-blue mr-2"></div>
              <span className="font-medium text-blueberry">Revenue Recovery</span>
            </div>
            <span className="font-medium text-tech-blue">{formatCurrency(revenueLeakageRecovery)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-tech-blue h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(revenueLeakageRecovery) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate receives " + formatCurrency(revenueLeakageRecovery) + " through royalties on recovered revenue" 
              : "Decreased payment processing errors and reduced revenue leakage"}
          </p>
        </div>
        
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tech-green mr-2"></div>
              <span className="font-medium text-blueberry">Retention Value</span>
            </div>
            <span className="font-medium text-tech-green">{formatCurrency(retentionImprovementValue)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-tech-green h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(retentionImprovementValue) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate receives " + formatCurrency(retentionImprovementValue) + " through royalties on increased retention revenue" 
              : "Improved membership management leading to better wellness plan retention"}
          </p>
        </div>
        
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tech-orange mr-2"></div>
              <span className="font-medium text-blueberry">IT Cost Reduction</span>
            </div>
            <span className="font-medium text-tech-orange">{formatCurrency(itCostReduction)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-tech-orange h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(itCostReduction) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "100% of IT cost savings accrue to corporate" 
              : "IT cost reduction, decreased downtime, and improved system resilience"}
          </p>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-bold text-blueberry">Total Annual Benefits</span>
            <span className="font-bold text-green text-xl">{formatCurrency(totalBenefits)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsBreakdown;
