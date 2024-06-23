import React from 'react'
import SideBar from '../SideBar/SideBar'
import Board from '../Board/Board'
import Analytics from '../Analytics/Analytics'
const MainLayout = () => {
  return (
    <div className="main-layout flex w-full h-full">

      <SideBar />
      {/* <Board /> */}
      <Analytics />
    </div>
  )
}

export default MainLayout