

import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import DashboardTabs from "@/components/AdminUi/DashboardTabs";


export default function AdminDashboard() {


    return (
        <>
        <Header />
        <Banner />
        <h1 className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] text-center">Manage Your All Members</h1>
        <DashboardTabs />

        <Footer />
</>
  );
}  