import React from 'react';
import { useNavigate } from 'react-router-dom';
import img2 from "../../../Assets/Reset.png";
import arrow from "../../../Assets/arrow.png";

const PasswordReset = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative w-full min-h-screen bg-white mx-auto max-w-screen-2xl">

      <div className="flex justify-center items-center min-h-screen lg:hidden px-4 sm:px-6 py-8">
        <div className="w-full mx-auto flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-semibold leading-tight text-gray-900 mb-8 sm:mb-12 text-center">Create New Password</h1>
          <p className="w-full font-['Nunito_Sans'] text-base sm:text-lg text-gray-600 mb-2 text-center">
            create password
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 sm:h-14 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full h-14 mt-5 sm:mt-6 bg-[#06C4D9] text-white font-semibold p-3 rounded-lg transition hover:bg-[#05b0c3]"
            >
              Submit
            </button>
          </form>

          <div className="mt-[25%] self-start">
            <button
              className="hover:text-gray-700 flex items-center"
              onClick={() => navigate("/forgot-password")}
            >
              <img src={arrow} alt='arrow' className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-base sm:text-lg text-black ml-1">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-full h-screen">
        <div className="flex h-full">

          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-semibold leading-tight text-gray-900 mb-12">Create New Password</h1>
              <p className="text-lg text-gray-600 mb-2 mt-4">
                create password
              </p>
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-14 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full h-16 mt-6 bg-[#06C4D9] text-white font-semibold p-3 rounded-lg transition hover:bg-[#05b0c3]"
                >
                  Submit
                </button>
              </form>

              <div className="mt-10 lg:mt-[300px]">
                <button
                  className="hover:text-gray-700 flex items-center"
                  onClick={() => navigate("/forgot-password")}
                >
                  <img src={arrow} alt='arrow' className="w-6 h-6" />
                  <span className="font-medium text-lg text-black ml-1">Back</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center p-8">
            <img src={img2} alt="Password Reset Illustration" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;