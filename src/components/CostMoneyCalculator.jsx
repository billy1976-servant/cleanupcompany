// === COST MONEY CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { calculateLaborCost, calculateLostRevenue, calculateTotalCost } from '../lib/calc';
import { formatUSD } from '../lib/format';

const CostMoneyCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    hourlyWage: state.hourlyWage,
    billableRate: state.billableRate
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      hourlyWage: state.hourlyWage,
      billableRate: state.billableRate
    });
  }, [state.hourlyWage, state.billableRate]);

  // Calculate results using data from previous screen
  const laborCost = calculateLaborCost(state.totalHoursLost, localState.hourlyWage);
  const lostRevenue = calculateLostRevenue(state.totalHoursLost, localState.billableRate);
  const totalCost = calculateTotalCost(laborCost, lostRevenue);

  const handleComplete = () => {
    actions.setCostMoneyData({
      hourlyWage: localState.hourlyWage,
      billableRate: localState.billableRate,
      laborCost,
      lostRevenue,
      totalCost
    });
    actions.setCurrentScreen(3);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-green-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.calculator.costMoney.title}
      </h2>
      
      <div className="space-y-8 my-10">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.costMoney.hourlyWage}</label>
            <span className="text-green-600 font-bold text-lg">${localState.hourlyWage}/hr</span>
          </div>
          <input 
            type="range" 
            min="15" 
            max="50" 
            value={localState.hourlyWage} 
            onChange={(e) => setLocalState(prev => ({ ...prev, hourlyWage: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-bold text-gray-700">{COPY.calculator.costMoney.billableRate}</label>
            <span className="text-green-600 font-bold text-lg">${localState.billableRate}/hr</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="150" 
            value={localState.billableRate} 
            onChange={(e) => setLocalState(prev => ({ ...prev, billableRate: Number(e.target.value) }))} 
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg" 
          />
        </div>
      </div>

      <div className="text-center bg-green-50 p-6 rounded-xl border border-green-200">
        <p className="text-lg text-gray-700">{COPY.calculator.costMoney.result}</p>
        <p className="text-5xl font-extrabold text-green-600 my-2">{formatUSD(totalCost)}</p>
        <p className="text-lg text-gray-700">{COPY.calculator.costMoney.resultSubtext}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p>{COPY.calculator.costMoney.laborCost.replace('{amount}', formatUSD(laborCost))}</p>
          <p>{COPY.calculator.costMoney.lostRevenue.replace('{amount}', formatUSD(lostRevenue))}</p>
        </div>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.calculator.costMoney.nextButton}
        </button>
      </div>
    </div>
  );
};

export default CostMoneyCalculator;
