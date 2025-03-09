"use client";

import React from "react";

const OrderCard = ({ id, email, createdAt, totalAmount, commission }) => {
  return (
    <div className="bg-white p-4 mb-4 flex items-center border border-[#ececec] rounded-lg w-[800px]">
        <div className="w-[150px] h-[150px] flex items-center justify-center bg-[#ececec] rounded-lg">
  <img
    alt="Product image of ZYN" 
    className="w-24 h-24"
    src="/4.png"
  />
</div>

      <div className="flex-1 text-left ml-6">
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins']">Order Id</div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins'] capitalize">{id}</div>
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins'] mt-[31px]">Email</div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins']">{email}</div>
      </div>
      <div className="text-right">
        <div className="text-zinc-500 text-base font-medium font-['Poppins'] mb-2">{createdAt}</div>
        <div className="text-black text-xl font-medium font-['Poppins'] mt-[6px]">Total : {totalAmount} $</div>
        <div className="text-black text-base font-medium font-['Poppins'] mt-[30px]">
          Commission <span className="text-[#009b7c] text-base font-medium font-['Poppins']">{commission}$</span>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const astatus = "FULL FILLED"; // Change this to filter by different astatuses

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Get user ID from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const currentUser = JSON.parse(storedUser);
        const currentUserId = currentUser.id;

        // Fetch users
        const usersResponse = await fetch("https://pouchesworldwide.com/strapi/api/users");
        const users = await usersResponse.json();

        // Find users referred by the current user
        const referredUsers = users.filter(user => user.referEmail === currentUser.email);

        // Get referred user IDs
        const referredUserIds = referredUsers.map(user => user.id);

        // Fetch all orders
        const ordersResponse = await fetch("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        const ordersData = await ordersResponse.json();

        // Extract orders from response
        const allOrders = ordersData.data || [];

        // Filter orders by referred user IDs
        const filteredOrders = allOrders.filter(order => 
          order.user && referredUserIds.includes(order.user.id)
        );

        // Further filter orders by astatus
        const finalOrders = filteredOrders.filter(order => order.astatus === astatus);

        setOrders(finalOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;

