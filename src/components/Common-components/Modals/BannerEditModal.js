import React, { useState, useEffect } from "react";
import { editBanner } from "../../utils/AxiosApi";

const BannerEditModal = ({ isOpen, onClose, banner, onSuccess }) => {
  const [formData, setFormData] = useState({
    isActive: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (banner && isOpen) {
      setFormData({
        isActive: banner.isActive || false,
      });
      
      if (banner.image) {
        const imageUrl = banner.image.startsWith('data:') 
          ? banner.image  
          : `${banner.image}?t=${new Date().getTime()}`; 
        
        setPreviewImage(imageUrl);
      } else {
        setPreviewImage("");
      }
      
      setImageFile(null);
      
      const fileInput = document.getElementById('editFileInput');
      if (fileInput) fileInput.value = "";
    }
  }, [banner, isOpen]);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!file.type.includes('image/')) {
      setError('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError('');
    setImageFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(previewImage);
    
  
    if (!imageFile && !previewImage) {
      setError("Please select an image");
      return;
    }
  
    try {
      setIsLoading(true);
  
      const payload = new FormData();
  
      if (imageFile) {
        payload.append("image", imageFile);
      }
  
      payload.append("isActive", formData.isActive ? "true" : "false");
  
      const response = await editBanner(banner._id, payload);
      console.log("Banner update response:", response);
  
      let updatedBanner;
      
      if (response.data?.data) {
        updatedBanner = response.data.data;
        
        if (imageFile) {
          updatedBanner = {
            ...updatedBanner,
            image: previewImage || updatedBanner.image
          };
        }
      } else {
        updatedBanner = {
          ...banner,
          isActive: formData.isActive
        };
        
        if (imageFile) {
          updatedBanner.image = previewImage;
        }
      }
      console.log("Sending updated banner to parent:", updatedBanner);
      
      onSuccess(updatedBanner);
      onClose();
    } catch (error) {
      console.error("Error updating banner:", error);
      setError(error.response?.data?.message || "An error occurred while updating the banner");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Banner</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Banner ID
            </label>
            <input
              type="text"
              value={banner ? banner._id : ""}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Banner Image
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50" 
              onClick={() => document.getElementById('editFileInput').click()}
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Banner preview"
                    className="mx-auto max-h-48 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x150?text=Invalid+Image";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setPreviewImage("");
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload a banner image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </>
              )}
              <input
                id="editFileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Active Banner</label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm text-white rounded-md ${
                isLoading ? "bg-blue-400" : "bg-[#06C4D9]"
              }`}
            >
              {isLoading ? "Updating..." : "Update Banner"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerEditModal;