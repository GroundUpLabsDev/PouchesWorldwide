"use client";

import { useEffect, useState } from "react";
import DSellerTable from "@/components/AdminUi/DSellerTable";
import Link from "next/link";
import { sendGetRequest } from "@/_config/apiConfig";

export default function Distributers() {
  const [wholesalers, setWholesalers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await sendGetRequest("/users", {
          "filters[urole][$eq]": "distributor",
        });
        const distrubuterDate = response.data;

        setWholesalers(distrubuterDate); // Update the state with filtered data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <div>
      <div className="flex justify-end mb-4 mr-[75px]">
        <Link href="/admin/distributers/Create">
          <button className="h-14 p-2.5 bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] rounded-[5px] flex justify-center items-center gap-2.5 text-black text-lg font-normal font-['Popins'] capitalize">
            Create New Distributor +
          </button>
        </Link>
      </div>

      <DSellerTable data={wholesalers} />
    </div>
  );
}
