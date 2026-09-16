/**
 * Universal WhatsApp Link Builder & Launcher
 * Engineered for maximum cross-platform flexibility across:
 * - PC / Windows / Mac / Linux (Native Desktop App + WhatsApp Web)
 * - Mobile (Android & iOS / iPhone / iPad Native App)
 */

export const OFFICIAL_PHONE = '917695924602';

/**
 * Cleans phone number to strictly digits in international format (no +, no spaces, no dashes)
 */
export function cleanPhoneNumber(phone = OFFICIAL_PHONE) {
  return String(phone).replace(/[^0-9]/g, '');
}

/**
 * Sanitizes message text while preserving valid characters and standardizing dashes and bullet points.
 */
export function sanitizeWhatsAppText(text = '') {
  if (!text) return '';
  return text
    .replace(/\uFFFD/g, '') // Strip any stray Unicode replacement characters ()
    .replace(/[━─═┈┉—]/g, '-')
    .replace(/[•●]/g, '-')
    .trim();
}

/**
 * Builds the official universal WhatsApp Click-to-Chat URL (wa.me).
 * Standard fallback for mobile web and universal deep linking.
 */
export function getWhatsAppUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  if (!sanitized) {
    return `https://wa.me/${cleanPhone}`;
  }
  const encoded = encodeURIComponent(sanitized);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

/**
 * Native protocol URL (whatsapp://send)
 */
export function getWhatsAppProtocolUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  if (!sanitized) {
    return `whatsapp://send?phone=${cleanPhone}`;
  }
  const encoded = encodeURIComponent(sanitized);
  return `whatsapp://send?phone=${cleanPhone}&text=${encoded}`;
}

/**
 * Direct WhatsApp Web URL (Strictly without trailing slash before query parameters).
 * Format: https://web.whatsapp.com/send?phone=...&text=...
 */
export function getWhatsAppWebUrl(text = '', phone = OFFICIAL_PHONE) {
  const cleanPhone = cleanPhoneNumber(phone);
  const sanitized = sanitizeWhatsAppText(text);
  if (!sanitized) {
    return `https://web.whatsapp.com/send?phone=${cleanPhone}`;
  }
  const encoded = encodeURIComponent(sanitized);
  return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}


/**
 * Interactive WhatsApp Launcher:
 * - Mobile (Android & iOS): Uses whatsapp:// to launch the native mobile app directly,
 *   with an automated fallback to wa.me (App Store/Play Store) if not installed.
 * - Desktop (Windows, macOS, Linux): Synchronously opens direct WhatsApp Web (web.whatsapp.com/send?phone=...)
 *   targeting the dedicated tab 'crown_and_cross_whatsapp' (strictly NO trailing slash).
 *
 * IMPORTANT DEVELOPER GUARD RAIL:
 * This function MUST be invoked synchronously inside a trusted user click event (e.g., in an onClick handler).
 * Do NOT precede this call with `await`, `setTimeout`, or asynchronous Promise chains, as severing
 * the browser's user activation token will cause desktop popup blockers to intercept `window.open`.
 */
export function triggerWhatsApp({ text = '', phone = OFFICIAL_PHONE, e = null }) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }

  const cleanPhone = cleanPhoneNumber(phone);

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // On iOS & Android: launch native mobile WhatsApp app
    const mobileUrl = getWhatsAppProtocolUrl(text, cleanPhone);
    const fallbackUrl = getWhatsAppUrl(text, cleanPhone);

    window.location.href = mobileUrl;

    // Mobile safety fallback: if WhatsApp is not installed on the device,
    // the page remains visible. After 1.5s, route to wa.me (prompts App Store / Play Store installation)
    setTimeout(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        window.location.href = fallbackUrl;
      }
    }, 1500);
    return;
  }

  // On Desktop (Windows / macOS / Linux):
  // Synchronously open WhatsApp Web with a named window target ('crown_and_cross_whatsapp')
  // strictly without trailing slash (/send?phone=...).
  // Benefits:
  // 1. Instantaneous response (no 1200ms lag).
  // 2. Immune to browser popup blockers (runs synchronously within the click event).
  // 3. Eliminates OS permission prompt blur race conditions.
  // 4. Reuses the tab across repeat checkout clicks to avoid multi-session conflicts.
  const desktopWebUrl = getWhatsAppWebUrl(text, cleanPhone);

  if (typeof window !== 'undefined') {
    window.open(desktopWebUrl, 'crown_and_cross_whatsapp');
  }
}
