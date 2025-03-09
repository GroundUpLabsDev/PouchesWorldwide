

"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

const ReviewPage = () => {
  const { id } = useParams(); // Get review ID from URL
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    // Simulating fetching review details
    const mockData = [
      { id: "1", name: "John Doe", email: "user1@example.com", date: "2025-02-10", review: 4, content: "Great experience!" },
      { id: "2", name: "Alice Smith", email: "user2@example.com", date: "2025-02-12", review: 5, content: "Excellent service!" },
      { id: "3", name: "Michael Lee", email: "user3@example.com", date: "2025-02-15", review: 3, content: "Good but can be improved." },
      { id: "4", name: "Emily Brown", email: "user4@example.com", date: "2025-02-18", review: 2, content: "Not satisfied." },
      { id: "5", name: "David Wilson", email: "user5@example.com", date: "2025-02-20", review: 5, content: "Perfect!" },
    ];

    const review = mockData.find((item) => item.id === id);
    setReviewData(review);
  }, [id]);

  if (!reviewData) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <>
      <Header />
    {/* <Banner />*/}
      <div className="mx-auto max-w-6xl p-4">
        <h2 className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-left capitalize mb-4">
          Review <span className="text-black">Information</span>
        </h2>

        
 
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
          <h1 className="text-2xl font-bold text-left mb-4">Review Details</h1>
          <div className="h-[30px] px-2.5 py-[3px] bg-black flex items-center gap-2.5 mb-2 w-[125px]">
        <div className="text-white text-base font-normal font-['Poppins'] capitalize">
        wholesaler
        </div>
      </div>

          {/* Email Input */}
          <label className="block text-lg font-medium text-left">Email:</label>
          <input
            type="text"
            value={reviewData.email}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 mb-3"
          />

<div className="rating mb-3">
  {[...Array(5)].map((_, index) => (
    <input
      key={index}
      type="radio"
      name="rating"
      className="mask mask-star-2 bg-orange-400"
      checked={index + 1 === reviewData.review}
      readOnly
    />
  ))}
</div>

          {/* Name Input */}
          <label className="block text-lg font-medium text-left">Name:</label>
          <input
            type="text"
            value={reviewData.name}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 mb-3"
          />

          
          {/* Content Textarea */}
          <label className="block text-lg font-medium text-left">Content:</label>
          <textarea
            value={reviewData.content}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 mb-3 h-24"
          />

          {/* Publish Review Button */}
          <button className="w-33 p-4 h-12 py-2 bg-[#fab12f] text-white font-semibold rounded-md hover:bg-yellow-500 transition-all">
            Publish Review
          </button>
        </div>
      </div>
      <Footer />
    </>
  ); 
};

export default ReviewPage;
