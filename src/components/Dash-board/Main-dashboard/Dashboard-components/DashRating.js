import React from 'react';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";


const DashRating = () => {
  const positivePercentage = 50;
  const negativePercentage = 50;

  return (
    <div className="w-[295px] h-[360px] rounded-lg bg-white px-3 py-0 flex flex-col justify-start items-center">
      <div className="flex justify-between items-center w-[268px] h-[58px] mb-4">
        <h2 style={{ fontWeight: "700" }} className="text-[20px]">Rating</h2>
        <button className="bg-[#191919] text-white w-[60px] h-[24px] rounded-sm text-[12px] font-semibold">View</button>
      </div>
      
      <div className='w-[244px] h-[240px]'>
      <div className="flex justify-center ">
        <div className="relative w-[160px] h-[160px]">
          {/* Circle background */}
          <div className="absolute inset-0 rounded-full bg-white"></div>
          
          {/* Green portion */}
          <svg viewBox="0 0 36 36" className="absolute inset-0">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#52C93F"
              strokeWidth="5"
              strokeDasharray={`${positivePercentage}, 100`}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Red portion */}
          <svg viewBox="0 0 36 36" className="absolute inset-0">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#FF2727"
              strokeWidth="5"
              strokeDasharray={`${negativePercentage}, 100`}
              strokeLinecap="round"
              strokeDashoffset={`-${positivePercentage}`}
            />
          </svg>
          
          {/* Inner white circle for donut effect */}
          <div className=" inset-8 bg-white rounded-full"></div>
        </div>
      </div>
      
      <div className="space-y-2 mt-[8px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#52C93F] mr-3"></div>
            <span style={{ fontWeight: "400" }} className="text-[#1A1919] text-[16px] leading-[24px]">Positive</span>
          </div>
          <div className="flex items-center">
            <span style={{ fontWeight: "400" }} className=" mr-2 text-[#1A1919] text-[16px] leading-[24px]">50%</span>
            <FaArrowUp className='w-[14px] h-[16px] text-[#52C93F]' />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-[#FF2727] mr-3"></div>
            <span style={{ fontWeight: "400" }} className="text-[#1A1919] text-[16px] leading-[24px]">Negative</span>
          </div>
          <div className="flex items-center">
            <span style={{ fontWeight: "400" }} className=" mr-2 text-[#1A1919] text-[16px] leading-[24px]">50%</span>
            <FaArrowDown className='w-[14px] h-[16px] text-[#FF2727]' />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashRating;