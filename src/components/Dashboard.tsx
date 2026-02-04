import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import ROICalculator from './ROICalculator';
import BenefitsBreakdown from './BenefitsBreakdown';
import TimeImpactVisualization from './TimeImpactVisualization';
import ExcelExport from './ExcelExport';
import PDFExport from './PDFExport';
import ResearchGuidance from './ResearchGuidance';
import ASC350CompliantTimeline from './ASC350CompliantTimeline';
import ROISummary from './ROISummary';
import CorporatePnLImpact from './CorporatePnLImpact';
import StakeholderView from './StakeholderView';
import FiveYearProjection from './FiveYearProjection';
import MetricsComparison from './MetricsComparison';
import { BusinessCaseData, defaultBusinessCaseData, calculateTotalBenefits } from '../lib/data';

// Helper function to merge loaded scenario with defaults for backward compatibility
const mergeWithDefaults = (scenarioData: Partial<BusinessCaseData>): BusinessCaseData => {
  return {
    ...defaultBusinessCaseData,
    ...scenarioData
  };
};

interface DashboardProps {
  showCorporateViewProp?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ showCorporateViewProp }) => {
  const [data, setData] = useState<BusinessCaseData>(defaultBusinessCaseData);
  const [showCorporateView, setShowCorporateView] = useState<boolean>(showCorporateViewProp !== undefined ? showCorporateViewProp : true);
  const [activeView, setActiveView] = useState<'ceo' | 'cfo' | 'cto'>('ceo');
  const [currentScenarioName, setCurrentScenarioName] = useState<string>('Type Project Name Here');
  const [expandedSections, setExpandedSections] = useState({
    stakeholder: true,
    pnlImpact: false,
    benefits: false,
    timeImpact: false,
    timeline: false,
    research: false,
    calculator: true
  });
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveScenarioName, setSaveScenarioName] = useState('');
  const [availableScenarios, setAvailableScenarios] = useState<({ name: string; data: any; description?: string; __editing?: boolean; __editValue?: string })[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  
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
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSaveScenarioName(currentScenarioName);
                setShowSaveModal(true);
              }}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Save Scenario
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                const scenarioNames = Object.keys(scenarios);
                if (scenarioNames.length > 0) {
                  setAvailableScenarios(scenarioNames.map(name => ({
                    name,
                    data: scenarios[name],
                    description: scenarios[name]?.description || ''
                  })));
                  setShowScenarioModal(true);
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
              type="button"
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
              type="button"
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
              type="button"
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
        <DashboardHeader 
          scenarioName={currentScenarioName}
          onScenarioNameChange={(newName) => {
            // Save current data as a scenario with this name
            const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
            // If old name existed, remove it
            if (currentScenarioName !== 'Type Project Name Here' && scenarios[currentScenarioName]) {
              delete scenarios[currentScenarioName];
            }
            scenarios[newName] = data;
            localStorage.setItem('scenarios', JSON.stringify(scenarios));
            setCurrentScenarioName(newName);
          }}
        />
        
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
              paybackPeriodMonths={benefits.paybackPeriodMonths}
              corporatePaybackPeriodMonths={benefits.corporatePaybackPeriodMonths}
              clinicCount={data.clinicCount}
              implementationCost={data.implementationCost}
              showCorporateView={showCorporateView}
              toggleView={() => setShowCorporateView(!showCorporateView)}
              perClinicAnnualBenefit={benefits.perClinicAnnualBenefit}
              perClinicCorporateBenefit={benefits.perClinicCorporateBenefit}
              fiveYearNetBenefit={benefits.fiveYearNetBenefit}
              implementationCapEx={data.implementationCapEx}
              implementationOpEx={data.implementationOpEx}
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
                    sectionBenefits={benefits.sectionBenefits}
                    timeSavingsValue={showCorporateView ? benefits.corporateTimeSavingsValue : benefits.timeSavingsValue}
                    revenueLeakageRecovery={showCorporateView ? benefits.corporateRevenueLeakageRecovery : benefits.revenueLeakageRecovery}
                    retentionImprovementValue={showCorporateView ? benefits.corporateRetentionImprovementValue : benefits.retentionImprovementValue}
                    itCostReduction={benefits.itCostReduction}
                    totalBenefits={showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits}
                    showCorporateView={showCorporateView}
                    leadConversionValue={showCorporateView ? benefits.corporateLeadConversionValue : benefits.leadConversionValue}
                    marketingSavingsValue={benefits.marketingSavingsValue}
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg">
              <SectionHeader title="Time Impact" section="timeImpact" />
              {expandedSections.timeImpact && (
                <div className="p-6">
                  <TimeImpactVisualization 
                    refreshTimeSavings={data.refreshMinutesSavedPerDay}
                    workaroundTimeSavings={data.workaroundMinutesSavedPerDay}
                    extraStepsTimeSavings={data.extraStepsSavedPerVisit}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Baseline vs Future State Comparison - Full Width */}
        <div className="mt-6">
          <MetricsComparison data={data} />
        </div>

        {/* Phase 1: 5-Year Projection - Full Width */}
        <div className="mt-6">
          <FiveYearProjection 
            projections={benefits.fiveYearProjections}
            showCorporateView={showCorporateView}
          />
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

      {/* Scenario Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Save Scenario</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter a name for this scenario. Using the same name as an existing scenario will overwrite it.
            </p>
            <input
              type="text"
              value={saveScenarioName}
              onChange={(e) => setSaveScenarioName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && saveScenarioName.trim()) {
                  const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                  scenarios[saveScenarioName.trim()] = data;
                  localStorage.setItem('scenarios', JSON.stringify(scenarios));
                  setCurrentScenarioName(saveScenarioName.trim());
                  setShowSaveModal(false);
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter scenario name..."
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                disabled={!saveScenarioName.trim()}
                onClick={() => {
                  const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                  scenarios[saveScenarioName.trim()] = data;
                  localStorage.setItem('scenarios', JSON.stringify(scenarios));
                  setCurrentScenarioName(saveScenarioName.trim());
                  setShowSaveModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Load Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Load Scenario</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {availableScenarios.map((scenario) => (
                <div
                  key={scenario.name}
                  className={`p-3 rounded cursor-pointer border flex items-center justify-between ${selectedScenario === scenario.name ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setSelectedScenario(scenario.name)}
                >
                  <div className="flex-1 min-w-0">
                    {scenario.__editing ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 w-full text-sm"
                        value={scenario.__editValue || scenario.name}
                        autoFocus
                        onChange={e => {
                          setAvailableScenarios(prev => prev.map(s =>
                            s.name === scenario.name ? { ...s, __editValue: e.target.value } : s
                          ));
                        }}
                        onBlur={() => {
                          setAvailableScenarios(prev => prev.map(s =>
                            s.name === scenario.name ? { ...s, __editing: false } : s
                          ));
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const newName = scenario.__editValue?.trim();
                            if (newName && newName !== scenario.name) {
                              // Rename in localStorage
                              const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                              if (!scenarios[newName]) {
                                scenarios[newName] = { ...scenarios[scenario.name], description: scenarios[scenario.name]?.description };
                                delete scenarios[scenario.name];
                                localStorage.setItem('scenarios', JSON.stringify(scenarios));
                                setAvailableScenarios(prev => prev.map(s =>
                                  s.name === scenario.name ? { ...s, name: newName, __editing: false, __editValue: undefined } : s
                                ));
                                if (selectedScenario === scenario.name) setSelectedScenario(newName);
                              } else {
                                alert('A scenario with that name already exists.');
                              }
                            } else {
                              setAvailableScenarios(prev => prev.map(s =>
                                s.name === scenario.name ? { ...s, __editing: false, __editValue: undefined } : s
                              ));
                            }
                          }
                        }}
                      />
                    ) : (
                      <div className="font-semibold truncate">{scenario.name}</div>
                    )}
                    {scenario.description && <div className="text-xs text-gray-500 mt-1 truncate">{scenario.description}</div>}
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline"
                      title="Rename"
                      onClick={e => {
                        e.stopPropagation();
                        setAvailableScenarios(prev => prev.map(s =>
                          s.name === scenario.name ? { ...s, __editing: true, __editValue: scenario.name } : s
                        ));
                      }}
                    >Rename</button>
                    <button
                      type="button"
                      className="text-xs text-red-600 hover:underline"
                      title="Delete"
                      onClick={e => {
                        e.stopPropagation();
                        if (window.confirm(`Delete scenario '${scenario.name}'?`)) {
                          const scenarios = JSON.parse(localStorage.getItem('scenarios') || '{}');
                          delete scenarios[scenario.name];
                          localStorage.setItem('scenarios', JSON.stringify(scenarios));
                          setAvailableScenarios(prev => prev.filter(s => s.name !== scenario.name));
                          if (selectedScenario === scenario.name) setSelectedScenario(null);
                        }
                      }}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={() => setShowScenarioModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                disabled={!selectedScenario}
                onClick={() => {
                  const scenario = availableScenarios.find(s => s.name === selectedScenario);
                  if (scenario) {
                    // Use mergeWithDefaults to ensure backward compatibility with old scenarios
                    // that may be missing new fields
                    setData(mergeWithDefaults(scenario.data));
                    setCurrentScenarioName(scenario.name);
                    setShowScenarioModal(false);
                    setSelectedScenario(null);
                  }
                }}
              >
                Load
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
