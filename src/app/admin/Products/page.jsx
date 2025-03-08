

import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProductTable from "@/components/AdminUi/ProductTable";



export default function AdminDashboard() {


    return (
        <>
        <Header />
        <Banner />
        <h1 className="pt-12 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] text-center mb-12">Your <span className="text-black">All Products</span></h1>
        <div className="max-w-6xl mx-auto mb-12">
  <ProductTable />
</div>

        <Footer />
</>
  );
}  