# CustomWorks — Admin Dashboard Build Guide

A step-by-step document to scaffold, build, and run the complete admin system for CustomWorks. Follow sections in order.

---

## 1. Project Structure to Create

Run once inside the root `customworks/` folder:

```bash
mkdir -p backend/{routes,middleware,models,uploads/designs,uploads/invoices}
mkdir -p admin/src
touch backend/.env backend/server.js
touch backend/models/{User.js,Order.js,Product.js,Design.js}
touch backend/routes/{auth.js,orders.js,designs.js,analytics.js,invoices.js}
touch backend/middleware/auth.js
touch admin/src/{index.html,dashboard.html}
touch .gitignore
```

Final layout:

```
customworks/
├── admin.md                  ← this file
├── .gitignore
├── client/                   ← existing customer-facing site (untouched)
├── backend/                  ← shared Express API
│   ├── .env
│   ├── server.js
│   ├── models/
│   │   ├── User.js           ← customer accounts, Google login data
│   │   ├── Order.js          ← full order: items, customization, payment, status
│   │   ├── Product.js        ← products, variants, pricing
│   │   └── Design.js         ← uploaded customer artwork per order item
│   ├── routes/
│   │   ├── auth.js           ← admin login → JWT
│   │   ├── orders.js         ← list, detail, status update, notes
│   │   ├── designs.js        ← approval queue, approve/reject
│   │   ├── analytics.js      ← revenue, bestsellers, popular customizations
│   │   └── invoices.js       ← upload/download/print invoice per order
│   └── middleware/
│       └── auth.js           ← JWT verify + admin role guard
└── admin/
    └── src/
        ├── index.html        ← login page
        └── dashboard.html    ← full admin dashboard (single HTML file, no build step)
```

---

## 2. .gitignore

Add to root `.gitignore`:

```
backend/.env
admin/.env
node_modules/
backend/uploads/
*.log
```

---

## 3. Backend Environment File

Create `backend/.env`:

```env
# Server
PORT=4000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/customworks

# Admin login
ADMIN_USERNAME=mohit
ADMIN_PASSWORD=mohit123

# JWT — generate: openssl rand -hex 32
JWT_SECRET=replace_with_32char_secret
JWT_EXPIRES_IN=24h

# CORS origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://customworks.in,https://admin.customworks.in

# Email (for order status notifications to customer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=orders.customworks@gmail.com
SMTP_PASS=your_app_password

# SMS (Fast2SMS)
SMS_API_KEY=your_key
SMS_SENDER_ID=CSTMWK

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# File limits
MAX_FILE_SIZE_MB=10
UPLOAD_DIR=./uploads
```

---

## 4. Backend Dependencies

```bash
cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors helmet \
  express-rate-limit multer nodemailer dotenv
npm install --save-dev nodemon
```

Add to `backend/package.json` scripts:

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

## 5. Backend — `server.js`

```js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/orders',    require('./routes/orders'));
app.use('/api/designs',   require('./routes/designs'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/invoices',  require('./routes/invoices'));

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Connect DB then start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Backend running on :${process.env.PORT}`)
    );
  })
  .catch(err => { console.error(err); process.exit(1); });
```

---

## 6. Backend — `middleware/auth.js`

Verifies JWT on every protected admin route.

```js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token' });

  try {
    req.admin = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
```

---

## 7. Backend — `routes/auth.js`

Admin login. Compares username + password from `.env`, returns JWT.

```js
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  if (username !== process.env.ADMIN_USERNAME)
    return res.status(401).json({ error: 'Invalid credentials' });

  // Plain password check (replace with bcrypt hash in production)
  const valid = password === process.env.ADMIN_PASSWORD;
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, username });
});

module.exports = router;
```

---

## 8. Backend — `models/Order.js`

This model mirrors every field the client collects. Build it with these fields:

```
Order fields (what client sends → what admin sees):

CUSTOMER INFO
  customer          → ObjectId ref User
  customerSnapshot  → { name, email, phone }   ← frozen at order time

ORDER ITEMS (array, one per product in cart)
  product           → ObjectId ref Product
  productName       → string (snapshot)
  variant           → { size, color, material } ← from variant selector
  quantity          → number                     ← from cart
  unitPrice         → number
  totalPrice        → number
  customization     → {
    text,           ← custom text entered
    fontStyle,
    textColor,
    placement,      ← front/back/sleeve etc
    uploadedImageUrl← customer logo/artwork URL
    additionalNotes
  }
  designStatus      → pending_approval | approved | change_requested | not_required

PRICING
  subtotal          → before discount
  discountCode      → coupon code used
  discountAmount    → amount deducted
  gst               → calculated GST
  shippingCharge    → calculated shipping
  totalAmount       → final amount

