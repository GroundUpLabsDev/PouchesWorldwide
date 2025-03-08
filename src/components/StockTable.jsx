"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";

const StockTable = ({ onCreateOrderClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // We'll store only orders (for the logged-in user) here.
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
        const ordersResponse = await fetch("http://146.190.245.42:1337/api/orders");
        const ordersJson = await ordersResponse.json();
        // Filter orders for the logged in user.
        const userOrders = ordersJson.data.filter(
          (order) => order.user && order.user.id === userId
        );

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrdersData();
  }, [userId]);

  // Filter orders based on search term against the product name from cart_items.
  const filteredOrders = orders.filter((order) => {
    return (
      order.cart_items &&
      order.cart_items.product_name &&
      order.cart_items.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                {/* Category */}
                <td style={{ width: "150px" }}>
                  <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                    {order.cart_items &&
                    order.cart_items.category &&
                    order.cart_items.category.Name
                      ? order.cart_items.category.Name
                      : "N/A"}
                  </div>
                </td>
                {/* Product */}
                <td style={{ width: "200px" }}>
                  <div className="flex items-center gap-3">
                    <div className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">
                      {order.cart_items && order.cart_items.product_name
                        ? order.cart_items.product_name
                        : "N/A"}
                    </div>
                  </div>
                </td>
                {/* Image */}
                <td style={{ width: "150px" }}>
                  <div className="w-16 h-16 rounded overflow-hidden bg-[#ececec]">
                    {order.cart_items &&
                    order.cart_items.Image &&
                    order.cart_items.Image.url ? (
                      <img
                        src={`http://146.190.245.42:1337${order.cart_items.Image.url}`}
                        alt={order.cart_items.product_name || "Product Image"}
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
                  {order.cart_items && order.cart_items.unit_price
                    ? order.cart_items.unit_price
                    : "N/A"}
                </td>
                {/* Stock */}
                <td
                  className="text-lg font-medium font-['Poppins'] capitalize"
                  style={{ width: "100px" }}
                >
                  {order.Stock ? order.Stock : "N/A"}
                </td>
                {/* Add Order */}
                <td style={{ width: "150px" }}>
                  <button
                    onClick={() =>
                      onCreateOrderClick(
                        order.cart_items && order.cart_items.product_id
                          ? order.cart_items.product_id
                          : order.id
                      )
                    }
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