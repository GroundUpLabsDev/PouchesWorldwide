
"use client";
import React, { useState } from "react";
import ContingencyCard from "@/components/AdminUi/ContingencyCard";

export default function ContingencyPage({ userId }) {
    const orders = [
        { orderId: "2324544343", date: "2023/12/11, 1:30 P.M.", price: "1,300", status: "Pending" },
        { orderId: "8756432981", date: "2023/12/10, 3:45 P.M.", price: "2,450", status: "Approved" },
        { orderId: "1267348291", date: "2023/12/09, 11:15 A.M.", price: "900", status: "Rejected" },
        { orderId: "5647382910", date: "2023/12/08, 5:00 P.M.", price: "3,200", status: "Pending" },
    ];

    const [filter, setFilter] = useState("All");

    const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

    // Calculate the count for each status
    const countByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {});

    const handleFilterChange = (status) => {
        setFilter(status);
    };

    return (
        <div className="p-5">
            {/* Radio Button Filter - Enhanced with Circle Indicator */}
            <div className="flex justify-center space-x-8 mb-4">
    {["Pending", "Approved", "Rejected"].map((status) => (
        <label
            key={status}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleFilterChange(status)}
        >
            <input
                type="radio"
                name="orderFilter"
                value={status}
                checked={filter === status}
                onChange={() => handleFilterChange(status)}
                className="hidden peer"
            />
            <div
                className={`flex items-center justify-center w-8 h-8 border-2 rounded-full ${
                    status === "Pending"
                        ? filter === status
                            ? "bg-black text-white"
                            : "border-gray-300"
                        : status === "Approved"
                        ? "bg-[#009b7c] text-white" // Default color for Approved
                        : "bg-[#e22d6e] text-white" // Default color for Rejected
                }`}
            >
                <span className="text-sm">{countByStatus[status]}</span>
            </div>
            <span className={`text-sm ${filter === status ? "font-bold" : "text-black"}`}>
                {status}
            </span>
        </label>
    ))}
</div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <ContingencyCard key={index} {...order} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
}
