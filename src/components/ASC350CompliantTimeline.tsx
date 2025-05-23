import React from 'react';

const ASC350CompliantTimeline: React.FC = () => {
  const startDate = new Date('2025-05-26');
  
  const phases = [
    {
      name: 'SOW 1: Initial Implementation Setup',
      subtitle: 'Sprints 1-4',
      duration: 2, // months
      cost: 78750, // 525 hours * $150/hr
      start: 0,
      details: [
        'UI Specification & Behavior Design (350h)',
        'System Architecture & API Planning (80h)',
        'Implementation Alignment Support (40h)',
        'Engineering Coordination (55h)'
      ]
    },
    {
      name: 'SOW 2: Full-Stack Feature Development',
      subtitle: 'Sprints 5-10',
      duration: 2.5,
      cost: 90000, // 600 hours * $150/hr
      start: 2,
      details: [
        'Front-End Development (240h)',
        'Back-End Development (192h)',
        'Development QA Execution (96h)',
        'Engineering Coordination (72h)'
      ]
    },
    {
      name: 'SOW 3: Finalization & Deployment',
      subtitle: 'Sprints 11-16',
      duration: 1.5,
      cost: 75000, // 500 hours * $150/hr
      start: 4.5,
      details: [
        'Implementation Engineering (275h)',
        'Validation QA (24h)',
        'Environment & Deployment Ops (48h)',
        'Technical Integration Support (80h)',
        'Development Support Services (73h)'
      ]
    }
  ];

  const totalDuration = 6; // months
  const monthWidth = 100 / totalDuration; // percentage width for each month

  const getMonthLabel = (monthOffset: number) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + monthOffset);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  return (
    <div className="space-y-6 implementation-timeline">
      {/* Timeline Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total Hours: {phases.reduce((acc, phase) => acc + (phase.cost / 150), 0)} hours
        </div>
        <div className="text-sm text-gray-500">
          Total Duration: {totalDuration} months
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="relative">
        {/* Month Markers */}
        <div className="flex mb-2">
          <div className="w-1/3"></div>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-500 border-b border-gray-200">
              {Array.from({ length: totalDuration + 1 }).map((_, i) => (
                <div key={i} className="text-center" style={{ width: `${monthWidth}%` }}>
                  {getMonthLabel(i)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Bars */}
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-start mb-2">
                <div className="w-1/3 pr-4">
                  <div className="font-medium text-gray-900">{phase.name}</div>
                  <div className="text-sm text-gray-500 mb-1">{phase.subtitle}</div>
                  <div className="text-sm text-gray-500">${phase.cost.toLocaleString()} ({phase.cost / 150} hours)</div>
                  <div className="mt-2 space-y-1">
                    {phase.details.map((detail, i) => (
                      <div key={i} className="text-xs text-gray-600">{detail}</div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 relative h-8">
                  <div
                    className="absolute h-full rounded-lg bg-gradient-to-r from-tech-violet/80 to-tech-violet flex items-center justify-center text-white text-sm"
                    style={{
                      left: `${phase.start * monthWidth}%`,
                      width: `${phase.duration * monthWidth}%`,
                    }}
                  >
                    {phase.duration} mo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="absolute top-8 bottom-0 border-l-2 border-tech-teal animate-pulse"
             style={{ left: 'calc(33.333% + 1px)', borderStyle: 'dashed' }}>
          <div className="absolute -top-6 -left-8 text-tech-teal text-sm font-medium whitespace-nowrap">
            Project Start
          </div>
        </div>
      </div>

      {/* Total Cost Summary */}
      <div className="mt-4 text-sm text-gray-600">
        <strong>Total Implementation Cost:</strong> ${phases.reduce((acc, phase) => acc + phase.cost, 0).toLocaleString()}
      </div>
    </div>
  );
};

export default ASC350CompliantTimeline;
