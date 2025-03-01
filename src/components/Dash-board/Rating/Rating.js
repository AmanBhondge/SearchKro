import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";

const Rating = () => {
  const locationData = [
    { id: 1, category: "Jeans", shop: "Clothes", rating: 4.5, review: "Positive" },
    { id: 2, category: "iPhone", shop: "Mobile", rating: 3.5, review: "Negative" },
    { id: 3, category: "Dell", shop: "Laptop", rating: 3.5, review: "Negative" },
    { id: 4, category: "Boots", shop: "Shoes", rating: 4.5, review: "Positive" },
    { id: 5, category: "Pizzaria Cafe", shop: "Food", rating: 4.5, review: "Negative" },
    { id: 6, category: "Wellness Oasis Clinic", shop: "Hospital", rating: 3.5, review: "Positive" },
  ];

  // Function to render stars with half-star support
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative inline-block text-gray-300">
          ★
          <span className="absolute top-0 left-0 overflow-hidden w-1/2 text-yellow-400">
            ★
          </span>
        </span>
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return (
      <div className="flex items-center text-bold text-[24px]">
        {stars}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      <div className="w-60 bg-black text-white">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-[32px] font-bold ml-10">Rating</h1>
          
          <Navbar/>
        </div>
        <div className="p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="border-b border-black pb-4 mb-4">
              <h2 className="text-[23px] font-bold">Rating</h2>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white text-black border-b text-[21px] font-weight:800">
                  <th className="text-left py-4 px-6 font-bold">S.no.</th>
                  <th className="text-left py-4 px-6 font-bold">Categories</th>
                  <th className="text-left py-4 px-6 font-bold">Shop</th>
                  <th className="text-left py-4 px-6 font-bold">Rating</th>
                  <th className="text-left py-4 px-6 font-bold">Review</th>
                </tr>
              </thead>
              <tbody>
                {locationData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all text-[21px] font-weight:800">
                    <td className="py-4 px-6">{item.id}</td>
                    <td className="py-4 px-6">{item.category}</td>
                    <td className="py-4 px-6">{item.shop}</td>
                    <td className="py-4 px-6">
                      {renderStars(item.rating)}
                    </td>
                    <td className="py-4 px-6">
                      {item.review === "Positive" ? (
                        <span className="bg-green-100 text-green-800 font-weight:800 text-[19px] w-[119px] h-[39px] py-1 rounded-full inline-flex items-center justify-center">
                          Positive <span className="ml-1">↑</span>
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 font-weight:800 text-[19px] w-[119px] h-[39px] py-1 rounded-full inline-flex items-center justify-center">
                          Negative <span className="ml-1">↓</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;