PAYMENT
  paymentStatus     → pending | partial | paid | cod | refunded | failed
  amountPaid        → number
  amountDue         → totalAmount - amountPaid
  paymentMethod     → razorpay | cod | upi
  paymentGatewayId  → gateway transaction ref
  paymentHistory    → array of { amount, method, paidAt, note }

SHIPPING ADDRESS (snapshot)
  { name, phone, line1, line2, city, state, pincode }

ORDER STATUS
  status            → designing | processing | ready_to_ship |
                       dispatched | delivered | return_requested |
                       returned | cancelled | closed
  statusHistory     → array of { status, changedAt, changedBy, note }
  trackingNumber    → string (filled when dispatched)
  trackingUrl       → string

INVOICE
  invoiceUrl        → uploaded PDF path
  invoiceUploadedAt → date

ADMIN NOTES
  adminNotes        → array of { note, addedBy, addedAt }

RETURN / EXCHANGE
  returnRequest     → { reason, requestedAt, status, resolvedAt, note }
```

---

## 9. Backend — `routes/orders.js`

All routes protected by `authMiddleware`. Key endpoints:

```
GET  /api/orders
     Query params: status, paymentStatus, dateFrom, dateTo, search, page, limit
     Returns: paginated order list with customer name, total, status badges

GET  /api/orders/:id
     Returns: full order detail — items, customization, payment history,
              design previews, admin notes, status history

PATCH /api/orders/:id/status
     Body: { status, note, trackingNumber? }
     Updates status, appends to statusHistory, triggers email+SMS to customer

PATCH /api/orders/:id/payment
     Body: { paymentStatus, amountPaid, note }
     Updates payment, recalculates amountDue

POST /api/orders/:id/notes
     Body: { note }
     Appends to adminNotes array

GET  /api/orders/:id/email
     Returns pre-built email link with order number pre-filled
     Format: mailto:orders.customworks@gmail.com?subject=Regarding+Order+%23{orderNumber}
```

---

## 10. Backend — `routes/designs.js`

```
GET  /api/designs/pending
     Returns all order items where designStatus = 'pending_approval'
     Includes: uploadedImageUrl, placement, customer name, order number

PATCH /api/designs/:orderId/:itemId/approve
     Sets designStatus = 'approved'
     If all items approved → auto-updates order status to 'processing'
     Notifies customer via email

PATCH /api/designs/:orderId/:itemId/reject
     Body: { reason }
     Sets designStatus = 'change_requested', saves reason
     Sends email to customer with reason
```

---

## 11. Backend — `routes/analytics.js`

```
GET /api/analytics/summary
    Returns:
    - totalOrders (all time)
    - ordersToday
    - revenue (all time)
    - revenueThisMonth
    - pendingDesignApprovals
    - ordersAwaitingDispatch  (ready_to_ship count)
    - partialPaymentOrders
    - returnRequests

GET /api/analytics/bestsellers
    Returns: top 10 products by order count, with total quantity sold

GET /api/analytics/customizations
    Returns: most-used text placements, most-uploaded design types,
             most-popular color choices, top coupon codes used
```

---

## 12. Backend — `routes/invoices.js`

```
POST /api/invoices/:orderId
     Multipart upload (PDF only, max 10MB)
     Saves to uploads/invoices/{orderId}.pdf
     Updates order.invoiceUrl

GET  /api/invoices/:orderId
     Streams PDF file back for download/print

```

---

## 13. Admin Dashboard — `admin/src/index.html` (Login Page)

Single HTML file. On submit → POST `/api/auth/admin-login` → store JWT in localStorage → redirect to `dashboard.html`.

Design direction: clean dark theme, CustomWorks logo centered, username + password fields, login button. Show error inline on wrong credentials.

---

## 14. Admin Dashboard — `admin/src/dashboard.html`

Single HTML file. No build step. Reads JWT from localStorage on load — if missing, redirect to `index.html`.

### Sidebar navigation sections:

```
1. Overview        → summary stat cards
2. Orders          → full order table with filters
3. Design Approval → pending artwork queue
4. Payments        → payment status management
5. Invoices        → upload/download/print per order
6. Analytics       → charts: revenue, bestsellers, customization trends
7. Customers       → customer list, order history per customer
8. Returns         → return/exchange request management
```

### Section 1 — Overview stat cards

Fetch `GET /api/analytics/summary`. Show cards for:

- Total orders today
- Revenue this month
- Pending design approvals (with red badge if > 0)
- Orders awaiting dispatch
- Partial payment orders (with yellow badge)
- Open return requests

### Section 2 — Orders table

Fetch `GET /api/orders` with filters. Table columns:

```
Order #  |  Customer  |  Product(s)  |  Total  |  Payment Status  |  Order Status  |  Date  |  Actions
```

Filters row above table:
- Status dropdown (all / designing / processing / ready_to_ship / dispatched / delivered)
- Payment dropdown (all / paid / partial / cod / pending / refunded)
- Date range picker
- Search by order number or customer name

Each row: click → opens order detail slide-over panel showing:
- Customer info + email button (pre-filled link)
- All order items with customization details + design preview thumbnail
- Payment history timeline
- Status stepper (click to advance status)
- Admin notes section (add/view internal notes)
- Invoice upload/download

### Section 3 — Design Approval queue

Fetch `GET /api/designs/pending`. Card grid, one card per pending item:

```
[ Design preview image ]
Order #CW-00123  |  Priya Sharma
Product: Custom T-Shirt — Black / XL / Cotton
Placement: Front Center
Text: "Team Alpha 2024"
Uploaded: 2 hours ago

