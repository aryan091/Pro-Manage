import React, { useState, useRef, useEffect } from 'react';
import './custom-scrollbar.css';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskModal = ({ closeModal, addTask, users }) => {
  const [title, setTitle] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [checklist, setChecklist] = useState([{ item: '', checked: false }]);
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const datePickerRef = useRef(null);

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { item: '', checked: false }]);
  };

  const handleRemoveChecklistItem = (index) => {
    if (checklist.length > 1) {
      setChecklist(checklist.filter((_, i) => i !== index));
    }
  };

  const handleChecklistItemChange = (index, value) => {
    const updatedChecklist = checklist.map((item, i) => i === index ? { ...item, item: value } : item);
    setChecklist(updatedChecklist);
  };

  const handleChecklistItemCheck = (index, checked) => {
    const updatedChecklist = checklist.map((item, i) => i === index ? { ...item, checked } : item);
    setChecklist(updatedChecklist);
  };

  const checkedCount = checklist.filter(item => item.checked).length;

  const handleSaveTask = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare task object
    const newTask = {
      title,
      priority: selectedPriority,
      checklist,
      dueDate: formatDate(dueDate),
      assignedTo: selectedUser,
    };

    // Call addTask function passed from Board component
    addTask(newTask);

    // Close the modal
    closeModal();
  };

  const handleClickOutside = (event) => {
    if (isDatePickerOpen && datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setIsDatePickerOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDatePickerOpen) {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
          setIsDatePickerOpen(false);
        }
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDatePickerOpen]);

  const formatDate = (date) => {
    if (!date) return 'Select Due Date';

    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="task-modal-content bg-white rounded-lg shadow-lg w-[644px] h-[596px] p-6 flex flex-col justify-between relative">
        <form className="flex flex-col flex-grow">
          <div>
            <div className="task-title mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter Task Title"
                className="task-title-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="task-priority mb-4">
              <span className="text-gray-700 text-sm font-bold mb-2">
                Select Priority <span className="text-red-500">*</span>
              </span>
              <div className="task-priority-options inline-flex gap-2">
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    className="hidden"
                    checked={selectedPriority === 'high'}
                    onChange={() => handlePriorityChange('high')}
                  />
                  <span className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-36 h-8 ${selectedPriority === 'high' ? 'bg-red-100' : ''}`}>
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">HIGH PRIORITY</span>
                  </span>
                </label>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="moderate"
                    className="hidden"
                    checked={selectedPriority === 'moderate'}
                    onChange={() => handlePriorityChange('moderate')}
                  />
                  <span className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-44 h-8 ${selectedPriority === 'moderate' ? 'bg-blue-100' : ''}`}>
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">MODERATE PRIORITY</span>
                  </span>
                </label>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    className="hidden"
                    checked={selectedPriority === 'low'}
                    onChange={() => handlePriorityChange('low')}
                  />
                  <span className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-34 h-8 ${selectedPriority === 'low' ? 'bg-green-100' : ''}`}>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">LOW PRIORITY</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="task-assignee mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignee">
                Assign to
              </label>
              <select
                id="assignee"
                className="task-assignee-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
              >
                <option value="">Select an assignee</option>
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div className="task-checklist flex flex-col h-[16.5rem] mb-4 flex-grow overflow-y-auto custom-scrollbar">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Checklist ({checkedCount}/{checklist.length}) <span className="text-red-500">*</span>
              </span>
              <div className="task-checklist-items flex flex-col space-y-2">
                {checklist.map((item, index) => (
                  <div key={index} className="task-checklist-item flex items-center border border-gray-300 p-2 rounded-xl mb-2">
                    <input
                      type="checkbox"
                      className="task-checklist-checkbox form-checkbox border-none"
                      checked={item.checked}
                      onChange={(e) => handleChecklistItemCheck(index, e.target.checked)}
                    />
                    <input
                      type="text"
                      value={item.item}
                      onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                      className="ml-2 px-2 py-1 flex-grow w-[576px] h-5"
                    />
                    {checklist.length > 1 && (
                      <button type="button" className="task-checklist-delete ml-auto text-red-500" onClick={() => handleRemoveChecklistItem(index)}>
                        <RiDeleteBin6Fill color='red' />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="task-checklist-add mt-2 flex gap-1">
                <div>
                  <IoMdAdd size={16} color="#767575" className="cursor-pointer display-none mt-1" onClick={handleAddChecklistItem} />
                </div>
                <button type="button" className="text-[#767575] text-base font-semibold" onClick={handleAddChecklistItem}>Add New</button>
              </div>
            </div>
          </div>

          <div className="task-modal-actions mt-4 flex justify-between relative">
            <button
              type="button"
              className="task-select-due-date w-48 h-11 border border-solid-[2px] border-[#E2E2E2] hover:bg-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-semibold text-[#707070]"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              {formatDate(dueDate)}
            </button>
            <div className="task-modal-buttons space-x-4">
              <button type="button" className="task-cancel border border-solid border-[#CF3636] w-40 h-11 text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="task-save w-40 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold" onClick={handleSaveTask}>
                Save
              </button>
            </div>
          </div>
        </form>
        {isDatePickerOpen && (
          <div ref={datePickerRef} className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <DatePicker
              selected={dueDate}
              onChange={(date) => {
                setDueDate(date);
                setIsDatePickerOpen(false);
              }}
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTaskModal;
