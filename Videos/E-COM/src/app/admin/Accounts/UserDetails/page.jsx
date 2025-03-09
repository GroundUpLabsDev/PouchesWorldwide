import { Suspense } from 'react';
import UserDetails from './UserDetails';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <UserDetails />
    </Suspense>
  );
}