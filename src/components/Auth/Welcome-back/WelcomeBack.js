import React, { useState } from "react";
import img from "../../../Assets/Frameok.png";
import Logo from "../../../Assets/Google.png"
import { Link } from "react-router-dom";
const WelcomeBack = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="w-[1440px] h-[900px] flex items-center justify-center  p-4">
            <div className=" flex items-center justify-center p-8">
                <div className=" mt-10 relative">
                    <div className="flex items-center  mt-10 justify-center ">
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
                <h1 className="text-[50px]  mb-6"> Welcome back</h1>

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
                        <Link
                            to="/forgot-password">
                            <button className="text-sm font-medium text-gray-600 underline">
                                Forgot password?
                            </button>
                        </Link>
                    </div>

                    <Link to="/main-dashboard">
                        <button
                            type="submit"
                            className="w-[400px] h-[60px] text-[17px] p-3 bg-cyan-400  text-white rounded-xl hover:bg-cyan-600 transition"
                        >
                            Log in
                        </button>
                    </Link>

                    <div className="text-left text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/create-account">
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="ml-1 text-black text-u underline hover:underline"
                            >
                                Sign up
                            </button></Link>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-[400px] h-[60px] p-3  text-[17px] font-medium border  border-black  rounded-xl   flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
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
