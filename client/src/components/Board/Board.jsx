import React from 'react';
import collapse from '../../assets/collapse.png';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoMdAdd } from "react-icons/io";
import './custom-scrollbar.css'; // Ensure you import the custom CSS

function Board() {
  return (
    <div className="w-[75%] h-full fixed ml-[25%] p-4">
      <header className="flex pb-4 border-b border-gray-200 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome! Kumar</h2>
        </div>
        <div className="text-gray-600">12th Jan, 2024</div>
      </header>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-semibold">Board</h2>
        <div className="flex items-center px-4 py-2 text-sm text-gray-600 font-semibold rounded-md cursor-pointer ">
          <HiOutlineUserAdd className="mr-2" /> Add People
        </div>
      </div>
      <div className="cards-container flex-1 overflow-x-auto custom-scrollbar">
        <div className="cards flex space-x-4 w-max">
          <div className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold">Backlog</h3>
              <img src={collapse} alt="Collapse" className="w-6 h-6"/>
            </div>
          </div>
          <div className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold">To do</h3>
              <div className="flex space-x-2">
              <IoMdAdd size={24}/>

                <img src={collapse} alt="Collapse" className="w-6 h-6"/>
              </div>
            </div>
          </div>
          <div className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold">In progress</h3>
              <img src={collapse} alt="Collapse" className="w-6 h-6"/>
            </div>
          </div>
          <div className="card w-[360px] h-[536px] flex flex-col p-4 bg-[#F2F2F2] border rounded-lg">
            <div className="flex items-center justify-between pb-2 mb-4 border-b border-gray-300">
              <h3 className="text-lg font-semibold">Done</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
