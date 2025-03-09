"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { ArrowRight, Search } from "lucide-react";

const Inventory = ({ onCreateOrderClick, UIDS }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Extract UID from the URL using usePathname
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const UID = pathSegments[pathSegments.length - 1]; // Get the last part of the URL

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pouchesworldwide.com/strapi/api/inventories?populate[stock][populate]=*&populate=user"
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data
      .filter((item) => item.user.some((user) => user.id === Number(UID))) // Convert UID to number for comparison
      .flatMap((item) =>
        item.stock.map((stockItem) => ({
          id: stockItem.id,
          flavour: stockItem.product?.Name || "Unknown",
          product: stockItem.product?.Name || "Unknown",
          stock: stockItem.Cans || 0,
          unitPrice: `$${stockItem.product?.price || 0}`,
          img: "/2.png", // Placeholder image, replace with actual image URL if available
          userId: item.user[0]?.id || "Unknown",
        }))
      )
      .filter((item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredData(filtered);
  }, [data, UID, searchTerm]);

  return (
    <>
      <div className="overflow-x-auto bg-[#eeeeee] p-4 rounded-lg">
        <div>{UIDS}</div>
        <table className="table rounded-t-lg overflow-hidden">
          {/* Table Head */}
          <thead className="h-[51px] bg-[#f5d061] text-black text-lg font-['Inter'] capitalize">
            <tr>
              <th>Flavour</th>
              <th style={{ width: "150px" }}>Product</th>
              {/* Search Bar */}
              <th className="relative" style={{ width: "350px" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Here..."
                  className="w-full h-[39px] bg-white/30 rounded-[8px] px-10 py-2 text-black border border-white placeholder-black text-lg font-light"
                />
                <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-black">
                  <Search size={20} />
                </div>
              </th>
              <th>Unit Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.map((row) => (
              <tr key={row.id}>
              {/*  <td className="text-lg font-medium font-['Poppins'] capitalize text-center bg-white">
                  {row.userId}
                </td>*/}
                <td
                  className="text-lg font-medium font-['Poppins'] capitalize text-center bg-white"
                  style={{ width: "150px" }}
                >
                  {row.flavour}
                </td>
                <td style={{ width: "250px" }}>
                  <div className="flex items-center gap-3">
                    {/* Updated image container */}
                    <div className="w-16 h-16 rounded-[7.03px] overflow-hidden bg-[#ececec] ">
                      <img
                        src={row.img}
                        alt={row.product}
                        className="w-[64px] h-[64px] object-cover"
                      />
                    </div>
                    <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                      {row.product}
                    </div>
                  </div>
                </td>
                <td style={{ width: "150px" }}></td>
                <td
                  className="text-lg font-medium font-['Poppins'] capitalize"
                  style={{ width: "150px" }}
                >
                  {row.unitPrice}
                </td>
                <td
                  className="text-lg font-medium font-['Poppins'] capitalize"
                  style={{ width: "100px" }}
                >
                  {row.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;