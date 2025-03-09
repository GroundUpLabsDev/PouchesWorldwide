

import Table from "@/components/AdminUi/Table";


export default function EarningsPage({ userId }) {

    const dummyData = [
        { id: 1, name: "John Doe", email: "john@example.com", income: "30", date: "2025-02-10" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", income: "76", date: "2025-02-10" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", income: "90", date: "2025-02-10" },
        { id: 4, name: "Alice Johnson", email: "alice@example.com", income: "67", date: "2025-02-10" },
        { id: 5, name: "Alice Johnson", email: "alice@example.com", income: "57", date: "2025-02-10" },
        { id: 6, name: "Alice Johnson", email: "alice@example.com", income: "55", date: "2025-02-10" },
        { id: 7, name: "Alice Johnson", email: "alice@example.com", income: "45", date: "2025-02-10" },
      ];

    return (
      <div>
      <div className="h-[78px] p-5 bg-[#282f44] rounded-[5px] justify-between items-center inline-flex w-full">
    <div className="text-white text-xl font-normal font-['Poppins'] capitalize">total referral Earnings</div>
    <div className="text-white text-[25px] font-medium font-['Poppins'] capitalize">10,098$</div>
</div>
<Table  data={dummyData} />

      </div>
    );
  }
  