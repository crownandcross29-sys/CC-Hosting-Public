# Crown & Cross — Public Storefront

> **The official online storefront for Crown & Cross football jerseys.**  
> *"Some wear fashion. We wear football."* • *"Wear Your Club. Wear Your Story."*

Built with **Next.js (App Router)** and designed with an **Olive Green & Gold** sports luxury aesthetic. Deployed seamlessly to **Vercel**.

---

## ⚡ Quick Start (< 5 Minutes)

### Prerequisites
- **Node.js**: v18.0+
- **npm**: v9.0+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🌐 Deploy to Vercel

This repository is structured for one-click deployment on [Vercel](https://vercel.com):

1. Import this repository (`CC-Hosting-Public`) into your Vercel dashboard.
2. Framework Preset: **Next.js**.
3. Root Directory: `./`.
4. Build Command: `npm run build` (or Next.js default).
5. Output Directory: `.next`.
6. Click **Deploy**.

Every commit to `main` will trigger an automated redeployment with zero downtime.

---

## ✨ Features

- **Hero & Heritage Showcase**: High-impact brand statement, football culture ethos, and quick action filters.
- **Dynamic Catalog Filtering**:
  - Filter by Category: **Club**, **Country**, **★ Retro Classics**.
  - Filter by Quality Tier: **Player Version**, **Master Copy**, **Fan Version Set**, **Embroidered**, **Sublimation**.
  - Live search by kit name, team, or season.
- **Product Detail Page (PDP)**:
  - **Interactive Image Carousel**: Mobile touch-swipe, desktop click-arrows, dot counts, and thumbnail selection.
  - Sizing selector with live measurement guide modal.
  - One-click "Add to Cart" and direct "Buy Now with WhatsApp".
- **Slide-out Cart Drawer**:
  - **Free Shipping Progress Meter**: Real-time progress towards the ₹1,499 free shipping threshold (Standard fee ₹80).
  - Size and quantity adjustments with LocalStorage persistence.
- **Dual Checkout System**:
  - **1. WhatsApp Direct Order**: Automatically constructs a structured cart breakdown sent to `+91 76959 24602`.
  - **2. Instant UPI QR Code Generator**: Generates client-side QR codes for payee **Jason Clement** (`jasonclement.jm-1@okhdfcbank`).
- **Complete Trust & Policy Suite**:
  - Size & Fit Guide (`/size-guide`)
  - Our Story & Brand Ethos (`/about`)
  - Shipping Policy (`/shipping-policy`) — 3–5 days metro, 5–8 days pan-India.
  - Returns & Exchange Policy (`/returns-policy`) — 5–7 days sizing exchange.
  - Terms of Service (`/terms`) & Privacy Policy (`/privacy`).
  - Bulk & Team Estimate Request Form (`/request-estimate`).

---

## 🎨 Design Tokens (Olive Green & Gold)

- **Background:** Rich Pitch Olive (`#0d140f`), Surface Olive (`#131e17`), Elevated Olive (`#19271e`)
- **Accents:** Champagne / Warm Gold (`#c8a96a`, `#dfc185`, `#f4e8cb`)
- **Typography:** Playfair Display (Serif Headings), Plus Jakarta Sans (UI Body), Bebas Neue (Sports Badges)

---

## 📚 Documentation
- [Code Documentation (Components & State)](CODE_DOCUMENTATION.md)
- [Design Philosophy (UX & Aesthetics)](DESIGN_PHILOSOPHY.md)

---

## 📞 Support & Inquiries
- **WhatsApp:** [+91 76959 24602](https://wa.me/917695924602)
- **Email:** crownandcross29@gmail.com
- **Base:** Chennai, Tamil Nadu, India
- **Owner:** Jason Clement