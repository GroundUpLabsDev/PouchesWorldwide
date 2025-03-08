import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const EarningsSummary = () => {
  const transactions = [
    { type: "admin order", id: "#3452542", amount: "5 $", earning_type: "contingency" },
    { type: "external order", id: "#3452542", amount: "57 $" },
    { type: "admin order", id: "#3452542", amount: "100 $", earning_type: "earning" },
    { type: "reffereal order", id: "#3452542", amount: "500 $" },
  ];

  // Extracting only the necessary data
  const earningsData = transactions.map((txn) => ({
    type: txn.type,
    id: txn.id,
    amount: txn.amount,
    earning_type: txn.earning_type,
  }));

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6 text-start" >
        Manage Your Earnings
      </h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

      {/* Earnings List */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Remarks</th>
              <th>Income</th>
              <th>Added As A</th>
            </tr>
          </thead>
          <tbody>
  {/* Dynamically render rows based on transactions */}
  {earningsData.map((txn, index) => (
    <tr key={index}>
      <td>
        <div className="text-[#282f44] text-lg font-medium font-['Poppins'] capitalize">{txn.type}</div>
      </td>
      <td>
        {/* Conditionally render remarks */}
        <div className="text-[#282f44] text-lg font-medium font-['Poppins']">
          {txn.type === "reffereal order" ? (
            `Order id: ${txn.id}` // Show txn.id for "reffereal order"
          ) : (
            `Order id: ${txn.id}` // Show order ID for other types
          )}
        </div>
      </td>
      <td className="text-[#282f44] text-lg font-medium font-['Poppins']">{txn.amount}</td>
      <th>
        {/* Conditionally render Earning or Contingency with icons */}
        {txn.earning_type === "earning" && (
          <div className="flex items-center text-[#009b7c]">
            <TrendingUp className="mr-2" /> {/* Trending up icon */}
            Earning
          </div>
        )}
        {txn.earning_type === "contingency" && (
          <div className="flex items-center text-[#fa4032]">
            <TrendingDown className="mr-2" /> {/* Trending down icon */}
            Contingency
          </div>
        )}
      </th>
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </>
  );
};

export default EarningsSummary;
