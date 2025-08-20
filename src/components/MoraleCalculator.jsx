// === MORALE CALCULATOR COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { formatUSD } from '../lib/format';

const MoraleCalculator = () => {
  const { state, actions } = useFunnel();
  const [localState, setLocalState] = useState({
    enjoysCleanup: state.enjoysCleanup,
    thoroughCleanup: state.thoroughCleanup,
    callbacksReduced: state.callbacksReduced
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalState({
      enjoysCleanup: state.enjoysCleanup,
      thoroughCleanup: state.thoroughCleanup,
      callbacksReduced: state.callbacksReduced
    });
  }, [state.enjoysCleanup, state.thoroughCleanup, state.callbacksReduced]);

  // Calculate morale loss
  const calculateMoraleLoss = () => {
    let loss = 0;
    if (!localState.enjoysCleanup) loss += 200;
    if (!localState.thoroughCleanup) loss += 200;
    if (!localState.callbacksReduced) loss += 200;
    return loss;
  };

  const moraleLossMonth = calculateMoraleLoss();

  const handleToggle = (key) => {
    setLocalState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    actions.setMoraleData({
      enjoysCleanup: localState.enjoysCleanup,
      thoroughCleanup: localState.thoroughCleanup,
      callbacksReduced: localState.callbacksReduced,
      moraleLossMonth
    });
    actions.setCurrentScreen(5);
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-purple-500">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {COPY.moraleCalculator.title}
      </h2>
      
      <div className="space-y-8 my-10">
        {COPY.moraleCalculator.toggles.map((toggle) => {
          const isPositive = localState[toggle.id];
          
          return (
            <div key={toggle.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-800 mb-3">
                    {toggle.label}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <button 
                      onClick={() => handleToggle(toggle.id)}
                      className={`w-32 font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg ${
                        isPositive 
                          ? 'bg-green-600 text-white ring-2 ring-green-700 ring-offset-2' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50'
                      }`}
                      aria-label={`Set ${toggle.label} to positive`}
                    >
                      {toggle.yesText}
                    </button>
                    <button 
                      onClick={() => handleToggle(toggle.id)}
                      className={`w-32 font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg ${
                        !isPositive 
                          ? 'bg-red-600 text-white ring-2 ring-red-700 ring-offset-2' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-red-50'
                      }`}
                      aria-label={`Set ${toggle.label} to negative`}
                    >
                      {toggle.noText}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {toggle.explanation}
                  </p>
                  
                  {!isPositive && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 font-semibold">
                        +${toggle.impact} monthly impact
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center bg-purple-50 p-6 rounded-xl border border-purple-200">
        <p className="text-lg text-gray-700">{COPY.moraleCalculator.result}</p>
        <p className="text-5xl font-extrabold text-purple-600 my-2">{formatUSD(moraleLossMonth)}</p>
        <p className="text-sm text-gray-600 mt-2">
          {moraleLossMonth > 0 
            ? "These issues add up to significant monthly costs through rework, callbacks, and reduced productivity."
            : "Great! Your team's positive attitude toward cleanup is saving you money."
          }
        </p>
      </div>

      <div className="text-center mt-10">
        <button 
          onClick={handleComplete}
          className="bg-green-500 text-white font-bold text-xl px-16 py-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          {COPY.moraleCalculator.nextButton}
        </button>
      </div>
    </div>
  );
};

export default MoraleCalculator;
