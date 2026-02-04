import React from 'react';

interface CorporatePnLImpactProps {
  benefits: {
    corporateRoyaltyRevenue: number;
    itCostReduction: number;
    corporateAnnualBenefits: number;
    implementationCost: number;
    // Phase 1: Enhanced revenue breakdown
    grossRoyaltyRevenue?: number;
    rdCostOfRevenue?: number;
    netRoyaltyRevenue?: number;
    merchantFeesRevenue?: number;
    nmfFees?: number;
  };
  showCorporateView: boolean;
}

const CorporatePnLImpact: React.FC<CorporatePnLImpactProps> = ({ benefits, showCorporateView }) => {
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  
  // GAAP: Amortize implementation cost over 5 years (straight-line)
  const usefulLifeYears = 5;
  const annualAmortization = benefits.implementationCost / usefulLifeYears;

  // Calculate 5-year impact with amortization
  const yearNetImpact = Array.from({ length: usefulLifeYears }, () =>
    benefits.corporateAnnualBenefits - annualAmortization
  );
  const yearCumulative = yearNetImpact.reduce((acc, val, idx) => {
    acc.push((acc[idx - 1] || 0) + val);
    return acc;
  }, [] as number[]);
  
  return (
    <div className={`mb-6 ${!showCorporateView ? 'opacity-75' : ''}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <p className="text-gray-700">
            This section shows the direct financial impact on The Joint's corporate P&L as an independent business entity, separate from franchise operations. All implementation costs are borne by corporate, while benefits include royalties from franchise improvements and direct IT cost savings. Following GAAP accounting principles, the implementation cost is depreciated over 5 years using straight-line amortization.
          </p>
          
          {!showCorporateView && (
            <div className="bg-yellow-50 p-3 rounded-md mt-3 border-l-4 border-yellow-400">
              <p className="text-sm">Switch to Corporate View to see detailed P&L impact</p>
            </div>
          )}
        </div>

        {/* Phase 1: Revenue Breakdown with RD Cost Allocation */}
        {showCorporateView && benefits.grossRoyaltyRevenue !== undefined && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Corporate Revenue Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Gross Royalty Revenue (from franchise improvements)</span>
                <span className="font-medium">{formatCurrency(benefits.grossRoyaltyRevenue)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span className="pl-4">Less: Regional Developer Cost of Revenue (25%)</span>
                <span className="font-medium">({formatCurrency(benefits.rdCostOfRevenue || 0)})</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-gray-900">Net Royalty Revenue</span>
                <span className="font-semibold">{formatCurrency(benefits.netRoyaltyRevenue || 0)}</span>
              </div>
              {benefits.merchantFeesRevenue && benefits.merchantFeesRevenue > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span className="pl-4">Plus: Merchant Fees Revenue (0.3%)</span>
                  <span>{formatCurrency(benefits.merchantFeesRevenue)}</span>
                </div>
              )}
              {benefits.nmfFees && benefits.nmfFees > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span className="pl-4">Plus: NMF Fees (2% pass-through)</span>
                  <span>{formatCurrency(benefits.nmfFees)}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#38003C] text-white">
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-right">Royalty Revenue<br/>Impact</th>
                <th className="py-3 px-4 text-right">IT Cost<br/>Savings</th>
                <th className="py-3 px-4 text-right">Amortization<br/>Expense</th>
                <th className="py-3 px-4 text-right">Net Annual<br/>Impact</th>
                <th className="py-3 px-4 text-right">Cumulative<br/>Impact</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: usefulLifeYears }, (_, i) => (
                <tr className="border-b" key={i}>
                  <td className="py-3 px-4">Year {i + 1}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                  <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                  <td className="py-3 px-4 text-right text-red-600">({formatCurrency(annualAmortization)})</td>
                  <td className="py-3 px-4 text-right font-medium">{formatCurrency(yearNetImpact[i])}</td>
                  <td className="py-3 px-4 text-right font-medium">{formatCurrency(yearCumulative[i])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CorporatePnLImpact;
