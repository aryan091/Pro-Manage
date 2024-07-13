import React, { useContext } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import logo from '../../assets/icon.png';
import database from '../../assets/database.png';
import boardIcon from '../../assets/board.png';
import setting from '../../assets/settings.png';
import Shimmer from '../Shimmer'; // Adjust the path as per your file structure

const SideBar = () => {
  const { setUsername, setId, setIsUserLoggedIn , loading } = useContext(UserContext);
  const navigate = useNavigate();

  // Shimmer effect for each sidebar item
  const renderShimmer = () => (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex items-center text-teal-600 bg-gray-100 p-2 rounded">
        <Shimmer className="w-6 h-6 mr-2" />
        <Shimmer className="font-bold" />
      </div>
      <div className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
        <Shimmer className="w-6 h-6 mr-2" />
        <Shimmer />
      </div>
      <div className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
        <Shimmer className="w-6 h-6 mr-2" />
        <Shimmer />
      </div>
    </div>
  );

  return (
    <div className="w-[25%] h-full bg-white border-r border-gray-200 fixed flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Shimmer className="w-6 h-6 inline-block mr-2" />
        <Shimmer className="inline-block text-lg font-semibold" />
      </div>
      {loading ? renderShimmer() : (
        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/app/dashboard" className="flex items-center text-teal-600 bg-gray-100 p-2 rounded">
            <img src={boardIcon} alt="Board" className="w-6 h-6 mr-2" />
            <span className="font-bold">Board</span>
          </Link>
          <Link to="/app/analytics" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
            <img src={database} alt="Analytics" className="w-6 h-6 mr-2" />
            <span>Analytics</span>
          </Link>
          <Link to="/app/settings" className="flex items-center text-gray-700 p-2 rounded hover:bg-gray-100">
            <img src={setting} alt="Settings" className="w-6 h-6 mr-2" />
            <span>Settings</span>
          </Link>
        </nav>
      )}
      <div className="p-4 mt-auto mb-8">
        {loading ? (
          <div className="flex items-center text-red-600 p-2 rounded hover:bg-gray-100">
            <Shimmer className="w-6 h-6 mr-2 cursor-pointer" />
            <Shimmer className="cursor-pointer" />
          </div>
        ) : (
          <div className="flex items-center text-red-600 p-2 rounded hover:bg-gray-100">
            <HiOutlineLogout className="w-6 h-6 mr-2 cursor-pointer" onClick={() => {
              localStorage.removeItem('token');
              setIsUserLoggedIn(false);
              setId(null);
              setUsername(null);
              navigate('/');
            }} />
            <span className='cursor-pointer' onClick={() => {
              localStorage.removeItem('token');
              setIsUserLoggedIn(false);
              setId(null);
              setUsername(null);
              navigate('/');
            }}>Logout</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
