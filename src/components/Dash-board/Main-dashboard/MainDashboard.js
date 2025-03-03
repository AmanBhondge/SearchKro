import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import DashCategories from "./Dashboard-components/DashCategories";
import DashLocation from "./Dashboard-components/DashLocation";
import DashLegalPolicy from "./Dashboard-components/DashLegalPolicy";
import DashReport from "./Dashboard-components/DashReport";
import DashRating from "./Dashboard-components/DashRating";
import Navbar from "../../Common-components/Navbar/Navbar";

const MainDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300 ">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1
              style={{ fontWeight: "700" }}
              className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 sm:ml-0"
            >
              Dashboard
            </h1>
          </div>
          <Navbar />
        </div>
        <div className="p-4 lg:p-8 flex-1 overflow-auto">
          <div className="w-full flex flex-wrap justify-between items-center">
            <div className="w-auto lg:w-[515px] h-[273px] mb-8">
              <DashCategories />
            </div>
            <div className="w-auto lg:w-[515px] h-[273px] mb-8">
              <DashLocation />
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between items-center">
            <div className="w-auto lg:w-[387px] h-[360px] mb-8 lg:mb-0">
              <DashLegalPolicy />
            </div>
            <div className="w-auto lg:w-[331px] h-[360px] mb-8 lg:mb-0">
              <DashReport />
            </div>
            <div className="w-full lg:w-[295px] h-[360px] mb-8 lg:mb-0">
              <DashRating />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
