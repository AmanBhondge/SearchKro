import React from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "../../../Assets/Reset.png";
import arrow from "../../../Assets/arrow.png"


const PasswordReset = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative w-[1440px] h-[900px] bg-[#FFFFFF] mx-auto flex items-center justify-center">


      <div className="absolute w-[400px] h-[294px] top-[128px] left-[160px] gap-[25px] p-8 rounded-md">
        <h1 className="text-[50px] w-[600px] font-semibold leading-[68.2px]  text-gray-900 mb-16">Create New Password</h1>
        <p className="text-gray-600 mb-2 mt-4  text-lg">
          create password
        </p>
        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Password"
            className="w-[400px] h-[60px] mt-[10px] mr-[20px] mb-[10px] gap-20 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-[400px] h-[65px]  mt-[25px] bg-[#06C4D9] text-white font-semibold p-3 rounded-lg transition"
          >             Submit
          </button>
        </form>
      </div>


      <button
        className="absolute w-[66px] h-[24px] top-[780px] left-[160px] text-gray-500 hover:text-gray-700 flex items-center"
        onClick={() => navigate("/forgot-password")}
      >
        <img src={arrow} alt='arrow' className="w-[24px] h-[24px]" />  <span style={{ fontWeight: "500" }} className='text-[17px] text-black leading-[23.19px]'>Back</span>
      </button>


      <div className="absolute w-[562.72px] h-[502.67px] top-[198px] left-[751.53px]">
        <img
          src={img2}
          alt="Create Password Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default PasswordReset;