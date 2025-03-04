import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "../../../Assets/Frame.png";
import arrow from "../../../Assets/arrow.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/password-reset");
  };
  
  return (
    <div className="relative w-full min-h-screen bg-white mx-auto max-w-screen-2xl">

      <div className="flex justify-center items-center min-h-screen lg:hidden px-4 sm:px-6 py-8">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-['Nunito_Sans'] text-gray-900 mb-4 sm:mb-6 text-center">Forgot Password?</h1>
          <p className="w-full font-['Nunito_Sans'] text-sm sm:text-base leading-tight sm:leading-relaxed text-gray-600 mb-5 sm:mb-6 text-center">
            Enter your email address you used when you joined and we'll send you a code to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 sm:h-14 mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full h-14 mt-5 sm:mt-6 font-['Nunito_Sans'] bg-[#06C4D9] text-white p-3 rounded-lg transition hover:bg-[#05b0c3]"
            >
              Continue
            </button>
          </form>
          
          <div className="mt-8 sm:mt-10 self-start">
            <Link to="/">
              <button className="hover:text-gray-700 flex items-center">
                <img src={arrow} alt='arrow' className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-base sm:text-lg text-black ml-1">Back</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full h-screen">
        <div className="flex h-full">

          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-6xl font-['Nunito_Sans'] text-gray-900 mb-6">Forgot Password?</h1>
              <p className="text-base xl:text-lg font-['Nunito_Sans'] text-gray-600 mb-6 max-w-md">
                Enter your email address you used when you joined and we'll send you a code to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-14 mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full h-16 mt-6 font-['Nunito_Sans'] bg-[#06C4D9] text-white p-3 rounded-lg transition hover:bg-[#05b0c3]"
                >
                  Continue
                </button>
              </form>
              
              <div className="mt-10 lg:mt-[300px] ">
                <Link to="/">
                  <button className="hover:text-gray-700 flex items-center">
                    <img src={arrow} alt='arrow' className="w-6 h-6" />
                    <span className="font-medium text-lg text-black ml-1">Back</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          

          <div className="w-1/2 flex items-center justify-center p-8">
            <img src={img1} alt="Forgot Password Illustration" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;