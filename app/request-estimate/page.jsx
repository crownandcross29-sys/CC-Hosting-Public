'use client';

import { useState } from 'react';
import { MailCheck, Send, MessageCircle, RefreshCw } from 'lucide-react';

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

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const buildWhatsAppText = () => {
    return `👑 *CROWN & CROSS — BULK / TEAM ESTIMATE REQUEST*\n━━━━━━━━━━━━━━━━━━━━━\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nTeam/Club: ${formData.organization || 'Individual/Group'}\n\nKit Type: ${formData.kitType}\nQuality Tier: ${formData.qualityTier}\nEstimated Quantity: ${formData.quantity} kits\nCustom Names & Numbers: ${formData.customNames}\n\nAdditional Requirements:\n${formData.notes || 'None'}\n\nPlease provide a customized price quote and delivery timeline!`;
  };

  const handleOpenWhatsAppDirect = () => {
    const waUrl = `https://wa.me/917695924602?text=${encodeURIComponent(buildWhatsAppText())}`;
    window.open(waUrl, '_blank');
  };

  const handleOpenMailto = () => {
    const subject = encodeURIComponent(`Crown & Cross — Estimate Request: ${formData.name}`);
    const body = encodeURIComponent(buildWhatsAppText());
    window.location.href = `mailto:crownandcross29@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        // If Resend API key is not yet configured or error
        if (data.isConfigError) {
          setErrorNotice({
            type: 'config',
            msg: 'The server email service is awaiting the RESEND_API_KEY. You can still send your request instantly via WhatsApp or Email client below:'
          });
        } else {
          setErrorNotice({
            type: 'general',
            msg: data.error || 'Failed to dispatch email. Please use WhatsApp or Email client below.'
          });
        }
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorNotice({
        type: 'network',
        msg: 'Connection error while contacting email server. Please use WhatsApp or Email client below.'
      });
    } finally {
      setLoading(false);
    }
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
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <MailCheck size={48} color="var(--gold-primary)" />
            </div>
            <h3 className="serif-heading" style={{ fontSize: '24px', color: 'var(--gold-primary)', marginBottom: '8px' }}>
              Estimate Request Emailed Successfully!
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Your requirements have been sent to <strong>crownandcross29@gmail.com</strong>. Founder <strong>Jason Clement</strong> will review your specifications and reply with a custom quotation within 24 hours.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleOpenWhatsAppDirect}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  backgroundColor: '#22c55e',
                  color: '#0d140f',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)'
                }}
              >
                <MessageCircle size={16} />
                <span>Also Chat on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorNotice(null);
                }}
                style={{
                  padding: '12px 22px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Error Notification Banner if Resend Key is missing or failed */}
            {errorNotice && (
              <div
                style={{
                  backgroundColor: 'rgba(234, 179, 8, 0.1)',
                  border: '1px solid rgba(234, 179, 8, 0.4)',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  fontSize: '13px',
                  color: '#fef08a',
                  lineHeight: 1.5
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '6px' }}>
                  ℹ️ {errorNotice.msg}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirect}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#22c55e',
                      color: '#0d140f',
                      fontWeight: 700,
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    💬 Send via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenMailto}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--gold-primary)',
                      color: '#0d140f',
                      fontWeight: 700,
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ✉️ Send via Mail App
                  </button>
                </div>
              </div>
            )}

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
                  Customer Email (For Estimate Quotation) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                />
              </div>

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
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
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
                  Quality Standard
                </label>
                <select
                  value={formData.qualityTier}
                  onChange={(e) => setFormData({ ...formData, qualityTier: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
                >
                  <option value="Player Version">Player Version (Slim fit)</option>
                  <option value="Master Copy">Master Copy (1:1 standard)</option>
                  <option value="Fan Version Set">Fan Version Set (Durable)</option>
                  <option value="Embroidered">Embroidered</option>
                  <option value="Sublimation">Sublimation</option>
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
                Specific Kit Details, Sizes, or Tournament Deadlines
              </label>
              <textarea
                rows="3"
                placeholder="Mention specific clubs (e.g. 12x Arsenal Away), sizes breakdown (e.g. 4M, 6L, 2XL), target tournament date..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: '1 1 240px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--gold-primary)',
                  color: '#0d140f',
                  fontWeight: 800,
                  fontSize: '14px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 16px rgba(200, 169, 106, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Sending Estimate Email...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Email Estimate Request</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenWhatsAppDirect}
                style={{
                  flex: '1 1 200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: '#22c55e',
                  color: '#0d140f',
                  fontWeight: 800,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.25)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                <MessageCircle size={16} />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
