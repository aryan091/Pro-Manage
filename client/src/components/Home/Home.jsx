import React, { useState } from 'react'
import SidePage from '../SidePage/SidePage'
import Login from '../Login/Login'
import Register from '../Register/Register'
import SideBar from '../SideBar/SideBar'
import MainLayout from '../MainLayout/MainLayout'
import { useNavigate } from 'react-router-dom';
const Home = () => {

  const [isSignUp, setIsSignUp] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();


  const clickLogin = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const clickSignUp = () => {
    setIsSignUp(true);
    setIsLogin(false);
  };


  return (
    <div className='home flex h-full w-full'>
      <SidePage />
      {isSignUp && <Register  clickLogin={clickLogin} clickSignUp={clickSignUp} />}
      {isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp} />}

    </div>
  )
}

export default Home