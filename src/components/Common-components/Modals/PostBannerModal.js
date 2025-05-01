import React, { useState } from "react";
import { postBanner, createBanner } from "../../utils/AxiosApi";
import { IoMdClose } from "react-icons/io";
import { MdFileUpload, MdError } from "react-icons/md";

const PostBannerModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setSelectedFile(file);
    setError("");

    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an image");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadResponse = await postBanner(formData);

      if (uploadResponse.data?.data?.length > 0) {
        const imageUrl = uploadResponse.data.data[0];
        const createResponse = await createBanner({ image: imageUrl });

        if (createResponse.data?.data) {
          onSuccess(createResponse.data.data);
          setSelectedFile(null);
          setPreviewUrl(null);
          onClose();
        } else {
          setError("Failed to create banner");
        }
      } else {
        setError("Failed to upload image");
      }
    } catch (error) {
      console.error("Error in banner creation process:", error);
      setError(
        error.response?.data?.msg ||
          "An error occurred while creating the banner"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={handleModalClick}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#191919]">Add New Banner</h2>
            <button
              onClick={handleCloseClick}
              className="text-gray-500 hover:text-[#191919] transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#191919] transition-colors"
              onClick={() => document.getElementById("file-upload").click()}
            >
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Banner preview"
                    className="max-h-48 mx-auto object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <IoMdClose size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <MdFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {error && (
              <div className="mb-4 text-red-500 text-sm flex items-center gap-1">
                <MdError size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={handleCloseClick}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#191919] rounded-md hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? "Uploading..." : "Add Banner"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostBannerModal;