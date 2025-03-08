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
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUserId(storedUser.id || null);
    }
  }, []);

  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [email, setEmail] = useState(uEmail);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (orderId) {
      const fetchOrderDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://146.190.245.42:1337/api/all-orders`); // Fetch all orders
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
          subject: 'Pouches Crypto Payments',
          text: `Hello,

You can send your crypto payments to the following addresses:

💰 Bitcoin (BTC): 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
💰 Ethereum (ETH): 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
💰 USDT (TRC20): TXJgq3NkjhTJJX1crWz5LzFjY5n4A5S8oD
💰 BNB (BEP20): 0xd551234Ae421e3BCBA99A0Da6d736074f22192FF

After making the payment, please Update the transaction ID for confirmation.

Thanks!
🚀 Pouches`,
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

  const sendTransactionEmail = async () => {
    if (!transactionId.trim()) {
      alert("Please enter a transaction ID before verifying.");
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Transaction ID Received',
          text: `Hello,

We have received your transaction ID for the crypto payment.

Transaction ID: ${transactionId}

Our team will verify your payment and update you soon.

Thanks!
🚀 Pouches`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to send transaction email.");
    }
  };

  const handleTransactionIdChange = (e) => { 
    setTransactionId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!orderDetails) {
    return <p>Order not found.</p>;
  }

  const grandTotal = orderDetails.totalAmount + tax + deliveryFee;
  const aid = orderDetails.documentId;

  const handleProceed = async () => {
    const orderData = {
      data: {
        txid: transactionId,
        user: userId, 
        timeline: [
          {
            title: "Transaction ID Received",
            Reason: "Transaction verified",
            status: "completed"
          },
          {
            title: "Payment Successful",
            Reason: "Payment processed",
            status: "inProgress"
          },
          {
            title: "Order Processor Appointed",
            Reason: "Assigned to processor",
            status: "upcoming"
          },
          {
            title: "Order Processing",
            Reason: "Order in progress",
            status: "upcoming"
          },
          {
            title: "Order Shipping Details In Inspection",
            Reason: "Shipping in inspection",
            status: "upcoming"
          },
          {
            title: "Order Shipped",
            Reason: "Order dispatched",
            status: "upcoming"
          }
        ]
      },
    };

    try {
      // Send data to Strapi API
      const response = await fetch(`http://146.190.245.42:1337/api/all-orders/${aid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to update order");

      sendTransactionEmail();
      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to update order. Please try again.");
    }
  };

  
    
  return (
        <>
        <Header />
        <Banner />
        <div className="bg-gray-100">
    <div className="max-w-5xl mx-auto p-6 bg-gray-100">
      {/* Instructions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-[22px] font-bold font-['Poppins'] text-center mb-6 text-primary">Instructions For Cryptocurrency Payment </h1>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 text-lg font-medium font-['Poppins'] text-primary">
          <li><strong>Request Payment Details</strong><br />Click The "Send Email" Button To Receive The Payment Details.</li>
          <li><strong>Check Your Email</strong><br />Check Your Inbox For An Email From Us Containing The Wallet Address For The Transaction.</li>
          <li><strong>Make The Payment</strong><br />Use Any Cryptocurrency Platform, Such As Binance, To Complete Your Payment.</li>
          <li><strong>Upload Payment Verification</strong><br />After Completing The Payment, Upload A Verification Document To Confirm Your Transaction. This Can Be A Screenshot Or A PDF. Ensure That The Payment ID And Your Name Are Clearly Visible. Accepted File Formats: JPG, PNG, PDF.</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-black mb-4">
          <span className="text-[#fab12f]">Paym</span>ents Details
        </h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-zinc-400 text-[15px] font-semibold mb-2">
              Email *
            </label>
            <div className="flex">
    <input
      type="email"
      id="email"
      className="flex-grow border border-gray-300 p-2 rounded-l-lg"
      value={orderDetails.email}
      onChange={handleEmailChange} // Enable editing
    />
    <button
      type="button"
      className="bg-gray-200 p-2 rounded-r-lg border border-gray-300 flex items-center"
      onClick={() => setEmail("")} // Clear the email field
    >
      <Edit className="mr-2" /> Change Email
    </button>
  </div>
          </div>

          <div className="flex items-center justify-center mt-4 mb-6">
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

          <div className="mb-8">
            <label htmlFor="transaction-id" className="block text-zinc-400 text-[15px] font-semibold mb-2">
              Transaction ID
            </label>
            <input
  type="text"
  id="transaction-id"
  className="w-full border border-gray-300 p-2 rounded-lg"
  placeholder="Your transaction ID paste here..."
  value={transactionId}
  onChange={handleTransactionIdChange}
/>

          </div>

          <div className="mb-4">
            <label htmlFor="upload-receipt" className="block text-zinc-500 text-[15px] font-semibold font-['Inter'] mb-2">
              Upload Payment Receipt
            </label>
            <button
              type="button"
              className="bg-primary w-[178px] text-white text-lg font-semibold font-['Poppins'] p-2 rounded-lg flex items-center justify-center border border-gray-300"
            >
              Upload <Upload className="m-2" />
            </button>
          </div>

          <p className="text-gray-700 mb-4">
            After payment, please upload a verification document proving your payment. Ensure the payment ID and your name are visible. Accepted formats: JPG, PNG, PDF.
          </p>

          <div className="mb-4 flex justify-center">
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
    

        {/* Summary Section */}
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
  <Tag className="inline-block mr-2" style={{ color: 'black', transform: 'rotate(90deg)' }} /> {/* Black icon and flip */}
  <span className="text-lg font-bold" style={{ color: 'black' }}>${grandTotal}</span> {/* Black text */}
</div></div></div></div>

                        
      </div>
    </div>
      <Footer /></div>
        </>
    );
};



export default CryptoPaymentInstructions;