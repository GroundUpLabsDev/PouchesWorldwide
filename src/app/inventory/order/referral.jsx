

import React from "react";

const OrderCard = ({ orderId, email, date, total, commission }) => {
  return (
    <div className="bg-white p-4 mb-4 flex items-center border border-[#ececec] rounded-lg w-[800px]">
        <div className="w-[150px] h-[150px] flex items-center justify-center bg-[#ececec] rounded-lg">
  <img
    alt="Product image of ZYN"
    className="w-24 h-24"
    src="/4.png"
  />
</div>

      <div className="flex-1 text-left ml-6">
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins']">Order Id</div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins'] capitalize">{orderId}</div>
        <div className="text-[#282f44] text-sm font-semibold font-['Poppins'] mt-[31px]">Email</div>
        <div className="text-zinc-500 text-base font-semibold font-['Poppins']">{email}</div>
      </div>
      <div className="text-right">
        <div className="text-zinc-500 text-base font-medium font-['Poppins'] mb-2">{date}</div>
        <div className="text-black text-xl font-medium font-['Poppins'] mt-[6px]">Total : {total} $</div>
        <div className="text-black text-base font-medium font-['Poppins'] mt-[30px]">
          Commission <span className="text-[#009b7c] text-base font-medium font-['Poppins']">{commission}$</span>
        </div>
      </div>
    </div>
  );
};

const OrdersList = () => {
  const orders = [
    {
      orderId: "#233898377",
      email: "jhonedoe@gmail.com",
      date: "2024/09/11",
      total: 2300,
      commission: 30,
    },
    {
      orderId: "#233898377",
      email: "jhonedoe@gmail.com",
      date: "2024/09/11",
      total: 2300,
      commission: 30,
    },
    {
        orderId: "#233898377",
        email: "jhonedoe@gmail.com",
        date: "2024/09/11",
        total: 2300,
        commission: 30,
      },
      {
        orderId: "#233898377",
        email: "jhonedoe@gmail.com",
        date: "2024/09/11",
        total: 2300,
        commission: 30,
      },
  ];

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <OrderCard key={index} {...order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
 