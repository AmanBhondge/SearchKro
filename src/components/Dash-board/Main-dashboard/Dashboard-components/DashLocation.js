import React from 'react';

const DashLocation = () => {
  const tableData = [
    { sno: 1, role: 'Buyer', location: 'London', region: 'Europe' },
    { sno: 2, role: 'Buyer', location: 'Mumbai', region: 'Asia' },
    { sno: 3, role: 'Seller', location: 'Berlin', region: 'Europe' }
  ];

  return (
    <div className="w-[515px] h-[273px] bg-white px-3 py-0 shadow-md rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center h-[59px] border-b-2 mb-3">
        <h2 style={{ fontWeight: "700" }} className="text-[20px] leading-[24px]">Location</h2>
        <button className="bg-black text-white w-[83px] h-[32px] rounded-sm">View</button>
      </div>

      {/* Table */}
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b h-[58px] w-[483px]">
              <th className="text-left text-[17px] font-semibold w-[483px]">S.no.</th>
              <th className="text-center text-[17px] font-semibold w-[483px]">Role</th>
              <th className="text-center text-[17px] font-semibold w-[483px]">Location</th>
              <th className="text-center text-[17px] font-semibold w-[483px]">Region</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.sno} className="border-b h-[48px]">
                <td className="text-left text-[17px] font-semibold leading-[16px] text-[#787878]">{row.sno}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.role}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.location}</td>
                <td className="text-center text-[17px] font-semibold leading-[16px] text-[#787878]">{row.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashLocation;