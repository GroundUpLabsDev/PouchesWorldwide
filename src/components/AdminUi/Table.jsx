"use client";

import React, { useState } from "react"; 

const SellerTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      (item.name?.toLowerCase().includes(search.toLowerCase()) || "") ||
      (item.email?.toLowerCase().includes(search.toLowerCase()) || "") ||
      (item.mobile?.includes(search) || "")
  );
  

  return (
    <div className="w-full mx-auto p-1">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header (Fixed Position) */}
          <thead className="text-[#3f6075] text-xs font-normal font-['Poppins'] capitalize">
            <tr className="border-b-0">
              <th className="px-2 py-1">Referral Name</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Income</th>
              <th className="px-2 py-1">Date</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b border-[#3f6075]">
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins'] capitalize">{item.user.username}</td>
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{item.user.email}</td>
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{(item.totalAmount * 0.05).toFixed(2)}$</td>
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{new Date(item.updatedAt).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTable;
