"use client";

import { sendGetRequest } from "@/_config/apiConfig";
import React, { useEffect, useState } from "react";

const OrderCard = ({ orderId, item, date, total, cans }) => {
  return (
    <div className="bg-white p-4 mb-4 flex items-center border border-[#ececec] rounded-lg w-[800px]">
      <div className="w-[150px] h-[150px] flex items-center justify-center bg-[#ececec] rounded-lg">
        <img alt="Product image of ZYN" className="w-24 h-24" src="/4.png" />
      </div>

      <div className="flex-1 text-left ml-6">
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins']">Order Id</div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins'] capitalize">
          {orderId}
        </div>
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins'] mt-[31px]">
          Item Name
        </div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins']">{item}</div>
      </div>
      <div className="text-right">
        <div className="text-zinc-500 text-base font-medium font-['Poppins'] mb-2">{date}</div>
        <div className="text-black text-xl font-medium font-['Poppins'] mt-[6px]">
          Total : {total} $
        </div>
        <div className="text-black text-base font-medium font-['Poppins'] mt-[30px]">
          {cans} Cans
        </div>
      </div>
    </div>
  );
};

export default function ContingencyPage({ userId }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await sendGetRequest("/users");
        if (response.status == "error") return;

        const users = response.data;

        // Find the user by userId
        const user = users.find((user) => user.id === Number(userId));

        if (user) {
          setUsername(user.username);
        } else {
          setUsername("Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error loading user");
      }
    };

    fetchUserData();
  }, [userId]);

  const orders = [
    {
      orderId: "#233898377",
      item: "Zyn smooth 3662",
      date: "2024/09/11",
      total: 2300,
      cans: 30,
    },
    {
      orderId: "#233898377",
      item: "Zyn smooth 3662",
      date: "2024/09/11",
      total: 2300,
      cans: 30,
    },
    {
      orderId: "#233898377",
      item: "Zyn smooth 3662",
      date: "2024/09/11",
      total: 2300,
      cans: 30,
    },
    {
      orderId: "#233898377",
      item: "Zyn smooth 3662",
      date: "2024/09/11",
      total: 2300,
      cans: 30,
    },
  ];

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
        <div className="text-white text-base font-normal font-['Poppins'] capitalize">
          distributor account
        </div>
      </div>
      <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        <span className="text-black">{username}'s contingency</span>
      </h2>

      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#282f44] w-[800px] h-[78px] rounded-lg mb-4 text-white text-xl font-normal font-['Poppins'] capitalize flex items-center justify-between px-6">
            <span>Total Contingency</span>
            <span>10,098$</span>
          </div>
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </div>
      </div>
    </div>
  );
}
