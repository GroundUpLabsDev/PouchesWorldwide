"use client";

import React, { useState, useEffect } from "react";
import OrderApprovelCard from "@/components/AdminUi/OrderApprovelCard";

export default function OrderPage({ userId }) {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        // Fetch data from the new API
        const fetchData = async () => {
            try {
                const response = await fetch("https://pouchesworldwide.com/strapi/api/corders?populate[product][populate]=*");
                const data = await response.json();
                const formattedOrders = data.data.map(order => ({
                    orderId: order.documentId,
                    date: new Date(order.createdAt).toLocaleString(),
                    price: order.Price, // Assuming Price is directly available
                    status: order.cstatus, // Assuming cstatus is the status of the order
                    products: order.product.map(product => ({
                        id: product.id,
                        name: product.Name,
                        quantity: order.Can, // Assuming Can represents the quantity
                        price: product.price
                    }))
                }));
                setOrders(formattedOrders);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
                            <span className="text-sm">{countByStatus[status] || 0}</span>
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
                        <OrderApprovelCard key={index} {...order} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
}