import React, { useState, useEffect } from "react";
import { postBanner, editBanner } from "../../utils/AxiosApi";
import { X, Upload, Image, Loader } from "lucide-react";

const BannerEditModal = ({ isOpen, onClose, onSuccess, banner }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

  useEffect(() => {
    if (banner?.image) {
      setPreviewUrl(banner.image);
    }
  }, [banner]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 1MB limit. Please choose a smaller image.");
      return;
    }

    setSelectedFile(file);
    setError("");

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      setError("");

      let imageUrl = banner?.image;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await postBanner(formData);

        if (
          !uploadRes.data ||
          !uploadRes.data.data ||
          uploadRes.data.data.length === 0
        ) {
          throw new Error("Failed to upload image");
        }

        imageUrl = uploadRes.data.data[0];
      }

      const res = await editBanner(banner._id, { image: imageUrl });
      
      if (res.data && res.data.data) {
        onSuccess(res.data.data);
        onClose();
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        setError("Failed to update banner");
      }
    } catch (err) {
      console.error("Edit error:", err);
      setError(err.response?.data?.msg || "An error occurred while updating");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("file-input").click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Banner</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div 
              onClick={triggerFileInput}
              className={`mb-6 border-2 ${previewUrl ? 'border-gray-200' : 'border-dashed border-indigo-300'} 
                rounded-lg p-6 text-center cursor-pointer transition-all hover:bg-gray-50
                ${previewUrl ? 'bg-white' : 'bg-indigo-50'}`}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Banner preview"
                    className="max-h-60 mx-auto object-contain rounded-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-md transition-opacity">
                    <p className="text-white font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Image 
                    className="mx-auto text-indigo-400" 
                    size={56}
                  />
                  <p className="mt-3 text-sm text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG or GIF (Recommended size: 1200x400px)
                  </p>
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    Maximum file size: 1MB
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 text-rose-500 text-sm bg-rose-50 p-3 rounded-md">
                <span className="font-medium">Error: </span>{error}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-[#06C4D9] rounded-md disabled:bg-indigo-300 transition-colors"
                disabled={isUploading}
              >
                {isUploading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                    Updating...
                  </span>
                ) : (
                  "Update Banner"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerEditModal;