import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--olive-deep)',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '80px',
        padding: '60px 24px 30px'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img
              src="/images/logo.jpeg"
              alt="Crown & Cross Logo"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid var(--gold-primary)',
                objectFit: 'cover'
              }}
            />
            <span className="serif-heading" style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold-primary)' }}>
              CROWN & CROSS
            </span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '14px' }}>
            "Some wear fashion. We wear football." Crafted for purists and kit connoisseurs across India. Premium player versions, master copies, and immortal retros.
          </p>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            📍 Based in <strong>Chennai, Tamil Nadu</strong>
          </div>
        </div>

        {/* Quick Shopping Links */}
        <div>
          <h4
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              fontWeight: 700,
              marginBottom: '18px'
            }}
          >
            Collections
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li>
              <Link href="/#club" style={{ color: 'var(--text-secondary)' }}>
                Club Kits (23/24 & 24/25)
              </Link>
            </li>
            <li>
              <Link href="/#country" style={{ color: 'var(--text-secondary)' }}>
                National Teams
              </Link>
            </li>
            <li>
              <Link href="/#retro" style={{ color: 'var(--gold-light)' }}>
                ★ Immortal Retro Editions
              </Link>
            </li>
            <li>
              <Link href="/size-guide" style={{ color: 'var(--text-secondary)' }}>
                Sizing & Fit Specifications
              </Link>
            </li>
            <li>
              <Link href="/request-estimate" style={{ color: 'var(--text-secondary)' }}>
                Bulk & Team Estimates
              </Link>
            </li>
          </ul>
        </div>

        {/* Trust & Customer Support */}
        <div>
          <h4
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              fontWeight: 700,
              marginBottom: '18px'
            }}
          >
            Support & Orders
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li>
              <a
                href="https://wa.me/917695924602"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4ade80', fontWeight: 600 }}
              >
                💬 WhatsApp: +91 76959 24602
              </a>
            </li>
            <li>
              <a href="mailto:crownandcross29@gmail.com" style={{ color: 'var(--text-secondary)' }}>
                ✉️ crownandcross29@gmail.com
              </a>
            </li>
            <li style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              ⏱️ UPI Payee: <strong>Jason Clement</strong>
            </li>
            <li style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              📦 Delivery: 3–5 Days (Metro) • 5–8 Days (Rest of India)
            </li>
          </ul>
        </div>

        {/* Legal & Policies */}
        <div>
          <h4
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              fontWeight: 700,
              marginBottom: '18px'
            }}
          >
            Policies
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li>
              <Link href="/shipping-policy" style={{ color: 'var(--text-secondary)' }}>
                Shipping & Delivery Policy (₹80 / Free &gt; ₹1499)
              </Link>
            </li>
            <li>
              <Link href="/returns-policy" style={{ color: 'var(--text-secondary)' }}>
                Returns & Sizing Exchange (5–7 Days)
              </Link>
            </li>
            <li>
              <Link href="/terms" style={{ color: 'var(--text-secondary)' }}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>
                Privacy Policy & Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-muted)',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          © {new Date().getFullYear()} <strong>Crown & Cross</strong>. Wear Your Club. Wear Your Story. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Powered by Next.js & Vercel</span>
          <span>•</span>
          <span>Founder: Jason Clement</span>
        </div>
      </div>
    </footer>
  );
}
