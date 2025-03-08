

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useCartStore from "@/store/cartStore";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import HistoryCard from "@/components/HistoryCard";
import { getUserRole } from "@/app/utils/getUserRole";
import axios from "axios";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, customOrders } = useCartStore();
  const [activeTab, setActiveTab] = useState("orders");
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [userRole, setUserRole] = useState(null);
  
  // Get logged-in user from localStorage
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user ? user.id : null;


  // Fetch orders from API and filter by logged-in user ID
  useEffect(() => {
    if (userId) {
      axios
        .get('http://146.190.245.42:1337/api/all-orders?populate=*')  // Replace with your actual API endpoint
        .then((response) => {
          // Filter orders by user ID
          const filteredOrders = response.data.data.filter(order => order.user?.id === userId);
          setSelectedOrders(filteredOrders);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [userId]);

  // Get user role on component mount
  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const handleCheckboxChange = (orderId) => {
    console.log("Checkbox clicked for order ID:", orderId); // Debugging
    setSelectedOrders((prevSelectedOrders) => {
      if (prevSelectedOrders.includes(orderId)) {
        return prevSelectedOrders.filter((id) => id !== orderId); // Deselect order
      } else {
        return [...prevSelectedOrders, orderId]; // Select order
      }
    });
  };

  console.log("Selected Orders:", selectedOrders); // Debugging

  return (

    <>
      <Header />
      <div className="pt-4">
      <Banner /></div>
      <div className="container mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="h-14 px-2 py-[7px] bg-[#ececec] rounded-[9px] justify-center items-center gap-[70px] inline-flex">
            <button
              className={`h-11 px-5 py-2.5 rounded-md justify-center items-center gap-2.5 flex ${
                activeTab === "orders" ? "bg-[#282f44]" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <div className={`text-lg font-normal font-['Inter'] capitalize ${
                activeTab === "orders" ? "text-white" : "text-[#282f44]"
              }`}>
                orders
              </div>
            </button>

            {userRole === "wholesaler" && (
              <button
                className={`h-11 px-5 justify-center items-center gap-2.5 flex ${
                  activeTab === "customOrders" ? "bg-[#282f44] rounded-md" : ""
                }`}
                onClick={() => setActiveTab("customOrders")}
              >
                <div className={`text-lg font-normal font-['Inter'] capitalize ${
                  activeTab === "customOrders" ? "text-white" : "text-[#282f44]"
                }`}>
                  custom orders
                </div>
              </button>
            )}

            <button
              className={`h-11 px-5 justify-center items-center gap-2.5 flex ${
                activeTab === "orderHistory" ? "bg-[#282f44] rounded-md" : ""
              }`}
              onClick={() => setActiveTab("orderHistory")}
            >
              <div className={`text-lg font-normal font-['Inter'] capitalize ${
                activeTab === "orderHistory" ? "text-white" : "text-[#282f44]"
              }`}>
                order history
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div className="flex justify-center mx-auto mb-[105px] px-4">
          <div className="w-full max-w-[1200px]">
            <div className="text-black text-[32px] font-semibold font-['Poppins'] mb-6 text-center">
              Your Cart
            </div>
            {cart.length === 0 && customOrders.length === 0 ? (
              <p className="text-xl text-center capitalize">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-6">
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="h-[218px] w-full max-w-[871px] mx-auto relative bg-white rounded-[10px] border border-[#adb5bd]/40"
                    >
                      {/* Product Image */}
                      <div className="w-[197px] h-[197px] left-[9px] top-[10px] absolute">
                        <div className="w-[197px] h-[197px] left-0 top-0 absolute bg-white rounded-[5px]"></div>
                        <img
                          src={product.imageUrl}
                          alt={product.Name}
                          width={141}
                          height={146}
                          className="w-[141px] h-[146px] left-[28px] top-[26px] absolute"
                        />
                      </div>
        
                      {/* Product Name 
                      <div className="left-[226px] top-[10px] absolute text-black text-sm font-normal font-['Poppins'] capitalize">
                        product name
                      </div>*/}
                      <div className="left-[225px] top-[26px] absolute text-center text-black text-[22px] font-medium font-['Poppins'] capitalize">
                        {product.Name}
                      </div>
        
                      {/* Product Details */}
                      <div className="left-[226px] top-[75px] absolute text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
                        12mg | {product.selectedCans} Cans
                      </div>
        
                      {/* Number of Products and Price */}
                      <div className="left-[224px] top-[124px] absolute justify-start items-center gap-[19px] inline-flex">
                        {/* Number of Products */}
                        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
                              Number of Products
                            </div>
                          </div>
                          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                              className="grow shrink basis-0 text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
                              disabled
                            />
                          </div>
                        </div>
        
                        {/* Multiplication Sign */}
                        <div className="w-3 h-20 pt-[22px] flex-col justify-center items-center gap-2.5 inline-flex">
                          <div className="self-stretch text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
                            X
                          </div>
                        </div>
        
                        {/* Price for a Product */}
                        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-500 text-[15px] font-semibold font-['Inter'] leading-[18px]">
                              Price for a Product
                            </div>
                          </div>
                          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
                            <div className="flex items-center gap-1">
                              <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                                ${product.price}
                              </span>
                              <input
                                type="number"
                                className="text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none w-full"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
        
                      {/* Total Price */}
                      <div className="left-[750px] top-[157px] absolute text-[#2f4858] text-[32px] font-medium">
                        $ {product.price * product.quantity}
                      </div>
        
                      {/* Rating Stars 
                      <div className="left-[600px] top-[10px] absolute justify-center items-center">
                         <div className="rating">
    {[...Array(5)].map((_, index) => (
      <input
        key={index}
        type="radio"
        name={`rating-2`}
        className={`mask mask-star-2 ${index < product.rating ? "" : "bg-gray-400"}`}
style={index < product.rating ? { background: "linear-gradient(to right, #fae255 0%, #a06a0f 100%)" } : {}}

        defaultChecked={index < product.rating}
        readOnly
        disabled
      />
                          ))}
                        </div>
                      </div>*/}
        
                      {/* Remove Button */}
                      <div className="btn px-5 py-2.5 left-[756px] top-[10px] absolute bg-[#f7b88e]/60 rounded-[11px] justify-center items-center gap-2.5 inline-flex">
                        <div
                          className="text-center text-[#ff7f00] text-[15px] font-medium font-['Poppins'] capitalize cursor-pointer"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
        
                {/* Bottom Section for Orders */}
                {(cart.length > 0 || customOrders.length > 0) && (
                  <div className="flex justify-between items-center gap-[70px] mt-6">
                    <p className="text-xl font-medium text-[#3e5f75] font-['Poppins'] capitalize ml-[162px]">
                      Purchase Order (${totalPrice.toFixed(2)})
                    </p>
                    <Link
href={{
  pathname: userRole === "retailer" || userRole === "guest" ? "/checkout" : "/customecheckout",
  query: {
    totalPrice: totalPrice.toFixed(2),
    cartData: JSON.stringify(
      cart.map(({ id, selectedCans, quantity, price, Name }) => ({ id, selectedCans, quantity, price, Name }))
    ),
  },
}}
>
                      <button className="btn mr-[164px] btn-lg bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] text-[#282f44] shadow-lg rounded-lg flex items-center px-4 py-2">
                        <span className="text-xl font-medium font-['Poppins'] capitalize">
                          Checkout
                        </span>
                        <ArrowRight className="text-[#282f44] w-6 h-6 ml-2" />
                      </button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        )}

        {activeTab === "customOrders" && (
          <div className="mx-[168px] mb-[105px]">
            <h2 className="text-[#3e5f75] text-[28px] font-semibold font-['Poppins'] capitalize mb-6">
              Order Requests
            </h2>
            {customOrders.length === 0 ? (
              <p className="text-xl text-gray-600">No custom orders yet.</p>
            ) : (
              <>
                <div className="space-y-6">
                  {customOrders.map((order) => (
                    <div key={order.id} className="h-[218px] w-[871px] relative bg-white rounded-[10px] border border-[#adb5bd]/40">
                      {/* Checkbox */}
                      <div className="absolute left-[10px] top-[10px]">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleCheckboxChange(order.id)}
                          className="checkbox w-[24px] h-[24px] checked:bg-yellow-400 checked:border-yellow-400"
                        />
                      </div>

                      {/* Product Image */}
                      <div className="w-[197px] h-[197px] left-[9px] top-[10px] absolute">
                        <img
                          src={order.product.Image}
                          alt={order.product.Name}
                          width={141}
                          height={146}
                          className="w-[141px] h-[146px] left-[28px] top-[26px] absolute"
                        />
                      </div>

                      {/* Product Name */}
                      <div className="left-[226px] top-[10px] absolute text-black text-sm font-normal font-['Poppins'] capitalize">
                        product name
                      </div>
                      <div className="left-[225px] top-[26px] absolute text-center text-black text-[22px] font-medium font-['Poppins'] capitalize">
                        {order.product.Name}
                      </div>

                      {/* Product Details */}
                      <div className="left-[226px] top-[75px] absolute text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
                        12mg | 15 pouches
                      </div>

                      {/* Number of Products and Price */}
                      <div className="left-[224px] top-[124px] absolute justify-start items-center gap-[19px] inline-flex">
                        {/* Number of Products */}
                        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
                              Number of Products
                            </div>
                          </div>
                          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
                            <input
                              type="number"
                              value={order.quantity}
                              onChange={(e) => updateQuantity(order.id, Number(e.target.value))}
                              className="grow shrink basis-0 text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
                            />
                          </div>
                        </div>

                        {/* Multiplication Sign */}
                        <div className="w-3 h-20 pt-[22px] flex-col justify-center items-center gap-2.5 inline-flex">
                          <div className="self-stretch text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
                            X
                          </div>
                        </div>

                        {/* Price for a Product */}
                        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
                          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
                            <div className="self-stretch text-zinc-500 text-[15px] font-semibold font-['Inter'] leading-[18px]">
                              Price for a Product
                            </div>
                          </div>
                          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
                            <div className="flex items-center gap-1">
                              <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                                ${order.requestedPrice}
                              </span>
                              <input
                                type="number"
                                className="text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="left-[750px] top-[157px] absolute text-[#2f4858] text-[32px] font-medium">
                        $ {order.totalAmount}
                      </div>

                      {/* Rating Stars */}
                      <div className="left-[600px] top-[10px] absolute justify-center items-center">
                        <div className="rating">
                          {[...Array(5)].map((_, index) => (
                            <input
                              key={index}
                              type="radio"
                              name={`rating-${order.id}`}
                              className="mask mask-star-2 bg-orange-400"
                              defaultChecked={index < order.rating}
                              disabled
                            />
                          ))}
                        </div>
                      </div>

                      {/* Status Button */}
                      <div className="btn px-5 py-2.5 left-[756px] top-[10px] absolute bg-[#f7b88e] rounded-[11px] justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-[#ff7f00] text-[15px] font-medium font-['Poppins'] capitalize">
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom Section for Custom Orders 
                {selectedOrders.length > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <span className="text-[#3e5f75] text-lg font-medium font-['Poppins']">
                        {selectedOrders.length} Items Selected
                      </span>
                      <span className="text-[#3e5f75] text-lg font-medium font-['Poppins']">
                        Choose Best Payment Plan For You
                      </span>
                    </div>
                    <button className="px-6 py-2.5 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-[11px] text-white text-[15px] font-medium font-['Poppins']">
                      Payment Plans
                    </button>
                  </div>
                )}*/}
              </>
            )}
          </div>
        )}

        {activeTab === "orderHistory" && (
          <div className="mx-[168px] mb-[105px]">
            <h2 className="text-black text-center text-[32px] font-semibold font-['Poppins']">
              Order History
            </h2>
            <div className="flex flex-col items-center space-y-6 p-4">
          {selectedOrders.length === 0 ? (
            <p>No orders found for this user.</p>
          ) : (
            selectedOrders.map((order, index) => (
              <HistoryCard key={index} {...order} />
            ))
          )}
        </div>
          </div>
        )}
      </div>

      <Footer />  
    </>


  );
};

export default CartPage;