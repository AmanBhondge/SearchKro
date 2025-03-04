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
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9">
            Dashboard
          </h1>
          <Navbar />
        </div>
        <div className="p-4 lg:p-8 flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <DashCategories className="w-full" />
            <DashLocation className="w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-6 mt-6">
            <DashLegalPolicy className="w-full" />
            <DashReport className="w-full" />
            <DashRating className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
