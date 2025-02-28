import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Common-components/Navbar/Navbar';
import Sidebar from './components/Common-components/Sidebar/Sidebar';
import Categories from './components/Dash-board/Categories/Categories';
import LegalPolicy from './components/Dash-board/Legal-policy/LegalPolicy';
import Location from './components/Dash-board/Location/Location';
import MainDashboard from './components/Dash-board/Main-dashboard/MainDashboard';

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Categories />
      <LegalPolicy />
      <Location />
      <MainDashboard />
      
    </div>
  );
};

export default App;