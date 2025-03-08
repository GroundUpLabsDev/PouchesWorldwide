"use client";

import { MoveUpRight, CircleCheck } from "lucide-react";

const OrderDetails = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 font-sans">
      {/* Customer Details */}
      <div className="border-b border-gray-300 pb-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Customer First Name</p>
            <p>Chathura</p>
          </div>
          <div>
            <p className="font-semibold">Customer Email</p>
            <p>Chathura.Sesrvicec@Gmail.Com</p>
          </div>
          <div>
            <p className="font-semibold">Customer Last Name</p>
            <p>Priyashan</p>
          </div>
          <div>
            <p className="font-semibold">Customer Address</p>
            <p>67, Road, Nilmalgoda, Kegalle, Srilanka, Global Pvt Ltdtd.</p>
          </div>
          <div>
            <p className="font-semibold">Order Tracking Number</p>
            <p>7879876786787989890898</p>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="mb-4">
        <p className="font-semibold">Files</p>
      </div>

      {/* File List */}
      <div className="mt-12 pt-4">
        {[1, 2].map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-4 border-b border-black mb-4"
          >
            <div>
              <p className="text-sm font-semibold">File Name</p>
              <p>Tracking_doc_order-090198983893.Pdf</p>
            </div>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md flex items-center">
              Open <MoveUpRight className="ml-2 w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Checkbox */}
      <div className="flex items-center justify-start mb-4 mt-12">
      <input
  type="checkbox"
  id="contingency"
  className="mr-2 w-[37px] h-[37px]"
/>

        <label htmlFor="contingency" className="text-sm">
          <span className="text-[#3f6075]/90 text-xl font-semibold">Add As Contingency Earning </span><span className="text-red-500">*</span>
        </label>
      </div>

      {/* Complete Order Button */}
      <div className="flex justify-end">
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-md flex items-center">
          Complete Order <CircleCheck className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
