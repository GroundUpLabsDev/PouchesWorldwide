

'use client'; 

import Header from '@/components/AdminUi/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import CancelCard from '@/components/AdminUi/orderdetail/CancelCard';

const dummyData = [
  { id: 1, name: "John Doe", type: "Distributers", location: "nilmalgoda,kegalle", cans: "123" },
  { id: 2, name: "Jane Smith", type: "Distributers", location: "rambukkana,kegalle", cans: "654" },
  { id: 3, name: "Alice Johnson", type: "Distributers", location: "rambukkana,kegalle", cans: "17" },
  { id: 4, name: "Alice Johnson", type: "Distributers", location: "galigamuwa,kegalle", cans: "67" },
  { id: 5, name: "Alice Johnson", type: "Distributers", location: "warakapola,kegalle", cans: "55" },
  { id: 6, name: "Alice Johnson", type: "Distributers", location: "nelumdeniya,kegalle", cans: "57" },
  { id: 7, name: "Alice Johnson", type: "Distributers", location: "nelumdeniya,kegalle", cans: "557" },
];


const orders = [
  {
    id: 'order-1',
    productImage: '/4.png',
    status: 'Cancelled',
    type: 'Wholesaler',
    assigned: 'Jhon Doe',
    method: 'Crypto',
    txid: '4b5e7b2e8a4b8c1b2c7f8d0b9d5f6f7a8',
    date: '2024/09/11',
    totalAmount: 2300,
    customerName: 'K.K.Albert',
    address: 'C/89 , Kegalle , Sri Lanka',
    productName: 'Zyn Smooth Flavor Mint',
    quantity: 23,
    unitPrice: 50,
    itemTotal: 50000,
  },
  {
    id: 'order-2',
    productImage: '/3.png',
    status: 'Cancelled',
    method: 'contingency',
    type: 'Retailer',
    date: '2024/09/12',
    totalAmount: 1200,
    customerName: 'J.A.Jones',
    address: 'A/45 , Colombo , Sri Lanka',
    productName: 'Zyn Smooth Flavor Berry',
    quantity: 15,
    unitPrice: 80,
    itemTotal: 12000,
  },
  {
    id: 'order-3',
    productImage: '/6.png',
    status: 'Cancelled',
    type: 'Retailer',
    date: '2024/09/13',
    totalAmount: 1500,
    customerName: 'M.K.Thomas',
    address: 'B/78 , Galle , Sri Lanka',
    productName: 'Zyn Smooth Flavor Citrus',
    quantity: 10,
    unitPrice: 150,
    itemTotal: 15000,
  },
];

const Details = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId'); // Extract orderId from URL

  // Find the order with the matching ID
  const selectedOrder = orders.find(order => order.id === orderId);

  return (
    <>
      <Header />
    {/* <Banner />*/}
      <h1 className="pt-12 pl-16 text-[#fab12f] text-[32px] font-semibold font-['Poppins'] ml-[200px]">Manage Y<span className="text-black">our All Orders</span></h1>
      {selectedOrder ? (
        <CancelCard order={selectedOrder} /> 
      ) : (
        <p className="text-center text-red-500">Order not found.</p>
      )}

       {/*<OrderDetails /> */}
       <div className="mb-12"></div>
      <Footer />
    </>
  );
};

export default Details;
