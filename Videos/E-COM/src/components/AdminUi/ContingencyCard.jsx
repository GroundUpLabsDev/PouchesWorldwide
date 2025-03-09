import React from "react";
import PropTypes from "prop-types";
import { CircleArrowRight } from "lucide-react"; // ✅ Import Lucide Icon
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const ContingencyCard = ({ id, createdAt, totalAmount, astatus }) => {
  const router = useRouter(); // Initialize the router

  const astatusColors = {
    pending: "text-black", 
    Approved: "text-black",
    Rejected: "text-black",
  };

  const bgColors = {
    pending: "bg-white border-black",
    Approved: "bg-[#009b7c]/10 border-[#009b7c]",
    Rejected: "bg-[#fa4032]/10 border-[#fa4032]",
  };

  const handleClick = () => {
    // Navigate to the product details page using router.push
    router.push(`/admin/OrderApprovals/products?id=${id}`);
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between w-full ${bgColors[astatus]}`}
    >
      <div>
        <p className="text-sm text-black text-left">wholesaler</p>
        <p className="text-lg font-medium text-[#3f6075]">Order Id #{id}</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">date</p>
        <p className="text-md font-medium">{new Date(createdAt).toISOString().split("T")[0]}</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">Price</p>
        <p className="text-lg ">{totalAmount} $</p>
      </div>
      <div>
        <p className="text-sm text-black text-left">status</p>
        <p className={`text-lg ${astatusColors[astatus]}`}>
          {astatus}
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
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  astatus: PropTypes.oneOf(["pending", "Approved", "Rejected"]).isRequired,
};

export default ContingencyCard;
