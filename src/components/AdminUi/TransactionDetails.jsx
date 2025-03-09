"use client";

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const TransactionDetails = ({ userId }) => {
  const [name, setName] = useState("Chathura Priyashan");
  const [accountNo, setAccountNo] = useState("200 98090 09090 09090");
  const [branch, setBranch] = useState("Kegalle");
  const [bankCode, setBankCode] = useState("1350");
  const [bank, setBank] = useState("Commercial Bank");
  const [country, setCountry] = useState("Sri Lanka");
  const [email, setEmail] = useState("Chathura.Servicee.Xyx@Gamil.Com");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("profit");
  const [currentProfit, setCurrentProfit] = useState(0); // State to store current profit
  const [currentReferralEarnings, setCurrentReferralEarnings] = useState(0); // State to store current referral earnings

  // Fetch current profit and referral earnings when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://pouchesworldwide.com/strapi/api/users/${userId}`);
        const data = await response.json();
        setCurrentProfit(data.profit || 0); // Set current profit
        setCurrentReferralEarnings(data.referral_earnings || 0); // Set current referral earnings
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Function to handle the transaction
  const saveTransaction = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    let updatedValue;
    if (transactionType === "profit") {
      updatedValue = currentProfit - Number(amount); // Subtract amount from current profit
      if (updatedValue < 0) {
        alert('Insufficient profit balance.');
        return;
      }
    } else if (transactionType === "referral") {
      updatedValue = currentReferralEarnings - Number(amount); // Subtract amount from current referral earnings
      if (updatedValue < 0) {
        alert('Insufficient referral earnings balance.');
        return;
      }
    }

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [transactionType === "profit" ? "profit" : "referral_earnings"]: updatedValue,
        }),
      });

      if (response.ok) {
        alert('Transaction successful!');
        // Update the local state with the new value
        window.location.reload(); 
        if (transactionType === "profit") {
          setCurrentProfit(updatedValue);
        } else {
          setCurrentReferralEarnings(updatedValue);
        }
        setAmount(""); // Clear the amount input
      } else {
        alert('Failed to update transaction.');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('An error occurred while updating the transaction.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row w-full">
        {/* Left Section: Editable Transaction Details */}
        <div className="flex-1 text-left md:mr-6">
          <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
          
          {/* Name Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Account No Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Account No</span>
            <input
              type="text"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Branch Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Branch</span>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Bank Code Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Bank Code</span>
            <input
              type="text"
              value={bankCode}
              onChange={(e) => setBankCode(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Bank Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Bank</span>
            <input
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Country Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Country</span>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Email Input */}
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 font-semibold w-32">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-4 p-2 rounded w-full"
            />
          </div>
          
          {/* Save Button */}
          <button
            onClick={saveTransaction}
            className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center"
          >
            Save Details <RefreshCw className="ml-2 h-5 w-5" />
          </button>
        </div>

        {/* Right Section: Transaction Form */}
        <div className="bg-teal-500 p-6 rounded-lg text-white flex flex-col justify-center items-center mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Do Transaction To Seller</h3>

          {/* Dropdown for Profit or Referral */}
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="p-2 rounded text-white mb-4 w-full bg-teal-500 border border-white"
          >
            <option value="profit" className="text-white">Profit</option>
            <option value="referral" className="text-white">Referral</option>
          </select>

          {/* Amount Input */}
          <label htmlFor="amount" className="mb-2 self-start">
            Amount ($)
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 rounded text-black mb-4 w-full"
            placeholder="Enter amount"
          />

          {/* Transfer Button */}
          <button
            onClick={saveTransaction}
            className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center"
          >
            Transfer To Account <RefreshCw className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;