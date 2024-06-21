import React from 'react';
import astronaut from '../../assets/astronaut.png'; // Make sure to place your image in the src folder

function SidePage() {
  return (
    <div className="flex flex-col w-[60%] h-full min-h-screen bg-teal-500 justify-center items-center ">
      <div className="banner w-[400px] h-[400px] ">
        <img src={astronaut} alt="astronaut" />
      </div>
      <div className="welcome  text-white text-center">
        <p className='text-3xl text-white text-center'>Welcome aboard my friend</p>
        <span className='text-md text-white text-center'>just a couple of clicks and we start</span>
      </div>
    </div>
  );
}

export default SidePage;
