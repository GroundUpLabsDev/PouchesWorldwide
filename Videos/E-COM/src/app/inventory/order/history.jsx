"use client";

import { useEffect, useState } from "react";
import OrderCard from "@/components/OrderCard";

export default function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get logged-in user from localStorage
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No user found in localStorage");
          setLoading(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const loggedUserId = parsedUser?.id;

        if (!loggedUserId) {
          console.error("Invalid user data");
          setLoading(false);
          return;
        }

        // Fetch orders from API
        const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        const data = await response.json();

        // Filter orders assigned to the logged-in user and with astatus "PROCESSING" or "Assigned"
        const userOrders = data.data.filter(
          (order) =>
            order.assigned?.length > 0 &&
            order.assigned[0]?.id === loggedUserId &&
            (order.astatus === "Pending Approval" || order.astatus === "FULL FILLED")
        );

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center text-gray-500">No orders found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
}
