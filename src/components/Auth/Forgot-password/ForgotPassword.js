import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "../../../Assets/Frame.png";
import arrow from "../../../Assets/arrow.png"

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/password-reset");
  };

  return (
    <div className="relative w-[1440px] h-[900px] bg-[#FFFFFF] mx-auto flex items-center justify-center">
     
      <div className="absolute w-[500px] h-[294px] font-['Nunito_Sans'] top-[128px] left-[160px] gap-[25px]">
        <h1 className="text-6xl font-['Nunito_Sans'] gap-[10px] text-gray-900 mb-8">Forgot Password?</h1>
        
        
        <p className="w-[400px] h-[36px] font-['Nunito_Sans'] text-md leading-[17.73px] text-gray-600 mb-[25px]">
          Enter your email address you used when you joined and we’ll send
          you a code to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
        <input
            type="email"
            placeholder="Email"
            className="w-[400px]  h-[60px] mt-[10px] gap-[20px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-[400px] h-[65px]  mt-[25px] font-['Nunito_Sans']  bg-[#06C4D9] text-white  p-3 rounded-lg transition"
          >
            Continue
          </button>
        </form>
      </div>
    
    <div>
      
    <Link to="/">
    <button className="absolute w-[66px] h-[24px] top-[780px] left-[160px] hover:text-gray-700 flex items-center">
    <img src={arrow} alt='arrow' className="w-[24px] h-[24px]"/>  <span style={{fontWeight:"500"}} className='text-[17px] text-black leading-[23.19px]'>Back</span>
    </button>
    </Link>

    
    <div className="absolute w-[582.08px] h-[544.23px] top-[178px] left-[728px]">
      <img
        src={img1}
        alt="Forgot Password Illustration"
        className="w-full h-full object-contain"
      />
    </div>
    </div>
    </div>
  );
};

export default ForgotPassword;