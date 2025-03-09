import { Suspense } from 'react';
import Details from './Details';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Details />
    </Suspense>
  );
}