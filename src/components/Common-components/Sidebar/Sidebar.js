import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { GoShieldLock } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Logo from '../../../Assets/Logo.png';
import Logout from "../Pop-ups/Logout";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close sidebar on mobile by default
      if (mobile && isOpen) {
        setIsOpen(false);
      }
      
      // Always show sidebar on desktop/tablet
      if (!mobile) {
        setIsOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    console.log("User confirmed logout");
    setShowLogoutConfirmation(false);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) setActive('Dashboard');
    else if (path.includes('categories')) setActive('Categories');
    else if (path.includes('reportes')) setActive('Reports');
    else if (path.includes('policy')) setActive('Legal Policy');
    else if (path.includes('location')) setActive('Location');
    else if (path.includes('rating')) setActive('Rating');
    else setActive('Dashboard');
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
    <>
      {/* Mobile toggle button that appears when sidebar is hidden */}
      {isMobile && !isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-black cursor-pointer w-8 h-8 flex items-center justify-center text-center"
        >
          <GiHamburgerMenu />
        </button>
      )}
      
      <div 
        className={`h-screen bg-[#191919] text-white flex flex-col p-4 transition-all duration-300 ${
          isMobile 
            ? isOpen ? 'translate-x-0' : '-translate-x-full' 
            : collapsed ? 'w-[80px]' : 'w-[240px]'
        } ${isMobile ? 'fixed left-0 top-0 z-40' : ''}`}
      >
        <div className="mt-[40px] flex items-center gap-[4px] ml-[11px]">
          <img src={Logo} alt="Logo" className="w-[45px] h-[34.13px]" />
          {(!collapsed || isMobile) && (
            <span style={{ fontWeight: "700" }} className="text-[26px]">Searchkro</span>
          )}
          <div onClick={toggleSidebar}>
            {isMobile ? (
              <button className="text-white cursor-pointer bg-[#191919] rounded-full w-6 h-6 relative left-[2px] top-[-41px] flex items-center justify-center border-white text-center">
                 <RxCross2 />
              </button>
            ) : (
              collapsed ? (
                <button className="text-white cursor-pointer bg-[#191919] rounded-full w-6 h-6 border relative left-[5px] flex items-center justify-center border-white text-center">
                  <IoIosArrowForward />
                </button>
              ) : (
                <button className="text-white cursor-pointer bg-[#191919] rounded-full w-6 h-6 border relative left-[28px] flex items-center justify-center border-white text-center">
                  <IoIosArrowBack />
                </button>
              )
            )}
          </div>
        </div>
        <nav className="flex-1 mt-6">
          {menuItems.map((item) => (
            <Link to={item.navigate} key={item.name}>
              <div
                className={`flex items-center ${!isMobile && collapsed ? 'justify-center' : 'space-x-3'} ${
                  !isMobile && collapsed ? 'w-[48px]' : 'w-[192px]'
                } h-[48px] rounded-[4px] cursor-pointer transition-colors ${
                  active === item.name ? "bg-[#06C4D9] text-white ease-out duration-300" : "text-[#D9D9D9]"
                }`}
                onClick={() => {
                  setActive(item.name);
                  if (isMobile) setIsOpen(false);
                }}
              >
                {active === item.name && (!isMobile && !collapsed) && <span className="w-[6px] h-[36px] rounded-md bg-white" />}
                <div className={`${active === item.name && (!isMobile && !collapsed) ? "ml-1 text-white" : (!isMobile && collapsed) ? "mx-auto" : "ml-2 text-[#D9D9D9]"}`}>
                  {item.icon}
                </div>
                {((!isMobile && !collapsed) || isMobile) && (
                  <span style={{ fontWeight: "700", lineHeight: "24px" }} className="text-[16px] text-white">{item.name}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>
        <button 
          onClick={handleLogoutClick} 
          className={`mb-[165px] ${
            !isMobile && collapsed ? 'w-[48px] justify-center' : 'w-[192px] space-x-3'
          } h-[48px] bg-[#474747] rounded-lg cursor-pointer flex items-center text-[#D9D9D9] hover:text-white`}
        >
          <FiLogOut className={`w-5 h-5 ${!isMobile && !collapsed || isMobile ? 'ml-6' : ''}`} />
          {((!isMobile && !collapsed) || isMobile) && (
            <span style={{ fontWeight: "700", lineHeight: "24px" }} className="text-[16px] text-white">Logout</span>
          )}
        </button>

        <Logout
          isOpen={showLogoutConfirmation}
          onClose={() => setShowLogoutConfirmation(false)}
          onConfirm={handleLogoutConfirm}
        />
      </div>
      
      {/* Overlay to close sidebar when clicking outside on mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;