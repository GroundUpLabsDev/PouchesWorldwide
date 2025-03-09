

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import StatusOrder from "@/components/StatusOrder";
import StatusTable from "@/components/StatusTable";
import { ArrowLeft } from "lucide-react";

const Status = () => {

    const tableData = [
        {
          name: "zyn smooth 15",
          quantity: 1000,
          unitPrice: 50,
          total: 50000,
          imageUrl: "/2.png",
        },
        {
          name: "Product 2",
          quantity: 500,
          unitPrice: 30,
          total: 15000,
          imageUrl: "/3.png", // Optional fallback image
        },
        {
            name: "Product 2",
            quantity: 500,
            unitPrice: 30,
            total: 15000,
            imageUrl: "/10.png", // Optional fallback image
          },
        // More rows can be added here
      ];


  return (
    <>
      <Header />
    {/* <Banner />*/}
      <div className="bg-gray-100 p-6">
      <div className="flex items-center gap-2 flex justify-center mr-[550px]">
      {/* Add the ArrowLeft icon */}
      <ArrowLeft className="text-black w-8 h-8" /> {/* Adjust size and color as needed */}
      
      {/* Your existing text */}
      <div className="text-[#fab12f] text-[32px] font-semibold font-['Poppins'] capitalize">
        Order<span className="text-black">status of #ID239928</span><div className="ml-4 h-11 px-5 py-2.5 bg-[#f5d061]/80 rounded-[9px] shadow-[0px_0px_3px_0px_rgba(245,208,97,0.44)] border border-white justify-center items-center gap-2.5 inline-flex">
    <div className="text-black text-base font-medium font-['Poppins'] capitalize">pending</div>
</div>
      </div>
      </div></div>
      <StatusOrder />
      <div className="bg-gray-100 p-6 flex justify-center">
      <div className= "bg-white flex items-center justify-center w-[1030px] rounded-lg pt-4">
      <StatusTable tableData={tableData} />
        </div>
      
      </div>
      <Footer />
    </>
  );
};

export default Status;
