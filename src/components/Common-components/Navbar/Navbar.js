import React, { useState, useRef, useEffect } from "react";
import profile from "../../../Assets/Profile.png";
import notif from "../../../Assets/notif.png";
import edit from "../../../Assets/Edit@2x.png";
import logout from "../../../Assets/logoutcurve.png";
import { IoIosCheckmark } from "react-icons/io";
import Notification from "../Pop-ups/Notification";
import Logout from "../Pop-ups/Logout";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    console.log("User confirmed logout");
    setShowLogoutConfirmation(false);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Notification  */}
        <div className="relative ">
          <button
            ref={notificationButtonRef}
            className="flex items-center p-2 justify-center w-[36px] h-[36px] md:h-[44px]  md:w-[44px] 3xl:w-[64px] 3xl:h-[60px] border-[1px] border-[D9D9D9] rounded-[100px] relative"
            onClick={toggleNotification}
          >
            {" "}
            <img src={notif} alt="Notifications" className="h-full w-full" />
          </button>
        </div>

        <div className="relative">
          <button
            ref={profileBtnRef}
            className="w-8 h-8 sm:w-10 sm:h-10 3xl:w-[64px] 3xl:h-[64px] rounded-full bg-gray-200 overflow-hidden"
            onClick={toggleDropdown}
          >
            <img
              src={profile}
              alt="User profile"
              className="w-full h-full 3xl:w-[56px] 3xl:h-[56px] object-cover"
            />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute p-4 right-0 mt-2 w-72 3xl:w-[480px] bg-white rounded-lg shadow-sm border border-gray-100 z-50"
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-16 3xl:w-32 3xl:h-32 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                    <img
                      src={profile}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg 2xl:text-4xl font-medium text-gray-900">
                        John Doe
                      </h3>
                      <button className="p-1">
                        <img src={edit} className="w-6 3xl:w-12 3xl:h-12 h-6" />
                      </button>
                    </div>

                    <div className="mt-2 2xl:mt-6">
                      <div className="p-1 px-2 2xl:px-6 border-[1px] border-[#D9D9D9] rounded flex items-center justify-between">
                        <span className="text-sm 2xl:text-3xl pl-1 text-gray-800">
                          John Doe
                        </span>
                        <IoIosCheckmark className="w-6 3xl:w-12 3xl:h-12 h-6 bg-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[1px] border-[#D9D9D9] my-1"></div>

              <div className="p-3 2xl:p-6">
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center text-gray-800 font-medium"
                >
                  <img
                    src={logout}
                    className="w-6 3xl:w-12 3xl:h-12 h-6 text-black mr-4"
                  />
                  <span className="2xl:text-4xl">Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Notification
        isOpen={isNotificationOpen}
        onClose={closeNotification}
        buttonRef={notificationButtonRef}
      />

      <Logout
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Navbar;
