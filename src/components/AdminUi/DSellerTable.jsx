"use client";

import React, { useState } from 'react'; // Import useState from React
import { useRouter } from 'next/navigation';
import { CircleArrowRight, Search } from 'lucide-react';

const SellerTable = ({ data }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.mobileNumber.includes(search)
  );

  const handleArrowClick = (userId) => {
    router.push(`/admin/distributers/sellerDetails/${userId}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      {/* Search Bar */}
      <div className="flex justify-start mb-12 relative">
        <input
          type="text"
          placeholder="Search Here..."
          className="input input-bordered border-[#3e5f75] w-full max-w-lg pl-10" // Changed max-w-xs to max-w-lg
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b-0">
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Email</th>
              <th className="px-2 py-1">Mobile Number</th>
              <th className="px-2 py-1">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b border-[#3f6075] mb-4">
                  <td className="text-xl font-['Poppins'] capitalize px-2 py-1">{item.username}</td>
                  <td className="text-xl font-['Poppins'] px-2 py-1">{item.email}</td>
                  <td className="text-xl font-['Poppins'] px-2 py-1">{item.mobileNumber}</td>
                  <td className="px-2 py-1">
                    <button
                      className="btn btn-sm btn-ghost hover:bg-transparent"
                      onClick={() => handleArrowClick(item.id)}
                    >
                      <CircleArrowRight className="w-[32px] h-[32px] text-[#e6af2e]" />
                    </button>
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
