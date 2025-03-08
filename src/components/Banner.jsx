import React from 'react';
const Banner = () => {
  return (
    <div className="w-full overflow-hidden bg-black h-20 flex items-center pt-4">
      <div className="flex aanimate-scroll">
        {/* First Row of Brands */}
        <div className="text-white font-poppins font-bold text-[33px] mr-12">ANGLE</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">VELO</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">ZYN</div>

        {/* Duplicated Row for Seamless Loop */}
        <div className="text-white font-poppins font-bold text-[33px] mr-12">ANGLE</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">VELO</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">ZYN</div>

        {/* More Duplicates for Smooth Scroll */}
        {Array(1000).fill().map((_, i) => (
          <div key={i} className="text-white font-poppins font-bold text-[33px] mr-12">
            {['ANGLE', 'VELO', 'ZYN'][i % 3]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
