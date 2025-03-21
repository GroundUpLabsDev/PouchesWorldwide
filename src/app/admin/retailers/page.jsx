"use client";

import { useEffect, useState } from "react";
import SellerTable from "@/components/AdminUi/SellerTable";
 

export default function Retailers() {

    const [wholesalers, setWholesalers] = useState([]);

    useEffect(() => {
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await fetch("https://pouchesworldwide.com/strapi/api/users");
          const data = await response.json();
  
          // Filter data for wholesaler users who are confirmed and not blocked
          const wholesalerData = data.filter(
            user =>
              user.urole === "retailer" &&
              user.confirmed === true &&
              user.blocked === false
          );
  
          setWholesalers(wholesalerData); // Update the state with filtered data
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
    }, []); // Empty dependency array ensures this runs only once after the initial render
  
    return <SellerTable data={wholesalers} />;
  }
  