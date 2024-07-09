import React, { useState, useContext } from 'react';
import { MdOutlineEmail, MdOutlineLock, MdVisibility } from 'react-icons/md';
import { FaRegUser } from "react-icons/fa6";
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { username, setUsername, setIsUserLoggedIn, setId } = useContext(UserContext);
  console.log("username via UserContext", username)
  const [name, setName] = useState(username);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/update`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const data = {
        name: name !== username ? name : undefined,
        email: email || undefined,
        oldPassword: oldPassword || undefined,
        newPassword: newPassword || undefined,
      };

      if (!oldPassword && newPassword) {
        setError('Old password is required to set a new password');
        setLoading(false);
        return;
      }

      const response = await axios.put(reqUrl, data);

      if (response.data.success) {
        if (newPassword) {
          localStorage.removeItem('token');
          setIsUserLoggedIn(false);
          setId(null);
          setUsername(null);
          navigate('/');
          toast.success('Password updated successfully. Please log in again.');
        } else {
          setUsername(name);
          toast.success('User profile updated successfully');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error while updating user details:', error);
      setError('Error while updating user profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <h2 className="mb-6 pl-8 text-xl font-[600]">Settings</h2>
      <form className="space-y-4 pl-8 w-[495px] h-[495px] flex flex-col gap-8" onSubmit={handleUpdate}>
        <div className='flex flex-col gap-4'>
          <div className="flex items-center border rounded-lg p-2">
            <FaRegUser size={18} color='#828282' className="mr-2" />
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full border-none outline-none" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <MdOutlineEmail size={20} color='#828282' className="mr-2" />
            <input 
              type="email" 
              placeholder="Update Email" 
              className="w-full border-none outline-none" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <MdOutlineLock size={20} color='#828282' className="mr-2" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Old Password" 
              className="w-full border-none outline-none" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <MdVisibility 
              size={20} 
              color='#828282' 
              className="cursor-pointer"
              onClick={togglePasswordVisibility} 
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <MdOutlineLock size={20} color='#828282' className="mr-2" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="New Password" 
              className="w-full border-none outline-none" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <MdVisibility 
              size={20} 
              color='#828282' 
              className="cursor-pointer"
              onClick={togglePasswordVisibility} 
            />
          </div>
        </div>
        
        <div className='mt-4'>
          <button 
            type="submit" 
            className="w-full bg-[#00ACC1] text-white rounded-3xl p-2 h-14"
            disabled={loading}
          >
            Update
          </button>
        </div>
        {error && (
          <p className="text-center mt-4 text-[#828282]">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Settings;
