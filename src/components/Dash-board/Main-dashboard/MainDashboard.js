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
    <div className="flex h-screen bg-[#F4F7FF94] overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="flex md:pt-12 py-4 3xl:py-8 flex-wrap w-full px-2 md:px-4 items-center justify-between border-b">
          <h1 className="text-[20px] md:text-[32px] font-bold ml-12 3xl:ml-6 md:ml-4">
            Dashboard
          </h1>
          <div className="ml-auto mr-2 md:mr-4">
            <Navbar />
          </div>
        </div>
        <div className="p-4 lg:p-8">
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
