import React, { useMemo } from 'react';
import { BusinessCaseData } from '../lib/data';

interface MetricsComparisonProps {
  data: BusinessCaseData;
}

const MetricsComparison: React.FC<MetricsComparisonProps> = ({ data }) => {
  // Format currency for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${Math.round(value / 1000)}K`;
    return `$${Math.round(value)}`;
  };

  // Calculate future state values - using useMemo for proper reactivity
  const metrics = useMemo(() => [
    {
      category: 'Global Parameters',
      items: [
        {
          name: 'Number of Clinics',
          baseline: `${data.clinicCount}`,
          futureState: `${Math.round(data.clinicCount * (1 + data.clinicCountChange / 100))}`,
          change: data.clinicCountChange !== 0 ? `${data.clinicCountChange > 0 ? '+' : ''}${data.clinicCountChange}%` : '—',
          positive: data.clinicCountChange >= 0
        },
        {
          name: 'Monthly Leads/Clinic',
          baseline: `${data.monthlyLeadsPerClinic}`,
          futureState: `${Math.round(data.monthlyLeadsPerClinic * (1 + data.monthlyLeadsChange / 100))}`,
          change: data.monthlyLeadsChange !== 0 ? `${data.monthlyLeadsChange > 0 ? '+' : ''}${data.monthlyLeadsChange}%` : '—',
          positive: data.monthlyLeadsChange >= 0
        },
        {
          name: 'Average Clinic Revenue',
          baseline: formatCurrency(data.averageClinicRevenue),
          futureState: formatCurrency(data.averageClinicRevenue * (1 + data.averageClinicRevenueChange / 100)),
          change: data.averageClinicRevenueChange !== 0 ? `${data.averageClinicRevenueChange > 0 ? '+' : ''}${data.averageClinicRevenueChange}%` : '—',
          positive: data.averageClinicRevenueChange >= 0
        },
        {
          name: 'Wellness Plan Price',
          baseline: `$${data.wellnessPlanPrice}/mo`,
          futureState: `$${Math.round(data.wellnessPlanPrice * (1 + data.wellnessPlanPriceChange / 100))}/mo`,
          change: data.wellnessPlanPriceChange !== 0 ? `${data.wellnessPlanPriceChange > 0 ? '+' : ''}${data.wellnessPlanPriceChange}%` : '—',
          positive: data.wellnessPlanPriceChange >= 0
        },
        {
          name: 'Patient LTV (months)',
          baseline: `${data.averagePatientLTVMonths}`,
          futureState: `${Math.round(data.averagePatientLTVMonths * (1 + data.patientLTVChange / 100))}`,
          change: data.patientLTVChange !== 0 ? `${data.patientLTVChange > 0 ? '+' : ''}${data.patientLTVChange}%` : '—',
          positive: data.patientLTVChange >= 0
        }
      ]
    },
    {
      category: '1. Lead Identification',
      items: [
        {
          name: 'Cost Per Lead',
          baseline: `$${data.costPerLead}`,
          futureState: `$${(data.costPerLead * (1 - data.costPerLeadReductionPercent / 100)).toFixed(2)}`,
          change: data.costPerLeadReductionPercent !== 0 ? `-${data.costPerLeadReductionPercent}%` : '—',
          positive: data.costPerLeadReductionPercent >= 0
        }
      ]
    },
    {
      category: '2. Lead → Patient Conversion',
      items: [
        {
          name: 'Booking Rate',
          baseline: `${data.leadToAppointmentRate}%`,
          futureState: `${data.leadToAppointmentRate + data.appointmentRateImprovement}%`,
          change: data.appointmentRateImprovement !== 0 ? `+${data.appointmentRateImprovement} pts` : '—',
          positive: data.appointmentRateImprovement >= 0
        },
        {
          name: 'Show Rate',
          baseline: `${data.appointmentShowRate}%`,
          futureState: `${data.appointmentShowRate + data.showRateImprovement}%`,
          change: data.showRateImprovement !== 0 ? `+${data.showRateImprovement} pts` : '—',
          positive: data.showRateImprovement >= 0
        },
        {
          name: 'Effective Conversion',
          baseline: `${Math.round(data.leadToAppointmentRate * data.appointmentShowRate / 100)}%`,
          futureState: `${Math.round((data.leadToAppointmentRate + data.appointmentRateImprovement) * (data.appointmentShowRate + data.showRateImprovement) / 100)}%`,
          change: `+${Math.round((data.leadToAppointmentRate + data.appointmentRateImprovement) * (data.appointmentShowRate + data.showRateImprovement) / 100) - Math.round(data.leadToAppointmentRate * data.appointmentShowRate / 100)} pts`,
          positive: true
        }
      ]
    },
    {
      category: '3. Patient Retention',
      items: [
        {
          name: 'Plan Conversion Rate',
          baseline: `${data.planConversionRate}%`,
          futureState: `${data.planConversionRate + data.planConversionImprovement}%`,
          change: data.planConversionImprovement !== 0 ? `+${data.planConversionImprovement} pts` : '—',
          positive: data.planConversionImprovement >= 0
        },
        {
          name: 'Retention Rate',
          baseline: `${data.currentRetentionRate}%`,
          futureState: `${data.currentRetentionRate + data.retentionImprovementPercent}%`,
          change: data.retentionImprovementPercent !== 0 ? `+${data.retentionImprovementPercent} pts` : '—',
          positive: data.retentionImprovementPercent >= 0
        }
      ]
    },
    {
      category: '4. Clinic Operations',
      items: [
        {
          name: 'System Time / Day',
          baseline: `${data.currentSystemTimeMinutes} min`,
          futureState: `${Math.round(data.currentSystemTimeMinutes * (1 - data.timeReductionPercent / 100))} min`,
          change: data.timeReductionPercent !== 0 ? `-${data.timeReductionPercent}%` : '—',
          positive: data.timeReductionPercent >= 0
        },
        {
          name: 'Revenue Leakage',
          baseline: `${data.currentRevenueLeakagePercent}%`,
          futureState: `${(data.currentRevenueLeakagePercent * (1 - data.revenueLeakageReductionPercent / 100)).toFixed(2)}%`,
          change: data.revenueLeakageReductionPercent !== 0 ? `-${data.revenueLeakageReductionPercent}%` : '—',
          positive: data.revenueLeakageReductionPercent >= 0
        },
        {
          name: 'Annual IT Costs',
          baseline: formatCurrency(data.currentAnnualITCosts),
          futureState: formatCurrency(data.currentAnnualITCosts * (1 - data.itCostReductionPercent / 100)),
          change: data.itCostReductionPercent !== 0 ? `-${data.itCostReductionPercent}%` : '—',
          positive: data.itCostReductionPercent >= 0
        }
      ]
    }
  ], [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Baseline vs Future State</h2>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Impact of Changes</span>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Metric</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600 text-sm bg-gray-50">
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  Baseline (Today)
                </span>
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600 text-sm bg-green-50">
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Future State
                </span>
              </th>
              <th className="text-center py-3 px-4 font-semibold text-gray-600 text-sm">Change</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((category, catIndex) => (
              <React.Fragment key={catIndex}>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="py-2 px-4 font-semibold text-gray-700 text-sm">
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => (
                  <tr key={`${catIndex}-${itemIndex}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{item.name}</td>
                    <td className="py-3 px-4 text-center bg-gray-50">
                      <span className="text-sm font-medium text-gray-600">{item.baseline}</span>
                    </td>
                    <td className="py-3 px-4 text-center bg-green-50">
                      <span className="text-sm font-bold text-green-700">{item.futureState}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        item.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Summary Impact</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-blue-600">Effective Lead Conversion</div>
            <div className="text-lg font-bold text-blue-800">
              {Math.round(data.leadToAppointmentRate * data.appointmentShowRate / 100)}% → {Math.round((data.leadToAppointmentRate + data.appointmentRateImprovement) * (data.appointmentShowRate + data.showRateImprovement) / 100)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-blue-600">Patient Retention</div>
            <div className="text-lg font-bold text-blue-800">
              {data.currentRetentionRate}% → {data.currentRetentionRate + data.retentionImprovementPercent}%
            </div>
          </div>
          <div>
            <div className="text-xs text-blue-600">Time per Day Saved</div>
            <div className="text-lg font-bold text-blue-800">
              {Math.round(data.currentSystemTimeMinutes * data.timeReductionPercent / 100)} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsComparison;
