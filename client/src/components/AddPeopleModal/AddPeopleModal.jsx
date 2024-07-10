import React, { useState, useContext } from 'react';
import EmailAddedModal from '../EmailAddedModal/EmailAddedModal';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddPeopleModal = ({ closeModal }) => {
  const [newUser, setNewUser] = useState('');
  const [isEmailAddedModalOpen, setIsEmailAddedModalOpen] = useState(false);
  const { setBoardUsers } = useContext(UserContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const addUser = async (email) => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/add-user`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.put(reqUrl, { email });

      if (response.data.success) {
        toast.success(`${response.data.data.name} added successfully`);
        setBoardUsers((prevUsers) => [...prevUsers, response.data.data._id]);
        setError('');
        setIsEmailAddedModalOpen(true); // Open the EmailAddedModal only on success
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log('Error while adding user:', error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = async () => {
    if (newUser.trim() === '') {
      setError('Email cannot be empty');
      return;
    }
    await addUser(newUser);
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
          onChange={(e) => {
            setNewUser(e.target.value);
            setError(''); // Clear error on input change
          }}
          className="w-full p-2 border border-gray-300 rounded-xl mb-8"
          placeholder="Enter the user email"
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
            disabled={loading}
          >
            Add User
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center font-bold text-sm mt-1">
            {error}
          </p>
        )}
      </div>
      {isEmailAddedModalOpen && (
        <EmailAddedModal
          closeModalEmail={closeModalEmail}
          addEmail={newUser}
        />
      )}
    </div>
  );
};

export default AddPeopleModal;
