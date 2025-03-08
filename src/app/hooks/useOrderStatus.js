"use client";

import { useState, useEffect } from "react";
import { getOrderTimeline } from "../lib/orders";

const useOrderStatus = (order) => {
  const [status, setStatus] = useState(order.status);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    setTimeline(getOrderTimeline(order.type, order.paymentMethod));
  }, [order]);

  return { status, timeline, setStatus };
};

export default useOrderStatus;
