import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import collapse from '../../assets/collapse.png';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoMdAdd } from "react-icons/io";
import './custom-scrollbar.css';
import TaskCard from '../TaskCard/TaskCard';
import { SECTION_MAPPING } from '../../utils/SectionMapping';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal';
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { TaskContext } from '../../context/TaskContext';
import { FILTER_MAPPING } from '../../utils/FilterMapping';

function Board() {
  const { tasks, refreshTasks,setFilter,filter } = useContext(TaskContext);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { username  } = useContext(UserContext);
  console.log("Username on board - ",username)
  const [collapseChecklists, setCollapseChecklists] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    refreshTasks(); // Pass the filter to refreshTasks
  }, []);

  const toggleCollapseChecklists = (column) => {
    setCollapseChecklists({
      ...collapseChecklists,
      [column]: !collapseChecklists[column],
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/update-status/${taskId}`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.put(reqUrl, { status: newStatus });
      toast.success(`Task Updated Successfully`);

      console.log(response.data);
      refreshTasks(); // Pass the filter to refreshTasks
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChecklist = async (taskId, checklistIndex, checked) => {
    setLoading(true);

    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/updateChecklist/${taskId}`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.put(reqUrl, { checklistIndex, checked });
      console.log('Checklist updated:', response.data);
      toast.success(`Task Updated Successfully`);

      refreshTasks(); // Pass the filter to refreshTasks

    } catch (error) {
      console.log('Error updating task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true)
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/delete/${taskId}`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.delete(reqUrl)
      console.log(response.data)
      toast.success(`Task Deleted Successfully`);

      refreshTasks(filter); // Pass the filter to refreshTasks
      
    } catch (error) {
      console.log('Error while deleting task status:', error);

    }finally{
      setLoading(false);

    }
  }


  const handleCreateTaskClick = () => {
    navigate('/app/dashboard/create-task');
  };

  const closeModal = () => {
    navigate('/app/dashboard');
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
  
    const parts = formatter.formatToParts(date);
    const month = parts.find(part => part.type === "month").value;
    const day = parts.find(part => part.type === "day").value;
    const year = parts.find(part => part.type === "year").value;
  
    const dayWithSuffix = getDayWithSuffix(day);
    return `${dayWithSuffix} ${month}, ${year}`;
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
  
  const currentDate = formatDateString(new Date().toISOString());

  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <header className="flex pb-4 border-b border-gray-200 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome! {username}</h2>
        </div>
        <div className="text-gray-600">{currentDate}</div>
      </header>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold">Board</h2>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer" onClick={() => setIsAddPeopleModalOpen(true)}>
          <HiOutlineUserAdd className="mr-2" /> Add People
        </div>
        <div className="relative ml-auto">
        <select
  className="pl-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer bg-white"
  value={filter}
  onChange={(e) => {
    const selectedFilter = e.target.value;
    console.log("Setting Filter to ", selectedFilter);
    setFilter(selectedFilter);
  }}
>
  {Object.entries(FILTER_MAPPING).map(([label, value]) => (
    <option key={value} value={value}>{label}</option>
  ))}
</select>

        </div>
      </div>
      <div className="cards-container flex-1 overflow-x-auto custom-scrollbar">
        <div className="cards flex space-x-4 w-max">
          {Object.keys(tasks).map(column => (
            <div key={column} className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{SECTION_MAPPING[column]}</h3>
                <div className='add-task-section flex gap-2'>
                  {column === 'todo' && (
                    <IoMdAdd size={24} className="cursor-pointer" onClick={handleCreateTaskClick} />
                  )}
                  <img src={collapse} alt="Collapse" className="w-6 h-6 cursor-pointer" onClick={() => toggleCollapseChecklists(column)} />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {tasks[column].map((task, index) => (
                  <TaskCard
                    key={index}
                    priority={task.priority}
                    title={task.title}
                    checklist={task.checklist}
                    date={task.dueDate}
                    section={task.status}
                    collapseChecklists={collapseChecklists[column]}
                    handleStatusChange={handleStatusChange}
                    updateChecklist={updateChecklist}
                    assignedTo={task.assignedTo}
                    taskId={task._id}
                    task={task}
                    deleteTask={deleteTask}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {location.pathname === '/app/dashboard/create-task' && (
        <CreateTaskModal closeModal={closeModal} users={users} status={'todo'} />
      )}
      {isAddPeopleModalOpen && <AddPeopleModal closeModal={() => setIsAddPeopleModalOpen(false)} />}
    </div>
  );
}

export default Board;
