import React from "react";
import Logo from "../../../Assets/Google.png"
import GroupImage from "../../../Assets/Group.png";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className=" w-[1440px] h-[900px] flex flex-row justify-center items-center  p-4">
        <div className="w-[400px] h-[471px] p-4 flex flex-col justify-center">
          <h1 className="text-[50px] text-[#000000] mb-10">Create account</h1>

          <p className="text-gray-600  text-[13px] mb-6">
            Let's get started with your 30 days trial
          </p>

          <form className="space-y-4 w-[400px]">
            <div>
              <input
                type="text"
                placeholder="Name"
                className=" p-3  w-[400px] h-[60px] border text-[17px] border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-[400px] h-[60px] p-3 text-[17px] border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-[400px] h-[60px] p-3 border text-[17px] border-gray-300 rounded-xl focus:outline-none"
              />
            </div>

            <Link to="/">
            <button
              type="submit"
              className="w-[400px] h-[60px] text-[17px] p-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
            >
              Create account
            </button>
            </Link>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Already have an account?
            <a href="" className="text-black ml-1 font-medium rounded-xl underline">
              Log in
            </a>
          </div>

          <div className=" mt-4 w-[400px]">
            <button className="w-[400px] h-[60px] p-3  text-[17px] font-medium border  border-black rounded-xl flex justify-center items-center space-x-2 hover:bg-gray-50 ">
                           <img src={Logo} />
              
              <span>Sign up with Google</span>
            </button>
          </div>
        </div>

        <div className=" ml-40 mt-10  items-center justify-center p-8">
            <div className="  mt-10 flex items-center justify-center ">
              <img
                src={GroupImage}
                alt="Group"
                className="w-[643px] h-[543.42px] "
              />
            </div>
          </div>
        </div>
  );
};

export default CreateAccount;