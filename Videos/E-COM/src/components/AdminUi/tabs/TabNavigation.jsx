"use client";
import { useState } from "react";

// Import custom pages/components for each tab (you can replace these with real components later)
import ProfilePage from "@/app/admin/whalesellers/sellerDetails/[userId]/profile/page";
import ProductsPage from "@/app/admin/whalesellers/sellerDetails/[userId]/products/page";
import InventoryPage from "@/app/admin/whalesellers/sellerDetails/[userId]/inventory/page";
import OrderPage from "@/app/admin/whalesellers/sellerDetails/[userId]/order/page";
import ExternalOrderPage from "@/app/admin/whalesellers/sellerDetails/[userId]/externalorder/page";
import ReferralPage from "@/app/admin/whalesellers/sellerDetails/[userId]/referral/page";
import ContingencyPage from "@/app/admin/whalesellers/sellerDetails/[userId]/contingency/page";
import TransactionsPage from "@/app/admin/whalesellers/sellerDetails/[userId]/transactions/page";

export default function TabNavigation({ userId }) {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-12">
      <div className="w-full max-w-[1350px] flex flex-col items-center ">
        {/* Tabs */}
        <div className="w-full flex border border-[#282f44] rounded-full overflow-hidden mb-6 h-[54.44px]">
          {[
            "Profile",
            "Product Prices",
            "Inventory",
            "Admin Order",
            "External Order",
            "Referral Earnings",
            "Contingency",
            "Transactions",
          ].map((tab, index, arr) => (
            <button
              key={tab}
              className={`px-6 py-2 w-full text-center focus:outline-none transition-all ${
                activeTab === tab
                  ? "bg-gray-800 text-white text-sm font-normal font-['Poppins']"
                  : "text-gray-700 text-sm font-normal font-['Poppins']"
              } ${index < arr.length - 1 ? "border-r border-[#282f44]" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render Pages */}
        <div className="w-full bg-white p-6 rounded-lg text-center">
          {activeTab === "Profile" && <ProfilePage userId={userId} />}
          {activeTab === "Product Prices" && <ProductsPage userId={userId} />}
          {activeTab === "Inventory" && <InventoryPage userId={userId} />}
          {activeTab === "Admin Order" && <OrderPage userId={userId} />}
          {activeTab === "External Order" && <ExternalOrderPage userId={userId} />}
          {activeTab === "Referral Earnings" && <ReferralPage userId={userId} />}
          {activeTab === "Contingency" && <ContingencyPage userId={userId} />}
          {activeTab === "Transactions" && <TransactionsPage userId={userId} />}
        </div>
      </div>
    </div>
  );
}
