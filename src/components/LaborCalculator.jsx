// === LABOR CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { calculateTotalHoursLost, calculateProductiveHoursGained } from '../lib/calc';
import { formatHours } from '../lib/format';

const LaborCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    crewSize: state.crewSize,
    cleanupTime: state.cleanupTime,
    workDays: state.workDays
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      crewSize: state.crewSize,
      cleanupTime: state.cleanupTime,
      workDays: state.workDays
    });
  }, [state.crewSize, state.cleanupTime, state.workDays]);

  // Calculate results
  const totalHoursLost = calculateTotalHoursLost(localState.crewSize, localState.cleanupTime, localState.workDays);
  const productiveHoursGained = calculateProductiveHoursGained(localState.crewSize, localState.cleanupTime, localState.workDays);

  const handleComplete = () => {
    actions.setLaborData({
      crewSize: localState.crewSize,
      cleanupTime: localState.cleanupTime,
      workDays: localState.workDays,
      totalHoursLost,
      productiveHoursGained
    });
    actions.setCurrentScreen(3);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-blue-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.laborCalculator.title}
      </h2>
      
      <div className="space-y-8 my-10">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.laborCalculator.crewSize}</label>
            <span className="text-blue-600 font-bold text-lg">{localState.crewSize}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={localState.crewSize} 
            onChange={(e) => setLocalState(prev => ({ ...prev, crewSize: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
            aria-label="Adjust crew size"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.laborCalculator.cleanupTime}</label>
            <span className="text-blue-600 font-bold text-lg">{localState.cleanupTime} min</span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="90" 
            step="15" 
            value={localState.cleanupTime} 
            onChange={(e) => setLocalState(prev => ({ ...prev, cleanupTime: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
            aria-label="Adjust cleanup time per day"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.laborCalculator.workDays}</label>
            <span className="text-blue-600 font-bold text-lg">{localState.workDays}</span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="26" 
            value={localState.workDays} 
            onChange={(e) => setLocalState(prev => ({ ...prev, workDays: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
            aria-label="Adjust work days per month"
          />
        </div>
      </div>

      <div className="text-center bg-blue-50 p-6 rounded-xl border border-blue-200">
        <p className="text-lg text-gray-700">{COPY.laborCalculator.result}</p>
        <p className="text-5xl font-extrabold text-blue-600 my-2">{totalHoursLost}</p>
        <p className="text-lg text-gray-700">{COPY.laborCalculator.resultSubtext}</p>
        <p className="text-sm text-gray-600 mt-2">
          {COPY.laborCalculator.resultDetail.replace('{hours}', formatHours(productiveHoursGained))}
        </p>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.laborCalculator.nextButton}
        </button>
      </div>
    </div>
  );
};

export default LaborCalculator;
