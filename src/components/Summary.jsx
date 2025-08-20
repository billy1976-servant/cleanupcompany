// === SUMMARY COMPONENT ===

import React, { useState, useEffect } from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';
import { formatUSD } from '../lib/format';

const Summary = () => {
  const { state, actions } = useFunnel();
  const [selectedDate, setSelectedDate] = useState('');
  const [totalMonthlyLoss, setTotalMonthlyLoss] = useState(0);

  // Calculate total monthly loss
  useEffect(() => {
    const total = (state.wagesPaidMonth || 0) + (state.profitMissedMonth || 0) + (state.moraleLossMonth || 0);
    setTotalMonthlyLoss(total);
    
    // Update summary in context
    actions.updateSummary({ totalMonthlyLoss: total });
  }, [state.wagesPaidMonth, state.profitMissedMonth, state.moraleLossMonth, actions]);

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'tryPros':
        // Handle try pros action
        console.log('Try pros action clicked');
        break;
      case 'emailSummary':
        // Handle email summary action
        console.log('Email summary action clicked');
        break;
      case 'talkFirst':
        // Handle talk first action
        console.log('Talk first action clicked');
        break;
      case 'restart':
        actions.resetFunnel();
        break;
      default:
        break;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {COPY.summary.title}
        </h2>
        <p className="text-lg text-gray-600">
          {COPY.summary.subtitle}
        </p>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-indigo-500 mb-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              {COPY.summary.breakdown.laborLoss}
            </span>
            <span className="text-2xl font-bold text-red-600">
              {formatUSD(state.wagesPaidMonth || 0)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              {COPY.summary.breakdown.profitMissed}
            </span>
            <span className="text-2xl font-bold text-red-600">
              {formatUSD(state.profitMissedMonth || 0)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-700">
              {COPY.summary.breakdown.moraleLoss}
            </span>
            <span className="text-2xl font-bold text-red-600">
              {formatUSD(state.moraleLossMonth || 0)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-6 bg-gray-50 rounded-lg px-4">
            <span className="text-xl font-bold text-gray-800">
              {COPY.summary.breakdown.total}
            </span>
            <span className="text-4xl font-extrabold text-red-600">
              {formatUSD(totalMonthlyLoss)}
            </span>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
        <div className="text-center">
          <label htmlFor="service-date" className="block text-lg font-semibold text-gray-700 mb-3">
            {COPY.summary.datePicker}
          </label>
          <input
            type="date"
            id="service-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Select date for service"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => handleAction('tryPros')}
          className="bg-green-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300"
        >
          {COPY.summary.actions.tryPros}
        </button>
        
        <button
          onClick={() => handleAction('emailSummary')}
          className="bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          {COPY.summary.actions.emailSummary}
        </button>
        
        <button
          onClick={() => handleAction('talkFirst')}
          className="bg-indigo-600 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          {COPY.summary.actions.talkFirst}
        </button>
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={() => handleAction('restart')}
          className="bg-gray-500 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300"
        >
          {COPY.summary.restartButton}
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Your assessment data has been saved locally.</p>
        <p>Ready to transform your cleanup costs into profits?</p>
      </div>
    </div>
  );
};

export default Summary;
