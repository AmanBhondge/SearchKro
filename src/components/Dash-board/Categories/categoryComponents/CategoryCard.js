import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, index, onDelete, onEdit }) => {
    const hasSubcategories = category.subCategories && category.subCategories.length > 0;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full border border-gray-100 hover:border-blue-200 relative">
            {/* Badge for subcategories - now floating over image */}
            {hasSubcategories && (
                <div className="absolute top-3 right-3 bg-black text-white text-xs font-medium px-3 py-1 rounded-full z-10 shadow-md flex items-center gap-1">
                    <span>{category.subCategories.length}</span>
                    <span className="hidden sm:inline">Subcategories</span>
                </div>
            )}

            {/* Image Section with gradient overlay */}
            <div className="relative overflow-hidden">
                {category.image ? (
                    <div className="relative group">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-56 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                e.target.onerror = null;
                                // Error handling code could go here
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                ) : (
                    <div className="w-full h-56 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                
                {/* Category index badge */}
                <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-lg shadow-sm">
                    #{category.index || index}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{category.name}</h3>
                
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {category.description || "No description available"}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                    {hasSubcategories ? (
                        <Link
                            to={`/categories/${category._id}`}
                            className="text-black hover:text-blue-800 flex items-center text-sm font-medium transition-colors duration-200"
                        >
                            View Subcategories
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ) : (
                        <span className="text-gray-400 text-sm">No subcategories</span>
                    )}

                    <div className="flex space-x-1">
                        <button
                            onClick={onEdit}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            title="Edit Category"
                            aria-label="Edit Category"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                            title="Delete Category"
                            aria-label="Delete Category"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;