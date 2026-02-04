import React from 'react';
import { SectionBenefits } from '../lib/data';

interface BenefitsBreakdownProps {
  // New customer journey structure
  sectionBenefits?: SectionBenefits;
  // Legacy props for backward compatibility
  timeSavingsValue: number;
  revenueLeakageRecovery: number;
  retentionImprovementValue: number;
  itCostReduction: number;
  totalBenefits: number;
  showCorporateView: boolean;
  // Optional: Lead conversion value
  leadConversionValue?: number;
  marketingSavingsValue?: number;
}

const BenefitsBreakdown: React.FC<BenefitsBreakdownProps> = ({
  sectionBenefits,
  timeSavingsValue,
  revenueLeakageRecovery,
  retentionImprovementValue,
  itCostReduction,
  totalBenefits,
  showCorporateView,
  leadConversionValue = 0,
  marketingSavingsValue = 0
}) => {
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  
  const calculatePercentage = (value: number) => {
    if (totalBenefits === 0) return '0%';
    return ((value / totalBenefits) * 100).toFixed(1) + '%';
  };

  // Use new sectionBenefits if available, otherwise use the computed legacy values
  const benefits = sectionBenefits ? {
    acquisition: sectionBenefits.acquisitionBenefit,
    conversion: sectionBenefits.conversionBenefit,
    retention: sectionBenefits.retentionBenefit,
    operations: sectionBenefits.operationsBenefit
  } : {
    acquisition: marketingSavingsValue,
    conversion: leadConversionValue,
    retention: retentionImprovementValue,
    operations: timeSavingsValue + revenueLeakageRecovery + itCostReduction
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
          <p className="text-grey text-sm">Annual value by customer journey stage</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* 1. Lead Identification (Acquisition) */}
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="font-medium text-blueberry">1. Lead Identification</span>
            </div>
            <span className="font-medium text-purple-600">{formatCurrency(benefits.acquisition)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(benefits.acquisition) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate share of marketing cost savings through royalties" 
              : "Marketing cost savings from improved lead quality and reduced cost per lead"}
          </p>
        </div>

        {/* 2. Lead → Patient Conversion */}
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="font-medium text-blueberry">2. Lead → Patient Conversion</span>
            </div>
            <span className="font-medium text-blue-600">{formatCurrency(benefits.conversion)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(benefits.conversion) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate receives royalties on revenue from improved booking and show rates" 
              : "Revenue from higher booking rate and show rate converting more leads to patients"}
          </p>
        </div>
        
        {/* 3. Patient Retention */}
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="font-medium text-blueberry">3. Patient Retention</span>
            </div>
            <span className="font-medium text-green-600">{formatCurrency(benefits.retention)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(benefits.retention) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Corporate receives royalties on increased plan conversion and retention revenue" 
              : "Value from improved plan conversion rate and higher monthly retention"}
          </p>
        </div>
        
        {/* 4. Clinic Operations */}
        <div className="benefit-item">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="font-medium text-blueberry">4. Clinic Operations</span>
            </div>
            <span className="font-medium text-orange-600">{formatCurrency(benefits.operations)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: calculatePercentage(benefits.operations) }}
            ></div>
          </div>
          <p className="text-sm text-grey mt-2">
            {showCorporateView 
              ? "Time savings royalties + revenue recovery royalties + 100% IT cost savings" 
              : "Time savings + revenue recovery + IT cost reduction"}
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
