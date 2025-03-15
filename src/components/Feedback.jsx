"use client";

import React, { useState, useEffect } from 'react';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-white fill-white'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const FeedbackCard = ({ name, rating, verified, date, feedback, avatar, expanded, onToggle }) => (
  <div className="w-full sm:w-72 mx-auto bg-black shadow-lg p-4 rounded-lg transform transition-all duration-300">
    {/* User Info Section */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img 
          src={avatar || 'https://avatar.iran.liara.run/public/40/40'} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium text-white text-sm sm:text-base">{name}</h3>
        <StarRating rating={rating} />
      </div>
    </div>

    {/* Verified Badge */}
    {verified && (
      <div className="badge badge-white gap-1 text-xs mt-2">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        Verified Purchase
      </div>
    )}

    {/* Feedback Text */}
    <p className={`text-white text-sm mt-2 transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}>
      {feedback}
    </p>

    {/* Footer Section */}
    <div className="flex justify-between items-center mt-2">
      <button 
        className="text-xs text-primary hover:text-primary/80" 
        onClick={onToggle}
        style={{ display: feedback.length > 100 ? 'block' : 'none' }}
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
  </div>
);

const InfiniteScroll = ({ children }) => (
  <div className="relative overflow-hidden py-4 w-full">
    {/* Side gradients for larger screens */}
    <div className="absolute left-0 top-0 hidden sm:block w-1/4 h-full bg-gradient-to-r from-black/90 via-transparent to-transparent z-10 shadow-lg" />
    <div className="absolute right-0 top-0 hidden sm:block w-1/4 h-full bg-gradient-to-l from-black/90 via-transparent to-transparent z-10" />

    {/* Mobile: Manual horizontal scroll */}
    <div className="sm:hidden flex gap-4 overflow-x-auto px-4">
      {children}
    </div>

    {/* Larger screens: Infinite scroll */}
    <div className="hidden sm:flex overflow-hidden">
      <div className="flex gap-4 w-full sm:w-auto sm:flex-nowrap px-4 animate-scroll">{children}</div>
      <div className="flex gap-4 w-full sm:w-auto sm:flex-nowrap px-4 animate-scroll">{children}</div>
    </div>
  </div>
);

const Feedback = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [avatars, setAvatars] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchAvatars = async () => {
    const avatarRequests = [];
    for (let i = 0; i < 4; i++) {
      avatarRequests.push(
        fetch('https://picsum.photos/seed/' + i + '/200/200')
          .then((res) => res.url)
          .catch((error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error("Error fetching avatar:", error);
            }
            return 'https://via.placeholder.com/150';
          })
      );
    }
    const avatarUrls = await Promise.all(avatarRequests);
    setAvatars(avatarUrls);
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("https://pouchesworldwide.com/strapi/api/reviews");
      const data = await response.json();
      
      if (data && data.data) {
        const formattedFeedbacks = data.data.map(item => ({
          name: item.name,
          rating: item.rating,
          verified: item.verified,
          date: item.createdAt.split("T")[0],
          feedback: item.feedback,
        }));
        setFeedbacks(formattedFeedbacks);
      } else {
        console.error("Unexpected API response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAvatars();
        await fetchFeedbacks();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 max-w-md mx-auto bg-black transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <h2 className="text-lg sm:text-2xl font-bold text-center text-white">Read What Everyone's Saying!</h2>
      </div>

      <InfiniteScroll>
        {feedbacks.map((feedback, index) => (
          <div key={index} className="w-full sm:w-72 mx-auto">
            <FeedbackCard
              {...feedback}
              avatar={avatars[index]}
              expanded={expandedCards[index]}
              onToggle={() => toggleCard(index)}
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Feedback;
