"use client";

import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const EarningsSummary = () => {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchReferrals() {
      if (typeof window === "undefined") return;
 
      // Retrieve user ID from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
 
      const { id } = JSON.parse(storedUser); 

      try {
        // Fetch the logged-in user details
        const userRes = await fetch(`https://pouchesworldwide.com/strapi/api/users/${id}`);
        if (!userRes.ok) throw new Error("Failed to fetch user");
        
        const fetchUser = await userRes.json();
        const userEmail = fetchUser.email;

        // Fetch all users
        const allUsersRes = await fetch("https://pouchesworldwide.com/strapi/api/users");
        if (!allUsersRes.ok) throw new Error("Failed to fetch all users");

        const allUsers = await allUsersRes.json();

        // Filter users who were referred by the logged-in user
        const referredUsers = allUsers.filter(user => user.referEmail === userEmail);

        // Store filtered users in state
        setFilteredUsers(referredUsers);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      }
    }

    fetchReferrals();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserData(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userData?.id) {
      fetchTransactions();
    }
  }, [userData]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `https://pouchesworldwide.com/strapi/api/users/${userId}?populate=*`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }; 

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "https://pouchesworldwide.com/strapi/api/all-orders?populate=*"
      );
      const { data } = await response.json();
  
      if (!userData?.id) return; // Ensure userData is available before filtering
  
      // Orders directly assigned to the logged-in user
      const filteredTransactions = data.filter(
        (order) =>
          order.assigned?.[0]?.id === userData.id && order.astatus === "FULL FILLED"
      );
  
      // Orders from users referred by the logged-in user
      const ReferTransactions = data.filter(
        (order) =>
          order.astatus === "FULL FILLED" &&
          (order.user?.referEmail === userData.email || order.user?.referEmail === null) // Handle null case
      );
  
      // Merge both transactions
      const mergedTransactions = [...filteredTransactions, ...ReferTransactions];
  
      const formattedTransactions = mergedTransactions.map((order, index, array) => {
        const firstOccurrenceIndex = array.findIndex(o => o.id === order.id);
  
        return {
          type: order.type || "unknown",
          id: order.id || "#N/A",
          amount: order.commission ? `${order.commission} $` : "0 $",
          earning_type:
            order.contingency
              ? "contingency"
              : order.user?.referEmail === userData.email
              ? "referral"
              : "earning", // If referEmail is null, mark as "earning"
        };
      });
  
      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6 text-start">
        Manage Your Earnings
      </h1>

      {userData && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-black text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
            <h2 className="text-lg font-bold">Profit</h2>
            <p className="text-2xl mt-2 text-white">
              {userData.profit ?? 0} $
            </p>
          </div>
          <div className="bg-gray-700 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
            <h2 className="text-lg font-bold">Contingency</h2>
            <p className="text-2xl mt-2 text-white">
            {userData.contingency ?? 0} $
            </p>
          </div>
          <div className="bg-gray-800 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
            <h2 className="text-lg font-bold">Referral</h2>
            <p className="text-2xl mt-2 text-white">
            {userData.referral_earnings ?? 0} $
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Remarks</th>
              <th>Income</th>
              <th>Added As A</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr key={index}>
                  <td className="text-[#282f44] text-lg font-medium capitalize">
                    {txn.type}
                  </td>
                  <td className="text-[#282f44] text-lg font-medium">
  <Link href={`/admin/Orders/completed/Details?orderId=${txn.id}`}>
    Order ID: {txn.id}
  </Link>
</td>
                  <td className="text-[#282f44] text-lg font-medium">
                    {txn.amount}
                  </td>
                  <th>
  {txn.earning_type === "earning" ? (
    <div className="flex items-center text-[#009b7c]">
      <TrendingUp className="mr-2" />
      Earning
    </div>
  ) : txn.earning_type === "contingency" ? (
    <div className="flex items-center text-[#fa4032]">
      <TrendingDown className="mr-2" />
      Contingency
    </div>
  ) : txn.earning_type === "referral" ? ( 
    <div className="flex items-center text-[#009b7c]">
      <TrendingUp className="mr-2" />
      Referral
    </div>
  ) : (
    <span>Unknown</span>
  )}
</th>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EarningsSummary;
