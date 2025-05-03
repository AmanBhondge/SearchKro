import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img2 from "../../../Assets/Reset.png";
import arrow from "../../../Assets/arrow.png";
import { resetPassword } from '../../utils/AxiosApi';
import { Eye, EyeOff } from 'lucide-react'; 

const PasswordReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is missing. Please go back and try again.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        email: email,
        newPassword: password
      };
      
      console.log("Sending payload:", payload);
      
      const res = await resetPassword(payload);
      console.log("Reset password response:", res);

      if (res.status === 200 || res.data?.success) {
        setSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error resetting password. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative w-full min-h-screen bg-white mx-auto max-w-screen-2xl">
      {/* Mobile layout */}
      <div className="flex justify-center items-center min-h-screen lg:hidden px-4 sm:px-6 py-8">
        <div className="w-full mx-auto flex flex-col items-center">
          <h1 className="text-2xl sm:text-4xl font-semibold leading-tight text-gray-900 mb-8 sm:mb-12 text-center">Create New Password</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
            Enter your new password below
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 sm:h-14 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 sm:h-14 mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-14 mt-5 sm:mt-6 bg-[#06C4D9] text-white font-semibold p-3 rounded-lg transition hover:bg-[#05b0c3]"
            >
              Reset Password
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}

          <div className="mt-[25%] self-start">
            <button
              className="hover:text-gray-700 flex items-center"
              onClick={() => navigate("/verify-forgot-password-reset", { state: { email } })}
            >
              <img src={arrow} alt='arrow' className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="font-medium text-base sm:text-lg text-black ml-1">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block w-full h-screen">
        <div className="flex h-full">
          <div className="w-1/2 flex items-center justify-center p-8">
            <div className="max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-semibold leading-tight text-gray-900 mb-12">Create New Password</h1>
              <p className="text-base xl:text-lg text-gray-600 mb-6">
                Enter your new password below
              </p>
              <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={togglePasswordVisibility}
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-14 mt-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={toggleConfirmPasswordVisibility}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full h-16 mt-6 bg-[#06C4D9] text-white font-semibold p-3 rounded-lg transition hover:bg-[#05b0c3]"
                >
                  Reset Password
                </button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {success && <p className="text-green-500 mt-4">{success}</p>}

              <div className="mt-10">
                <button
                  className="hover:text-gray-700 flex items-center"
                  onClick={() => navigate("/verify-forgot-password-reset", { state: { email } })}
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