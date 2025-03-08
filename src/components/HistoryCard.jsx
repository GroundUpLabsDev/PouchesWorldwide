import React from "react";
import Link from "next/link";

const HistoryCard = ({ id, createdAt, astatus, totalAmount, images = [] }) => {
  return (
    <div className="bg-white rounded-lg border border-[#adb5bd]/40 p-4 flex items-center space-x-4 w-[871px] h-[191px]">
      <div className="grid grid-cols-2 gap-2 bg-gray mr-6">
        {images.length > 0 ? (
          images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Product image ${index + 1}`}
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
          {createdAt}
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
      <div
  className={`h-[43px] px-5 py-2.5 rounded-[11px] justify-center items-center gap-2.5 text-center text-[15px] font-medium font-['Poppins'] capitalize mb-[75px] ${
    astatus === "Canceled" ? "bg-[#fa4032] text-white" : "hidden"
  }`}
>
  {astatus === "Canceled" && astatus}
</div>


        <div className="text-[#2f4858] text-[32px] font-medium font-['Poppins']">
          $ {totalAmount}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
