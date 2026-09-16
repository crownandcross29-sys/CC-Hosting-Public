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

### 🔑 Configuring the Resend API Key in Vercel (For Automated Estimates)

The team/bulk jersey estimate request form (`/request-estimate`) sends email quotations to `crownandcross29@gmail.com` using the **Resend** transactional email API.

Follow these steps to configure it in Vercel:

#### Step 1: Obtain your Resend API Key
1. Go to [https://resend.com](https://resend.com) and log in (or create a free account).
2. Navigate to **API Keys** in the sidebar ([https://resend.com/api-keys](https://resend.com/api-keys)).
3. Click **Create API Key**.
4. Name: `Crown & Cross Storefront`.
5. Permission: **Full Access** or **Sending Access**.
6. Copy your generated key (starts with `re_...`).

#### Step 2: Add to Vercel Environment Variables
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and select your **`CC-Hosting-Public`** project.
2. Click **Settings** (top navigation tab) → **Environment Variables** (left sidebar).
3. Add the following variable:
   * **Key:** `RESEND_API_KEY`
   * **Value:** `re_your_copied_key_here`
   * **Target Environments:** Check all: **Production**, **Preview**, **Development**.
4. Click **Save**.

#### Step 3: (Optional) Custom Sender & Notification Address
By default, the app uses Resend's sandbox (`onboarding@resend.dev`) and delivers notifications to `crownandcross29@gmail.com`. You can optionally add:
* **`ESTIMATE_NOTIFICATION_EMAIL`**: Recipient inbox (e.g. `crownandcross29@gmail.com`).
* **`RESEND_FROM_EMAIL`**: Custom verified sender (e.g. `Crown & Cross <orders@yourdomain.com>`) once your custom domain is verified in Resend.

#### Step 4: Apply to Deployment
> [!IMPORTANT]
> In Vercel, new environment variables apply to **subsequent builds**.
> After saving the variable, go to the **Deployments** tab, click **`...`** on the latest deployment, and click **Redeploy** (or push a new commit to `main`).

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
  - **Bulk & Team Estimate Request Form (`/request-estimate`)**: Automated email quotation dispatch powered by **Resend** to `crownandcross29@gmail.com` with instant WhatsApp fallback.

---

## ⚙️ Environment Variables (Email Service)

Create `.env.local` in `CC-Hosting-Public/` (copied from `.env.example`):

```bash
# Resend API Key (Obtain from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Recipient for estimate email alerts
ESTIMATE_NOTIFICATION_EMAIL=crownandcross29@gmail.com

# Verified sender address (Use onboarding@resend.dev during testing)
RESEND_FROM_EMAIL=Crown & Cross <onboarding@resend.dev>
```

> **Note on Vercel:** Add `RESEND_API_KEY` to your Vercel Project Settings under **Environment Variables** for production email delivery.

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