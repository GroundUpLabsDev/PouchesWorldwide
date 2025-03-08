"use client";
import { useState } from 'react';
import { MoveLeft, MoveRight } from 'lucide-react'; // Import Lucide move-left and move-right icons

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Show first 3 pages
    for (let i = 1; i <= 3 && i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if the total pages are greater than 3
    if (totalPages > 3 && currentPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    // Show the last page if necessary
    if (totalPages > 3 && currentPage < totalPages - 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 bg-white md:bg-black pt-4 pb-8">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className="w-12 h-12 md:w-[69px] md:h-[62px] flex items-center justify-center border border-black md:border-white rounded-[10px] bg-white text-black md:bg-transparent md:text-white md:hover:bg-gray-700 disabled:opacity-50"
      disabled={currentPage === 1}
    >
      <MoveLeft size={20} />
    </button>
  
    {getPageNumbers().map((page, index) => (
      <button
        key={index}
        onClick={() => page !== '...' && handlePageChange(page)}
        className={`w-12 h-12 md:w-[69px] md:h-[62px] flex items-center justify-center border border-black md:border-white rounded-[10px] bg-white text-black md:bg-transparent md:text-white ${
          currentPage === page
            ? 'bg-gray-200 text-gray-800'
            : 'md:hover:bg-gray-700'
        }`}
        disabled={page === '...'}
      >
        {page}
      </button>
    ))}
  
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className="w-12 h-12 md:w-[69px] md:h-[62px] flex items-center justify-center border border-black md:border-white rounded-[10px] bg-white text-black md:bg-transparent md:text-white md:hover:bg-gray-700 disabled:opacity-50"
      disabled={currentPage === totalPages}
    >
      <MoveRight size={20} />
    </button>
  </div>
  
  );
};

export default Pagination;
