import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, deleteCategory } from "../../../utils/AxiosApi";
import { FaTrash, FaEdit } from "react-icons/fa"; 
import EditCategory from "./EditCategory";

const SubCategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isEditing, setIsEditing] = useState(false);  // state to manage editing state
  const [categoryToEdit, setCategoryToEdit] = useState(null); // state to store category to edit

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubcategories =
    category?.subCategories.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(
    (category?.subCategories.length || 0) / itemsPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleBack = () => {
    navigate("/categories");
  };

  const handleDelete = async (id, index) => {
    try {
      await deleteCategory(id);
      setCategory((prevCategory) => {
        const updatedSubCategories = prevCategory.subCategories.filter(
          (_, idx) => idx !== index
        );
        return { ...prevCategory, subCategories: updatedSubCategories };
      });
      alert("Subcategory deleted successfully!");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert("Failed to delete subcategory. Please try again.");
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

  const handleUpdateSubcategory = (updatedSubcategory) => {
      // Update the subcategory in the state
      setCategory((prevCategory) => {
          const updatedSubCategories = prevCategory.subCategories.map((sub) =>
              sub._id === updatedSubcategory._id ? updatedSubcategory : sub
          );
          return { ...prevCategory, subCategories: updatedSubCategories };
      });
      closeEditModal(); // Close the modal after updating
  };

  // Render subcategory card
  const SubcategoryCard = ({ subcategory, index }) => {
    const handleCardClick = () => {
      // Navigate to subcategory details if needed
      // navigate(`/categories/${categoryId}/${subcategory._id}`);
    };

    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-l-4 border-blue-500 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          {subcategory.image ? (
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="w-full h-40 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x150?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Delete Icon Button */}
          <div className="absolute top-2 right-2 flex flex-col items-center">
              <button
                  onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(subcategory);
                  }}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 mb-2"
                  title="Edit Subcategory"
              >
                  <FaEdit />
              </button>
              <button
                  onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(subcategory._id, index);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="Delete Subcategory"
              >
                  <FaTrash />
              </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3
              className="text-lg font-bold text-gray-800 line-clamp-1"
              title={subcategory.name}
            >
              {subcategory.name}
            </h3>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {category?.index ? `${category.index}.${index}` : index}
            </span>
          </div>

          <p
            className="text-gray-600 text-sm mb-3 line-clamp-2"
            title={subcategory.description}
          >
            {subcategory.description || "No description available"}
          </p>
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);

      if (currentPage <= halfVisible + 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - halfVisible) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
      }
    }

    return (
      <nav className="flex justify-center mt-6">
        <ul className="flex items-center space-x-1">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Previous page"
            >
              &laquo;
            </button>
          </li>

          {startPage > 1 && (
            <li>
              <button
                onClick={() => paginate(1)}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                1
              </button>
            </li>
          )}

          {startPage > 2 && <li className="px-2">...</li>}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
            (number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              </li>
            )
          )}

          {endPage < totalPages - 1 && <li className="px-2">...</li>}

          {endPage < totalPages && (
            <li>
              <button
                onClick={() => paginate(totalPages)}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                {totalPages}
              </button>
            </li>
          )}

          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label="Next page"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
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

        {category.subCategories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSubcategories.map((subcategory, idx) => (
                <SubcategoryCard
                  key={subcategory._id}
                  subcategory={subcategory}
                  index={indexOfFirstItem + idx}
                />
              ))}
            </div>

            <Pagination />
          </>
        ) : (
          <div className="text-center py-10">
            <div className="text-gray-500 text-lg mb-4">
              No subcategories found for this category
            </div>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Back to Categories
            </button>
          </div>
        )}
      </div>
      
        {isEditing && categoryToEdit && (
                <EditCategory
                    isOpen={isEditing}
                    onClose={closeEditModal}
                    category={categoryToEdit}
                    onUpdate={handleUpdateSubcategory}
                />
            )}
    </div>
  );
};

export default SubCategories;