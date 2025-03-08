

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InventoryTabs from "@/components/InventoryTabs";

const inventory = () => {


  return (
    <>
      <Header />
      <InventoryTabs />
      <Footer />
    </>
  );
};

export default inventory;
