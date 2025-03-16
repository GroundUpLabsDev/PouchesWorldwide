import Header from "@/components/AdminUi/Header";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
