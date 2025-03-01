import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { GoShieldLock } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import Logo from '../../../Assets/Logo.png';

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  
  // Update active state based on current path when component mounts or location changes
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) setActive('Dashboard');
    else if (path.includes('categories')) setActive('Categories');
    else if (path.includes('reportes')) setActive('Reports');
    else if (path.includes('policy')) setActive('Legal Policy');
    else if (path.includes('location')) setActive('Location');
    else if (path.includes('rating')) setActive('Rating');
    else setActive('Dashboard'); // Default to Dashboard if path doesn't match
  }, [location]);

  const menuItems = [
    { name: 'Dashboard', icon: <RxDashboard size={22} />, navigate: '/main-dashboard' },
    { name: 'Categories', icon: <TbCategory2 size={22} />, navigate: '/categories' },
    { name: 'Reports', icon: <MdOutlineReportGmailerrorred size={22} />, navigate: '/reportes' },
    { name: 'Legal Policy', icon: <GoShieldLock size={22} />, navigate: '/legal-policy' },
    { name: 'Location', icon: <HiOutlineLocationMarker size={22} />, navigate: '/location' },
    { name: 'Rating', icon: <IoIosStarOutline size={22} />, navigate: '/rating' }
  ];

  return (
    <div className="h-screen w-[240px] bg-[#191919] text-white flex flex-col p-4">
      <div className="mt-[40px] flex items-center gap-[4px] ml-[11px]">
        <img src={Logo} alt="Logo" className="w-[45px] h-[34.13px]" />
        <span style={{fontWeight:"700"}} className="text-[26px]">Searchkro</span>
        <button className="text-white cursor-pointer bg-[#191919] rounded-full w-6 h-6 border relative left-[30px] flex items-center justify-center border-white text-center"><IoIosArrowBack/></button>
      </div>
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
         <Link to={item.navigate} key={item.name}>
           <div
            className={`flex items-center space-x-3 w-[192px] h-[48px] rounded-[4px] cursor-pointer transition-colors ${
              active === item.name ? "bg-[#06C4D9] text-white ease-out duration-300" : "text-[#D9D9D9]"
            }`}
            onClick={() => setActive(item.name)}
          >
            {active === item.name && <span className="w-[6px] h-[36px] rounded-md bg-white"/>}
            <div className={`${active === item.name ? "ml-1 text-white" : "ml-2 text-[#D9D9D9]"}`}>
              {item.icon}
            </div>
            <span style={{fontWeight:"700", lineHeight:"24px"}} className="text-[16px]">{item.name}</span>
          </div>
         </Link>
        ))}
      </nav>
      <div className="mt-auto w-[192px] h-[48px] bg-[#474747] rounded-lg cursor-pointer flex items-center space-x-3 text-[#D9D9D9] hover:text-white">
        <FiLogOut className="w-5 h-5 ml-6" />
        <span style={{fontWeight:"700", lineHeight:"24px"}} className="text-[16px]">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;