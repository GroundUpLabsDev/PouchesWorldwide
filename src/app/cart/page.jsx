"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import HistoryCard from "@/components/HistoryCard";
import { getUserRole } from "@/app/utils/getUserRole";
import axios from "axios";
import Preloader from "@/components/Preloader";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const [activeTab, setActiveTab] = useState("orders");
  const [customOrders, setCustomOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user ? user.id : null;

  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price * product.count, 0);

  // Grouped cart items by strength
  const groupedCart = useMemo(() => {
    const grouped = {};
    cart.forEach((product) => {
      const key = `${product.id}-${product.strength}`; // Unique key for each strength
      if (!grouped[key]) {
        grouped[key] = { ...product }; // Create a new entry for this strength
      } else {
        grouped[key].count += product.count; // Update quantity if strength already exists
      }
    });
    return Object.values(grouped); // Convert grouped object back to an array
  }, [cart]);

  useEffect(() => {
    if (userId) {
      axios
        .get("https://pouchesworldwide.com/strapi/api/all-orders?populate=*")
        .then((response) => {
          const filteredOrders = response.data.data.filter((order) => order.user?.id === userId);
          setSelectedOrders(filteredOrders);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const [orderItemIds, setOrderItemIds] = useState([]);
  const orderId = 16;

  useEffect(() => {
    const fetchOrderItemIds = async () => {
      try {
        const response = await fetch(
          "https://pouchesworldwide.com/strapi/api/order-items?populate=*"
        );
        const data = await response.json();

        const filteredItems = data.data.filter(
          (item) => item?.attributes?.custom_order?.data?.id === orderId
        );

        setOrderItemIds(filteredItems.map((item) => item.id));
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItemIds();
  }, [orderId]);

  useEffect(() => {
    const fetchCustomOrders = async () => {
      try {
        const response = await fetch(
          "https://pouchesworldwide.com/strapi/api/corders?populate[product][populate]=*"
        );
        const data = await response.json();

        if (data && data.data) {
          setCustomOrders(data.data);
        } else {
          console.log("No data found in response");
        }
      } catch (error) {
        console.error("Error fetching custom orders:", error);
      }
    };

    fetchCustomOrders();
  }, []);

  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const updatesQuantity = (orderId, quantity) => {
    const updatedOrders = customOrders.map((order) =>
      order.id === orderId ? { ...order, Can: quantity } : order
    );
    setCustomOrders(updatedOrders);
  };

  const expandedCart = useMemo(() => {
    return cart.flatMap((product) => {
      return Array.from({ length: product.count }, (_, idx) => ({
        ...product,
        instanceId: `${product.id}-${product.strength}-${idx}`,
      }));
    });
  }, [cart]);

  const handleCheckout = (orderId) => {
    const selectedOrder = customOrders.find((order) => order.id === orderId);

    if (selectedOrder && selectedOrder.product?.length > 0) {
      const checkoutData = [
        {
          id: selectedOrder.product[0]?.id,
          Name: selectedOrder.product[0]?.Name,
          imageUrl: `https://pouchesworldwide.com/strapi${selectedOrder.product[0]?.Image?.url}`,
          selectedCans: selectedOrder.Can,
          quantity: selectedOrder.Can,
          price: selectedOrder.Price,
          totalPrice: selectedOrder.Can * selectedOrder.Price,
        },
      ];

      const totalPrice = selectedOrder.Can * selectedOrder.Price;

      // Navigate to the checkout page with the selected order data
      window.location.href = `/customecheckout?totalPrice=${totalPrice.toFixed(
        2
      )}&cartData=${encodeURIComponent(JSON.stringify(checkoutData))}`;
    }
  };

  return (
    <>
      <Header />
      <div className="pt-12">
        {/* <Banner /> */}
      </div>
      <div className="container mx-auto p-6">
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

        {activeTab === "orders" && (
        <div className="flex justify-center mx-auto mb-[105px] px-4">
          <div className="w-full max-w-[1200px]">
            <div className="text-black text-[32px] font-semibold font-['Poppins'] mb-6 text-center">
              Your Cart
            </div>
            {groupedCart.length === 0 && customOrders.length === 0 ? (
              <p className="text-xl text-center capitalize">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-6">
                  {groupedCart.map((product) => (
                    <div
                      key={`${product.id}-${product.strength}`}
                      className="h-[218px] w-full max-w-[871px] mx-auto relative bg-white rounded-[10px] border border-[#adb5bd]/40"
                    >
                      <div className="w-[197px] h-[197px] left-[9px] top-[10px] absolute">
                        <div className="w-[197px] h-[197px] absolute bg-white rounded-[5px]"></div>
                        <img
                          src={product.imageUrl}
                          alt={product.Name}
                          width={141}
                          height={146}
                          className="w-[141px] h-[146px] absolute left-[28px] top-[26px]"
                        />
                      </div>

                      <div className="absolute left-[225px] top-[26px] text-center text-black text-[22px] font-medium font-['Poppins'] capitalize">
                        {product.Name} {product.strength}mg
                      </div>

                      <div className="absolute left-[226px] top-[75px] text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
                        Quantity: {product.count}
                      </div>

                      <div className="absolute left-[224px] top-[124px] flex items-center gap-[19px]">
                        <div className="w-[216px] flex flex-col gap-2">
                          <div className="text-zinc-500 text-[15px] font-['Inter'] font-semibold">
                            Number of Products
                          </div>
                          <div className="h-[54px] p-3 bg-white rounded-md border border-zinc-200 flex items-center overflow-hidden">
                            <input
                              type="number"
                              value={product.count}
                              onChange={(e) =>
                                updateQuantity(product.id, product.strength, parseInt(e.target.value))
                              }
                              className="grow text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
                            />
                          </div>
                        </div>

                        <div className="w-3 h-20 pt-[22px] flex flex-col items-center">
                          <div className="text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
                            X
                          </div>
                        </div>

                        <div className="w-[216px] flex flex-col gap-2">
                          <div className="text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
                            Price for a Product
                          </div>
                          <div className="h-[54px] p-3 bg-white rounded-md border border-zinc-200 flex items-center overflow-hidden">
                            <div className="flex items-center gap-1">
                              <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                                ${product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-[750px] top-[157px] text-[#2f4858] text-[32px] font-medium">
                        $ {(product.price * product.count).toFixed(2)}
                      </div>

                      <div
                        className="btn px-5 py-2.5 absolute left-[756px] top-[10px] bg-[#f7b88e]/60 rounded-[11px] flex items-center cursor-pointer"
                        onClick={() => removeFromCart(product.id, product.strength)}
                      >
                        <div className="text-center text-[#ff7f00] text-[15px] font-medium font-['Poppins'] capitalize">
                          Remove
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {(groupedCart.length > 0 || customOrders.length > 0) && (
                  <div className="flex justify-between items-center gap-[70px] mt-6">
                    <p className="text-xl font-medium text-[#3e5f75] font-['Poppins'] capitalize ml-[162px]">
                      Purchase Order (${totalPrice.toFixed(2)})
                    </p>
                    <Link
                      href={{
                        pathname: userRole === "wholesaler" ? "/customecheckout" : "/checkout",
                        query: {
                          totalPrice: totalPrice.toFixed(2),
                          cartData: JSON.stringify(
                            groupedCart.map(({ id, strength, count, price, Name, imageUrl }) => ({
                              id,
                              strength,
                              count,
                              price,
                              Name,
                              imageUrl,
                            }))
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
            <h2 className="text-[#3f6075] text-[28px] font-semibold font-['Poppins'] capitalize mb-6">
              Order Requests
            </h2>

            {customOrders.length === 0 ? (
              <p className="text-xl text-gray-600">No custom orders yet.</p>
            ) : (
              <>
                <div className="space-y-6">
                  {customOrders.map((order) => (
                    <div
                      key={order.id}
                      className="h-[218px] w-[871px] relative bg-white rounded-[10px] border border-[#adb5bd]/40"
                    >
                      <div className="absolute right-[10px] top-[10px]">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.cstatus === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.cstatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.cstatus === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.cstatus || "No Status"}
                        </div>
                      </div>

                      <div className="absolute left-[10px] top-[40px]">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleCheckboxChange(order.id)}
                          className="checkbox w-[24px] h-[24px] checked:bg-yellow-400 checked:border-yellow-400"
                        />
                      </div>

                      {order.product?.map((product, index) => (
                        <div
                          key={index}
                          className="w-[197px] h-[197px] absolute left-[9px] top-[10px]"
                        >
                          <img
                            src={`https://pouchesworldwide.com/strapi${product.Image?.url}`}
                            alt="Product"
                            width={141}
                            height={146}
                            className="w-[141px] h-[146px] absolute left-[28px] top-[26px]"
                          />
                        </div>
                      ))}

                      <div className="absolute left-[226px] top-[10px] text-black text-sm font-normal font-['Poppins'] capitalize">
                        {order.product[0]?.Name || "No product name"}
                      </div>

                      <div className="absolute left-[224px] top-[124px] flex items-center gap-[19px]">
                        <div className="w-[216px] flex flex-col gap-2">
                          <div className="text-zinc-500 text-[15px] font-['Inter'] font-semibold">
                            Number of Products
                          </div>
                          <div className="h-[54px] p-3 bg-white rounded-md border border-zinc-200 flex items-center overflow-hidden">
                            <input
                              type="number"
                              value={order.Can || 0}
                              onChange={(e) => updatesQuantity(order.id, Number(e.target.value))}
                              className="grow text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
                            />
                          </div>
                        </div>
                        <div className="w-3 h-20 pt-[22px] flex flex-col items-center">
                          <div className="text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
                            X
                          </div>
                        </div>
                        <div className="w-[216px] flex flex-col gap-2">
                          <div className="text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
                            Price for a Product
                          </div>
                          <div className="h-[54px] p-3 bg-white rounded-md border border-zinc-200 flex items-center overflow-hidden">
                            <div className="flex items-center gap-1">
                              <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                                ${order.Price || 0}
                              </span>
                            </div>
                            {order.cstatus === "Approved" && (
                              <div className="absolute right-[10px] bottom-[10px]">
                                <button
                                  onClick={() => handleCheckout(order.id)}
                                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                >
                                  Checkout
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-[750px] top-[157px] text-[#2f4858] text-[32px] font-medium">
                        ${order.Can * order.Price || 0}
                      </div>
                    </div>
                  ))}
                </div>
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