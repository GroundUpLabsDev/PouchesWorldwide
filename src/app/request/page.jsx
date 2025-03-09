import { Suspense } from 'react';
import Request from './Request';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Request />
    </Suspense>
  );
}