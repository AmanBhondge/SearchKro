import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "../../../Assets/Frame.png";
import arrow from "../../../Assets/arrow.png";
import { forgetPassword } from "../../utils/AxiosApi"; // fix import here

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await forgetPassword({ email });
      console.log(res);
  
      if (res.status === 200) {
        setSuccessMessage("OTP sent successfully. Redirecting...");
        setTimeout(() => {
          navigate("/verify-forgot-password-reset", { state: { email } });
        }, 1500);
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white mx-auto max-w-screen-2xl p-[1.5%]">
      {/* mobile layout */}
      <div className="flex justify-center items-center min-h-screen lg:hidden px-[3%] sm:px-[5%] py-[2%]">
        <div className="w-full mx-auto flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 mb-[6%] sm:mb-[3%] text-center">Forgot Password?</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-[4%] text-center">
            Enter your email address and we'll send you a code to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-12 sm:h-14 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full h-14 mt-5 bg-[#06C4D9] text-white p-3 rounded-lg hover:bg-[#05b0c3]"
            >
              Continue
            </button>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
          </form>

          <div className="mt-[25%] self-start">
            <Link to="/">
              <button className="hover:text-gray-700 flex items-center">
                <img src={arrow} alt='arrow' className="w-5 h-5" />
                <span className="text-black ml-1">Back</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* desktop layout */}
      <div className="hidden lg:block w-full h-screen">
        <div className="flex h-full">
          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-6xl text-gray-900 mb-6">Forgot Password?</h1>
              <p className="text-base xl:text-lg text-gray-600 mb-6">
                Enter your email address and we'll send you a code to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full h-14 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-16 mt-6 bg-[#06C4D9] text-white p-3 rounded-lg hover:bg-[#05b0c3]"
                >
                  Continue
                </button>
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
              </form>

              <div className="mt-10">
                <Link to="/">
                  <button className="hover:text-gray-700 flex items-center">
                    <img src={arrow} alt='arrow' className="w-6 h-6" />
                    <span className="text-black ml-1">Back</span>
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