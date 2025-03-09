"use client";

import React, { useState } from 'react'; // Import useState from React

const SellerTable = ({ data }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full mx-auto p-2">
      {/* Table */}
      <div className="overflow-x-auto">  
        <table className="table w-full">
          {/* Table Header */}
          {data.length > 0 ? (
            data.map((item, index) => (
              <thead key={index} className="text-[#3f6075] text-xs font-normal font-['Poppins'] capitalize">
                <tr className="border-b-0">
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
                <tr className="border-b border-[#3f6075]">
                  <td className="text-xl text-[#009b7c] font-['Poppins'] capitalize font-medium">{item.transaction_id}</td>
                  <td className="text-xl font-medium text-[#282f44] font-['Poppins']">{item.amount}$</td>
                  <td className="text-xl font-medium text-[#282f44] font-['Poppins']">{item.date}</td>
                  <td className="text-xl font-medium text-[#282f44] font-['Poppins']">{item.time}</td>
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
