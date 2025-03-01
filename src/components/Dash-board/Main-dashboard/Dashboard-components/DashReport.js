import React from 'react';

const DashReport = () => {
  return (
    <div className="w-[331px] h-[360px] rounded-lg bg-white px-3 py-0 flex flex-col justify-start items-center">
      <div className="flex justify-between items-center w-[304px] h-[58px] border-b-2 mb-4">
        <h2 className="text-[18px] font-bold text-[#1A1919] ml-2">Reports</h2>
        <button className="bg-[#191919] text-white w-[60px] h-[24px] rounded-sm text-[12px] font-semibold">View</button>
      </div>
      
      <div className="px-2">
        <h2 style={{ fontWeight: "700" }} className="text-[17px] font-bold mb-4">Company Overview</h2>
        
        <p style={{ fontWeight: "400" }} className="text-black leading-[26.56px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 
          1500s, when an unknown printer took a galley of type and scrambled it to 
          make a type specimen book. It has survived not only five centuries.
        </p>
      </div>
    </div>
  );
};

export default DashReport;