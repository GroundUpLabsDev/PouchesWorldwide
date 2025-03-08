"use client";
import { useState } from "react";
import ContingencyPage from "@/app/admin/OrderApprovals/contingency/page"; // Add the correct path for your Earnings page
import OrderPage from "@/app/admin/OrderApprovals/order/page"; // Add the correct path for your Referral page

export default function OrderTab() {
  const [activeTab, setActiveTab] = useState("Contingency Approvel");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        {/* Tabs */}
        <div className="w-full max-w-[450px] h-[55px] flex border border-[#282f44] rounded-full overflow-hidden mb-6">
          {["Custom Orders", "Contingency Approvel"].map((tab, index, arr) => (
            <button 
              key={tab}
              className={`px-6 py-2 w-full text-center focus:outline-none transition-all text-sm ${
                activeTab === tab ? "bg-gray-800 text-white  text-sm font-normal" : ""
              } ${index < arr.length - 1 ? "border-r text-sm font-normal" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render Pages */}
        <div className="w-full bg-white p-6 rounded-lg text-center">
        {activeTab === "Custom Orders" && <OrderPage />}
          {activeTab === "Contingency Approvel" && <ContingencyPage />}
          
        </div>
      </div>
    </div>
  );
}
