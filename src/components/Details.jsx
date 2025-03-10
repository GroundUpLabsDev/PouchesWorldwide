"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/AdminUi/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import PendingCard from "@/components/AdminUi/orderdetail/PendingCard";
import OrderTable from "@/components/AdminUi/orderdetail/OrderTable";

const Details = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // Extract orderId from URL

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]); // Store filtered users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderEmail, setSelectedOrderEmail] = useState(null); // State to store selected order's email

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setOrders(result.data || []);
      } catch (err) {
        setError(err.message || "Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/users/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const usersData = await response.json();

        // Filter users based on conditions
        const filteredUsers = usersData.filter(
          (user) =>
            (user.urole === "wholesaler" || user.urole === "distributor") &&
            user.confirmed === true &&
            user.blocked === false
        );

        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message || "Error fetching users");
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

  // Find the order with the matching ID and set its email
  const selectedOrder = orders.find((order) => String(order.id) === orderId);
  useEffect(() => {
    if (selectedOrder) {
      setSelectedOrderEmail(selectedOrder?.user?.email || null); // Set the email from the selected order
    }
  }, [selectedOrder]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-auto max-w-8xl">
          <p className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] ml-[200px]">
            Loading data...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-auto max-w-8xl">
          <p className="pt-12 pl-16 text-center text-red-500 text-[32px] font-semibold font-['Poppins']">
            Error: {error}
          </p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-auto max-w-8xl">
        <h1 className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] ml-[200px]">
          Manage Your All Orders
        </h1>
        {selectedOrder ? (
          <PendingCard order={selectedOrder} assigned={selectedUserId} />
        ) : (
          <p className="text-center text-red-500">Order not found.</p>
        )}

        {/* Pass filtered users and selected order's email to OrderTable */}
        <OrderTable data={users} onSelectUser={handleSelectUser} selectedOrderEmail={selectedOrderEmail} />
      </div>
      <div className="mb-12"></div>
      <Footer />
    </>
  );
};

export default Details;
