'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function UpiModal({ orderDetails, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    orderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`,
    amount = 1499,
    items = [],
    customer = {}
  } = orderDetails || {};

  const upiId = 'jasonclement.jm-1@okhdfcbank';
  const payeeName = 'Jason Clement';
  const note = `Order ${orderId}`;

  // UPI deep link
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount}&tn=${encodeURIComponent(note)}&cu=INR`;

  useEffect(() => {
    QRCode.toDataURL(upiUri, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0d140f',
        light: '#ffffff'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR generation error', err));
  }, [upiUri]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareScreenshotText = `Hello Jason, I have completed the UPI payment of ₹${amount} for Order #${orderId}.\n\nItems:\n${items
    .map((i) => `• ${i.name} (Size: ${i.size}) x${i.quantity}`)
    .join('\n')}\n\nCustomer: ${customer.name || 'Customer'}\nPhone: ${
    customer.phone || 'N/A'
  }\nAddress: ${customer.address || 'N/A'}, ${customer.city || ''} ${customer.pincode || ''}\n\nAttaching payment screenshot here!`;

  const waScreenshotUrl = `https://wa.me/917695924602?text=${encodeURIComponent(
    shareScreenshotText
  )}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'grid',
        placeItems: 'center',
        padding: '20px'
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-active)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '480px',
          padding: '30px 28px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '999px', background: 'var(--gold-glow)', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
          UPI Instant QR Payment
        </div>

        <h3 className="serif-heading" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Order #{orderId}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          Scan using any UPI App (GPay, PhonePe, Paytm, CRED, BHIM)
        </p>

        {/* QR Display */}
        <div
          style={{
            background: '#ffffff',
            padding: '16px',
            borderRadius: '16px',
            display: 'inline-block',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            marginBottom: '18px'
          }}
        >
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="UPI QR Code" style={{ width: '220px', height: '220px', display: 'block' }} />
          ) : (
            <div style={{ width: '220px', height: '220px', display: 'grid', placeItems: 'center', color: '#111' }}>
              Generating QR...
            </div>
          )}
        </div>

        {/* Amount Pill */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Payable Amount</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--gold-primary)' }}>₹{amount}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Verified Payee</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Jason Clement</span>
          </div>
        </div>

        {/* Copy UPI ID */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-primary)',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '22px',
            fontSize: '12px'
          }}
        >
          <code style={{ color: 'var(--gold-light)' }}>{upiId}</code>
          <button
            onClick={handleCopyUpi}
            style={{
              background: 'transparent',
              border: 'none',
              color: copied ? '#4ade80' : 'var(--gold-primary)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copied ? '✓ Copied!' : 'Copy VPA'}
          </button>
        </div>

        {/* Next step prompt */}
        <div
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '12px 14px',
            fontSize: '12px',
            color: '#bbf7d0',
            textAlign: 'left',
            marginBottom: '18px',
            lineHeight: 1.5
          }}
        >
          <strong>Next step to confirm dispatch:</strong> After paying, click below to send your payment screenshot to our official WhatsApp (<strong>+91 76959 24602</strong>).
        </div>

        {/* Action button */}
        <a
          href={waScreenshotUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: '#22c55e',
            color: '#0d140f',
            fontWeight: 800,
            fontSize: '14px',
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(34, 197, 94, 0.3)'
          }}
        >
          Send Screenshot on WhatsApp 💬
        </a>
      </div>
    </div>
  );
}
