"use client";
import { useState } from "react";
import StockPage from "../app/inventory/stock/page";
import OrdersPage from "../app/inventory/order/page";
import EarningsPage from "../app/inventory/earnings/page";
import ReferralPage from "../app/inventory/referral/page";

export default function InventoryTabs() {
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div className="p-4 flex justify-center mt-8">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="h-14 px-2 py-[7px] bg-[#ececec] rounded-[9px] flex justify-center items-center gap-6">
            {["stock", "referral", "orders", "earnings"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === tab ? "bg-gray-800 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Render Pages */}
        <div className="p-4">
          {activeTab === "stock" && <StockPage />}
          {activeTab === "referral" && <ReferralPage />}
          {activeTab === "orders" && <OrdersPage />}
          {activeTab === "earnings" && <EarningsPage />}
        </div>
      </div>
    </div>
  );
}
