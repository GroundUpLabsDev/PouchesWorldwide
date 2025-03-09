"use client";

import { useEffect, useState } from "react";
import Table from "@/components/AdminUi/Table";

export default function EarningsPage({ userId }) {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [referralEarnings, setReferralEarnings] = useState(null); // Set to null for loading check
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchOrders() {
      if (!userId) return; // Ensure userId is provided

      try {
        // Fetch the logged-in user details using the provided userId
        const userRes = await fetch(`https://pouchesworldwide.com/strapi/api/users/${userId}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");

        const fetchUser = await userRes.json();
        const userEmail = fetchUser.email;

        setReferralEarnings(fetchUser.referral_earnings || 0); // Store referral earnings

        // Fetch all orders
        const allOrdersRes = await fetch("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        if (!allOrdersRes.ok) throw new Error("Failed to fetch all orders");

        const allOrders = await allOrdersRes.json();

        // Filter orders where order.user.referEmail matches userEmail
        const referredOrders = allOrders.data.filter(order => order.user?.referEmail === userEmail && order.astatus === "FULL FILLED");

        setFilteredOrders(referredOrders); // Store filtered orders in state
      } catch (error) {
        console.error("Error fetching orders data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    }

    fetchOrders();
  }, [userId]);

  return (
    <div>
      {/* Earnings Card */}
      <div className="h-[78px] p-5 bg-[#282f44] rounded-[5px] justify-between items-center inline-flex w-full">
        <div className="text-white text-xl font-normal font-['Poppins'] capitalize">
          Total Referral Earnings
        </div>
        {referralEarnings === null ? (
          <div className="skeleton h-8 w-24 bg-gray-500 rounded-md"></div>
        ) : (
          <div className="text-white text-[25px] font-medium font-['Poppins'] capitalize">
            {referralEarnings}$
          </div>
        )}
      </div>

      {/* Table Skeleton */}
      {loading ? (
        <div className="mt-4 space-y-2">
          <div className="skeleton h-10 w-full bg-gray-500 rounded-md"></div>
          <div className="skeleton h-10 w-full bg-gray-500 rounded-md"></div>
          <div className="skeleton h-10 w-full bg-gray-500 rounded-md"></div>
        </div>
      ) : (
        <Table data={filteredOrders} />
      )}
    </div>
  );
}
