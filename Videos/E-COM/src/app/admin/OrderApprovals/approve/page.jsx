import { Suspense } from 'react';
import Approve from './Approve';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Approve />
    </Suspense>
  );
}