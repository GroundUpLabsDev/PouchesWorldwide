import { Suspense } from 'react';
import Crypto from './Crypto';

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <Crypto />
    </Suspense>
  );
}