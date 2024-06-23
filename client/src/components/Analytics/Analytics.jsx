import React from 'react';

const Analytics = () => {
  return (
    <div className="analytics-container w-[75%] h-full fixed ml-[25%] p-4 bg-white">
      <h2 className="analytics-header text-2xl mb-6 pl-8 font-bold">Analytics</h2>
      <div className="analytics-cards flex gap-4 space-x-2 pl-8">
        <div className="analytics-card-1 bg-[#F9FCFF] shadow rounded p-8 w-[400px] h-52">
          <div className="task-list-1 space-y-2">
            <div className="task-item-1 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                Backlog Tasks
              </div>
              <span className="task-count font-bold">16</span>
            </div>
            <div className="task-item-2 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                To-do Tasks
              </div>
              <span className="task-count font-bold">14</span>
            </div>
            <div className="task-item-3 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                In-Progress Tasks
              </div>
              <span className="task-count font-bold">03</span>
            </div>
            <div className="task-item-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                Completed Tasks
              </div>
              <span className="task-count font-bold">22</span>
            </div>
          </div>
        </div>
        <div className="analytics-card-2 bg-[#F9FCFF] shadow rounded p-8 w-[400px] h-52">
          <div className="task-list-2 space-y-2">
            <div className="priority-item-1 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                Low Priority
              </div>
              <span className="priority-count font-bold">16</span>
            </div>
            <div className="priority-item-2 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                Moderate Priority
              </div>
              <span className="priority-count font-bold">14</span>
            </div>
            <div className="priority-item-3 flex justify-between items-center  pb-2">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                High Priority
              </div>
              <span className="priority-count font-bold">03</span>
            </div>
            <div className="priority-item-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="bullet w-3 h-3 bg-[#90C4CC] rounded-full mr-2"></span>
                Due Date Tasks
              </div>
              <span className="priority-count font-bold">03</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
