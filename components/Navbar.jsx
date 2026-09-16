'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(13, 20, 15, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Top Notification Announcement Bar */}
      <div
        style={{
          backgroundColor: 'var(--olive-accent)',
          borderBottom: '1px solid rgba(200, 169, 106, 0.15)',
          padding: '6px 16px',
          textAlign: 'center',
          fontSize: '11px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'var(--gold-light)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span>⚡ PAN-INDIA DELIVERY</span>
        <span>•</span>
        <span>FREE SHIPPING ON ORDERS ABOVE ₹1,499</span>
        <span>•</span>
        <span>5–7 DAYS SIZING EXCHANGE</span>
      </div>

      {/* Main Navbar */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        {/* Brand Logo & Name */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img
            src="/images/logo.jpeg"
            alt="Crown & Cross Emblem"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              border: '1px solid var(--gold-primary)',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}
          />
          <div>
            <span
              className="serif-heading"
              style={{
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--gold-primary)',
                display: 'block',
                lineHeight: 1
              }}
            >
              CROWN & CROSS
            </span>
            <span
              style={{
                fontSize: '10px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block',
                marginTop: '3px'
              }}
            >
              Football Jerseys • Chennai
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            gap: '28px',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase'
          }}
          className="desktop-nav"
        >
          <Link href="/#catalog" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Catalog
          </Link>
          <Link href="/#club" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Club
          </Link>
          <Link href="/#country" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Country
          </Link>
          <Link href="/#retro" style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
            ★ Retro Kits
          </Link>
          <Link href="/size-guide" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Size Guide
          </Link>
          <Link href="/about" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Our Story
          </Link>
          <Link href="/request-estimate" style={{ color: 'var(--text-secondary)', transition: 'color 0.15s' }}>
            Bulk / Team
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/917695924602?text=Hello%20Crown%20%26%20Cross%2C%20I%20have%20an%20inquiry%20regarding%20jerseys"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              padding: '7px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#4ade80'
            }}
          >
            <span>💬</span>
            <span className="hide-mobile">+91 76959 24602</span>
          </a>

          {/* Cart Drawer Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              padding: '9px 18px',
              borderRadius: '999px',
              backgroundColor: 'var(--gold-primary)',
              color: '#0d140f',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(200, 169, 106, 0.25)'
            }}
          >
            <span>🛒 Cart</span>
            {totalItems > 0 && (
              <span
                style={{
                  backgroundColor: '#0d140f',
                  color: 'var(--gold-primary)',
                  fontSize: '11px',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-grid',
                  placeItems: 'center'
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              padding: '8px 10px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          <Link href="/#catalog" onClick={() => setMobileMenuOpen(false)}>
            Catalog
          </Link>
          <Link href="/#club" onClick={() => setMobileMenuOpen(false)}>
            Club Jerseys
          </Link>
          <Link href="/#country" onClick={() => setMobileMenuOpen(false)}>
            Country Kits
          </Link>
          <Link href="/#retro" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--gold-primary)' }}>
            ★ Retro Classics
          </Link>
          <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)}>
            Size & Fit Guide
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            About Us / Our Story
          </Link>
          <Link href="/request-estimate" onClick={() => setMobileMenuOpen(false)}>
            Bulk / Team Estimate
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hide-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
