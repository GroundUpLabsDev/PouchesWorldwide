"use client";

import ReferralOrder from "@/app/inventory/order/referral";
import ReferralPage from "@/app/inventory/referral/page";

import React, {useEffect, useState} from "react";
import {TrendingUp, TrendingDown} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function InventoryTabs() {
  const [activeTab, setActiveTab] = useState("earnings");

  return (
    <>
      <Header/>
      <div className="p-4 flex justify-center mt-8">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="h-14 px-2 py-[7px] bg-[#ececec] rounded-[9px] flex justify-center items-center gap-6">
              {["referral", "orders", "earnings"].map((tab) => (
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
            {activeTab === "referral" && <ReferralPage/>}
            {activeTab === "orders" && <ReferralOrder/>}
            {activeTab === "earnings" && <EarningsSummary/>}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}


export function EarningsSummary() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchReferrals() {
      if (typeof window === "undefined") return;

      // Retrieve user ID from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const {id} = JSON.parse(storedUser);

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
      const {data} = await response.json();

      if (!userData?.id) return; // Ensure userData is available before filtering

      const filteredTransactions = data.filter(
        (order) =>
          order.assigned?.[0]?.id === userData.id && order.astatus === "FULL FILLED"
      );

      const ReferTransactions = data.filter(
        (order) =>
          order.user?.referEmail === userData.email && order.astatus === "FULL FILLED"
      );

      // Merge both filteredTransactions and ReferTransactions
      const mergedTransactions = [...filteredTransactions, ...ReferTransactions];

      const formattedTransactions = mergedTransactions.map((order, index, array) => {
        // Find the first occurrence of the order
        const firstOccurrenceIndex = array.findIndex(o => o.id === order.id);

        return {
          type: order.type || "unknown",
          id: order.id || "#N/A",
          amount: order.commission ? `${order.commission} $` : "0 $",
          earning_type:
            firstOccurrenceIndex === index
              ? "referral"
              : order.contingency
                ? "contingency"
                : "earning",
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
                  Order ID: {txn.id}
                </td>
                <td className="text-[#282f44] text-lg font-medium">
                  {txn.amount}
                </td>
                <th>
                  {txn.earning_type === "earning" ? (
                    <div className="flex items-center text-[#009b7c]">
                      <TrendingUp className="mr-2"/>
                      Earning
                    </div>
                  ) : txn.earning_type === "contingency" ? (
                    <div className="flex items-center text-[#fa4032]">
                      <TrendingDown className="mr-2"/>
                      Contingency
                    </div>
                  ) : txn.earning_type === "referral" ? ( // Added "eeearn" condition
                    <div className="flex items-center text-[#009b7c]">
                      <TrendingUp className="mr-2"/>
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
}
