"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircleArrowRight, Search } from 'lucide-react';

const OrderTable = ({ onSelectUser }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://146.190.245.42:1337/api/users/");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        
        // Filter data based on your conditions (wholesaler or distributor, confirmed true, blocked false)
        const filteredData = result.filter(
          (item) => (item.urole === "wholesaler" || item.urole === "distributor") &&
                    item.confirmed === true && 
                    item.blocked === false
        );
        setData(filteredData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If there's a search term, filter based on the address, otherwise show all data
  const filteredData = search
    ? data.filter((item) =>
        item.address && item.address.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  const handleArrowClick = (userId) => {
    router.push(`/admin/whalesellers/sellerDetails/${userId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <hr className="border-black my-4" />
      <div className="flex justify-between items-center mb-12">
        <div className="text-black text-xl font-medium">Add Order Processor</div>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by Location..."
            className="input input-bordered border-[#3e5f75] w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b-0 text-base text-[#282f44]">
              <th>Username</th>
              <th>Location</th>
              <th>Availability (cans)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="border-b border-[#3f6075] text-xl font-medium text-black">
                  <td
                    className="text-xl font-['Poppins'] capitalize cursor-pointer"
                    onClick={() => handleArrowClick(item.id)}
                  >
                    {item.username}
                  </td>
                  <td className="text-xl font-['Poppins']">{item.address}</td>
                  <td className="text-xl font-['Poppins']">{item.cans}</td>
                  <td>
                    <button
                      className="btn h-12 btn-sm btn-ghost bg-gradient-to-br from-[#f5d061] to-[#e6af2e] text-black"
                      onClick={() => onSelectUser(item.id)}
                    >
                      Select <CircleArrowRight className="w-[28px] h-[28px] text-black" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
