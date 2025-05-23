import React from 'react';
import { formatLargeNumber } from '@/utils/formatters';

interface ROISummaryProps {
  totalAnnualBenefits: number;
  corporateAnnualBenefits: number;
  franchiseAnnualBenefits: number;
  paybackPeriodMonths: number;
  corporatePaybackPeriodMonths: number;
  firstYearROI: number;
  corporateFirstYearROI: number;
  fiveYearROI: number;
  corporateFiveYearROI: number;
  clinicCount: number;
  implementationCost: number;
  showCorporateView: boolean;
  toggleView: () => void;
}

const ROISummary: React.FC<ROISummaryProps> = ({
  totalAnnualBenefits,
  corporateAnnualBenefits,
  franchiseAnnualBenefits,
  paybackPeriodMonths,
  corporatePaybackPeriodMonths,
  firstYearROI,
  corporateFirstYearROI,
  fiveYearROI,
  corporateFiveYearROI,
  clinicCount,
  implementationCost,
  showCorporateView,
  toggleView
}) => {
  const annualBenefits = showCorporateView ? corporateAnnualBenefits : totalAnnualBenefits;
  const paybackPeriod = showCorporateView ? corporatePaybackPeriodMonths : paybackPeriodMonths;
  const firstYearROIValue = showCorporateView ? corporateFirstYearROI : firstYearROI;
  const fiveYearROIValue = showCorporateView ? corporateFiveYearROI : fiveYearROI;

  return (
    <div className="bg-gradient-to-br from-[#38003C] to-[#4A0072] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-700/50 rounded-full p-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">ROI Summary</h2>
            <p className="text-purple-200 text-sm">
              System-wide benefits across all clinics
            </p>
          </div>
        </div>
        <div className="flex items-center bg-purple-800/50 rounded-lg p-1">
          <button
            onClick={toggleView}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !showCorporateView 
                ? 'bg-white text-[#38003C]' 
                : 'text-purple-200 hover:text-white'
            }`}
          >
            Franchise Network
          </button>
          <button
            onClick={toggleView}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              showCorporateView 
                ? 'bg-white text-[#38003C]' 
                : 'text-purple-200 hover:text-white'
            }`}
          >
            Corporate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-purple-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="text-purple-200 font-medium">Annual Benefits</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            ${formatLargeNumber(annualBenefits)}
          </div>
          <div className="h-1 bg-blue-400/30 rounded-full">
            <div className="h-full w-full bg-blue-400 rounded-full" />
          </div>
          <p className="text-sm text-purple-200 mt-2">
            {showCorporateView ? 'Corporate revenue impact' : `Across ${clinicCount} clinics`}
          </p>
        </div>

        <div className="bg-purple-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-purple-200 font-medium">Payback Period</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {paybackPeriod < 1 ? '<1' : paybackPeriod.toFixed(1)} <span className="text-xl">mo</span>
          </div>
          <div className="h-1 bg-emerald-400/30 rounded-full">
            <div className="h-full w-full bg-emerald-400 rounded-full" />
          </div>
          <p className="text-sm text-purple-200 mt-2">Break-even timeline</p>
        </div>

        <div className="bg-purple-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="text-purple-200 font-medium">First Year ROI</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {((annualBenefits - implementationCost) / implementationCost).toFixed(1)} x
          </div>
          <div className="h-1 bg-amber-400/30 rounded-full">
            <div className="h-full w-full bg-amber-400 rounded-full" />
          </div>
          <p className="text-sm text-purple-200 mt-2">12-month return</p>
        </div>

        <div className="bg-purple-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="text-purple-200 font-medium">5-Year ROI</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {((annualBenefits * 5 - implementationCost) / implementationCost).toFixed(1)} x
          </div>
          <div className="h-1 bg-teal-400/30 rounded-full">
            <div className="h-full w-full bg-teal-400 rounded-full" />
          </div>
          <p className="text-sm text-purple-200 mt-2">
            ${formatLargeNumber(annualBenefits * 5)} total
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <h3 className="text-purple-200 font-medium mb-1">Implementation Cost</h3>
          <div className="text-2xl font-bold text-white">
            ${implementationCost.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-purple-200 font-medium mb-1">Clinics Impacted</h3>
          <div className="text-2xl font-bold text-white">
            {clinicCount}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2 text-purple-200 text-sm bg-purple-800/30 p-3 rounded-lg">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>
          System-wide analysis based on {clinicCount} clinics with an implementation cost of ${implementationCost.toLocaleString()}. 
          Benefits include operational efficiencies, revenue recovery, and improved patient retention across the entire network.
        </p>
      </div>
    </div>
  );
};

export default ROISummary;
