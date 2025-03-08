"use client";

import React, { useState, useEffect } from "react";
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import Assigned from '@/components/AdminUi/orderdetail/Assigned';


const Details = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Extract orderId from URL

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://146.190.245.42:1337/api/all-orders?populate=*");
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

    fetchOrders();
  }, []);

  // Find the order with the matching ID
  const selectedOrder = orders.find((order) => String(order.id) === orderId);

  if (loading) return <p className="text-center text-black">Loading data...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Header />
      <Banner />
      <div className="max-auto max-w-8xl">
      <h1 className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] ml-[200px]">Manage Your All Orders</h1>
      {selectedOrder ? (
        <Assigned order={selectedOrder} />
      ) : (
        <p className="text-center text-red-500">Order not found.</p>
      )}

       
</div>
       <div className="mb-12"></div>
      <Footer />
    </>
  );
};

export default Details;
