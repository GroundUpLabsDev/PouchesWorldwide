"use client";

import React, { useState } from "react"; // Import useState from React

const SellerTable = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile.includes(search)
  );

  return (
    <div className="w-full mx-auto p-1">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <thead key={index} className="text-[#3f6075] text-xs font-normal font-['Poppins'] capitalize">
                <tr className="border-b-0">
                  <th className="px-2 py-1">referral name</th> {/* Reduced padding */}
                  <th className="px-2 py-1">Email</th> {/* Reduced padding */}
                  <th className="px-2 py-1">income</th> {/* Reduced padding */}
                  <th className="px-2 py-1">Date</th> {/* Reduced padding */}
                </tr>
                <tr className="border-b border-[#3f6075] ">
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins'] capitalize">{item.name}</td> {/* Reduced padding */}
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{item.email}</td> {/* Reduced padding */}
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{item.income}$</td> {/* Reduced padding */}
                  <td className="px-2 py-1 text-lg text-[#282f44] font-['Poppins']">{item.date}</td> {/* Reduced padding */}
                </tr>
              </thead>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No data found
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default SellerTable;