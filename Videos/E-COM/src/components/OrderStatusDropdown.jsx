"use client";

import React, { useState } from "react";

const OrderStatusDropdown = () => {
  const [selectedStatus, setSelectedStatus] = useState(""); // Track selection

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-zinc-400 text-[15px] font-semibold text-left">
        Set Order Status
      </label>
      <select
        className="h-[45px] w-[180px] p-2 bg-white rounded-md border border-[#3f6075]/90 text-[#282f44] text-base font-semibold focus:outline-none"
        value={selectedStatus} // Controlled component
        onChange={handleChange}
        disabled={selectedStatus === "canceled"} // Disable dropdown when "Canceled" is selected
      >
        <option value="" disabled>
          Select Status
        </option>
        <option value="pending" >Order Processing</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
};

export default OrderStatusDropdown;
