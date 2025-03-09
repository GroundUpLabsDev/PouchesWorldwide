"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import StatusOrder from "@/components/StatusOrder";
import StatusTable from "@/components/StatusTable";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const OrderHistoryPage = () => {
  const { id } = useParams(); // Get orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders?populate=*");
        const data = await response.json();

        // Find the order that matches the ID from the URL
        const foundOrder = data.data.find((order) => order.id.toString() === id);

        if (!foundOrder) {
          setError("Order not found!");
        } else {
          setOrder(foundOrder);
        }
      } catch (err) {
        setError("Failed to fetch order data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);
      // Check if the order is canceled
      

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  // Check if the order is canceled
  const isCanceled = order.astatus === "Canceled";

  // Find the timeline event with "cancel" status
  const canceledTimeline = order.timeline?.find((event) => event.status === "canceled");

  return (
    <>
      <Header />
    {/* <Banner />*/}
      <div className="bg-gray-100 p-6">
        <div className="flex items-center gap-2 justify-center mr-[375px]">
          <Link href="/cart">
            <ArrowLeft className="text-black w-8 h-8 cursor-pointer" />
          </Link>
          <div className="text-black text-[32px] font-semibold font-['Poppins'] capitalize">
  Order status - #{order.id}
  <div className="ml-4 h-11 px-5 py-2.5 inline-flex space-x-3">
    <label className="h-10 flex items-center text-base font-medium font-['Poppins'] capitalize px-4 py-2 rounded-md bg-gray-200">
      {order.astatus} 
    </label>
    <label className="h-10 flex items-center text-base font-medium font-['Poppins'] capitalize px-4 py-2 rounded-md bg-[#f5d061]">
      {order.method}
    </label>
  </div>
</div>



        </div>
      </div>
      <div className="bg-gray-100">
        {isCanceled && (
          <div className="bg-white p-4 rounded-lg text-red-600 text-center w-[1030px] mx-auto">
            <p className="text-lg font-semibold font-['Poppins'] text-left mb-6 ml-4">
              #{order.id} Was Canceled {order.attributes.cancelReason && `(${order.attributes.cancelReason})`}
            </p>
            {canceledTimeline && (
              <p className="text-black text-lg font-normal font-['Poppins'] mt-2 flex items-center text-left ml-4">
                <ShieldAlert className="w-5 h-5 text-yellow-500 mr-2" /> 
                "{canceledTimeline.title}" was failed or wrong.
              </p>
            )}
          </div>
        )}
      </div>
       <StatusOrder order={order} />
      <div className="bg-gray-100 p-2 flex justify-center">
       <div className="bg-white flex items-center justify-center w-[1030px] rounded-lg pt-6">
          <StatusTable tableData={order.cart || []} /> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistoryPage;
