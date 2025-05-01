import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { getAllusers } from "../../utils/AxiosApi";
import { FaSpinner } from "react-icons/fa";

const User = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("all"); // "all", "buyer", or "seller"
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllusers();
      console.log("user",response.data)
      setAllUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Navigate to user details
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  // Filter users based on view type
  const filteredUsers =
    viewType === "all"
      ? allUsers
      : allUsers.filter((user) => user.role === viewType);

  // Verification Status Component
  const VerificationStatus = ({ status }) => {
    const isVerified = status === true || status === "approved";
    const isPending = status === "pending";

    if (isPending) {
      return (
        <span className="bg-yellow-100 text-yellow-600 px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap">
          Pending <span className="ml-1">⏳</span>
        </span>
      );
    }

    return (
      <span
        className={`px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap ${
          isVerified ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {isVerified ? "Verified " : "Not Verified "}
        <span className="ml-1">{isVerified ? "✓" : "✗"}</span>
      </span>
    );
  };

  // Status Indicator Component
  const StatusIndicator = ({ isActive }) => (
    <span
      className={`px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap ${
        isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );

  const BlockStatus = ({ isBlocked }) => (
    <span
      className={`px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap ${
        isBlocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
      }`}
    >
      {isBlocked ? "Blocked" : "Not Blocked"}
    </span>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9">
            Users
          </h1>
          <Navbar />
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full">
            <div className="border-b border-black pb-3 md:pb-4 mb-4 flex justify-between items-center">
              <h1 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold ml-8">
                All Users
              </h1>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full p-1 flex">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      viewType === "buyer"
                        ? "bg-[#191919] text-white"
                        : "bg-transparent text-gray-700"
                    }`}
                    onClick={() => setViewType("buyer")}
                  >
                    Buyer
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      viewType === "seller"
                        ? "bg-[#191919] text-white"
                        : "bg-transparent text-gray-700"
                    }`}
                    onClick={() => setViewType("seller")}
                  >
                    Seller
                  </button>
                </div>
                <div className="ml-2">
                  <button
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      viewType === "all"
                        ? "bg-[#191919] text-white"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                    onClick={() => setViewType("all")}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white text-black border-b text-base sm:text-lg 2xl:text-2xl">
                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        Name
                      </th>
                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        Email
                      </th>
                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        Mobile Number
                      </th>

                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        isActive
                      </th>
                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        isBlocked
                      </th>
                      <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">
                        Verified Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-all text-sm sm:text-base md:text-lg 2xl:text-xl cursor-pointer"
                        onClick={() => handleUserClick(user._id)}
                      >
                        <td className="py-2 md:py-4 px-2 md:px-6">
                          {user.name}
                        </td>
                        <td className="py-2 md:py-4 px-2 md:px-6">
                          {user.email}
                        </td>
                        <td className="py-2 md:py-4 px-2 md:px-6">
                          {user.mobile || "N/A"}
                        </td>

                        <td className="py-2 md:py-4 px-2 md:px-6">
                          <StatusIndicator isActive={user.isActive !== false} />
                        </td>
                        <td className="py-2 md:py-4 px-2 md:px-6">
                          <BlockStatus isBlocked={user.isBlocked === true} />
                        </td>
                        <td className="py-2 md:py-4 px-2 md:px-6">
                          <VerificationStatus status={user.isAdminVerified} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
