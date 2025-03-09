"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const AssignedCard = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  // Fetching orders from API using Axios
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        console.log("Fetched orders:", response.data); // Log to check the structure
        // Ensure that the response data is an array before setting the state
        if (Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          console.error("Error: Expected an array but received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const OrderClick = (orderId) => {
    router.push(`/admin/Orders/completed/Details?orderId=${orderId}`);
  };

  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {orders
        .filter((order) => order.astatus === "FULL FILLED") // Filter only Assigned orders
        .map((order, index) => (
          <div key={index} className="bg-white rounded-lg border border-zinc-500 p-4 w-[1000px] h-[440px] grid grid-cols-4">
            {/* Product Image */}
            <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
            <img src={`${order.cart[0].imageUrl ||  '/2.png'}`} alt={`Product of ${order.productName[0]?.Name}`} className="w-24 h-24 rounded-lg" />
            </div>

            {/* Order Details */}
            <div className="col-span-2 flex flex-col text-left w-[233px] h-[400px]">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="bg-gray-900 text-white text-sm font-semibold rounded-md px-3 py-1">
                  {order.type}
                </span>
                {(order.method === "Contingency" || order.method === "Crypto") && (
                  <span className={`text-white text-sm font-semibold rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
                    order.method === "Contingency" ? "bg-[#fa4032]" : "bg-[#32a852]"
                  }`}>
                    {order.method}
                  </span>
                )}
              </div>

              <div className="mt-2">
                <p className="text-gray-500 text-sm">Customer Name</p>
                <p className="text-lg font-bold">{order.customerName}</p>
              </div>

              <div className="mt-4">
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-base">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zip_code}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-500 text-sm">Item Name</p>
                <p className="text-base">
                  {!order.cart || order.cart.length === 0
                    ? order.productName[0]?.Name
                    : order.cart.length > 1
                      ? "Multiple"
                      : order.productName[0]?.Name}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-500 text-sm">No of Cans</p> 
                <p className="text-base">
                  {!order.cart || order.cart.length === 0
                    ? order.itemTotal
                    : order.cart.length > 1
                      ? "Multiple"
                      : order.itemTotal}
                </p>
              </div>

              <div className="mt-4">
  <p className="text-gray-500 text-sm">Price Per Can</p>
  <p className="text-base">
    {!order.cart || order.cart.length === 0 
      ? order.productName[0]?.price 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.price} 
    {order.cart?.length === 1 ? " $" : ""}
  </p>
</div>

            </div>

            {/* Date & Total */}
            <div className="col-start-4 flex flex-col justify-between text-right">
              <div className="w-[154px] h-[66px]">
                <p className="text-gray-500 mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
              </div>

              <div className="flex flex-col mb-8 mr-4">
                <button
                  className="w-[239px] h-[58.24px] px-4 bg-black flex justify-center items-center gap-2.5 cursor-pointer"
                  onClick={() => OrderClick(order.id)}
                >
                  <span className="text-white text-sm font-semibold capitalize">review shipping details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AssignedCard;