"use client";
import React, { useState } from "react";
import { Trash } from "lucide-react";

const DeleteButton = ({ row, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)} // Open the confirmation modal
        className="btn h-[35px] w-[120px] bg-[#fa4032] rounded-lg text-white text-[10px] font-medium font-['Poppins'] capitalize inline-flex items-center justify-center gap-1"
      >
        Delete <Trash size={14} />
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-black text-white shadow-lg rounded-lg">
            <h3 className="font-bold text-lg capitalize">Are you sure want to delete this product?</h3>
            <p className="py-4 text-gray-300">This action cannot be undone.</p>
            <div className="modal-action">
              <button
                className="btn bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  handleDelete(row.id); // Call handleDelete with product id
                  setIsModalOpen(false); // Close the modal
                }}
              >
                Yes, Delete
              </button>
              <button
                className="btn bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)} // Close the modal
              >
                No, Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DeleteButton;
