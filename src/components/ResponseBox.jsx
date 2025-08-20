// === RESPONSE BOX COMPONENT ===

import React from 'react';

const ResponseBox = ({ icon: Icon, text, source, type }) => {
  const isYes = type === 'Yes';
  const bgColor = isYes ? 'bg-green-50' : 'bg-amber-50';
  const borderColor = isYes ? 'border-green-200' : 'border-amber-200';
  const iconColor = isYes ? 'text-green-600' : 'text-amber-600';

  return (
    <div className={`mt-4 p-4 ${bgColor} ${borderColor} border rounded-lg flex items-start gap-4 animate-fade-in relative max-w-lg`}>
      <Icon className={`${iconColor} flex-shrink-0 w-7 h-7 mt-1`} />
      <div className="flex-grow">
        <p 
          className="text-gray-800 text-sm md:text-base pr-4 pb-4" 
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <p className="absolute bottom-2 right-3 text-xs text-gray-500 italic">
          {source}
        </p>
      </div>
    </div>
  );
};

export default ResponseBox;
