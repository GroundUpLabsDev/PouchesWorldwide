"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import {sendGetRequest} from "@/_config/apiConfig";

const StockTable = ({ onCreateOrderClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  // Retrieve logged-in user from localStorage.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id); // Assuming the user object has an 'id' field.
      }
    }
  }, []);

  // Fetch orders once the userId is available.
  useEffect(() => {
    if (!userId) return;

    const fetchOrdersData = async () => {
      try {
        // Fetch orders.
        const ordersJson = await sendGetRequest('inventories', {populate: "*", 'filters[user][id][$eq]': userId});
        // Filter orders for the logged-in user.
        const userOrders = ordersJson.data

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrdersData();
  }, [userId]);

  return (
    <>
      <div className="w-[871px] text-black text-start text-2xl font-semibold font-['Poppins'] mb-8">
        Stock Management Overview
      </div>
      <div className="overflow-x-auto">
        <table className="table rounded-t-lg overflow-hidden">
          {/* Updated Table Head */}
          <thead className="h-[51px] bg-[#f5d061] text-black text-lg font-['Inter'] capitalize">
            <tr>
              <th style={{ width: "150px" }}>Category</th>
              <th style={{ width: "200px" }}>Product</th>
              <th style={{ width: "150px" }}>Image</th>
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
              <th style={{ width: "150px" }}>Price</th>
              <th style={{ width: "100px" }}>Stock</th>
              <th style={{ width: "150px" }}>Add Order</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) =>
                order.product[0].Name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((order) => (
                <tr key={order.id}>
                  {/* Category */}
                  <td style={{ width: "150px" }}>
                    <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                      {order.product[0].Name || "N/A"}
                    </div>
                  </td>
                  {/* Product */}
                  <td style={{ width: "200px" }}>
                    <div className="flex items-center gap-3">
                      <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                        {order.product[0].Name || "N/A"}
                      </div>
                    </div>
                  </td>
                  {/* Image */}
                  <td style={{ width: "150px" }}>
                    <div className="w-16 h-16 rounded overflow-hidden bg-[#ececec]">
                      {order.product[0].Image2 ? (
                        <img
                          src={order.product[0].Image2}
                          alt={order.product[0].Name || "Product Image"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                  </td>
                  {/* Search column placeholder */}
                  <td style={{ width: "350px" }}></td>
                  {/* Price */}
                  <td
                    className="text-lg font-medium font-['Poppins'] capitalize"
                    style={{ width: "150px" }}
                  >
                    ${order.product[0].price || "N/A"}
                  </td>
                  {/* Stock */}
                  <td
                    className="text-lg font-medium font-['Poppins'] capitalize"
                    style={{ width: "100px" }}
                  >
                    {order.cans || "N/A"}
                  </td>
                  {/* Add Order */}
                  <td style={{ width: "150px" }}>
                    <button
                      onClick={() => onCreateOrderClick(order.id)}
                      className="btn h-[52px] w-[120px] rounded-lg text-black text-[10px] font-medium font-['Poppins'] capitalize inline-flex items-center justify-center gap-1"
                      style={{
                        background: "linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%)",
                      }}
                    >
                      Add Order <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StockTable;