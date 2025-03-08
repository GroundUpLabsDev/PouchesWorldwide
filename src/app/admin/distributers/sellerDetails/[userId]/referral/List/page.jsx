

import ListTable from "@/components/AdminUi/ListTable";


export default function ListPage({ userId }) {
  const dummyData = [
    { id: 1, name: "John Doe", email: "john@example.com"},
    { id: 2, name: "Jane Smith", email: "jane@example.com"},
    { id: 3, name: "Alice Johnson", email: "alice@example.com"},
    { id: 4, name: "Alice Johnson", email: "alice@example.com"},
    { id: 5, name: "Alice Johnson", email: "alice@example.com"},
    { id: 6, name: "Alice Johnson", email: "alice@example.com"},
    { id: 7, name: "Alice Johnson", email: "alice@example.com"},
  ];
    return (
      <div className="mx-auto max-w-2xl">
        <ListTable data={dummyData} />

      </div>
    );
  }
  