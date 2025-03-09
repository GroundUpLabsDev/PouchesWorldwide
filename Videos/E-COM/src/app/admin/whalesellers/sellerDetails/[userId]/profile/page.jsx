"use client";

import { useEffect, useState } from "react";
import SellerInfo from "@/components/AdminUi/SellerInfo";
import { ArrowUpRight } from 'lucide-react'; 

export default function ProfilePage({ userId }) {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(""); // State to store the profile picture URL
  const [profit, setProfit] = useState("");
  const [contingency, setContingency] = useState("");
  const [referral_earnings, setReferral_earnings] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/users?populate=profilePicture"); // Ensure profilePicture is populated
        const users = await response.json();

        // Find the user by userId
        const user = users.find((user) => user.id === Number(userId));
        
        if (user) {
          setUsername(user.username);
          setProfilePicture(user.profilePicture?.url || ""); // Set the profile picture URL if available
          setProfit(user.profit);
          setContingency(user.contingency);
          setReferral_earnings(user.referral_earnings);
        } else {
          setUsername("Unknown User");
          setProfilePicture(""); // Set to an empty string if user is not found
          setProfit("0");
          setContingency("0");
          setReferral_earnings("0");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername("Error loading user");
        setProfilePicture(""); // Set to empty if error occurs
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
        <div className="text-white text-base font-normal font-['Poppins'] capitalize">
        wholesaler account
        </div>
      </div>

      <h2 className="text-black text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        manage <span className="text-black">{username}'s</span> account
      </h2>

      <div className="flex justify-center mb-8">
        <img
          className="w-44 h-44 rounded-full border-8 border-[#e6af2e]"
          src={profilePicture ? `https://pouchesworldwide.com/strapi${profilePicture}` : "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"} // Add local server path
          alt="Profile"
        />
      </div>

      {/* Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-black text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start">
          <h2 className="text-lg font-bold">Profit</h2>
          <p className="text-2xl mt-2 text-white">{profit} $</p>
        </div>
        <div className="bg-gray-700 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start relative">
          <h2 className="text-lg font-bold">Contingency</h2>
          <p className="text-2xl mt-2 text-white">{contingency} $</p>
          <ArrowUpRight className="absolute top-2 right-2 text-[#e6af2e] w-6 h-6" />
        </div>
        <div className="bg-gray-800 text-[#e6af2e] text-[28px] font-semibold p-4 rounded-lg text-start relative">
          <h2 className="text-lg font-bold">Referral</h2>
          <p className="text-2xl mt-2 text-white">{referral_earnings} $</p>
          <ArrowUpRight className="absolute top-2 right-2 text-[#e6af2e] w-6 h-6" />
        </div>
      </div>

      {/* Pass userId to SellerInfo */}
      <SellerInfo userId={userId} />
    </div>
  );
}
