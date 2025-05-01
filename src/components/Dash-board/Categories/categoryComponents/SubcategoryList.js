import React, { useState } from "react";
import { FaTrash, FaEdit, FaImage } from "react-icons/fa";

const SubcategoryList = ({ category, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  const SubcategoryCard = ({ subcategory, index }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full border border-gray-100 hover:border-blue-200 relative">
        {/* Image Section with gradient overlay */}
        <div className="relative overflow-hidden">
          {subcategory.image ? (
            <div className="relative group">
              <img
                src={subcategory.image}
                alt={subcategory.name}
                className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x150?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-52 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <FaImage className="text-gray-300 w-12 h-12" />
            </div>
          )}

          {/* Index badge */}
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg shadow-sm">
            #{subcategory.index || index + 1}
          </div>

          {/* Action buttons - now in a vertical column with nicer styling */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(subcategory);
              }}
              className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 shadow-md"
              title="Edit Subcategory"
              aria-label="Edit Subcategory"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(subcategory);
              }}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
              title="Delete Subcategory"
              aria-label="Delete Subcategory"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3
              className="text-lg font-bold text-gray-800 line-clamp-1"
              title={subcategory.name}
            >
              {subcategory.name}
            </h3>
          </div>

          <p
            className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3"
            title={subcategory.description}
          >
            {subcategory.description || "No description available"}
          </p>

          {/* Additional metadata could go here */}
          <div className="mt-auto pt-3 border-t border-gray-100 text-sm text-gray-500">
            Last updated:{" "}
            {subcategory.updatedAt
              ? new Date(subcategory.updatedAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
      </div>
    );
  };

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
      <nav className="flex justify-center mt-8" aria-label="Pagination">
        <div className="inline-flex items-center rounded-lg shadow-sm bg-white border border-gray-200">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-l-lg border-r ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Previous page"
          >
            &laquo;
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className="hidden sm:block px-4 py-2 border-r text-gray-700 hover:bg-blue-50"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="hidden sm:block px-4 py-2 border-r text-gray-400">
                  ...
                </span>
              )}
            </>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`hidden sm:block px-4 py-2 border-r ${
                currentPage === number
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages - 1 && (
            <span className="hidden sm:block px-4 py-2 border-r text-gray-400">
              ...
            </span>
          )}

          {endPage < totalPages && (
            <button
              onClick={() => paginate(totalPages)}
              className="hidden sm:block px-4 py-2 border-r text-gray-700 hover:bg-blue-50"
            >
              {totalPages}
            </button>
          )}

          {/* Mobile page indicator */}
          <span className="sm:hidden px-4 py-2 border-r text-gray-700">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-r-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </div>
      </nav>
    );
  };

  if (!category?.subCategories || category.subCategories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <FaImage className="text-gray-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          No Subcategories Found
        </h3>
        <p className="text-gray-500">
          This category doesn't have any subcategories yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default SubcategoryList;
