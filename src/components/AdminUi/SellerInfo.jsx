"use client";

import { useEffect, useState } from 'react';
import React from 'react';
import { Trash2, Ban, CircleAlert } from "lucide-react";
import DeleteUserButton from "@/components/AdminUi/DeleteAc"

const SellerInfo = ({ userId }) => {
    const [userData, setUserData] = useState(null);

    const deleteUser = () => {
        alert("User deleted!");
    };

    const blockUser = () => {
        alert("User blocked!");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://146.190.245.42:1337/api/users/${userId}`);
                const data = await response.json();
                setUserData(data); // Store user data in state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // If userData is not yet fetched, display a loading message
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="w-full h-full p-5 bg-white rounded-lg border border-[#3f6075]/10 flex flex-col justify-start items-start ">
                <h2 className="text-xl font-medium font-['Poppins'] capitalize mb-4">Seller Information for {userData.username}</h2>
                <div className="mb-4 w-full">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-[#3e5f75] text-lg font-medium font-['Poppins'] capitalize text-left ">Name</p>
                            <p className="text-xl font-normal">{userData.username}</p>
                        </div>
                        <div>
                            <p className="text-[#3e5f75] text-lg font-medium font-['Poppins'] capitalize">Contact Number</p>
                            <p className="text-xl font-normal">{userData.mobileNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4 w-full text-left">
                    <p className="text-[#3e5f75] text-lg font-medium font-['Poppins'] capitalize">Email</p>
                    <p className="text-xl font-normal">{userData.email}</p>
                </div>
                <div className="mb-4 w-full text-left">
                    <p className="text-[#3e5f75] text-lg font-medium font-['Poppins'] capitalize">Address</p>
                    <p className="text-xl font-normal">
                        {userData.address},<br />
                        {userData.city},<br />
                        {userData.state}<br />
                        Sri Lanka
                    </p>
                </div>
                <div className="mb-4 w-full flex justify-between items-center text-left">
                    <div>
                        <p className="text-[#3e5f75] text-lg font-medium font-['Poppins'] capitalize">Role</p>
                        <p className="text-xl font-normal">{userData.urole}</p>
                    </div>
                    <div className="flex space-x-2 relative group">
                        <DeleteUserButton />
                        <div className="relative group">
                            <button onClick={blockUser} className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                                <span>Block User</span>
                                <Ban />
                            </button>
                            <div className="absolute top-[-30px] right-0 transform translate-x-1/2 mr-4">
                                <CircleAlert className="w-[26px] h-[26px] text-black" />
                            </div>
                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white text-sm text-gray-700 p-2 rounded shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity">
                                Block User Permanently, But You Can Unblock User Later
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerInfo;
