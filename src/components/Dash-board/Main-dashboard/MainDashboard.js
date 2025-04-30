import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import DailyAnalytics from "./Dashboard-components/DailyAnalytics";

const MainDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F4F7FF94] min-h-screen">
      <div className="md:relative md:h-auto fixed z-20 top-0 left-0 h-screen bg-[#191919] transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-0 md:ml-9">
            Dashboard
          </h1>
          <Navbar />
        </div>

        <div className="px-4 md:px-8 py-6 overflow-auto">
          <DailyAnalytics />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;