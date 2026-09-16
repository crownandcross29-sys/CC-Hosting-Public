'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'crown_and_cross_cart_v1';
const CUSTOMER_STORAGE_KEY = 'crown_and_cross_customer_v1';
const APP_SIGNATURE = 'crown_and_cross_storefront';

const SHIPPING_FEE = 80;
const FREE_SHIPPING_THRESHOLD = 1499;

const DEFAULT_CUSTOMER = {
  name: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  note: ''
};

/**
 * Validates and sanitizes individual cart items to guarantee unique, valid parameters
 */
function sanitizeCartItems(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems
    .filter((item) => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        item.id.trim() !== '' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        item.price >= 0 &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
      );
    })
    .map((item) => ({
      ...item,
      // Guarantee deterministic, strictly unique composite key
      key: `${item.id}_${item.size || 'M'}_${item.subCategory || 'std'}`
    }));
}

/**
 * Loads stored data verifying that it belongs strictly to this app and origin
 */
function loadScopedStorage(key, legacyKey) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key) || (legacyKey ? localStorage.getItem(legacyKey) : null);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // If wrapped in our origin-isolated security envelope:
    if (parsed && typeof parsed === 'object' && parsed.__app) {
      // Reject if originating from a different app signature or foreign webpage origin
      if (parsed.__app !== APP_SIGNATURE) {
        return null;
      }
      if (parsed.__origin && parsed.__origin !== window.location.origin) {
        return null;
      }
      return parsed.data;
    }

    // Legacy un-enveloped fallback
    return parsed;
  } catch (err) {
    return null;
  }
}

/**
 * Saves data wrapped with an origin and app signature so other webpages cannot use it
 */
function saveScopedStorage(key, data) {
  if (typeof window === 'undefined') return;
  try {
    const envelope = {
      __app: APP_SIGNATURE,
      __origin: window.location.origin,
      __version: 1,
      savedAt: Date.now(),
      data
    };
    localStorage.setItem(key, JSON.stringify(envelope));
  } catch (err) {}
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState(DEFAULT_CUSTOMER);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeUpiOrder, setActiveUpiOrder] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and customer from scoped storage on mount
  useEffect(() => {
    try {
      const savedCart = loadScopedStorage(CART_STORAGE_KEY, 'cc_cart');
      if (savedCart) {
        const sanitized = sanitizeCartItems(savedCart);
        if (sanitized.length > 0) {
          setItems(sanitized);
        }
      }

      const savedCustomer = loadScopedStorage(CUSTOMER_STORAGE_KEY, 'cc_customer');
      if (savedCustomer && typeof savedCustomer === 'object') {
        setCustomer((prev) => ({ ...prev, ...savedCustomer }));
      }
    } catch (e) {
      console.error('Failed to load scoped cart data', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync cart items to scoped storage only after initial load completes
  useEffect(() => {
    if (!isLoaded) return;
    saveScopedStorage(CART_STORAGE_KEY, items);
  }, [items, isLoaded]);

  // Sync customer to scoped storage only after initial load completes
  useEffect(() => {
    if (!isLoaded) return;
    saveScopedStorage(CUSTOMER_STORAGE_KEY, customer);
  }, [customer, isLoaded]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setItems((prev) => {
      const itemKey = `${product.id}_${size}_${product.subCategory || 'std'}`;
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
        setActiveUpiOrder,
        customer,
        setCustomer,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
