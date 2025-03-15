"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Cancel = () => {
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
    router.push(`/admin/Orders/assigned/Details?orderId=${orderId}`); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {orders
        .filter((order) => order.astatus === "canceled") // Filter only Pending orders
        .map((order, index) => (
          <div key={index} className="bg-white rounded-lg border border-zinc-500 p-4 w-[720px] h-[440px] grid grid-cols-4">
            {/* Product Image */}
            <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
            <img src={`${order.cart[0].imageUrl ||  '/2.png'}`} alt={`Product of ${order.productName[0]?.Name}`} className="w-24 h-24 rounded-lg" />
            </div>

            {/* Order Details */}
            <div className="col-span-2 flex flex-col text-left w-[233px] h-[425px]">
              {/* Order Status Badge */}
              <div className="flex items-center space-x-2">
                <span
                  className={`text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
                    order.type === "Retailer" ? "bg-black" : "bg-[#3e5f75]"
                  }`}
                >
                  {order.type}
                </span>

               
                <span
  className={`text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
    order.method === "Contingency"
      ? "bg-[#fa4032]"
      : order.method === "Crypto"
      ? "bg-[#32a852]"
      : "bg-[#6772e6]" 
  }`}
>
  {order.method}
</span>
         

               
                  <span className="text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 bg-[#f39c12]">
                    {order.astatus} {/* Displaying the astatus */}
                  </span>
          
              </div>

              <div className="mt-2">
                <p className="text-gray-500 text-sm">Customer Name</p>
                <p className="text-lg font-bold">{order.customerName}</p>
              </div>

              <div className="mt-2">
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-base">
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zip_code}
                </p>
              </div>

              <div className="mt-2">
              <p className="text-gray-500 text-sm">Item Name</p>
                <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.Name 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.Name}</p>
              </div>

              {order.method === "Crypto" && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Transaction ID</p>
                  <p className="text-base">{order.txid}</p>
                </div>
              )}

              <div className="mt-2">
                <p className="text-gray-500 text-sm">No of Cans</p>
                <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
              </div>

              <div className="mt-2">
  <p className="text-gray-500 text-sm">Price Per Can</p>
  <p className="text-base">
    {!order.cart || order.cart.length === 0
      ? order.productName[0]?.price
      : order.cart.length > 1
      ? "Multiple"
      : `${order.productName[0]?.price} $`}
  </p>
</div>
            </div>

            {/* Date & Total */}
            <div className="col-start-4 flex flex-col justify-between text-right">
              <div className="w-[154px] h-[66px]">
                <p className="text-gray-500 mb-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
              </div>
              <div className="flex flex-col gap-2 mb-8 mr-4">
                {/* View Order Button */}
                <button
                  className="h-[45px] w-[180px] px-4 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
                  onClick={() => OrderClick(order.id)}
                >
                  <span className="text-black text-sm font-semibold capitalize">view order</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cancel;
