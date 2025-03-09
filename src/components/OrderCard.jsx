import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg border border-zinc-500 p-4 w-[700px] h-[430px] grid grid-cols-4">
      {/* 1st Grid: Product Image */}
      <div className="col-span-1 flex items-center justify-center bg-[#ececec] rounded-lg w-[150px] h-[150px]">
        <img
          src={`${order.cart[0].imageUrl ||  '/2.png'}`}
          alt={`Product image of ${order.productName}`}
          className="w-24 h-24 rounded-lg"
        /> 
      </div>

      {/* 2nd Grid: Order Details */}
      <div className="col-span-2 flex flex-col text-left w-[233px] h-[400px]">
      {(order.astatus === "Pending Approval" || order.astatus === "Canceled") && (
  <span className="bg-[#009b7c] text-white text-sm font-semibold font-['Poppins'] rounded w-[70px] h-[29px] px-1.5 py-1 mb-2">
   {order.astatus.split(' ')[0]}
  </span>
)}


        {/* Order Information */}
        <div>
          <p className="text-gray-500 text-sm">Customer Name</p>
          <p className="text-lg font-bold">{order.customerName}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Address</p>
          <p className="text-base">{order.address.street}</p>
        </div>  

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Item Name</p>
          <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.Name 
      : order.cart.length > 1  
        ? "Multiple" 
        : order.productName[0]?.Name}</p>
        </div>

        <div className="mt-4">
        <p className="text-gray-500 text-sm">No of Cans</p>
              <p className="text-base">{!order.cart || order.cart.length === 0
      ? order.itemTotal
      : order.cart.length > 1
        ? "Multiple"
        : order.itemTotal}</p>
        </div>

        <div className="mt-4">
        <p className="text-gray-500 text-sm">Price Per Can</p>
              <p className="text-base">{!order.cart || order.cart.length === 0 
      ? order.productName[0]?.price 
      : order.cart.length > 1 
        ? "Multiple" 
        : order.productName[0]?.price} </p>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Commission</p>
          <p className="text-base">{order.commission} $</p>
        </div>
      </div>

      {/* 5th Grid: Date & Total (Moved from 3rd Grid) */}
      <div className="col-start-4 flex flex-col justify-between text-right">
        <div className="w-[154px] h-[66px]">
        <p className="text-gray-500 mb-2"> {new Date(order.updatedAt).toISOString().split('T')[0]}</p>
        <p className="text-xl font-semibold">Commission: {order.commission} $</p>
        </div>
       </div>
      
    </div>
  );
};

export default OrderCard;
