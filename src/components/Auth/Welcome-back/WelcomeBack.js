import React, { useContext, useState } from "react";
import img from "../../../Assets/Frameok.png";
import Logo from "../../../Assets/Google.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth-provider/AuthProvider";

const WelcomeBack = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const response = loginUser(email, password);

        if (response.success) {
            navigate("/main-dashboard");
        } else {
            setErrorMessage(response.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row 
            items-center justify-center 
            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 
            py-8 sm:py-10 md:py-12 lg:py-0">

            <div className="hidden lg:flex lg:w-1/2 
                items-center justify-center 
                px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl 
                    lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl">
                    <img
                        src={img}
                        alt="Welcome illustration"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            <div className="w-full lg:w-1/2 
                flex items-center justify-center 
                px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl 
                    lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 
                    space-y-6 sm:space-y-7 md:space-y-8">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 
                        xl:text-5xl 2xl:text-6xl 3xl:text-6xl 
                        font-bold lg:text-left 
                        text-gray-900 mb-6 sm:mb-8 md:mb-10">
                        Welcome back
                    </h1>

                    <form className="space-y-5 sm:space-y-6 md:space-y-7" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full 
                                    h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                                    text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-xl 
                                    p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-5 3xl:p-6 
                                    border border-gray-400 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full 
                                    h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                                    text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-2xl 
                                    p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-5 3xl:p-6 
                                    border border-gray-400 rounded-xl 
                                    focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 
                                text-sm sm:text-base md:text-lg lg:text-base 
                                xl:text-lg 2xl:text-xl 3xl:text-2xl 
                                text-center lg:text-left">
                                {errorMessage}
                            </p>
                        )}

                        <div className="text-right">
                            <Link to="/forgot-password">
                                <button
                                    type="button"
                                    className="text-sm sm:text-base md:text-lg lg:text-base 
                                        xl:text-lg 2xl:text-lg 3xl:text-xl 
                                        font-medium text-gray-600 underline 
                                        hover:text-gray-800 transition"
                                >
                                    Forgot password?
                                </button>
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full 
                                h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                                text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl 
                                bg-cyan-400 text-white rounded-xl 
                                hover:bg-cyan-500 transition 
                                font-semibold"
                        >
                            Log in
                        </button>

                        <div className="text-center lg:text-left 
                            text-sm sm:text-base md:text-lg lg:text-base 
                            xl:text-lg 2xl:text-[16px] 3xl:text-xl 
                            text-gray-600 ">
                            Don't have an account?
                            <Link to="/create-account">
                                <button
                                    type="button"
                                    className="ml-1 text-black underline 
                                        hover:text-gray-700 transition"
                                >
                                    Sign up
                                </button>
                            </Link>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                className="w-full 
                                    h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                                    text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl 
                                    font-medium border border-black rounded-xl 
                                    flex items-center justify-center space-x-2 
                                    hover:bg-gray-50 transition"
                            >
                                <img
                                    src={Logo}
                                    alt="Google logo"
                                    className="h-4 sm:h-5 md:h-6 lg:h-6 xl:h-7 2xl:h-8 3xl:h-9"
                                />
                                <span className="2xl:text-lg">Log in with Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WelcomeBack;