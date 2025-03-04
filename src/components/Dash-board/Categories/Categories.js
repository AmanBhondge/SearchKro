import React from "react";
import Sidebar from "../../Common-components/Sidebar/Sidebar";
import Navbar from "../../Common-components/Navbar/Navbar";

const Categories = () => {
  const categoryData = [
    { id: 1, role: "Buyer", category: "Clothes", product: "Jeans", popular: "Positive" },
    { id: 2, role: "Buyer", category: "Mobile", product: "iPhone", popular: "Negative" },
    { id: 3, role: "Seller", category: "Laptop", product: "Dell", popular: "Negative" },
    { id: 4, role: "Buyer", category: "Shoes", product: "Boots", popular: "Positive" },
    { id: 5, role: "Buyer", category: "Food", product: "Pizzaria Cafe", popular: "Negative" },
    { id: 6, role: "Seller", category: "Hospital", product: "Wellness Oasis Clinic", popular: "Positive" },
  ];

  // Extracted Component
  const PopularStatus = ({ status }) => {
    const isPositive = status === "Positive";
    return (
      <span
        className={`w-[119px] h-[39px] py-1 rounded-full inline-flex items-center justify-center ${isPositive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
          } font-bold`}
      >
        {isPositive ? "Positive ↑" : "Negative ↓"}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F7FF94]">
      <div className="md:block md:static fixed z-20 top-0 left-0 h-full bg-white transition-all duration-900">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden bg-[#F4F7FF94] transition-all duration-300">
        <div className="flex mt-0 md:mt-8 justify-between items-center border-b-2 px-4 md:px-8 py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold ml-9 ">
            Categories
          </h1>
          <Navbar />
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full">
            <div className="border-b border-black pb-3 md:pb-4 mb-4">
              <h1 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-bold ml-8">
                Categories
              </h1>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white text-black border-b text-base sm:text-lg md:text-xl 2xl:text-2xl">
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">S.no.</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Role</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Categories</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Product</th>
                    <th className="text-left py-3 md:py-4 px-2 md:px-6 font-bold">Popular</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all text-sm sm:text-base md:text-lg 2xl:text-xl">
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.id}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.role}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.category}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">{item.product}</td>
                      <td className="py-2 md:py-4 px-2 md:px-6">
                        {item.popular === "Positive" ? (
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

export default Categories;