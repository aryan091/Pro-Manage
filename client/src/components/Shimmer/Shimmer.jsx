import React from 'react';
import './Shimmer.css'; // Create and import your shimmer styles

const Shimmer = () => {
  return (
    <div className="shimmer-task-card p-4 bg-white rounded-lg shadow-sm relative">
      <div className="shimmer-task-card-box flex items-center justify-between mb-2">
        <div className="shimmer-priority" />
        <div className="shimmer-assigned-to" />
      </div>
      <div className='shimmer-title min-w-60 max-h-[4.4rem] overflow-hidden'>
        <div className="shimmer-title-line" />
      </div>
      <div className='flex items-center justify-between'>
        <div className="shimmer-checklist-count" />
        <div className='shimmer-toggle-checklist' />
      </div>
      <div className="shimmer-checklist mb-4">
        <div className="shimmer-checklist-item" />
        <div className="shimmer-checklist-item" />
        <div className="shimmer-checklist-item" />
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="shimmer-due-date" />
        <div className="shimmer-status-tiles flex space-x-2">
          <div className="shimmer-status-tile" />
          <div className="shimmer-status-tile" />
          <div className="shimmer-status-tile" />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
