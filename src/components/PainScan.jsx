// === PAIN SCAN COMPONENT ===

import React from 'react';
import { useFunnel } from '../context/FunnelContext';
import { COPY } from '../copy/en-US';

const PainScan = () => {
  const { state, actions } = useFunnel();
  const { painScanAnswers } = state;

  const handleAnswer = (questionId, answer) => {
    actions.setPainScanAnswer(questionId, answer);
  };

  const getAnsweredCount = () => {
    return Object.keys(painScanAnswers).length;
  };

  const allQuestionsAnswered = getAnsweredCount() === 5;

  const handleReveal = () => {
    actions.setCurrentScreen(2);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {COPY.painScan.title}
        </h2>
        <p className="text-lg text-gray-600">
          {COPY.painScan.subtitle}
        </p>
        <div className="mt-4">
          <span className="text-sm font-semibold text-indigo-600">
            {COPY.painScan.progressText.replace('{answered}', getAnsweredCount())}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {COPY.painScan.questions.map((question, index) => {
          const answer = painScanAnswers[question.id];
          const isAnswered = !!answer;
          
          return (
            <div key={question.id} className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-indigo-500">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    <span className="text-indigo-600 font-semibold text-sm block mb-1">
                      Question {index + 1} / 5
                    </span>
                    {question.text}
                  </p>
                  
                  {isAnswered && (
                    <div className={`mt-4 p-4 rounded-lg ${
                      answer === 'Yes' ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
                    }`}>
                      <p className="text-gray-800 text-sm">
                        {answer === 'Yes' ? question.yesResponse : question.noResponse}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleAnswer(question.id, 'Yes')} 
                    className={`w-24 font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg ${
                      answer === 'Yes' 
                        ? 'bg-green-600 text-white ring-2 ring-green-700 ring-offset-2' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-green-50'
                    }`}
                    aria-label={`Answer Yes to question ${index + 1}`}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleAnswer(question.id, 'No')} 
                    className={`w-24 font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg ${
                      answer === 'No' 
                        ? 'bg-gray-800 text-white ring-2 ring-gray-900 ring-offset-2' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                    aria-label={`Answer No to question ${index + 1}`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={handleReveal}
          disabled={!allQuestionsAnswered}
          className={`font-bold text-xl px-16 py-4 rounded-full shadow-lg transition-all duration-300 ${
            allQuestionsAnswered
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {COPY.painScan.revealButton}
        </button>
        
        {!allQuestionsAnswered && (
          <p className="text-sm text-gray-500 mt-2">
            Please answer all questions to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default PainScan;
