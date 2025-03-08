"use client";

import { useEffect, useState } from "react";
import Inventory from "@/components/AdminUi/inventory"

export default function InventoryPage({ userId }) {
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
    return (
      <div>
        <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[200px]">
  <div className="text-white text-base font-normal font-['Poppins'] capitalize">
  distributor account
  </div>
</div>
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-8">
        <span className="text-black">{username}'s inventory</span> 
      </h2>
      <div className="flex items-center justify-end mb-4 space-x-3">
          
          {/* Signup Button */}
          <button
            type="submit"
            className="hover:bg-yellow-600 text-black py-2 px-4 rounded-md flex items-center justify-center space-x-2 h-[60px] w-[210px]"
            style={{
              borderRadius: '5px',
              background:
                'var(--gold-gradient, linear-gradient(113deg, #F5D061 -0.67%, #E6AF2E 99.33%))',
            }}
          >
            <span>Add New Inventory</span>
            
          </button>
        </div>

        <Inventory />
      </div>
    );
  }
   