import React from "react";

const DeleteTaskModal = ({closeModal}) => {
  return (
    <div className="delete-task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="delete-task-modal-content bg-white rounded-xl shadow-lg w-80 h-52 p-6 flex flex-col justify-between relative">

        <div className="delete-task-modal-content-inner flex flex-col justify-between items-center gap-8">
            <div className="delete-task-modal-content-text  ">
                <p className="text-value text-sm font-bold">Are you sure you want to Delete?</p>
            </div>
            <div className="delete-task-modal-buttons flex flex-col text-center gap-2">
                <buttons className="w-72 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold cursor-pointer ">Yes, Delete</buttons>
                <buttons className="w-72 h-11 border border-solid border-[#CF3636]  text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg cursor-pointer" onClick={closeModal}>Cancel</buttons>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;