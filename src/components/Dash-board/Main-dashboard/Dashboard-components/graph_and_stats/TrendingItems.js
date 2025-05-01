import React, { useState, useEffect } from 'react';
import { categroryInsights } from '../../../../utils/AxiosApi';

const TrendingItems = () => {
  const [insightsData, setInsightsData] = useState({
    popularItems: [],
    categoryStats: []
  });
  const [activeTab, setActiveTab] = useState('popularItems');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await categroryInsights();
        if (response && response.data && response.data.data) {
          setInsightsData(response.data.data);
        }
      } catch (err) {
        setError('Failed to load insights data');
        console.error('Error fetching insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Trending Items</h2>
      
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-bold text-sm focus:outline-none ${
            activeTab === 'popularItems'
              ? 'border-b-2 border-[#06C4D9] text-[#06C4D9]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('popularItems')}
        >
          Popular Items
        </button>
        <button
          className={`px-4 py-2 font-bold text-sm focus:outline-none ${
            activeTab === 'categoryStats'
              ? 'border-b-2 border-[#06C4D9] text-[#06C4D9]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('categoryStats')}
        >
          Category Statistics
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {activeTab === 'popularItems' && (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Categories</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Popularity Count</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Last Posted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {insightsData.popularItems && insightsData.popularItems.length > 0 ? (
                insightsData.popularItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-md font-semibold rounded-full`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {item.categories.map((category, catIndex) => (
                          <span key={catIndex} className="text-md font-semibold text-gray-800">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-md font-medium">
                      {item.count}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-500">
                      {formatDate(item.lastPosted)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                    No popular items available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'categoryStats' && (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Requirements</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-4 py-3 text-left text-md font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {insightsData.categoryStats && insightsData.categoryStats.length > 0 ? (
                insightsData.categoryStats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-md font-medium">
                      {stat.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="text-md font-semibold">
                        {stat.requirementCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="text-md font-semibold">
                        {stat.productCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="text-md font-semibold">
                        {stat.totalCount}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                    No category statistics available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TrendingItems;