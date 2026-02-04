import React from 'react';
import { Slider } from './slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

// Format large numbers with K/M suffixes
const formatCompact = (value: number, isCurrency: boolean = false): string => {
  const prefix = isCurrency ? '$' : '';
  const abs = Math.abs(value);
  
  if (abs >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(1)}M`;
  } else if (abs >= 1000) {
    return `${prefix}${(value / 1000).toFixed(0)}K`;
  } else {
    return isCurrency ? `${prefix}${value.toLocaleString()}` : value.toLocaleString();
  }
};

interface MetricRowProps {
  label: string;
  baseline: number;
  change: number;
  onBaselineChange: (value: number) => void;
  onChangeChange: (value: number) => void;
  unit?: 'percent' | 'points' | 'currency' | 'number' | 'minutes';
  changeUnit?: 'percent' | 'points';
  baselineMin?: number;
  baselineMax?: number;
  baselineStep?: number;
  changeMin?: number;
  changeMax?: number;
  changeStep?: number;
  isReduction?: boolean; // If true, negative change = improvement
  methodology?: string;
}

const MetricRow: React.FC<MetricRowProps> = ({
  label,
  baseline,
  change,
  onBaselineChange,
  onChangeChange,
  unit = 'percent',
  changeUnit = 'percent',
  baselineMin = 0,
  baselineMax = 100,
  baselineStep = 1,
  changeMin = 0,
  changeMax = 50,
  changeStep = 1,
  isReduction = false,
  methodology
}) => {
  // Calculate forecast based on unit type
  let forecast: number;
  let forecastDisplay: string;
  let baselineDisplay: string;
  let changeDisplay: string;

  if (changeUnit === 'points') {
    forecast = baseline + change;
  } else {
    // percent change
    if (isReduction) {
      forecast = baseline * (1 - change / 100);
    } else {
      forecast = baseline * (1 + change / 100);
    }
  }

  // Format displays based on unit - use K/M for large numbers
  switch (unit) {
    case 'currency':
      baselineDisplay = formatCompact(baseline, true);
      forecastDisplay = formatCompact(Math.round(forecast), true);
      break;
    case 'minutes':
      baselineDisplay = `${baseline} min`;
      forecastDisplay = `${Math.round(forecast)} min`;
      break;
    case 'number':
      baselineDisplay = formatCompact(baseline, false);
      forecastDisplay = formatCompact(Math.round(forecast), false);
      break;
    case 'points':
    case 'percent':
    default:
      baselineDisplay = `${baseline}%`;
      forecastDisplay = `${forecast.toFixed(1)}%`;
      break;
  }

  // Format change display
  if (changeUnit === 'points') {
    changeDisplay = `${change >= 0 ? '+' : ''}${change} pts`;
  } else {
    changeDisplay = isReduction 
      ? `-${change}%` 
      : `${change >= 0 ? '+' : ''}${change}%`;
  }

  const isImprovement = isReduction ? change > 0 : change > 0;

  return (
    <div className="border-b border-gray-100 py-3 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {methodology && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-blue-500 cursor-help hover:text-blue-700 transition-colors">
                  ⓘ
                </span>
              </TooltipTrigger>
              <TooltipContent 
                side="left" 
                className="max-w-xs text-sm bg-gray-900 text-white p-3 rounded-lg shadow-lg"
              >
                <p>{methodology}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Column 1: Baseline */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Baseline</div>
          <div className="text-lg font-semibold text-gray-700">{baselineDisplay}</div>
          <div className="mt-2">
            <Slider
              value={[baseline]}
              min={baselineMin}
              max={baselineMax}
              step={baselineStep}
              onValueChange={(v) => onBaselineChange(v[0])}
              className="w-full"
            />
          </div>
        </div>

        {/* Column 2: Change */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-xs text-blue-600 mb-1">Change</div>
          <div className={`text-lg font-semibold ${isImprovement ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {changeDisplay}
          </div>
          <div className="mt-2">
            <Slider
              value={[change]}
              min={changeMin}
              max={changeMax}
              step={changeStep}
              onValueChange={(v) => onChangeChange(v[0])}
              className="w-full"
            />
          </div>
          <button
            type="button"
            onClick={() => onChangeChange(0)}
            disabled={change === 0}
            className={`mt-2 text-xs ${
              change === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-blue-500 hover:text-blue-700 cursor-pointer'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Column 3: Forecast */}
        <div className={`rounded-lg p-3 ${isImprovement ? 'bg-green-50' : 'bg-gray-50'}`}>
          <div className={`text-xs mb-1 ${isImprovement ? 'text-green-600' : 'text-gray-500'}`}>Forecast</div>
          <div className={`text-lg font-bold ${isImprovement ? 'text-green-700' : 'text-gray-700'}`}>
            {forecastDisplay}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Auto-calculated
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricRow;
