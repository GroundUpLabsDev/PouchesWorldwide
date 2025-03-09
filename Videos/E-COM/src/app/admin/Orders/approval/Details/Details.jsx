'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import ProcessingCard from '@/components/AdminUi/orderdetail/approval';
import OrderDetails from '@/components/AdminUi/orderdetail/OrderDetails';

const Details = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Extract orderId from URL
  const [orders, setOrders] = useState([]); // To store the fetched orders
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://pouchesworldwide.com/strapi/api/all-orders?populate=*');
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
  }, []);

  // Log the API response to understand its structure
  console.log(orders);

  // Find the order with the matching ID (adjust based on actual API response)
  const selectedOrder = orders.find((order) => String(order.id) === orderId); // Adjust field name if necessary

  // Define handleComplete function to be passed to the OrderDetails and ProcessingCard components
  const handleComplete = () => {
    // Your logic for completing the order
    console.log('Order Completed:', selectedOrder.id);
  };

  return (
    <>
      <Header />
    {/* <Banner />*/}
      <h1 className="pt-12 pl-16 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-[200px]">
        Manage Y<span className="text-black">our All Orders</span>
      </h1> 

      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : selectedOrder ? (
        <ProcessingCard order={selectedOrder} handleComplete={handleComplete} />
      ) : (
        <p className="text-center text-red-500">Order not found.</p>
      )}
 
      {/* Pass handleComplete to OrderDetails 
      <OrderDetails order={selectedOrder} handleComplete={handleComplete} />*/}

      <Footer /> 
    </>
  );
};

export default Details;
