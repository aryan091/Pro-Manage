import React from 'react'
import SideBar from '../SideBar/SideBar'
import Board from '../Board/Board'
const MainLayout = () => {
  return (
    <div className="main-layout flex w-full h-full">

      <SideBar />
      <Board />

    </div>
  )
}

export default MainLayout