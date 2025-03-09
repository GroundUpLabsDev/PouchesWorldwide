"use client";

import React, { useState, useEffect } from "react";
import ContingencyCard from "@/components/AdminUi/ContingencyCard";

export default function ContingencyPage({ userId }) {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All");

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders");
                const data = await response.json();

                // Filter orders where method is 'Contingency' and transform the astatus
                const contingencyOrders = data.data
                    .filter(order => order.method === "Contingency")
                    .map(order => {
                        if (order.astatus === "Pending") order.astatus = "Approved";
                        if (order.astatus === "canceled") order.astatus = "Rejected";
                        if (order.astatus === "pending") order.astatus = "pending";
                        return order;
                    });

                setOrders(contingencyOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // Filter orders by astatus
    const filteredOrders = filter === "All" ? orders : orders.filter(order => order.astatus === filter);

    // Calculate the count for each astatus
    const countByastatus = orders.reduce((acc, order) => {
        acc[order.astatus] = (acc[order.astatus] || 0) + 1;
        return acc;
    }, {});

    const handleFilterChange = (astatus) => {
        setFilter(astatus);
    };

    return (
        <div className="p-5">
            {/* Radio Button Filter - Enhanced with Circle Indicator */}
            <div className="flex justify-center space-x-8 mb-4">
                {["pending", "Approved", "Rejected"].map((astatus) => (
                    <label
                        key={astatus}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleFilterChange(astatus)}
                    >
                        <input
                            type="radio"
                            name="orderFilter"
                            value={astatus}
                            checked={filter === astatus}
                            onChange={() => handleFilterChange(astatus)}
                            className="hidden peer"
                        />
                        <div
                            className={`flex items-center justify-center w-8 h-8 border-2 rounded-full ${
                                astatus === "pending"
                                    ? filter === astatus
                                        ? "bg-black text-white"
                                        : "border-gray-300"
                                    : astatus === "Approved"
                                    ? "bg-[#009b7c] text-white"
                                    : "bg-[#e22d6e] text-white"
                            }`}
                        >
                            <span className="text-sm">{countByastatus[astatus]}</span>
                        </div>
                        <span className={`text-sm ${filter === astatus ? "font-bold" : "text-black"}`}>
                            {astatus}
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
