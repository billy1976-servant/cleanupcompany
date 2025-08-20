// === FUNNEL CONTEXT ===

import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  currentScreen: 1,
  answers: {},
  
  // Screen 1.5: Pain Scan (Yes/No questions)
  painScanAnswers: {},
  
  // Screen 2: Labor Cleanup Cost
  crewSize: 6,
  cleanupTime: 45,
  workDays: 22,
  totalHoursLost: 0,
  productiveHoursGained: 0,
  
  // Screen 3: Double Loss (Labor + Missed Profit)
  baseWage: 25,
  billableRate: 75,
  cleanupCoRate: 35,
  cleanupHoursMonth: 0,
  wagesPaidMonth: 0,
  profitMissedMonth: 0,
  totalDoubleLoss: 0,
  cleanupCoCost: 0,
  profitEarnedBack: 0,
  netGain: 0,
  
  // Screen 4: Morale & Rework
  enjoysCleanup: true,
  thoroughCleanup: true,
  callbacksReduced: true,
  moraleLossMonth: 0,
  
  // Screen 5: Summary
  totalMonthlyLoss: 0,
  
  // Local storage key
  storageKey: 'cleanup-funnel-data'
};

// Action types
const ACTIONS = {
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  SET_PAIN_SCAN_ANSWER: 'SET_PAIN_SCAN_ANSWER',
  SET_LABOR_DATA: 'SET_LABOR_DATA',
  SET_DOUBLE_LOSS_DATA: 'SET_DOUBLE_LOSS_DATA',
  SET_MORALE_DATA: 'SET_MORALE_DATA',
  UPDATE_SUMMARY: 'UPDATE_SUMMARY',
  RESET_FUNNEL: 'RESET_FUNNEL',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE'
};

// Reducer
const funnelReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case ACTIONS.SET_CURRENT_SCREEN:
      newState = { ...state, currentScreen: action.payload };
      break;
    
    case ACTIONS.SET_PAIN_SCAN_ANSWER:
      newState = {
        ...state,
        painScanAnswers: { 
          ...state.painScanAnswers, 
          [action.payload.questionId]: action.payload.answer 
        }
      };
      break;
    
    case ACTIONS.SET_LABOR_DATA:
      newState = { ...state, ...action.payload };
      break;
    
    case ACTIONS.SET_DOUBLE_LOSS_DATA:
      newState = { ...state, ...action.payload };
      break;
    
    case ACTIONS.SET_MORALE_DATA:
      newState = { ...state, ...action.payload };
      break;
    
    case ACTIONS.UPDATE_SUMMARY:
      newState = { ...state, ...action.payload };
      break;
    
    case ACTIONS.RESET_FUNNEL:
      newState = initialState;
      break;
    
    case ACTIONS.LOAD_FROM_STORAGE:
      newState = { ...state, ...action.payload };
      break;
    
    default:
      return state;
  }
  
  // Save to localStorage after every state change
  if (newState && newState.currentScreen > 1) {
    try {
      localStorage.setItem(newState.storageKey, JSON.stringify(newState));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
  
  return newState;
};

// Create context
const FunnelContext = createContext();

// Provider component
export const FunnelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(funnelReducer, initialState);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(state.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: parsed });
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
    }
  }, []);

  const actions = {
    setCurrentScreen: (screen) => dispatch({ type: ACTIONS.SET_CURRENT_SCREEN, payload: screen }),
    
    setPainScanAnswer: (questionId, answer) => dispatch({ 
      type: ACTIONS.SET_PAIN_SCAN_ANSWER, 
      payload: { questionId, answer } 
    }),
    
    setLaborData: (data) => dispatch({ 
      type: ACTIONS.SET_LABOR_DATA, 
      payload: data 
    }),
    
    setDoubleLossData: (data) => dispatch({ 
      type: ACTIONS.SET_DOUBLE_LOSS_DATA, 
      payload: data 
    }),
    
    setMoraleData: (data) => dispatch({ 
      type: ACTIONS.SET_MORALE_DATA, 
      payload: data 
    }),
    
    updateSummary: (data) => dispatch({ 
      type: ACTIONS.UPDATE_SUMMARY, 
      payload: data 
    }),
    
    resetFunnel: () => dispatch({ type: ACTIONS.RESET_FUNNEL })
  };

  return (
    <FunnelContext.Provider value={{ state, actions }}>
      {children}
    </FunnelContext.Provider>
  );
};

// Custom hook
export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
};
