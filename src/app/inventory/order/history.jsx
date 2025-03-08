

// pages/index.js
import OrderCard from '@/components/OrderCard';

const orders = [
 {
    productImage: '/4.png',
    status: 'Pending',
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
    productImage: '/3.png',
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
    productImage: '/6.png',
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


export default function History() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
    {orders.map((order, index) => (
      <OrderCard key={index} order={order} />
    ))}
  </div>
  );
}
