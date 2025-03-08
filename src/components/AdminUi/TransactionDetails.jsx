import React from 'react';
import { RefreshCw } from 'lucide-react'; // Import the Lucide icon

const TransactionDetails = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row w-full">
        {/* Left Section: Transaction Details */}
        <div className="flex-1 text-left">
          <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Name</span>
            <span className="ml-16">Chathura Priyashan</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Account No</span>
            <span className="ml-4">200 98090 09090 09090</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Branch</span>
            <span className="ml-4">Kegalle</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Bank Code</span>
            <span className="ml-4">1350</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Bank</span>
            <span className="ml-4">Commercial Bank</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Country</span>
            <span className="ml-4">Sri Lanka</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 font-semibold">Email</span>
            <span className="ml-4">Chathura.Servicee.Xyx@Gamil.Com</span>
          </div>
        </div>

        {/* Right Section: Transaction Form */}
        <div className="bg-teal-500 p-6 rounded-lg text-white flex flex-col justify-center items-center mt-6 md:mt-0 md:ml-6">
  <h3 className="text-lg font-semibold mb-4">Do Transaction To Seller</h3>

{/* Dropdown for Profit or Referral */}

  <select
    id="transactionType"
    className="p-2 rounded text-white mb-4 w-full bg-teal-500 border border-white"
  >
    <option value="profit" className="text-white">Profit</option> {/* White text not applicable here */}
    <option value="referral" className="text-white">Referral</option> {/* White text not applicable here */}
  </select>

  {/* Amount Input */}
  <label htmlFor="amount" className="mb-2 self-start">
    Amount ($)
  </label>
  <input
    type="text"
    id="amount"
    className="p-2 rounded text-black mb-4 w-full"
    placeholder="Enter amount"
  />

  

  {/* Transfer Button */}
  <button className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded flex items-center">
    Transfer To Account <RefreshCw className="ml-2 h-5 w-5" />
  </button>
</div>
      </div>
    </div>
  );
};

export default TransactionDetails;