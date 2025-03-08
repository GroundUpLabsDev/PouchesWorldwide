"use client";

import { useState } from "react";
import Admincard from '@/components/Admincard';
import SaveOrder from "./SaveOrder";

const admin = () => {
  const [showSaveOrder, setShowSaveOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);  // Renamed to selectedOrderId

  const handleSaveOrderClick = (orderId) => {  // Renamed productId to orderId
    setSelectedOrderId(orderId);  // Updated to store orderId
    setShowSaveOrder(true);
  }; 

  return (
    <div>
      {showSaveOrder ? (
        <SaveOrder orderId={selectedOrderId} />  // Pass the orderId to SaveOrder
      ) : (
        <Admincard onSaveOrderClick={handleSaveOrderClick} />
      )}
    </div>
  );
};
 
export default admin;
