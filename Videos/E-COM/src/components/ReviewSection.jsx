"use client";

import { useState } from "react";

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
  
    const reviewData = {
      data: {
        name,
        feedback,
        rating, // Include the rating number
      },
    };
  
    try {
      const response = await fetch("https://pouchesworldwide.com/strapi/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        setSuccess(true);
        setName("");
        setFeedback("");
        setRating(0);
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="w-full bg-black flex items-center justify-center p-4 font-[Poppins]">
      <div className="bg-black text-white p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-center">Add A Review</h2>

        {/* Star Rating at the Top */}
        <div className="flex justify-center mt-3">
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating"
                className="mask mask-star-2 bg-orange-400"
                checked={rating === star}
                onChange={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[52px] mt-1 p-2 bg-white text-black border border-gray-600 rounded-md focus:ring focus:ring-white outline-none text-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Feedback Textarea */}
          <div className="mt-3">
            <label className="block text-sm font-medium">Tell us what you like or dislike</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full mt-1 p-4 bg-white text-black border border-gray-600 rounded-md focus:ring focus:ring-white outline-none resize-none text-sm"
              placeholder="Tell Us What You Like Or Dislike .."
              rows="3"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`h-[60px] mt-4 bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] text-black p-4 rounded-md font-semibold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT REVIEW"}
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-center mt-3">✅ Review submitted successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}
