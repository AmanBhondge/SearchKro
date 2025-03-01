import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const DashLegalPolicy = () => {
  
  const [openItem, setOpenItem] = useState(0);

  
  const faqItems = [
    {
      question: "How do I book a service?",
      answer: "You can book a service by selecting your preferred category, choosing a time slot, and confirming the booking via the app."
    },
    {
      question: "How do I track my service provider?",
      answer: "You can track your service provider through the app's tracking feature once your booking is confirmed."
    },
    {
      question: "How do I rate and review a service?",
      answer: "After your service is complete, you can rate and review the service provider through the app's review section."
    }
  ];


  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

 
  return (
    <div className="w-[387px] h-[360px] rounded-lg bg-white px-3 py-0 flex flex-col justify-start items-center">
      <div className="flex justify-between items-center w-[350px] h-[58px] border-b-2 mb-4">
        <h2 className="text-[18px] font-bold text-[#1A1919] ml-2">Legal policy</h2>
        <button className="bg-[#191919] text-white w-[60px] h-[24px] rounded-sm text-[12px] font-semibold">View</button>
      </div>

      <div className="">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`rounded-md transition-all w-[350px] mb-4 flex flex-col justify-center items-start ${
              openItem === index ? "bg-[#191919] text-white h-[112px]" : "bg-[#E1E1E1] text-gray-800 h-[61px]"
            }`}
          >
            <div 
              className="flex justify-between items-center cursor-pointer w-full px-3"
              onClick={() => toggleItem(index)}
            >
              <h3 className="text-[17px] font-bold">{item.question}</h3>
              <span className="text-1xl">
                {openItem === index ? <RxCross2 /> : <IoIosArrowForward />}
              </span>
            </div>
            
            {openItem === index && (
              <div className='w-[308px] ml-3 flex justify-start items-center'>
                <p className='text-[13px] font-light'>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashLegalPolicy;