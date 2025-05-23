import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import ROICalculator from './ROICalculator';
import BenefitsBreakdown from './BenefitsBreakdown';
import TimeImpactVisualization from './TimeImpactVisualization';
import ScenarioManager from './ScenarioManager';
import ExcelExport from './ExcelExport';
import PDFExport from './PDFExport';
import ResearchGuidance from './ResearchGuidance';
import ASC350CompliantTimeline from './ASC350CompliantTimeline';
import ROISummary from './ROISummary';
import CorporatePnLImpact from './CorporatePnLImpact';
import StakeholderView from './StakeholderView';
import { BusinessCaseData, defaultBusinessCaseData, calculateTotalBenefits } from '../lib/data';

interface DashboardProps {
  showCorporateViewProp?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showCorporateViewProp }) => {
  const [data, setData] = useState<BusinessCaseData>(defaultBusinessCaseData);
  const [showCorporateView, setShowCorporateView] = useState<boolean>(showCorporateViewProp !== undefined ? showCorporateViewProp : true);
  const [activeView, setActiveView] = useState<'ceo' | 'cfo' | 'cto'>('ceo');
  const [expandedSections, setExpandedSections] = useState({
    stakeholder: true,
    pnlImpact: false,
    benefits: false,
    timeImpact: false,
    timeline: false,
    research: false,
    calculator: true
  });
  
  useEffect(() => {
    if (showCorporateViewProp !== undefined) {
      setShowCorporateView(showCorporateViewProp);
    }
  }, [showCorporateViewProp]);
  
  const benefits = calculateTotalBenefits(data);
  
  const handleDataChange = (newData: Partial<BusinessCaseData>) => {
    setData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ title, section }: { title: string; section: keyof typeof expandedSections }) => (
    <div 
      className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center">
        <h2 className="text-lg font-bold text-blueberry">{title}</h2>
        {section === 'calculator' && (
          <div className="flex items-center ml-4 space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const scenarioName = prompt('Enter a name for this scenario:');
                if (scenarioName) {
                  const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                  scenarios[scenarioName] = data;
                  localStorage.setItem('scenarios', JSON.stringify(scenarios));
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Save Scenario
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                const scenarioNames = Object.keys(scenarios);
                if (scenarioNames.length > 0) {
                  const selectedScenario = prompt('Select a scenario to load:\n' + scenarioNames.join('\n'));
                  if (selectedScenario && scenarios[selectedScenario]) {
                    handleDataChange(scenarios[selectedScenario]);
                  }
                } else {
                  alert('No saved scenarios found.');
                }
              }}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Load Scenario
            </button>
          </div>
        )}
      </div>
      <svg 
        className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedSections[section] ? 'rotate-180' : ''}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  const StakeholderHeader = () => (
    <div className="bg-gray-50 rounded-t-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => toggleSection('stakeholder')}
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-bold text-blueberry">Stakeholder Analysis</h2>
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveView('ceo'); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-l-lg transition-colors ${
                activeView === 'ceo'
                  ? 'bg-blueberry text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              CEO View
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveView('cfo'); }}
              className={`px-3 py-1.5 text-sm font-medium border-l border-r border-gray-200 transition-colors ${
                activeView === 'cfo'
                  ? 'bg-blueberry text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              CFO View
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveView('cto'); }}
              className={`px-3 py-1.5 text-sm font-medium rounded-r-lg transition-colors ${
                activeView === 'cto'
                  ? 'bg-blueberry text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              CTO View
            </button>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-500 transform transition-transform ${expandedSections.stakeholder ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <DashboardHeader />
        
        {/* Hidden Export Components */}
        <div className="hidden">
          <div className="excel-export">
            <ExcelExport
              data={data}
              benefits={benefits}
              showCorporateView={showCorporateView}
            />
          </div>
          <div className="pdf-export">
            <PDFExport
              data={data}
              benefits={benefits}
              showCorporateView={showCorporateView}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - ROI Summary and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <ROISummary 
              totalAnnualBenefits={benefits.totalAnnualBenefits}
              corporateAnnualBenefits={benefits.corporateAnnualBenefits}
              franchiseAnnualBenefits={benefits.franchiseAnnualBenefits}
              paybackPeriodMonths={benefits.paybackPeriodMonths}
              corporatePaybackPeriodMonths={benefits.corporatePaybackPeriodMonths}
              firstYearROI={benefits.firstYearROI}
              corporateFirstYearROI={benefits.corporateFirstYearROI}
              fiveYearROI={benefits.fiveYearROI}
              corporateFiveYearROI={benefits.corporateFiveYearROI}
              clinicCount={data.clinicCount}
              implementationCost={data.implementationCost}
              showCorporateView={showCorporateView}
              toggleView={() => setShowCorporateView(!showCorporateView)}
            />

            <div className="bg-white rounded-lg shadow-lg">
              <StakeholderHeader />
              {expandedSections.stakeholder && (
                <div className="p-6">
                  <StakeholderView
                    data={data}
                    benefits={benefits}
                    viewType={activeView}
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg">
              <SectionHeader title="P&L Impact" section="pnlImpact" />
              {expandedSections.pnlImpact && (
                <div className="p-6">
                  <CorporatePnLImpact 
                    benefits={benefits}
                    showCorporateView={showCorporateView}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Calculator and Scenarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg">
              <SectionHeader title="ROI Variables" section="calculator" />
              {expandedSections.calculator && (
                <div className="p-6">
                  <ROICalculator
                    data={data}
                    onDataChange={handleDataChange}
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg">
              <SectionHeader title="Benefits Analysis" section="benefits" />
              {expandedSections.benefits && (
                <div className="p-6">
                  <BenefitsBreakdown 
                    timeSavingsValue={showCorporateView ? benefits.corporateTimeSavingsValue : benefits.timeSavingsValue}
                    revenueLeakageRecovery={showCorporateView ? benefits.corporateRevenueLeakageRecovery : benefits.revenueLeakageRecovery}
                    retentionImprovementValue={showCorporateView ? benefits.corporateRetentionImprovementValue : benefits.retentionImprovementValue}
                    itCostReduction={benefits.itCostReduction}
                    totalBenefits={showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits}
                    showCorporateView={showCorporateView}
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg">
              <SectionHeader title="Time Impact" section="timeImpact" />
              {expandedSections.timeImpact && (
                <div className="p-6">
                  <TimeImpactVisualization 
                    refreshTimeSavings={60 * (data.refreshReductionPercent / 100)}
                    workaroundTimeSavings={22.5 * (data.workaroundReductionPercent / 100)}
                    extraStepsTimeSavings={data.averageVisitsPerDay * 1.5 * (data.extraStepsReductionPercent / 100)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-lg">
          <SectionHeader title="Research & Guidance" section="research" />
          {expandedSections.research && (
            <div className="p-6">
              <ResearchGuidance data={data} />
            </div>
          )}
        </div>

        {/* Implementation Timeline - Full Width */}
        <div className="mt-6 bg-white rounded-lg shadow-lg">
          <SectionHeader title="Implementation Timeline" section="timeline" />
          {expandedSections.timeline && (
            <div className="p-6">
              <ASC350CompliantTimeline />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
