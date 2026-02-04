import React from 'react';
import { BusinessCaseData, BenefitCalculation } from '../lib/data';

interface StakeholderViewProps {
  data: BusinessCaseData;
  benefits: BenefitCalculation;
  viewType: 'ceo' | 'cfo' | 'cto';
}

const StakeholderView: React.FC<StakeholderViewProps> = ({ data, benefits, viewType }) => {
  const renderCEOView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Network Impact Overview</h2>
            <p className="text-grey text-sm">System-wide benefits and improvements</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="metric-title">Annual System-Wide Benefits</div>
            <div className="metric-value">${benefits.totalAnnualBenefits.toLocaleString()}</div>
            <div className="text-green text-sm">Across {data.clinicCount} clinics</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Patient Experience Impact</div>
            <div className="metric-value">{data.retentionImprovementPercent}%</div>
            <div className="text-green text-sm">Retention Improvement</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Staff Efficiency Gain</div>
            <div className="metric-value">{data.extraStepsSavedPerVisit} steps</div>
            <div className="text-green text-sm">Process Improvement</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">5-Year ROI</div>
            <div className="metric-value">{benefits.fiveYearROI.toFixed(0)}%</div>
            <div className="text-green text-sm">System-Wide Return</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Strategic Value Drivers</h2>
            <p className="text-grey text-sm">Key business impact areas</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Patient Experience</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Streamlined check-in process
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Reduced wait times
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Improved payment handling
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Enhanced retention rates
              </li>
            </ul>
          </div>
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Franchise Value</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Operational efficiency gains
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Revenue leakage prevention
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Improved staff satisfaction
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Modern technology platform
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCFOView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Financial Controls & Compliance</h2>
            <p className="text-grey text-sm">Key financial metrics and controls</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="metric-title">Implementation Cost</div>
            <div className="metric-value">${data.implementationCost.toLocaleString()}</div>
            <div className="text-green text-sm">ASC 350-40 Compliant</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Revenue Recovery</div>
            <div className="metric-value">{data.revenueLeakageReductionPercent}%</div>
            <div className="text-green text-sm">Leakage Prevention</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Corporate Payback</div>
            <div className="metric-value">{benefits.corporatePaybackPeriodMonths.toFixed(1)} mo</div>
            <div className="text-green text-sm">Break-even Period</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">IT Cost Reduction</div>
            <div className="metric-value">{data.itCostReductionPercent}%</div>
            <div className="text-green text-sm">Annual Savings</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Corporate Benefit Allocation</h2>
            <p className="text-grey text-sm">Revenue streams and risk management</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Revenue Streams</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                {data.corporateRoyaltyPercent}% Royalty Revenue
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                {data.corporateNMFPercent}% Marketing Fund
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                Direct Corporate Benefits
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                IT Cost Savings
              </li>
            </ul>
          </div>
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Risk Management</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                Phased Implementation
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                Compliance Monitoring
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                Audit Trail Support
              </li>
              <li className="flex items-center">
                <span className="text-tech-violet mr-2">•</span>
                Data Security Controls
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCTOView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Technical Performance Metrics</h2>
            <p className="text-grey text-sm">System improvements and efficiency gains</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="metric-card">
            <div className="metric-title">System Refresh</div>
            <div className="metric-value">{data.refreshMinutesSavedPerDay} minutes</div>
            <div className="text-green text-sm">Performance Gain</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Process Steps</div>
            <div className="metric-value">{data.extraStepsSavedPerVisit} steps</div>
            <div className="text-green text-sm">Reduction</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">Downtime</div>
            <div className="metric-value">{data.downtimeReductionPercent}%</div>
            <div className="text-green text-sm">Improvement</div>
          </div>
          <div className="metric-card">
            <div className="metric-title">IT Costs</div>
            <div className="metric-value">{data.itCostReductionPercent}%</div>
            <div className="text-green text-sm">Reduction</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blueberry">Implementation Strategy</h2>
            <p className="text-grey text-sm">Technical architecture and integration</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Architecture Benefits</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Microservices Architecture
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Cloud-Native Platform
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                API-First Design
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Scalable Infrastructure
              </li>
            </ul>
          </div>
          <div className="bg-tech-violet bg-opacity-5 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blueberry mb-3">Integration Features</h3>
            <ul className="space-y-2 text-grey">
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Real-time Data Sync
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Automated Workflows
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Enhanced Security
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">✓</span>
                Performance Monitoring
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {viewType === 'ceo' && renderCEOView()}
      {viewType === 'cfo' && renderCFOView()}
      {viewType === 'cto' && renderCTOView()}
    </div>
  );
};

export default StakeholderView; 