import React, { useState, useRef, useEffect } from "react";
import profile from "../../../Assets/Profile.png";
import notif from "../../../Assets/notif.png";
import edit from "../../../Assets/Edit@2x.png";
import logout from "../../../Assets/logoutcurve.png";
import { IoIosCheckmark } from "react-icons/io";
import Notification from "../Pop-ups/Notification";
import Logout from "../Pop-ups/Logout";
import { getUserById, updateProfile } from "../../utils/AxiosApi";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationButtonRef = useRef(null);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const nameInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = Cookies.get("Id");
        
        if (!userId) {
          setLoading(false);
          return;
        }
        
        const response = await getUserById(userId);
        if (response && response.data && response.data.data) {
          const name = response.data.data.name || "User";
          const email = response.data.data.email || "user@example.com";
          
          setUserData({ name, email });
          setNewName(name);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  // Handle save on click outside for name input
  useEffect(() => {
    if (!isEditing) return;

    function handleClickOutsideInput(event) {
      if (nameInputRef.current && !nameInputRef.current.contains(event.target)) {
        handleSaveName();
      }
    }

    document.addEventListener("mousedown", handleClickOutsideInput);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, [isEditing, newName]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    if (!newName.trim() || newName === userData.name) {
      setNewName(userData.name);
      setIsEditing(false);
      return;
    }
    
    try {
      const response = await updateProfile({ name: newName });
      if (response && response.data) {
        setUserData({
          ...userData,
          name: newName
        });
      }
    } catch (error) {
      console.error("Failed to update name:", error);
      setNewName(userData.name);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    }
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
        <div className="relative">
          <button
            ref={notificationButtonRef}
            className="flex items-center p-2 justify-center w-[36px] h-[36px] md:h-[44px] md:w-[44px] border-[1px] border-[D9D9D9] rounded-[100px] relative"
            onClick={toggleNotification}
          >
            <img src={notif} alt="Notifications" className="h-full w-full" />
          </button>
        </div>

        <div className="relative">
          <button
            ref={profileBtnRef}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden"
            onClick={toggleDropdown}
          >
            <img src={profile} alt="User profile" className="w-full h-full object-cover" />
          </button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute p-4 right-0 mt-2 w-72 bg-white rounded-lg shadow-sm border border-gray-100 z-50"
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                    <img
                      src={profile}
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      {isEditing ? (
                        <div className="flex-1 pr-2">
                          <input
                            ref={nameInputRef}
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full text-lg font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-medium text-gray-900 truncate pr-2">
                            {userData.name}
                          </h3>
                          <button className="p-1 flex-shrink-0" onClick={handleEditClick}>
                            <img src={edit} className="w-5 h-5" alt="Edit profile" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-2 md:mt-3">
                      <div className="p-1 px-2 border-[1px] border-[#D9D9D9] rounded flex items-center justify-between">
                        <span className="text-xs md:text-sm pl-1 text-gray-800 truncate max-w-[170px]">
                          {userData.email}
                        </span>
                        <IoIosCheckmark className="w-5 h-5 bg-gray-100 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[1px] border-[#D9D9D9] my-1"></div>

              <div className="p-3">
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center text-gray-800 font-medium"
                >
                  <img
                    src={logout}
                    className="w-5 h-5 text-black mr-3"
                    alt="Logout"
                  />
                  <span className="text-base">Log out</span>
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