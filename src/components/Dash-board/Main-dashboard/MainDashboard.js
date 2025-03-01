
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
      <div className="w-60 bg-black text-white">
        <Sidebar />
      </div>
      
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-[32px] font-bold ml-10">Dashboard</h1>
          
          <Navbar/>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col mb-8 md:flex-row justify-between items-center">
            <div className="">
              <DashCategories />
            </div>
            <div className="">
              <DashLocation />
            </div>
          </div>
          
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