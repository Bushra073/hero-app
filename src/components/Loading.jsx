import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-64 w-full">
     
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 border-opacity-75"></div>
    </div>
  );
};

export default Loading;