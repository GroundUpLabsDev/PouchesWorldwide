"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="container mx-auto px-6 md:px-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start text-sm text-center md:text-left">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <Link href="/" className="mb-3 block">
              <Image src="/logo.png" alt="Company Logo" width={100} height={100} className="h-auto w-auto" />
            </Link>
            <p className="max-w-xs md:max-w-sm leading-relaxed text-gray-400">
              Your trusted destination for premium nicotine and energy pouches. Proudly offering Blue Giant, and our exclusive PUXX brand.
            </p>
            <div className="mt-4">
              <Image src="/card.webp" alt="Payment Methods" width={200} height={40} draggable={false} className="h-auto w-auto" />
            </div>
          </div>

          {/* Links Sections */}
          {[
            { title: "Flavors", items: ["Mint", "Peppermint", "Cool Mint", "God Mint", "Blueberry", "Mango", "Cola", "Spearmint", "Watermelon", "Cherry"] },
            { title: "Brands", items: ["PUXX", "BLUE GIANT"], link: "/brands" },
            { title: "Legal", items: [{ name: "Terms and Conditions", link: "/terms" }, { name: "Refund Policy", link: "/privacy" }, { name: "Privacy Policy", link: "/privacy" }] },
            { title: "Contacts", items: [{ name: "support@pouchesworldwide.com", link: "mailto:support@pouchesworldwide.com" }] },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-2">{section.title}</h3>
              <ul className="space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link href={typeof item === "string" ? "/" : item.link} className="hover:text-white">
                      {typeof item === "string" ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="#" className="hover:text-white"><Facebook size={20} /></Link>
          <Link href="#" className="hover:text-white"><Twitter size={20} /></Link>
          <Link href="#" className="hover:text-white"><Instagram size={20} /></Link>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500">
          <p>© {currentYear} Pouches Worldwide. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
