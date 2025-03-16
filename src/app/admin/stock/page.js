import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import {Stock} from "@/app/admin/stock/Stock";

export default function AdminStockMangement() {
  return (
    <>
      <Header/>
      <Stock/>
      <Footer/>
    </>
  );
}