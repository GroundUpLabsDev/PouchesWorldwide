

import TabNavigation from "@/components/AdminUi/tabs/TabNavigation";
import Header from "@/components/AdminUi/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

// app/admin/whalesellers/sellerDetails/[userId]/page.js
const SellerDetailsPage = async ({ params }) => {
  const { userId } = await params; // Await params to extract userId

  // Mock data
  const sellers = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", mobile: "555-123-4567" },
    { id: 4, name: "Alice Johnson", email: "alice@example.com", mobile: "555-123-4567" },
    { id: 5, name: "Alice Johnson", email: "alice@example.com", mobile: "555-123-4567" },
    { id: 6, name: "Alice Johnson", email: "alice@example.com", mobile: "555-123-4567" },
    { id: 7, name: "Alice Johnson", email: "alice@example.com", mobile: "555-123-4567" },
  ];

  // Find the seller with the matching userId
  const seller = sellers.find((s) => s.id === Number(userId));

  if (!seller) {
    return <div>Seller not found</div>;
  }

  // Define tabs for the navigation
  const tabs = [
    { label: "Tab 1", content: `Content for Tab 1 with user ${seller.name}` },
    { label: "Tab 2", content: `Content for Tab 2 with user ${seller.name}` },
    { label: "Tab 3", content: `Content for Tab 3 with user ${seller.name}` },
    { label: "Tab 4", content: `Content for Tab 4 with user ${seller.name}` },
    { label: "Tab 5", content: `Content for Tab 5 with user ${seller.name}` },
    { label: "Tab 6", content: `Content for Tab 6 with user ${seller.name}` },
    { label: "Tab 7", content: `Content for Tab 7 with user ${seller.name}` },
    { label: "Tab 8", content: `Content for Tab 8 with user ${seller.name}` },
  ];

  return (
    <>
      <Header />
      <Banner />
      <div className="p-4">
        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} userId={userId} />
      </div>
      <Footer />
    </>
  );
};

export default SellerDetailsPage;
