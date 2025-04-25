import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Object from "../../../Assets/Object.png";
import close from "../../../Assets/Close Square.png";

const Logout = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLogout = () => {
    Cookies.remove("Token");
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-screen h-screen inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}></div>
      <div className="bg-white shadow-lg w-full max-w-80 xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 3xl:max-w-3xl 3xl:py-10 px-6 relative">
        <button onClick={onClose} className="absolute w-6 3xl:w-24 h-6 3xl:h-24 top-4 right-4 text-gray-500 hover:text-gray-700">
          <img src={close} className="3xl:w-12 h-6 3xl:h-12" />
        </button>
        <div className="p-4 flex flex-col items-center">
          <div className="mb-4 3xl:mb-8 mt-4 w-16 3xl:w-24 h-16 3xl:h-24 text-cyan-500">
            <img src={Object} className="3xl:w-24 3xl:h-24" />
          </div>
          <h2 className="text-3xl 3xl:text-5xl text-black font-bold text-center mb-2 3xl:mb-6">You are Logged Out?</h2>
          <p className="text-center 3xl:text-3xl text-black mb-4 3xl:mb-8 px-6 md:px-12">
            You are about to logout in 3 secs, Do you want to continue?
          </p>
          <button
            onClick={handleLogout}
            className="w-full 3xl:text-4xl mb-2 py-3 3xl:py-6 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
