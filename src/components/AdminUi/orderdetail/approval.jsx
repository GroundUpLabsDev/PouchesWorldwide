"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, MoveUpRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import CartItemCard from "@/components/CartItemCard";
import { useState, useEffect } from "react";

const ProcessingCard = ({ order }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  if (!order) { 
    return <p className="text-center text-red-500">No order found.</p>;
  }
  const [isContingency, setIsContingency] = useState(false);
  const [refferID, setRefferID] = useState(null);

  

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked;
    setIsContingency(checked);
    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${order.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({ data: { contingency: checked } }), // ✅ Corrected syntax
      });
  
      if (response.ok) {
        console.log(`Order updated successfully! Contingency: ${checked}`);
      } else {
        console.error("Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const aid = order.assigned[0].id;
const com = order.commission;
const fullUrl = order.btc?.[0]?.url 
? `https://pouchesworldwide.com/strapi${order.btc[0].url}` 
: "#"; // Fallback to "#" or any default value

const OrderClick = (orderId) => {
  router.push(`/admin/Orders/processing/Details?orderId=${orderId}`);
};

const refcom = (order.totalAmount * 0.05).toFixed(2); // 5% of totalAmount, rounded to 2 decimal places


const updateUserProfit = async () => {
  try {
    // Step 1: Fetch the existing user data
    const userResponse = await fetch(`https://pouchesworldwide.com/strapi/api/users/${aid}`);
    
    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    
    // Step 2: Calculate the updated value
    const updatedProfit = (userData.profit || 0) + parseFloat(com);  
    const updatedcon = (userData.contingency || 0) - parseFloat(com);  



    // Step 3: Update the appropriate field based on isContingency
    const updateData = isContingency 
      ? { contingency: updatedcon } 
      : { profit: updatedProfit };

    // Step 4: Send update request
    const updateResponse = await fetch(`https://pouchesworldwide.com/strapi/api/users/${aid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (updateResponse.ok) {
      console.log("User data updated successfully!");
      router.push("/admin/Orders"); // Refresh the page after update
    } else {
      console.error("Failed to update user data.");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};







useEffect(() => {
  const fetchUserDocumentId = async () => {
    try {
      // Fetch all users
      const usersResponse = await fetch("https://pouchesworldwide.com/strapi/api/users");
      const users = await usersResponse.json();

      // Find the user whose email matches order.user.referEmail
      const matchedUser = users.find(user => user.email === (order.user?.referEmail || ""));

      // Store documentId if the user is found
      const refferID = matchedUser ? matchedUser.id : null;

      setRefferID(refferID); // Update the state with documentId
    } catch (error) {
      console.error("Error fetching users:", error);
      setRefferID(null); // Set to null if there's an error
    }
  };

  fetchUserDocumentId();
}, [order]);

const timeline = [
  {
    "title": "Transaction ID Received",
    "Reason": "Transaction verified",
    "status": "completed"
  },
  {
    "title": "Payment Successful",
    "Reason": "Payment processed",
    "status": "completed"
  },
  {
    "title": "Order Processor Appointed",
    "Reason": "Assigned to processor",
    "status": "completed"
  },
  {
    "title": "Order Processing",
    "Reason": "Order in progress",
    "status": "completed"
  },
  {
    "title": "Order Shipping Details In Inspection",
    "Reason": "Shipping in inspection",
    "status": "completed"
  },
  {
    "title": "Order Shipped", 
    "Reason": "Order dispatched",
    "status": "completed"
  }
];


  


const handleComplete = async () => {
  if (!order.documentId) {
    alert("Error: Missing documentId for the order.");
    return;
  }

  setIsUpdating(true);

  const payload = {
    data: {
      astatus: "FULL FILLED",
      timeline
    }
  };

  try {
    // Update the order status first
    const response = await fetch(
      `https://pouchesworldwide.com/strapi/api/all-orders/${order.documentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      // After updating the order, also update the assigned user's referral earnings
      await updateReferralEarnings();
      await updateUserProfit();
      alert("Order completed!");
    } else {
      alert("Failed to complete the order.");
    }
  } catch (error) {
    console.error("Error updating order:", error);
    alert("An error occurred while updating the order.");
  } finally {
    setIsUpdating(false);
  }
};

const updateReferralEarnings = async () => {
  try {
    if (!refferID) {
      console.log("No referral ID provided, skipping update.");
      return;
    }
    // Fetch user data using the referral ID
    const userResponse = await fetch(
      `https://pouchesworldwide.com/strapi/api/users/${refferID}`
    );
    const ruserData = await userResponse.json();

    if (!ruserData) {
      throw new Error("User not found.");
    }

    // Calculate updated referral earnings
    const updatedref = (ruserData.referral_earnings || 0) + parseFloat(refcom);

    // Send a PUT request to update the user's referral earnings
    const updatePayload = {
        referral_earnings: updatedref
      
    };

    const updateResponse = await fetch(
      `https://pouchesworldwide.com/strapi/api/users/${refferID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(updatePayload)
      }
    );
 
    if (updateResponse.ok) {
      console.log("Referral earnings updated successfully.");
    } else {
      console.error("Failed to update referral earnings.");
    }
  } catch (error) {
    console.error("Error updating referral earnings:", error);
  }
};


  const handleReject = async () => {
    if (!order.documentId) {
      alert("Error: Missing documentId for the order.");
      return;
    }

    setIsUpdating(true);

    const payload = {
      data: {
        astatus: "canceled"
      }
    };

    try {
      const response = await fetch(
        `https://pouchesworldwide.com/strapi/api/all-orders/${order.documentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        alert("Order cancelled!");
        router.refresh(); // Refresh the page after update
      } else {
        alert("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("An error occurred while updating the order.");
    } finally {
      setIsUpdating(false);
    }
  };

 

  return (
    <>
      <div className="flex flex-col items-center h-[900px] space-y-6">
        <div className="bg-white rounded-lg p-4 w-[1000px] h-[400px] grid grid-cols-4">
          {/* 1st Grid: Product Image */}
          <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
            <img
              src={`${order.cart[0].imageUrl || "/2.png"}`}
              alt={`Product of ${order.productName}`}
              className="w-24 h-24 rounded-lg"
            />
          </div>

          {/* 2nd Grid: Order Details */}
          <div className="col-span-2 flex flex-col text-left w-[233px]">
            {/* Status Badge */}
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="bg-black text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
                {order.type}
              </span>
              <span className="bg-[#e6af2e] text-white text-sm font-semibold font-['Poppins'] rounded-md px-3 py-1 flex items-center justify-center">
                {order.astatus}
              </span>
              {(order.method === "Contingency" || order.method === "Crypto") && (
                <span
                  className={`text-white text-sm font-semibold font-['Poppins'] rounded w-[100px] h-[29px] flex items-center justify-center px-1.5 py-1 ${
                    order.method === "Contingency" ? "bg-[#fa4032]" : "bg-[#32a852]"
                  }`}
                >
                  {order.method}
                </span>
              )}
            </div>

            <div className="mt-2">
              <p className="text-gray-500 text-sm">Customer Name</p>
              <p className="text-lg font-bold">{order.customerName}</p>
            </div>
{/*Testing
            <div className="mt-2">
              <p className="text-gray-500 text-sm">user</p>
               <p className="text-lg font-bold">{order.user.referEmail}</p>
              <p>Document ID: {refferID ? refferID : 'Not found'}</p>
              <p className="text-lg font-bold">{refcom}</p>
            </div>*/}
            

            <div className="mt-4">
              <p className="text-gray-500 text-sm">Item Name</p>
              <p className="text-base">
                {!order.cart || order.cart.length === 0
                  ? order.productName[0]?.Name
                  : order.cart.length > 1
                  ? "Multiple"
                  : order.productName[0]?.Name}
              </p>
            </div>

           

            

            {order.method === "Crypto" && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm">Transaction ID</p>
                <p className="text-base flex items-center justify-between">
                  <span>{order.txid}</span>
                  {fullUrl !== "#" && (
        <Link href={fullUrl} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight />
        </Link>
      )}
                </p>
              </div>
            )}


            <div className="mt-4">
              <p className="text-gray-500 text-sm">No of Cans</p>
              <p className="text-base">
                {!order.cart || order.cart.length === 0
                  ? order.itemTotal
                  : order.cart.length > 1
                  ? "Multiple"
                  : order.itemTotal}
              </p>
            </div>

            <div className="mt-4">
  <p className="text-gray-500 text-sm">Price Per Can</p>
  <p className="text-base">
    {!order.cart || order.cart.length === 0 
      ? `${order.productName[0]?.price} $` 
      : order.cart.length > 1 
        ? "Multiple" 
        : `${order.productName[0]?.price} $`}
  </p>
</div>


            <div className="mt-4">
              <p className="text-gray-500 text-sm">Order Processor</p>
              <p className="text-base">{order.assigned[0].username}</p>
            </div>


            <button
              className="h-[45px] w-[305px] px-4 bg-[#FA4032] mt-4 rounded-[10px] flex justify-center items-center gap-2.5 cursor-pointer"
              onClick={handleReject}
              disabled={isUpdating}
            >
              <span className="text-white text-sm font-semibold capitalize">
                Cancell Order
              </span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 3rd Grid: Date & Total */}
          <div className="col-start-4 flex flex-col justify-between text-right">
            <div className="w-[154px] h-[66px]">
              <p className="text-gray-500 mb-2">{order.date}</p>
              <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
            </div>
            <div className="flex flex-col gap-2 mr-4"></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg w-full max-w-[1000px] flex flex-col items-center mx-auto">
  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    <div className="w-full">
      {/* Customer Name */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Customer’s Name
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Customer’s Name"
        type="text"
        name="customerName"
        value={order.customerName}
        disabled
      />
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
      {/* Tracking No */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
      Tracking Number
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Tracking Number"
        type="text"
        name="trackingnumber"
        value={order.adetailes.trackingNumber}
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
      {/* Commission */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Commission
      </label>
      <input
        className="w-full p-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Commission Amount"
        type="text"
        value={`$${order.commission}`}
        disabled
      />
      {/* Shipping Document */}
      <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">
        Shipping Document
      </label>
      {order.Document?.[0]?.url && (
  <Link
    href={`https://pouchesworldwide.com/strapi${order.Document[0].url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full"
  >
    <span
      className="w-full p-3 border border-gray-300 rounded-lg mb-8 cursor-pointer block"
      title={order.Document?.[0]?.name || "No File"}
    >
      {order.Document?.[0]?.name || "No File"}
    </span>
  </Link>
)}

      
    </div>
    
  </div>
</div>

      <div className="space-y-4">
        {order.cart && order.cart.length > 0 ? (
          order.cart.map((item, index) => (
            <CartItemCard key={index} item={item} />
          ))
        ) : (
          <p className="text-base text-center">No items in cart</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 font-sans">
        {/* Customer Details */}

        <div className="flex items-center justify-between mb-4 mt-12">
          {/* Contingency Checkbox */}
          <div className="flex items-center">
    <input
      type="checkbox"
      id="contingency"
      className="mr-2 w-[20px] h-[20px]"
      checked={isContingency}
      onChange={handleCheckboxChange} // ✅ Handles both check & uncheck
    />
    <label htmlFor="contingency" className="text-sm">
      <span className="text-[#3f6075]/90 font-semibold">
        Add As Contingency Earning
      </span>
      <span className="text-red-500">*</span>
    </label>
  </div>

          {/* Complete Order Button */}
          <div>
            <button
              onClick={handleComplete}
              className="bg-yellow-400 text-black px-6 py-2 rounded-md flex items-center"
              disabled={isUpdating}
            >
              Complete Order{" "}
              <CircleCheck className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessingCard;