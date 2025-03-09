"use client";
import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { useTab } from "./TabContext";
import { ArrowRight, Upload } from 'lucide-react';
import CartItemCard from "@/components/CartItemCard";

const SaveOrder = ({ orderId }) => {
  const [productImage, setProductImage] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); 


  const [formData, setFormData] = useState({
    trackingNumber: '',
    uploadedFile: null, // Add this to store the uploaded file ID or URL
  });
  const [fileName, setFileName] = useState(null); // State to store the file name
  

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      setFileName(file.name); // Store the file name

      const formData = new FormData();
      formData.append("files", file);

      try {
        const response = await fetch("https://pouchesworldwide.com/strapi/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("File uploaded successfully:", data);
          setFormData(prevData => ({
            ...prevData,
            uploadedFile: data[0].id, // Assuming Strapi returns an array of uploaded files
          }));
        } else {
          console.error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const { setActiveTab } = useTab();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // Default status 
  const [notification, setNotification] = useState(""); // State for notification message

  // Function to fetch orders from the API
  const fetchOrders = async () => {
    try {
      const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders");
      const data = await response.json();
      const order = data.data.find(order => order.id === orderId); // Ensure the IDs match as strings
      setOrderDetails(order);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch product image based on first cart item ID
  const fetchProductImage = async (productId) => {
    try {
      const response = await fetch("https://pouchesworldwide.com/strapi/api/products?populate=*");
      const data = await response.json();
      const product = data.data.find(product => product.id === productId);
      if (product && product.image && product.image.url) {
        setProductImage(product.image.url);
      }
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: value };
      checkFormCompletion(updatedData);
      return updatedData;
    });
  };

  const checkFormCompletion = (data) => {
    const { trackingNumber } = data;
    setIsFormComplete(
      trackingNumber
    );
  };


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
      "status": "inProgress"
    },
    {
      "title": "Order Shipped", 
      "Reason": "Order dispatched",
      "status": "upcoming"
    }
  ];


  useEffect(() => {
    if (orderDetails && orderDetails.astatus === "PROCESSING") {
      setOrderStatus("PROCESSING");
      setNotification("We Have Notified: Order Processing Has Started");

    }
  }, [orderDetails]); // Run the effect when orderDetails changes

  const handleProcessingClick = async () => {
    setOrderStatus("PROCESSING");
    setNotification("We Have Notified: Order Processing Has Started"); // Set notification when clicked

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${orderDetails.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            timeline, 
            astatus: "PROCESSING" 
          },
        }),
      });

      if (response.ok) {
        console.log("Order status updated successfully");
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error during PUT request:", error);
    }
  };

  const handleComplete = async () => {
    if (!isFormComplete || orderStatus !== "PROCESSING") {
      return; // Prevent submission if form is incomplete or order status is not PROCESSING
    }

    if (!orderDetails || !orderDetails.documentId) {
      alert("Error: Missing documentId for the order.");
      return;
    }

    const timelines = [
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
        "status": "inProgress"
      }
    ];


    const payload = {
      data: {
        adetailes: {
          ...formData,
          uploadedFile: formData.uploadedFile, // Include the uploaded file ID or URL
        },
        Document: formData.uploadedFile, 
        astatus: "Pending Approval",
        timeline: timelines
      },
    };

    try {
      const response = await fetch(`https://pouchesworldwide.com/strapi/api/all-orders/${orderDetails.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Order updated successfully!');
        setActiveTab("tab4"); // Navigate to the next tab
      } else {
        alert('Failed to update the order.');
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert('An error occurred while updating the order.');
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on mount
  }, [orderId]);

  if (!orderDetails) {
    return <div>Order details not found. Received Order ID: {orderId}</div>;
  }

  const cart = orderDetails.cart || [];
  const productName = cart.length > 1 ? "Multiple" : cart.length === 1 ? cart[0].Name : "Unknown";

  return (
    <>
      <div className="w-[540px] text-black text-[32px] font-semibold font-['Poppins'] ml-8 text-left">Add Shipping Details</div>
      <div className="mx-auto bg-white p-8 rounded-lg">
        {/* Product info */}
        <div className="flex items-center mb-8 border p-2 rounded-lg w-[226px] h-[74px]">
          <div className='bg-[#ececec] w-12 h-12 mr-2'>
     
              <Image src={`${cart[0].imageUrl ||  '/2.png'}`} alt="Product Image" width={64} height={64} />   
    
          </div>
          <h1 className="text-[#3f6075] text-lg font-medium font-['Poppins'] capitalize">{productName}</h1>
        </div>

        {notification && <div className="text-green-500 font-semibold">{notification}</div>}

        <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-black font-semibold transition-all duration-300 ${
            orderStatus === "PROCESSING" ? "bg-red-500" : "bg-gray-400"
          }`}
          style={
            orderStatus === "PROCESSING"
              ? { background: "radial-gradient(circle, #fae255 0%, #a06a0f 100%)" }
              : {}
          }
          onClick={handleProcessingClick}
          disabled={orderStatus === "Cancelled"} // Disable if status is Cancelled
        >
          Processing
        </button>

        <button
          className={`px-4 py-2 rounded-lg text-black font-semibold transition-all duration-300 ${
            orderStatus === "Cancelled" ? "bg-red-500" : "bg-gray-400"
          }`}
          onClick={() => setOrderStatus("Cancelled")}
        >
          Cancelled
        </button>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            {/* Customer Name */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Customer’s Name {productImage}</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Customer’s Name"
              type="text"
              name="customerName"
              value={orderDetails.customerName}
              onChange={handleInputChange}
              disabled
            />
            {/* Customer Email */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Customer’s Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Customer’s Email"
              type="email"
              name="customerEmail"
              value={orderDetails.email} 
              onChange={handleInputChange}
              disabled
            />
            {/* Customer Mobile */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Customer’s Mobile Number</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Customer’s Email"
              type="text"
              name="mobile"
              value={orderDetails.mobile} 
              onChange={handleInputChange}
              disabled
            />
            {/* Shipping Address */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Shipping Address</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Shipping Address"
              type="text"
              name="shippingAddress"
              value={orderDetails.address.street}
              onChange={handleInputChange}
              disabled
            />
            {/* City/Town */}
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="City/Town"
              type="text"
              name="city"
              value={orderDetails.address.city}
              onChange={handleInputChange}
              disabled
            />
            {/* State/Province */}
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="State/Province/Region"
              type="text"
              name="state"
              value={orderDetails.address.state} 
              onChange={handleInputChange} 
              disabled
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="State/Province/Region"
              type="text"
              name="state"
              value={orderDetails.address.country} 
              onChange={handleInputChange} 
              disabled
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="State/Province/Region"
              type="text"
              name="state"
              value={orderDetails.address.zip} 
              onChange={handleInputChange} 
              disabled
            /> 
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Note</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="State/Province/Region"
              type="text"
              name="state"
              value={orderDetails.note ?? ""} 
              onChange={handleInputChange} 
              disabled
            />
            {/* Tracking Number */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2 mt-8">Tracking Number</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Tracking Number"
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
            />
          </div>

          <div>
            {/* Number Of Items */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Number Of Cans</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg mb-8"
              placeholder="Number of Items ordered"
              type="text"
              value={orderDetails.itemTotal} // Set the value to the product's quantity
              disabled
            />
            {/* Price Of The Item */}
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mb-2">Total Price</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Price of the product"
              type="text"
              value={`$${String(orderDetails.totalAmount).replace("$", "")}`} // Convert to string first
              disabled
            />
            <label className="block text-zinc-500 text-[15px] font-semibold font-['Poppins'] capitalize mt-8 mb-2">Commission</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Price of the product"
              type="text"
              value={`$${String(orderDetails.commission).replace("$", "")}`} // Convert to string first
              disabled
            />

            

            <p className="text-zinc-500 text-[15px] font-semibold font-['Inter'] capitalize mt-6 mb-4">Upload order’s Document</p>
            <div>
            {fileName && (
        <div className="mb-2 text-sm text-gray-600">
          Selected file: <span className="font-semibold">{fileName}</span>
        </div>
      )}
      <button
        onClick={handleButtonClick}
        className="btn mb-4 bg-gradient-to-r from-[#3f6075] to-[#3e5f75] text-white text-lg font-semibold font-['Poppins'] capitalize rounded px-5 py-2.5 inline-flex gap-3.5"
      >
        <span className="leading-[25.20px]">Upload</span>
        <Upload className="w-5 h-5 text-white" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, application/pdf"
        className="hidden"
      />
    </div>

            <p className="text-black text-[15px] font-normal font-['Inter'] text-justify">
              After payment, please upload a verification document proving your payment. Ensure the payment ID and your name are visible. Accepted formats: JPG, PNG, PDF.
            </p>

            <div className="flex justify-end mt-[125px]">
            <button
  onClick={handleComplete}
  className={`btn w-70 h-[54px] p-2.5 bg-gradient-to-br from-[#ffe047] to-[#ffb200] rounded-[10px] justify-center items-center text-black text-lg font-semibold font-['Poppins'] capitalize leading-[25.20px] flex items-center 
    ${!isFormComplete || orderStatus === "Cancelled" || orderStatus === "null" ? "cursor-not-allowed opacity-50" : ""}`}
  disabled={!isFormComplete || orderStatus === "Cancelled" || orderStatus === "null"} // Disable if form is incomplete, orderStatus is Cancelled or null
>
  Completed
  <ArrowRight className="ml-2" size={20} />
</button>


            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-4 text-left">
        {orderDetails.cart && orderDetails.cart.length > 0 ? (
          orderDetails.cart.map((item, index) => <CartItemCard key={index} item={item} />)
        ) : (
          <p className="text-base text-center">No items in cart</p>
        )}
      </div>
    </>
  );
};

export default SaveOrder;