"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Tag, CheckCircle, Circle } from "lucide-react";
import { getUserRole } from "@/app/utils/getUserRole";

const CuCheckoutForm = () => {
    // Renamed paymentMethod to method
    const [method, setMethod] = useState('');
    const searchParams = useSearchParams();
    const totalPrice = searchParams.get('totalPrice') || '0.00';

    const [agreeTerms, setAgreeTerms] = useState(false);
    const tax = 0.0;
    const deliveryFee = 0.0;

    const totalAmount = parseFloat(totalPrice) + tax + deliveryFee;
    
    const [userRole, setUserRole] = useState(null);
    const [itemTotal, setItemTotal] = useState(0); 
    const [itemId, setItemId] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [selectedCans, setSelectedCans] = useState([]);
    // New state to store the entire parsed cart data
    const [cart, setCart] = useState([]);

    const router = useRouter();
     useEffect(() => {
        setUserRole(getUserRole());
      }, []);

      

    useEffect(() => {
        const cartData = searchParams.get('cartData');
        if (cartData) {
            try {
                // Decode and parse the cartData from the URL
                const parsedCartData = JSON.parse(decodeURIComponent(cartData));
                // Save entire cart data to state for later submission
                setCart(parsedCartData);

                setSelectedCans(parsedCartData.map(item => item.selectedCans));

                // Get the quantity of the first item
                if (parsedCartData.length > 0) {
                    const firstItemQuantity = parsedCartData[0].quantity;
                    setQuantity(firstItemQuantity); // Assuming you have a state for quantity
                }

                // Calculate the total of the 'can' values
                const total = parsedCartData.reduce((acc, item) => acc + (item.selectedCans || 0), 0);
                // Set the itemTotal state
                setItemTotal(total);

                // Extract the id of the first item in cartData
                if (parsedCartData.length > 0) {
                    setItemId(parsedCartData[0].id); // Assuming you need the first item's ID
                }
            } catch (error) {
                console.error('Error parsing cart data:', error);
            }
        }
    }, [searchParams]);
    

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        mobile: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        note: ""
    });

    // A state to hold cart items; here we start with an empty array, but in a real-world scenario it may be updated from the cart context.
    const [cartItems, setCartItems] = useState([]);

    const isFormComplete =
        formData.customerName.trim() &&
        formData.email.trim() &&
        formData.mobile.trim() &&
        formData.street.trim() &&
        formData.city.trim() &&
        formData.state.trim() &&
        agreeTerms;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProceed = async () => {
        if (!isFormComplete) {
            alert("Please fill in all required fields before proceeding.");
            return;
        }
    
        if (!agreeTerms) {
            alert("Please agree to the terms and conditions.");
            return;
        }
    
        // Prepare order data including the cart data from the URL
        const orderData = {
            data: {
                customerName: formData.customerName,
                email: formData.email,
                mobile: formData.mobile,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    zip: formData.zip,
                },
                note: formData.note,
                totalAmount,
                method: method,
                productName: itemId,
                quantity: quantity,
                itemTotal: selectedCans,
                cart: cart, // Including entire cart data as JSON
                type: "Retailer",
                ...(method === "Stripe" && {
                    timeline: [
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
                }),
            },
        };
    
        try {
            // Send data to Strapi API
            const response = await fetch("https://pouchesworldwide.com/strapi/api/all-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to submit order");
            }
    
            const data = await response.json();
            const orderId = data.data.id;
            console.log("Order submitted successfully:", orderId);
    
            // Redirect to payment based on method
            let url = "/";
            if (method === "Stripe") {
                url = `/payment/stripe/?totalPrice=${totalPrice}&email=${formData.email}&id=${orderId}`;
            } else if (method === "Crypto") {
                url = `/payment/crypto/?totalPrice=${totalPrice}&email=${formData.email}&id=${orderId}`;
            } else if (method === "Cod") {
                url = `/payment/cod/?totalPrice=${totalPrice}&email=${formData.email}&id=${orderId}`;
            } else if (method === "Bank") {
                url = `/payment/bank/?totalPrice=${totalPrice}&email=${formData.email}&id=${orderId}`;
            }
    
            router.push(url);
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("Failed to submit order. Please try again.");
        }
    };

    // Build a dynamic shipping address string for the summary; variable renamed from shippingAddress to address.
    const address = (
        formData.street ||
        formData.city ||
        formData.state ||
        formData.country ||
        formData.zip
    ) ? (
        <>
            {formData.street && <span>{formData.street},<br /></span>}
            {(formData.city || formData.state) && (
                <span>
                    {formData.city}{formData.city && formData.state ? ", " : ""}
                    {formData.state}<br />
                </span>
            )}
            {(formData.country || formData.zip) && (
                <span>
                    {formData.country}{formData.country && formData.zip ? " - " : ""}
                    {formData.zip}
                </span>
            )}
        </>
    ) : (
        <>
            No Address Provided
        </>
    );

    return (
        <div className="bg-gray-100 p-6 flex justify-center">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-5xl">
                {/* Left Section */}
                <div className="bg-white rounded-lg shadow-md p-6 w-full lg:w-[585px] h-[fit-content]">
                    <h2 className="text-2xl font-bold mb-4">
                        Checkout Your Order
                    </h2>
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label className="inline-flex items-center gap-1 font-medium text-zinc-400">
                                Customer Name <span className="text-yellow-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="inline-flex items-center gap-1 font-medium text-zinc-400">
                                Email <span className="text-yellow-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="inline-flex items-center gap-1 font-medium text-zinc-400">
                                Mobile Number <span className="text-yellow-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Your Mobile Number"
                                className="input input-bordered w-full mb-6"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-zinc-400">Shipping Address</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Street Address"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City/Town"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State/Province/Region"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className="input input-bordered w-full mb-2"
                            />
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                placeholder="Zip Code"
                                className="input input-bordered w-full mb-6"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-zinc-400">Note</label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Leave Message For Us ..."
                                className="textarea textarea-bordered w-full h-[132px]"
                            ></textarea>
                        </div>
                    </form>
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-[437px] flex flex-col gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-medium mb-4">Summary</h2>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <div className="text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-primary">Total Cans:</span>
                                <span className="text-[#282F44] font-medium">{itemTotal}</span>
                            </div>
                            <div>
                                <span className="font-medium text-primary">Address:</span>
                                <p className="text-right text-[#282F44] font-medium">
                                    {address}
                                </p>
                            </div>
                        </div>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <h3 className="text-lg font-medium mb-4">Price Details</h3>
                        <div className="text-gray-700 space-y-2">
                            <div className="flex justify-between text-primary">
                                <span>Total Price</span>
                                <span className="text-[#282F44] font-medium">${totalPrice}</span>
                            </div>
                            <div className="flex justify-between text-primary">
                                <span>Tax</span>
                                <span className="text-[#282F44] font-medium">${tax}</span>
                            </div>
                            <div className="flex justify-between text-primary">
                                <span>Delivery Fee</span>
                                <span className="text-[#282F44] font-medium">${deliveryFee}</span>
                            </div>
                        </div>
                        <hr className="my-4 border-t-2 border-[#f5d061]" />
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total</span>
                            <div className="p-[10px] rounded-lg" style={{ backgroundColor: '#F5D061' }}>
                                <Tag className="inline-block mr-2" style={{ color: 'black', transform: 'rotate(90deg)' }} />
                                <span className="text-lg font-medium" style={{ color: 'black' }}>
                                    ${totalAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold text-primary mb-4">Payment Options</h2>
                        <div className="space-y-4">
                            {/* Stripe Option */}
                            <div
                                className={`flex items-center p-4 border rounded-lg ${
                                    method === 'Stripe' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
                                } cursor-pointer`}
                                onClick={() => setMethod('Stripe')}
                            >
                                <div className="w-[80px] h-[53.65px] mr-4 bg-[#6772e6] rounded-lg flex items-center justify-center text-white font-bold">
                                    STRIPE
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-gray-800 font-semibold">Stripe</h3>
                                    <p className="text-gray-600 text-sm">Stripe Payment</p>
                                </div>
                                {method === 'Stripe' ? ( 
                                    <CheckCircle className="text-yellow-500 text-2xl" />
                                ) : (
                                    <Circle className="text-gray-400 text-2xl" />
                                )}
                            </div>

                            {/* Crypto Option */}
                            <div
                                className={`flex items-center p-4 border rounded-lg ${
                                    method === 'Crypto' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
                                } cursor-pointer`}
                                onClick={() => setMethod('Crypto')}
                            >
                                <div className="w-[80px] h-[53.65px] mr-4 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="24"
                                        viewBox="0 0 25 24"
                                        fill="none"
                                    >
                                        <g clipPath="url(#clip0_378_13032)">
                                            <path
                                                d="M17.56 11.57C18.15 10.88 18.5 9.98 18.5 9C18.5 7.14 17.23 5.57 15.5 5.13V3H13.5V5H11.5V3H9.5V5H6.5V7H8.5V17H6.5V19H9.5V21H11.5V19H13.5V21H15.5V19C17.71 19 19.5 17.21 19.5 15C19.5 13.55 18.72 12.27 17.56 11.57ZM10.5 7H14.5C15.6 7 16.5 7.9 16.5 9C16.5 10.1 15.6 11 14.5 11H10.5V7ZM15.5 17H10.5V13H15.5C16.6 13 17.5 13.9 17.5 15C17.5 16.1 16.6 17 15.5 17Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_378_13032">
                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-gray-800 font-semibold">Crypto</h3>
                                    <p className="text-gray-600 text-sm">With Any Coin</p>
                                </div>
                                {method === 'Crypto' ? (
                                    <CheckCircle className="text-yellow-500 text-2xl" />
                                ) : (
                                    <Circle className="text-gray-400 text-2xl" />
                                )}
                            </div>

                            {/* Bank Payment Option 
                            <div
                                className={`flex items-center p-4 border rounded-lg ${
                                    method === 'Bank' ? 'bg-yellow-100 border-yellow-300' : 'bg-white'
                                } cursor-pointer`}
                                onClick={() => setMethod('Bank')}
                            >
                                <div className="w-[80px] h-[53.65px] mr-4 bg-gradient-to-r from-[#3f6075] to-[#3e5f75] rounded-lg flex items-center justify-center text-white font-bold">
                                    Bank
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-gray-800 font-semibold">Bank Portal</h3>
                                    <p className="text-gray-600 text-[10px]">connect with your bank account</p>
                                </div>
                                {method === 'Bank' ? (
                                    <CheckCircle className="text-yellow-500 text-2xl" />
                                ) : (
                                    <Circle className="text-gray-400 text-2xl" />
                                )}
                            </div>*/}
                        </div>

                        <div className="flex items-center gap-2 mb-4 mt-8">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                                className="checkbox"
                            />
                            <Link href={"/"}>
                                <label className="font-medium">Agree to Terms & Conditions</label>
                            </Link>
                        </div>

                        <button
                            onClick={handleProceed}
                            className={`btn bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] w-full font-bold ${
                                !isFormComplete || !agreeTerms ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={!isFormComplete || !agreeTerms}
                        >
                            To Payment Process
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CuCheckoutForm;