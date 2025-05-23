import React from 'react';
import { Slider } from './slider';

interface SliderSectionProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  methodology?: React.ReactNode;
  onChange: (value: number[]) => void;
  presets?: { label: string; value: number }[];
}

const SliderSection: React.FC<SliderSectionProps> = ({
  label,
  value,
  min,
  max,
  step,
  suffix = '',
  methodology,
  onChange,
  presets
}) => {
  return (
    <div className="mb-3 group">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-1">
          <label className="text-xs font-medium">{label}</label>
          {methodology && (
            <div className="relative group/tooltip">
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
              <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50">
                {methodology}
                <div className="absolute left-0 bottom-[-6px] w-3 h-3 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          )}
        </div>
        <div className="text-xs font-medium">{value}{suffix}</div>
      </div>
      
      <div className="relative">
        <Slider
          defaultValue={[value]}
          max={max}
          min={min}
          step={step}
          value={[value]}
          onValueChange={onChange}
          className="mb-1"
        />
        
        {/* Quick Value Selector */}
        {presets && (
          <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {presets.map((preset, index) => (
              <button
                key={index}
                onClick={() => onChange([preset.value])}
                className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${
                  value === preset.value
                    ? 'bg-blueberry text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
        
        {/* Min/Max Display */}
        <div className="flex justify-between text-[10px] text-gray-400">
          <div>{min}{suffix}</div>
          <div>{max}{suffix}</div>
        </div>
      </div>
    </div>
  );
};

export default SliderSection; 