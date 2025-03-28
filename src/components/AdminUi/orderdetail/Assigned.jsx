"use client";

import { useRouter } from "next/navigation";
import { ArrowRight,ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import CartItemCard from "@/components/CartItemCard";

const PendingCard = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return <p className="text-center text-red-500">No order found.</p>;
  }

  const OrderClick = (orderId) => {
    router.push(`/admin/Orders/processing/Details?orderId=${orderId}`); 
  };
  const fullUrl = order.btc?.[0]?.url 
  ? `https://pouchesworldwide.com/strapi${order.btc[0].url}` 
  : "#"; // Fallback to "#" or any default value

  return (
    <>
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white rounded-lg p-4 w-[1000px]  grid grid-cols-4">
        {/* 1st Grid: Product Image */}
        <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
        <img src={`${order.cart[0].imageUrl ||  '/2.png'}`} alt={`Product of ${order.productName}`} className="w-24 h-24 rounded-lg" />
        </div>

        {/* 2nd Grid: Order Details */}
        <div className="col-span-2 flex flex-col text-left w-[233px]">
          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <span className="bg-black text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1">
              {order.type}
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
        : order.productName[0]?.Name} </p>
          </div>

          {order.method === "Crypto" && (
   <div className="mt-4">
   <p className="text-gray-500 text-sm">Transaction ID</p>
   <p className="text-base flex items-center justify-between">
     <span>{order.txid}</span>
     {fullUrl !== "#" && (
        <Link href={fullUrl} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight />
        </Link>
      )}
   </p>
 </div> 
  )}

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Total Cans</p>
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
      ? `${order.productName[0]?.price} $` 
      : order.cart.length > 1 
        ? "Multiple" 
        : `${order.productName[0]?.price} $`}
  </p>
</div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Order Processor</p>
            <p className="text-base text-[#fa4032]">{order.assigned[0].username}</p>
          </div>


          {/* Button */}
            <button
              className="h-[45px] w-[305px] px-4 bg-[#FA4032] mt-4 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
              onClick={() => OrderClick(order.id)}
            >
              <span className="text-white text-sm font-semibold capitalize">Cancel Order</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
        </div>
        

        {/* 3rd Grid: Date & Total */}
        <div className="col-start-4 flex flex-col justify-between text-right">
          <div className="w-[154px] h-[66px]">
            <p className="text-gray-500 mb-2">{order.date}</p>
            <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
          </div>
          <div className="flex flex-col gap-2 mb-8 mr-4">
            
          </div>
        </div>
       
      </div>
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
