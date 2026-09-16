'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : null;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
        position: 'relative'
      }}
      className="product-card"
    >
      {/* Discount Badge */}
      {discountPercent && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: '999px',
            zIndex: 2,
            letterSpacing: '0.04em'
          }}
        >
          {discountPercent}% OFF
        </span>
      )}

      {/* Retro/Featured Star */}
      {product.featured && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(13, 20, 15, 0.85)',
            border: '1px solid var(--gold-primary)',
            color: 'var(--gold-primary)',
            fontSize: '10px',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: '999px',
            zIndex: 2
          }}
        >
          ★ FEATURED
        </span>
      )}

      {/* Image Link */}
      <Link
        href={`/product/${product.id}`}
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-elevated)'
        }}
      >
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease'
          }}
          className="card-img"
        />
      </Link>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Sub-Category badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--gold-primary)',
              backgroundColor: 'rgba(200, 169, 106, 0.1)',
              padding: '2px 8px',
              borderRadius: '999px'
            }}
          >
            {product.category}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {product.subCategory}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginBottom: '6px',
              height: '38px',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Team & Season */}
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          {product.team} • {product.season}
        </p>

        {/* Price Row & Quick Add */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{product.mrp}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, product.sizes?.[0] || 'M', 1)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--gold-primary)',
              color: '#0d140f',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap'
            }}
          >
            + Add
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-active);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.45);
        }
        .product-card:hover .card-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
