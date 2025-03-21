"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, MoveUpRight, CircleCheck } from "lucide-react";
import Link from 'next/link';
import CartItemCard from "@/components/CartItemCard";
import { useState } from "react";

const ProcessingCard = ({ order }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!order) {
    return <p className="text-center text-red-500">No order found.</p>;
  }

  const OrderClick = (orderId) => {
    router.push(`/admin/Orders/processing/Details?orderId=${orderId}`);
  };

  const handleComplete = async () => {
    if (!order.documentId) {
      alert("Error: Missing documentId for the order.");
      return;
    }

    setIsUpdating(true);

    const payload = {
      data: {
      astatus: "FULL FILLED"
    },
    };

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${order.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Order status updated to Pending Approval!");
        router.refresh(); // Refresh the page after update
      } else {
        alert("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("An error occurred while updating the order.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!order.documentId) {
      alert("Error: Missing documentId for the order.");
      return;
    }

    setIsUpdating(true);

    const payload = {
      data: {
      astatus: "canceled"
    },
    };

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${order.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Order cancelled!");
        router.refresh(); // Refresh the page after update
      } else {
        alert("Failed to cancelled order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("An error occurred while updating the order.");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <>
    <div className="flex flex-col items-center h-[700px] space-y-6">
       
      <div className="bg-white rounded-lg p-4 w-[1000px] h-[400px] grid grid-cols-4">
        {/* 1st Grid: Product Image */}
        <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
        <img src={`${order.cart[0].imageUrl ||  '/2.png'}`} alt={`Product of ${order.productName}`} className="w-24 h-24 rounded-lg" />
        </div>

        {/* 2nd Grid: Order Details */}
        <div className="col-span-2 flex flex-col text-left w-[233px]">
  {/* Status Badge */}
  <div className="flex items-center space-x-2 whitespace-nowrap">
    <span className="bg-black text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
      {order.type}
    </span>
  <span className="bg-[#e6af2e] text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
      {order.astatus}
    </span>
    {(order.method === "Contingency" || order.method === "Crypto" || order.method === "Stripe") && (
  <span
    className={`text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
      order.method === "Contingency"
        ? "bg-[#fa4032]"
        : order.method === "Crypto"
        ? "bg-[#32a852]"
        : "bg-[#6772e6]" // Purple for Card
    }`}
  >
    {order.method}
  </span>
)}
  </div>



          <div className="mt-2">
            <p className="text-gray-500 text-sm">Customer Name</p>
            <p className="text-lg font-bold">{order.customerName}</p>
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
            <p className="text-gray-500 text-sm">No of Cans</p>
            <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Unit Price</p> 
            <p className="text-base">
  {!order.cart || order.cart.length === 0 
    ? order.productName[0]?.price 
    : order.cart.length > 1 
      ? "Multiple" 
      : order.productName[0]?.price}
  {order.cart?.length > 1 ? "" : " $"}
</p>

          </div>


          <div className="mt-4">
            <p className="text-gray-500 text-sm">Order Processor</p>
            <p className="text-base">{order.assigned[0].username}</p>
          </div>


        </div>
        

        {/* 3rd Grid: Date & Total */}
        <div className="col-start-4 flex flex-col justify-between text-right">
          <div className="w-[154px] h-[66px]">
            <p className="text-gray-500 mb-2">{order.date}</p>
            <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
          </div>
          <div className="flex flex-col gap-2 mr-4">
            
          </div></div></div> 
       
       
          </div> 

          <div className="bg-white p-8 rounded-lg w-full max-w-[1000px] flex flex-col items-center mx-auto">
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    <div className="w-full">
      {/* Customer Name */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Name
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Name"
        type="text"
        name="customerName"
        value={order.customerName}
        disabled
      />
      {/* Customer Email */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Email
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Email"
        type="email"
        name="customerEmail"
        value={order.method === "Stripe" ? order.stripe : order.email}
        disabled
      />
      {/* Customer Mobile */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Mobile Number
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Mobile Number"
        type="text"
        name="mobile"
        value={order.mobile}
        disabled
      />
      {/* Shipping Address */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Shipping Address
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Shipping Address"
        type="text"
        name="shippingAddress"
        value={order.address.street}
        disabled
      />
      {/* Address Details */}
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="City/Town"
        type="text"
        name="city" 
        value={order.address.city}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="State/Province/Region"
        type="text"
        name="state"
        value={order.address.state}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Country"
        type="text"
        name="country"
        value={order.address.country}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="ZIP Code"
        type="text"
        name="zip"
        value={order.address.zip}
        disabled
      />
      {/* Note */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Note
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Additional Notes"
        type="text"
        name="note"
        value={order.note ?? ""}
        disabled
      />
      {/* Tracking No */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
      Tracking Number
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Tracking Number"
        type="text"
        name="trackingnumber"
        value={order.adetailes.trackingNumber}
        disabled
      />
    </div>

    <div className="w-full">
      {/* Number Of Items */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Number Of Cans
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Number of Items ordered"
        type="text"
        value={!order.cart || order.cart.length === 0
          ? order.itemTotal
          : order.cart.length > 1
            ? "Multiple"
            : order.itemTotal}
        disabled
      />
      {/* Price Of The Item */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Total Price
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Price of the product"
        type="text"
        value={`$${order.totalAmount}`}
        disabled
      />
      {/* Commission */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Commission
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Commission Amount"
        type="text"
        value={`$${order.commission}`}
        disabled
      />
       {/* Shipping Document */}
       <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Shipping Document
      </label>
      <Link
  href={`https://pouchesworldwide.com/strapi${order.Document?.[0]?.url || "#"}`}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full"
>
  <input
    className="w-full p-3 border border-gray-300 rounded-lg mb-8 cursor-pointer"
    placeholder="Price of the product"
    type="text"
    value={order.Document?.[0]?.name || "No File"}
    disabled
  />
</Link>
    </div>
  </div>
</div>
    
    <div className="space-y-4">
      {order.cart && order.cart.length > 0 ? (
        order.cart.map((item, index) => <CartItemCard key={index} item={item} />)
      ) : ( 
        <p className="text-base text-center">No items in cart</p>
      )} 
    </div>




    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 font-sans">
      {/* Customer Details */}
      <div className="border-b border-gray-300 pb-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Customer First Name</p>
            <p>{order.adetailes?.customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Customer Email</p>
            <p>{order.adetailes?.customerEmail}</p>
          </div>
          <div>
            <p className="font-semibold">Customer Last Name</p>
            <p>{order.adetailes?.customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Customer Address</p>
            <p>{order.adetailes?.shippingAddress}</p>
          </div>
          <div>
            <p className="font-semibold">Order Tracking Number</p>
            <p>{order.adetailes?.trackingNumber}</p>
          </div>
        </div>
      </div>




    </div>
    
    </>
    
  );
};

export default ProcessingCard;
 