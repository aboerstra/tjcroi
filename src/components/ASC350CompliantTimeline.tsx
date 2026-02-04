import React from 'react';

const ASC350CompliantTimeline: React.FC = () => {
  const phases = [
    {
      name: 'SOW 1: UI Foundation & Patient Record Core',
      subtitle: 'Sprints 1-4',
      duration: 2, // months
      cost: 108000, // 540 hours * $200/hr
      start: 0,
      details: [
        'UI Component System & Framework (140h)',
        'Front-End Development (320h)',
        'Usability Testing & Iterations (40h)',
        'Project Coordination & QA (40h)'
      ]
    },
    {
      name: 'SOW 2: Checkout Workflow & Documents',
      subtitle: 'Sprints 5-8',
      duration: 2, // months
      cost: 108000, // 540 hours * $200/hr
      start: 2,
      details: [
        'Front-End Workflow Development (360h)',
        'UI Integration & Components (80h)',
        'QA & Regression Testing (60h)',
        'Project Coordination (40h)'
      ]
    },
    {
      name: 'SOW 3: Messaging & Admin Tools',
      subtitle: 'Sprints 9-12',
      duration: 2, // months
      cost: 108000, // 540 hours * $200/hr
      start: 4,
      details: [
        'Final Feature Development (280h)',
        'QA & Regression Coverage (120h)',
        'Pilot Readiness & Feedback (60h)',
        'Project Coordination & Support (80h)'
      ]
    }
  ];

  const totalDuration = 6; // months
  const monthWidth = 100 / totalDuration; // percentage width for each month
  const totalCost = 324000; // Total implementation cost (540 * 3 * $200)
  const annualAmortization = totalCost / 5; // 5-year straight-line amortization
  const hourlyRate = 200; // $200 per hour
  const totalHours = 1620; // Total hours (540 * 3)
  const hoursPerSprint = 135; // Average hours per sprint (1620 / 12)

  const getSprintLabel = (sprintNumber: number) => {
    return `Sprint ${sprintNumber}`;
  };

  return (
    <div className="space-y-6 implementation-timeline">
      {/* Timeline Header */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total Hours: {totalHours} hours
        </div>
        <div className="text-sm text-gray-500">
          Total Duration: {totalDuration} months (12 sprints)
        </div>
      </div>

      {/* GAAP Compliance Note */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-gray-700">
          Following GAAP accounting principles (ASC 350-40), the total implementation cost of ${totalCost.toLocaleString()} (1,620 hours at ${hourlyRate}/hour) will be amortized over 5 years using straight-line depreciation. This results in an annual amortization expense of ${annualAmortization.toLocaleString()}.
        </p>
      </div>

      {/* Sprint Alignment Note */}
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
        <p className="text-sm text-gray-700">
          The project operates in 2-week sprints, with approximately {hoursPerSprint} hours per sprint. Each SOW spans 4 sprints and includes 540 hours of work. The implementation follows a phased approach with UI Foundation (Sprints 1-4), Checkout Workflow (Sprints 5-8), and Messaging & Admin Tools (Sprints 9-12).
        </p>
      </div>

      {/* Gantt Chart */}
      <div className="relative">
        {/* Sprint Markers */}
        <div className="flex mb-2">
          <div className="w-1/3"></div>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-500 border-b border-gray-200">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="text-center" style={{ width: `${100/12}%` }}>
                  {i > 0 && getSprintLabel(i)}
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
                  <div className="text-sm text-gray-500">${phase.cost.toLocaleString()} ({phase.cost / hourlyRate} hours)</div>
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
      <div className="mt-4 space-y-2">
        <div className="text-sm text-gray-600">
          <strong>Total Implementation Cost:</strong> ${totalCost.toLocaleString()} ({totalHours} hours at ${hourlyRate}/hour)
        </div>
        <div className="text-sm text-gray-600">
          <strong>Annual Amortization (5 years):</strong> ${annualAmortization.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">
          <strong>Delivery Model:</strong> Sprint-Based Implementation (2-week increments, ~{hoursPerSprint} hours per sprint)
        </div>
      </div>
    </div>
  );
};

export default ASC350CompliantTimeline;
