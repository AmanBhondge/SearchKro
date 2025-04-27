import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, index, handleDelete }) => {
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      {/* Image Section */}
      <div className="relative">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x150?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        {hasSubcategories && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
            {category.subCategories.length} Subcategories
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{category.name}</h3>
          <span className="text-sm text-gray-500">
            {category.index || index}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 flex-grow">
          {category.description || "No description available"}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          {hasSubcategories ? (
            <Link
              to={`/categories/${category._id}`}
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            >
              View Subcategories
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <span className="text-gray-400 text-sm">No subcategories</span>
          )}

          <div className="flex space-x-2">
            <Link
              to={`/edit-category/${category._id}`}
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
              title="Edit Category"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Link>
            <button
              onClick={() => handleDelete(category.index)}
              className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              title="Delete Category"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
