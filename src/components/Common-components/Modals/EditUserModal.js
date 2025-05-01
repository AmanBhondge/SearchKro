import React, { useState } from "react";
import { FaSpinner, FaSave, FaTimes } from "react-icons/fa";
import { updateUserById } from '../../utils/AxiosApi';

const EditUserModal = ({ 
  showModal, 
  setShowModal, 
  editedUser, 
  setEditedUser,
  onUpdateSuccess,
  userId
}) => {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  
  if (!showModal || !editedUser) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({...prev, [name]: value}));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedUser(prev => ({...prev, [name]: checked}));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev, 
      businessAddress: {
        ...prev.businessAddress || {},
        [name]: value
      }
    }));
  };
  
  const handleUpdateUser = async () => {
    try {
      setUpdating(true);
      setUpdateError("");
   
      const cleanUserData = { ...editedUser };
      
      delete cleanUserData.email;
      delete cleanUserData.phone;
      delete cleanUserData._id;


      if (Array.isArray(cleanUserData.blockedUsers) && cleanUserData.blockedUsers.length === 0) {
        delete cleanUserData.blockedUsers;
      }
      
      const response = await updateUserById(userId, cleanUserData);
      
      setUpdating(false);
      setShowModal(false);
     
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      setUpdating(false);

      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to update user. Please try again.";
      
      setUpdateError(errorMessage);
    }
  };

  const renderInput = (name, label, value, onChange, type = "text") => (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderSelect = (name, label, value, onChange, options) => (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(([optValue, optLabel]) => (
          <option key={optValue} value={optValue}>{optLabel}</option>
        ))}
      </select>
    </div>
  );

  const renderTextarea = (name, label, value, onChange, rows = 3) => (
    <div className="mb-3 col-span-2">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={rows}
      ></textarea>
    </div>
  );

  const renderCheckbox = (name, label, checked, onChange) => (
    <div className="mb-3 flex items-center">
      <input 
        type="checkbox" 
        id={name} 
        name={name} 
        checked={Boolean(checked)} // Fix the error by ensuring boolean value
        onChange={onChange}
        className="mr-2 h-4 w-4"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold">Edit User Details</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        {updateError && (
          <div className="bg-red-100 text-red-700 p-3 mx-6 mt-4 rounded-md">
            {updateError}
          </div>
        )}
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="col-span-1 md:col-span-2 mb-2">
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <div className="border-t border-gray-200"></div>
            </div>
            
            {renderInput("name", "Name", editedUser.name, handleInputChange)}
            {renderInput("profile", "Profile URL", editedUser.profile, handleInputChange)}
            
            {renderSelect("role", "Role", editedUser.role, handleInputChange, [
              ["buyer", "Buyer"],
              ["seller", "Seller"],
              ["admin", "Admin"]
            ])}
            
            {renderSelect("isAdminVerified", "Admin Verification", editedUser.isAdminVerified, handleInputChange, [
              ["pending", "Pending"],
              ["approved", "Approved"]
            ])}
            
            {/* Business Information */}
            <div className="col-span-1 md:col-span-2 mt-4 mb-2">
              <h3 className="text-lg font-semibold mb-2">Business Information</h3>
              <div className="border-t border-gray-200"></div>
            </div>
            
            {renderInput("shopName", "Shop Name", editedUser.shopName, handleInputChange)}
            {renderInput("ownerName", "Owner Name", editedUser.ownerName, handleInputChange)}
            
            {renderSelect("businessScale", "Business Scale", editedUser.businessScale, handleInputChange, [
              ["", "Select Business Scale"],
              ["small", "Small"],
              ["medium", "Medium"],
              ["large", "Large"]
            ])}
            
            {renderCheckbox("isDeliveryAvailable", "Delivery Available", editedUser.isDeliveryAvailable, handleCheckboxChange)}
            
            
            {/* <div className="col-span-1 md:col-span-2 mt-2">
              <h4 className="text-md font-medium mb-2">Business Address</h4>
            </div>
            
            {renderInput("street", "Street", editedUser.businessAddress?.street, handleAddressChange)}
            {renderInput("city", "City", editedUser.businessAddress?.city, handleAddressChange)}
            {renderInput("state", "State", editedUser.businessAddress?.state, handleAddressChange)}
            {renderInput("pinCode", "Pin Code", editedUser.businessAddress?.pinCode, handleAddressChange)}
            {renderInput("country", "Country", editedUser.businessAddress?.country, handleAddressChange)}
            
            <div className="mb-3 col-span-2">
              <label className="block text-sm font-medium mb-1">Current Shop Location URL</label>
              <input 
                type="text" 
                name="currentShopLocationUrl" 
                value={editedUser.currentShopLocationUrl || ''} 
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="col-span-1 md:col-span-2 mt-4 mb-2">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="border-t border-gray-200"></div>
            </div>
            
            {renderInput("contactNumber", "Contact Number", editedUser.contactNumber, handleInputChange)}
            {renderInput("contactEmail", "Contact Email", editedUser.contactEmail, handleInputChange, "email")}
            
            <div className="col-span-1 md:col-span-2 mt-4 mb-2">
              <h3 className="text-lg font-semibold mb-2">Online Presence</h3>
              <div className="border-t border-gray-200"></div>
            </div>
            
            {renderTextarea("description", "Description", editedUser.description, handleInputChange)}
            {renderInput("facebookUrl", "Facebook URL", editedUser.facebookUrl, handleInputChange)}
            {renderInput("instagramUrl", "Instagram URL", editedUser.instagramUrl, handleInputChange)}
            {renderInput("youtubeUrl", "YouTube URL", editedUser.youtubeUrl, handleInputChange)}
            {renderInput("websiteUrl", "Website URL", editedUser.websiteUrl, handleInputChange)}
             */}
            {/* Account Status */}
            <div className="col-span-1 md:col-span-2 mt-4 mb-2">
              <h3 className="text-lg font-semibold mb-2">Account Status</h3>
              <div className="border-t border-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 col-span-2">
              {renderCheckbox("isActive", "Active", editedUser.isActive, handleCheckboxChange)}
              {renderCheckbox("isBlocked", "Blocked", editedUser.isBlocked, handleCheckboxChange)}
              {renderCheckbox("isVerified", "Email Verified", editedUser.isVerified, handleCheckboxChange)}
              {renderCheckbox("isDeactivated", "Deactivated", editedUser.isDeactivated, handleCheckboxChange)}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 border-t p-4">
          <button 
            onClick={() => setShowModal(false)} 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpdateUser} 
            className="px-4 py-2 bg-[#06C4D9] text-white rounded-md hover:bg-[#191919] flex items-center gap-2"
            disabled={updating}
          >
            {updating ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {updating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;