import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const flavours = [
    'Cool Mint',
    'Wintergreen',
    'Peppermint'
  ];

  const brands = ['Zyn', 'Velo', 'ANGLE'];

  const contacts = [
    'Zyn.Service@Gmai.Com',
    '+998 6789 4564',
    '+987 1234 6754'
  ];

  return (
    <footer className="bg-black text-white py-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 items-center text-center sm:text-left">
      {/* Logo and Description Column */}
      <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start">
        <Link href="/" className="mb-4 block">
          <Image 
            src="/logo.png" 
            alt="Pouches Worldwide" 
            width={150}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <p className="text-sm leading-relaxed mb-4">
          Step Into The Innovative World Of Zyn,  
          Where Every Product Is Crafted For  
          Convenience And Every Moment Is  
          Tailored For Satisfaction.
        </p>
      </div>

      {/* Flavours Column */}
      <div className="col-span-1 sm:col-span-2 md:col-span-1">
        <h3 className="text-[#fab12f] font-medium mb-2">Flavours</h3>
        <ul className="space-y-1">
          {flavours.map((flavor) => (
            <li 
              key={flavor}
              className="text-sm cursor-pointer transition-colors duration-200 hover:text-gray-300"
            >
              <Link href={`/flavours/${flavor.toLowerCase().replace(' ', '-')}`}>
                {flavor}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Column */}
      <div className="col-span-1 sm:col-span-2 md:col-span-1">
        <h3 className="text-[#fab12f] font-medium mb-2">Brands</h3>
        <ul className="space-y-1">
          {brands.map((brand) => (
            <li 
              key={brand}
              className="text-sm cursor-pointer transition-colors duration-200 hover:text-gray-300"
            >
              <Link href={`/brands/${brand.toLowerCase()}`}>
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contacts Column */}
      <div className="col-span-1 sm:col-span-2 md:col-span-1">
        <h3 className="text-[#fab12f] font-medium mb-2">Contacts</h3>
        <ul className="space-y-1">
          {contacts.map((contact) => (
            <li 
              key={contact}
              className="text-sm"
            >
              {contact.includes('@') ? (
                <a 
                  href={`mailto:${contact}`}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  {contact}
                </a>
              ) : (
                <a 
                  href={`tel:${contact.replace(/\s+/g, '')}`}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  {contact}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-8 pt-4 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Zyn. All Rights Reserved.
      </p>
    </div>
  </div>
</footer>

  );
};

export default Footer;
