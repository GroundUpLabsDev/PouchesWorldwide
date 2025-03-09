'use client';

import { CircleCheck } from 'lucide-react';

const OrderDetails = ({ order, handleComplete }) => {
  // Check for invalid or missing order or order details
  if (!order || !order.adetailes) {
    return <p>Loading or invalid order data...</p>; // Fallback UI if order data is missing
  }

  const { customerName, customerEmail, shippingAddress, trackingNumber } = order.adetailes;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 font-sans">
      {/* Customer Details */}
      <div className="border-b border-gray-300 pb-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Customer First Name</p>
            <p>{customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Customer Email</p>
            <p>{customerEmail}</p>
          </div>
          <div>
            <p className="font-semibold">Customer Last Name</p>
            <p>{customerName}</p> {/* It seems like customerName is being used for both first and last name, maybe you need to split them */}
          </div>
          <div>
            <p className="font-semibold">Customer Address</p>
            <p>{shippingAddress}</p>
          </div>
          <div>
            <p className="font-semibold">Order Tracking Number</p>
            <p>{trackingNumber}</p>
          </div>
        </div>
      </div>

      {/* Contingency Checkbox */}
      <div className="flex items-center justify-start mb-4 mt-12">
        <input
          type="checkbox"
          id="contingency"
          className="mr-2 w-[37px] h-[37px]"
        />
        <label htmlFor="contingency" className="text-sm">
          <span className="text-[#3f6075]/90 text-xl font-semibold">Add As Contingency Earning </span>
          <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Complete Order Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleComplete} // Trigger the passed handleComplete function
          className="bg-yellow-400 text-black px-6 py-2 rounded-md flex items-center">
          Complete Order <CircleCheck className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
