'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Club', 'Country', 'Retro'];
const SUB_CATEGORIES = [
  'All',
  'Player Version',
  'Master Copy',
  'Fan Version Set',
  'Embroidered',
  'Sublimation'
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Fetch catalog from public JSON
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error('Error reading products.json:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        activeCategory === 'All' ||
        (activeCategory === 'Club' && p.category === 'Club') ||
        (activeCategory === 'Country' && p.category === 'Country') ||
        (activeCategory === 'Retro' && p.category === 'Retro');

      const matchSub =
        activeSubCategory === 'All' || p.subCategory === activeSubCategory;

      const matchSearch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.team?.toLowerCase().includes(search.toLowerCase()) ||
        p.season?.toLowerCase().includes(search.toLowerCase());

      return matchCat && matchSub && matchSearch;
    });
  }, [products, activeCategory, activeSubCategory, search]);

  const featuredKits = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '90px 24px 70px',
          background: 'radial-gradient(ellipse at top, #1a2a20 0%, #0d140f 70%)',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(200, 169, 106, 0.12)',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-primary)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}
          >
            <span>⚽</span> Authentic & Retro Football Kit Sanctuary
          </div>

          <h1
            className="serif-heading"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '18px',
              color: 'var(--text-primary)'
            }}
          >
            Some wear fashion.{' '}
            <span className="gold-gradient-text" style={{ display: 'block' }}>
              We wear football.
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              margin: '0 auto 32px',
              lineHeight: 1.6
            }}
          >
            Wear Your Club. Wear Your Story. Crafted for dedicated fans in Chennai and delivered Pan-India. Precision player editions, master reproductions, and golden-era retros.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#catalog"
              style={{
                padding: '14px 30px',
                borderRadius: '999px',
                backgroundColor: 'var(--gold-primary)',
                color: '#0d140f',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(200, 169, 106, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              Shop Jersey Catalog ↓
            </a>

            <button
              onClick={() => {
                setActiveCategory('Retro');
                const catalogElem = document.getElementById('catalog');
                if (catalogElem) catalogElem.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '14px 28px',
                borderRadius: '999px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-active)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              ★ Retro Classics
            </button>
          </div>

          {/* Guarantees Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '18px', color: 'var(--gold-primary)', fontWeight: 800 }}>⚡ 3–5 Days</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Metro Delivery Turnaround</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', color: 'var(--gold-primary)', fontWeight: 800 }}>🛡️ 5–7 Days</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Sizing Exchange Window</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', color: 'var(--gold-primary)', fontWeight: 800 }}>🚚 Free Delivery</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>On all orders above ₹1,499</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', color: 'var(--gold-primary)', fontWeight: 800 }}>💬 WhatsApp UPI</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Instant 1-Click Order Flow</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kits Showcase */}
      {featuredKits.length > 0 && (
        <section style={{ maxWidth: '1360px', margin: '60px auto 0', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
                Handpicked Grails
              </span>
              <h2 className="serif-heading" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                Featured Kits
              </h2>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Iconic Moments in Football Lore
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {featuredKits.slice(0, 3).map((kit) => (
              <ProductCard key={kit.id} product={kit} />
            ))}
          </div>
        </section>
      )}

      {/* Catalog & Collections Section */}
      <section id="catalog" style={{ maxWidth: '1360px', margin: '80px auto 0', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
            Complete Jersey Collection
          </span>
          <h2 className="serif-heading" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Browse By Club, Country &amp; Era
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Filter by authentic quality standard, team, and sizing.
          </p>
        </div>

        {/* Filter Controls */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {/* Top Filter Row: Category Tabs + Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {/* Primary Category Tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-primary)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeCategory === cat ? 'var(--gold-primary)' : 'transparent',
                    color: activeCategory === cat ? '#0d140f' : 'var(--text-secondary)',
                    transition: 'all 0.15s'
                  }}
                >
                  {cat === 'Retro' ? '★ Retro' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ flex: '1 1 260px', maxWidth: '360px' }}>
              <input
                type="text"
                placeholder="Search team, kit, player..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Sub-Category Quality Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '6px' }}>
              Quality Tier:
            </span>
            {SUB_CATEGORIES.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: `1px solid ${activeSubCategory === sub ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: activeSubCategory === sub ? 'rgba(200, 169, 106, 0.15)' : 'var(--bg-primary)',
                  color: activeSubCategory === sub ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            Loading Crown & Cross collection...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', backgroundColor: 'var(--bg-surface)', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>No jerseys found</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Try adjusting your search terms or clearing sub-category filters.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Quality Standards Section */}
      <section
        style={{
          maxWidth: '1360px',
          margin: '90px auto 0',
          padding: '0 24px'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-active)',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
              Craft &amp; Authenticity
            </span>
            <h2 className="serif-heading" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              The 5 Quality Standards
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              We are kit collectors first. We strictly classify every jersey so you get precisely what you pay for.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}
          >
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                1. Player Version
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Athletic slim cut, heat-applied silicon crests, and micro-vented technical fabric as worn on the pitch.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                2. Master Copy
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Exact 1:1 reproduction of iconic and rare kits with pristine details, tags, and stitch density.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                3. Fan Version Set
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Relaxed everyday fit, fully embroidered badge, durable poly fabric built for weekly matchday wear.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                4. Embroidered
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Classic stitched crests and sponsor patches for timeless longevity and tactile quality.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '6px' }}>
                5. Sublimation
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                High-definition heat-infused color dyes that will never fade, crack, or peel across countless washes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Lookbook & Social Proof */}
      <section style={{ maxWidth: '1360px', margin: '90px auto 0', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-primary)' }}>
            Chennai &amp; Pan-India Kit Community
          </span>
          <h2 className="serif-heading" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            Worn By The Faithful
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Tag <strong>@crownandcross</strong> on Instagram to be featured on our social wall.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--gold-primary)', marginBottom: '8px' }}>★★★★★</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              "The 1986 Argentina Maradona kit is pure nostalgia. The material and collar are spot on. Delivered to Bangalore in 3 days!"
            </p>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>— Rohit S., Bengaluru</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--gold-primary)', marginBottom: '8px' }}>★★★★★</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              "Ordered via WhatsApp and paid with UPI QR code. Jason verified the payment within minutes and shared the tracking number. Legit service."
            </p>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>— Ashwin K., Chennai</div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--gold-primary)', marginBottom: '8px' }}>★★★★★</div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
              "Real Madrid Player Version fits like a glove. Heat-sealed badge is top tier. Easily the best football jersey store in South India."
            </p>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>— Vignesh M., Coimbatore</div>
          </div>
        </div>
      </section>
    </div>
  );
}
