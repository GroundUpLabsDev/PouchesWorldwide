import { Suspense } from 'react';
import Products from './Products';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Products />
    </Suspense>
  );
}