import React from 'react'
import logo from '../../assets/icon.png'
import database from '../../assets/database.png'
import boardIcon from '../../assets/board.png'
import setting from '../../assets/settings.png'
import { HiOutlineLogout } from "react-icons/hi";

const SideBar = () => {
    return (
      <div className="w-[25%] h-full bg-white border-r border-gray-200 fixed flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <img src={logo} alt="Logo" className="w-6 h-6 inline-block mr-2"/>
          <h1 className="inline-block text-lg font-semibold">Pro Manage</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#" className="flex items-center text-teal-600 bg-gray-100 p-2 rounded">
            <img src={boardIcon} alt="Board" className="w-6 h-6 mr-2"/> 
            <span className="font-bold">Board</span>
          </a>
          <a href="#" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
            <img src={database} alt="Analytics" className="w-6 h-6 mr-2"/> 
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
            <img src={setting} alt="Settings" className="w-6 h-6 mr-2"/> 
            <span>Settings</span>
          </a>
        </nav>
        <div className="p-4 mt-auto mb-8">
          <a href="#" className="flex items-center text-red-600 p-2 rounded hover:bg-gray-100">
            <HiOutlineLogout className="w-6 h-6 mr-2" /> 
            <span>Logout</span>
          </a>
        </div>
      </div>
    );
  }
  
  export default SideBar;
  