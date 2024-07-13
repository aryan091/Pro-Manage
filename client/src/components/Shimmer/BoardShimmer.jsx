import React from 'react';
import './Shimmer.css'; // Ensure you have the necessary styles in this CSS file

const BoardShimmer = () => {
  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <header className="flex pb-4 border-b border-gray-200 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome! <span className="shimmer-line h-6 w-20"></span></h2>
        </div>
        <div className="text-gray-600"><span className="shimmer-line h-4 w-16"></span></div>
      </header>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold"><span className="shimmer-line h-8 w-24"></span></h2>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer">
          <span className="shimmer-line h-6 w-32"></span>
        </div>
        <div className="relative ml-auto">
          <select className="pl-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer bg-white">
            <option value=""><span className="shimmer-line h-6 w-24"></span></option>
          </select>
        </div>
      </div>
      <div className="cards-container flex-1 overflow-x-auto custom-scrollbar">
        <div className="cards flex space-x-4 w-max">
          {Array.from({ length: 4 }).map((_, columnIndex) => (
            <div key={columnIndex} className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold"><span className="shimmer-line h-6 w-24"></span></h3>
                <div className="add-task-section flex gap-2">
                  <span className="shimmer-line h-6 w-6"></span>
                  <span className="shimmer-line h-6 w-6"></span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {Array.from({ length: 2 }).map((_, taskIndex) => (
                  <div key={taskIndex} className="task-card-shimmer p-4 bg-white rounded-lg shadow-sm relative animate-shimmer overflow-hidden">
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardShimmer;
