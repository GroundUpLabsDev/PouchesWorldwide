import React from "react";
import Link from "next/link";

const HistoryCard = ({ id, createdAt, astatus, totalAmount, method, cart = [] }) => { 
  return (
    <div className="bg-white rounded-lg border border-[#adb5bd]/40 p-4 flex items-center space-x-4 w-[871px] h-[191px]">
       <div className="grid grid-cols-2 gap-2 bg-gray mr-6">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <img
              key={index}
              src={item.imageUrl} // Use imageUrl from cart item
              alt={item.Name} // Use product name for alt text
              className="w-[60px] h-[60px] object-cover rounded" 
            />
          ))
        ) : (
          <div className="text-gray-500">No images available</div>
        )}
      </div>
      <div className="flex-1 mb-[80px] ml-4">
        <div className="text-[#3f6075] text-sm font-normal font-['Poppins'] capitalize mb-2">
          Order ID
        </div>
        {/* Clickable Order ID that navigates to the order history page */}
        <Link href={`/cart/order-history/${id}`} passHref>
          <span className="cursor-pointer text-[#3e5f75] text-[22px] font-medium font-['Poppins'] capitalize mb-4 hover:underline">
            #{id}
          </span>
        </Link>
        <div className="opacity-70 text-[#2f4858] text-base font-medium font-['Poppins']">
        {createdAt.split("T")[0]}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-3 mb-[75px]">

         {/* Additional Label */}
  <div className="h-[43px] px-5 py-2.5 rounded-[11px] bg-[#f5d061] text-white text-center text-[15px] font-medium font-['Poppins'] capitalize">
    {method}
  </div>
  {/* Status Label */}
  <div
    className={`h-[43px] px-5 py-2.5 rounded-[11px] text-center text-[15px] font-medium font-['Poppins'] capitalize
      ${astatus === "Canceled" ? "bg-[#fa4032] text-white" : 
        astatus === "Approved" ? "bg-[#009b7c] text-white" : 
        astatus === "Pending" ? "bg-[#f5d061] text-black" : 
        "bg-gray-300 text-black" // Default color for other statuses
      }`}
  >
    {astatus}
  </div>

 
</div>




        <div className="text-[#2f4858] text-[32px] font-medium font-['Poppins']">
          $ {totalAmount}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
