

import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import AllOrderTab from "@/components/AdminUi/AllOrderTab"



export default function AdminDashboard() {


    return (
        <>
        <Header />
        <Banner />
        <h1 className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] ml-[290px]">Manage Your All Orders</h1>
        <AllOrderTab />

        <Footer />
</>
  );
}  