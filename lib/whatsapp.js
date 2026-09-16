/**
 * Universal WhatsApp Link Builder & Launcher
 * Engineered for 100% reliable deep linking across:
 * - PC (Windows, macOS, Linux - Desktop App + WhatsApp Web)
 * - Mobile (Android & iOS / iPhone / iPad - Native App)
 */

export const OFFICIAL_PHONE = '917695924602';

/**
 * Cleans phone number to strictly digits in international format (no +, no spaces, no dashes)
 */
export function cleanPhoneNumber(phone = OFFICIAL_PHONE) {
  return String(phone).replace(/[^0-9]/g, '');
}

/**
 * Sanitizes message text by replacing Unicode box-drawing characters and exotic symbols
 * that cause WhatsApp's redirect handler to drop or corrupt query string parameters.
 */
export function sanitizeWhatsAppText(text = '') {
  if (!text) return '';
  return text
    .replace(/[━─═┈┉—]/g, '-')
    .replace(/[^\x00-\x7F\u0900-\u097F\u00A0-\u024F\u20A0-\u20CF\u2600-\u26FF\u2700-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF]/g, '')
    .trim();
}

/**
 * Builds the official universal WhatsApp URL (api.whatsapp.com).
 * This is the standard web fallback and works natively on any browser.
 */
export function getWhatsAppUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  const encoded = encodeURIComponent(sanitized);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}

/**
 * Builds the native deep-link protocol URL (whatsapp://send).
 * Directly launches the WhatsApp desktop or mobile client.
 */
export function getWhatsAppProtocolUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  const encoded = encodeURIComponent(sanitized);
  return `whatsapp://send?phone=${cleanPhone}&text=${encoded}`;
}

/**
 * Builds direct WhatsApp Web URL for desktop browsers.
 */
export function getWhatsAppWebUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  const encoded = encodeURIComponent(sanitized);
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}

/**
 * Interactive WhatsApp Launcher:
 * - Mobile (Android & iOS / iPhone): Invokes native `whatsapp://send` scheme to open
 *   the app instantly with phone and pre-typed message. If app is not present, falls back
 *   to universal link.
 * - Desktop (Windows, macOS, Linux): Attempts to launch native desktop app via protocol.
 *   If not installed or user prefers web, gracefully opens the official universal web link.
 */
export function triggerWhatsApp({ text = '', phone = OFFICIAL_PHONE, e = null }) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  const encoded = encodeURIComponent(sanitized);

  const nativeAppUrl = `whatsapp://send?phone=${cleanPhone}&text=${encoded}`;
  const universalUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // On iOS & Android: deep-link directly into WhatsApp application
    window.location.href = nativeAppUrl;

    // Safety fallback: if app not installed after 1s, redirect to universal link
    setTimeout(() => {
      if (typeof document !== 'undefined' && document.hasFocus()) {
        window.location.href = universalUrl;
      }
    }, 1000);
    return;
  }

  // Desktop (Windows / Mac / Linux):
  // 1. Try launching the desktop app
  let hasNavigated = false;
  const onBlur = () => {
    hasNavigated = true;
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('blur', onBlur, { once: true });
  }

  try {
    const tempLink = document.createElement('a');
    tempLink.href = nativeAppUrl;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  } catch (_) {
    window.location.href = nativeAppUrl;
  }

  // 2. If after 1.4s the user has not switched to the desktop app (app not installed or prompt ignored),
  // open the official web interface so the customer is never stuck
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('blur', onBlur);
      if (!hasNavigated && document.hasFocus()) {
        window.open(universalUrl, '_blank', 'noopener,noreferrer');
      }
    }
  }, 1400);
}
