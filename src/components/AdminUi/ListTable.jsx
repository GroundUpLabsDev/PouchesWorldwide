"use client";

import React, { useState } from 'react';

const SellerTable = ({ data }) => {
  const [search] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile.includes(search)
  );

  return (
    <div className="w-full mx-auto p-2">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          {filteredData.length > 0 ? (
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b border-[#3f6075]">
                  <td className="flex items-center gap-3 p-3">
                    <img className="w-[60px] h-[60px] rounded-full border-4 border-[#ffe047]" src="https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk" />
                    <div>
                      <p className="text-[#3e5f75] text-base font-['Poppins']">Name</p>
                      <p className="text-xl font-['Poppins'] capitalize">{item.name}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="text-[#3e5f75] text-base font-['Poppins'] text-left ml-[100px] ">Email</p>
                    <p className="text-xl font-['Poppins'] text-right ">{item.email}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={2} className="text-center py-4">
                  No data found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default SellerTable;