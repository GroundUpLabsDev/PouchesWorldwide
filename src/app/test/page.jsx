// pages/all-orders.js

"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get logged-in user from localStorage
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user ? user.id : null;

  useEffect(() => {
    // Fetch all orders when the component mounts
    axios
      .get('http://146.190.245.42:1337/api/all-orders?populate=*')  // Replace with your actual API endpoint
      .then((response) => {
        // Storing all the orders data in the state
        const filteredOrders = response.data.data.filter(order => order.user?.id === userId); // Filter orders for logged-in user
        setOrders(filteredOrders);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [userId]); // Add userId as dependency so it re-fetches when userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found for this user.</div>;
  }

  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h2>Order ID: {order.id}</h2>
            {/* Display the current logged-in user ID */}
            <p><strong>Logged User ID:</strong> {userId}</p>
            <p><strong>User ID:</strong> {order.user?.id || 'N/A'}</p>
            <p><strong>User:</strong> {order.user?.username || 'Unknown'}</p>
            <p><strong>Document ID:</strong> {order.documentId}</p>
            <p><strong>Status:</strong> {order.astatus}</p>
            <p><strong>Method:</strong> {order.method}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
            <p><strong>Product:</strong> {order.productName[0]?.Name}</p>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllOrders;
