import React from 'react';
import { BusinessCaseData, BenefitCalculation } from '../lib/data';

// Use global XLSX from CDN
declare const XLSX: any;

interface ExcelExportProps {
  data: BusinessCaseData;
  benefits: BenefitCalculation;
  showCorporateView: boolean;
}

const ExcelExport: React.FC<ExcelExportProps> = ({ data, benefits }) => {
  const handleExport = () => {
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Executive Summary Sheet
    const executiveSummaryData = [
      ['The Joint Chiropractic - Front Office ROI Analysis', null, null, null],
      ['Complete Business Case Data (Both Views)', null, null, null],
      [null, null, null, null],
      ['Executive Summary', null, null, null],
      ['Category', 'Corporate View', 'System-Wide View', 'Notes'],
      ['Annual Benefits', 
        `$${benefits.corporateAnnualBenefits.toLocaleString()}`,
        `$${benefits.totalAnnualBenefits.toLocaleString()}`,
        'Total annual recurring benefits'
      ],
      ['Implementation Cost',
        `$${data.implementationCost.toLocaleString()}`,
        `$${data.implementationCost.toLocaleString()}`,
        'One-time implementation cost'
      ],
      ['Payback Period',
        `${benefits.corporatePaybackPeriodMonths.toFixed(1)} months`,
        `${benefits.paybackPeriodMonths.toFixed(1)} months`,
        'Time to break even'
      ],
      ['First Year ROI',
        `${benefits.corporateFirstYearROI.toFixed(1)}%`,
        `${benefits.firstYearROI.toFixed(1)}%`,
        'Return on investment in year 1'
      ],
      ['5-Year ROI',
        `${benefits.corporateFiveYearROI.toFixed(1)}%`,
        `${benefits.fiveYearROI.toFixed(1)}%`,
        'Cumulative 5-year return'
      ]
    ];
    
    // Corporate View Sheet
    const corporateViewData = [
      ['Corporate View Analysis', null, null],
      ['Benefit Category', 'Annual Value', 'Calculation Method'],
      ['Royalties from Revenue Improvements',
        `$${benefits.corporateRoyaltyRevenue.toLocaleString()}`,
        `${data.corporateRoyaltyPercent}% of franchise revenue improvements`
      ],
      ['Marketing Fund Contribution',
        `$${(benefits.corporateRoyaltyRevenue * (data.corporateNMFPercent / data.corporateRoyaltyPercent)).toLocaleString()}`,
        `${data.corporateNMFPercent}% of franchise revenue improvements`
      ],
      ['Corporate Time Savings',
        `$${benefits.corporateTimeSavingsValue.toLocaleString()}`,
        'Direct savings from corporate operations'
      ],
      ['Corporate Revenue Recovery',
        `$${benefits.corporateRevenueLeakageRecovery.toLocaleString()}`,
        'Direct revenue recovery from corporate operations'
      ],
      ['Corporate Retention Improvement',
        `$${benefits.corporateRetentionImprovementValue.toLocaleString()}`,
        'Direct retention benefits from corporate operations'
      ],
      ['IT Cost Reduction',
        `$${benefits.itCostReduction.toLocaleString()}`,
        '100% of IT cost reduction'
      ],
      [null, null, null],
      ['Implementation Details', null, null],
      ['Cost Category', 'Value', 'Notes'],
      ['Total Implementation Cost',
        `$${data.implementationCost.toLocaleString()}`,
        'ASC 350-40 compliant capitalization'
      ],
      ['Annual Maintenance',
        `$${(data.implementationCost * 0.2).toLocaleString()}`,
        'Estimated at 20% of implementation cost'
      ]
    ];
    
    // System-Wide View Sheet
    const systemWideViewData = [
      ['System-Wide Analysis', null, null],
      ['Network Statistics', null, null],
      ['Total Clinics', data.clinicCount, 'Current clinic count'],
      ['Average Daily Visits', data.averageVisitsPerDay, 'Per clinic'],
      [null, null, null],
      ['Operational Improvements', 'Impact', 'Notes'],
      ['System Refresh Time',
        `${data.refreshReductionPercent}% reduction`,
        'Reduction in system refresh delays'
      ],
      ['Extra Process Steps',
        `${data.extraStepsReductionPercent}% reduction`,
        'Reduction in unnecessary steps'
      ],
      ['Revenue Leakage',
        `${data.revenueLeakageReductionPercent}% reduction`,
        'Reduction in payment processing issues'
      ],
      ['Patient Retention',
        `${data.retentionImprovementPercent}% improvement`,
        'Increase in patient retention rate'
      ],
      ['IT Costs',
        `${data.itCostReductionPercent}% reduction`,
        'Reduction in IT support costs'
      ],
      [null, null, null],
      ['Financial Impact', 'Annual Value', 'Notes'],
      ['Time Savings Value',
        `$${benefits.timeSavingsValue.toLocaleString()}`,
        'Value of staff time savings'
      ],
      ['Revenue Recovery',
        `$${benefits.revenueLeakageRecovery.toLocaleString()}`,
        'Recovered revenue from reduced leakage'
      ],
      ['Retention Value',
        `$${benefits.retentionImprovementValue.toLocaleString()}`,
        'Value of improved patient retention'
      ]
    ];
    
    // Technical Details Sheet
    const technicalDetailsData = [
      ['Technical Implementation Details', null, null],
      ['Category', 'Metric', 'Impact'],
      ['Architecture', 'Microservices', 'Improved scalability and maintenance'],
      ['Integration', 'API-First Design', 'Enhanced system interoperability'],
      ['Performance', `${data.refreshReductionPercent}% faster`, 'System response time improvement'],
      ['Security', 'Enhanced Controls', 'Improved data protection'],
      ['Compliance', 'ASC 350-40', 'Capitalization requirements met'],
      [null, null, null],
      ['Implementation Timeline', null, null],
      ['Phase', 'Duration', 'Key Activities'],
      ['Planning', '2 months', 'Requirements and design'],
      ['Development', '4 months', 'Core functionality'],
      ['Testing', '2 months', 'QA and UAT'],
      ['Deployment', '2 months', 'Phased rollout'],
      ['Stabilization', '2 months', 'Monitoring and optimization']
    ];

    // Add sheets to workbook
    const sheets = [
      { name: 'Executive Summary', data: executiveSummaryData },
      { name: 'Corporate View', data: corporateViewData },
      { name: 'System-Wide View', data: systemWideViewData },
      { name: 'Technical Details', data: technicalDetailsData }
    ];

    sheets.forEach(sheet => {
      const ws = XLSX.utils.aoa_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(wb, ws, sheet.name);
    });

    // Export workbook
    XLSX.writeFile(wb, 'TheJoint_ROI_Analysis.xlsx');
  };

  return (
    <button
      onClick={handleExport}
      className="primary-button flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>Export to Excel</span>
    </button>
  );
};

export default ExcelExport;
