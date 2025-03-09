"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Eye } from "lucide-react";

const ProductTable = ({ userRole }) => {
  const [data, setData] = useState([
    { id: 1, role: "Retailer", date: "2025-02-10", review: 4 },
    { id: 2, role: "Wholesaler", date: "2025-02-12", review: 5 },
    { id: 3, role: "Retailer", date: "2025-02-15", review: 3 },
    { id: 4, role: "Wholesaler", date: "2025-02-18", review: 2 },
    { id: 5, role: "Retailer", date: "2025-02-20", review: 5 },
  ]);

  return (
    <>
      <div className="w-full overflow-x-auto mt-6">
        <table className="table w-full rounded-lg overflow-hidden">
          {/* Table Head */}
          <thead className="h-[51px] bg-[#f5d061] text-black text-lg font-semibold capitalize">
            <tr>
              <th>User Role</th>
              <th>Date</th>
              <th>Review</th>
              <th>See Review</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {/* User Role Column */}
                <td className="text-lg font-medium py-3">{row.role}</td>

                {/* Date */}
                <td className="text-lg font-medium">{row.date}</td>

                {/* DaisyUI Rating */}
                <td>
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <input
                        key={index}
                        type="radio"
                        name={`rating-${row.id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={index + 1 === row.review}
                        readOnly
                      />
                    ))} 
                  </div>
                </td>

                {/* See Review Button */}
                <td className="text-center">
                  <Link href={`/admin/Review/${row.id}`}>
                    <button className="btn btn-primary flex items-center gap-2">
                      <Eye className="h-5 w-5" /> Open
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
