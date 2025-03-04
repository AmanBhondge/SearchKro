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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }

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
      <div className="md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-10 py-4">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9 ">
            Rating
          </h1>
          <Navbar />
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full">
            <div className="border-b border-black pb-3 md:pb-4 mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold">
                Rating
              </h2>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white text-black border-b text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl">
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">S.no.</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Categories</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Shop</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Rating</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {locationData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all text-sm sm:text-base md:text-lg 2xl:text-xl">
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.id}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.category}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.shop}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">
                        {renderStars(item.rating)}
                      </td>
                      <td className="py-2 md:py-4 px-2 md:px-6">
                        {item.review === "Positive" ? (
                          <span className="bg-green-100 text-green-600 px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap">
                            Positive <span className="ml-1">↑</span>
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 px-2 md:px-4 py-1 rounded-full inline-flex items-center justify-center text-xs sm:text-sm md:text-base 2xl:text-lg whitespace-nowrap">
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
    </div>
  );
};

export default Rating;