"use client";

import { useEffect, useState } from 'react';
import EOrderCard from '@/components/EOrderCard';
import { fetchProducts } from "@/app/utils/fetchProducts";

const External = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        // Fetch orders
        const ordersResponse = await fetch('http://146.190.245.42:1337/api/wholesaler-orders?populate=*');
        
        if (!ordersResponse.ok) {
          throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`);
        }
        
        const ordersData = await ordersResponse.json();
        
        // Fetch products
        const products = await fetchProducts();

        // Fetch user data
        const usersResponse = await fetch("http://146.190.245.42:1337/api/users");
        const users = await usersResponse.json();
        const user = users.find(user => user.id === Number(userId));

        if (user) {
          setUsername(user.username);
        } else {
          setUsername("Unknown User");
        }

        // Ensure we have orders data
        if (!ordersData.data || !Array.isArray(ordersData.data)) {
          throw new Error('Invalid orders data structure');
        }

        // Filter and map orders based on userId
        const fetchedOrders = ordersData.data
          .filter(order => order.user?.id === Number(userId))
          .map(order => {
            const productId = order.product?.id;
            const productItem = products.find(prod => prod.id === productId);
            const productImageUrl = productItem ? `http://146.190.245.42:1337${productItem.Image?.url}` : '';
            
            return {
              productImageUrl,
              createdAt: new Date(order.createdAt).toLocaleDateString(),
              customerName: order.customerName,
              address: `${order.address?.street}, ${order.address?.city}, ${order.address?.state}, ${order.address?.country}`,
              productName: order.product?.Name,
              quantity: order.quantity,
              unitPrice: order.unitPrice,
              itemTotal: order.quantity * order.unitPrice,
            };
          });

        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue
  }

  return (
    <div className="max-w-[900px] mx-auto">
    <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
<div className="text-white text-base font-normal font-['Poppins'] capitalize">
wholesaler account
</div>
</div>
    <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
    <span className="text-black">{username} external orders</span> 
  </h2>
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
{orders.map((order, index) => (
  <EOrderCard key={index} order={order} />
))}
</div>
  </div>
  );
};

export default External;
