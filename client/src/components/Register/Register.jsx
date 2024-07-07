import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLock, MdVisibility } from 'react-icons/md';
import axios from "axios";
import { toast } from 'react-toastify';

function Register({ clickLogin, clickSignUp }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [statusMessage, setStatusMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const register = async ({ name, email, password, confirmPassword }) => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/user/register`;

      const response = await axios.post(reqUrl, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });

      console.log(response.data);
      setStatusMessage("User registered successfully");
      toast.success(`${name} Registered Successfully!`);
    } catch (error) {
      console.error(error);
      setStatusMessage(
        error.response?.data?.message || "User registration failed"
      );
    } finally {
      setLoading(false); 
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Perform the sign-up action here
      await register({ name, email, password, confirmPassword });
    }
  };

  return (
    <div className="flex flex-col w-[40%] h-full min-h-screen justify-center items-center gap-8">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <FaRegUser size={20} />
            </span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          {errors.name && <p className="text-red-500 text-centre text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <div className="flex">
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-r-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <MdVisibility
              size={20}
              color="#828282"
              className="cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && <p className="text-red-500 text-center text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineLock size={20} />
            </span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-r-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <MdVisibility
              size={20}
              color="#828282"
              className="cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-center text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="mt-6">
            <button
              type="submit"
              className="w-80 h-10 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize bg-teal-500 rounded-3xl hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
            >
              Register
            </button>
          </div>

          <p className="text-[#828282] text-md">Have no account yet?</p>

          <button
            type="button"
            className="w-80 h-12 px-4 py-2 text-sm font-medium tracking-wide text-teal-500 capitalize bg-white rounded-3xl border border-teal-500"
            onClick={clickLogin}
          >
            Log In
          </button>
        </div>
        {statusMessage && (
          <p className="text-center mt-4 text-[#828282]">{statusMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Register;
