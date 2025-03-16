import DTabNavigation from "@/components/AdminUi/tabs/DTabNavigation";
import Header from "@/components/AdminUi/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

// app/admin/whalesellers/sellerDetails/[userId]/page.js
const SellerDetailsPage = async ({ params }) => {
  const { userId } = await params; // Await params to extract userId

  return (
    <>
      <Header />
      {/* <Banner />*/}
      <div className="p-4">
        {/* Tab Navigation */}
        <DTabNavigation userId={userId} />
      </div>
      <Footer />
    </>
  );
};

export default SellerDetailsPage;
