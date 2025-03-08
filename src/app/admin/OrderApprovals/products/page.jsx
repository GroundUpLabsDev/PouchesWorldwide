

'use client';

import { useState } from 'react';
import { CircleX, CircleCheck } from 'lucide-react';
import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Extract orderId from query parameters
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data for orders
  const orders = [
    { orderId: "2324544343", date: "2023/12/11, 1:30 P.M.", price: "1,300", status: "Pending" },
    { orderId: "8756432981", date: "2023/12/10, 3:45 P.M.", price: "2,450", status: "Approved" },
    { orderId: "1267348291", date: "2023/12/09, 11:15 A.M.", price: "900", status: "Rejected" },
    { orderId: "5647382910", date: "2023/12/08, 5:00 P.M.", price: "3,200", status: "Pending" },
  ];

  // Find the order based on orderId
  const order = orders.find((order) => order.orderId === orderId);

  // Get the status of the order
  const orderStatus = order ? order.status : 'Pending'; // Default to 'Pending' if order not found

  const handleReject = () => {
    if (reason.trim() === '') {
      setErrorMessage('Please provide a reason for rejecting the order.');
    } else {
      setErrorMessage('');
      // Handle the rejection logic here (e.g., submit the reason)
      alert('Order rejected with reason: ' + reason);
    }
  };

  return (
    <>
      <Header />
      <Banner />

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Order Status */}
        <div className="flex items-center justify-between p-4 w-[998px] h-9 mt-12 mb-4">
          <div className="flex items-center">
            <span
              className={`text-white text-sm font-medium px-3 py-1 rounded-full ${
                orderStatus === "Pending"
                  ? "bg-yellow-500"
                  : orderStatus === "Approved"
                  ? "bg-teal-800"
                  : "bg-red-600"
              }`}
            >
              {orderStatus}
            </span>
            <span className="ml-4 text-lg font-medium">Order ID #{orderId}</span>
          </div>
          <div className="text-base font-medium ">
            {order ? order.date : "N/A"}
          </div>
        </div>

        {/* Seller Information 
        <div className="bg-white p-6 rounded-lg border w-[1010px] h-[242px] mt-4">
          <h2 className="text-lg font-medium mb-4">Seller Information</h2>
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="text-[#3e5f75] text-lg font-medium">Name</h3>
              <p>Kasun Gunawardhana</p>
            </div>
            <div>
              <h3 className="text-[#3e5f75] text-lg font-medium">Contact Number</h3>
              <p>076 20 6786 456</p>
            </div>
          </div>
          <div>
            <h3 className="text-[#3e5f75] text-lg font-medium">Email</h3>
            <p>Kasungunawardhana@Gmail.Com</p>
          </div>
        </div>*/}

        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg border w-[1010px] h-[407px] mt-8">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>

          {/* Customer info */}
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-[#3e5f75] text-lg font-medium">Name</span>
              <span className="text-[#3e5f75] text-lg font-medium">Contact Number</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base">Amil Prisshhsaan</span>
              <span className="text-base">076 20 6786 456</span>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <span className="text-[#3e5f75] text-lg font-medium">Email</span>
            <div className="text-base">Amalpreiseirjskk@Test.Main.Com</div>
          </div>

          {/* Address */}
          <div>
            <span className="text-[#3e5f75] text-lg font-medium">Address</span>
            <div className="text-base">
              23,<br />
              Kegalle Street<br />
              Colombo 07<br />
              Sri Lanka
            </div>
          </div>
        </div>

        <div className="container mx-auto pt-4 w-[1010px] h-[470px]">
          <h1 className="text-[28px] font-medium mb-6">Order Details</h1>
          <div className="flex flex-col md:flex-row items-start  justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                alt="Zyn Smooth 23 product image"
                className="rounded-lg bg-[#ececec]"
                height="100"
                src="/4.png"
                width="100"
              />
              <div className="ml-4">
                <p className="text-[#282f44] text-sm font-semibold">Item Name</p>
                <p className="text-zinc-500 text-lg font-semibold">Zyn Smooth 23</p>
                <p className="text-[#282f44] text-sm font-semibold mt-4">Current Price</p>
                <p className="text-zinc-500 text-lg font-semibold">60$</p>
              </div>
            </div>
            <div className="border rounded-lg p-6 shadow-md w-full md:w-1/2">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <div className="mb-[20px]">
                <p className="text-[#282f44] text-sm ">Price Per Cans</p>
                <p className="text-[#282f44] text-2xl font-semibold">50$</p>
              </div>
              <div className="mb-[20px]">
                <p className="text-[#282f44] text-sm ">Number Of Cans</p>
                <p className="text-[#282f44] text-2xl font-semibold">1000</p>
              </div>
              <div className="mb-[20px]">
                <p className="text-[#282f44] text-sm">Total</p>
                <p className="text-[#282f44] text-lg font-semibold">50$ X 1000</p>
              </div> 
              <hr className="my-4 border-black" />
              <p className="text-[#282f44] text-[28px] font-medium">5,000 $</p>
            </div>
          </div>
        </div>

        {/* Conditionally Render Take Action Section */}
        {orderStatus === "Pending" && (
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
              <button className="bg-[#009b7c] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 h-[68px]">
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