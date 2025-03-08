"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CartItemCard from "@/components/CartItemCard";
import Link from "next/link";

const PendingCard = ({ order, assigned }) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [assignedUserName, setAssignedUserName] = useState("Not Assigned");
  const [assignedUserId, setAssignedUserId] = useState(null); // Store assigned user ID

  if (!order) {
    return <p className="text-center text-red-500">No order found.</p>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://146.190.245.42:1337/api/users/");
        const data = await response.json();
        setUsers(data);

        const assignedUser = data.find((user) => user.id === assigned);
      
      if (assignedUser) {
        setAssignedUserName(assignedUser.username);
        setAssignedUserId(assignedUser.id);
      } else {
        setAssignedUserName("Not Assigned");
        setAssignedUserId(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [assigned]);

  const commission = order?.totalAmount ? (order.totalAmount * 0.05).toFixed(2) : "0";
  const aid = order.documentId;

  const timeline = [
    {
      "title": "Transaction ID Received",
      "Reason": "Transaction verified",
      "status": "completed"
    },
    {
      "title": "Payment Successful",
      "Reason": "Payment processed",
      "status": "completed"
    },
    {
      "title": "Order Processor Appointed",
      "Reason": "Assigned to processor",
      "status": "completed"
    },
    {
      "title": "Order Processing",
      "Reason": "Order in progress",
      "status": "inProgress"
    },
    {
      "title": "Order Shipping Details In Inspection",
      "Reason": "Shipping in inspection",
      "status": "upcoming"
    },
    {
      "title": "Order Shipped",
      "Reason": "Order dispatched",
      "status": "upcoming"
    }
]
const appointOrderProcessor = async () => {

  try {
    const response = await fetch(`http://146.190.245.42:1337/api/all-orders/${aid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          timeline: timeline, // Send the timeline data
          commission,
          assigned: assignedUserId,
          astatus: "Assigned"
        },
      }),
    });

    const responseData = await response.json(); // Read response

    if (response.ok) {
      alert("Order Processor Assigned Successfully!");
      router.refresh(); // Refresh to show updated data
    } else {
      console.error("Error response:", responseData);
      alert(`Failed to assign order processor: ${responseData.error?.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error while assigning order processor.");
  }
};

  
  

  return (
    <>
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white rounded-lg p-4 w-[1000px] grid grid-cols-4">
        <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
          <img src={order.productImage} alt={`Product of ${order.productName}`} className="w-24 h-24 rounded-lg" />
        </div>


        <div className="col-span-2 flex flex-col text-left w-[233px]">
          <div className="flex items-center space-x-2">
            <span className="bg-black text-white text-sm font-semibold rounded w-[100px] h-[29px] flex items-center justify-center">
              {order.type}
            </span>
            {(order.method === "Contingency" || order.method === "Crypto") && (
              <span className={`text-white text-sm font-semibold rounded w-[100px] h-[29px] flex items-center justify-center ${order.method === "Contingency" ? "bg-[#fa4032]" : "bg-[#32a852]"}`}>
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
            <p className="text-base">{order.address?.city}</p>
          </div>

          <div className="mt-4">
          <p className="text-gray-500 text-sm">Item Name</p>
                <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.Name 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.Name}</p>
          </div>

          {order.method === "Crypto" && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm">Transaction ID</p>
              <p className="text-base flex items-center justify-between">
                <span>{order.txid}</span>
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  <span>
                    <ArrowUpRight />
                  </span>
                </Link>
              </p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Cans</p>
            <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Unit Price</p>
            <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.price 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.price} $</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Order Processor</p>
            <p className="text-base text-[#fa4032]">{assignedUserName}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Commission</p>
            <p className="text-base text-[#009b7c]">{commission} $</p>
          </div>

          {/* ✅ Assign Processor Button */}
          <button
            className="h-[45px] w-[305px] px-4 bg-[#3f6075] mt-12 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
            onClick={appointOrderProcessor}
          >
            <span className="text-white text-sm font-semibold capitalize">Appoint Selected Order Processor</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>

          {/* Cancel Order Button */}
          <button
            className="h-[45px] w-[305px] px-4 bg-[#FA4032] mt-4 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
            onClick={() => router.push(`/admin/Orders/processing/Details?orderId=${order.id}`)}
          >
            <span className="text-white text-sm font-semibold capitalize">Cancel Order</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>


         

        </div>

        <div className="col-start-4 flex flex-col justify-between text-right">
          <div className="w-[154px] h-[66px]">
            <p className="text-gray-500 mb-2">{order.date}</p>
            <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
          </div>
        </div>



       
        
      </div>
    </div>
    
    
    <div className="mt-4 space-y-4">
      {order.cart && order.cart.length > 0 ? (
        order.cart.map((item, index) => <CartItemCard key={index} item={item} />)
      ) : (
        <p className="text-base text-center">No items in cart</p>
      )}
    </div>
    
    
    </>
    
  );
};

export default PendingCard;
