"use client";

import { useState, useEffect } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading time
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFD700]"></div>
  </div>
  
  );
};

export default Preloader;
