import React, { useState, useEffect, useCallback } from 'react';
import { getCategories, updateCategory } from "../../../../components/utils/AxiosApi";

const EditCategory = ({ categoryId, onClose }) => {
    const [formData, setFormData] = useState({ name: "", image: "", index: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Fetch category data
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

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            // Create update payload according to API requirements
            const updatePayload = {
                index: formData.index,
                name: formData.name
            };
            
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
                    <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image || ''}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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