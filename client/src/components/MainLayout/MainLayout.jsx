import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout flex w-full h-full">

      <SideBar />
      <div className="content ">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout