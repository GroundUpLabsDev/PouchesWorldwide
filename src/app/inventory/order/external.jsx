"use client";

import { useEffect, useState } from 'react';
import Externalcard from '@/components/Externalcard';
import { fetchProducts } from "@/app/utils/fetchProducts";

const External = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Retrieve logged-in user from localStorage.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id); // Assuming the user object has an 'id' field.
      }
    }
  }, []);

  // Fetch orders once the userId is available.
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        // Fetch orders using the wholesaler API
        const response = await fetch('http://146.190.245.42:1337/api/wholesaler-orders?populate=*');
        const data = await response.json();

        // Fetch all products using the utility
        const products = await fetchProducts();

        // Process orders by mapping each order to include the correct product image URL from products list
        // and filter orders by logged in user's id.
        const fetchedOrders = data.data
          .filter(order => order.user && order.user.id === userId)
          .map((order) => {
            const productId = order.product.id; // Get product id from order
            // Find the product whose Image.url corresponds to the current product's id
            const productItem = products.find(prod => prod.id === productId);
            const productImageUrl = productItem ? `http://146.190.245.42:1337${productItem.Image.url}` : '';

            return {
              productImageUrl,
              createdAt: new Date(order.createdAt).toLocaleDateString(),
              customerName: order.customerName,
              address: `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}`,
              productName: order.product.Name,
              quantity: order.quantity,
              unitPrice: order.unitPrice,
              itemTotal: order.quantity * order.unitPrice,
            };
          });

        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {orders.map((order, index) => (
        <Externalcard key={index} order={order} />
      ))}
    </div>
  );
};

export default External;