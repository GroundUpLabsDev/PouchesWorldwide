import { ArrowRight } from "lucide-react";

const Externalcard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-500 p-4 w-[700px] h-[400px] grid grid-cols-4">
      {/* 1st Grid: Product Image */}
      <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
        <img
          src={order.productImageUrl}
          alt={`Product image of ${order.productName}`}
          className="w-24 h-24 rounded-lg"
        />
      </div>

      {/* 2nd Grid: Order Details */}
      <div className="col-span-2 flex flex-col text-left w-[233px] h-[400px]">
        {/* Status Badge 
        <span className="bg-[#009b7c] text-white text-sm font-semibold font-['Poppins'] rounded w-[89px] h-[29px] px-1.5 py-1">
          {order.status}
        </span>*/}

        {/* Order Information */}
        <div>
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
        <p className="text-gray-500 mb-2">{order.createdAt}</p>
        <p className="text-xl font-semibold">Total: {order.itemTotal} $</p>
        </div>
       </div>
      
    </div>
  );
};


export default Externalcard;
