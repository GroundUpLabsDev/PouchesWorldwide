

export const getOrderTimeline = (orderType, paymentMethod) => {
    const defaultTimeline = ["Processing", "Approved", "Shipped", "Delivered"];
  
    const customOrderTimeline = ["Order Received", "Custom Work Started", "Quality Check", "Delivered"];
    const contingencyOrderTimeline = ["Pending Approval", "Approved", "On Hold", "Delivered"];
    const listedOrderTimeline = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
  
    if (orderType === "Custom") return customOrderTimeline;
    if (orderType === "Contingency") return contingencyOrderTimeline;
    if (orderType === "Listed") return listedOrderTimeline;
  
    return defaultTimeline;
  };
  