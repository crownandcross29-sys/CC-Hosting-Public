'use client';

import { useCart } from '../context/CartContext';
import UpiModal from './UpiModal';

export default function LayoutClientWrapper() {
  const { activeUpiOrder, setActiveUpiOrder } = useCart();

  if (!activeUpiOrder) return null;

  return (
    <UpiModal
      orderDetails={activeUpiOrder}
      onClose={() => setActiveUpiOrder(null)}
    />
  );
}
