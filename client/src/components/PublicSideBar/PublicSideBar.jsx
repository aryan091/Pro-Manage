import React from 'react'
import logo from '../../assets/icon.png'

const PublicSideBar = () => {
  return (
    <div className="w-[25%] h-full bg-white  fixed flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <img src={logo} alt="Logo" className="w-6 h-6 inline-block mr-2"/>
          <h1 className="inline-block text-lg font-semibold">Pro Manage</h1>
        </div>
        
    </div>
  )
}

export default PublicSideBar