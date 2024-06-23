import React, { useState } from 'react';
import { MdOutlineEmail, MdOutlineLock, MdVisibility } from 'react-icons/md';
import { FaRegUser } from "react-icons/fa6";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <h2 className="mb-6 pl-8 text-xl font-[600]">Settings</h2>
      <form className="space-y-4 pl-8 w-[495px] h-[495px] flex flex-col gap-8">
        <div className='flex flex-col gap-4'>
          <div className="flex items-center border rounded-lg p-2">
            <FaRegUser size={18} color='#828282' className="mr-2" />
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full border-none outline-none" 
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <MdOutlineEmail size={20} color='#828282' className="mr-2" />
            <input 
              type="email" 
              placeholder="Update Email" 
              className="w-full border-none outline-none" 
            />
          </div>
          <div className="flex items-center border rounded-lg p-2">
            <MdOutlineLock size={20} color='#828282' className="mr-2" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Old Password" 
              className="w-full border-none outline-none" 
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
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
