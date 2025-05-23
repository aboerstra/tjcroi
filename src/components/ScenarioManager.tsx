import React, { useState } from 'react';
import { BusinessCaseData } from '../lib/data';

interface ScenarioManagerProps {
  data: BusinessCaseData;
  onDataChange: (data: Partial<BusinessCaseData>) => void;
}

const ScenarioManager: React.FC<ScenarioManagerProps> = ({ onDataChange }) => {
  const [scenarioName, setScenarioName] = useState<string>('');
  const [scenarioDescription, setScenarioDescription] = useState<string>('');

  const handleSave = () => {
    // Save scenario logic here
    onDataChange({});
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Scenario Manager</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Scenario Name</label>
          <input
            type="text"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={scenarioDescription}
            onChange={(e) => setScenarioDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Scenario
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScenarioManager;
