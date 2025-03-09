import TabNavigation from "@/components/AdminUi/tabs/TabNavigation";
import Header from "@/components/AdminUi/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

// app/admin/whalesellers/sellerDetails/[userId]/page.js
const SellerDetailsPage = async ({ params }) => {
  const { userId } = await params; // Await params before using

  // Fetch seller data from the API
  const response = await fetch("https://pouchesworldwide.com/strapi/api/users");
  const data = await response.json();

  // Find the seller with the matching userId
  const seller = data.find((s) => s.id === Number(userId));

  if (!seller) {
    return <div>Seller not found</div>;
  }

  // Define tabs for the navigation
  const tabs = [
    { label: "Tab 1", content: `Content for Tab 1 with user ${seller.username}` },
    { label: "Tab 2", content: `Content for Tab 2 with user ${seller.username}` },
    { label: "Tab 3", content: `Content for Tab 3 with user ${seller.username}` },
    { label: "Tab 4", content: `Content for Tab 4 with user ${seller.username}` },
    { label: "Tab 5", content: `Content for Tab 5 with user ${seller.username}` },
    { label: "Tab 6", content: `Content for Tab 6 with user ${seller.username}` },
    { label: "Tab 7", content: `Content for Tab 7 with user ${seller.username}` },
    { label: "Tab 8", content: `Content for Tab 8 with user ${seller.username}` },
  ];

  return (
    <>
      <Header />
      <div className="p-4">
        <TabNavigation tabs={tabs} userId={userId} />
      </div>
      <Footer />
    </>
  );
};

export default SellerDetailsPage;
