'use client';

import { useState } from 'react';

export default function RequestEstimatePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    kitType: 'Club Classic',
    qualityTier: 'Player Version',
    quantity: 10,
    customNames: 'Yes',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `👑 *CROWN & CROSS — BULK / TEAM ESTIMATE REQUEST*\n━━━━━━━━━━━━━━━━━━━━━\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nTeam/Club: ${formData.organization || 'Individual/Group'}\n\nKit Type: ${formData.kitType}\nQuality Tier: ${formData.qualityTier}\nEstimated Quantity: ${formData.quantity} kits\nCustom Names & Numbers: ${formData.customNames}\n\nAdditional Requirements:\n${formData.notes || 'None'}\n\nPlease provide a customized price quote and delivery timeline!`;

    const waUrl = `https://wa.me/917695924602?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto 100px', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)' }}>
          Bulk Kits &amp; Team Orders
        </span>
        <h1 className="serif-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
          Request an Estimate
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Outfitting your 5-a-side squad, college team, corporate tournament, or local supporters' club? We offer tiered wholesale pricing and customized dispatch.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-card)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 className="serif-heading" style={{ fontSize: '24px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              Estimate Request Prepared!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              We have opened WhatsApp to connect you directly with Jason. If it didn't open automatically, message us directly at <strong>+91 76959 24602</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                backgroundColor: 'var(--gold-primary)',
                color: '#0d140f',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jason Clement"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  WhatsApp Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Team / Club / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marina FC, Chennai"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Estimated Quantity *
                </label>
                <input
                  type="number"
                  min="5"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Preferred Kit Type
                </label>
                <select
                  value={formData.kitType}
                  onChange={(e) => setFormData({ ...formData, kitType: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                >
                  <option value="Club Classic">Club Classic</option>
                  <option value="National Team">National Team</option>
                  <option value="Retro Grails">Retro Grails</option>
                  <option value="Custom Sublimation Team Kit">Custom Sublimation Team Kit</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Preferred Quality Tier
                </label>
                <select
                  value={formData.qualityTier}
                  onChange={(e) => setFormData({ ...formData, qualityTier: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                >
                  <option value="Player Version">Player Version (Slim athletic fit)</option>
                  <option value="Master Copy">Master Copy (1:1 standard)</option>
                  <option value="Fan Version Set">Fan Version Set (Durable embroidered)</option>
                  <option value="Full Sublimation">Full Sublimation (Dye-infused)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Require Custom Player Names &amp; Numbers?
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['Yes', 'No', 'Not sure yet'].map((opt) => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="customNames"
                      value={opt}
                      checked={formData.customNames === opt}
                      onChange={(e) => setFormData({ ...formData, customNames: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Specific Kit Details, Sizes, or Tournament Dates
              </label>
              <textarea
                rows="3"
                placeholder="Mention specific clubs (e.g. 10x Arsenal Away), sizes breakdown (e.g. 4M, 4L, 2XL), tournament deadline..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: 'var(--gold-primary)',
                color: '#0d140f',
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(200, 169, 106, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Send Estimate Request via WhatsApp 💬
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
