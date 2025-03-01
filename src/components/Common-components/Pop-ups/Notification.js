import React from 'react';
import { CgCloseO } from "react-icons/cg";
import { TbCircleCheck } from "react-icons/tb";
import CloseImg from "../../../Assets/Close Square.png";

const Notification = ({ isOpen, onClose, buttonRef }) => {
  if (!isOpen) return null;

  const getDropdownPosition = () => {
    if (!buttonRef.current) return {};

    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`
    };
  };

  return (
    <div className="main-cont fixed inset-0 z-30 bg-black/30">
      <div
        className="fixed z-40 w-[450px] rounded-lg bg-[#FCFEFF] border"
        style={getDropdownPosition()}
      >
        <div className="flex justify-between items-center p-4 border-b rounded border-[#232323]">
          <h2 className="text-[22px] font-nunito text-[#000000]">Notifications</h2>
          <button onClick={onClose}>
            <img src={CloseImg} alt="Close"
              className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-start p-4 rounded-lg shadow-sm gap-[16px] bg-[#FFFFFF]"
            >
              <TbCircleCheck
                className="w-5 h-5 mt-1" />
              <div className="ml-3 flex-1">
                <h3 className="font-semibold">Toast title</h3>
                <p className="text-sm text-gray-600">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the printing.

                </p>
              </div>
              <button>
                <CgCloseO
                  className="w-5 h-5 mt-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;