// === QUESTION CARD COMPONENT ===

import React from 'react';
import { COPY } from '../copy/en-US';
import { ResponseBox } from './ResponseBox';

const QuestionCard = ({ question, answer, onAnswer, questionNumber, totalQuestions }) => {
  const { id, text, icon: Icon } = question;

  const getButtonStyle = (option) => {
    if (answer === option) {
      return option === 'Yes' 
        ? 'bg-indigo-600 text-white ring-2 ring-indigo-700 ring-offset-2' 
        : 'bg-gray-800 text-white ring-2 ring-gray-900 ring-offset-2';
    }
    return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100';
  };

  // Get response data from copy library
  const getResponseData = (questionId, answer) => {
    const responseKey = `${questionId}_${answer.toLowerCase()}`;
    return COPY.responses[responseKey];
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-500 mb-6">
      <div className="flex justify-between items-start gap-4">
        <p className="text-xl md:text-2xl font-bold text-gray-800 text-left flex-1">
           <span className="text-indigo-600 font-semibold text-sm block mb-1">
             Question {questionNumber} / {totalQuestions}
           </span>
           {text}
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onAnswer(id, 'Yes')} 
            className={`w-28 font-bold py-2 rounded-xl shadow-lg transition-all duration-200 text-lg ${getButtonStyle('Yes')}`}
          >
            Yes
          </button>
          <button 
            onClick={() => onAnswer(id, 'No')} 
            className={`w-28 font-bold py-2 rounded-xl shadow-lg transition-all duration-200 text-lg ${getButtonStyle('No')}`}
          >
            No
          </button>
        </div>
      </div>

      {answer && (
        <ResponseBox 
          icon={Icon} 
          text={getResponseData(id, answer).text} 
          source={getResponseData(id, answer).source} 
          type={answer} 
        />
      )}
    </div>
  );
};

export default QuestionCard;
