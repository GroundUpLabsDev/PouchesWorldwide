"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "@/components/AdminUi/OrderCard";
import { ListFilter } from "lucide-react";

export default function OrderPage({ userId }) {
  const orders = [
    {
      productImage: "/4.png",
      status: "ASSIGNED",
      date: "2024/09/11",
      totalAmount: 2300,
      customerName: "K.K.Albert",
      address: "C/89 , Kegalle , Sri Lanka",
      productName: "Zyn Smooth Flavor Mint",
      quantity: 23,
      unitPrice: 50,
      itemTotal: 50000,
    },
    {
      productImage: "/3.png",
      status: "PROCESSING",
      date: "2024/09/12",
      totalAmount: 1200,
      customerName: "J.A.Jones",
      address: "A/45 , Colombo , Sri Lanka",
      productName: "Zyn Smooth Flavor Berry",
      quantity: 15,
      unitPrice: 80,
      itemTotal: 12000,
    },
    {
      productImage: "/6.png",
      status: "COMPLETED",
      date: "2024/09/13",
      totalAmount: 1500,
      customerName: "M.K.Thomas",
      address: "B/78 , Galle , Sri Lanka",
      productName: "Zyn Smooth Flavor Citrus",
      quantity: 10,
      unitPrice: 150,
      itemTotal: 15000,
    },
  ];

  // State to track the selected filter status
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [username, setUsername] = useState("");

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/users");
        const users = await response.json();

        // Find the user by userId
        const user = users.find(user => user.id === Number(userId));
        
        if (user) {
          setUsername(user.username);
        } else {
          setUsername("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error loading user");
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle change of selected status
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === "ALL"
    ? orders
    : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Header and filter dropdown container */}
      <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
  <div className="text-white text-base font-normal font-['Poppins'] capitalize">
  distributor account
  </div>
</div>
      <div className="flex items-center justify-between mb-8">
        
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize">
          <span className="text-black">{username}'s Admin Orders</span>
        </h2>
        {/* Filter Dropdown */}
<div className="ml-4 flex items-center gap-2">
  <ListFilter />
  <span>Filter By</span>
  <select
    value={selectedStatus}
    onChange={handleStatusChange}
    className="select select-bordered select-md w-auto"
  >
    <option value="ALL">All</option>
    <option value="ASSIGNED">Assigned</option>
    <option value="PROCESSING">Processing</option>
    <option value="COMPLETED">Completed</option>
  </select>
</div>

      </div>

      <div className="flex flex-col items-center min-h-screen space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))
        ) : (
          <p>No orders found for this status</p>
        )}
      </div>
    </div>
  );
}
