import React, { useState } from "react";
import { FaTrash, FaEdit, FaImage, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SubcategoryList = ({ category, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubcategories = 
    category?.subCategories?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(
    (category?.subCategories?.length || 0) / itemsPerPage
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const SubcategoryCard = ({ subcategory, index }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full border border-gray-100 hover:border-blue-200 relative group">
        {/* Image Section with gradient overlay */}
        <div className="relative overflow-hidden">
          {subcategory.image ? (
            <div className="relative">
              <img
                src={subcategory.image}
                alt={subcategory.name}
                className="w-full h-52 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x150?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-52 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <FaImage className="text-gray-300 w-12 h-12" />
            </div>
          )}
          
          {/* Index badge */}
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg shadow-sm backdrop-blur-sm">
            #{subcategory.index || index + 1}
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(subcategory);
              }}
              className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
              title="Delete Subcategory"
              aria-label="Delete Subcategory"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
          
          {/* Category tag if available */}
          {subcategory.categoryName && (
            <div className="absolute bottom-3 left-3 bg-blue-500/90 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-sm">
              {subcategory.categoryName}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow relative">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300"
              title={subcategory.name}
            >
              {subcategory.name}
            </h3>
          </div>

          <p 
            className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3"
            title={subcategory.description}
          >
            {subcategory.description || "No description available"}
          </p>
          
          {/* Additional metadata */}
          <div className="mt-auto pt-3 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
            <span>
              Last updated: {subcategory.updatedAt ? new Date(subcategory.updatedAt).toLocaleDateString() : 'N/A'}
            </span>
            
            {subcategory.items && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {subcategory.items.length} Items
              </span>
            )}
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
        <div className="inline-flex items-center rounded-lg shadow-md bg-white border border-gray-200 overflow-hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-3 border-r flex items-center ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Previous page"
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => paginate(1)}
                className="hidden sm:block px-4 py-3 border-r text-gray-700 hover:bg-blue-50 font-medium"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="hidden sm:block px-4 py-3 border-r text-gray-400">
                  ...
                </span>
              )}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`hidden sm:block px-4 py-3 border-r ${
                  currentPage === number
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {number}
              </button>
            )
          )}

          {endPage < totalPages - 1 && (
            <span className="hidden sm:block px-4 py-3 border-r text-gray-400">
              ...
            </span>
          )}

          {endPage < totalPages && (
            <button
              onClick={() => paginate(totalPages)}
              className="hidden sm:block px-4 py-3 border-r text-gray-700 hover:bg-blue-50 font-medium"
            >
              {totalPages}
            </button>
          )}

          {/* Mobile page indicator */}
          <span className="sm:hidden px-4 py-3 border-r text-gray-700 font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-3 flex items-center ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Next page"
          >
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </nav>
    );
  };

  // Empty state with more attractive styling
  if (!category?.subCategories || category.subCategories.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center border border-gray-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <FaImage className="text-gray-400 w-10 h-10" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-3">No Subcategories Found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          This category doesn't have any subcategories yet. Add subcategories to organize your content better.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category header info */}
      {category && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{category.name} Subcategories</h2>
          <p className="text-gray-600">
            Showing {currentSubcategories.length} of {category.subCategories.length} subcategories
          </p>
        </div>
      )}
      
      {/* Grid of subcategories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSubcategories.map((subcategory, idx) => (
          <SubcategoryCard
            key={subcategory._id || idx}
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