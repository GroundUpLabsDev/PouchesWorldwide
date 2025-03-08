import React from "react";
import PropTypes from "prop-types";
import { CircleArrowRight } from "lucide-react"; // ✅ Import Lucide Icon
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const ContingencyCard = ({ orderId, date, price, status }) => {
  const router = useRouter(); // Initialize the router

  const statusColors = {
    Pending: "text-black",
    Approved: "text-black",
    Rejected: "text-black",
  };

  const bgColors = {
    Pending: "bg-white border-black",
    Approved: "bg-[#009b7c]/10 border-[#009b7c]",
    Rejected: "bg-[#fa4032]/10 border-[#fa4032]",
  };

  const handleClick = () => {
    // Navigate to the product details page using router.push
    router.push(`/admin/OrderApprovals/products?orderId=${orderId}`);
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between w-full ${bgColors[status]}`}
    >
      <div>
        <p className="text-sm text-black text-left">wholesaler</p>
        <p className="text-lg font-medium text-[#3f6075]">Order Id #{orderId}</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">Date</p>
        <p className="text-md font-medium">{date}</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">Price</p>
        <p className="text-lg ">{price} $</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">Status</p>
        <p className={`text-lg ${statusColors[status]}`}>
          {status}
        </p>
      </div>
      <button className="p-2 hover:bg-transparent" onClick={handleClick}>
        <CircleArrowRight size={24} />
      </button>
    </div>
  );
};

// ✅ Define PropTypes to ensure correct props
ContingencyCard.propTypes = {
  orderId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Pending", "Approved", "Rejected"]).isRequired,
};

export default ContingencyCard;
