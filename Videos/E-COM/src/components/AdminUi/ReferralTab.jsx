"use client";
import { useState } from "react";
import ListPage from "@/app/admin/whalesellers/sellerDetails/[userId]/referral/List/page"; // Add the correct path for your Earnings page
import EarningsPage from "@/app/admin/whalesellers/sellerDetails/[userId]/referral/Earnings/page"; // Add the correct path for your Referral page

export default function DashboardTabs({ userId }) {
  const [activeTab, setActiveTab] = useState("Earnings");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        {/* Tabs */}
        <div className="w-full max-w-[220px] h-[55px] flex border rounded-full overflow-hidden mb-6">
          {["Referral", "Earnings"].map((tab, index, arr) => (
            <button
              key={tab}
              className={`px-6 py-2 w-full text-center focus:outline-none transition-all text-sm font-normal ${
                activeTab === tab ? "bg-gray-800 text-white text-sm font-normal" : ""
              } ${index < arr.length - 1 ? "border-r" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render Pages */}
        <div className="w-full bg-white p-6 rounded-lg text-center">
          {activeTab === "Referral" && <ListPage userId={userId} />} {/* Passing userId to ListPage */}
          {activeTab === "Earnings" && <EarningsPage userId={userId} />} {/* Passing userId to EarningsPage */}
        </div>
      </div>
    </div>
  );
}
