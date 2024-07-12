import  { useState , useContext, useEffect } from 'react'
import SidePage from '../SidePage/SidePage'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
const Home = () => {

  const [isSignUp, setIsSignUp] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const { isUserLoggedIn  } = useContext(UserContext);

  const navigate = useNavigate();


  const clickLogin = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };

  const clickSignUp = () => {
    setIsSignUp(true);
    setIsLogin(false);
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/app/dashboard');
    }
  }, [isUserLoggedIn]);




  return (
    <div className='home flex h-full w-full'>
      <SidePage />
      {isSignUp && <Register  clickLogin={clickLogin} clickSignUp={clickSignUp} />}
      {isLogin && <Login clickLogin={clickLogin} clickSignUp={clickSignUp} />}

    </div>
  )
}

export default Home