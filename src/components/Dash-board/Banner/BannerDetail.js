import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBannerbyId } from '../../utils/AxiosApi';
import Sidebar from '../../Common-components/Sidebar/Sidebar';
import Navbar from '../../Common-components/Navbar/Navbar';
import BannerEditModal from '../../Common-components/Modals/BannerEditModal';
import DeleteBannerModal from '../../Common-components/Modals/DeleteBannerModal';
import { FaArrowLeft, FaEdit, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { MdOutlineDescription, MdAccessTime } from 'react-icons/md';
import { BiIdCard } from 'react-icons/bi';

const BannerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchBannerDetails = async () => {
      try {
        setLoading(true);
        const response = await getBannerbyId(id);
        setBanner(response.data.data);
      } catch (error) {
        console.error('Error fetching banner details:', error);
        setError('Failed to load banner details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBannerDetails();
    }
  }, [id]);

  const handleEditSuccess = (updatedBanner) => {
    setBanner(updatedBanner);
    setIsEditModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/banner', { 
      state: { 
        notification: {
          type: 'success',
          message: 'Banner deleted successfully!'
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getImageWithTimestamp = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('data:')) return imageUrl;
    
    return imageUrl.includes('?') 
      ? imageUrl 
      : `${imageUrl}?t=${new Date().getTime()}`;
  };

  const renderLoading = () => (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white shadow">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 text-gray-800 font-bold">
              Banner Detail
            </h1>
          </div>
          <Navbar />
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white shadow">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 text-gray-800 font-bold">
              Banner Detail
            </h1>
          </div>
          <Navbar />
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10 flex flex-col items-center justify-center">
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-md mb-6 shadow-md max-w-lg">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigate('/banner')} 
            className="bg-[#191919] text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Banners
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotFound = () => (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white shadow">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 text-gray-800 font-bold">
              Banner Detail
            </h1>
          </div>
          <Navbar />
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10 flex flex-col items-center justify-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-6 py-4 rounded-md mb-6 shadow-md max-w-lg">
            <p>Banner not found.</p>
          </div>
          <button 
            onClick={() => navigate('/banner')} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-md flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Banners
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoading();
  if (error) return renderError();
  if (!banner) return renderNotFound();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white shadow">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b border-gray-200 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9 text-gray-800 font-bold">
              Banner Detail
            </h1>
          </div>
          <Navbar />
        </div>
        
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10">
          <div className="mb-6">
            <button
              onClick={() => navigate('/banner')}
              className="bg-[#191919] text-white px-5 py-2.5 rounded-lg flex items-center shadow-md transition-all duration-300 border border-gray-200"
            >
              <FaArrowLeft className="mr-2" />
              Back to Banners
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="relative aspect-video">
                  <img
                    src={getImageWithTimestamp(banner.image)}
                    alt="Banner"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                    }}
                  />
                  {banner.isActive && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center">
                      <FaCheckCircle className="mr-1" /> Active
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">Banner Details</h2>
                  
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <BiIdCard className="text-indigo-500 text-xl mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Banner ID</p>
                      <p className="font-medium text-gray-800 break-all">{banner._id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MdAccessTime className="text-indigo-500 text-xl mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Created At</p>
                      <p className="font-medium text-gray-800">{formatDate(banner.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MdAccessTime className="text-indigo-500 text-xl mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Updated At</p>
                      <p className="font-medium text-gray-800">{formatDate(banner.updatedAt)}</p>
                    </div>
                  </div>
                  
                  {banner.description && (
                    <div className="flex items-start">
                      <MdOutlineDescription className="text-indigo-500 text-xl mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="font-medium text-gray-800">{banner.description}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-6 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      <BannerEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        banner={banner}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Modal */}
      <DeleteBannerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        bannerId={banner?._id}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default BannerDetail;