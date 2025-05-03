import React, { useState, useEffect } from "react";
import img from "../../../Assets/Frameok.png";
import Logo from "../../../Assets/Google.png";
import { Link, useNavigate } from "react-router-dom";
import { signInApi } from "../../utils/AxiosApi";
import GetDeviceToken from "../../notification/GetDeviceToken";

const WelcomeBack = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const navigate = useNavigate();

  // Get FCM token on component mount
  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await GetDeviceToken();
        console.log("FCM Token fetched:", token);
        setFcmToken(token || "");
      } catch (error) {
        console.error("Error fetching FCM token:", error);
        setFcmToken("");
      }
    };

    fetchFcmToken();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the stored FCM token instead of fetching it again
      const requestBody = {
        emailPhone: email,
        password: password,
        roleId: 2,
        fcmToken: fcmToken,
      };

      console.log("Sending request with body:", requestBody);

      const response = await signInApi(requestBody);
      console.log("🧑‍💻 Login Success:", response.data);

      if (response.data && response.data.token) {
        const Cookies = (await import("js-cookie")).default;
        Cookies.set("Token", response.data.token);

        navigate("/main-dashboard");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row 
            items-center justify-center 
            px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 
            py-8 sm:py-10 md:py-12 lg:py-0"
    >
      <div
        className="hidden lg:flex lg:w-1/2 
                items-center justify-center 
                px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20"
      >
        <div
          className="w-full max-w-md sm:max-w-lg md:max-w-xl 
                    lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl"
        >
          <img
            src={img}
            alt="Welcome illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div
        className="w-full lg:w-1/2 
                flex items-center justify-center 
                px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20"
      >
        <div
          className="w-full max-w-md sm:max-w-lg md:max-w-xl 
                    lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl 
                    space-y-6 sm:space-y-7 md:space-y-8"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 
                        xl:text-5xl 2xl:text-6xl 3xl:text-6xl 
                        font-bold lg:text-left 
                        text-gray-900 mb-6 sm:mb-8 md:mb-10"
          >
            Welcome back
          </h1>

          <form
            className="space-y-5 sm:space-y-6 md:space-y-7"
            onSubmit={handleLogin}
          >
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
              <p
                className="text-red-500 
                                text-sm sm:text-base md:text-lg lg:text-base 
                                xl:text-lg 2xl:text-xl 3xl:text-2xl 
                                text-center lg:text-left"
              >
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
              disabled={isLoading}
              className="w-full 
                                h-12 sm:h-13 md:h-14 lg:h-14 xl:h-15 2xl:h-16 3xl:h-18 
                                text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl 
                                bg-cyan-400 text-white rounded-xl 
                                hover:bg-cyan-500 transition 
                                font-semibold
                                flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Log in"
              )}
            </button>

            <div
              className="text-center lg:text-left 
                            text-sm sm:text-base md:text-lg lg:text-base 
                            xl:text-lg 2xl:text-[16px] 3xl:text-xl 
                            text-gray-600 "
            >
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
