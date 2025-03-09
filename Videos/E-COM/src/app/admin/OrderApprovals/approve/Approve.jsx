"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleX, CircleCheck } from 'lucide-react';
import Header from '@/components/AdminUi/Header';
import Footer from "@/components/Footer";
import CartItemCard from "@/components/RCartItemCard";
import { useSearchParams } from 'next/navigation';

export default function CustomOrders() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState(''); // State for rejection reason
  const orderId = searchParams.get('orderId'); // Extract orderId from query parameters

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          'https://pouchesworldwide.com/strapi/api/corders?populate[product][populate]=*'
        );
        const data = await response.json();
        // Filter orders to match the orderId from query parameters
        const filteredOrders = data.data.filter(order => order.documentId === orderId);
        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderId]);

  const handleAccept = async () => {
    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/corders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            cstatus: "Approved", // Update the status to "Approved"
          },
        }),
      });

      if (response.ok) {
        alert('Order approved successfully!');
        window.location.href = '/admin/OrderApprovals'; // Redirect after approval
      } else {
        alert('Failed to approve the order.');
      }
    } catch (error) {
      console.error('Error approving order:', error);
      alert('An error occurred while approving the order.');
    }
  };

  const handleReject = async () => {
    if (!reason) {
      alert('Please provide a reason for rejection.');
      return;
    }

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/corders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            cstatus: "Rejected", // Update the status to "Rejected"
            note: reason, // Include the rejection reason
          },
        }),
      });

      if (response.ok) {
        alert('Order rejected successfully!');
        window.location.href = '/admin/OrderApprovals'; // Redirect after rejection
      } else {
        alert('Failed to reject the order.');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('An error occurred while rejecting the order.');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="container mx-auto p-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-4">
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map((order) => {
                  const orderStatus = order.cstatus || "pending"; // Use cstatus from the API
                  return (
                    <div key={order.id} className="p-4 rounded-lg my-4 max-w-5xl mx-auto">
                      <div className="flex items-center justify-between p-4 w-[975px] h-9 mt-12 mb-4">
                        <div className="flex items-center">
                          <span
                            className={`text-white text-sm font-semibold font-['Poppins'] px-3 py-1 rounded h-[29px] flex items-center justify-center ${
                              orderStatus === "Pending"
                                ? "bg-[#f39c12]"
                                 : orderStatus === "Approved"
                                ? "bg-teal-800"
                                : "bg-red-600"
                            }`}
                          >
                            {orderStatus}
                          </span>
                          <span className="ml-4 text-lg font-medium">Order ID #{order.documentId}</span>
                        </div>
                        <div className="text-base font-medium">
                          {new Date(order.createdAt).toLocaleDateString("en-US")}
                        </div>
                      </div>

                      {/* Customer Information Header */}
                      <div className="bg-white p-6 rounded-lg w-[985px] mt-6 mb-6">
                        <h2 className="text-lg font-semibold">Customer Information</h2>
                      </div>

                      <div className="flex justify-center p-6">
                        <div className="w-full max-w-4xl">
                          <h2 className="text-2xl font-semibold text-black font-poppins capitalize mb-6">
                            Customer Details
                          </h2>

                          {/* Name Input */}
                          <div className="flex w-full mb-4">
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text text-[#A1A1AA] font-semibold">Name</span>
                              </div>
                              <input
                                type="text"
                                name="name"
                                value={order.name || "N/A"}
                                readOnly
                                placeholder="Your name"
                                className="input input-bordered border-black w-full"
                              />
                            </label>
                          </div>

                          {/* Email Input */}
                          <div className="flex w-full mb-4">
                            <label className="form-control w-full">
                              <div className="label">
                                <span className="label-text text-[#A1A1AA] font-semibold">Email</span>
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={order.email || "N/A"}
                                readOnly
                                placeholder="Your Email"
                                className="input input-bordered border-black w-full"
                              />
                            </label>
                          </div>

                          {/* Divided Section: Mobile Number + Bio (Left) and Address Form (Right) */}
                          <div className="flex w-full gap-6">
                            {/* Left Side: Mobile Number and Bio */}
                            <div className="flex-grow">
                              {/* Mobile Number Input */}
                              <label className="form-control w-full mb-4">
                                <div className="label">
                                  <span className="label-text text-[#A1A1AA] font-semibold">Mobile Number</span>
                                </div>
                                <input
                                  type="text"
                                  name="mobile"
                                  value={order.mobile || "N/A"}
                                  readOnly
                                  placeholder="Your Mobile Number"
                                  className="input input-bordered border-black w-full"
                                />
                              </label>

                              {/* Bio Text Area */}
                              <label className="form-control w-full">
                                <div className="label">
                                  <span className="label-text text-[#A1A1AA] font-semibold">Message</span>
                                </div>
                                <textarea
                                  name="message"
                                  value={order.note || "N/A"}
                                  readOnly
                                  placeholder="Leave us a Message ..."
                                  className="textarea textarea-bordered textarea-md border-black w-full h-[140px]"
                                ></textarea>
                              </label>
                            </div>

                            {/* Right Side: Address Form */}
                            <div className="flex-grow">
                              <div className="flex flex-col gap-4">
                                {/* Address */}
                                <label className="form-control">
                                  <div className="label">
                                    <span className="label-text text-[#A1A1AA] font-semibold">Address</span>
                                  </div>
                                  <input
                                    type="text"
                                    name="address"
                                    value={order.address.street || "N/A"}
                                    readOnly
                                    placeholder="No"
                                    className="input input-bordered border-black w-full mb-4"
                                  />
                                </label>
                              </div>
                              <div className="flex flex-col gap-4">
                                {/* Address */}
                                <label className="form-control">
                         
                                  <input
                                    type="text"
                                    name="address"
                                    value={order.address.road || "N/A"}
                                    readOnly
                                    placeholder="No"
                                    className="input input-bordered border-black w-full mb-4"
                                  />
                                </label>
                              </div>
                              <div className="flex flex-col gap-4">
                                {/* Address */}
                                <label className="form-control">
                        
                                  <input
                                    type="text"
                                    name="address"
                                    value={order.address.city || "N/A"}
                                    readOnly
                                    placeholder="No"
                                    className="input input-bordered border-black w-full mb-4"
                                  />
                                </label>
                              </div>
                              <div className="flex flex-col gap-4">
                                {/* Address */}
                                <label className="form-control">
                                  <input
                                    type="text"
                                    name="address"
                                    value={order.address.district || "N/A"}
                                    readOnly
                                    placeholder="No"
                                    className="input input-bordered border-black w-full"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="mt-4 space-y-4">
              {order.product && order.product.length > 0 ? (
                order.product.map((product, index) => (
                  <CartItemCard
                    key={product.id || index}
                    item={product}
                    can={order.Can} // Pass order.Can as a prop
                    price={order.Price} // Pass order.Price as a prop
                  />
                ))
              ) : (
                <p className="text-base text-center">No items in cart</p>
              )}
            </div>
          ))
        )}
      </div>

                    {/*  Conditionally Render Take Action Section */}
                      {orderStatus === "Pending" && (
                        <div className="bg-white p-8 rounded w-[1017px]">
                          <h1 className="text-black text-2xl mb-4">Take Action</h1>
                          <div className="mb-4">
                            <label className="block text-[#282f44] text-lg font-medium mb-2">
                              Why You Reject This Contingency Order?{' '}
                              <span className="bg-[#fa4032] text-white text-sm py-1 px-2 rounded-full">
                                Only For Rejecting Orders
                              </span>
                            </label>
                            <textarea
                              className="w-full border border-gray-300 rounded p-4 text-gray-600"
                              rows="5"
                              placeholder="Write Your Reason To Reject This Order ..."
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              onClick={handleReject}
                              className="bg-[#e70000] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]"
                            >
                              <span>Reject Order</span>
                              <CircleX className="w-5 h-5" />
                            </button>
                            <button
                              onClick={handleAccept}
                              className="bg-[#009b7c] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]"
                            >
                              <span>Accept Order</span>
                              <CircleCheck className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}