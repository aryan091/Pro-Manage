import React, { useState } from 'react';
import collapse from '../../assets/collapse.png';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoMdAdd } from "react-icons/io";
import './custom-scrollbar.css';
import TaskCard from '../TaskCard/TaskCard';
import { SECTION_MAPPING } from '../../utils/SectionMapping';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal';

function Board() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPeopleModelOpen, setIsAddPeopleModelOpen] = useState(false);

  const toggleCollapseChecklists = (column) => {
    setCollapseChecklists({
      ...collapseChecklists,
      [column]: !collapseChecklists[column],
    });
  };

  const handleStatusChange = (taskTitle, newStatus) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };

      let taskToMove;
      for (const section in updatedTasks) {
        const taskIndex = updatedTasks[section].findIndex(task => task.title === taskTitle);
        if (taskIndex !== -1) {
          [taskToMove] = updatedTasks[section].splice(taskIndex, 1);
          break;
        }
      }

      if (taskToMove) {
        updatedTasks[newStatus].push(taskToMove);
      }

      return updatedTasks;
    });
  };

  const updateChecklist = (taskTitle, checklistIndex, checked) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };

      for (const section in updatedTasks) {
        const taskIndex = updatedTasks[section].findIndex(task => task.title === taskTitle);
        if (taskIndex !== -1) {
          updatedTasks[section][taskIndex].checklist[checklistIndex].checked = checked;
          break;
        }
      }

      return updatedTasks;
    });
  };

  const addTask = (newTask) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask]
    }));
    setIsModalOpen(false);  // Close modal after adding task
  };

  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <header className="flex pb-4 border-b border-gray-200 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome! Aryan Daftari</h2>
        </div>
        <div className="text-gray-600">12th Jan, 2024</div>
      </header>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold">Board</h2>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer">
          <HiOutlineUserAdd className="mr-2" onClick={() => setIsAddPeopleModelOpen(true)}/> Add People
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
                    section={column}
                    collapseChecklists={collapseChecklists[column]}
                    handleStatusChange={handleStatusChange}
                    updateChecklist={updateChecklist}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <CreateTaskModal closeModal={() => setIsModalOpen(false)} addTask={addTask} setIsModalOpen={setIsModalOpen} />}
      {isAddPeopleModelOpen && <AddPeopleModal closeModal={() => setIsAddPeopleModelOpen(false)} setIsModalOpen={setIsAddPeopleModelOpen} />}
    </div>
  );
}

export default Board;
