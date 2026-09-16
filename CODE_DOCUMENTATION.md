# Crown & Cross — Code Documentation (CC-Hosting-Public)

This document details the frontend architecture, component hierarchy, state management, and payment integrations in `CC-Hosting-Public`.

---

## 1. Directory Structure

```
CC-Hosting-Public/
├── app/
│   ├── layout.jsx               # Root layout with CartProvider & global wrappers
│   ├── globals.css              # Olive Green & Gold design tokens & typography
│   ├── page.jsx                 # Home / Catalog / Showcase page
│   ├── product/[id]/page.jsx    # Product Detail Page (PDP) with Carousel
│   ├── size-guide/page.jsx      # Dimension tables & fit specs
│   ├── about/page.jsx           # Manifesto & brand story
│   ├── shipping-policy/page.jsx # Shipping terms & delivery SLAs
│   ├── returns-policy/page.jsx  # 5-7 days exchange guidelines
│   ├── terms/page.jsx           # Legal terms of service
│   ├── privacy/page.jsx         # DPDPA compliance privacy policy
│   └── request-estimate/page.jsx# Bulk team order inquiry form
├── components/
│   ├── Navbar.jsx               # Header with logo, nav links, and cart toggle
│   ├── Footer.jsx               # Brand footer with contact info & policy links
│   ├── ProductCard.jsx          # Catalog kit card with hover scaling & quick add
│   ├── JerseyCarousel.jsx       # Swipe/arrow/dot-count responsive carousel
│   ├── CartDrawer.jsx           # Slide-out cart with shipping meter & checkout
│   ├── UpiModal.jsx             # Client-side dynamic UPI QR code generator
│   └── LayoutClientWrapper.jsx  # Client boundary for global modals
├── context/
│   └── CartContext.jsx          # React Context for cart state & LocalStorage
├── lib/
│   └── products.js              # Data reader for products.json
├── public/
│   ├── data/products.json       # Master catalog database
│   └── images/logo.jpeg         # Brand emblem asset
├── .gitignore                   # Submodule ignore rules
└── package.json                 # Next.js frontend manifest
```

---

## 2. State Management: `context/CartContext.jsx`

The global shopping cart is managed via React Context and automatically synchronizes with browser `localStorage` under the key `cc_cart`.

### Exposed Context Values:
- **`items`**: Array of cart items `{ key, id, name, size, price, mrp, image, category, subCategory, quantity }`.
- **`addToCart(product, size, quantity)`**: Adds or updates an item in the cart.
- **`updateQuantity(key, delta)`**: Modifies item count; automatically removes items when quantity reaches 0.
- **`removeItem(key)`**: Removes a line item.
- **`subtotal`**: Sum of item prices × quantities.
- **`isFreeShipping`**: Boolean (`subtotal >= 1499`).
- **`shipping`**: `0` if empty or free shipping unlocked, otherwise `80` (Standard fee).
- **`grandTotal`**: `subtotal + shipping`.
- **`amountToFreeShipping`**: `Math.max(0, 1499 - subtotal)`.
- **`freeShippingProgress`**: Percentage (`0` to `100%`) driving the progress bar.
- **`activeUpiOrder` / `setActiveUpiOrder`**: Controls the visibility and payload of the instant UPI QR payment modal.

---

## 3. Image Carousel: `components/JerseyCarousel.jsx`

Built to satisfy the exact requirement: **Swipe, Click Arrow, Count Dots**.
- **Mobile Swipe**: Tracks `onTouchStart`, `onTouchMove`, and `onTouchEnd`. A horizontal delta of `> 45px` triggers previous/next transitions.
- **Click Arrows**: Floating circular buttons positioned on the left and right edges for desktop users.
- **Count Dots**: An indicator pill rendering individual dots for each image in `safeImages`, highlighting the active index.
- **Thumbnail Strip**: Scrollable thumbnails for direct jumping between angles.

---

## 4. Payment Integrations

### WhatsApp Direct Link (`wa.me`)
Constructs an encoded query string (`https://wa.me/917695924602?text=...`) containing:
- Unique Order ID (`CC-XXXXXX`)
- Itemized jersey titles, quality tiers, sizes, and quantities
- Subtotal, shipping charge, and grand total
- Customer delivery address and optional notes

### Dynamic Client-Side UPI QR (`components/UpiModal.jsx`)
Encodes a standard NPCI UPI URI:
```
upi://pay?pa=jasonclement.jm-1@okhdfcbank&pn=Jason%20Clement&am={grandTotal}&tn=Order%20{orderId}&cu=INR
```
The `qrcode` package converts this URI to a high-resolution base64 PNG data URL in the user's browser, allowing payment through Google Pay, PhonePe, Paytm, or BHIM without any backend server.

---

## 5. Automated Email Service: `/api/estimate`

Powered by the official **Resend** SDK (`resend`).

### Endpoint Specification:
- **Method:** `POST`
- **Route:** `/api/estimate`
- **Headers:** `Content-Type: application/json`

### Request Payload:
```json
{
  "name": "Arun Kumar",
  "phone": "+91 98765 43210",
  "email": "arun@example.com",
  "organization": "Marina FC",
  "kitType": "Club Classic",
  "qualityTier": "Player Version",
  "quantity": 14,
  "customNames": "Yes",
  "notes": "Need customized name and numbers for tournament on Oct 15"
}
```

### Response Codes:
- `200 OK`: `{ success: true, id: "msg_xxx", message: "Estimate request emailed to crownandcross29@gmail.com successfully." }`
- `400 Bad Request`: Missing mandatory fields (`name` or `phone`).
- `503 Service Unavailable`: Triggered if `RESEND_API_KEY` is missing or set to placeholder; frontend gracefully exposes direct WhatsApp and `mailto:` buttons.
- `502 Bad Gateway`: Upstream Resend API delivery rejection.

### Email Layout & Styling:
Generates an inline-styled, dark-mode luxury HTML email containing:
- Crown & Cross gold header emblem.
- Structured specification table with clickable `wa.me` customer response link.
- Automated `replyTo` header pointing directly to the customer's submitted email.

### Vercel Production Environment Setup:
To enable live transactional emailing in production:
1. Navigate to **Vercel Dashboard** → `CC-Hosting-Public` → **Settings** → **Environment Variables**.
2. Add the following keys:
   | Variable | Value | Required | Description |
   |---|---|---|---|
   | `RESEND_API_KEY` | `re_...` | **Yes** | Generated secret key from [resend.com/api-keys](https://resend.com/api-keys) |
   | `ESTIMATE_NOTIFICATION_EMAIL` | `crownandcross29@gmail.com` | Optional | Inbox receiving team jersey requests (defaults to `crownandcross29@gmail.com`) |
   | `RESEND_FROM_EMAIL` | `Crown & Cross <orders@yourdomain.com>` | Optional | Verified custom sender address in Resend (defaults to sandbox `onboarding@resend.dev`) |
3. Trigger a **Redeploy** on Vercel to inject new environment variables into the serverless runtime.
4. **Fallback Handling**: If `RESEND_API_KEY` is not provided or fails, the frontend dynamically presents fallback options: a direct pre-filled WhatsApp quotation chat and a pre-composed `mailto:` link.
