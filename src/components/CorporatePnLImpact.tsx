import React from 'react';

interface CorporatePnLImpactProps {
  benefits: {
    corporateRoyaltyRevenue: number;
    itCostReduction: number;
    corporateAnnualBenefits: number;
    implementationCost: number;
  };
  showCorporateView: boolean;
}

const CorporatePnLImpact: React.FC<CorporatePnLImpactProps> = ({ benefits, showCorporateView }) => {
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  
  // Calculate 5-year impact
  const year1NetImpact = benefits.corporateAnnualBenefits - benefits.implementationCost;
  const year2to5NetImpact = benefits.corporateAnnualBenefits;
  
  const year1Cumulative = year1NetImpact;
  const year2Cumulative = year1Cumulative + year2to5NetImpact;
  const year3Cumulative = year2Cumulative + year2to5NetImpact;
  const year4Cumulative = year3Cumulative + year2to5NetImpact;
  const year5Cumulative = year4Cumulative + year2to5NetImpact;
  
  return (
    <div className={`mb-6 ${!showCorporateView ? 'opacity-75' : ''}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <p className="text-gray-700">
            This section shows the direct financial impact on The Joint's corporate P&L as an independent business entity, separate from franchise operations. All implementation costs are borne by corporate, while benefits include royalties from franchise improvements and direct IT cost savings.
          </p>
          
          {!showCorporateView && (
            <div className="bg-yellow-50 p-3 rounded-md mt-3 border-l-4 border-yellow-400">
              <p className="text-sm">Switch to Corporate View to see detailed P&L impact</p>
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#38003C] text-white">
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-right">Royalty Revenue<br/>Impact</th>
                <th className="py-3 px-4 text-right">IT Cost<br/>Savings</th>
                <th className="py-3 px-4 text-right">Implementation<br/>Cost</th>
                <th className="py-3 px-4 text-right">Net Annual<br/>Impact</th>
                <th className="py-3 px-4 text-right">Cumulative<br/>Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Year 1</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                <td className="py-3 px-4 text-right text-red-600">({formatCurrency(benefits.implementationCost)})</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year1NetImpact)}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year1Cumulative)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Year 2</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                <td className="py-3 px-4 text-right">$0</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year2to5NetImpact)}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year2Cumulative)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Year 3</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                <td className="py-3 px-4 text-right">$0</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year2to5NetImpact)}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year3Cumulative)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Year 4</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                <td className="py-3 px-4 text-right">$0</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year2to5NetImpact)}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year4Cumulative)}</td>
              </tr>
              <tr>
                <td className="py-3 px-4">Year 5</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.corporateRoyaltyRevenue)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(benefits.itCostReduction)}</td>
                <td className="py-3 px-4 text-right">$0</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year2to5NetImpact)}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(year5Cumulative)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CorporatePnLImpact;
