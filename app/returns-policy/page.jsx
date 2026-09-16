import { getWhatsAppUrl } from '../../lib/whatsapp';

export const metadata = {
  title: 'Returns & Exchange Policy — Crown & Cross',
  description: '5-7 day sizing exchange terms, return eligibility, and refund guidelines.'
};

export default function ReturnsPolicyPage() {
  return (
    <div style={{ maxWidth: '840px', margin: '60px auto 100px', padding: '0 24px' }}>
      <h1 className="serif-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '12px' }}>
        Returns &amp; Sizing Exchange Policy
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '36px' }}>
        Last Updated: September 2026 • Hassle-Free Sizing Exchanges
      </p>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '28px', fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            1. Sizing Exchange Window (5–7 Days)
          </h2>
          <p>
            We want you to wear your club with pride and comfort. If your jersey does not fit as expected, we provide a <strong>5–7 day sizing exchange window</strong> starting from the recorded delivery date.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            2. Mandatory Exchange Conditions
          </h2>
          <p>To qualify for a sizing exchange, the following criteria must be satisfied:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Tags Intact:</strong> Original brand tags and polybag must be intact and attached.</li>
            <li><strong>Unworn &amp; Unwashed:</strong> The garment must be completely unworn (beyond trying on for size), unwashed, and free of stains, deodorant marks, or fragrance.</li>
            <li><strong>Non-Customized:</strong> Standard catalog jerseys only. Custom-printed jerseys with personalized names and numbers are not eligible for exchange.</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            3. How to Initiate an Exchange
          </h2>
          <ol style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              Send a message to our WhatsApp support at{' '}
              <a
                href={getWhatsAppUrl("Hello Crown & Cross, I would like to initiate a sizing exchange")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4ade80', fontWeight: 700, textDecoration: 'underline' }}
              >
                +91 76959 24602
              </a>{' '}
              or email{' '}
              <a
                href="mailto:crownandcross29@gmail.com?subject=Sizing%20Exchange%20Request"
                style={{ color: 'var(--gold-primary)', fontWeight: 700, textDecoration: 'underline' }}
              >
                crownandcross29@gmail.com
              </a>{' '}
              with your Order ID and photos showing the tags intact.
            </li>
            <li>Specify the replacement size you require (e.g. swap Size M for Size L).</li>
            <li>Our team will verify stock and arrange reverse pickup or provide shipping instructions to our Chennai address.</li>
            <li>Upon quality inspection of the returned jersey, your new size will be dispatched immediately with fresh tracking details.</li>
          </ol>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            4. Manufacturing Defects &amp; Refunds
          </h2>
          <p>
            In the unlikely event that an item is received with a verifiable stitching or fabric defect, we offer an immediate free replacement or full UPI refund back to your originating account.
          </p>
        </div>
      </div>
    </div>
  );
}
