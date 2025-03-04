import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth-provider/AuthProvider";
import Logo from "../../../Assets/Google.png";
import GroupImage from "../../../Assets/Group.png";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const { registerUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const response = registerUser(name, email, password);

    if (response.success) {
      setSuccessMessage(response.message);
      setErrorMessage("");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setSuccessMessage("");
      setErrorMessage(response.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center p-4 md:p-6 xl:p-10 2xl:p-16">

      <div className="w-full lg:w-1/2 max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto px-4 py-8 flex flex-col items-center lg:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 text-center lg:text-left">
          Create account
        </h1>
        <p className="text-base md:text-lg 2xl:text-xl mb-6 text-center lg:text-left">
          Let's get started with your 30 days trial
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm md:text-base 2xl:text-lg mb-4 w-full">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm md:text-base 2xl:text-lg mb-4 w-full">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4 w-full">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 md:h-14 2xl:h-16 p-3 md:p-4 2xl:p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 md:h-14 2xl:h-16 p-3 md:p-4 2xl:p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 md:h-14 2xl:h-16 p-3 md:p-4 2xl:p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full h-12 md:h-14 2xl:h-16 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-lg md:text-xl 2xl:text-2xl"
          >
            Create account
          </button>
        </form>

        <div className="mt-4 text-sm md:text-base 2xl:text-lg text-gray-600 text-center lg:text-left w-full">
          Already have an account?
          <Link to="/" className="text-blue-500 ml-1 underline">
            Log in
          </Link>
        </div>

        <div className="mt-6 w-full">
          <button
            type="button"
            className="w-full h-12 md:h-14 2xl:h-16 p-3 md:p-4 text-base md:text-lg 2xl:text-xl font-medium border border-black rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
          >
            <img src={Logo} alt="Google logo" className="h-5 md:h-6 2xl:h-8" />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>


      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-4 xl:p-10 2xl:p-16">
        <img
          src={GroupImage}
          alt="Group"
          className="w-full max-w-xl xl:max-w-2xl 2xl:max-w-3xl object-contain"
        />
      </div>
    </div>
  );
};

export default CreateAccount;