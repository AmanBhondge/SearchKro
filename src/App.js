import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Dash-board/Categories/Categories';
import LegalPolicy from './components/Dash-board/Legal-policy/LegalPolicy';
import Location from './components/Dash-board/Location/Location';
import MainDashboard from './components/Dash-board/Main-dashboard/MainDashboard';
import Reportes from './components/Dash-board/Reportes/Reportes';
import Rating from './components/Dash-board/Rating/Rating';
import CreateAccount from './components/Auth/Create-account/CreateAccount';
import WelcomeBack from './components/Auth/Welcome-back/WelcomeBack';
import PasswordReset from './components/Auth/Password-reset/PasswordReset';
import ForgotPassword from './components/Auth/Forgot-password/ForgotPassword';
import VerifyOtp from './components/Auth/Verify-otp/VerifyOtp';
import VerifyForgotPasswordOtp from './components/Auth/Verify-forgot-password-otp/VerifyForgotPasswordOtp';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/legal-policy" element={<LegalPolicy />}></Route>
        <Route path="/location" element={<Location />}></Route>
        <Route path="/main-dashboard" element={<MainDashboard />}></Route>
        <Route path="/reportes" element={<Reportes />}></Route>
        <Route path="/rating" element={<Rating />}></Route>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/" element={<WelcomeBack />}></Route>
        <Route path="/verify-forgot-password-reset" element={<VerifyForgotPasswordOtp />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/password-reset" element={<PasswordReset />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
};

export default App;