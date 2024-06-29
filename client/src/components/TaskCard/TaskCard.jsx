import React, { useState, useEffect, useRef } from 'react';
import { FaCircle } from "react-icons/fa";
import arrow from '../../assets/arrow.png';
import { STATUS_MAPPING } from '../../utils/StatusCardMapping';
import { Tooltip } from 'react-tooltip';
import DeleteTaskModal from '../DeleteTaskModal/DeleteTaskModal';
import './tooltip.css'; // Ensure this CSS file exists and contains necessary styles

function TaskCard({ priority, title, checklist, date, section, collapseChecklists, handleStatusChange, updateChecklist, assignedTo }) {
  const [isChecklistVisible, setIsChecklistVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    if (collapseChecklists) {
      setIsChecklistVisible(false);
    }
  }, [collapseChecklists]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  const toggleChecklist = () => {
    setIsChecklistVisible(!isChecklistVisible);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleCheckboxChange = (index) => {
    const newCheckedStatus = !checklist[index].checked;
    updateChecklist(title, index, newCheckedStatus);
  };

  const handleDeleteTask = () => {
    setIsDeleteModalOpen(true);
    setIsPopupVisible(false);
  };

  const getInitials = (name) => {
    const trimmedName = name.trim(); // Trim any leading or trailing whitespace
    const initials = trimmedName.slice(0, 2).toUpperCase(); // Take the first two characters and convert to uppercase
    return initials;
  };

  let statusTiles = [];
  switch (section) {
    case "backlog":
      statusTiles = ["inProgress", "todo", "done"];
      break;
    case "todo":
      statusTiles = ["backlog", "inProgress", "done"];
      break;
    case "inProgress":
      statusTiles = ["backlog", "todo", "done"];
      break;
    case "done":
      statusTiles = ["backlog", "todo", "inProgress"];
      break;
    default:
      statusTiles = [];
  }

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const dayWithSuffix = getDayWithSuffix(day);
    return `${month} ${dayWithSuffix}`;
  };

  const getDayWithSuffix = (day) => {
    if (day === '11' || day === '12' || day === '13') {
      return `${day}th`;
    }
    const lastDigit = day.slice(-1);
    switch (lastDigit) {
      case '1':
        return `${day}st`;
      case '2':
        return `${day}nd`;
      case '3':
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const today = new Date();
  const taskDueDate = new Date(date);

  let dueDateColorClass = '';
  let dueDateTextColorClass = '';

  if (section === 'done') {
    if (taskDueDate < today) {
      dueDateColorClass = 'bg-[#63C05B]'; 
      dueDateTextColorClass = 'text-white'; 
    } else {
      dueDateColorClass = 'bg-[#DBDBDB]'; 
      dueDateTextColorClass = 'text-[#5A5A5A]'; 
    }
  } else {
    if (taskDueDate < today) {
      dueDateColorClass = 'bg-[#CF3636]'; 
      dueDateTextColorClass = 'text-white font-bold'; 
    } else {
      dueDateColorClass = 'bg-gray-200'; 
      dueDateTextColorClass = 'text-[#5A5A5A] font-bold';
    }
  }

  return (
    <div className="task-card p-4 bg-white rounded-lg shadow-sm relative">
      <div className="task-card-box flex items-center justify-between mb-2">
        <span className={`text-[10px] font-medium flex items-center ${priority === 'high' ? 'text-[#FF2473]' : priority === 'moderate' ? 'text-[#18B0FF]' : 'text-[#63C05B]'}`}>
          <FaCircle size={10} className="mr-1" /> {priority.toUpperCase()} PRIORITY
          {assignedTo && (
            <span
              className="ml-2 bg-gray-200 text-gray-800 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              data-tooltip-id={`tooltip-${assignedTo}`}
              data-tooltip-content={assignedTo}
            >
              {getInitials(assignedTo)}
            </span>
          )}
          <Tooltip id={`tooltip-${assignedTo}`} place="top" type="dark" effect="solid">
            {assignedTo} {/* Content of the tooltip */}
          </Tooltip>
        </span>
        <span className="text-gray-500 cursor-pointer" onClick={togglePopup}>...</span>
      </div>
      {isPopupVisible && (
        <div ref={popupRef} className="popup-menu absolute top-6 right-0 bg-white shadow-md rounded-lg">
          <ul className="list-none m-0 p-2 w-44 h-28">
            <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-sm font-bold ">Edit</li>
            <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-sm font-bold">Share</li>
            <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-red-500 text-sm font-bold" onClick={handleDeleteTask}>Delete</li>
          </ul>
        </div>
      )}
      <div className='title min-w-60 max-h-[4.4rem] overflow-hidden'>
        <h4
          className="text-lg font-semibold mb-2"
          style={{
            maxHeight: '4.4rem',
            cursor: 'default',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'normal'
          }}
          data-tooltip-id={`tooltip-${title}`}
          data-tooltip-content={title}
        >
          {title}
        </h4>
        <Tooltip id={`tooltip-${title}`} place="top" type="dark" effect="solid" className='max-w-80 max-h-52'>
          {title} {/* Content of the tooltip */}
        </Tooltip>
      </div>
      <div className='flex items-center justify-between'>
        <p className="text-sm text-gray-500 mb-4">Checklist ({checklist.filter(item => item.checked).length}/{checklist.length})</p>
        <div className='w-6 h-6 mb-4 cursor-pointer' onClick={toggleChecklist}>
          <img src={arrow} alt="Toggle Checklist" className={`w-full h-full transform transition-transform ${isChecklistVisible ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isChecklistVisible && (
        <div className="checklist mb-4">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center mb-2 border border-gray-300 p-4 rounded-xl">
              <input
                type="checkbox"
                className="mr-2 bg-gray-300"
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <span className="text-sm">{item.item}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-sm">
        <button className={`w-16 h-7 text-[10px] rounded-xl ${dueDateColorClass} ${dueDateTextColorClass}`}>{formatDateString(date)}</button>
        <div className="status-tiles flex space-x-2 text-[10px] rounded-xl">
          {statusTiles.map((status, index) => (
            <button key={index} className="px-2 py-1 bg-gray-200 rounded-xl" onClick={() => handleStatusChange(title, status)}>{STATUS_MAPPING[status]}</button>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && <DeleteTaskModal closeModal={() => setIsDeleteModalOpen(false)} />}
    </div>
  );
}

export default TaskCard;
