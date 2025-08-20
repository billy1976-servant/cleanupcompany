// === ENERGY MORALE CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { calculateMoraleScore, calculateProductivityGain } from '../lib/calc';
import { formatHours } from '../lib/format';

const EnergyMoraleCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    teamSize: state.teamSize,
    moraleImpact: state.moraleImpact,
    productivityLoss: state.productivityLoss
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      teamSize: state.teamSize,
      moraleImpact: state.moraleImpact,
      productivityLoss: state.productivityLoss
    });
  }, [state.teamSize, state.moraleImpact, state.productivityLoss]);

  // Calculate results
  const moraleScore = calculateMoraleScore(localState.moraleImpact);
  const productivityGain = calculateProductivityGain(localState.teamSize, localState.productivityLoss, 22);

  const handleComplete = () => {
    actions.setEnergyMoraleData({
      teamSize: localState.teamSize,
      moraleImpact: localState.moraleImpact,
      productivityLoss: localState.productivityLoss,
      moraleScore,
      productivityGain
    });
    actions.setCurrentScreen(4);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-purple-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.calculator.energyMorale.title}
      </h2>
      
      <div className="space-y-8 my-10">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.energyMorale.teamSize}</label>
            <span className="text-purple-600 font-bold text-lg">{localState.teamSize}</span>
          </div>
          <input 
            type="range" 
            min="3" 
            max="25" 
            value={localState.teamSize} 
            onChange={(e) => setLocalState(prev => ({ ...prev, teamSize: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.energyMorale.moraleImpact}</label>
            <span className="text-purple-600 font-bold text-lg">{localState.moraleImpact}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={localState.moraleImpact} 
            onChange={(e) => setLocalState(prev => ({ ...prev, moraleImpact: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.energyMorale.productivityLoss}</label>
            <span className="text-purple-600 font-bold text-lg">{localState.productivityLoss}%</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="30" 
            value={localState.productivityLoss} 
            onChange={(e) => setLocalState(prev => ({ ...prev, productivityLoss: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
      </div>

      <div className="text-center bg-purple-50 p-6 rounded-xl border border-purple-200">
        <p className="text-lg text-gray-700">{COPY.calculator.energyMorale.moraleResult}</p>
        <p className="text-5xl font-extrabold text-purple-600 my-2">{moraleScore}/10</p>
        <p className="text-lg text-gray-700">{COPY.calculator.energyMorale.productivityResult}</p>
        <p className="text-3xl font-bold text-purple-600">{formatHours(productivityGain)}/month</p>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.calculator.energyMorale.nextButton}
        </button>
      </div>
    </div>
  );
};

export default EnergyMoraleCalculator;
