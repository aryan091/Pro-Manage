import React, { useState , useContext } from 'react';
import { MdOutlineEmail, MdOutlineLock, MdVisibility } from 'react-icons/md';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


const Login = ({ clickLogin, clickSignUp }) => {

  const {  setBoardUsers , setIsUserLoggedIn , setUsername , setId } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const loginUser = async({ email, password }) => {
    setLoading(true);

    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
      const response = await axios.post(reqUrl, {
        email,
        password
      });

      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      setStatusMessage(response.data.data.message);
      toast.success(`${response.data.data.user.name} Logged In Successfully!`);
      setIsUserLoggedIn(true);
      setUsername(response.data.data.user.name);
      setId(response.data.data.user._id);
      setBoardUsers(response.data.data.user.board)

      navigate('/app/dashboard');


    } catch (error) {
      setIsUserLoggedIn(false);
      setUsername(null);
      setId(null);
      setBoardUsers([])

      console.error(error);
      setStatusMessage(
        error.response?.data?.message || "User Login failed"
      );
    } finally {
      setLoading(false); 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Perform the login action here
      await loginUser({ email, password });
    }
  };

  return (
    <div className='flex flex-col w-[40%] h-full min-h-screen justify-center items-center gap-8'>
      <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineEmail size={20} />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          {errors.email && <p className="text-red-500 text-center text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineLock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-r-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <MdVisibility
              size={20}
              color='#828282'
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <p className="text-red-500 text-center text-sm mt-1">{errors.password}</p>}
        </div>

        <div className='flex flex-col gap-4 justify-center items-center'>
          <div className="mt-6">
            <button type="submit" className="w-80 h-10 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize bg-teal-500 rounded-3xl hover:bg-teal-600 focus:outline-none focus:bg-teal-600">
              Log In
            </button>
          </div>

          <p className='text-[#828282] text-md'>Have no account yet?</p>

          <button type="button" className="w-80 h-12 px-4 py-2 text-sm font-medium tracking-wide text-teal-500 capitalize bg-white rounded-3xl border border-teal-500" onClick={clickSignUp}>
            Register
          </button>
        </div>
        {statusMessage && (
          <p className="text-center mt-4 text-[#828282]">{statusMessage}</p>
        )}

      </form>
    </div>
  );
};

export default Login;
