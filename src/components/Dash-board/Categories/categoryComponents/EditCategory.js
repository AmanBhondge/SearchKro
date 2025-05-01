import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getCategories, updateCategory, UploadImg } from "../../../utils/AxiosApi";

const EditCategory = ({ categoryId, onClose }) => {
    const [formData, setFormData] = useState({ name: "", image: "", index: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchCategory = async () => {
            setIsLoading(true);
            try {
                const response = await getCategories();
                // Find the category with matching ID
                const categoryData = response.data.data.find(cat => cat._id === categoryId);
                
                if (categoryData) {
                    setFormData({
                        name: categoryData.name || '',
                        image: categoryData.image || '',
                        index: categoryData.index ? String(categoryData.index) : ''
                    });
                    setError(null);
                } else {
                    setError("Category not found");
                }
            } catch (err) {
                setError("Failed to load category details. Please try again.");
                console.error("Error fetching category:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);

    // Handle input changes
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }, []);

    // Handle image upload
    const handleImageUpload = useCallback(async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadLoading(true);
        try {
            // Create FormData object for file upload
            const formData = new FormData();
            formData.append('image', file);

            // Call the UploadImg API
            const response = await UploadImg(formData);
            
            // Log the entire response to fully understand its structure
            console.log("Full image upload response:", response);
            if (response.data) console.log("response.data:", response.data);
            
            // Define a recursive function to search for URL in the response
            const findImageUrl = (obj) => {
                // If given a string that looks like a URL, return it
                if (typeof obj === 'string' && (obj.startsWith('http') || obj.startsWith('/uploads'))) {
                    return obj;
                }
                
                // If given an object, search through its properties
                if (obj && typeof obj === 'object') {
                    // First check common properties
                    const commonProps = ['url', 'image', 'path', 'src', 'link', 'imageUrl', 'file', 'location'];
                    for (const prop of commonProps) {
                        if (obj[prop] && typeof obj[prop] === 'string') {
                            return obj[prop];
                        }
                    }
                    
                    // Then recursively search all properties
                    for (const key in obj) {
                        const result = findImageUrl(obj[key]);
                        if (result) return result;
                    }
                }
                
                return null;
            };
            
            // Try to find the image URL in the response
            const imageUrl = findImageUrl(response);
            console.log("Found image URL:", imageUrl);
            
            if (imageUrl) {
                // Set the URL in the form data
                setFormData(prevData => ({ ...prevData, image: imageUrl }));
                setMessage('Image uploaded successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                // If automatic extraction fails, try to log more details to help debug
                console.error("Could not extract image URL from response");
                console.log("Response type:", typeof response);
                console.log("Response keys:", Object.keys(response));
                if (response.data) {
                    console.log("Data type:", typeof response.data);
                    console.log("Data keys:", Object.keys(response.data));
                }
                setMessage("Error: Could not extract image URL from server response");
            }
        } catch (err) {
            console.error("Error uploading image:", err);
            setMessage(`Error: ${err.response?.data?.message || 'Failed to upload image'}`);
        } finally {
            setUploadLoading(false);
        }
    }, []);

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Handle form submission - keeping the structure exactly as in your original code
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            // Create update payload according to API requirements
            // Keep the exact same structure that was working in your original code
            const updatePayload = {
                index: formData.index,
                name: formData.name,
                image: formData.image // Add the image URL to the payload
            };
            
            console.log('Sending update payload:', updatePayload);
            const response = await updateCategory(updatePayload);
            setMessage('Category updated successfully!');
            console.log('Response:', response);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || 'Failed to update category'}`);
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [formData, onClose]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="relative p-5 bg-white rounded-lg shadow-xl">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="relative p-5 bg-white rounded-lg shadow-xl">
                    Error: {error}
                </div>
            </div>
        );
    }

    // Form Component
    const FormComponent = () => (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="relative p-5 bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Category</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    
                    {/* Image upload section */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
                        <div className="flex items-center space-x-2">
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            
                            {/* Button to trigger file input */}
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={uploadLoading}
                            >
                                {uploadLoading ? 'Uploading...' : 'Choose Image'}
                            </button>
                            
                            {/* Display image preview if available */}
                            {formData.image && (
                                <div className="relative h-16 w-16 border rounded overflow-hidden">
                                    <img 
                                        src={formData.image} 
                                        alt="Category Preview" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Image URL input field */}
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image || ''}
                            onChange={handleInputChange}
                            placeholder="Image URL will appear here after upload"
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="index" className="block text-gray-700 text-sm font-bold mb-2">Index:</label>
                        <input
                            type="text"
                            id="index"
                            name="index"
                            value={formData.index || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Category'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>

                    {message && (
                        <div className={`p-3 rounded ${message.startsWith('Error') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );

    return <FormComponent />;
};

export default React.memo(EditCategory);