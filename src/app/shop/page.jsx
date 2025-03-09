import { Suspense } from 'react';
import Shop from './Shop';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Shop />
    </Suspense>
  );
}