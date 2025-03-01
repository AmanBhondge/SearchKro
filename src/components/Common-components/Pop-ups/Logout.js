import React, { useEffect } from 'react';
import Object from "../../../Assets/Object.png";
import close from "../../../Assets/Close Square.png";

const Logout = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
 
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={(e) => e.stopPropagation()}
      ></div>
      
      <div 
        className="bg-white shadow-lg w-full max-w-lg px-6 relative"
      >
    
        <button 
          onClick={onClose}
          className="absolute w-6 h-6 top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <img src={close}/>
        </button>

      
        <div className="p-4 flex flex-col items-center">
        
          <div className="mb-4 mt-4 w-16 h-16 text-cyan-500">
          <img src={Object}/>
          </div>

      
          <h2 className="text-2xl font-bold text-center mb-2">You are Logged Out?</h2>
          <p className="text-center text-black mb-4 px-12">
            You are about to logout in 3 secs, Do you want to continue?
          </p>

        
          <button
            onClick={onConfirm}
            className="w-full mb-2 py-3 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;