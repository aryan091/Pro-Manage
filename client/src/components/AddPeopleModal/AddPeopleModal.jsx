import React, { useState } from 'react';
import EmailAddedModal from '../EmailAddedModal/EmailAddedModal';

const AddPeopleModal = ({ closeModal, addUser }) => {
  const [newUser, setNewUser] = useState('');
  const [isEmailAddedModalOpen, setIsEmailAddedModalOpen] = useState(false);

  const handleAddEmail = () => {
    if (newUser.trim() === '') {
      // Validation for empty input
      return;
    }
    addUser(newUser); // Add the new user

    setIsEmailAddedModalOpen(true); // Open the EmailAddedModal
  };

  const closeModalEmail = () => {
    console.log('Closing Email Added Modal'); // Debugging log
    setIsEmailAddedModalOpen(false);
    closeModal(); // Close the AddPeopleModal as well
    setNewUser(''); // Clear the input field

  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[665px] h-[224px]">
        <div className="add-people-task-modal-content-text mb-4">
          <p className="text-value font-bold text-xl">Add people to the board</p>
        </div>
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-xl mb-8"
          placeholder="Enter the user name"
          required
        />
        <div className="add-people-task-modal-buttons flex text-center gap-2">
          <button
            className="w-80 h-11 border border-solid border-[#CF3636] text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg cursor-pointer"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="w-80 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold cursor-pointer"
            onClick={handleAddEmail}
          >
            Add User
          </button>
        </div>
      </div>
      {isEmailAddedModalOpen ? (
        <EmailAddedModal
          closeModalEmail={closeModalEmail}
          addEmail={newUser}
        />
      ) : (
        console.log('EmailAddedModal is not open') // Debugging log
      )}
    </div>
  );
};

export default AddPeopleModal;
