import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import './custom-scrollbar.css';

const ViewTask = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Hero section",
      priority: "high",
      checklist: [
        {
          item: "Done Task",
          checked: true,
        },
        {
          item: "Task to be done",
          checked: false,
        },
        {
          item: "Task to be done",
          checked: false,
        },
        {
          item: "Task to be done",
          checked: false,
        },
        {
          item: "Task to be done",
          checked: false,
        },
        {
          item: "Task to be done",
          checked: false,
        },
        {
          item: "Task to be done",
          checked: false,
        }
      ],
      dueDate: "06/19/2024",
    },
  ]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    const formatter = new Intl.DateTimeFormat("en-US", options);

    const parts = formatter.formatToParts(date);

    const month = parts.find((part) => part.type === "month").value;
    const day = parts.find((part) => part.type === "day").value;

    const dayWithSuffix = getDayWithSuffix(day);

    return `${month} ${dayWithSuffix}`;
  };

  const getDayWithSuffix = (day) => {
    if (day === "11" || day === "12" || day === "13") {
      return `${day}th`;
    }

    const lastDigit = day.slice(-1);
    switch (lastDigit) {
      case "1":
        return `${day}st`;
      case "2":
        return `${day}nd`;
      case "3":
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return (
    <div className="view-task-container w-[75%] h-full fixed ml-[25%] p-4 mt-4 mb-4  flex justify-center items-center">

      <div className="view-task-content w-[654px] max-h-[782px] bg-white shadow-lg p-6 rounded-lg">
        {tasks.map((task, taskIndex) => (
          <div key={taskIndex} className="view-task-card mb-4">
            <div className="view-task-header flex items-center justify-between mb-4">
              <span
                className={`view-task-priority text-[8px] font-medium flex items-center ${
                  task.priority === "high"
                    ? "text-[#FF2473]"
                    : task.priority === "moderate"
                    ? "text-[#18B0FF]"
                    : "text-[#63C05B]"
                }`}
              >
                <FaCircle size={10} className="mr-1" /> {task.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <div className="view-task-title text-xl font-semibold mb-4">{task.title}</div>
            <p className="text-sm text-black mb-4">Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})</p>

            <div className="view-task-checklist custom-scrollbar overflow-y-auto max-h-[400px]">
              {task.checklist.map((item, itemIndex) => (
                <div key={itemIndex} className="view-task-checklist-item flex items-center mb-2 border border-gray-300 p-4 rounded-lg">
                  <input
                    id={`checklist-${taskIndex}-${itemIndex}`}
                    readOnly
                    type="checkbox"
                    className="view-task-checkbox mr-2"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(taskIndex, itemIndex)}
                  />
                  <span className="view-task-item-text text-sm">{item.item}</span>
                </div>
              ))}
            </div>
            <div className="view-task-footer flex items-center gap-4 text-sm mt-4">
              <span className="text-gray-500">Due Date</span>
              <button className="view-task-due-date px-4 py-2 bg-[#CF3636] text-white rounded-lg text-xs">{formatDateString(task.dueDate)}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTask;
