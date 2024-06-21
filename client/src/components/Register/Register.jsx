import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";


function Register() {
  return (
    <div className="flex flex-col w-[40%] h-full min-h-screen justify-center items-center gap-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form className="mt-6">
          <div className="mb-4">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <CiUser size={20} />
              </span>
              <input type="text" placeholder="Name" className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineEmail  size={20}/>
              </span>
              <input type="email" placeholder="Email" className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineLock size={20}/>
              </span>
              <input type="password" placeholder="Confirm Password" className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-600 border border-r-0 rounded-l-md">
              <MdOutlineLock size={20}/>
              </span>
              <input type="password" placeholder="Password" className="flex-1 w-80 h-10 px-4 py-2 text-sm border border-l-0 border-gray-300 rounded-r-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
          </div>

          <div className='flex flex-col gap-4 justify-center items-center'>
          <div className="mt-6">
            <button className="w-80 h-10 px-4 py-2 text-sm font-medium tracking-wide text-white capitalize bg-teal-500 rounded-3xl hover:bg-teal-600 focus:outline-none focus:bg-teal-600  ">Register</button>
          </div>

          <p className='text-[#828282] text-md'>Have no account yet?</p>

<button className="w-80 h-12 px-4 py-2 text-sm font-medium tracking-wide text-teal-500 capitalize bg-white rounded-3xl border border-teal-500 q  ">Log In</button>


          </div>

        </form>

        <p className="mt-6 text-sm text-center text-gray-700">Have an account? <a href="#" className="text-teal-500 hover:underline">Log in</a></p>
    </div>
  );
}

export default Register;