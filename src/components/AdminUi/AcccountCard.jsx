'use client';

import React from "react";
import PropTypes from "prop-types";
import { CircleArrowRight } from "lucide-react"; // ✅ Import Lucide Icon
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const AccountCard = ({ id, email, username, status }) => {
  const router = useRouter(); // Initialize the router

  const statusColors = { 
    Pending: "text-black",
    Approved: "text-black",
    Rejected: "text-black",
  };

  const bgColors = {
    Pending: "bg-white border-black",
    Approved: "bg-[#009b7c]/10 border-[#009b7c]",
    Rejected: "bg-[#fa4032]/10 border-[#fa4032]",
  };

  const handleClick = () => {
    // Navigate to the user details page using router.push
    router.push(`/admin/Accounts/UserDetails?userId=${id}`);
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between w-full ${bgColors[status]}`}
    >
      <div className="flex-1">
        <p className="text-sm font-normal text-left">wholesaler</p>
        <p className="text-[#3f6075] text-lg font-medium">{username}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm font-normal text-left">Email</p>
        <p className="text-[#3f6075] text-lg font-medium">{email}</p>
      </div>
      <div className="flex-2 flex flex-col justify-start">
        <p className="text-sm font-normal text-left">Status</p>
        <p className={`text-lg font-medium ${statusColors[status]}`}>{status}</p>
      </div>
      <button className="p-2 hover:bg-transparent" onClick={handleClick}>
        <CircleArrowRight size={24} />
      </button>
    </div>
  );
};

// ✅ Define PropTypes to ensure correct props
AccountCard.propTypes = {
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired, // Corrected prop name
  status: PropTypes.oneOf(["Pending", "Approved", "Rejected"]).isRequired,
};

export default AccountCard;
