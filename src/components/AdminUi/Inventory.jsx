 "use client";

import React, { useState } from "react";
import { ArrowRight, Search  } from "lucide-react";

const Inventory = ({ onCreateOrderClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    { id: 1, flavour: "Mint", product: "Hart Hagerty", stock: 1220, unitPrice: "$20", img: "/2.png" },
    { id: 2, flavour: "Mint", product: "Brice Swyre", stock: 1220, unitPrice: "$20", img: "/3.png" },
    { id: 3, flavour: "Mint", product: "Velo", stock: 1220, unitPrice: "$20", img: "/11.png" },
    { id: 4, flavour: "Chocolate", product: "Marjy Ferencz", stock: 1220, unitPrice: "$20", img: "/4.png" },
    { id: 5, flavour: "Chocolate", product: "Yancy Tear", stock: 1220, unitPrice: "$20", img: "/5.png" },
  ];

  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group rows by flavour
  const flavourCounts = filteredData.reduce((acc, item) => {
    acc[item.flavour] = (acc[item.flavour] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="overflow-x-auto bg-[#eeeeee] p-4 rounded-lg">
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
            {Object.entries(flavourCounts).map(([flavour, count]) => {
              // Find the first row of each flavour
              const flavourRows = filteredData.filter((item) => item.flavour === flavour);
              return flavourRows.map((row, index) => (
                <tr key={row.id} className={index < count - 1 ? "border-b-0 bg-white" : ""}>
                  {/* Merge flavour cell for the first row */}
                  {index === 0 && (
                    <td
                      rowSpan={count}
                      className="text-lg font-medium font-['Poppins'] capitalize text-center bg-white"
                      style={{ width: "150px" }}
                    >
                      {row.flavour}
                    </td>
                  )}
                  <td style={{ width: "250px"  }}>
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
              ));
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;