
"use client";
import { useEffect, useState } from "react";
import TransactionDetails from "@/components/AdminUi/TransactionDetails";
import TransactionTable from "@/components/AdminUi/TransactionTable";


export default function TransactionsPage({ userId }) {
  const [username, setUsername] = useState("");

  useEffect(() => { 
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://146.190.245.42:1337/api/users");
        const users = await response.json();

        // Find the user by userId
        const user = users.find(user => user.id === Number(userId));
        
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

  const dummyData = [
    {
      id: 1,
      transaction_id: "TX1001",
      amount: 150.75,
      date: "2023-10-01",
      time: "14:30",
    },
    {
      id: 2,
      transaction_id: "TX1002",
      amount: 200.0,
      date: "2023-10-02",
      time: "09:15",
    },
    {
      id: 3,
      transaction_id: "TX1003",
      amount: 99.99,
      date: "2023-10-03",
      time: "16:45",
    },
    {
      id: 4,
      transaction_id: "TX1004",
      amount: 300.5,
      date: "2023-10-04",
      time: "11:00",
    },
    {
      id: 5,
      transaction_id: "TX1005",
      amount: 450.25,
      date: "2023-10-05",
      time: "18:20",
    },
  ];

    return (
      <div>
        <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
  <div className="text-white text-base font-normal font-['Poppins'] capitalize">
  distributor account
  </div>
</div>
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        <span className="text-black">{username}'s transactions</span>
      </h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-black text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
          <h2 className="text-lg font-bold">Profit</h2>
          <p className="text-2xl mt-2 text-white">34,000 $</p>
        </div>
        <div className="bg-gray-700 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
          <h2 className="text-lg font-bold">Contingency</h2>
          <p className="text-2xl mt-2 text-white">4,000 $</p>
        </div>
        <div className="bg-gray-800 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
          <h2 className="text-lg font-bold">Referral</h2>
          <p className="text-2xl mt-2 text-white">2,300 $</p>
        </div>
      </div>
      <div className="text-black text-lg font-medium font-['Poppins'] capitalize text-left mb-4">do some withdrawal ? </div>
      <TransactionDetails />
      <div className="text-black text-[24.92px] font-medium font-['Poppins'] capitalize text-left mt-4 mb-4">transaction history</div>
      <TransactionTable data={dummyData}/>
      </div>
    );
  }
    