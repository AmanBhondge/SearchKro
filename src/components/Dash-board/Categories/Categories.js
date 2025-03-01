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

  return (
    <div className="flex w-full bg-[#F4F7FF94] relative">
      <Sidebar />

      <div className="p-6 flex-1 overflow-hidden w-[1440px] h-[900px] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-[32px] font-bold ml-10">Categories</h1>
        
        <Navbar/>
      </div>


        <div className="bg-white shadow-lg rounded-lg h-[643px] w-[1063px] p-6 absolute top-[154px] left-[317px]">
          <div className="border-b border-black pb-4 mb-4">
            <h2 className="text-[23px] font-bold">Categories</h2>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white text-black border-b text-[21px]">
                <th className="text-left py-4 px-6 font-bold">S.no.</th>
                <th className="text-left py-4 px-6 font-bold">Role</th>
                <th className="text-left py-4 px-6 font-bold">Categories</th>
                <th className="text-left py-4 px-6 font-bold">Product</th>
                <th className="text-left py-4 px-6 font-bold">Popular</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-all text-[21px] font-weight:800">
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.role}</td>
                  <td className="py-4 px-6">{item.category}</td>
                  <td className="py-4 px-6">{item.product}</td>
                  <td className="py-4 px-6">
                    {item.popular === "Positive" ? (
                      <span className="bg-green-100 font-weight:800 text-green-600 w-[119px] h-[39px] py-1 rounded-full inline-flex items-center justify-center">
                        Positive <span className="ml-1">↑</span>
                      </span>
                    ) : (
                      <span className="bg-red-100 font-weight:800 text-red-600 w-[119px] h-[39px] py-1 rounded-full inline-flex items-center justify-center">
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
  );
};

export default Categories;