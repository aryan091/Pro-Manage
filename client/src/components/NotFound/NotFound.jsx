import NotFoundImg from '../../assets/NotFound.jpg'
import logo from '../../assets/icon.png'

import './NotFound.css'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {

    const navigate = useNavigate()
  return (
    <div className='notFound '>
        <div>
      </div>
      <p className='notFoundTxt'>We are sorry. The Web address you entered is not a functioning page on our site.</p>

        <img  className='notFoundImg' src={NotFoundImg} alt="" />

        <button className='notFoundBtn'
        onClick={() => navigate('/')}
        >Go Back To Home</button>
    </div>
  )
}

export default NotFound