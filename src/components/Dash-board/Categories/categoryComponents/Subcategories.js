import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, deleteCategory, updateCategory } from "../../../utils/AxiosApi";
import SubcategoryList from "./SubcategoryList";
import EditCategory from "./EditCategory";

const SubCategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCategories();
        if (!response?.data?.data) {
          throw new Error("Invalid response format");
        }

        const categories = response.data.data;
        const foundCategory = categories.find((cat) => cat._id === categoryId);

        if (!foundCategory) {
          throw new Error("Category not found");
        }

        setCategory({
          ...foundCategory,
          subCategories: foundCategory.subCategories || [],
        });
      } catch (err) {
        setError(
          err.message ||
          "Failed to load category details. Please try again."
        );
        console.error("Error fetching category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleBack = () => {
    navigate("/categories");
  };

  const handleDelete = async (subcategory) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        // Use the index from the subcategory (like "2.1" for first subcategory of category 2)
        await deleteCategory(subcategory.index);
        
        // Refetch the category to get updated subcategories
        const response = await getCategories();
        const updatedCategories = response.data.data;
        const updatedCategory = updatedCategories.find(cat => cat._id === categoryId);
        
        setCategory({
          ...updatedCategory,
          subCategories: updatedCategory.subCategories || []
        });
        alert("Subcategory deleted successfully!");
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory. Please try again.");
      }
    }
  };

  const openEditModal = (subcategory) => {
    setCategoryToEdit(subcategory);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCategoryToEdit(null);
  };

  const handleUpdateSubcategory = async (updatedSubcategory) => {
    try {
      await updateCategory(updatedSubcategory._id, updatedSubcategory);
      // Refetch the category to get updated data
      const response = await getCategories();
      const updatedCategories = response.data.data;
      const updatedCategory = updatedCategories.find(cat => cat._id === categoryId);
      
      setCategory({
        ...updatedCategory,
        subCategories: updatedCategory.subCategories || []
      });
      closeEditModal();
    } catch (error) {
      console.error("Error updating subcategory:", error);
      alert("Failed to update subcategory. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p>{error}</p>
            <button
              onClick={handleBack}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Go back to categories"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {category.name} - Subcategories
            </h1>
          </div>
          <span className="text-sm text-gray-500">
            {category.subCategories.length} subcategories
          </span>
        </div>

        <SubcategoryList 
          category={category}
          onDelete={handleDelete}
          onEdit={openEditModal}
        />

        {isEditing && categoryToEdit && (
          <EditCategory
            isOpen={isEditing}
            onClose={closeEditModal}
            category={categoryToEdit}
            onUpdate={handleUpdateSubcategory}
          />
        )}
      </div>
    </div>
  );
};

export default SubCategories;