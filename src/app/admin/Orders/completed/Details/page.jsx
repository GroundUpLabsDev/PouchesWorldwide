'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import ProcessingCard from '@/components/AdminUi/orderdetail/complete';
import OrderDetails from '@/components/AdminUi/orderdetail/OrderDetailss';

const Details = () => {
  const [orderId, setOrderId] = useState(null); // Store the orderId state
  const [orders, setOrders] = useState([]); // To store the fetched orders
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Only useSearchParams in useEffect to skip on SSR
  useEffect(() => {
    const searchParams = useSearchParams();
    const id = searchParams.get('orderId');
    setOrderId(id); // Set the orderId state
  }, []);

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://146.190.245.42:1337/api/all-orders?populate=*');
        const data = await response.json();

        if (data.data) {
          setOrders(data.data); // Set the fetched orders
        } else {
          setError('No orders found.');
        }
      } catch (error) {
        setError('Failed to fetch orders.');
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures it runs only once

  // Log the API response to understand its structure
  console.log(orders);

  // Find the order with the matching ID (adjust based on actual API response)
  const selectedOrder = orders.find((order) => String(order.id) === orderId); // Adjust field name if necessary

  return (
    <>
      <Header />
      <Banner />
      <h1 className="pt-12 pl-16 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-[200px]">
        Manage Y<span className="text-black">our All Orders</span>
      </h1>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : selectedOrder ? (
        <ProcessingCard order={selectedOrder} />
      ) : (
        <p className="text-center text-red-500">Order not found.</p>
      )}

      <OrderDetails />
      <div className="mb-12"></div>
      <Footer />
    </>
  );
};

export default Details;
