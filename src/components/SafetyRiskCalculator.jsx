// === SAFETY RISK CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { calculateRiskScore, calculatePotentialSavings } from '../lib/calc';
import { formatUSD } from '../lib/format';

const SafetyRiskCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    incidentRate: state.incidentRate,
    insuranceCost: state.insuranceCost,
    liabilityRisk: state.liabilityRisk
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      incidentRate: state.incidentRate,
      insuranceCost: state.insuranceCost,
      liabilityRisk: state.liabilityRisk
    });
  }, [state.incidentRate, state.insuranceCost, state.liabilityRisk]);

  // Calculate results
  const riskScore = calculateRiskScore(localState.incidentRate, localState.liabilityRisk);
  const potentialSavings = calculatePotentialSavings(localState.incidentRate, localState.liabilityRisk);

  const handleComplete = () => {
    actions.setSafetyRiskData({
      incidentRate: localState.incidentRate,
      insuranceCost: localState.insuranceCost,
      liabilityRisk: localState.liabilityRisk,
      riskScore,
      potentialSavings
    });
    actions.setCurrentScreen(5);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.calculator.safetyRisk.title}
      </h2>
      
      <div className="space-y-8 my-10">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.safetyRisk.incidentRate}</label>
            <span className="text-red-600 font-bold text-lg">{localState.incidentRate}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={localState.incidentRate} 
            onChange={(e) => setLocalState(prev => ({ ...prev, incidentRate: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.safetyRisk.insuranceCost}</label>
            <span className="text-red-600 font-bold text-lg">{formatUSD(localState.insuranceCost)}</span>
          </div>
          <input 
            type="range" 
            min="2000" 
            max="15000" 
            step="500" 
            value={localState.insuranceCost} 
            onChange={(e) => setLocalState(prev => ({ ...prev, insuranceCost: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.safetyRisk.liabilityRisk}</label>
            <span className="text-red-600 font-bold text-lg">{localState.liabilityRisk}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={localState.liabilityRisk} 
            onChange={(e) => setLocalState(prev => ({ ...prev, liabilityRisk: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
      </div>

      <div className="text-center bg-red-50 p-6 rounded-xl border border-red-200">
        <p className="text-lg text-gray-700">{COPY.calculator.safetyRisk.riskResult}</p>
        <p className="text-5xl font-extrabold text-red-600 my-2">{riskScore}/10</p>
        <p className="text-lg text-gray-700">{COPY.calculator.safetyRisk.savingsResult}</p>
        <p className="text-3xl font-bold text-red-600">{formatUSD(potentialSavings)}</p>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.calculator.safetyRisk.nextButton}
        </button>
      </div>
    </div>
  );
};

export default SafetyRiskCalculator;
