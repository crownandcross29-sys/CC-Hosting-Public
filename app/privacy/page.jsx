export const metadata = {
  title: 'Privacy Policy — Crown & Cross',
  description: 'How Crown & Cross protects your customer data.'
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '840px', margin: '60px auto 100px', padding: '0 24px' }}>
      <h1 className="serif-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--gold-primary)', marginBottom: '12px' }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '36px' }}>
        Compliance with Digital Personal Data Protection Act (DPDPA), India
      </p>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            1. Information We Collect
          </h2>
          <p>
            When you interact with our cart or dispatch orders via WhatsApp or email, we collect only necessary fulfillment information: your name, contact phone number, shipping address, and optional order notes.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            2. Purpose of Data Processing
          </h2>
          <p>
            Your information is processed exclusively for order packing, courier shipping labels, WhatsApp delivery updates, and sizing exchange support. We do not sell, rent, or lease your personal contact details to any third-party advertisers.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            3. Local Storage &amp; Cookies
          </h2>
          <p>
            We use browser LocalStorage strictly to preserve your active cart items across page visits on your own device. No intrusive tracking pixels or third-party behavioral cookies are installed.
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            4. Contact
          </h2>
          <p>
            For any data questions or privacy inquiries, contact <strong>crownandcross29@gmail.com</strong> or message <strong>+91 76959 24602</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
