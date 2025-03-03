import React from 'react';
import { Link } from 'react-router-dom';
const DashCategories = () => {
  const tableData = [
    { sno: 1, role: 'Buyer', category: 'Clothes', product: 'Jeans' },
    { sno: 2, role: 'Buyer', category: 'Mobile', product: 'iPhone' },
    { sno: 3, role: 'Seller', category: 'Laptop', product: 'Dell' }
  ];

  return (
    <div className="w-full h-full bg-white px-3 py-0 shadow-md rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center h-[59px] border-b-2 mb-3">
        <h2 style={{ fontWeight: "700" }} className="text-[20px] leading-[24px]">Categories</h2>
        <Link to="/categories"> <button className="bg-black text-white w-[83px] h-[32px] rounded-sm">View</button></Link>
      </div>
      
      {/* Table */}
      <div className="w-[px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b h-[58px] w-[483px]">
              <th className=" text-left text-[17px] font-semibold leading-[18px] w-[483px]">S.no.</th>
              <th className=" text-center text-[17px] font-semibold leading-[18px] w-[483px]">Role</th>
              <th className=" text-center text-[17px] font-semibold leading-[18px] w-[483px]">Categories</th>
              <th className=" text-center text-[17px] font-semibold leading-[18px] w-[483px]">Product</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.sno} className="border-b h-[48px]">
                <td className="text-left text-[17px] font-semibold leading-[16px] text-[#787878]">{row.sno}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.role}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.category}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashCategories;
