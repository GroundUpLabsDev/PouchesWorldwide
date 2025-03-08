

import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Review from "@/components/AdminUi/review";


export default function AdminDashboard() {


    return (
        <>
        <Header />
        <Banner />
        <h1 className="pt-12 pl-16 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-[220px]">Manage <span className="text-black">Reviews</span></h1>
        <div className="max-w-5xl mx-auto mb-12">
        <Review /> 
        </div>
        <Footer />
</>
  );
}  