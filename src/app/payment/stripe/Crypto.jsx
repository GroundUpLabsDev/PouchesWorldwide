'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Edit, Upload, CheckCircle, Tag } from 'lucide-react';
import Banner from "@/components/Banner";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';

const CryptoPaymentInstructions = () => { 
  const searchParams = useSearchParams();
  const uEmail = searchParams.get('email');
  const orderId = searchParams.get('id');
  const router = useRouter();
  const tax = 0.0; 
  const deliveryFee = 0.0;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUserId(storedUser.id || null);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [email, setEmail] = useState(uEmail);

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders`); // Fetch all orders
          const data = await response.json();
          
          if (data.data) {
            // Find the order by id
            const order = data.data.find(order => order.id === parseInt(orderId));
            
            if (order) {
              setOrderDetails(order); // Set the found order
            } else {
              console.error("Order not found");
            }
          } else {
            console.error("Invalid response structure");
          }
        } catch (error) {
          console.error("Error fetching order details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [orderId]);

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Pouches Stripe Payments',
          text: ` our admin will get back to you soon stating the stripe payment invoice for your order`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to send email.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleProceed = async () => {
    const orderData = {
      data: {
        stripe: email // Send the entered email to the Stripe field
      },
    };

    try {
      // Send data to Strapi API
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${orderDetails.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to update order");

      alert("Order updated successfully!");
      window.location.href = "/";
    } catch (error) { 
      console.error("Error:", error.message);
      alert("Failed to update order. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orderDetails) {
    return <p>Order not found.</p>;
  }

  const grandTotal = orderDetails.totalAmount + tax + deliveryFee;
    
  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto p-6 bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-[22px] font-bold font-['Poppins'] text-center mb-6 text-primary">Instructions For Stripe Payment </h1>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-lg font-medium font-['Poppins'] text-primary">
              <li><strong>Request Payment Details</strong><br />Click The "Send Email" Button To Receive The Payment Details.</li>
              <li><strong>Check Your Email</strong><br />Check Your Inbox For An Email From Us .</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-black mb-12">
                <span className="text-[#fab12f]">Paym</span>ents Details
              </h2>
              <form>
                <div className="mb-12">
                  <label htmlFor="email" className="block text-zinc-400 text-[15px] font-semibold mb-2">
                    Email *
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      id="email"
                      className="flex-grow border border-gray-300 p-2 rounded-l-lg"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <button
                      type="button"
                      className="bg-gray-200 p-2 rounded-r-lg border border-gray-300 flex items-center"
                      onClick={() => setEmail("")}
                    >
                      <Edit className="mr-2" /> Change Email
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4 mb-12">
                  <div className="mr-16">
                    <p>Please click this button, then check your email for payment details.</p>
                  </div>
                  <button 
                    type="button"
                    className="flex items-center text-black text-base font-semibold font-['Poppins'] w-[188px] h-[54px] p-2.5 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-[10px]"
                    onClick={sendEmail}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Email"}
                    <ArrowRight className="ml-2" />
                  </button>
                </div>

                <div className="mb-8 flex justify-center">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-yellow-500 w-8 h-8 relative overflow-hidden ml-2" />
                    <span className="ml-2 text-zinc-800 text-lg font-normal font-['Inter']">Agree To Terms & Conditions</span>
                  </label>
                </div>

                <div className="flex justify-center">
                  <button 
                    type="button"
                    className="w-[363px] h-[65px] font-semibold font-['Poppins'] p-2.5 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-[10px] flex items-center justify-center"
                    onClick={handleProceed}
                  >
                    Verify Payment <ArrowRight className="ml-2" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <div className="text-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-primary">Total Cans:</span>
                    <span className="text-[#282F44] font-medium">{orderDetails.itemTotal}</span>
                  </div>
                  <div>
                    <span className="font-medium text-primary">Address:</span>
                    <p className="text-right text-[#282F44] font-medium">{orderDetails.address.street}<br></br>{orderDetails.address.city}, {orderDetails.address.country}<br></br>{orderDetails.address.zip}</p>
                  </div>
                </div>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <h3 className="text-lg font-semibold mb-4">Price Details</h3>
                <div className="text-gray-700 space-y-2">
                  <div className="flex justify-between text-primary"><span>Total Price</span><span className="text-[#282F44] font-medium">${orderDetails.totalAmount}</span></div>
                  <div className="flex justify-between text-primary"><span>Tax</span><span className="text-[#282F44] font-medium">${tax}</span></div>
                  <div className="flex justify-between text-primary"><span>Delivery Fee</span><span className="text-[#282F44] font-medium">${deliveryFee}</span></div>
                </div>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="p-[10px] rounded-lg" style={{ backgroundColor: '#F5D061' }}>
                    <Tag className="inline-block mr-2" style={{ color: 'black', transform: 'rotate(90deg)' }} />
                    <span className="text-lg font-bold" style={{ color: 'black' }}>${grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CryptoPaymentInstructions;