[ Approve ✓ ]  [ Request Change ✗ ]
```

Click "Request Change" → modal with textarea for reason → sends to customer.

### Section 4 — Payments

Table of all orders filtered by payment status. Columns:

```
Order #  |  Customer  |  Total  |  Paid  |  Due  |  Method  |  Status  |  Actions
```

Actions: "Mark Partial Paid", "Mark Paid", "Process Refund", "Send email reminder".

### Section 5 — Invoices

Order list with invoice status. For each order:
- If invoice not uploaded: "Upload Invoice" button → file picker (PDF only)
- If uploaded: "Download" + "Print" buttons
- Print = opens PDF in new tab

### Section 6 — Analytics

Three panels:
- Revenue chart: bar chart, last 30 days (use Chart.js from CDN)
- Bestsellers: horizontal bar chart, top 10 products
- Customization trends: most-used placements, colors, coupon codes (table)

### Section 7 — Customers

Table: Name | Email | Phone | Total Orders | Total Spent | Last Order | Actions.  
Action: "View Orders" (filters order table to this customer) + "Email" button.

### Section 8 — Returns

Table: Order # | Customer | Product | Reason | Requested | Status | Actions.  
Actions: "Approve Return", "Reject", "Mark Refunded", "Add Note".

---

## 15. How Client and Admin Connect

```
CLIENT SITE  ──POST──▶  /api/orders          ← place order
             ──POST──▶  /api/designs/upload  ← upload artwork
             ──GET───▶  /api/orders/:id      ← track own order
             ──POST──▶  /api/auth/google     ← Google login

ADMIN PANEL  ──GET───▶  /api/orders          ← view all orders
             ──PATCH─▶  /api/orders/:id/status ← update status
             ──PATCH─▶  /api/designs/:id/approve
             ──GET───▶  /api/analytics/summary
             ──POST──▶  /api/invoices/:id

Both hit the same MongoDB. Backend is the single source of truth.
When admin changes order status → customer's My Account page reflects it instantly.
```

---

## 16. Notifications (triggered by backend on status change)

| Trigger | Email | SMS |
|---|---|---|
| Order placed | ✅ order confirmation | ✅ |
| Design approved | ✅ | ✅ |
| Design change requested | ✅ with reason | — |
| Processing started | ✅ | ✅ |
| Dispatched | ✅ with tracking link | ✅ |
| Delivered | ✅ | ✅ |
| Partial payment reminder | ✅ | — |
| Return approved | ✅ | ✅ |

Implement in backend as a `notify(orderId, event)` helper called inside each status-change route.

---

## 17. Running Locally

```bash
# Terminal 1 — Backend
cd customworks/backend
npm install
npm run dev
# → http://localhost:4000

# Terminal 2 — Admin (no build needed, just open file)
cd customworks/admin/src
open dashboard.html   # or use VS Code Live Server
# → http://localhost:5500/dashboard.html

# Terminal 3 — Client site (existing)
cd customworks/client
npm run dev
# → http://localhost:3000
```

---

## 18. Production Deployment Checklist

- [ ] Generate real JWT_SECRET: `openssl rand -hex 32`
- [ ] Hash ADMIN_PASSWORD with bcrypt, update auth route to use `bcrypt.compare()`
- [ ] Set NODE_ENV=production in backend `.env`
- [ ] Point MONGO_URI to MongoDB Atlas connection string
- [ ] Set ALLOWED_ORIGINS to production domains only
- [ ] Configure SMTP with real credentials
- [ ] Configure SMS API key
- [ ] Add SSL (HTTPS) — Nginx reverse proxy recommended
- [ ] Serve admin/ via Nginx at `admin.customworks.in`
- [ ] Serve backend via PM2 at `api.customworks.in`
- [ ] Set up daily MongoDB backup
- [ ] Confirm `.env` is in `.gitignore` before first push

---

## 19. Security Rules

- JWT expires 24h — re-login required daily
- All `/api/orders`, `/api/designs`, `/api/analytics`, `/api/invoices` routes require valid admin JWT
- File uploads: PDF/PNG/JPG only, max 10MB, stored server-side not client
- Rate limit: 200 requests per 15 min per IP
- CORS: only whitelisted origins
- Never return password field in any API response
