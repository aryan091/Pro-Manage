import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import './custom-scrollbar.css';
import logo from '../../assets/icon.png';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ViewTaskShimmer from "../Shimmer/ViewTaskShimmer";
import './ViewTask.css'

const ViewTask = () => {
  const { taskId } = useParams();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);

  useEffect(() => {
    console.log('Fetching task data for taskId:', taskId);
    const fetchTaskData = async () => {
      setLoading(true);
      try {
        const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/view-task/${taskId}`;
        const response = await axios.get(reqUrl);
        console.log('Response data:', response.data);
        setTask(response.data.data); // Ensure this path is correct
      } catch (error) {
        console.error("Error while viewing task - ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [taskId]);

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

  if (loading) {
    return <ViewTaskShimmer />
  }

  if (!task) {
    return <div>Error loading task or task not found.</div>;
  }

  console.log("task in view task", task);

  return (
    <div className="view-task-container w-full h-full fixed p-4 mt-4 mb-4 mx-auto flex flex-col justify-start items-center">
      <div className="header-container w-full flex justify-start items-center mb-4">
        <img src={logo} alt="Logo" className="w-6 h-6 inline-block mr-2" />
        <h1 className="inline-block text-lg font-semibold">Pro Manage</h1>
      </div>

      <div className="view-task-content  max-h-[500px]  bg-white shadow-lg p-6 rounded-lg mt-4">
        <div className="view-task-card mb-4">
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

          <div className="view-task-checklist custom-scrollbar overflow-y-auto max-h-[300px]">
            {task.checklist.map((item, itemIndex) => (
              <div key={itemIndex} className="view-task-checklist-item flex items-center mb-2 border border-gray-300 p-4 rounded-lg">
                <input
                  id={`checklist-${itemIndex}`}
                  readOnly
                  type="checkbox"
                  className="view-task-checkbox mr-2"
                  checked={item.checked}
                />
                <span className="view-task-item-text text-sm">{item.item}</span>
              </div>
            ))}
          </div>
          <div className="view-task-footer flex items-center gap-4 text-sm mt-4">
            <span className="text-black text-sm font-semibold">Due Date</span>
            <button className="view-task-due-date px-4 py-2 bg-[#CF3636] text-white rounded-lg text-xs">{formatDateString(task.dueDate)}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
