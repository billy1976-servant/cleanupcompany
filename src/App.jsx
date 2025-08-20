// === MAIN APP COMPONENT ===

import React from 'react';
import { FunnelProvider } from './context/FunnelContext';
import { useFunnel } from './context/FunnelContext';
import { COPY } from './copy/en-US';
import PainScan from './components/PainScan';
import LaborCalculator from './components/LaborCalculator';
import DoubleLossCalculator from './components/DoubleLossCalculator';
import MoraleCalculator from './components/MoraleCalculator';
import Summary from './components/Summary';

// Main App Content
const AppContent = () => {
  const { state, actions } = useFunnel();

  const getCurrentScreenTitle = () => {
    switch(state.currentScreen) {
      case 1.5: return COPY.screenTitles.screen1_5;
      case 2: return COPY.screenTitles.screen2;
      case 3: return COPY.screenTitles.screen3;
      case 4: return COPY.screenTitles.screen4;
      case 5: return COPY.screenTitles.screen5;
      default: return "";
    }
  };

  const getCurrentScreenComponent = () => {
    switch(state.currentScreen) {
      case 1.5: return <PainScan />;
      case 2: return <LaborCalculator />;
      case 3: return <DoubleLossCalculator />;
      case 4: return <MoraleCalculator />;
      case 5: return <Summary />;
      default: return null;
    }
  };

  const getProgressPercentage = () => {
    switch(state.currentScreen) {
      case 1.5: return 20;
      case 2: return 40;
      case 3: return 60;
      case 4: return 80;
      case 5: return 100;
      default: return 0;
    }
  };

  const getScreenNumber = () => {
    switch(state.currentScreen) {
      case 1.5: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 4;
      case 5: return 5;
      default: return 0;
    }
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-gray-100/80 backdrop-blur-sm shadow-sm">
        <div className="w-full max-w-4xl mx-auto text-center p-4 md:p-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            How much is <span className="text-indigo-600">JOBSITE CLEANUP</span>
            <span className="block"><em className="italic">really</em> costing you?</span>
          </h1>
          {state.currentScreen > 1 && (
            <p className="mt-2 text-md text-gray-600 animate-fade-in">
              {COPY.header.subtitle}
            </p>
          )}
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto p-4">
        {/* Start Button */}
        {state.currentScreen === 1 && (
          <div className="text-center mt-4 mb-12 animate-fade-in">
            <button 
              onClick={() => actions.setCurrentScreen(1.5)} 
              className="bg-indigo-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {COPY.header.startButton}
            </button>
            <p className="text-base font-bold tracking-wider text-gray-600 mt-4">
              {COPY.header.noCommitment}
            </p>
          </div>
        )}

        {/* Screen Content */}
        {state.currentScreen > 1 && (
          <div className="animate-fade-in">
            {/* Progress Bar */}
            <div className="my-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-800">{getCurrentScreenTitle()}</h2>
                <p className="text-sm font-semibold text-gray-600">Screen {getScreenNumber()} of 5</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                  style={{width: `${getProgressPercentage()}%`}}
                />
              </div>
            </div>
            
            {/* Current Screen Component */}
            {getCurrentScreenComponent()}
          </div>
        )}
      </main>
    </div>
  );
};

// App wrapper with provider
const App = () => {
  return (
    <FunnelProvider>
      <AppContent />
    </FunnelProvider>
  );
};

export default App;
