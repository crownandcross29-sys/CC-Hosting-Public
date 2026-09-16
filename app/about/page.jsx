import Link from 'next/link';

export const metadata = {
  title: 'Our Story & Brand Ethos — Crown & Cross',
  description: 'Crown & Cross was born out of a pure love for football culture in Chennai, Tamil Nadu.'
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '860px', margin: '60px auto 100px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img
          src="/images/logo.jpeg"
          alt="Crown & Cross"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            border: '2px solid var(--gold-primary)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            marginBottom: '20px'
          }}
        />
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
          The Crown &amp; Cross Manifesto
        </span>
        <h1 className="serif-heading" style={{ fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>
          Some wear fashion.<br />We wear football.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--gold-light)', fontStyle: 'italic', marginTop: '12px' }}>
          "Wear Your Club. Wear Your Story."
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: 1.7, fontSize: '15px', color: 'var(--text-secondary)' }}>
        <div>
          <h2 className="serif-heading" style={{ fontSize: '24px', color: 'var(--gold-primary)', marginBottom: '12px' }}>
            Who We Are
          </h2>
          <p>
            Founded by <strong>Jason Clement</strong> in <strong>Chennai, Tamil Nadu</strong>, Crown &amp; Cross was born out of frustration with flimsy fast-fashion jerseys and overpriced retail drops that lose their crest after three washes.
          </p>
          <p style={{ marginTop: '12px' }}>
            To us, a football jersey is not a piece of polyester. It is a historical archive. It carries the weight of 1986 in Mexico, the euphoria of the 1999 Camp Nou treble, the majesty of Highbury 2004, and the tribal pride of your local supporters' club on a Saturday night.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h2 className="serif-heading" style={{ fontSize: '24px', color: 'var(--gold-primary)', marginBottom: '12px' }}>
            Our Craft &amp; Curation
          </h2>
          <p>
            We curate kits across three distinct eras: <strong>Club Classics</strong>, <strong>National Teams</strong>, and <strong>Immortal Retros</strong>. Every jersey in our inventory is categorized into one of five honest quality grades:
          </p>
          <ul style={{ paddingLeft: '24px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Player Version:</strong> Authentic on-pitch athletic cut with heat-applied crests and breathability channels.</li>
            <li><strong>Master Copy:</strong> 1:1 reproductions faithful to every original seam and tag.</li>
            <li><strong>Fan Version Set:</strong> Durable, embroidered, relaxed-fit matchday armor.</li>
            <li><strong>Embroidered:</strong> Heavyweight tactile stitches built for the long haul.</li>
            <li><strong>Sublimation:</strong> Infused color dyes that never peel or degrade.</li>
          </ul>
        </div>

        {/* Placeholder for Jason's finalized "Our Story" text (promised by EOD) */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', backgroundColor: 'var(--bg-elevated)', padding: '20px', borderRadius: '16px', border: '1px dashed rgba(200, 169, 106, 0.4)' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--gold-primary)', marginBottom: '6px' }}>
            Founder's Note — Jason Clement
          </div>
          <p style={{ fontStyle: 'italic', fontSize: '14px', color: 'var(--text-primary)' }}>
            "Whether you're playing 5-a-side on a humid Chennai turf, chanting with your supporters' club in Bangalore, or framing a Maradona grail on your bedroom wall — we make sure you wear your colors with the honor they deserve."
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Link
            href="/#catalog"
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              backgroundColor: 'var(--gold-primary)',
              color: '#0d140f',
              fontWeight: 800,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Explore The Collection →
          </Link>
        </div>
      </div>
    </div>
  );
}
