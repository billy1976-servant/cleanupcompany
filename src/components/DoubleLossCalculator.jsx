// === DOUBLE LOSS CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { 
  calculateCleanupHoursMonth, 
  calculateWagesPaidMonth, 
  calculateProfitMissedMonth,
  calculateTotalDoubleLoss,
  calculateCleanupCoCost,
  calculateProfitEarnedBack,
  calculateNetGain
} from '../lib/calc';
import { formatUSD, formatHours } from '../lib/format';

const DoubleLossCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    crewSize: state.crewSize,
    cleanupTime: state.cleanupTime,
    baseWage: state.baseWage,
    billableRate: state.billableRate,
    cleanupCoRate: state.cleanupCoRate
  });
  const [showSolution, setShowSolution] = useState(false);

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      crewSize: state.crewSize,
      cleanupTime: state.cleanupTime,
      baseWage: state.baseWage,
      billableRate: state.billableRate,
      cleanupCoRate: state.cleanupCoRate
    });
  }, [state.crewSize, state.cleanupTime, state.baseWage, state.billableRate, state.cleanupCoRate]);

  // Calculate all results
  const cleanupHoursMonth = calculateCleanupHoursMonth(localState.crewSize, localState.cleanupTime);
  const wagesPaidMonth = calculateWagesPaidMonth(cleanupHoursMonth, localState.baseWage);
  const profitMissedMonth = calculateProfitMissedMonth(cleanupHoursMonth, localState.baseWage);
  const totalDoubleLoss = calculateTotalDoubleLoss(wagesPaidMonth, profitMissedMonth);
  
  const cleanupCoCost = calculateCleanupCoCost(cleanupHoursMonth);
  const profitEarnedBack = calculateProfitEarnedBack(cleanupHoursMonth, localState.baseWage);
  const netGain = calculateNetGain(profitEarnedBack, cleanupCoCost);

  const handleFixThis = () => {
    setShowSolution(true);
  };

  const handleComplete = () => {
    actions.setDoubleLossData({
      crewSize: localState.crewSize,
      cleanupTime: localState.cleanupTime,
      baseWage: localState.baseWage,
      billableRate: localState.billableRate,
      cleanupCoRate: localState.cleanupCoRate,
      cleanupHoursMonth,
      wagesPaidMonth,
      profitMissedMonth,
      totalDoubleLoss,
      cleanupCoCost,
      profitEarnedBack,
      netGain
    });
    actions.setCurrentScreen(4);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-red-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.doubleLoss.title}
      </h2>
      
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.doubleLoss.inputs.crewSize}</label>
            <span className="text-red-600 font-bold text-lg">{localState.crewSize}</span>
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
            <label className="font-bold text-gray-700">{COPY.doubleLoss.inputs.cleanupTime}</label>
            <span className="text-red-600 font-bold text-lg">{localState.cleanupTime} min</span>
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
            <label className="font-bold text-gray-700">{COPY.doubleLoss.inputs.baseWage}</label>
            <span className="text-red-600 font-bold text-lg">${localState.baseWage}/hr</span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="50" 
            value={localState.baseWage} 
            onChange={(e) => setLocalState(prev => ({ ...prev, baseWage: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
            aria-label="Adjust base hourly wage"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.doubleLoss.inputs.billableRate}</label>
            <span className="text-red-600 font-bold text-lg">${localState.billableRate}/hr</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="150" 
            value={localState.billableRate} 
            onChange={(e) => setLocalState(prev => ({ ...prev, billableRate: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
            aria-label="Adjust billable rate"
          />
        </div>
      </div>

      {/* Current Loss - Pain First */}
      <div className="bg-red-50 p-6 rounded-xl border border-red-200 mb-6">
        <h3 className="text-xl font-bold text-red-800 mb-4">{COPY.doubleLoss.currentLoss.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">{COPY.doubleLoss.currentLoss.cleanupHours}</p>
            <p className="text-2xl font-bold text-red-600">{formatHours(cleanupHoursMonth)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">{COPY.doubleLoss.currentLoss.wagesPaid}</p>
            <p className="text-2xl font-bold text-red-600">{formatUSD(wagesPaidMonth)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">{COPY.doubleLoss.currentLoss.profitMissed}</p>
            <p className="text-2xl font-bold text-red-600">{formatUSD(profitMissedMonth)}</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-lg text-red-700">{COPY.doubleLoss.currentLoss.totalLoss}</p>
          <p className="text-4xl font-extrabold text-red-600">{formatUSD(totalDoubleLoss)}</p>
        </div>
      </div>

      {/* Fix This Button */}
      <div className="text-center mb-6">
        <button 
          onClick={handleFixThis}
          className="bg-red-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          {COPY.doubleLoss.fixButton}
        </button>
      </div>

      {/* Solution - Only shown after clicking Fix This */}
      {showSolution && (
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6 animate-fade-in">
          <h3 className="text-xl font-bold text-green-800 mb-4">{COPY.doubleLoss.solution.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">{COPY.doubleLoss.solution.cost}</p>
              <p className="text-2xl font-bold text-green-600">{formatUSD(cleanupCoCost)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">{COPY.doubleLoss.solution.earn}</p>
              <p className="text-2xl font-bold text-green-600">{formatUSD(profitEarnedBack)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-700 mb-1">{COPY.doubleLoss.solution.net}</p>
              <p className="text-2xl font-bold text-green-600">{formatUSD(netGain)}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-green-700" dangerouslySetInnerHTML={{ __html: COPY.doubleLoss.solution.explanation }} />
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="text-center mt-8">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.doubleLoss.nextButton}
        </button>
      </div>
    </div>
  );
};

export default DoubleLossCalculator;
