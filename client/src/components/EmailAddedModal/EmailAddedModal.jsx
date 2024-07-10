import React from 'react';

const EmailAddedModal = ({ closeModalEmail, addEmail }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[665px] h-[224px]">
        <div className="add-people-task-modal-content-text text-center my-8">
          <p className="text-value font-bold text-xl">{addEmail} added to board</p>
        </div>
        <div className="add-people-task-modal-buttons flex justify-center text-center gap-2">
          <button
            className="w-80 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold cursor-pointer"
            onClick={closeModalEmail}
          >
            Okay, got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailAddedModal;
