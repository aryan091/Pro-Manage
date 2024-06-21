import React from 'react'
import SidePage from '../SidePage/SidePage'
import Login from '../Login/Login'
import Register from '../Register/Register'
import SideBar from '../SideBar/SideBar'
import MainLayout from '../MainLayout/MainLayout'
const Home = () => {
  return (
    <div className='home flex h-full w-full'>
      {/* <SidePage /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <SideBar /> */}
      <MainLayout />
    </div>
  )
}

export default Home