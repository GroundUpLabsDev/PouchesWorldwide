import React from 'react';
const Banner = () => {
  return (
    <div className="w-full overflow-hidden bg-black h-20 flex items-center pt-4 pb-12">
      <div className="flex aanimate-scroll">
        {/* First Row of Brands */}
        <div className="text-white font-poppins font-bold text-[33px] mr-12">BLUEGIANT</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">PUXX</div>

        {/* Duplicated Row for Seamless Loop */}
        <div className="text-white font-poppins font-bold text-[33px] mr-12">BLUEGIANT</div>
        <div className="text-white font-poppins font-bold text-[33px] mr-12">PUXX</div>

        {/* More Duplicates for Smooth Scroll */}
        {Array(1000).fill().map((_, i) => (
          <div key={i} className="text-white font-poppins font-bold text-[33px] mr-12">
            {['BLUEGIANT', 'PUXX'][i % 3]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
