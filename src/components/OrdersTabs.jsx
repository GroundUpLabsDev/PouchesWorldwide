import { useTab } from "@/app/inventory/order/TabContext";
import AdminOrder from "@/app/inventory/order/admin";
import ExternalOrder from "@/app/inventory/order/external";
import ReferralOrder from "@/app/inventory/order/referral";
import HistoryOrder from "@/app/inventory/order/history";

const OrdersTabs = () => {
  const { activeTab, setActiveTab } = useTab(); // Use the context

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Tabs */}
      <div className="flex border rounded-full overflow-hidden">
        <button
          className={`px-4 py-2 border-r focus:outline-none ${
            activeTab === "tab1" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          External Orders
        </button>
        <button
          className={`px-4 py-2 border-r focus:outline-none ${
            activeTab === "tab2" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Referral Orders
        </button>
        <button
          className={`px-4 py-2 border-r focus:outline-none ${
            activeTab === "tab3" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setActiveTab("tab3")}
        >
          Admin Orders
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "tab4" ? "bg-gray-800 text-white" : ""
          }`}
          onClick={() => setActiveTab("tab4")}
        >
         Admin Order History
        </button>
      </div>

      {/* Content */}
      <div className="mt-8 w-full flex justify-center">
        <div className="bg-white p-6 rounded-lg w-[100%] text-center">
          {activeTab === "tab1" && <ExternalOrder />}
          {activeTab === "tab2" && <ReferralOrder />}
          {activeTab === "tab3" && <AdminOrder />}
          {activeTab === "tab4" && <HistoryOrder />}
        </div>
      </div>
    </div>
  );
};

export default OrdersTabs;
