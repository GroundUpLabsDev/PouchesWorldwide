import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-500 p-4 w-[900px] h-[410px] grid grid-cols-4">
      {/* 1st Grid: Product Image */}
      <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
        <img
          src={order.productImage}
          alt={`Product image of ${order.productName}`}
          className="w-24 h-24 rounded-lg"
        />
      </div>

      {/* 2nd Grid: Order Details */}
      <div className="col-span-2 flex flex-col text-left w-[233px] h-[410px]">
        {/* Status Badge */}
        <span className="bg-[#009b7c] text-white text-sm font-semibold font-['Poppins'] rounded w-[99px] h-[29px] px-1.5 py-1">
          {order.status}
        </span>

        {/* Order Information */}
        <div className="mt-2">
          <p className="text-gray-500 text-sm">Customer Name</p>
          <p className="text-lg font-bold">{order.customerName}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Address</p>
          <p className="text-base">{order.address}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Item Name</p>
          <p className="text-base">{order.productName}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Quantity</p>
          <p className="text-base">{order.quantity}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Unit Price</p>
          <p className="text-base">{order.unitPrice} $</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-base">{order.itemTotal} $</p>
        </div>
      </div>

      {/* 5th Grid: Date & Total (Moved from 3rd Grid) */}
      <div className="col-start-4 flex flex-col justify-between text-right">
        <div className="w-[154px] h-[66px]">
        <p className="text-gray-500 mb-2">{order.date}</p>
        <p className="text-xl font-semibold">Total: {order.totalAmount} $</p>
        </div>
       </div>
      
    </div>
  );
};

export default OrderCard;
