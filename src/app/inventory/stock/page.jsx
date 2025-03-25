

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import StockTable from "@/components/StockTable";
import CreateOrder from "./create-order";

// Dynamically import CreateOrder page
// const CreateOrder = dynamic(() => import("./create-order"), { ssr: false });

export default function StockPage() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleCreateOrderClick = (productId) => {
    setSelectedProductId(productId);  // Set the selected product ID
    setShowCreateOrder(true);  // Show the CreateOrder form when button is clicked
  };
 
  return (
    <div>
      {/* Stock Table */}
      {!showCreateOrder ? (
        <StockTable onCreateOrderClick={handleCreateOrderClick} />
      ) : (
        <CreateOrder productId={selectedProductId} />
      )}
    </div>
  );
}
