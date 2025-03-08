"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqData = [
    {
      question: "What is Zyn?",
      answer:
        "Zyn is a smokeless, spit-free nicotine pouch designed for adult consumers. It's a modern, discreet alternative to traditional smoking or vaping.",
    },
    {
      question: "How do I use Zyn?",
      answer:
        "Simply place a pouch between your gum and lip. You'll feel a slight tingling sensation as the nicotine is released. Keep it in for up to 30 minutes and then dispose of it responsibly.",
    },
    {
      question: "Is Zyn safe?",
      answer:
        "Zyn is designed to be a safer alternative to traditional tobacco products. However, it contains nicotine, which is an addictive substance. Please use it responsibly.",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto text-left h-auto">
      {/* FAQ Heading */}
      <div className="bg-[#293045] hover:bg-[#1e2638] hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg text-white w-32 p-3 mb-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center">FAQs</h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div key={index} className="bg-base-100 rounded-lg shadow-md border border-primary">
            {/* Question with ▼ on the left */}
            <button
              className="w-full text-lg font-medium text-black flex items-center px-4 py-3 cursor-pointer focus:outline-none"
              onClick={() => handleToggle(index)}
              onKeyDown={(e) => e.key === "Enter" && handleToggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span
                className={`mr-2 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
              {item.question}
            </button>

            {/* Answer */}
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
              }`}
            >
              <p className="text-black">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
