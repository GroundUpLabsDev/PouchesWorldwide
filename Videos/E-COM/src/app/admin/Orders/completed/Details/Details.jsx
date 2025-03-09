'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/AdminUi/Header';
import Footer from '@/components/Footer';
import ProcessingCard from '@/components/AdminUi/orderdetail/complete';

const OrderDetails = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Extract orderId from URL

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError('Invalid order ID.');
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://pouchesworldwide.com/strapi/api/all-orders?populate=*'
        );
        if (!response.ok) throw new Error('Failed to fetch orders.');

        const data = await response.json();
        if (data?.data) {
          setOrders(data.data);
        } else {
          setError('No orders found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [orderId]);

  console.log('Fetched Orders:', orders);

  const selectedOrder = orders.find(order => String(order.id) === orderId);

  return (
    <>
      <Header />
      <h1 className="pt-12 pl-16 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-[200px]">
        Manage Y<span className="text-black">our All Orders</span>
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : selectedOrder ? (
        <ProcessingCard order={selectedOrder} />
      ) : (
        <p className="text-center text-red-500">Order not found.</p>
      )}

      <div className="mb-12"></div>
      <Footer />
    </>
  );
};

const Details = () => {
  return (
    <Suspense fallback={<p className="text-center text-gray-600">Loading...</p>}>
      <OrderDetails />
    </Suspense>
  );
};

export default Details;
