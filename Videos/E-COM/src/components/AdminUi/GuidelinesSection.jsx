'use client';

import { useState } from 'react';
import { Trash, Plus } from 'lucide-react'; 

const MAX_GUIDELINES = 5;

export default function GuidelinesSection() {
  const [guidelines, setGuidelines] = useState([
    "Do not use Zyn if you are under 21 years old, pregnant, nursing, or have health conditions affected by nicotine use",
    "Place the pouch between your gum and lip and let it rest.",
    "Do not chew or swallow the pouch."
  ]);

  const handleAddGuideline = () => {
    if (guidelines.length < MAX_GUIDELINES) {
      setGuidelines([...guidelines, ""]);
    }
  };

  const handleDeleteGuideline = (index) => {
    const updatedGuidelines = guidelines.filter((_, i) => i !== index);
    setGuidelines(updatedGuidelines);
  };

  const handleChangeGuideline = (index, newText) => {
    const updatedGuidelines = [...guidelines];
    updatedGuidelines[index] = newText;
    setGuidelines(updatedGuidelines);
  };

  return (
    <div className="w-[607px] flex-col justify-start items-start gap-[21px] inline-flex mt-6">
      <div className="self-stretch text-[#3f6075] text-[24px] font-bold font-['Poppins'] capitalize leading-[35px]">
        Guidelines
      </div>
      {guidelines.map((guideline, index) => (
        <div key={index} className="self-stretch justify-start items-start inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
          >
            <g clipPath="url(#clip0_151_1904)">
              <path
                d="M21.7709 8.17725C13.8647 8.17725 7.448 14.5939 7.448 22.5002C7.448 30.4064 13.8647 36.8231 21.7709 36.8231C29.6772 36.8231 36.0938 30.4064 36.0938 22.5002C36.0938 14.5939 29.6772 8.17725 21.7709 8.17725ZM21.7709 33.9585C15.4545 33.9585 10.3126 28.8166 10.3126 22.5002C10.3126 16.1838 15.4545 11.0418 21.7709 11.0418C28.0873 11.0418 33.2292 16.1838 33.2292 22.5002C33.2292 28.8166 28.0873 33.9585 21.7709 33.9585ZM28.3451 16.1694L18.9063 25.6082L15.1967 21.9129L13.1772 23.9325L18.9063 29.6616L30.3647 18.2033L28.3451 16.1694Z"
                fill="#2F4858"
              />
            </g>
            <defs>
              <clipPath id="clip0_151_1904">
                <rect width="55" height="55" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <textarea
            className="w-[552px] text-[#3f6075] text-[20px] font-normal font-['Poppins'] capitalize leading-[35px] mt-2 mb-6"
            value={guideline}
            onChange={(e) => handleChangeGuideline(index, e.target.value)}
            rows="2"
          />
          <button
            className="text-red-500"
            onClick={() => handleDeleteGuideline(index)}
          >
            <Trash size={24} />
          </button>
        </div>
      ))}
      <button
        className="bg-green-500 text-white py-2 px-4 rounded disabled:opacity-50"
        onClick={handleAddGuideline}
        disabled={guidelines.length >= MAX_GUIDELINES}
      >
        Add New Guideline
      </button>
    </div>
  );
}
