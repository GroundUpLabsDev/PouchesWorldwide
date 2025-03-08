'use client';

import React from "react";
import { useState, useEffect } from 'react';
import { Tag, CheckCircle, Circle } from 'lucide-react';
import VerticalTimeline from "@/components/VerticalTimeline"

const StatusOrder = ({ order }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isClient, setIsClient] = useState(false); // To track whether we are on the client
    const  timeline = order.timeline;

    // Use useEffect to ensure this only runs on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Only render content on the client
    if (!isClient) {
        return null; // Or you can show a loading spinner
    }
    

    return (
        <div className="bg-gray-100 p-6 flex justify-center">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl rounded-lg">
                {/* Left Section */}
                <div className="bg-white p-6 w-full lg:w-[585px] h-[fit-content] rounded-lg h-12">
                    <VerticalTimeline timeline={timeline} />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[437px] flex flex-col gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-medium mb-4">Summary</h2>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <div className="text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-primary">Total Cans:</span>
                                <span className="text-[#282F44] font-medium">{order.itemTotal}</span>
                            </div>
                            <div>
                                <span className="font-medium text-primary">Address:</span>
                                <p className="text-right text-[#282F44] font-medium">{order.address.street} <br />{order.address.city} <br />{order.address.state}</p>
                            </div>
                        </div>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <h3 className="text-lg font-medium mb-4">Price Details</h3>
                        <div className="text-gray-700 space-y-2">
                            <div className="flex justify-between text-primary"><span>Total Price</span><span className="text-[#282F44] font-medium">${order.totalAmount}</span></div>
                            <div className="flex justify-between text-primary"><span>Tax</span><span className="text-[#282F44] font-medium">$0.00</span></div>
                            <div className="flex justify-between text-primary"><span>Delivery Fee</span><span className="text-[#282F44] font-medium">$0.00</span></div>
                        </div>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total</span>
                            <div className="p-[10px] rounded-lg" style={{ backgroundColor: '#F5D061' }}>
                                <Tag className="inline-block mr-2" style={{ color: 'black', transform: 'rotate(90deg)' }} /> {/* Black icon and flip */}
                                <span className="text-lg font-medium" style={{ color: 'black' }}>${order.totalAmount}</span> {/* Black text */}
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment Options</h2>
                        <div className="space-y-4">
    {order.method === "Card" && (
        // Card Payments Option
        <div 
            className={`flex items-center p-4 border rounded-lg ${
                paymentMethod === 'Card Payments' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
            } cursor-pointer`}
            onClick={() => setPaymentMethod('Card Payments')}
        >
            <div className="w-[80px] h-[53.65px] mr-4 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                VISA
            </div>
            <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">Card Payments</h3>
                <div className="opacity-70 text-black text-[10px] font-medium font-['Poppins'] capitalize leading-[14px]">
                    **** **** **** 4223
                </div>
            </div>
            <div className="h-[35px] px-4 py-2.5 bg-gradient-to-r from-[#009b7c] via-[#009b7d] to-[#009b7d] rounded-md justify-center items-center gap-1 inline-flex">
                <div className="text-white text-[11px] font-semibold font-['Poppins'] capitalize leading-none">verified</div>
            </div>
        </div>
    )}

    {order.method === "Crypto" && (
        // Crypto Currency Option
        <div 
            className={`flex items-center p-4 border rounded-lg ${
                paymentMethod === 'Crypto Currency' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
            } cursor-pointer`}
            onClick={() => setPaymentMethod('Crypto Currency')}
        >
            <div className="w-[80px] h-[53.65px] mr-4 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                Crypto
            </div>
            <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">Crypto Currency</h3>
                <div className="opacity-70 text-black text-[10px] font-medium font-['Poppins'] capitalize leading-[14px]">With Any Coin</div>
            </div>
            <div className="h-[35px] px-4 py-2.5 bg-gradient-to-r from-[#009b7c] via-[#009b7d] to-[#009b7d] rounded-md justify-center items-center gap-1 inline-flex">
                <div className="text-white text-[11px] font-semibold font-['Poppins'] capitalize leading-none">verified</div>
            </div>
        </div>
    )}

    {order.method === "Cod" && (
        // Cash On Delivery Option
        <div 
            className={`flex items-center p-4 border rounded-lg ${
                paymentMethod === 'Cash On Delivery' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
            } cursor-pointer`}
            onClick={() => setPaymentMethod('Cash On Delivery')}
        >
            <div className="w-[80px] h-[53.65px] mr-4 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold">
                Cash
            </div>
            <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">Cash On Delivery</h3>
                <div className="opacity-70 text-black text-[10px] font-medium font-['Poppins'] capitalize leading-[14px]">Express Delivery Service</div>
            </div>
            <div className="h-[35px] px-4 py-2.5 bg-gradient-to-r from-[#009b7c] via-[#009b7d] to-[#009b7d] rounded-md justify-center items-center gap-1 inline-flex">
                <div className="text-white text-[11px] font-semibold font-['Poppins'] capitalize leading-none">verified</div>
            </div>
        </div>
    )}

    {order.method === "BANK" && (
        // Bank Portal Option
        <div 
            className={`flex items-center p-4 border rounded-lg ${
                paymentMethod === 'Bank' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
            } cursor-pointer`}
            onClick={() => setPaymentMethod('Bank')}
        >
            <div className="w-[80px] h-[53.65px] mr-4 bg-gradient-to-r from-[#3f6075] to-[#3e5f75] rounded-lg flex items-center justify-center text-white font-bold">
                Bank
            </div>
            <div className="flex-1">
                <h3 className="text-gray-800 font-semibold">Bank Portal</h3>
                <div className="opacity-70 text-black text-[10px] font-medium font-['Poppins'] capitalize leading-[14px]">Connect with your bank account</div>
            </div>
            <div className="h-[35px] px-4 py-2.5 bg-gradient-to-r from-[#009b7c] via-[#009b7d] to-[#009b7d] rounded-md justify-center items-center gap-1 inline-flex">
                <div className="text-white text-[11px] font-semibold font-['Poppins'] capitalize leading-none">verified</div>
            </div>
        </div>
    )}
</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusOrder;
