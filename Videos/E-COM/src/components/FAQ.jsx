"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqData = [
    {
      question: "What are nicotine pouches and how do they work?",
      answer:
        "Nicotine pouches are small, white pouches that you place between your gum and lip. They contain nicotine, water, plant-based materials, flavourings, and sweeteners, but are 100% tobacco-free. The nicotine is absorbed through your gums, providing a smoke-free and vapour-free alternative for nicotine delivery.",
    },
    {
      question: "How do I use nicotine pouches correctly?",
      answer:
        "Take one pouch out of the tin and place it between your gum and upper lip. You may feel a tingling or hot sensation as the nicotine is released. Keep the pouch in place for between 10-60 minutes, depending on your preference. Do not chew or swallow the pouch.",
    },
    {
      question: "What nicotine strengths are available in our products?",
      answer:
        "Our products come in various strengths to suit different preferences. ZYN comes in different nicotine levels, Blue Giant offers 12mg/pouch (3 dot strength), and our own brand PUXX provides multiple options to match your desired nicotine experience.",
    },
    {
      question: "How long does a nicotine pouch last?",
      answer:
        "The effects of a nicotine pouch typically last up to an hour. However, most users enjoy them for between 10 to 45 minutes. The flavor experience varies by brand, with some flavors lasting longer than others.",
    },
    {
      question: "Are nicotine pouches safe to use?",
      answer:
        "Nicotine pouches offer a significantly lower-risk alternative to traditional smoking and smokeless tobacco products. In January 2025, the FDA authorized the marketing of nicotine pouches after extensive scientific review, noting they pose lower risks of cancer and other serious health conditions compared to cigarettes and most smokeless tobacco products. These tobacco-free products deliver nicotine without the harmful effects of tobacco combustion. Since they contain substantially fewer harmful constituents than cigarettes and traditional smokeless tobacco, they present a reduced health risk profile. Research indicates that adults who completely switch from cigarettes or smokeless tobacco to nicotine pouches may experience health benefits. The FDA's evaluation showed evidence that a substantial proportion of adults successfully transitioned from more harmful products to nicotine pouches.",
    },
    {
      question: "How Our Product is Made",
      answer:
        "Our pouches are manufactured in an FDA-approved, lab-grade facility that complies with all European standards, including Good Manufacturing Practice (GMP) certification. This ensures consistent quality and safety in every pouch we produce.",
    }
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
