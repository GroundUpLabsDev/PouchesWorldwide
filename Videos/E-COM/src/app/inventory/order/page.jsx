"use client";

import { useState } from "react";
import OrdersTabs from "@/components/OrdersTabs";
import Admincard from "@/components/Admincard";
import SaveOrder from "./SaveOrder";
import { TabProvider } from "./TabContext";



export default function OrderPage() {
  const [showSaveOrder, setShowSaveOrder] = useState(false);

  const handleSaveOrderClick = () => {
    setShowSaveOrder(true);
  };

  return (
    <>
    <TabProvider>
      <OrdersTabs />
    </TabProvider>
    </>
  );
}
 