import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { getUserById } from '../../utils/AxiosApi';
import EditUserModal from "../../Common-components/Modals/EditUserModal"; 
import { FaSpinner, FaArrowLeft, FaUserCircle, FaEnvelope, FaGlobe, FaIdBadge, 
  FaBuilding, FaCheckCircle, FaTimesCircle, FaBell, FaClock, FaCalendarAlt, 
  FaEdit } from "react-icons/fa";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [updateMessage, setUpdateMessage] = useState({ type: '', message: '' });

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      setUser(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const handleEditClick = () => {
    setEditedUser({...user});
    setShowModal(true);
  };

  const handleUpdateSuccess = () => {
    setUpdateMessage({ type: 'success', message: 'User updated successfully!' });
    fetchUserDetails(); 
    setTimeout(() => {
      setUpdateMessage({ type: '', message: '' });
    }, 3000);
  };

  const VerificationStatus = ({ status }) => {
    const isVerified = status === true || status === "approved";
    const isPending = status === "pending";
    
    if (isPending) {
      return (
        <span className="bg-yellow-100 text-yellow-600 px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base whitespace-nowrap">
          Pending <span className="ml-1">⏳</span>
        </span>
      );
    }
    
    return (
      <span className={`px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base whitespace-nowrap ${
        isVerified 
          ? "bg-green-100 text-green-600" 
          : "bg-red-100 text-red-600"
      }`}>
        {isVerified ? "Verified " : "Not Verified "}
        {isVerified ? <FaCheckCircle className="ml-1" /> : <FaTimesCircle className="ml-1" />}
      </span>
    );
  };

  const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 py-2 border-b border-gray-100">
      {icon}
      <span className="font-medium">{label}:</span> 
      <span className="ml-1">{value}</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold ml-9">
            User Details
          </h1>
          <Navbar />
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="mb-4 flex justify-between">
            <button
              onClick={() => navigate("/user")}
              className="flex items-center gap-2 bg-[#191919] text-white px-4 py-2 rounded-lg transition-all shadow-md"
            >
              <FaArrowLeft /> Back to Users
            </button>
            
            {!loading && user && (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 bg-[#06C4D9] text-white px-4 py-2 rounded-lg transition-all shadow-md"
              >
                <FaEdit /> Edit User
              </button>
            )}
          </div>
          
          {updateMessage.message && (
            <div className={`mb-4 p-3 rounded-md ${updateMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {updateMessage.message}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : user ? (
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full transition-all duration-300 hover:shadow-xl">
              <div className="border-b border-gray-200 pb-3 md:pb-4 mb-6 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaUserCircle className="text-3xl text-blue-500" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {user.name}
                  </h1>
                  <p className="text-gray-500 text-sm md:text-base">ID: {user.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <FaUserCircle className="mr-2 text-blue-500" /> Personal Information
                    </h2>
                    <div className="space-y-2">
                      <InfoItem 
                        icon={<FaUserCircle className="text-gray-500" />} 
                        label="Name" 
                        value={user.name} 
                      />
                      <InfoItem 
                        icon={<FaEnvelope className="text-gray-500" />} 
                        label="Email" 
                        value={user.email} 
                      />
                      <InfoItem 
                        icon={<FaIdBadge className="text-gray-500" />} 
                        label="Gender" 
                        value={user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'} 
                      />
                      <InfoItem 
                        icon={<FaGlobe className="text-gray-500" />} 
                        label="Country Code" 
                        value={user.countryCode || 'Not specified'} 
                      />
                      <InfoItem 
                        icon={<FaIdBadge className="text-gray-500" />} 
                        label="Role" 
                        value={<span className="capitalize">{user.role}</span>} 
                      />
                      <InfoItem 
                        icon={<FaBuilding className="text-gray-500" />} 
                        label="Business Scale" 
                        value={user.businessScale ? user.businessScale.charAt(0).toUpperCase() + user.businessScale.slice(1) : 'Not specified'} 
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <FaIdBadge className="mr-2 text-blue-500" /> Account Status
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <FaCheckCircle className="text-gray-500 mr-2" />
                          <span className="font-medium">Verification Status:</span>
                        </div>
                        <VerificationStatus status={user.isAdminVerified} />
                      </div>
                      <InfoItem 
                        icon={<FaEnvelope className="text-gray-500" />} 
                        label="Email Verified" 
                        value={user.isVerified ? 'Yes' : 'No'} 
                      />
                      <InfoItem 
                        icon={<FaUserCircle className="text-gray-500" />} 
                        label="Profile Completed" 
                        value={user.isProfileCompleted ? 'Yes' : 'No'} 
                      />
                      <InfoItem 
                        icon={<FaCheckCircle className="text-gray-500" />} 
                        label="Active" 
                        value={user.isActive ? 'Yes' : 'No'} 
                      />
                      <InfoItem 
                        icon={<FaTimesCircle className="text-gray-500" />} 
                        label="Blocked" 
                        value={user.isBlocked ? 'Yes' : 'No'} 
                      />
                      <InfoItem 
                        icon={<FaTimesCircle className="text-gray-500" />} 
                        label="Deactivated" 
                        value={user.isDeactivated ? 'Yes' : 'No'} 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <FaBell className="mr-2 text-blue-500" /> Preferences
                    </h2>
                    <div className="space-y-2">
                      <InfoItem 
                        icon={<FaEnvelope className="text-gray-500" />} 
                        label="Email Notifications" 
                        value={user.emailNotification ? 'Enabled' : 'Disabled'} 
                      />
                      <InfoItem 
                        icon={<FaEnvelope className="text-gray-500" />} 
                        label="SMS Notifications" 
                        value={user.smsNotification ? 'Enabled' : 'Disabled'} 
                      />
                      <InfoItem 
                        icon={<FaBell className="text-gray-500" />} 
                        label="Push Notifications" 
                        value={user.pushNotification ? 'Enabled' : 'Disabled'} 
                      />
                      <InfoItem 
                        icon={<FaCheckCircle className="text-gray-500" />} 
                        label="Terms & Conditions" 
                        value={user.isAcceptTermConditions ? 'Accepted' : 'Not Accepted'} 
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 flex items-center">
                      <FaClock className="mr-2 text-blue-500" /> System Information
                    </h2>
                    <div className="space-y-2">
                      <InfoItem 
                        icon={<FaIdBadge className="text-gray-500" />} 
                        label="User ID" 
                        value={user._id} 
                      />
                      <InfoItem 
                        icon={<FaCalendarAlt className="text-gray-500" />} 
                        label="Created At" 
                        value={new Date(user.createdAt).toLocaleString()} 
                      />
                      <InfoItem 
                        icon={<FaCalendarAlt className="text-gray-500" />} 
                        label="Updated At" 
                        value={new Date(user.updatedAt).toLocaleString()} 
                      />
                      <InfoItem 
                        icon={<FaClock className="text-gray-500" />} 
                        label="Last Seen" 
                        value={new Date(user.lastSeen).toLocaleString()} 
                      />
                      <InfoItem 
                        icon={<FaCheckCircle className="text-gray-500" />} 
                        label="Online Status" 
                        value={user.isOnline ? 'Online' : 'Offline'} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center">
              <FaTimesCircle className="text-4xl text-red-500 mx-auto mb-3" />
              <p className="text-lg text-red-500">User not found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modified EditUserModal usage */}
      <EditUserModal 
        showModal={showModal}
        setShowModal={setShowModal}
        editedUser={editedUser}
        setEditedUser={setEditedUser}
        onUpdateSuccess={handleUpdateSuccess}
        userId={id}
      />
    </div>
  );
};

export default UserDetailsPage;