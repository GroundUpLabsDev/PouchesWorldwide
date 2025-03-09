const CartItemCard = ({ item }) => {
    return (
      <div className="w-full max-w-[871px] mx-auto bg-white rounded-[10px] border border-gray-300 shadow-md p-4 flex gap-4">
        {/* Item Image */}
        <div className="w-[197px] h-[197px] flex justify-center items-center bg-white rounded-md border">
          <img
            src={item.imageUrl || "/default-image.png"}
            alt={item.name || "Product"}
            width={141}
            height={146}
            className="w-[141px] h-[146px] rounded-md object-cover"
          />
        </div>
  
        {/* Item Details */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-black text-[22px] font-medium capitalize">{item.Name || "Unnamed Product"}</h2>
          <p className="text-[#2f4858] text-base font-medium">Item ID: {item.id}</p>
  
          {/* Quantity & Price Section */}
          <div className="mt-4 flex items-center gap-6">
            {/* Quantity */}
            <div className="w-[216px]">
              <p className="text-zinc-500 text-[15px] font-semibold">Quantity</p>
              <div className="h-[54px] bg-white rounded-md border border-gray-300 flex items-center justify-center">
                <input
                  type="number"
                  value={item.quantity}
                  className="text-zinc-500 text-xl font-normal outline-none w-full text-center"
                  disabled
                />
              </div>
            </div>
  
            {/* Multiplication Sign */}
            <div className="text-black text-lg font-normal">X</div>
  
            {/* Price */}
            <div className="w-[216px]">
              <p className="text-zinc-500 text-[15px] font-semibold">Price per Unit</p>
              <div className="h-[54px] bg-white rounded-md border border-gray-300 flex items-center justify-center">
                <span className="text-[#3f6075] text-xl font-semibold">${item.price}</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Total Price */}
        <div className="flex flex-col justify-center items-end w-[180px]">
          <p className="text-[#2f4858] text-[15px] font-semibold">Total Price</p>
          <p className="text-[#2f4858] text-[32px] font-medium">
            $ {(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    );
  };
  
  export default CartItemCard;
  