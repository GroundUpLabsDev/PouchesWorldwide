import { Suspense } from 'react';
import AdminDashboard from './AdminDashboard';

export default function Admindash() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}