import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward, IoIosNotificationsOutline } from "react-icons/io";
import Logo from "../../../Assets/Logo.png";
import Logout from "../Pop-ups/Logout";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(
    location.state?.sidebarCollapsed || false
  );
  const [active, setActive] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile && isOpen) {
        setIsOpen(false);
      }

      if (!mobile) {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
    if (path.includes("dashboard")) setActive("Dashboard");
    else if (path.includes("categories")) setActive("Categories");
    else if (path.includes("user")) setActive("Users");
    else if (path.includes("reportes")) setActive("Reports");
    else if (path.includes("faq")) setActive("FAQ's");
    else if (path.includes("banner")) setActive("Banner");
    else if (path.includes("rating")) setActive("Rating");
    else if (path.includes("notification")) setActive("Notification");
    else setActive("Dashboard");
  }, [location]);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={22} />,
      navigate: "/main-dashboard",
    },
    {
      name: "Categories",
      icon: <TbCategory2 size={22} />,
      navigate: "/categories",
    },
    { name: "Users", icon: <LuUsers size={22} />, navigate: "/user" },
    {
      name: "Reports",
      icon: <MdOutlineReportGmailerrorred size={22} />,
      navigate: "/reportes",
    },
    {
      name: "FAQ's",
      icon: <CiCircleQuestion size={22} />,
      navigate: "/faq",
    },
    {
      name: "Banner",
      icon: <CiImageOn size={22} />,
      navigate: "/banner",
    },
    {
      name: "Rating",
      icon: <IoIosStarOutline size={22} />,
      navigate: "/rating",
    },
    {
      name: "Notification",
      icon: <IoIosNotificationsOutline size={22} />,
      navigate: "/notification",
    },
  ];

  const transitionDuration = "duration-500";
  const transitionTiming = "ease-in-out";

  const handleNavigation = (path, itemName) => {
    setActive(itemName);

    if (isMobile) {
      setIsOpen(false);
    }

    navigate(path, { state: { sidebarCollapsed: collapsed } });
  };

  return (
    <>
      {isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-black cursor-pointer w-8 h-8 flex items-center justify-center text-center"
        >
          <GiHamburgerMenu />
        </button>
      )}

      <div
        className={`bg-[#191919] text-white flex flex-col p-4 transition-all ${transitionDuration} ${transitionTiming} ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : collapsed
            ? "w-[82px] 2xl:w-[100px]"
            : "w-[240px] 2xl:w-[300px]"
        } ${
          isMobile
            ? "fixed left-0 top-0 z-40 h-screen"
            : "h-screen sticky top-0"
        }`}
      >
        <div className="mt-[12%] flex items-center gap-[4px] ml-[11px] relative">
          {/* <div className="w-[34px] h-[34.13px] text-xl bg-white text-black font-extrabold flex items-center justify-center rounded-full">
            C
          </div> */}
          <img src={Logo} alt="Logo" className="w-[45px] 2xl:w-[50px] h-[34.13px] 2xl:h-[38px]" />
          <div
            className={`transition-all ${transitionDuration} ${transitionTiming} ${
              collapsed && !isMobile
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 w-auto"
            }`}
          >
            {(!collapsed || isMobile) && (
              <span
                style={{ fontWeight: "700" }}
                className="text-[26px] 2xl:text-[35px]"
              >
                CrosyDeal
              </span>
            )}
          </div>
          <div
            onClick={toggleSidebar}
            className={`transition-all ${transitionDuration} ${transitionTiming} absolute ${
              collapsed
                ? "left-[42px] 2xl:left-[55px]"
                : "left-[200px] 2xl:left-[260px]"
            }`}
          >
            {isMobile ? (
              <></>
            ) : (
              <button
                className={`text-white cursor-pointer bg-[#191919] rounded-full w-6 2xl:w-[30px] h-6 2xl:h-[30px] border flex items-center justify-center border-white text-center transition-all ${transitionDuration} ${transitionTiming}`}
              >
                {collapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
              </button>
            )}
          </div>
        </div>
        <nav className="flex-1 mt-6 overflow-y-auto">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center ${
                !isMobile && collapsed ? "justify-center" : "space-x-3"
              } ${
                !isMobile && collapsed
                  ? "w-[48px] 2xl:w-[55px]"
                  : "w-[192px] 2xl:w-[260px]"
              } h-[48px] 2xl:h-[55px] rounded-[4px] cursor-pointer transition-all ${transitionDuration} ${transitionTiming} ${
                active === item.name
                  ? "bg-[#06C4D9] text-white"
                  : "text-[#D9D9D9]"
              }`}
              onClick={() => handleNavigation(item.navigate, item.name)}
            >
              {active === item.name && (
                <span
                  className={`w-[6px] 2xl:w-[8px] h-[36px] 2xl:h-[40px] rounded-md bg-white transition-all 
                    ${transitionDuration} ${transitionTiming} 
                    ${!isMobile && !collapsed ? "" : ""}`}
                />
              )}
              <div
                className={`transition-all ${transitionDuration} ${transitionTiming} ${
                  active === item.name && !isMobile && !collapsed
                    ? "ml-1 text-white"
                    : !isMobile && collapsed
                    ? "mx-auto"
                    : "ml-2 text-[#D9D9D9]"
                }`}
              >
                {item.icon}
              </div>
              <div
                className={`transition-all ${transitionDuration} ${transitionTiming} ${
                  !isMobile && collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                }`}
              >
                {((!isMobile && !collapsed) || isMobile) && (
                  <span
                    style={{ fontWeight: "700", lineHeight: "24px" }}
                    className="text-[16px] 2xl:text-[20px] text-white"
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto mb-6">
          <button
            onClick={handleLogoutClick}
            className={`transition-all ${transitionDuration} ${transitionTiming} ${
              !isMobile && collapsed
                ? "w-[48px] 2xl:w-[55px] justify-center"
                : "w-[192px] 2xl:w-[260px] space-x-3"
            } h-[48px] 2xl:h-[55px] bg-[#474747] rounded-lg cursor-pointer flex items-center text-[#D9D9D9] hover:text-white`}
          >
            <FiLogOut
              className={`w-5 h-5 transition-all ${transitionDuration} ${transitionTiming} ${
                (!isMobile && !collapsed) || isMobile ? "ml-4" : ""
              }`}
            />
            <div
              className={`transition-all ${transitionDuration} ${transitionTiming} ${
                !isMobile && collapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto"
              }`}
            >
              {((!isMobile && !collapsed) || isMobile) && (
                <span
                  style={{ fontWeight: "700", lineHeight: "24px" }}
                  className="text-[16px] 2xl:text-[20px] text-white"
                >
                  Logout
                </span>
              )}
            </div>
          </button>
        </div>

        <Logout
          isOpen={showLogoutConfirmation}
          onClose={() => setShowLogoutConfirmation(false)}
          onConfirm={handleLogoutConfirm}
        />
      </div>

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
