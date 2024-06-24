import React from 'react'
import PublicSideBar from '../PublicSideBar/PublicSideBar'
import ViewTask from '../ViewTask/ViewTask'
const PublicLayout = () => {
  return (
    <div className="main-layout flex w-full h-full">

      <PublicSideBar />
      <ViewTask />

    </div>
  )
}

export default PublicLayout