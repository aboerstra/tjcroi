import React, { useState } from 'react';
import SliderSection from './ui/SliderSection';
import { BusinessCaseData } from '../lib/data';

interface ROICalculatorProps {
  data: BusinessCaseData;
  onDataChange: (newData: Partial<BusinessCaseData>) => void;
}

type SectionType = 'operations' | 'revenue' | null;

const ROICalculator: React.FC<ROICalculatorProps> = ({ data, onDataChange }) => {
  const [openSection, setOpenSection] = useState<SectionType>(null);

  const toggleSection = (section: SectionType) => {
    setOpenSection(openSection === section ? null : section);
  };

  const SectionHeader = ({ title, section }: { title: string; section: Exclude<SectionType, null> }) => (
    <button 
      className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
        openSection === section 
          ? 'bg-gray-100 rounded-t-lg' 
          : 'bg-white hover:bg-gray-50 rounded-lg'
      }`}
      onClick={() => toggleSection(section)}
      aria-expanded={openSection === section}
    >
      <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      <div className="flex items-center gap-2 text-gray-500">
        <span className="text-xs">
          {openSection === section ? 'Click to collapse' : 'Click to expand'}
        </span>
        <svg 
          className={`w-5 h-5 transform transition-transform ${openSection === section ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg divide-y">
      {/* Clinic Operations Section */}
      <div className={`transition-all ${openSection === 'operations' ? 'pb-6' : ''}`}>
        <SectionHeader title="Clinic Operations & Time Savings" section="operations" />
        {openSection === 'operations' && (
          <div className="px-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-3">Daily Operations</h4>
                <div className="space-y-4">
                  <SliderSection
                    label="Number of Clinics"
                    value={data.clinicCount}
                    min={500}
                    max={1200}
                    step={10}
                    onChange={(value) => onDataChange({ clinicCount: value[0] })}
                    methodology={
                      <div>
                        <p>The Joint currently operates 950+ clinics across the US. Adjust based on projected growth.</p>
                        <p>Source: The Joint Chiropractic corporate data, Q1 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Current', value: 950 },
                      { label: 'Q4 Target', value: 1000 },
                      { label: '2025 Goal', value: 1100 }
                    ]}
                  />
                  
                  <SliderSection
                    label="Average Visits Per Day"
                    value={data.averageVisitsPerDay}
                    min={20}
                    max={60}
                    step={1}
                    onChange={(value) => onDataChange({ averageVisitsPerDay: value[0] })}
                    methodology={
                      <div>
                        <p>Survey data indicates an average of 40 patient visits per day across clinics.</p>
                        <p>Source: Survey of 411 staff members, March 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Low', value: 30 },
                      { label: 'Average', value: 40 },
                      { label: 'High', value: 50 }
                    ]}
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-3">Time Efficiency</h4>
                <div className="space-y-4">
                  <SliderSection
                    label="% Reduction in System Refresh Time"
                    value={data.refreshReductionPercent}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    onChange={(value) => onDataChange({ refreshReductionPercent: value[0] })}
                    methodology={
                      <div>
                        <p>76.3% of staff report spending an average of 60 minutes per day on system refreshes.</p>
                        <p>The slider represents the percentage reduction in this time that will be achieved.</p>
                        <p>Source: Survey of 411 staff members, March 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 50 },
                      { label: 'Expected', value: 75 },
                      { label: 'Optimistic', value: 90 }
                    ]}
                  />
                  
                  <SliderSection
                    label="% Reduction in Workarounds"
                    value={data.workaroundReductionPercent}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    onChange={(value) => onDataChange({ workaroundReductionPercent: value[0] })}
                    methodology={
                      <div>
                        <p>68.4% of staff report spending an average of 22.5 minutes per day on workarounds.</p>
                        <p>The slider represents the percentage reduction in this time that will be achieved.</p>
                        <p>Source: Survey of 411 staff members, March 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 40 },
                      { label: 'Expected', value: 65 },
                      { label: 'Optimistic', value: 85 }
                    ]}
                  />
                  
                  <SliderSection
                    label="% Reduction in Extra Steps"
                    value={data.extraStepsReductionPercent}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    onChange={(value) => onDataChange({ extraStepsReductionPercent: value[0] })}
                    methodology={
                      <div>
                        <p>62.8% of staff report spending approximately 1.5 minutes per patient visit on unnecessary steps.</p>
                        <p>The slider represents the percentage reduction in this time that will be achieved.</p>
                        <p>Source: Survey of 411 staff members, March 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 45 },
                      { label: 'Expected', value: 70 },
                      { label: 'Optimistic', value: 90 }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Reduction & Revenue Section */}
      <div className={`transition-all ${openSection === 'revenue' ? 'pb-6' : ''}`}>
        <SectionHeader title="Error Reduction & Revenue" section="revenue" />
        {openSection === 'revenue' && (
          <div className="px-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-3">Revenue Recovery</h4>
                <div className="space-y-4">
                  <SliderSection
                    label="% Recovery of Lost Revenue"
                    value={data.revenueLeakageReductionPercent}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    onChange={(value) => onDataChange({ revenueLeakageReductionPercent: value[0] })}
                    methodology={
                      <div>
                        <p>53.4% of staff report payment processing failures resulting in an estimated 1.5% revenue leakage.</p>
                        <p>The slider represents the percentage of this lost revenue that will be recovered.</p>
                        <p>Source: Survey of 411 staff members and financial analysis, March 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 40 },
                      { label: 'Expected', value: 60 },
                      { label: 'Optimistic', value: 80 }
                    ]}
                  />
                  
                  <SliderSection
                    label="Percentage Point Increase in Retention"
                    value={data.retentionImprovementPercent}
                    min={0}
                    max={6}
                    step={0.5}
                    suffix="%"
                    onChange={(value) => onDataChange({ retentionImprovementPercent: value[0] })}
                    methodology={
                      <div>
                        <p>Patient retention has declined from 70% to 64% over the past 18 months.</p>
                        <p>The slider represents the percentage point increase in retention that will be achieved.</p>
                        <p>Each percentage point is estimated ~$10K per clinic in annual revenue.</p>
                        <p>Source: The Joint Chiropractic corporate data, Q1 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 2 },
                      { label: 'Expected', value: 4 },
                      { label: 'Optimistic', value: 6 }
                    ]}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-500 mb-3">Cost Reduction</h4>
                <div className="space-y-4">
                  <SliderSection
                    label="% Reduction in IT Support Costs"
                    value={data.itCostReductionPercent}
                    min={0}
                    max={50}
                    step={5}
                    suffix="%"
                    onChange={(value) => onDataChange({ itCostReductionPercent: value[0] })}
                    methodology={
                      <div>
                        <p>Current IT support costs for the Front Office system are approximately $1.5M annually.</p>
                        <p>The slider represents the percentage reduction in these costs that will be achieved through the microservices architecture.</p>
                        <p>Source: The Joint Chiropractic IT department, Q1 2025.</p>
                      </div>
                    }
                    presets={[
                      { label: 'Conservative', value: 15 },
                      { label: 'Expected', value: 30 },
                      { label: 'Optimistic', value: 45 }
                    ]}
                  />

                  <div className="mt-3">
                    <div className="flex items-center gap-1 mb-1">
                      <label className="text-xs font-medium">Implementation Cost</label>
                      <div className="relative group">
                        <svg 
                          className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-help" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                          <div>
                            <p>The implementation cost includes:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Development: $225,000</li>
                              <li>Testing: $50,000</li>
                              <li>Training: $25,000</li>
                              <li>Deployment: $25,000</li>
                            </ul>
                            <p>This cost is borne entirely by corporate, while benefits accrue to both corporate and franchisees.</p>
                            <p>Source: The Joint Chiropractic IT department and vendor quotes, Q1 2025.</p>
                          </div>
                          <div className="absolute left-0 bottom-[-6px] w-3 h-3 bg-gray-900 transform rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded text-center text-sm font-medium">
                      ${data.implementationCost.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;
