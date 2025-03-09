"use client";
import { useState } from "react";
import Distributers from "@/app/admin/distributers/page";
import Retailers from "@/app/admin/retailers/page"; 
import Whalesellers from "@/app/admin/whalesellers/page";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("Wholesaler");

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        {/* Tabs */}
        <div className="w-full max-w-[600px] flex border rounded-full overflow-hidden mb-6">
          {["Distributors", "Wholesaler", "Retailers"].map((tab, index, arr) => (
            <button
              key={tab}
              className={`px-6 py-2 w-full text-center focus:outline-none transition-all ${
                activeTab === tab ? "bg-gray-800 text-white" : ""
              } ${index < arr.length - 1 ? "border-r" : ""}`} 
              onClick={() => setActiveTab(tab)}
            > 
              {tab}
            </button> 
          ))}
        </div>

        {/* Render Pages */}
        <div className="w-full  bg-white p-6 rounded-lg text-center">
          {activeTab === "Distributors" && <Distributers />}
          {activeTab === "Retailers" && <Retailers />}
          {activeTab === "Wholesaler" && <Whalesellers />}
        </div>
      </div>
    </div>
  );
}
