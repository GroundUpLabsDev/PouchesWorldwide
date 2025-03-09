'use client';

import { useState, useEffect } from 'react';
import { CircleX, CircleCheck } from 'lucide-react';
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner'; 
import CartItemCard from "@/components/CartItemCard";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useRouter } from 'next/router';
 
const ProductsPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id'); // Extract orderId from query parameters
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://pouchesworldwide.com/strapi/api/all-orders?populate=*');
        const data = await response.json();
        setOrders(data.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    }; 
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  // Find the order based on orderId
  const order = orders.find((order) => order.id.toString() === orderId);
  const orderStatus = order ? order.astatus : 'pending';

  const email = order.email

  const sendEmail = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Pouches Order Approvals',
          text: `Hello,

Your Contingency Approved

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




  const sendREmail = async () => {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: email,
                subject: 'Pouches Order Approvals',
                text: `Hello,

Your Contingency Rejected
${reason}

Thanks!
🚀 Pouches`,
            }),
        });

        const data = await response.json(); // Parse JSON once

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        alert(data.message);
        return true; // Indicate success
    } catch (error) {
        console.error("Error:", error.message);
        alert("Failed to send email.");
        return false; // Indicate failure
    }
};

const handleReject = async () => {
    if (reason.trim() === '') {
        setErrorMessage('Please provide a reason for rejecting the order.');
    } else {
        setErrorMessage('');
        alert('Order rejected with reason: ' + reason);

        const emailSent = await sendREmail(); // Wait for email to send before redirecting
        if (emailSent) {
           
        }
        window.location.href = '/admin/OrderApprovals'; // Navigate only if email was successfully sent
    }
};

const aid = order.documentId;

const handleAccept = async () => {
    try {
        const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${aid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    astatus: "Pending"
                },
            }),
        });

        if (response.ok) {
            alert('Order approved successfully!');
            const emailSent = await sendEmail(); // Wait for email before redirecting
            if (emailSent) {
                
            }
            window.location.href = '/admin/OrderApprovals'; // Navigate only if email was successfully sent
        } else {
            alert('Failed to approve the Order.');
        }
    } catch (error) {
        console.error('Error approving Order:', error);
        alert('An error occurred while approving the Order.');
    }
};


  return (
    <>
      <Header />
    {/* <Banner />*/}

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Order Status */}
        <div className="flex items-center justify-between p-4 w-[975px] h-9 mt-12 mb-4">
          <div className="flex items-center">
            <span
              className={`text-white text-sm font-semibold font-['Poppins'] px-3 py-1 rounded h-[29px] flex items-center justify-center px-1.5 py-1 ${ 
                orderStatus === "pending"
                  ? "bg-[#f39c12]"
                  : orderStatus === "Approved" 
                  ? "bg-teal-800"
                  : "bg-red-600"
              }`}
            >
              {orderStatus}
            </span>
            <span className="ml-4 text-lg font-medium">Order ID #{order.id}</span>
          </div>
          <div className="text-base font-medium ">
          {new Date(order.createdAt).toLocaleDateString("en-US")}
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg w-[985px] mt-6 mb-6">
          <h2 className="text-lg font-semibold">Customer Information</h2></div>

          <div className="bg-white pb-8 pl-8 pr-8 rounded-lg w-full max-w-[1000px] flex flex-col items-center mx-auto">
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    <div className="w-full">
      {/* Customer Name */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Name
      </label>
      <Link href={`https://pouchesworldwide.com/admin/whalesellers/sellerDetails/${order.user.id}`} target="_blank" passHref>
  <div className="w-full p-3 border border-gray-300 rounded-lg mb-8 cursor-pointer bg-gray-100">
    <span
      className="w-full bg-transparent cursor-pointer block"
      aria-label="Customer’s Name"
    >
      {order.customerName}
    </span>
  </div>
</Link>

      
      {/* Customer Email */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Email
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Email"
        type="email"
        name="customerEmail"
        value={order.email}
        disabled
      />
      {/* Customer Mobile */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Mobile Number
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Mobile Number"
        type="text"
        name="mobile"
        value={order.mobile}
        disabled
      />
      {/* Shipping Address */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Shipping Address
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Shipping Address"
        type="text"
        name="shippingAddress"
        value={order.address.street}
        disabled
      />
      {/* Address Details */}
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="City/Town"
        type="text"
        name="city"
        value={order.address.city}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="State/Province/Region"
        type="text"
        name="state"
        value={order.address.state}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Country"
        type="text"
        name="country"
        value={order.address.country}
        disabled
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="ZIP Code"
        type="text"
        name="zip"
        value={order.address.zip}
        disabled
      />
      {/* Note */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Note
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Additional Notes"
        type="text"
        name="note"
        value={order.note ?? ""}
        disabled
      />
    </div>

    <div className="w-full">
      {/* Number Of Items */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Number Of Cans
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Number of Items ordered"
        type="text"
        value={!order.cart || order.cart.length === 0
          ? order.itemTotal
          : order.cart.length > 1
            ? "Multiple"
            : order.itemTotal}
        disabled
      />
      {/* Price Of The Item */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Total Price
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Price of the product"
        type="text"
        value={`$${order.totalAmount}`}
        disabled
      />
      {/* Commission
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Commission
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg"
        placeholder="Commission Amount"
        type="text"
        value={`$${order.commission}`} 
        disabled
      /> */}
    </div>
  </div>
</div>

<div className="mt-4 space-y-4">
      {order.cart && order.cart.length > 0 ? (
        order.cart.map((item, index) => <CartItemCard key={index} item={item} />)
      ) : (
        <p className="text-base text-center">No items in cart</p>
      )}
    </div>

        {/* Conditionally Render Take Action Section */}
        {orderStatus === "pending" && (
          <div className="bg-white p-8 rounded  w-[1017px] ">
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
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4 ">
              <button
                onClick={handleReject}
                className="bg-[#e70000] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]"
              >
                <span>Reject Order</span>
                <CircleX className="w-5 h-5" />
              </button>
              <button 
               onClick={handleAccept}
              className="bg-[#009b7c] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]">
                
                <span>Accept Order</span> 
                <CircleCheck className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer /> 
    </>
  );
};

export default ProductsPage;