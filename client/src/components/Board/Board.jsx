import React, { useState, useEffect, useContext } from 'react';
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


function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [users, setUsers] = useState([]); // Add this line
  const [filter, setFilter] = useState('This Week');
  const [loading, setLoading] = useState(true);

  const {username} = useContext(UserContext)
  console.log("Context in username : ",username)

  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const [collapseChecklists, setCollapseChecklists] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/all-tasks`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.get(reqUrl);
      console.log(response.data);
      const { data } = response.data;
      const segregatedTasks = {
        backlog: data.filter(task => task.status === 'backlog'),
        todo: data.filter(task => task.status === 'todo'),
        inProgress: data.filter(task => task.status === 'inProgress'),
        done: data.filter(task => task.status === 'done'),
      };
  
      setTasks(segregatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
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
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChecklist  = async (taskId, checklistIndex, checked) => {
    setLoading(true)
    
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/updateChecklist/${taskId}`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.put(reqUrl, { checklistIndex, checked });
      console.log('Checklist updated:', response.data);
      toast.success(`Task Updated Successfully`);

      fetchTasks();
      
    } catch (error) {
      console.log('Error updating task status:', error)
    }finally{
      setLoading(false);
    }
    
  };

  // Add this function to add a new user
  const addUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <header className="flex pb-4 border-b border-gray-200 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome! {username}</h2>
        </div>
        <div className="text-gray-600">12th Jan, 2024</div>
      </header>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold">Board</h2>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer" onClick={() => setIsAddPeopleModalOpen(true)}>
          <HiOutlineUserAdd className="mr-2" /> Add People
        </div>
        <div className="relative ml-auto">
          <select
            className="pl-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer bg-white "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
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
                    <IoMdAdd size={24} className="cursor-pointer" onClick={() => setIsModalOpen(true)} />
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
                    taskId={task._id} // Ensure taskId is passed correctly
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <CreateTaskModal closeModal={() => setIsModalOpen(false)} setIsModalOpen={setIsModalOpen} users={users} status={'todo'} fetchTasks={fetchTasks} />}
      {isAddPeopleModalOpen && <AddPeopleModal closeModal={() => setIsAddPeopleModalOpen(false)} addUser={addUser} setIsModalOpen={setIsAddPeopleModalOpen} />}
    </div>
  );
}

export default Board;
