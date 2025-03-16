"use client";

import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import React, { useState, useEffect } from "react";
import AccountCard from "@/components/AdminUi/AcccountCard"; // Ensure this is the correct import path

export default function AccountPage() {
  const [accounts, setAccounts] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetching data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/users/");
        const data = await response.json();

        // Filter only wholesaler users
        const wholesalers = data.filter((user) => user.urole === "wholesaler");

        // Set status based on account.blocked or account.confirmed
        const updatedData = wholesalers.map((account) => {
          if (account.blocked) {
            return { ...account, status: "Rejected" }; // Blocked users get 'Rejected' status
          }
          if (account.confirmed) {
            return { ...account, status: "Approved" }; // Confirmed users get 'Approved' status
          }
          return { ...account, status: "Pending" }; // Default status is 'Pending'
        });

        setAccounts(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  // Empty dependency array to run only on component mount

  // Filtered accounts based on the selected filter
  const filteredAccounts =
    filter === "All" ? accounts : accounts.filter((account) => account.status === filter);

  // Calculate the count for each status
  const countByStatus = accounts.reduce((acc, account) => {
    acc[account.status] = (acc[account.status] || 0) + 1;
    return acc;
  }, {});

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  return (
    <>
      {/* <Banner />*/}
      <div className="flex flex-col items-center justify-center p-5 w-[1010px] mx-auto mt-12 mb-8">
        {/* Radio Button Filter - Enhanced with Circle Indicator */}
        <div className="flex justify-center space-x-8 mb-4">
          {["Pending", "Approved", "Rejected"].map((status) => (
            <label
              key={status}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleFilterChange(status)}
            >
              <input
                type="radio"
                name="accountFilter"
                value={status}
                checked={filter === status}
                onChange={() => handleFilterChange(status)}
                className="hidden peer"
              />
              <div
                className={`flex items-center justify-center w-8 h-8 border-2 rounded-full ${
                  filter === status
                    ? status === "Pending"
                      ? "bg-black text-white"
                      : status === "Approved"
                      ? "bg-teal-800 text-white"
                      : status === "Rejected"
                      ? "bg-pink-800 text-white"
                      : "bg-gray-500 text-white"
                    : "border-gray-300"
                }`}
              >
                <span className="text-sm">{countByStatus[status]}</span>
              </div>
              <span className={`text-sm ${filter === status ? "font-bold" : "text-black"}`}>
                {status}
              </span>
            </label>
          ))}
        </div>

        {/* Account List */}
        <div className="space-y-4 w-full mt-8">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <AccountCard
                key={index}
                id={account.id}
                status={account.status} // Sending status to AccountCard
                {...account} // Passing the rest of the account details
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No accounts found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
