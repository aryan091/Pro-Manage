import React, { useState, useRef, useEffect } from "react";
import "./custom-scrollbar.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from 'react-toastify';


const CreateTaskModal = ({ closeModal, addTask, users, status }) => {
  const [title, setTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [checklist, setChecklist] = useState([{ item: "", checked: false }]);
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading , setLoading] = useState(false);
  const datePickerRef = useRef(null);
  const userDropdownRef = useRef(null);

  const createTask = async (newTask) => {
    console.log("New Task:", newTask);
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/create`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.post(reqUrl, {
        title: newTask.title,
        priority: newTask.priority,
        checklist: newTask.checklist,
        dueDate: newTask.dueDate,
        assignedTo: newTask.assignedTo,
        status: newTask.status,
    
      });


      console.log(response.data);
      toast.success("Task created successfully");

    }catch (error) {
      console.error(error);
      error.response?.data?.message || "Task Creation failed"
      
    } finally {
      setLoading(false); 
    }
  };  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { item: "", checked: false }]);
  };

  const handleRemoveChecklistItem = (index) => {
    if (checklist.length > 1) {
      setChecklist(checklist.filter((_, i) => i !== index));
    }
  };

  const handleChecklistItemChange = (index, value) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, item: value } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleChecklistItemCheck = (index, checked) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, checked } : item
    );
    setChecklist(updatedChecklist);
  };

  const checkedCount = checklist.filter((item) => item.checked).length;

  const validateFields = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!selectedPriority) newErrors.priority = "Priority is required";
    if (checklist.length === 0 || checklist.some(item => !item.item.trim())) {
      newErrors.checklist = "Checklist items are required";
    }

    return newErrors;
  };

  const handleSaveTask = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const newTask = {
        title,
        priority: selectedPriority,
        checklist,
        dueDate: formatDate(dueDate),
        assignedTo: selectedUser,
        status,
      };

      console.log("Task Details:", newTask);

      await createTask(newTask);
      closeModal();
    }
  };

  const handleClickOutside = (event) => {
    if (
      (isDatePickerOpen && datePickerRef.current && !datePickerRef.current.contains(event.target)) ||
      (isUserDropdownOpen && userDropdownRef.current && !userDropdownRef.current.contains(event.target))
    ) {
      setIsDatePickerOpen(false);
      setIsUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDatePickerOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen, isUserDropdownOpen]);

  const formatDate = (date) => {
    if (!date) return "Select Due Date";
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const getInitials = (name) => {
    const trimmedName = name.trim();
    const initials = trimmedName.slice(0, 2).toUpperCase();
    return initials;
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownIconClick = () => {
    setIsUserDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="task-modal-content bg-white rounded-lg shadow-lg w-[644px] h-[596px] p-6 flex flex-col justify-between relative">
        <form className="flex flex-col flex-grow" onSubmit={handleSaveTask}>
          <div className="flex-grow">
            <div className="task-title mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter Task Title"
                className="task-title-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
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
                    checked={selectedPriority === "high"}
                    onChange={() => handlePriorityChange("high")}
                  />
                  <span
                    className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-36 h-8 ${
                      selectedPriority === "high" ? "bg-red-100" : ""
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">
                      HIGH PRIORITY
                    </span>
                  </span>
                </label>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="moderate"
                    className="hidden"
                    checked={selectedPriority === "moderate"}
                    onChange={() => handlePriorityChange("moderate")}
                  />
                  <span
                    className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-44 h-8 ${
                      selectedPriority === "moderate" ? "bg-blue-100" : ""
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">
                      MODERATE PRIORITY
                    </span>
                  </span>
                </label>
                <label className="inline-flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    className="hidden"
                    checked={selectedPriority === "low"}
                    onChange={() => handlePriorityChange("low")}
                  />
                  <span
                    className={`flex items-center px-2 py-2 border border-gray-300 rounded-lg w-34 h-8 ${
                      selectedPriority === "low" ? "bg-green-100" : ""
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="ml-2 text-gray-700 text-sm font-semibold">
                      LOW PRIORITY
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="task-assignee mb-4">
              <label
                className="inline text-gray-700 text-sm font-bold mb-2 mr-2"
                htmlFor="assignee"
              >
                Assign to
              </label>
              <div className="relative inline-block w-[88%]">
                <div
                  id="assignee"
                  className="task-assignee-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                  onClick={toggleUserDropdown}
                >
                  {selectedUser ? (
                    <>
                      <span className="task-assignee-dropdown-item-text flex-grow text-gray-700 ml-2">
                        {selectedUser}
                      </span>
                    </>
                  ) : (
                    "Select an assignee"
                  )}
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <RiArrowDropDownLine
                    size={20}
                    className={
                      users.length === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 cursor-pointer"
                    }
                    onClick={handleDropdownIconClick}
                  />
                </div>
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute mt-2 bg-[#FFFFFF] border border-gray-300 rounded-lg shadow-lg z-10 w-full max-h-48 overflow-y-auto custom-scrollbar"
                  >
                    {users.map((user) => (
                      <div
                        key={user}
                        className="flex items-center cursor-pointer px-4 py-2"
                        onClick={() => handleUserSelection(user)}
                      >
                        <div className="initials flex items-center justify-center w-12 h-12 rounded-full bg-[#FFEBEB] text-xl text-black font-semibold mr-2">
                          {getInitials(user)}
                        </div>
                        <span className="task-assignee-dropdown-item-text flex-grow text-gray-700 ml-2">
                          {user}
                        </span>
                        <button
                          className="assign-button ml-auto px-3 py-1 w-40 h-8 bg-[#FFFFFF] text-[#767575] rounded-lg border-[2px]"
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="task-checklist flex flex-col h-[17rem] mb-4 flex-grow overflow-y-auto custom-scrollbar">
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Checklist ({checkedCount}/{checklist.length}){" "}
                <span className="text-red-500">*</span>
              </span>
              <div className="task-checklist-items flex flex-col space-y-2">
                {checklist.map((item, index) => (
                  <div
                    key={index}
                    className="task-checklist-item flex items-center border border-gray-300 p-2 rounded-xl mb-2"
                  >
                    <input
                      type="checkbox"
                      className="task-checklist-checkbox form-checkbox border-none"
                      checked={item.checked}
                      onChange={(e) =>
                        handleChecklistItemCheck(index, e.target.checked)
                      }
                    />
                    <input
                      type="text"
                      value={item.item}
                      onChange={(e) =>
                        handleChecklistItemChange(index, e.target.value)
                      }
                      className="ml-2 px-2 py-1 flex-grow w-[576px] h-5"
                    />
                    {checklist.length > 1 && (
                      <button
                        type="button"
                        className="task-checklist-delete ml-auto text-red-500"
                        onClick={() => handleRemoveChecklistItem(index)}
                      >
                        <RiDeleteBin6Fill color="red" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="task-checklist-add mt-2 flex gap-1">
                <div>
                  <IoMdAdd
                    size={16}
                    color="#767575"
                    className="cursor-pointer display-none mt-1"
                    onClick={handleAddChecklistItem}
                  />
                </div>
                <button
                  type="button"
                  className="text-[#767575] text-base font-semibold"
                  onClick={handleAddChecklistItem}
                >
                  Add New
                </button>
              </div>
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 text-center font-bold text-sm mt-1">
              All * fields are mandatory
            </p>
          )}


          <div className="task-modal-actions mt-4 flex justify-between relative">
            <button
              type="button"
              className="task-select-due-date w-48 h-11 border border-solid-[2px] border-[#E2E2E2] hover:bg-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-semibold text-[#707070]"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              {formatDate(dueDate)}
            </button>
            <div className="task-modal-buttons space-x-4">
              <button
                type="button"
                className="task-cancel border border-solid border-[#CF3636] w-40 h-11 text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="task-save w-40 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        {isDatePickerOpen && (
          <div
            ref={datePickerRef}
            className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          >
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
