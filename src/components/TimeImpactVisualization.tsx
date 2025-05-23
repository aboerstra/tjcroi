import React from 'react';
import { 
  formatCurrency 
} from '../lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeImpactVisualizationProps {
  refreshTimeSavings: number;
  workaroundTimeSavings: number;
  extraStepsTimeSavings: number;
}

const TimeImpactVisualization: React.FC<TimeImpactVisualizationProps> = ({ 
  refreshTimeSavings,
  workaroundTimeSavings,
  extraStepsTimeSavings
}) => {
  // Assuming 2 staff per clinic for calculations
  const staffPerClinic = 2;
  
  const chartData = [
    {
      name: 'Per Staff Member',
      refreshing: refreshTimeSavings,
      workarounds: workaroundTimeSavings,
      extraSteps: extraStepsTimeSavings / staffPerClinic,
      total: refreshTimeSavings + workaroundTimeSavings + (extraStepsTimeSavings / staffPerClinic)
    },
    {
      name: 'Per Clinic',
      refreshing: refreshTimeSavings * staffPerClinic,
      workarounds: workaroundTimeSavings * staffPerClinic,
      extraSteps: extraStepsTimeSavings,
      total: (refreshTimeSavings + workaroundTimeSavings) * staffPerClinic + extraStepsTimeSavings
    },
    {
      name: 'Organization-wide (Daily)',
      refreshing: refreshTimeSavings * staffPerClinic * 950, // Using default clinic count
      workarounds: workaroundTimeSavings * staffPerClinic * 950,
      extraSteps: extraStepsTimeSavings * 950,
      total: ((refreshTimeSavings + workaroundTimeSavings) * staffPerClinic + extraStepsTimeSavings) * 950
    }
  ];
  
  // Convert minutes to hours for the organization-wide data
  chartData[2].refreshing /= 60;
  chartData[2].workarounds /= 60;
  chartData[2].extraSteps /= 60;
  chartData[2].total /= 60;
  
  const formatMinutes = (minutes: number) => {
    if (minutes >= 60) {
      return `${(minutes / 60).toFixed(1)} hours`;
    }
    return `${minutes.toFixed(1)} min`;
  };
  
  const formatTooltip = (value: number, name: string, props: any) => {
    if (props.dataKey === 'total') {
      return [`${formatMinutes(value)}`, 'Total Time Saved'];
    }
    
    const keyMap: {[key: string]: string} = {
      refreshing: 'System Refreshing',
      workarounds: 'Workarounds',
      extraSteps: 'Extra Steps'
    };
    
    return [`${formatMinutes(value)}`, keyMap[name] || name];
  };
  
  // Calculate financial impact
  const totalDailyTimeSavings = chartData[1].total; // minutes per day per clinic
  const totalAnnualHoursSaved = (totalDailyTimeSavings * 260 * 950) / 60; // 260 working days, 950 clinics, convert to hours
  const organizationWideSavings = totalAnnualHoursSaved * 30; // $30 average hourly wage
  
  // Calculate productivity gain as percentage of 8-hour workday
  const productivityGain = (totalDailyTimeSavings / (8 * 60)) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="faye-polygon w-10 h-10 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blueberry">Time Impact Analysis</h2>
          <p className="text-grey text-sm">Time savings across organizational levels</p>
        </div>
      </div>
      
      <div className="mb-6 p-4 rounded-lg bg-tech-violet bg-opacity-5">
        <p className="text-sm text-blueberry">
          Based on survey data showing Wellness Coordinators and staff spending significant time on system refreshing, 
          workarounds, and extra steps. The chart below shows time saved at different organizational levels.
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: '#38003C' }} />
          <YAxis 
            label={{ 
              value: chartData[2].total > 100 ? 'Hours' : 'Minutes', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#38003C'
            }}
            tick={{ fill: '#38003C' }}
          />
          <Tooltip formatter={formatTooltip} />
          <Legend />
          <Bar dataKey="refreshing" name="System Refreshing" stackId="a" fill="#7C3AED" />
          <Bar dataKey="workarounds" name="Workarounds" stackId="a" fill="#16815A" />
          <Bar dataKey="extraSteps" name="Extra Steps" stackId="a" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card bg-tech-violet bg-opacity-5">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-tech-violet mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-medium text-blueberry">Daily Time Savings</h3>
          </div>
          <p className="text-3xl font-bold text-tech-violet">
            {formatMinutes(totalDailyTimeSavings)}
          </p>
          <p className="text-sm text-grey mt-1">Per clinic</p>
        </div>
        
        <div className="metric-card bg-green bg-opacity-5">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-medium text-blueberry">Annual Financial Impact</h3>
          </div>
          <p className="text-3xl font-bold text-green">
            {formatCurrency(organizationWideSavings)}
          </p>
          <p className="text-sm text-grey mt-1">Organization-wide</p>
        </div>
        
        <div className="metric-card bg-tech-orange bg-opacity-5">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-tech-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h3 className="font-medium text-blueberry">Productivity Gain</h3>
          </div>
          <p className="text-3xl font-bold text-tech-orange">
            {productivityGain.toFixed(1)}%
          </p>
          <p className="text-sm text-grey mt-1">Of 8-hour workday</p>
        </div>
      </div>
    </div>
  );
};

export default TimeImpactVisualization;
