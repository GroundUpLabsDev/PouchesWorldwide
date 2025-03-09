"use client";
import { useState } from "react";
 
import Pending from "@/app/admin/Orders/pending/page";
import Assigned from "@/app/admin/Orders/assigned/page";
import Processing from "@/app/admin/Orders/processing/page";
import Approval from "@/app/admin/Orders/approval/page";
import Completed from "@/app/admin/Orders/completed/page";
import Cancelled from "@/app/admin/Orders/cancelled/page";

export default function AllOrderTab() {
  const [activeTab, setActiveTab] = useState("Pending Orders");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-[900px] flex flex-col items-center ">
        {/* Tabs */}
        <div className="w-full flex border border-[#282f44] rounded-full overflow-hidden mb-6 h-[54.44px]">
          {[
            "Pending Orders",
            "Agent Assigned Orders",
            "Processing Orders",
            "Approval Orders",
            "Completed Orders",
            "Cancelled Orders",
          ].map((tab, index, arr) => (
            <button
              key={tab}
              className={`px-2 py-2 w-full text-center focus:outline-none transition-all ${
                activeTab === tab
                  ? "bg-gray-800 text-white text-sm"
                  : "text-gray-700 text-sm"
              } ${index < arr.length - 1 ? "border-r border-[#282f44]" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Render Pages */}
        <div className="w-full bg-white p-6 rounded-lg text-center">
          {activeTab === "Pending Orders" && <Pending />}
          {activeTab === "Agent Assigned Orders" && <Assigned />}
          {activeTab === "Processing Orders" && <Processing />}
          {activeTab === "Approval Orders" && <Approval />}
          {activeTab === "Completed Orders" && <Completed />}
          {activeTab === "Cancelled Orders" && <Cancelled />} 
        </div>
      </div>
    </div>
  );
}
 