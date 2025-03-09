"use client";

import { useState } from 'react';
import { Trash2 } from 'lucide-react'; // Assuming you're using this icon

const DeleteUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = () => {
    setIsDeleting(true);
    // Your delete user logic here
    setIsDeleting(false);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="bg-red-500 text-white px-4 py-2 rounded flex items-center space-x-2">
        <span>Delete User</span>
        <Trash2 />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black text-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Are You Sure You Want To Delete This Account?</h2>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCloseModal} className="bg-gray-700 text-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className={`bg-red-500 text-white px-4 py-2 rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUserButton;
