import React from 'react';
import './Shimmer.css'; // Ensure you have the necessary styles in this CSS file

const Shimmer = () => {
  return (
    <div className="task-card-shimmer p-4 bg-white rounded-lg shadow-sm relative animate-shimmer overflow-hidden">
      <div className="task-card-box flex items-center justify-between mb-2">
        <span className="shimmer-line h-4 w-32"></span>
        <span className="shimmer-line h-4 w-6"></span>
      </div>
      <div className="title min-w-60 max-h-[4.4rem] overflow-hidden">
        <h4 className="shimmer-line h-6 w-full mb-2"></h4>
        <h4 className="shimmer-line h-6 w-full"></h4>
      </div>
      <div className="flex items-center justify-between overflow-hidden">
        <p className="shimmer-line h-4 w-24 mb-4"></p>
        <div className="shimmer-line h-6 w-6 mb-4"></div>
      </div>
      <div className="checklist mb-4 overflow-hidden">
        <div className="flex items-center mb-2">
          <span className="shimmer-line h-4 w-full"></span>
        </div>
        <div className="flex items-center mb-2">
          <span className="shimmer-line h-4 w-full"></span>
        </div>
        <div className="flex items-center mb-2">
          <span className="shimmer-line h-4 w-full"></span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <button className="shimmer-line h-7 w-16 rounded-xl"></button>
        <div className="status-tiles flex space-x-2">
          <button className="shimmer-line h-7 w-16 rounded-xl"></button>
          <button className="shimmer-line h-7 w-16 rounded-xl"></button>
          <button className="shimmer-line h-7 w-16 rounded-xl"></button>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
