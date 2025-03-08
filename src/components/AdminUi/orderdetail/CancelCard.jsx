"use client";

import { useRouter } from "next/navigation";
import { ArrowRight,ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import CartItemCard from "@/components/CartItemCard";

const ProcessingCard = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return <p className="text-center text-red-500">No order found.</p>;
  }

  const OrderClick = (orderId) => {
    router.push(`/admin/Orders/processing/Details?orderId=${orderId}`);
  };

  return (
    <>
    <div className="flex flex-col items-center min-h-screen space-y-6">
      <div className="bg-white rounded-lg p-4 w-[1000px] h-[400px] grid grid-cols-4">
        {/* 1st Grid: Product Image */}
        <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
          <img src={order.productImage} alt={`Product of ${order.productName}`} className="w-24 h-24 rounded-lg" />
        </div>

        {/* 2nd Grid: Order Details */}
        <div className="col-span-2 flex flex-col text-left w-[233px]">
  {/* Status Badge */}
  <div className="flex items-center space-x-2 whitespace-nowrap">
    <span className="bg-black text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
      {order.type}
    </span>
  <span className="bg-[#e6af2e] text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
      {order.status}
    </span>
    {(order.method === "Contingency" || order.method === "Crypto") && (
    <span className={`text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
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
            <p className="text-base">{order.address}</p>
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
            <p className="text-gray-500 text-sm">No of Cans </p>
            <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Price Per Can</p>
            <p className="text-base">
{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.price 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.price} $</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Total</p>
            <p className="text-base">{order.itemTotal} $</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Order Processor</p>
            <p className="text-base">{order.assigned}</p>
          </div>


        </div>
        

        {/* 3rd Grid: Date & Total */}
        <div className="col-start-4 flex flex-col justify-between text-right">
          <div className="w-[154px] h-[66px]">
            <p className="text-gray-500 mb-2">{order.date}</p>
            <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
          </div>
          <div className="flex flex-col gap-2 mr-4">
            
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

export default ProcessingCard;
