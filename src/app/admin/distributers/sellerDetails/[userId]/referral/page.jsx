"use client";

import { useEffect, useState } from "react";
import ReferralTab from "@/components/AdminUi/ReferralTab";
import { sendGetRequest } from "@/_config/apiConfig";

export default function ReferralPage({ userId }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await sendGetRequest("/users");
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

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
          <div className="text-white text-base font-normal font-['Poppins'] capitalize ">
            wholesaler account
          </div>
        </div>
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
          see <span className="text-black">{username}'s Referral Earnings</span>
        </h2>
      </div>
      <ReferralTab />
    </>
  );
}
