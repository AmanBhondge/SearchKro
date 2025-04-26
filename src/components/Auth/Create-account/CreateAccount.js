import React, { useState } from "react";
import Logo from "../../../Assets/Google.png";
import GroupImage from "../../../Assets/Group.png";
import { Link, useNavigate } from "react-router-dom";
import { signUpApi } from "../../utils/AxiosApi";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAcceptTermConditions, setIsAcceptTermConditions] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!isAcceptTermConditions) {
      setErrorMessage("Please accept the terms and conditions to continue");
      return;
    }

    try {
      const requestBody = {
        emailPhone: email,
        password: password,
        roleId: 2,
        isAcceptTermConditions: isAcceptTermConditions
      };

      const response = await signUpApi(requestBody);

      setSuccessMessage("OTP sent successfully! Redirecting to verification page...");
      setErrorMessage("");

      setTimeout(() => {
        navigate("/verify-otp", { state: email });
      }, 2000);

    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.response?.data?.message || "Failed to create account. Please try again.");
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row 
      justify-center items-center 
      px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 
      py-8 sm:py-10 md:py-12 lg:py-0">

      <div className="w-full lg:w-1/2 
        flex flex-col items-center justify-center 
        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20">

        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl 
          lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 
          space-y-6 sm:space-y-5 md:space-y-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 
            xl:text-5xl 2xl:text-6xl 3xl:text-6xl 
            font-bold lg:text-left 
            text-gray-900 mb-4">
            Create account
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-xl 
            xl:text-2xl 2xl:text-lg 3xl:text-4xl 
            lg:text-left 
            mb-6 font-normal">
            Let's get started with your 30 days trial
          </p>

          {errorMessage && (
            <p className="text-red-500 
              text-sm sm:text-base md:text-lg lg:text-base 
              xl:text-lg 2xl:text-xl 3xl:text-2xl 
              text-center lg:text-left mb-4">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-500 
              text-sm sm:text-base md:text-lg lg:text-base 
              xl:text-lg 2xl:text-xl 3xl:text-2xl 
              text-center lg:text-left mb-4">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5 md:space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full 
                h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-5 3xl:p-6 
                border border-gray-400 rounded-lg 
                text-base sm:text-lg md:text-lg lg:text-lg 
                xl:text-xl 2xl:text-lg 3xl:text-2xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full 
                h-12 sm:h-13 md:h-14 lg:h-12 xl:h-12 2xl:h-16 3xl:h-18 
                p-3 sm:p-4 md:p-4 lg:p-4 xl:p-5 2xl:p-5 3xl:p-6 
                border border-gray-400 rounded-lg 
                text-base sm:text-lg md:text-lg lg:text-lg 
                xl:text-xl 2xl:text-lg 3xl:text-2xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={isAcceptTermConditions}
                  onChange={(e) => setIsAcceptTermConditions(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-500 text-sm sm:text-base">
                  I accept the{" "}
                  <a className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                  , which include consent to the collection and use of personal information as described in our Privacy Policy.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full 
                h-12 sm:h-13 md:h-14 lg:h-12 xl:h-12 2xl:h-16 3xl:h-18 
                bg-cyan-500 text-white rounded-lg 
                hover:bg-cyan-600 transition 
                text-base sm:text-lg md:text-lg lg:text-lg 
                xl:text-xl 2xl:text-xl 3xl:text-2xl 
                font-semibold"
            >
              Create account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 sm:mt-5 md:mt-6 
            text-sm sm:text-base md:text-base lg:text-base 
            xl:text-lg 2xl:text-[16px] 3xl:text-2xl 
            text-gray-500 text-center lg:text-left">
            Already have an account?
            <Link to="/" className="text-black ml-1 underline">
              Log in
            </Link>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <button
              type="button"
              className="w-full 
                h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                p-3 sm:p-4 md:p-4 
                text-base sm:text-lg md:text-lg lg:text-lg 
                xl:text-xl 2xl:text-xl 3xl:text-2xl 
                font-medium border border-black rounded-lg 
                flex items-center justify-center space-x-2 
                hover:bg-gray-50 transition"
            >
              <img
                src={Logo}
                alt="Google logo"
                className="h-4 sm:h-5 md:h-6 lg:h-5 xl:h-6 2xl:h-7 3xl:h-9"
              />
              <span className="2xl:text-lg">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 
        items-center justify-center 
        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20">
        <img
          src={GroupImage}
          alt="Group"
          className="w-full 
            max-w-md sm:max-w-xl md:max-w-xl lg:max-w-xl 
            xl:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl 
            object-contain"
        />
      </div>
    </div>
  );
};

export default CreateAccount;