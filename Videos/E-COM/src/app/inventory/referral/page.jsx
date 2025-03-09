"use client";

import { useEffect, useState } from "react";
import ListTable from "@/components/AdminUi/ListTable";

export default function ReferralPage() {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchReferrals() {
      if (typeof window === "undefined") return;

      // Retrieve user ID from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const { id } = JSON.parse(storedUser);

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

  return (
    <div className="mx-auto max-w-2xl">
      <ListTable data={filteredUsers} />
    </div>
  );
}
