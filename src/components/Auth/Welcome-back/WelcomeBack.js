import React, { useState } from "react";
import img from "../../../Assets/Frameok.png";
import Logo from "../../../Assets/Google.png"
const WelcomeBack = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-[1440px] h-[900px] flex items-center justify-center  p-4">
          <div className=" flex items-center justify-center p-8">
                <div className="relative">
                  <div className="flex items-center  justify-center ">
                    <img
                      src={img}
                      alt="Group"
                      className="w-[566.91px] h-[503.93px]"
                    />
                  </div>
      
                  <div className="absolute bottom-0 right-0"></div>
                </div>
              </div>
      <div className="w-[400px] h-[479px] flex flex-col ml-40 justify-center">
            <h1 className="text-[50px] font-bold mb-10"> Welcome back</h1>

            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-[400px] h-[60px] text-[17px] p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[400px] h-[60px] text-[17px] p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-gray-600 underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-[400px] h-[60px] text-[17px] p-3 bg-cyan-400  text-white rounded-xl hover:bg-cyan-600 transition"
              >
                Log in
              </button>

              <div className="text-left text-sm text-gray-600">
                Don't have an account?
                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-1 text-black text-u underline hover:underline"
                >
                  Sign up
                </button>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-[400px] h-[60px] p-3  text-[17px] font-500 border  border-black  rounded-xl   flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
                > 
              <img src={Logo} />
                  <span>Log in with Google</span>
                </button>
              </div>
              
            </form>
          </div>
        </div>
   
  );
};

export default WelcomeBack;