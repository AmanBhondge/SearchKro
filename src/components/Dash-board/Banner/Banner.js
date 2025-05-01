import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBanners } from "../../utils/AxiosApi";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import BannerEditModal from "../../Common-components/Modals/BannerEditModal";
import PostBannerModal from "../../Common-components/Modals/PostBannerModal";

const Banner = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const allBanners = async () => {
    try {
      setLoading(true);
      const response = await getAllBanners();
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allBanners();
  }, []);

  const handleEditClick = (banner, e) => {
    e.stopPropagation(); // Prevent navigation when clicking the edit button
    setSelectedBanner(banner);
    setIsEditModalOpen(true);
  };

  const handleCardClick = (bannerId) => {
    navigate(`/banner/${bannerId}`);
  };

  const handleEditSuccess = (updatedBanner) => {
    setData(prevData => 
      prevData.map(banner => {
        if (banner._id === updatedBanner._id) {
          if (updatedBanner.image) {
            const timestamp = new Date().getTime();
            if (!updatedBanner.image.startsWith('data:')) {
              updatedBanner.image = updatedBanner.image.includes('?') 
                ? updatedBanner.image 
                : `${updatedBanner.image}?t=${timestamp}`;
            }
          }
          return updatedBanner;
        }
        return banner;
      })
    );
    setIsEditModalOpen(false);
  };

  const handlePostSuccess = (newBanner) => {
    setData(prevData => [newBanner, ...prevData]);
    setIsPostModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-300">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <div className="flex items-center">
            <h1
              style={{ fontWeight: "700" }}
              className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl ml-9"
            >
              Banners
            </h1>
          </div>
          <Navbar />
        </div>

        {/* Banner Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 2xl:p-10">
          {/* Add Banner Button */}
          <div className="mb-6">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-[#191919] text-white px-4 py-2 rounded-md flex items-center shadow-md transition-all duration-300 hover:bg-opacity-90"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add New Banner
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#06C4D9]"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="mt-4 text-lg text-gray-600">No banners available</p>
                <button
                  onClick={() => setIsPostModalOpen(true)}
                  className="mt-4 bg-[#06C4D9] text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-opacity-90"
                >
                  Create your first banner
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((banner) => {
                const imgSrc = banner.image && !banner.image.startsWith('data:') 
                  ? banner.image.includes('?') 
                    ? banner.image 
                    : `${banner.image}?t=${new Date().getTime()}`
                  : banner.image;
                
                return (
                  <div
                    key={banner._id}
                    onClick={() => handleCardClick(banner._id)}
                    className="bg-white rounded-lg shadow border overflow-hidden transition-transform duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer"
                  >
                    <div className="relative aspect-video">
                      <img
                        src={imgSrc}
                        alt={`Banner ${banner._id.slice(-6)}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x150?text=Image+Not+Found";
                        }}
                      />
                     
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">ID: {banner._id.slice(-6)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(banner.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${banner.isActive ? "bg-[#06C4D9]" : "bg-red-500"}`}></div>
                          <span className="ml-2 text-sm">{banner.isActive ? "Active" : "Inactive"}</span>
                        </div>
                        <button 
                          onClick={(e) => handleEditClick(banner, e)}
                          className="text-black hover:text-[#191919] text-sm font-semibold transition-colors duration-300"
                        >
                          Edit Banner
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <BannerEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        banner={selectedBanner}
        onSuccess={handleEditSuccess}
      />
  
      <PostBannerModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSuccess={handlePostSuccess}
      />
    </div>
  );
};

export default Banner;