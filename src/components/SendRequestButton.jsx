import React from 'react';

const SendRequestButton = ({ calculateTotalPrice, handleRequestSubmit }) => {
  return (
    <div className="flex items-center p-6">
      <div className="flex items-center space-x-[102px]">
        <div className="flex items-center space-x-4">
          <span className="text-primary font-semibold text-[28px]">Send Request For</span>
          <span className="text-primary font-semibold text-[28px]">${calculateTotalPrice()}</span>
        </div>
        <button 
          onClick={handleRequestSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded flex items-center space-x-2"
        >
          <span className="text-[28px]">Request</span>
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
            >
              <g clipPath="url(#clip0_175_2785)">
                <path
                  d="M7.85275 11.8088L22.5598 18.1146L7.83317 16.1562L7.85275 11.8088ZM22.5403 28.8854L7.83317 35.1912V30.8438L22.5403 28.8854ZM3.93609 5.875L3.9165 19.5833L33.2915 23.5L3.9165 27.4167L3.93609 41.125L45.0415 23.5L3.93609 5.875Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_175_2785">
                  <rect width="47" height="47" fill="black" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SendRequestButton;
