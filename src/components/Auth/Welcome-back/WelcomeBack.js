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
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-4 md:p-6 xl:p-10 2xl:p-16">
            {/* Image container - visible on large screens */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4 xl:p-10 2xl:p-16">
                <div className="relative">
                    <div className="flex items-center justify-center">
                        <img
                            src={img}
                            alt="Group"
                            className="w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Form container - centered on mobile and tablet */}
            <div className="w-full lg:w-1/2 max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto px-4 py-8 flex flex-col items-center lg:items-start">
                <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-6 text-center lg:text-left">
                    Welcome back
                </h1>

                <form className="space-y-6 w-full" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full h-12 md:h-14 2xl:h-16 text-base md:text-lg 2xl:text-xl p-3 md:p-4 2xl:p-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full h-12 md:h-14 2xl:h-16 text-base md:text-lg 2xl:text-xl p-3 md:p-4 2xl:p-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm md:text-base 2xl:text-lg mb-4">
                            {errorMessage}
                        </p>
                    )}

                    <div className="text-right">
                        <Link to="/forgot-password">
                            <button className="text-sm md:text-base 2xl:text-lg font-medium text-gray-600 underline"
                                type="button">
                                Forgot password?
                            </button>
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 md:h-14 2xl:h-16 text-base md:text-lg 2xl:text-xl p-3 bg-cyan-400 text-white rounded-xl hover:bg-cyan-600 transition"
                    >
                        Log in
                    </button>

                    <div className="text-center lg:text-left text-sm md:text-base 2xl:text-lg text-gray-600">
                        Don't have an account?
                        <Link to="/create-account">
                            <button
                                type="button"
                                className="ml-1 text-black underline hover:underline"
                            >
                                Sign up
                            </button>
                        </Link>
                    </div>

                    <div className="mt-6">
                        <button
                            type="button"
                            className="w-full h-12 md:h-14 2xl:h-16 p-3 md:p-4 text-base md:text-lg 2xl:text-xl font-medium border border-black rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
                        >
                            <img
                                src={Logo}
                                alt="Google logo"
                                className="h-5 md:h-6 2xl:h-8"
                            />
                            <span>Log in with Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WelcomeBack;