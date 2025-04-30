import React, { useState, useEffect } from "react";
import { editBanner } from "../../utils/AxiosApi";

const BannerEditModal = ({ isOpen, onClose, banner, onSuccess }) => {
  const [formData, setFormData] = useState({
    image: "",
    isActive: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (banner) {
      setFormData({
        image: banner.image || "",
        isActive: banner.isActive || false,
      });
      setPreviewImage(banner.image || "");
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "image" && value) {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.image) {
      setError("Image URL is required");
      return;
    }

    try {
      setIsLoading(true);
      // Based on your API requirement, only send the image field
      const response = await editBanner(banner._id, {
        image: formData.image
      });
      
      console.log("Banner update response:", response);
      
      // Check different possible response structures
      if (response.data?.success) {
        // If the updated banner is returned in the response
        const updatedBanner = response.data.data || {
          ...banner,
          image: formData.image,
          isActive: formData.isActive
        };
        onSuccess(updatedBanner);
      } else if (response.status === 200 || response.status === 201) {
        // If API returns success status but different structure
        const updatedBanner = {
          ...banner,
          image: formData.image,
          isActive: formData.isActive
        };
        onSuccess(updatedBanner);
      } else {
        setError("Failed to update banner");
      }
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
              Banner Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter image URL"
            />
          </div>

          {previewImage && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image Preview
              </label>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={previewImage}
                  alt="Banner preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x150?text=Invalid+Image+URL";
                  }}
                />
              </div>
            </div>
          )}

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
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
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
