import Link from 'next/link';

export const metadata = {
  title: 'Size & Fit Guide — Crown & Cross',
  description: 'Accurate jersey measurements for Player Version and Fan/Retro editions.'
};

export default function SizeGuidePage() {
  return (
    <div style={{ maxWidth: '960px', margin: '60px auto 100px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
          Fit With Confidence
        </span>
        <h1 className="serif-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
          Size &amp; Fit Guide
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Football jerseys vary between athletic on-pitch cuts and classic fan fits. Use our guide below to choose your ideal fit.
        </p>
      </div>

      {/* Difference Explainer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}
      >
        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', background: 'var(--gold-glow)', color: 'var(--gold-primary)', fontSize: '11px', fontWeight: 800, marginBottom: '10px' }}>
            SLIM ATHLETIC CUT
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Player Version
          </h3>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            Cut slim to hug the torso, exactly as worn by professional players on the pitch. Crafted with curved hems and micro-vented mesh.
          </p>
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--gold-light)', fontWeight: 600 }}>
            💡 Pro Tip: If you prefer a relaxed regular fit, size up by 1 size.
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '11px', fontWeight: 800, marginBottom: '10px' }}>
            STANDARD RELAXED FIT
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Fan Version, Master Copy &amp; Retro
          </h3>
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            True-to-size regular comfort fit. Built for everyday wear, matchdays at the pub, or street styling.
          </p>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#86efac', fontWeight: 600 }}>
            💡 Pro Tip: Order your regular T-shirt size.
          </div>
        </div>
      </div>

      {/* Measurement Table */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '20px', overflow: 'hidden', marginBottom: '40px' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold-primary)' }}>
            Jersey Dimension Chart (Inches)
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tolerance ±0.5"</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left' }}>Size</th>
                <th style={{ padding: '14px 20px' }}>Chest Width</th>
                <th style={{ padding: '14px 20px' }}>Jersey Length</th>
                <th style={{ padding: '14px 20px' }}>Shoulder</th>
                <th style={{ padding: '14px 20px' }}>Recommended Height</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'left', color: 'var(--gold-primary)' }}>S (Small)</td>
                <td style={{ padding: '14px 20px' }}>37 – 39"</td>
                <td style={{ padding: '14px 20px' }}>27.5"</td>
                <td style={{ padding: '14px 20px' }}>17.0"</td>
                <td style={{ padding: '14px 20px' }}>5'4" – 5'7"</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'left', color: 'var(--gold-primary)' }}>M (Medium)</td>
                <td style={{ padding: '14px 20px' }}>39 – 41"</td>
                <td style={{ padding: '14px 20px' }}>28.5"</td>
                <td style={{ padding: '14px 20px' }}>18.0"</td>
                <td style={{ padding: '14px 20px' }}>5'7" – 5'10"</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'left', color: 'var(--gold-primary)' }}>L (Large)</td>
                <td style={{ padding: '14px 20px' }}>41 – 43"</td>
                <td style={{ padding: '14px 20px' }}>29.5"</td>
                <td style={{ padding: '14px 20px' }}>19.0"</td>
                <td style={{ padding: '14px 20px' }}>5'10" – 6'1"</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'left', color: 'var(--gold-primary)' }}>XL (X-Large)</td>
                <td style={{ padding: '14px 20px' }}>43 – 45"</td>
                <td style={{ padding: '14px 20px' }}>30.5"</td>
                <td style={{ padding: '14px 20px' }}>20.0"</td>
                <td style={{ padding: '14px 20px' }}>6'0" – 6'3"</td>
              </tr>
              <tr>
                <td style={{ padding: '14px 20px', fontWeight: 800, textAlign: 'left', color: 'var(--gold-primary)' }}>XXL (2X-Large)</td>
                <td style={{ padding: '14px 20px' }}>45 – 47"</td>
                <td style={{ padding: '14px 20px' }}>31.5"</td>
                <td style={{ padding: '14px 20px' }}>21.0"</td>
                <td style={{ padding: '14px 20px' }}>6'2"+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Exchange Assurance */}
      <div style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Still unsure about which size to pick?
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Don't worry — we offer an easy <strong>5–7 day sizing exchange</strong> for unworn jerseys with tags intact.
        </p>
        <Link
          href="/returns-policy"
          style={{
            display: 'inline-block',
            padding: '10px 22px',
            borderRadius: '999px',
            backgroundColor: 'var(--gold-primary)',
            color: '#0d140f',
            fontSize: '13px',
            fontWeight: 800,
            textDecoration: 'none'
          }}
        >
          Read Exchange Policy
        </Link>
      </div>
    </div>
  );
}
