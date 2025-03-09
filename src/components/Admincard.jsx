"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import OrderStatusDropdown from "@/components/OrderStatusDropdown";

const Admincard = ({ onSaveOrderClick }) => { 
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

        // Filter orders assigned to the logged-in user
        const userOrders = data.data.filter(
          (order) =>
            order.assigned?.length > 0 &&
            order.assigned[0]?.id === loggedUserId &&
            order.astatus !== "Pending Approval" &&
            order.astatus !== "FULL FILLED"
        );
  
        setOrders(userOrders);
        

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
        <div
          key={index}
          className="bg-white rounded-lg border border-zinc-500 p-4 w-[720px] h-[400px] grid grid-cols-4"
        >
          {/* 1st Grid: Product Image */}
          <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
            <img
              src={`${order.cart[0].imageUrl ||  '/2.png'}`}
              alt={`Product of ${order.productName}`}
              className="w-24 h-24 rounded-lg"
            />
          </div>

          {/* 2nd Grid: Order Details */}
          <div className="col-span-2 flex flex-col text-left w-[233px] h-[400px]">
            <div>
              <p className="text-gray-500 text-sm">Customer Name</p>
              <p className="text-lg font-bold">{order.customerName}</p>
            </div>

            <div className="mt-2">
              <p className="text-gray-500 text-sm">Address</p>
              <p className="text-base">{order.address.street}</p>
            </div>

            <div className="mt-2">
              <p className="text-gray-500 text-sm">Item Name</p>
              <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.Name 
      : order.cart.length > 1  
        ? "Multiple" 
        : order.productName[0]?.Name}</p>
              </div>

            <div className="mt-3">
              <p className="text-gray-500 text-sm">No of Cans</p>
              <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
              </div>

            <div className="mt-3">
              <p className="text-gray-500 text-sm">Price Per Can</p>
              <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.price 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.price} </p>
              </div> 

            <div className="mt-2">
              <p className="text-gray-500 text-sm">Commission</p>
              <p className="text-base">{order.commission} $</p>
            </div>
          </div>

          {/* 3rd Grid: Date & Total */}
          <div className="col-start-4 flex flex-col justify-between text-right">
            <div className="w-[154px] h-[66px]">
            <p className="text-gray-500 mb-2">
  {new Date(order.createdAt).toISOString().split('T')[0]}
</p> 

              <p className="text-xl font-semibold">Commission: {order.commission} $</p>
            </div>
            <div className="flex flex-col gap-2 mb-8 mr-4">
              {/* Order Status Dropdown 
              <OrderStatusDropdown />*/}

              {/* View Orders Button */}
              <button
                className="h-[45px] w-[180px] px-4 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
                onClick={() => onSaveOrderClick(order.id)}
                style={{
                  background: "radial-gradient(circle, #fae255 0%, #a06a0f 100%)",
                }}
              >
                <span className="text-black text-sm font-semibold">View Orders</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 

export default Admincard;
