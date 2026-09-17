'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, triggerWhatsApp } from '../lib/whatsapp';

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHashNav = (hash) => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      window.location.hash = hash;
      window.dispatchEvent(new Event('hashchange'));
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(13, 20, 15, 0.94)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Top Notification Announcement Bar */}
      <div className="navbar-announcement">
        <span className="announcement-primary">⚡ FREE SHIPPING ON ORDERS ABOVE ₹1,499</span>
        <span className="announcement-divider">•</span>
        <span className="announcement-secondary">PAN-INDIA DELIVERY</span>
        <span className="announcement-divider hide-mobile">•</span>
        <span className="announcement-tertiary hide-mobile">5–7 DAYS SIZING EXCHANGE</span>
      </div>

      {/* Main Navbar */}
      <div className="navbar-inner">
        {/* Brand Logo & Name */}
        <Link href="/" className="brand-link">
          <img
            src="/images/logo.jpeg"
            alt="Crown & Cross Emblem"
            className="brand-logo-img"
          />
          <div className="brand-text-wrapper">
            <span className="serif-heading brand-title">
              CROWN & CROSS
            </span>
            <span className="brand-subtitle">
              Football Jerseys • Chennai
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <Link href="/#catalog" onClick={() => handleHashNav('catalog')} className="desktop-nav-link">
            Catalog
          </Link>
          <Link href="/#club" onClick={() => handleHashNav('club')} className="desktop-nav-link">
            Club
          </Link>
          <Link href="/#country" onClick={() => handleHashNav('country')} className="desktop-nav-link">
            Country
          </Link>
          <Link href="/#retro" onClick={() => handleHashNav('retro')} className="desktop-nav-link retro-highlight">
            <Sparkles size={13} /> Retro Kits
          </Link>
          <Link href="/size-guide" className="desktop-nav-link">
            Size Guide
          </Link>
          <Link href="/about" className="desktop-nav-link">
            Our Story
          </Link>
          <Link href="/request-estimate" className="desktop-nav-link">
            Bulk / Team
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          {/* WhatsApp Direct Chat */}
          <a
            href={getWhatsAppUrl("Hello Crown & Cross, I have an inquiry regarding jerseys")}
            onClick={(e) => triggerWhatsApp({ text: "Hello Crown & Cross, I have an inquiry regarding jerseys", e })}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-wa-btn"
            title="Contact Us on WhatsApp"
          >
            <MessageCircle size={15} />
            <span className="hide-tablet-mobile">Contact Us</span>
          </a>

          {/* Cart Drawer Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="nav-cart-btn"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={15} />
            <span className="cart-text">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <Link href="/#catalog" onClick={() => handleHashNav('catalog')} className="mobile-dropdown-link">
            Catalog
          </Link>
          <Link href="/#club" onClick={() => handleHashNav('club')} className="mobile-dropdown-link">
            Club Jerseys
          </Link>
          <Link href="/#country" onClick={() => handleHashNav('country')} className="mobile-dropdown-link">
            Country Kits
          </Link>
          <Link href="/#retro" onClick={() => handleHashNav('retro')} className="mobile-dropdown-link retro-mobile-link">
            <Sparkles size={14} /> Immortal Retro Editions
          </Link>
          <Link href="/size-guide" onClick={() => setMobileMenuOpen(false)} className="mobile-dropdown-link">
            Size &amp; Fit Guide
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-dropdown-link">
            Our Story &amp; Brand Ethos
          </Link>
          <Link href="/request-estimate" onClick={() => setMobileMenuOpen(false)} className="mobile-dropdown-link">
            Bulk &amp; Team Estimates
          </Link>
          <a
            href={getWhatsAppUrl("Hello Crown & Cross, I have an inquiry regarding jerseys")}
            onClick={(e) => {
              setMobileMenuOpen(false);
              triggerWhatsApp({ text: "Hello Crown & Cross, I have an inquiry regarding jerseys", e });
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-dropdown-wa"
          >
            <MessageCircle size={16} />
            <span>Contact Us (WhatsApp)</span>
          </a>
        </div>
      )}
    </header>
  );
}
