import React from 'react';
import { YearlyProjection } from '../lib/data';
import { formatCurrencyFull } from '@/utils/formatters';

interface FiveYearProjectionProps {
  projections: YearlyProjection[];
  showCorporateView: boolean;
}

const FiveYearProjection: React.FC<FiveYearProjectionProps> = ({ projections, showCorporateView }) => {
  if (!projections || !Array.isArray(projections) || projections.length === 0) {
    return null;
  }

  // Safety check for projection data
  const safeProjections = projections.filter(p => 
    p && typeof p.year === 'number' && typeof p.clinicCount === 'number'
  );

  if (safeProjections.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-blueberry mb-2">5-Year Financial Projection</h2>
        <p className="text-sm text-gray-600">
          {showCorporateView 
            ? "Corporate P&L impact over 5 years (2026-2030) with dynamic clinic growth and recurring OpEx"
            : "System-wide benefits over 5 years with projected clinic growth"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#38003C] to-[#4A0072] text-white">
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-right font-semibold">Clinics</th>
              <th className="py-3 px-4 text-right font-semibold">Annual Benefits</th>
              <th className="py-3 px-4 text-right font-semibold">Recurring OpEx</th>
              <th className="py-3 px-4 text-right font-semibold">Net Benefit</th>
              <th className="py-3 px-4 text-right font-semibold">Cumulative</th>
            </tr>
          </thead>
          <tbody>
            {safeProjections.map((projection, index) => (
              <tr 
                key={projection.year}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors`}
              >
                <td className="py-3 px-4 font-medium text-gray-900">{projection.year}</td>
                <td className="py-3 px-4 text-right text-gray-700">{projection.clinicCount.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-green-700 font-medium">
                  ${formatCurrencyFull(projection.benefits)}
                </td>
                <td className="py-3 px-4 text-right text-red-600">
                  (${formatCurrencyFull(projection.recurringExpenses)})
                </td>
                <td className="py-3 px-4 text-right text-blue-700 font-semibold">
                  ${formatCurrencyFull(projection.netBenefit)}
                </td>
                <td className="py-3 px-4 text-right text-purple-700 font-bold">
                  ${formatCurrencyFull(projection.cumulativeBenefit)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-purple-100 to-blue-100 border-t-2 border-purple-300">
              <td className="py-3 px-4 font-bold text-gray-900" colSpan={2}>5-Year Totals</td>
              <td className="py-3 px-4 text-right font-bold text-green-700">
                ${formatCurrencyFull(safeProjections.reduce((sum, p) => sum + (p.benefits || 0), 0))}
              </td>
              <td className="py-3 px-4 text-right font-bold text-red-600">
                (${formatCurrencyFull(safeProjections.reduce((sum, p) => sum + (p.recurringExpenses || 0), 0))})
              </td>
              <td className="py-3 px-4 text-right font-bold text-blue-700">
                ${formatCurrencyFull(safeProjections.reduce((sum, p) => sum + (p.netBenefit || 0), 0))}
              </td>
              <td className="py-3 px-4 text-right font-bold text-purple-700 text-lg">
                ${formatCurrencyFull(safeProjections[safeProjections.length - 1]?.cumulativeBenefit || 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Projection Assumptions:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Clinic growth based on historical trends and projections</li>
              <li>Recurring OpEx increases 3% annually due to inflation</li>
              <li>Benefits scale with clinic count increases</li>
              <li>{showCorporateView ? "Corporate view shows net royalty after RD cost allocation" : "System-wide view includes all franchise and corporate benefits"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveYearProjection;
