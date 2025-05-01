import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './components/Dash-board/Categories/Categories';
import MainDashboard from './components/Dash-board/Main-dashboard/MainDashboard';
import Reportes from './components/Dash-board/Reportes/Reportes';
import Rating from './components/Dash-board/Rating/Rating';
import CreateAccount from './components/Auth/Create-account/CreateAccount';
import WelcomeBack from './components/Auth/Welcome-back/WelcomeBack';
import PasswordReset from './components/Auth/Password-reset/PasswordReset';
import ForgotPassword from './components/Auth/Forgot-password/ForgotPassword';
import VerifyOtp from './components/Auth/Verify-otp/VerifyOtp';
import VerifyForgotPasswordOtp from './components/Auth/Verify-forgot-password-otp/VerifyForgotPasswordOtp';
import User from './components/Dash-board/User-management/User';
import UserDetailsPage from './components/Dash-board/User-management/UserDetailPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SubCategories from './components/Dash-board/Categories/categoryComponents/Subcategories';
import EditCategory from './components/Dash-board/Categories/categoryComponents/EditCategory';
import Banner from './components/Dash-board/Banner/Banner';
import CategoryForm from './components/Dash-board/Categories/categoryComponents/CategoryForm';
import BannerDetail from './components/Dash-board/Banner/BannerDetail';
import Faq from './components/Dash-board/faq/Faq';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomeBack />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/verify-forgot-password-reset" element={<VerifyForgotPasswordOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/categories" element={<Categories />} />
          <Route path=':categoryId' element={<SubCategories/>}/>
          <Route path='/post-category' element={<CategoryForm/>}/>
          <Route path='/edit-category/:categoryId' element={<EditCategory/>}/>
          <Route path="/faq" element={<Faq />} />
          <Route path="/banner" element={<Banner/>} />
          <Route path='/banner/:id' element={<BannerDetail/>}/>
          <Route path="/main-dashboard" element={<MainDashboard />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;