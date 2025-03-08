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

const ReviewCard = ({ name, rating, verified, date, review, avatar, expanded, onToggle }) => (
  <div className="w-72 mx-auto bg-black shadow-lg p-4 rounded-lg transform transition-all duration-300">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img src={avatar || 'https://avatar.iran.liara.run/public/40/40'} alt={name} />
      </div>
      <div>
        <h3 className="font-medium text-white text-sm sm:text-base">{name}</h3>
        <StarRating rating={rating} />
      </div>
    </div>
    {verified && (
      <div className="badge badge-white gap-1 text-xs mt-2">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Verified Purchase
      </div>
    )}
    <p className={`text-white text-sm mt-2 transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}>
      {review}
    </p>
    <div className="flex justify-between items-center mt-2">
      <button className="text-xs text-primary hover:text-primary/80" onClick={onToggle}>
        {expanded ? 'Show less' : 'Show more'}
      </button>
      <span className="text-xs text-gray-400">{date}</span>
    </div>
  </div>
);

const InfiniteScroll = ({ children }) => (
  <div className="relative overflow-hidden py-4 w-full">
    
    <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black/90 via-transparent to-transparent z-10 shadow-lg" />
    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/90 via-transparent to-transparent z-10" />
    <div className="flex animate-scroll">
      {/* Left Gradient */}
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 shadow-lg" />
      {/* Right Gradient */}
      <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-black via-transparent to-transparent z-10" />
      {/* Scrollable Items */}
      <div className="flex gap-4 min-w-full sm:w-auto sm:flex-wrap">{children}</div>
      <div className="flex gap-4 min-w-full sm:w-auto sm:flex-wrap">{children}</div>
    </div>
  </div>
);

const Feedback = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [avatars, setAvatars] = useState([]);

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatarRequests = [];
      for (let i = 0; i < 4; i++) {
        avatarRequests.push(
          fetch('https://randomuser.me/api/')
            .then((res) => res.json())
            .then((data) => data.results[0].picture.large)
        );
      }
      const avatarUrls = await Promise.all(avatarRequests);
      setAvatars(avatarUrls);
    };

    fetchAvatars();
  }, []);

  const reviews = [
    {
      name: 'Samantha Payne',
      rating: 4.5,
      verified: true,
      date: '23 Nov 2021',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis...',
    },
    {
      name: 'Hena Lana',
      rating: 4.5,
      verified: true,
      date: '23 Nov 2021',
      review: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt...',
    },
    {
      name: 'Ararshi Nidha',
      rating: 4.5,
      verified: true,
      date: '23 Nov 2021',
      review: 'Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Curabitur tempus urna...',
    },
    {
      name: 'Radnom',
      rating: 4.5,
      verified: true,
      date: '23 Nov 2021',
      review: 'I love this website! The user interface is incredibly intuitive and the features are exactly what I needed...',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 max-w-md mx-auto bg-black transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <h2 className="text-lg sm:text-2xl font-bold text-center text-white">Read What Everyone's Saying!</h2>
      </div>

      <InfiniteScroll>
        {reviews.map((review, index) => (
          <div key={index} className="w-full sm:w-72 mx-auto">
            <ReviewCard
              {...review}
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
