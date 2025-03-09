import { Suspense } from 'react';
import Payment from './Payment';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Payment />
    </Suspense>
  );
}