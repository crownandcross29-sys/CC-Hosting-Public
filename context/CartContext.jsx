'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const SHIPPING_FEE = 80;
const FREE_SHIPPING_THRESHOLD = 1499;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeUpiOrder, setActiveUpiOrder] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cc_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cc_cart', JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setItems((prev) => {
      const itemKey = `${product.id}_${size}`;
      const existing = prev.find((i) => i.key === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.key === itemKey ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          team: product.team,
          price: product.price,
          mrp: product.mrp,
          image: product.images?.[0] || '',
          category: product.category,
          subCategory: product.subCategory,
          size,
          quantity
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (key, delta) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.key === key) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Computations
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = items.length === 0 ? 0 : isFreeShipping ? 0 : SHIPPING_FEE;
  const grandTotal = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        shipping,
        grandTotal,
        totalItems,
        isFreeShipping,
        amountToFreeShipping,
        freeShippingProgress,
        isCartOpen,
        setIsCartOpen,
        activeUpiOrder,
        setActiveUpiOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
