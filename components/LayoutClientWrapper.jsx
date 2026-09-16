'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import UpiModal from './UpiModal';

export default function LayoutClientWrapper() {
  const { activeUpiOrder, setActiveUpiOrder } = useCart();
  const pathname = usePathname();

  // Automatically scroll to the very top on every page navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // If there's an in-page hash anchor (e.g. #club, #catalog), let the hash handler take care of it
      if (window.location.hash) {
        return;
      }

      // Reset scroll position immediately on route change
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  if (!activeUpiOrder) return null;

  return (
    <UpiModal
      orderDetails={activeUpiOrder}
      onClose={() => setActiveUpiOrder(null)}
    />
  );
}
