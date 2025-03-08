import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="h-[218px] w-full max-w-[871px] mx-auto relative bg-white rounded-[10px] border border-[#adb5bd]/40">
      {/* Product Image */}
      <div className="w-[197px] h-[197px] left-[9px] top-[10px] absolute">
        <div className="w-[197px] h-[197px] left-0 top-0 absolute bg-white rounded-[5px]"></div>
        <img
          src={product.imageUrl}
          alt={product.Name}
          width={141}
          height={146}
          className="w-[141px] h-[146px] left-[28px] top-[26px] absolute"
        />
      </div>

      {/* Product Name */}
      <div className="left-[225px] top-[26px] absolute text-center text-black text-[22px] font-medium font-['Poppins'] capitalize">
        {product.Name}
      </div>

      {/* Product Details */}
      <div className="left-[226px] top-[75px] absolute text-[#2f4858] text-base font-medium font-['Poppins'] leading-snug">
        12mg | {product.selectedCans} Cans
      </div>

      {/* Number of Products and Price */}
      <div className="left-[224px] top-[124px] absolute justify-start items-center gap-[19px] inline-flex">
        {/* Number of Products */}
        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
            <div className="self-stretch text-zinc-500 text-[15px] font-['Inter'] font-semibold leading-[18px]">
              Number of Products
            </div>
          </div>
          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
            <input
              type="number"
              value={product.quantity}
              className="grow shrink basis-0 text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none"
              disabled
            />
          </div>
        </div>

        {/* Multiplication Sign */}
        <div className="w-3 h-20 pt-[22px] flex-col justify-center items-center gap-2.5 inline-flex">
          <div className="self-stretch text-black text-lg font-normal font-['Inter'] leading-[25.20px]">
            X
          </div>
        </div>

        {/* Price for a Product */}
        <div className="w-[216px] flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch h-[18px] flex-col justify-start items-start flex">
            <div className="self-stretch text-zinc-500 text-[15px] font-semibold font-['Inter'] leading-[18px]">
              Price for a Product
            </div>
          </div>
          <div className="self-stretch h-[54px] p-3 bg-white rounded-md border border-zinc-200 justify-start items-center gap-2 inline-flex overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[#3f6075] text-xl font-semibold font-['Poppins'] leading-7">
                ${product.price}
              </span>
              <input
                type="number"
                className="text-zinc-500 text-xl font-normal font-['Inter'] leading-7 outline-none w-full"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="left-[750px] top-[157px] absolute text-[#2f4858] text-[32px] font-medium">
        $ {product.price * product.quantity}
      </div>

      {/* Remove Button */}
      <div className="btn px-5 py-2.5 left-[756px] top-[10px] absolute bg-[#f7b88e]/60 rounded-[11px] justify-center items-center gap-2.5 inline-flex">
        <div
          className="text-center text-[#ff7f00] text-[15px] font-medium font-['Poppins'] capitalize cursor-pointer"
        >
          Remove
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    selectedCans: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
