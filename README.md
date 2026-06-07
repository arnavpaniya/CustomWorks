# CustomWorks – Website Development README

> Full-stack e-commerce platform. Customization-first brand. Made-to-order products.  
> References: Nike.com/in · vistaprint.in · aarashi.co.in (theme)  
> Stack decision: developer's choice – recommendations below.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Recommended Tech Stack](#2-recommended-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Environment Variables](#4-environment-variables)
5. [Frontend – Page-by-Page Spec](#5-frontend--page-by-page-spec)
6. [Product Customization Flow](#6-product-customization-flow)
7. [Backend & API Spec](#7-backend--api-spec)
8. [Database Schema (Key Models)](#8-database-schema-key-models)
9. [Admin Dashboard Spec](#9-admin-dashboard-spec)
10. [Integrations](#10-integrations)
11. [Order Status Flow](#11-order-status-flow)
12. [Notifications](#12-notifications)
13. [Performance & SEO](#13-performance--seo)
14. [Accessibility](#14-accessibility)
15. [Optional / Future Features](#15-optional--future-features)
16. [Design System & UI Guidelines](#16-design-system--ui-guidelines)
17. [Priority Matrix](#17-priority-matrix)
18. [Dev Setup Instructions](#18-dev-setup-instructions)

---

## 1. Project Overview

**Brand:** CustomWorks  
**Type:** Customization-first e-commerce store. Products made-to-order.  
**Core Value:** User designs product → submits → admin approves design → production → ship.  
**Target Devices:** Mobile-first. Full responsive across mobile, tablet, desktop.  
**Tone:** Premium, modern, minimal, clean. Not cluttered. Not cheap-looking.

---

## 2. Recommended Tech Stack

### Frontend
| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG for SEO, fast, image optimization built-in |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid build, consistent design tokens |
| State | **Zustand** | Cart, design wizard state – simple, no boilerplate |
| Canvas/Preview | **Fabric.js** or **Konva.js** | Live product customization canvas |
| Animations | **Framer Motion** | Smooth transitions, premium feel |
| Forms | **React Hook Form + Zod** | Validation, type-safe |

### Backend
| Layer | Choice |
|---|---|
| Runtime | **Node.js + Express** OR **Next.js API routes** (if monorepo) |
| Database | **PostgreSQL** (primary) + **Redis** (sessions, cache) |
| ORM | **Prisma** |
| File Storage | **AWS S3** or **Cloudflare R2** (uploaded designs, invoices, product images) |
| Auth | **NextAuth.js** (Google OAuth + credentials) |
| Email | **Nodemailer** + **Resend** or **SendGrid** |
| SMS | **Twilio** or **MSG91** (India-focused) |
| Payments | Gateway provided by CustomWorks (integrate as directed) |

### Infra
- Hosting: **Vercel** (frontend) + **Railway / Render** (backend if separate)
- CDN: Cloudflare
- Domain: Provided by client

---

## 3. Folder Structure

```
customworks/
├── apps/
│   ├── web/                        # Next.js frontend
│   │   ├── app/
│   │   │   ├── (public)/           # Public routes
│   │   │   │   ├── page.tsx        # Home
│   │   │   │   ├── products/
│   │   │   │   │   ├── page.tsx    # Product listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx # Product detail + customization
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   ├── faq/
│   │   │   │   ├── privacy-policy/
│   │   │   │   ├── refund-policy/
│   │   │   │   └── corporate/      # Bulk/corporate orders page
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (account)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── orders/
│   │   │   │   │   └── [id]/
│   │   │   │   ├── saved-designs/
│   │   │   │   └── wishlist/
│   │   │   └── (admin)/            # Admin dashboard – protected
│   │   │       ├── dashboard/
│   │   │       ├── orders/
│   │   │       ├── products/
│   │   │       ├── designs/        # Design approval queue
│   │   │       ├── customers/
│   │   │       └── invoices/
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn base components
│   │   │   ├── layout/             # Header, Footer, MobileMenu
│   │   │   ├── home/               # Homepage sections
│   │   │   ├── product/            # Product cards, gallery
│   │   │   ├── customizer/         # Canvas, wizard steps, preview
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── common/             # Contact button, breadcrumbs, etc.
│   │   ├── lib/
│   │   │   ├── api.ts              # API client
│   │   │   ├── auth.ts
│   │   │   ├── utils.ts
│   │   │   └── validators/
│   │   ├── store/                  # Zustand stores
│   │   │   ├── cart.store.ts
│   │   │   └── design.store.ts
│   │   └── public/
│   │       ├── images/
│   │       └── fonts/
├── packages/
│   ├── db/                         # Prisma schema + migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── types/                      # Shared TypeScript types
└── apps/api/                       # Express backend (if separate from Next.js)
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── services/
    └── utils/
```

---

## 4. Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://customworks.in
NEXT_PUBLIC_APP_NAME=CustomWorks

# Database
DATABASE_URL=postgresql://user:password@host:5432/customworks
REDIS_URL=redis://localhost:6379

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://customworks.in
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Storage (S3 or R2)
STORAGE_BUCKET_NAME=
STORAGE_REGION=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_ENDPOINT=           # for Cloudflare R2

# Payment Gateway (details from CustomWorks)
PAYMENT_API_KEY=
PAYMENT_SECRET=
PAYMENT_WEBHOOK_SECRET=

# Email
EMAIL_FROM=orders.customworks@gmail.com
RESEND_API_KEY=             # or SENDGRID_API_KEY

# SMS
MSG91_API_KEY=
MSG91_SENDER_ID=

# Admin
ADMIN_EMAIL=orders.customworks@gmail.com
```

---

## 5. Frontend – Page-by-Page Spec

### 5.1 Header (All Pages)

**Desktop/Laptop:**
- Sticky header. Full navigation menu visible.
- Logo left. Nav center. Search + Account + Wishlist + Cart icons right.
- Nav items: `Home | Products | Corporate Orders | About | Contact`
- `Corporate Orders` link → `/corporate` page.
- Search bar: keyword + product suggestions dropdown (autocomplete).

**Mobile/Tablet:**
- Hamburger icon → slide-in drawer menu.
- Same nav items in drawer.
- Cart icon always visible in mobile header (with item count badge).

---

### 5.2 Home Page (`/`)

**Sections (top to bottom):**

1. **Hero Banner**
   - Full-width image/video background.
   - Headline: brand tagline.
   - Two CTA buttons: `Customize Now` → `/products` | `Design Your Product` → `/products` (or specific product).
   - Autoplay video or image carousel (3–5 slides).

2. **Featured & Trending Custom Products**
   - Horizontal scroll or grid. 4–8 products.
   - Each card: product image, name, starting price, `Customize` button.

3. **How It Works** (3-step visual)
   - Step 1: Choose Product → Step 2: Customize → Step 3: We Deliver

4. **Brand Content Section**
   - Mix of photos, short videos, customer showcase images.
   - Masonry grid or full-bleed layout.

5. **Why CustomWorks?**
   - Icon grid: Quality Guaranteed | Fast Turnaround | 100% Customizable | Secure Payment

6. **Customer Testimonials & Reviews**
   - Carousel. Name, photo (optional), rating (stars), review text.
   - Source: pulled from DB or manually curated by admin.

7. **Corporate / Bulk Orders CTA Banner**
   - Full-width banner section.
   - Text: "Need bulk orders for your business?" + CTA button → `/corporate`

8. **Footer**
   - Links: About | Contact | FAQ | Privacy Policy | Refund Policy | Corporate Orders
   - Social media icons: Instagram (links from admin config).
   - Email contact link: orders.customworks@gmail.com.
   - Copyright text.

---

### 5.3 Product Listing Page (`/products`)

- Filter sidebar (desktop) / filter drawer (mobile): Category, Price range, Material, Color.
- Sort: Newest, Price Low→High, Price High→Low, Most Popular.
- Product grid: image, name, price, customize button, wishlist icon.
- Pagination or infinite scroll.
- Search results also render here with search term shown.

---

### 5.4 Product Detail & Customization Page (`/products/[slug]`)

Two-panel layout on desktop:
- **Left:** Product image gallery (main + thumbnails). Zoom on hover.
- **Right:** Product name, description, variants selector (size/color/material), price, reviews summary.

Below or tabbed:
- **Customization Wizard** (full spec in Section 6)
- **Full Description & Details**
- **Reviews & Ratings** (list + submit form for verified buyers)

Buttons: `Add to Cart` | `Customize Now` | `Add to Wishlist`

---

### 5.5 Cart Page (`/cart`)

- List all cart items. Each item shows:
  - Product thumbnail, name, variant, customization summary (text/image applied).
  - Quantity selector.
  - Per-item price (dynamic, quantity-based).
  - Remove button.
- Order Summary panel:
  - Subtotal, GST (auto-calculated), Shipping (auto or flat/free threshold), Coupon discount.
  - Total.
- Coupon/discount code input.
- `Proceed to Checkout` CTA button.

---

### 5.6 Checkout Page (`/checkout`)

- **Step 1: Address** – Shipping address form (name, phone, address line 1/2, city, state, pincode).
- **Step 2: Payment** – Gateway provided by CustomWorks. Secure checkout badge visible.
- **Step 3: Review & Place Order** – Summary of items, address, totals. `Place Order` button.
- Google login option shown if user not logged in (encourage login before checkout, not force).
- Post-order: redirect to `/orders/[id]` with confirmation.

---

### 5.7 My Account (`/account/dashboard`)

Sections:
- Profile info (name, email, phone, edit option).
- Order history list → click → order detail.
- Saved designs.
- Wishlist.
- Logout.

---

### 5.8 Order Detail Page (`/account/orders/[id]`)

- Order ID, date placed, items, customization per item.
- Current status + visual status tracker (step bar):
  `Designing → Processing → Ready to Ship → Dispatched → Delivered`
- Invoice download button (PDF uploaded by admin).
- **Modification Request** – Button → opens a prefilled email draft to `orders.customworks@gmail.com`.
- Return/Exchange request button (as per policy, policy-gated logic).

---

### 5.9 Corporate Orders Page (`/corporate`)

- Hero section: "Bulk & Corporate Orders – Made for Your Business"
- What's offered: bulk pricing, branded merchandise, custom packaging, dedicated account manager.
- Product categories available for corporate orders.
- CTA: "Email us for pricing & quotes" → prefilled email draft to `orders.customworks@gmail.com`.
- Optional: inquiry form (name, company, requirement, quantity estimate, email, phone).

---

### 5.10 Static Pages

| Route | Content |
|---|---|
| `/about` | Brand story, team, mission, values |
| `/contact` | Contact form + email link + address |
| `/faq` | Accordion – customization FAQs + delivery FAQs |
| `/privacy-policy` | Legal text (provided by client or standard) |
| `/refund-policy` | Refund, Return & Custom Order Policy (provided by client) |

---

### 5.11 Floating Email Button

- Fixed position, bottom-right corner, all pages.
- Email icon. On click → `mailto:orders.customworks@gmail.com`.
- Subtle tooltip on hover: "Email us".
- Visible on both mobile and desktop.

---

## 6. Product Customization Flow

### Where it lives
- On product detail page (`/products/[slug]`), below variant selector.
- Or opens as a full-screen modal/drawer on `Customize Now` click.

### Wizard Steps

**Step 1: Choose Variant**
- Select size, color, material (product-specific options from DB).
- Price updates dynamically.

**Step 2: Customize Design**
- Canvas area: rendered product mockup as base image.
- Tools available:
  - **Add Text:** font picker, font size, color picker, bold/italic. Drag to reposition on canvas.
  - **Upload Image/Logo:** accepts JPG, PNG, SVG. Max 10MB. Drag to reposition, resize handles.
  - **Color Fill:** change product base color (if product supports it).
  - **Placement Selector:** front / back / left-sleeve / right-sleeve (product-specific placement zones).
- Live preview updates in real-time as user edits.
- Canvas built with **Fabric.js** or **Konva.js**.

**Step 3: Preview**
- Full preview of product with applied customization.
- "Looks good!" confirmation.
- Option to go back and edit.

**Step 4: Quantity & Price**
- Quantity input. Price updates per quantity tier (e.g., 1–4: ₹X, 5–9: ₹Y, 10+: ₹Z).
- Final price shown clearly.

**Step 5: Add to Cart**
- Design state serialized (JSON + canvas image snapshot → stored in S3).
- Added to cart with customization summary attached.

**Progress Indicator:** step bar at top of wizard showing current step number.

**Save Design for Later:** button saves current canvas state to user's account (`/account/saved-designs`). Requires login. Prompt login if not logged in.

---

## 7. Backend & API Spec

### Auth Routes
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/google          # OAuth
POST   /api/auth/logout
GET    /api/auth/me
```

### Product Routes
```
GET    /api/products             # List with filters & pagination
GET    /api/products/:slug       # Single product detail
GET    /api/products/search?q=   # Search
```

### Customization Routes
```
POST   /api/designs              # Save design (upload canvas snapshot to S3)
GET    /api/designs/:id
GET    /api/designs/user/:userId # Saved designs for user
DELETE /api/designs/:id
```

### Cart Routes
```
GET    /api/cart                 # Get cart (session or user-linked)
POST   /api/cart/add
PUT    /api/cart/:itemId
DELETE /api/cart/:itemId
DELETE /api/cart/clear
```

### Order Routes
```
POST   /api/orders               # Create order (post-payment confirmation)
GET    /api/orders               # User's order history
GET    /api/orders/:id           # Single order detail
PATCH  /api/orders/:id/status    # Admin: update status
POST   /api/orders/:id/invoice   # Admin: upload invoice PDF
GET    /api/orders/:id/invoice   # User: download invoice
```

### Coupon Routes
```
POST   /api/coupons/validate     # Validate coupon code, return discount
```

### Review Routes
```
POST   /api/reviews
GET    /api/reviews/product/:productId
```

### Admin Routes (protected – admin role only)
```
GET    /api/admin/orders         # All orders, filterable by status
PATCH  /api/admin/orders/:id     # Edit order details
GET    /api/admin/designs        # Pending design approvals
PATCH  /api/admin/designs/:id    # Approve or reject design
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/admin/analytics/summary
GET    /api/admin/customers
```

### Webhook Route
```
POST   /api/webhooks/payment     # Payment gateway webhook → create order on success
```

---

## 8. Database Schema (Key Models)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  phone         String?
  passwordHash  String?
  googleId      String?
  role          Role     @default(CUSTOMER)
  orders        Order[]
  designs       Design[]
  reviews       Review[]
  wishlist      WishlistItem[]
  createdAt     DateTime @default(now())
}

enum Role { CUSTOMER ADMIN }

model Product {
  id            String   @id @default(cuid())
  slug          String   @unique
  name          String
  description   String
  basePrice     Float
  images        String[] // S3 URLs
  category      String
  variants      ProductVariant[]
  customOptions Json     // placement zones, customizable fields
  priceTiers    Json     // [{minQty: 1, maxQty: 4, price: 499}, ...]
  isActive      Boolean  @default(true)
  reviews       Review[]
  createdAt     DateTime @default(now())
}

model ProductVariant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id])
  size      String?
  color     String?
  material  String?
  stockQty  Int     @default(0)
  priceAdj  Float   @default(0) // price adjustment from base
}

model Design {
  id           String   @id @default(cuid())
  userId       String?
  user         User?    @relation(fields: [userId], references: [id])
  productId    String
  canvasJson   Json     // Fabric.js / Konva serialized state
  previewUrl   String   // S3 URL of rendered preview image
  status       DesignStatus @default(PENDING)
  adminNote    String?
  createdAt    DateTime @default(now())
}

enum DesignStatus { PENDING APPROVED REJECTED }

model Order {
  id              String      @id @default(cuid())
  userId          String?
  user            User?       @relation(fields: [userId], references: [id])
  items           OrderItem[]
  subtotal        Float
  gstAmount       Float
  shippingAmount  Float
  discountAmount  Float       @default(0)
  total           Float
  couponCode      String?
  status          OrderStatus @default(DESIGNING)
  shippingAddress Json
  paymentId       String?
  invoiceUrl      String?     // S3 URL of PDF
  customerNote    String?
  adminNote       String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

enum OrderStatus {
  DESIGNING
  PROCESSING
  READY_TO_SHIP
  DISPATCHED
  DELIVERED
  CANCELLED
  RETURN_REQUESTED
  RETURNED
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id])
  productId   String
  variantId   String?
  designId    String?
  quantity    Int
  unitPrice   Float
  customSummary String? // human-readable: "Blue, L, Custom text: 'John'"
}

model Coupon {
  id            String   @id @default(cuid())
  code          String   @unique
  discountType  String   // "PERCENT" | "FLAT"
  discountValue Float
  minOrderValue Float?
  maxUses       Int?
  usedCount     Int      @default(0)
  expiresAt     DateTime?
  isActive      Boolean  @default(true)
}

model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int      // 1-5
  body      String?
  createdAt DateTime @default(now())
}

model WishlistItem {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
}
```

---

## 9. Admin Dashboard Spec

Access: `/admin/*` routes. Role = ADMIN only. Redirect non-admins to home.

### Dashboard Home (`/admin/dashboard`)
- Summary cards: Total Orders Today, Pending Design Approvals, Revenue Today, New Customers.
- Best-selling products list.
- Popular custom options chart (basic bar or pie chart).
- Recent orders table.

### Order Management (`/admin/orders`)
- Table: Order ID, Customer, Date, Items, Total, Status, Actions.
- Filter by status, date range, search by order ID or customer name.
- Click order → order detail page.
- On detail: edit order fields, change status (dropdown), add admin note, upload invoice PDF (drag-drop), one-click print invoice.
- Email shortcut button per order → opens a prefilled email draft with the order ID.

### Design Approval Queue (`/admin/designs`)
- List of submitted designs with status = PENDING.
- Each row: order/design ID, product, customer name, preview thumbnail, date.
- Click → full preview. Two buttons: `Approve` | `Reject` (with rejection reason field).
- On approve → order status auto-moves from DESIGNING → PROCESSING.

### Product Management (`/admin/products`)
- Create / Edit / Delete products.
- Fields: name, slug, description, category, base price, price tiers (JSON editor or structured inputs), variants, custom options config, image upload (multi-image, S3).
- Toggle product active/inactive.

### Customer List (`/admin/customers`)
- Table: name, email, phone, orders count, join date.
- Click → customer detail (order history, contact info).

### Invoices (`/admin/invoices`)
- Upload invoice PDF per order.
- Template reference provided by CustomWorks (apply branding to PDF template in code).
- One-click print button (opens browser print dialog with invoice).

### Analytics (`/admin/analytics`)
- Basic: best-selling products, popular customization options, orders by status count.
- No advanced analytics in MVP (optional future).

---

## 10. Integrations

### Google OAuth
- NextAuth.js Google provider.
- On first login → create User record in DB.
- Link existing account by email if already registered.

### Payment Gateway
- Details provided by CustomWorks. Build generic payment service wrapper.
- Webhook endpoint `/api/webhooks/payment` → verify signature → create Order in DB → trigger email/SMS notification.

### Email Contact Integration
- Use prefilled `mailto:` links for customer support and quote requests.
- Customer support button: `mailto:orders.customworks@gmail.com`
- Order modification: `mailto:orders.customworks@gmail.com?subject=Modify request for Order #{orderId}`
- Admin support contact: `orders.customworks@gmail.com`

### S3 / R2 File Storage
- Product images → `customworks/products/{productId}/`
- Design previews → `customworks/designs/{designId}/preview.png`
- Design canvas JSON → `customworks/designs/{designId}/canvas.json`
- Invoices → `customworks/invoices/{orderId}/invoice.pdf`
- All uploads server-side (presigned URLs for direct browser upload where needed).

### Email (Nodemailer + Resend/SendGrid)
Triggers: order placed, order status change, design approved/rejected.

### SMS (MSG91 or Twilio)
Triggers: same as email. Short text with order ID and status.

---

## 11. Order Status Flow

```
[Customer submits order with design]
          ↓
     DESIGNING          ← Admin reviews design in approval queue
          ↓  (admin approves)
     PROCESSING         ← Production started
          ↓
   READY_TO_SHIP        ← Admin marks ready
          ↓
     DISPATCHED         ← Tracking info added (manual by admin)
          ↓
     DELIVERED          ← Auto or admin marks delivered

Side paths:
  Any status → CANCELLED (admin or customer before PROCESSING)
  DELIVERED → RETURN_REQUESTED → RETURNED (per policy)
```

- Status change by admin via dashboard dropdown (manual).
- Each status change triggers email + SMS to customer.
- Customer sees visual step tracker on order detail page.

---

## 12. Notifications

| Event | Email | SMS |
|---|---|---|
| Order placed | ✅ | ✅ |
| Design approved | ✅ | ✅ |
| Design rejected | ✅ | ✅ |
| Status → Processing | ✅ | ✅ |
| Status → Ready to Ship | ✅ | ✅ |
| Status → Dispatched | ✅ | ✅ |
| Status → Delivered | ✅ | ✅ |
| Return approved | ✅ | optional |

Email templates: branded, include order summary, CustomWorks logo, and support email link.

---

## 13. Performance & SEO

- **Images:** Next.js `<Image>` component everywhere. WebP format. Lazy load below fold.
- **Fonts:** self-hosted via `next/font`. No Google Fonts external call.
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1 target.
- **SEO:**
  - Dynamic `<title>` and `<meta description>` per page.
  - OG tags for social sharing.
  - `/sitemap.xml` auto-generated (next-sitemap or custom).
  - `/robots.txt` configured.
  - SEO-friendly URLs: `/products/custom-printed-tshirt` not `/products/123`.
  - Structured data (JSON-LD) for product pages (Product schema).
- **Caching:** Redis cache for product listings, search results. TTL: 5 min.

---

## 14. Accessibility

- All interactive elements keyboard-navigable (Tab order logical).
- ARIA labels on icon-only buttons (cart, wishlist, search).
- Color contrast ratio ≥ 4.5:1 for all text.
- Skip-to-content link at top of page.
- Focus-visible styles on all focusable elements.
- Alt text on all product images.
- Readable fonts – minimum 16px body text.
- Form error messages linked to inputs via `aria-describedby`.

---

## 15. Optional / Future Features

These are **not** in MVP. Note in codebase with `// TODO: FUTURE` comments and stub routes where relevant.

| Feature | Notes |
|---|---|
| 360° Product View | Integrate Three.js or similar for 3D product spin |
| AR Preview | WebAR – user holds phone to surface, sees product in AR |
| Multi-language | i18n with `next-intl`. Start with EN + HI |
| Bulk/Corporate Order Module | Already covered by `/corporate` page. Full module = RFQ system, bulk pricing table, corporate account tier |
| Abandoned Cart Reminders | Email trigger: cart inactive 24h. Use queue (BullMQ + Redis) |
| Recently Viewed Products | Store in localStorage + optionally user account |
| Advanced Analytics | Revenue charts, conversion funnel, customer LTV |

---

## 16. Design System & UI Guidelines

### Feel
- Premium, clean, minimal. Think Nike.com/in meets Vistaprint utility.
- Generous whitespace. Not cluttered.
- Strong product imagery. Customization = hero experience.

### Colors
- Define in `tailwind.config.js` as brand tokens.
- Suggested base: Black + White + one brand accent (e.g. vibrant orange or electric blue – confirm with client).
- All colors accessible contrast-checked.

### Typography
- Heading font: geometric sans-serif (e.g. Inter, Satoshi, or client-provided).
- Body: clean sans-serif, 16px base.
- Hierarchy: clear H1 > H2 > H3 > body scale.

### Components Priority Build Order
1. Header + Footer
2. Product Card
3. Customization Wizard (most complex – build early)
4. Cart + Checkout flow
5. Order tracking page
6. Admin dashboard

### Animations
- Page transitions: Framer Motion fade/slide.
- Canvas interactions: smooth drag, resize handles on design elements.
- CTA buttons: hover scale + color shift.
- Loading states: skeleton screens (not spinners) for product lists.

---

## 17. Priority Matrix

| Feature | Priority |
|---|---|
| Product pages with variants | MUST |
| Customization wizard + live preview | MUST |
| Cart + Checkout + Payment integration | MUST |
| Order tracking with status flow | MUST |
| Admin order management + status control | MUST |
| Design approval system | MUST |
| Email CTA buttons | MUST |
| Google login | MUST |
| Email + SMS notifications | MUST |
| Mobile-first responsive design | MUST |
| Customer testimonials | GOOD |
| Why CustomWorks section | GOOD |
| Accessibility standards | GOOD |
| SEO optimization | GOOD |
| Performance optimization | GOOD |
| Invoice upload + download + print | MUST |
| Coupon/discount codes | MUST |
| Saved designs | GOOD |
| Wishlist | GOOD |
| Corporate orders page | MUST |
| 360° view / AR | OPTIONAL |
| Multi-language | OPTIONAL |
| Abandoned cart reminders | OPTIONAL |
| Advanced analytics | OPTIONAL |

---

## 18. Dev Setup Instructions

```bash
# 1. Clone repo
git clone https://github.com/your-org/customworks.git

# 2. Install dependencies (monorepo – use npm)
npm install

# 3. Setup environment variables
cp apps/web/.env.example apps/web/.env.local
# Fill in all values from Section 4 above

# 4. Setup database
cd packages/db
npx prisma migrate dev --name init
npx prisma generate

# 5. Seed initial data (products, admin user)
npx prisma db seed

# 6. Run dev servers
# Terminal 1 – Frontend
cd apps/web && npm run dev

# Terminal 2 – API (if separate)
cd apps/api && npm run dev

# 7. Access
# Frontend:  http://localhost:3000
# Admin:     http://localhost:3000/admin  (login with ADMIN_EMAIL seed)
# API:       http://localhost:3001/api
```

### First Things to Build (Suggested Order)
1. DB schema + Prisma setup
2. Auth (NextAuth – Google + credentials)
3. Product CRUD (admin) + product listing/detail pages
4. Customization wizard (canvas core)
5. Cart + price calculation logic
6. Checkout + payment gateway webhook
7. Order creation + status flow
8. Admin dashboard + design approval
9. Email/SMS notifications
10. All static pages (About, FAQ, etc.)
11. Performance + SEO pass
12. Accessibility audit

---

> All gateway credentials, support email, domain, invoice template, and brand assets to be provided by **CustomWorks** before development begins.  
> Confirm final color palette and logo with client before building design system.
# CustomWorks
