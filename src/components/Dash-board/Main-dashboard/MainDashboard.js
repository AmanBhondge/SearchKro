import React, { useState } from 'react';
import Sidebar from '../../Common-components/Sidebar/Sidebar';
import DashCategories from './Dashboard-components/DashCategories';
import DashLocation from './Dashboard-components/DashLocation';
import DashLegalPolicy from './Dashboard-components/DashLegalPolicy';
import DashReport from './Dashboard-components/DashReport';
import DashRating from './Dashboard-components/DashRating';
import Navbar from '../../Common-components/Navbar/Navbar';

const MainDashboard = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      {/* Sidebar - fixed width */}
      <div className="w-60 bg-black text-white">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-8">
        {/* Top navigation bar */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <Navbar/>
        </div>
        
        {/* Dashboard content with mixed grid and flex layout */}
        <div className="p-8">
          {/* First row - grid layout for Categories and Location */}
          <div className="flex flex-col mb-8 md:flex-row justify-between items-center">
            <div className="">
              <DashCategories />
            </div>
            <div className="">
              <DashLocation />
            </div>
          </div>
          
          {/* Second row - flex layout for Legal Policy, Report, and Rating */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div >
              <DashLegalPolicy />
            </div>
            <div>
              <DashReport />
            </div>
            <div >
              <DashRating />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;