"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

// Load your stripe publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = () => {
  const searchParams = useSearchParams();
  const totalPrice = searchParams.get('totalPrice') || '0.00';
  const uEmail = searchParams.get('email');
  const tax = 0.0;
  const deliveryFee = 0.0;
  const grandTotal = parseFloat(totalPrice) + tax + deliveryFee;
  
  const [cardHolder, setCardHolder] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }
    
    if (!cardHolder.trim()) {
      alert("Please enter card holder name.");
      return;
    }
    
    setProcessing(true);
    setError(null);
    
    // Step 1: Create a PaymentIntent on your server
    let paymentIntent;
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Amount in cents
          amount: Math.round(grandTotal * 100), 
          receipt_email: uEmail 
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create Payment Intent.");
      }
      paymentIntent = await res.json();
    } catch (err) {
      setError(err.message);
      setProcessing(false);
      return;
    }
    
    // Step 2: Confirm the payment on the client using Stripe.js
    const cardElement = elements.getElement(CardElement);
    const { error: paymentError, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
      paymentIntent.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolder,
          },
        },
      }
    );
    
    if (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
    } else if (confirmedPaymentIntent && confirmedPaymentIntent.status === 'succeeded') {
      alert("Payment successful!");
      // Optionally, trigger an email notification or further processing here
      setProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <Banner />
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-4">
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-8">Payment Details</h2>
              <form onSubmit={handlePayment}>
                <div className="mb-8">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="card-holder-name">
                    Card Holder Name <span className="text-yellow-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="text"
                    id="card-holder-name"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Your Card's Holder Name"
                    required
                  />
                </div>
                <div className="mb-8">
  <label className="block text-gray-700 font-semibold mb-2">
    Card Details <span className="text-yellow-500">*</span>
  </label>
  <div className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
    <CardNumberElement 
      options={{
        showIcon: true,
        style: {
          base: { fontSize: '16px', color: "#424770", '::placeholder': { color: '#aab7c4' } },
          invalid: { color: "#9e2146" },
        },
      }}
      className="w-full py-2"
    />
  </div>
</div>

<div className="mb-8 flex gap-4">
  <div className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
    <CardExpiryElement 
      options={{
        style: {
          base: { fontSize: '16px', color: "#424770", '::placeholder': { color: '#aab7c4' } },
          invalid: { color: "#9e2146" },
        },
      }}
    />
  </div>
  <div className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
    <CardCvcElement 
      options={{
        style: {
          base: { fontSize: '16px', color: "#424770", '::placeholder': { color: '#aab7c4' } },
          invalid: { color: "#9e2146" },
        },
      }}
    />
  </div>
  
</div><div className="mb-8">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-yellow-500" required />
                    <span className="ml-2 text-gray-700 text-lg">Agree To Terms & Conditions</span>
                  </label>
                </div>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <button
                  type="submit"
                  disabled={!stripe || processing}
                  className="bg-gradient-to-br from-[#ffe047] to-[#ffb200] w-[363px] h-[65px] text-black py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 flex justify-center items-center"
                >
                  {processing ? "Processing..." : <>Process Payment <ArrowRight className="ml-2" /></>}
                </button>
              </form>
            </div>
            {/*
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <div className="text-gray-700 mb-8">
                  <div className="flex justify-between mt-8">
                    <span className="font-medium text-primary">Total Cans:</span>
                    <span className="text-[#282F44] font-medium">1,245</span>
                  </div>
                  <div className="mb-8 mt-4">
                    <span className="font-medium text-primary">Address:</span>
                    <p className="text-right text-[#282F44] font-medium">
                      No 23, Kegalle Road, <br />Kandy City, Sri Lanka
                    </p>
                  </div>
                </div>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <h3 className="text-lg font-semibold mb-8">Price Details</h3>
                <div className="text-gray-700">
                  <div className="flex justify-between text-primary mb-4">
                    <span>Total</span>
                    <span className="text-[#282F44] font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-primary mb-4">
                    <span>Tax</span>
                    <span className="text-[#282F44] font-medium">${tax}</span>
                  </div>
                  <div className="flex justify-between text-primary mb-8">
                    <span>Delivery Fee</span>
                    <span className="text-[#282F44] font-medium">${deliveryFee}</span>
                  </div>
                </div>
                <hr className="my-4 border-t-2 border-[#f5d061]" />
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-semibold">Total</span>
                  <div className="p-[10px] rounded-lg" style={{ backgroundColor: '#F5D061' }}>
                    <span className="text-lg font-bold" style={{ color: 'black' }}>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const PaymentDetails = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentDetails;