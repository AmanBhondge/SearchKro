import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";
import { getCategories, deleteCategory } from "../../../components/utils/AxiosApi";
import CategoryForm from "./categoryComponents/CategoryForm";
import SubCategories from "./categoryComponents/Subcategories";
import CategoryCard from "./categoryComponents/CategoryCard";
import EditCategory from "./categoryComponents/EditCategory";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getCategories();
            setCategories(response.data.data || []);
            setError(null);
        } catch (err) {
            setError("Failed to load categories. Please try again.");
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (category) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                // Use the index instead of _id for deletion
                await deleteCategory(category.index);
                alert("Category deleted successfully!");
                fetchCategories();
            } catch (err) {
                console.error("Error deleting category:", err);
                alert("Failed to delete category. Please try again.");
            }
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowEditModal(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingCategory(null);
        fetchCategories();
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setEditingCategory(null);
        fetchCategories();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const Pagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="flex justify-center mt-6">
                <ul className="flex space-x-2">
                    <li>
                        <button
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Prev
                        </button>
                    </li>

                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === number
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === totalPages || totalPages === 0
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        );
    };

    const renderCategoriesList = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    {error}
                </div>
            );
        }

        if (categories.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">No categories found. Add your first category!</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 bg-black  text-white font-medium py-2 px-4 rounded-lg flex items-center mx-auto"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category
                    </button>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentCategories.map((category, idx) => (
                        <CategoryCard
                            key={category._id || idx}
                            category={category}
                            index={category.index || (indexOfFirstItem + idx + 1).toString()}
                            onDelete={() => handleDelete(category)}
                            onEdit={() => handleEdit(category)}
                        />
                    ))}
                </div>

                {totalPages > 1 && <Pagination />}
            </>
        );
    };

    return (
        <div className="flex h-screen bg-[#F4F7FF94] overflow-hidden" >
            
<div 
  className="md:sticky md:top-0 md:h-screen fixed z-20 top-0 left-0 h-full bg-white transition-all duration-300  scrollbar-hide"
>
  <Sidebar />
</div>
            <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
                <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9 sm:ml-0">
                        Categories
                    </h1>
                    <Navbar />
                </div>

                <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                    {/* Add Form Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-bold">
                                        Add New Category
                                    </h2>
                                    <button
                                        onClick={handleFormClose}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <CategoryForm
                                        onSuccess={handleFormClose}
                                        isEditing={false}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {showEditModal && editingCategory && (
                        <EditCategory 
                            categoryId={editingCategory._id} 
                            onClose={handleEditModalClose} 
                        />
                    )}

                    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full">
                        {categoryId ? (
                            <SubCategories
                                categoryId={categoryId}
                                onBack={() => navigate('/categories')}
                            />
                        ) : (
                            <>
                                <div className="flex justify-between items-center border-b border-black pb-3 md:pb-4 mb-4">
                                    <h1 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold ml-8">
                                        Categories
                                    </h1>
                                    <button
                                        onClick={() => {
                                            setShowForm(true);
                                        }}
                                        className="bg-black hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Category
                                    </button>
                                </div>
                                {renderCategoriesList()}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;