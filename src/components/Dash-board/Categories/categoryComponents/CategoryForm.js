import React, { useState } from 'react';
import { createCategory } from '../../../utils/AxiosApi'; 

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    index: '',
    subCategories: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Add a new subcategory field
  const addSubcategory = (parentPath = null) => {
    const newSubcategory = {
      name: '',
      image: '',
      index: '',
      subCategories: []
    };

    if (!parentPath) {
      // Add to main level
      setFormData({
        ...formData,
        subCategories: [...formData.subCategories, newSubcategory]
      });
      return;
    }

    // Parse the path to find the right nested array
    const pathArray = parentPath.split('.');
    const updatedFormData = { ...formData };
    let current = updatedFormData;

    for (let i = 0; i < pathArray.length; i++) {
      const index = parseInt(pathArray[i]);
      if (i === pathArray.length - 1) {
        current.subCategories[index].subCategories.push(newSubcategory);
      } else {
        current = current.subCategories[index];
      }
    }

    setFormData(updatedFormData);
  };

  // Handle input changes for the main category
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle input changes for subcategories
  const handleSubcategoryChange = (e, path) => {
    const { name, value } = e.target;
    const pathArray = path.split('.');
    const updatedFormData = { ...formData };
    let current = updatedFormData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      const index = parseInt(pathArray[i]);
      current = current.subCategories[index];
    }

    const lastIndex = parseInt(pathArray[pathArray.length - 1]);
    current.subCategories[lastIndex] = {
      ...current.subCategories[lastIndex],
      [name]: value
    };

    setFormData(updatedFormData);
  };

  // Remove a subcategory
  const removeSubcategory = (path) => {
    const pathArray = path.split('.');
    const updatedFormData = { ...formData };
    let current = updatedFormData;

    if (pathArray.length === 1) {
      // Remove from main level
      const index = parseInt(pathArray[0]);
      updatedFormData.subCategories.splice(index, 1);
      setFormData(updatedFormData);
      return;
    }

    // Navigate to the parent containing the subcategory to remove
    for (let i = 0; i < pathArray.length - 1; i++) {
      const index = parseInt(pathArray[i]);
      current = current.subCategories[index];
    }

    const lastIndex = parseInt(pathArray[pathArray.length - 1]);
    current.subCategories.splice(lastIndex, 1);
    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await createCategory(formData);
      setMessage('Category created successfully!');
      setFormData({
        name: '',
        image: '',
        index: '',
        subCategories: []
      });
      console.log('Response:', response);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || 'Failed to create category'}`);
    } finally {
      setLoading(false);
    }
  };

  // Recursive component to render subcategories
  const RenderSubcategories = ({ subcategories, path = '' }) => {
    return subcategories.map((subcategory, index) => {
      const currentPath = path ? `${path}.${index}` : `${index}`;
      
      return (
        <div key={currentPath} className="ml-6 mt-3 p-3 border-l-2 border-blue-300">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Subcategory {currentPath}</h4>
            <button 
              type="button"
              onClick={() => removeSubcategory(currentPath)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name*</label>
              <input
                type="text"
                name="name"
                value={subcategory.name}
                onChange={(e) => handleSubcategoryChange(e, currentPath)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Index</label>
              <input
                type="text"
                name="index"
                value={subcategory.index}
                onChange={(e) => handleSubcategoryChange(e, currentPath)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. 1.1"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={subcategory.image}
                onChange={(e) => handleSubcategoryChange(e, currentPath)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {subcategory.subCategories.length > 0 && (
            <RenderSubcategories 
              subcategories={subcategory.subCategories} 
              path={currentPath} 
            />
          )}
          
          <button
            type="button"
            onClick={() => addSubcategory(currentPath)}
            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Sub-subcategory
          </button>
        </div>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Category</h2>
      
      {message && (
        <div className={`p-3 rounded mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Index</label>
            <input
              type="text"
              name="index"
              value={formData.index}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g. 1"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Subcategories</h3>
            <button
              type="button"
              onClick={() => addSubcategory()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Subcategory
            </button>
          </div>
          
          {formData.subCategories.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <RenderSubcategories subcategories={formData.subCategories} />
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;