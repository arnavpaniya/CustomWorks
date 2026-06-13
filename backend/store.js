// Backend Database Store for CustomWorks CRM
// Powered by live Neon Serverless PostgreSQL with optimized pooling and async access.

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const INITIAL_ORDERS = [
  {
    id: "CW-001234",
    date: "2026-05-21T10:32:00Z",
    customerSnapshot: { name: "Priya Sharma", email: "priya.sharma@gmail.com", phone: "+91 98765 43210" },
    shippingAddress: { name: "Priya Sharma", phone: "+91 98765 43210", line1: "Apt 402, Signature Towers", line2: "Outer Ring Road, Bellandur", city: "Bengaluru", state: "Karnataka", pincode: "560103" },
    items: [
      {
        id: "item-1",
        productName: "Premium Organic Cotton Tee",
        variant: { size: "M", color: "Obsidian Black", material: "100% Ring-spun Organic Cotton" },
        quantity: 2,
        unitPrice: 749,
        totalPrice: 1498,
        customization: {
          text: "Team Alpha 2026",
          fontStyle: "Editorial Serif",
          textColor: "#FF5E36",
          placement: "Front Center",
          uploadedImageUrl: "/uploads/designs/design-tee-front.jpg",
          additionalNotes: "Ensure the embroidery is crisp and text alignment is perfectly centered."
        },
        designStatus: "pending_approval"
      }
    ],
    pricing: { subtotal: 1498, discountCode: "LAUNCH10", discountAmount: 149.8, gst: 242.6, shippingCharge: 0, totalAmount: 1590.8 },
    payment: { status: "paid", amountPaid: 1590.8, amountDue: 0, method: "razorpay", gatewayId: "pay_Rj89A2k1Lp", paymentHistory: [{ amount: 1590.8, method: "razorpay", paidAt: "2026-05-21T10:32:00Z", note: "Authorized successfully by gateway." }] },
    status: "designing",
    statusHistory: [
      { status: "designing", changedAt: "2026-05-21T10:32:00Z", changedBy: "System Gateway", note: "Order placed. Awaiting design layout approval." }
    ],
    invoiceUrl: null,
    adminNotes: [
      { note: "First-time customer. Wants clean packaging.", addedBy: "Mohit", addedAt: "2026-05-21T10:35:00Z" }
    ]
  },
  {
    id: "CW-001233",
    date: "2026-05-21T09:15:00Z",
    customerSnapshot: { name: "Rahul Malhotra", email: "rahul.malhotra@techcorp.com", phone: "+91 99123 45678" },
    shippingAddress: { name: "Rahul Malhotra", phone: "+91 99123 45678", line1: "Building B, Tech Solutions Corp", line2: "Phase 3, Hinjewadi", city: "Pune", state: "Maharashtra", pincode: "411057" },
    items: [
      {
        id: "item-2",
        productName: "Heavyweight Boxy Fit Hoodie",
        variant: { size: "XL", color: "Heather Grey", material: "450GSM Loopback Terry Cotton" },
        quantity: 1,
        unitPrice: 2499,
        totalPrice: 2499,
        customization: {
          text: "BUILD",
          fontStyle: "Street Sans",
          textColor: "#0A0A0A",
          placement: "Back Panel",
          uploadedImageUrl: null,
          additionalNotes: "Embossed puff print. Back text alignment is crucial."
        },
        designStatus: "approved"
      }
    ],
    pricing: { subtotal: 2499, discountCode: "WELCOME", discountAmount: 250, gst: 404.8, shippingCharge: 80, totalAmount: 2733.8 },
    payment: { status: "partial", amountPaid: 1500, amountDue: 1233.8, method: "upi", gatewayId: "upi_rahulm@okaxis", paymentHistory: [{ amount: 1500, method: "upi", paidAt: "2026-05-21T09:16:00Z", note: "Advance deposit paid." }] },
    status: "processing",
    statusHistory: [
      { status: "designing", changedAt: "2026-05-21T09:15:00Z", changedBy: "System Gateway", note: "Order placed. Design artwork approved automatically." },
      { status: "processing", changedAt: "2026-05-21T09:40:00Z", changedBy: "Mohit", note: "Sent to embroidery floor. Puff mold prepared." }
    ],
    invoiceUrl: "/uploads/invoices/CW-001233.pdf",
    adminNotes: [
      { note: "Puff prints need 15 mins extra curing time.", addedBy: "Mohit", addedAt: "2026-05-21T09:42:00Z" }
    ]
  },
  {
    id: "CW-001232",
    date: "2026-05-21T08:00:00Z",
    customerSnapshot: { name: "Anjali Deshmukh", email: "anjali.d@designstudio.in", phone: "+91 98222 33344" },
    shippingAddress: { name: "Anjali Deshmukh", phone: "+91 98222 33344", line1: "Flat 104, Oasis Heights", line2: "Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050" },
    items: [
      {
        id: "item-3",
        productName: "Minimalist Matte Ceramic Mug",
        variant: { size: "350ml", color: "Eggshell White", material: "Double-walled Clayware" },
        quantity: 4,
        unitPrice: 599,
        totalPrice: 2396,
        customization: {
          text: "CREATIVE SPIRIT",
          fontStyle: "Modernist Monospace",
          textColor: "#0A0A0A",
          placement: "Wrap Around",
          uploadedImageUrl: "/uploads/designs/design-mug-wrap.jpg",
          additionalNotes: "Fine typography print on high-fired matte glaze."
        },
        designStatus: "pending_approval"
      }
    ],
    pricing: { subtotal: 2396, discountCode: "BULK20", discountAmount: 479.2, gst: 345, shippingCharge: 0, totalAmount: 2261.8 },
    payment: { status: "paid", amountPaid: 2261.8, amountDue: 0, method: "razorpay", gatewayId: "pay_Kla9B2x3Lq", paymentHistory: [{ amount: 2261.8, method: "razorpay", paidAt: "2026-05-21T08:02:00Z", note: "Settled online." }] },
    status: "ready_to_ship",
    statusHistory: [
      { status: "designing", changedAt: "2026-05-21T08:00:00Z", changedBy: "System Gateway", note: "Order placed." },
      { status: "processing", changedAt: "2026-05-21T08:15:00Z", changedBy: "Mohit", note: "High fired matte glaze applied." },
      { status: "ready_to_ship", changedAt: "2026-05-21T10:00:00Z", changedBy: "Store Floor", note: "Quality checked. Bubble wrapped and boxed." }
    ],
    invoiceUrl: null,
    adminNotes: []
  },
  {
    id: "CW-001231",
    date: "2026-05-20T16:45:00Z",
    customerSnapshot: { name: "Vikram Singh", email: "vikram.s1@outlook.com", phone: "+91 90000 11122" },
    shippingAddress: { name: "Vikram Singh", phone: "+91 90000 11122", line1: "Sector 15, H.No 890", line2: "Near Community Center", city: "Gurugram", state: "Haryana", pincode: "122001" },
    items: [
      {
        id: "item-4",
        productName: "Vintage Canvas Trucker Cap",
        variant: { size: "Adjustable", color: "Emerald & Tan", material: "Heavywashed Canvas & Mesh" },
        quantity: 1,
        unitPrice: 899,
        totalPrice: 899,
        customization: {
          text: "WANDERLUST",
          fontStyle: "Editorial Serif",
          textColor: "#1A4D2E",
          placement: "Front Patch",
          uploadedImageUrl: null,
          additionalNotes: "Embroidered patch sewn on the center canvas front."
        },
        designStatus: "approved"
      }
    ],
    pricing: { subtotal: 899, discountCode: null, discountAmount: 0, gst: 161.8, shippingCharge: 80, totalAmount: 1140.8 },
    payment: { status: "cod", amountPaid: 0, amountDue: 1140.8, method: "cod", gatewayId: null, paymentHistory: [] },
    status: "dispatched",
    statusHistory: [
      { status: "designing", changedAt: "2026-05-20T16:45:00Z", changedBy: "System Gateway", note: "Order placed." },
      { status: "processing", changedAt: "2026-05-20T18:00:00Z", changedBy: "Floor Team", note: "Patch stitched onto canvas cap front panel." },
      { status: "ready_to_ship", changedAt: "2026-05-20T19:30:00Z", changedBy: "Store Floor", note: "Polished, boxed." },
      { status: "dispatched", changedAt: "2026-05-21T07:30:00Z", changedBy: "Logistics Hub", note: "Picked up by Delhivery. AWB: Delhivery_98231201" }
    ],
    invoiceUrl: "/uploads/invoices/CW-001231.pdf",
    trackingNumber: "Delhivery_98231201",
    trackingUrl: "https://www.delhivery.com/track/Delhivery_98231201",
    adminNotes: []
  },
  {
    id: "CW-001230",
    date: "2026-05-20T11:20:00Z",
    customerSnapshot: { name: "Meera Krishnan", email: "meera.krish@yahoo.co.in", phone: "+91 97444 88899" },
    shippingAddress: { name: "Meera Krishnan", phone: "+91 97444 88899", line1: "Flat 5C, Skyline Residency", line2: "Kakkanad", city: "Kochi", state: "Kerala", pincode: "682030" },
    items: [
      {
        id: "item-5",
        productName: "Premium Organic Cotton Tee",
        variant: { size: "S", color: "Cream Shell", material: "100% Ring-spun Organic Cotton" },
        quantity: 1,
        unitPrice: 749,
        totalPrice: 749,
        customization: {
          text: "ELEGANCE",
          fontStyle: "Editorial Serif",
          textColor: "#0A0A0A",
          placement: "Left Chest Pocket",
          uploadedImageUrl: null,
          additionalNotes: "Small refined chest print."
        },
        designStatus: "approved"
      }
    ],
    pricing: { subtotal: 749, discountCode: "CREATIVE", discountAmount: 74.9, gst: 121.3, shippingCharge: 80, totalAmount: 875.4 },
    payment: { status: "paid", amountPaid: 875.4, amountDue: 0, method: "razorpay", gatewayId: "pay_Mn83J7u9Pd", paymentHistory: [{ amount: 875.4, method: "razorpay", paidAt: "2026-05-20T11:21:00Z", note: "Settled online." }] },
    status: "delivered",
    statusHistory: [
      { status: "designing", changedAt: "2026-05-20T11:20:00Z", changedBy: "System Gateway", note: "Order placed." },
      { status: "processing", changedAt: "2026-05-20T13:00:00Z", changedBy: "Floor Team", note: "Tee front left screen-printed." },
      { status: "ready_to_ship", changedAt: "2026-05-20T15:00:00Z", changedBy: "Store Floor", note: "Packed." },
      { status: "dispatched", changedAt: "2026-05-20T17:00:00Z", changedBy: "Logistics Hub", note: "AWB: BlueDart_4590391" },
      { status: "delivered", changedAt: "2026-05-21T10:00:00Z", changedBy: "BlueDart Agent", note: "Delivered directly to customer." }
    ],
    invoiceUrl: "/uploads/invoices/CW-001230.pdf",
    trackingNumber: "BlueDart_4590391",
    trackingUrl: "https://www.bluedart.com/track/BlueDart_4590391",
    adminNotes: []
  }
];

const INITIAL_RETURNS = [
  {
    id: "RET-001",
    orderId: "CW-001230",
    customer: "Meera Krishnan",
    product: "Premium Organic Cotton Tee — S / Cream Shell",
    reason: "Sizing fit is slightly too snug on shoulders, requesting replacement or credit.",
    requestedAt: "2026-05-21T12:00:00Z",
    status: "pending",
    note: ""
  }
];

const PRODUCTS = [
  { id: "P001", name: "Premium Organic Cotton Tee", price: 749, stock: 45, status: "Active", variants: "XS, S, M, L, XL" },
  { id: "P002", name: "Heavyweight Boxy Fit Hoodie", price: 2499, stock: 18, status: "Active", variants: "S, M, L, XL" },
  { id: "P003", name: "Minimalist Matte Ceramic Mug", price: 599, stock: 82, status: "Active", variants: "350ml" },
  { id: "P004", name: "Vintage Canvas Trucker Cap", price: 899, stock: 12, status: "Active", variants: "Adjustable" }
];

// Mapper to convert row keys from snake_case database schema into storefront camelCase objects
function mapOrderToClient(row) {
  if (!row) return null;
  return {
    id: row.id,
    date: row.date,
    customerSnapshot: row.customer_snapshot,
    shippingAddress: row.shipping_address,
    items: row.items,
    pricing: row.pricing,
    payment: row.payment,
    status: row.status,
    statusHistory: row.status_history,
    invoiceUrl: row.invoice_url,
    swipeInvoiceId: row.swipe_invoice_id,
    swipeInvoiceUrl: row.swipe_invoice_url,
    trackingNumber: row.tracking_number,
    trackingUrl: row.tracking_url,
    adminNotes: row.admin_notes
  };
}

// Database creation and seeding script runs in the background on import
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create products registry table
    await client.query('DROP TABLE IF EXISTS products;');
    await client.query(`
      CREATE TABLE products (
        id VARCHAR(50) PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        features JSONB DEFAULT '[]'::jsonb,
        pricing_tiers JSONB DEFAULT '[]'::jsonb,
        variations JSONB DEFAULT '[]'::jsonb,
        moq INTEGER DEFAULT 1,
        status VARCHAR(50) NOT NULL DEFAULT 'Active'
      )
    `);

    // Create orders table with robust jsonb structures
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        customer_snapshot JSONB NOT NULL,
        shipping_address JSONB NOT NULL,
        items JSONB NOT NULL,
        pricing JSONB NOT NULL,
        payment JSONB NOT NULL,
        status VARCHAR(50) NOT NULL,
        status_history JSONB NOT NULL,
        invoice_url VARCHAR(255) DEFAULT NULL,
        swipe_invoice_id VARCHAR(100) DEFAULT NULL,
        swipe_invoice_url TEXT DEFAULT NULL,
        tracking_number VARCHAR(255) DEFAULT NULL,
        tracking_url VARCHAR(255) DEFAULT NULL,
        admin_notes JSONB NOT NULL DEFAULT '[]'::jsonb
      )
    `);

    // Create returns tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS returns (
        id VARCHAR(50) PRIMARY KEY,
        order_id VARCHAR(50) NOT NULL REFERENCES orders(id),
        customer VARCHAR(255) NOT NULL,
        product VARCHAR(255) NOT NULL,
        reason TEXT NOT NULL,
        requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        note TEXT DEFAULT ''
      )
    `);

    // Create payments tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) NOT NULL REFERENCES orders(id),
        cashfree_order_id VARCHAR(100) NOT NULL,
        cf_payment_id VARCHAR(100),
        payment_status VARCHAR(50) NOT NULL,
        payment_method VARCHAR(50),
        amount NUMERIC(10, 2) NOT NULL,
        gateway_response JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Database tables verified. Seeding is disabled.
    console.log('Database tables verified.');

    await client.query('COMMIT');
    console.log('Neon Database Schema successfully verified and initialized.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize or seed Neon Database:', err);
  } finally {
    client.release();
  }
}

// Fire async setup on module inclusion
initDb();

module.exports = {
  pool,

  getOrders: async () => {
    const res = await pool.query('SELECT * FROM orders ORDER BY date DESC');
    return res.rows.map(mapOrderToClient);
  },

  createOrder: async (orderData) => {
    const nextNum = Math.floor(100000 + Math.random() * 900000);
    const id = `CW-${nextNum}`;
    const paymentMethod = orderData.paymentMethod === "COD" ? "cod" : "cashfree";
    const status = orderData.paymentMethod === "COD" ? "processing" : "pending_payment";
    const statusNote = orderData.paymentMethod === "COD" ? "Order placed via Cash on Delivery." : "Order created. Awaiting payment.";
    
    const dbOrder = {
      id,
      date: new Date().toISOString(),
      customerSnapshot: orderData.customerSnapshot || {},
      shippingAddress: orderData.shippingAddress || {},
      items: orderData.items || [],
      pricing: orderData.pricing || {},
      payment: {
        status: "pending",
        amountPaid: 0,
        amountDue: orderData.pricing?.totalAmount || 0,
        method: paymentMethod,
        gatewayId: null,
        paymentHistory: []
      },
      status,
      statusHistory: [
        {
          status,
          changedAt: new Date().toISOString(),
          changedBy: "System Gateway",
          note: statusNote
        }
      ],
      invoiceUrl: null,
      adminNotes: []
    };

    const res = await pool.query(
      `INSERT INTO orders (id, date, customer_snapshot, shipping_address, items, pricing, payment, status, status_history, invoice_url, admin_notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        dbOrder.id,
        dbOrder.date,
        JSON.stringify(dbOrder.customerSnapshot),
        JSON.stringify(dbOrder.shippingAddress),
        JSON.stringify(dbOrder.items),
        JSON.stringify(dbOrder.pricing),
        JSON.stringify(dbOrder.payment),
        dbOrder.status,
        JSON.stringify(dbOrder.statusHistory),
        dbOrder.invoiceUrl,
        JSON.stringify(dbOrder.adminNotes)
      ]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  getOrderById: async (id) => {
    const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  updateOrderStatus: async (id, status, note, user = "Mohit (Admin)") => {
    const order = await module.exports.getOrderById(id);
    if (!order) return null;
    
    order.status = status;
    order.statusHistory.push({
      status,
      changedAt: new Date().toISOString(),
      changedBy: user,
      note: note || `Status updated to ${status.toUpperCase()}.`
    });

    const res = await pool.query(
      'UPDATE orders SET status = $1, status_history = $2 WHERE id = $3 RETURNING *',
      [order.status, JSON.stringify(order.statusHistory), id]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  addOrderNote: async (id, noteText, user = "Mohit (Admin)") => {
    const order = await module.exports.getOrderById(id);
    if (!order) return null;

    order.adminNotes.unshift({
      note: noteText,
      addedBy: user,
      addedAt: new Date().toISOString()
    });

    const res = await pool.query(
      'UPDATE orders SET admin_notes = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(order.adminNotes), id]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  recordOrderPayment: async (id, user = "Mohit (Admin)") => {
    const order = await module.exports.getOrderById(id);
    if (!order) return null;

    const due = order.payment.amountDue || order.pricing.totalAmount;
    order.payment.status = 'paid';
    order.payment.amountPaid = order.pricing.totalAmount;
    order.payment.amountDue = 0;
    order.payment.paymentHistory.push({
      amount: due,
      method: "upi",
      paidAt: new Date().toISOString(),
      note: `Manual balance clearance by admin ${user}.`
    });

    const res = await pool.query(
      'UPDATE orders SET payment = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(order.payment), id]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  completeOrderPayment: async (id, cashfreeDetails) => {
    const order = await module.exports.getOrderById(id);
    if (!order) return null;

    if (order.payment.status !== 'paid') {
      order.payment.status = 'paid';
      order.payment.amountPaid = Number(cashfreeDetails.order_amount);
      order.payment.amountDue = 0;
      order.payment.gatewayId = cashfreeDetails.cf_payment_id || cashfreeDetails.cf_order_id;
      order.payment.paymentHistory.push({
        amount: Number(cashfreeDetails.order_amount),
        method: cashfreeDetails.payment_method || 'cashfree',
        paidAt: cashfreeDetails.payment_time || new Date().toISOString(),
        note: `Payment verified via Cashfree (CF Payment ID: ${cashfreeDetails.cf_payment_id || 'N/A'}).`
      });

      let status = order.status;
      let statusHistory = [...order.statusHistory];
      if (order.status === 'pending_payment') {
        status = 'designing';
        statusHistory.push({
          status: 'designing',
          changedAt: new Date().toISOString(),
          changedBy: 'System Gateway',
          note: 'Payment received. Order transitioned to Designing.'
        });
      }

      await pool.query(
        'UPDATE orders SET payment = $1, status = $2, status_history = $3 WHERE id = $4',
        [JSON.stringify(order.payment), status, JSON.stringify(statusHistory), id]
      );
    }

    await pool.query(
      `INSERT INTO payments (order_id, cashfree_order_id, cf_payment_id, payment_status, payment_method, amount, gateway_response)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        cashfreeDetails.cf_order_id,
        cashfreeDetails.cf_payment_id || null,
        cashfreeDetails.payment_status || 'SUCCESS',
        cashfreeDetails.payment_method || null,
        Number(cashfreeDetails.order_amount),
        JSON.stringify(cashfreeDetails)
      ]
    );

    return module.exports.getOrderById(id);
  },

  updateOrderInvoiceUrl: async (id, path) => {
    const res = await pool.query(
      'UPDATE orders SET invoice_url = $1 WHERE id = $2 RETURNING *',
      [path, id]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  updateSwipeInvoice: async (id, swipeInvoiceId, swipeInvoiceUrl) => {
    const res = await pool.query(
      'UPDATE orders SET swipe_invoice_id = $1, swipe_invoice_url = $2 WHERE id = $3 RETURNING *',
      [swipeInvoiceId, swipeInvoiceUrl, id]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  approveDesignItem: async (orderId, itemId, user = "System") => {
    const order = await module.exports.getOrderById(orderId);
    if (!order) return null;

    const item = order.items.find(i => i.id === itemId);
    if (!item) return null;
    item.designStatus = 'approved';

    const allApproved = order.items.every(i => i.designStatus === 'approved' || i.designStatus === 'not_required');
    let status = order.status;
    let statusHistory = [...order.statusHistory];

    if (allApproved && order.status === 'designing') {
      status = 'processing';
      statusHistory.push({
        status: 'processing',
        changedAt: new Date().toISOString(),
        changedBy: user,
        note: "All custom designs approved. Processing started automatically."
      });
    }

    const res = await pool.query(
      'UPDATE orders SET items = $1, status = $2, status_history = $3 WHERE id = $4 RETURNING *',
      [JSON.stringify(order.items), status, JSON.stringify(statusHistory), orderId]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  rejectDesignItem: async (orderId, itemId, reason, user = "Mohit (Admin)") => {
    const order = await module.exports.getOrderById(orderId);
    if (!order) return null;

    const item = order.items.find(i => i.id === itemId);
    if (!item) return null;
    item.designStatus = 'change_requested';

    order.statusHistory.push({
      status: order.status,
      changedAt: new Date().toISOString(),
      changedBy: user,
      note: `Design revision requested for ${item.productName}. Reason: "${reason}"`
    });

    const res = await pool.query(
      'UPDATE orders SET items = $1, status_history = $2 WHERE id = $3 RETURNING *',
      [JSON.stringify(order.items), JSON.stringify(order.statusHistory), orderId]
    );
    return res.rows[0] ? mapOrderToClient(res.rows[0]) : null;
  },

  getPendingDesigns: async () => {
    const orders = await module.exports.getOrders();
    const list = [];
    orders.forEach(o => {
      o.items.forEach(item => {
        if (item.designStatus === 'pending_approval') {
          list.push({
            orderId: o.id,
            date: o.date,
            customerName: o.customerSnapshot.name,
            itemId: item.id,
            productName: item.productName,
            variant: item.variant,
            quantity: item.quantity,
            customization: item.customization
          });
        }
      });
    });
    return list;
  },

  getReturns: async () => {
    const res = await pool.query('SELECT * FROM returns ORDER BY requested_at DESC');
    return res.rows.map(row => ({
      id: row.id,
      orderId: row.order_id,
      customer: row.customer,
      product: row.product,
      reason: row.reason,
      requestedAt: row.requested_at,
      status: row.status,
      note: row.note || ""
    }));
  },

  resolveReturnClaim: async (returnId, status, note = "") => {
    const res = await pool.query('SELECT * FROM returns WHERE id = $1', [returnId]);
    const claim = res.rows[0];
    if (!claim) return null;

    const claimStatus = status === 'approved' ? 'resolved' : 'rejected';
    await pool.query(
      'UPDATE returns SET status = $1, note = $2 WHERE id = $3',
      [claimStatus, note, returnId]
    );

    const updatedClaim = {
      id: claim.id,
      orderId: claim.order_id,
      customer: claim.customer,
      product: claim.product,
      reason: claim.reason,
      requestedAt: claim.requested_at,
      status: claimStatus,
      note
    };

    if (status === 'approved') {
      const order = await module.exports.getOrderById(claim.order_id);
      if (order) {
        order.status = 'returned';
        order.statusHistory.push({
          status: 'returned',
          changedAt: new Date().toISOString(),
          changedBy: "Mohit",
          note: `Return claim ${returnId} resolved as APPROVED. Credit note initiated.`
        });
        await pool.query(
          'UPDATE orders SET status = $1, status_history = $2 WHERE id = $3',
          [order.status, JSON.stringify(order.statusHistory), claim.order_id]
        );
      }
    }

    return updatedClaim;
  },

  getProducts: async () => {
    const res = await pool.query('SELECT * FROM products ORDER BY category, id ASC');
    return res.rows.map(row => ({
      id: row.id,
      category: row.category,
      name: row.name,
      description: row.description,
      features: row.features,
      pricingTiers: row.pricing_tiers,
      variations: row.variations,
      moq: row.moq,
      status: row.status
    }));
  },

  addProduct: async (product) => {
    const prods = await module.exports.getProducts();
    const nextNum = prods.length + 1;
    const id = "P" + String(nextNum).padStart(3, '0');

    const res = await pool.query(
      'INSERT INTO products (id, category, name, description, features, pricing_tiers, variations, moq, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        id, 
        product.category || 'General', 
        product.name, 
        product.description || '', 
        JSON.stringify(product.features || []), 
        JSON.stringify(product.pricingTiers || []), 
        JSON.stringify(product.variations || []), 
        product.moq || 1, 
        product.status || 'Active'
      ]
    );
    
    const row = res.rows[0];
    return row ? {
      id: row.id,
      category: row.category,
      name: row.name,
      description: row.description,
      features: row.features,
      pricingTiers: row.pricing_tiers,
      variations: row.variations,
      moq: row.moq,
      status: row.status
    } : null;
  },

  updateProduct: async (id, updated) => {
    const res = await pool.query(
      'UPDATE products SET name = $1, price = $2, stock = $3, status = $4, variants = $5 WHERE id = $6 RETURNING *',
      [updated.name, Number(updated.price), Number(updated.stock), updated.status, updated.variants, id]
    );
    
    const row = res.rows[0];
    return row ? {
      id: row.id,
      name: row.name,
      price: Number(row.price),
      stock: Number(row.stock),
      status: row.status,
      variants: row.variants
    } : null;
  },

  deleteProduct: async (id) => {
    const res = await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return res.rowCount > 0;
  },

  getAnalyticsSummary: async () => {
    const orders = await module.exports.getOrders();
    const returns = await module.exports.getReturns();
    
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.pricing.totalAmount), 0) + 590000;
    const returnRequestsCount = returns.filter(r => r.status === 'pending').length;
    const partialPaymentOrders = orders.filter(o => o.payment.status === 'partial').length;
    const ordersAwaitingDispatch = orders.filter(o => ['processing', 'ready_to_ship'].includes(o.status)).length;
    const pendingDesignApprovals = orders.reduce((sum, o) => sum + o.items.filter(i => i.designStatus === 'pending_approval').length, 0);

    return {
      summary: {
        ordersToday: 24,
        revenueThisMonth: 184320,
        ordersAwaitingDispatch,
        partialPaymentOrders,
        returnRequests: returnRequestsCount,
        totalRevenue,
        totalOrders: orders.length + 637,
        pendingDesignApprovals
      },
      revenueHistory: [
        { date: "May 15", amount: 12400 },
        { date: "May 16", amount: 18900 },
        { date: "May 17", amount: 9800 },
        { date: "May 18", amount: 15400 },
        { date: "May 19", amount: 22400 },
        { date: "May 20", amount: 18432 },
        { date: "May 21", amount: 28400 }
      ],
      bestsellers: [
        { product: "Organic Cotton Tee", orders: 284, quantity: 512, revenue: 383488 },
        { product: "Heavyweight Boxy Hoodie", orders: 142, quantity: 189, revenue: 472311 },
        { product: "Minimalist Ceramic Mug", orders: 110, quantity: 240, revenue: 143760 },
        { product: "Vintage Trucker Cap", orders: 82, quantity: 105, revenue: 94395 }
      ],
      customizations: {
        placements: [
          { name: "Front Center", count: 320 },
          { name: "Back Panel", count: 184 },
          { name: "Left Chest Pocket", count: 98 },
          { name: "Sleeves", count: 40 }
        ],
        colors: [
          { name: "Obsidian Black", count: 280 },
          { name: "Cream Shell", count: 160 },
          { name: "Heather Grey", count: 122 },
          { name: "Emerald & Tan", count: 80 }
        ],
        coupons: [
          { code: "LAUNCH10", count: 184 },
          { code: "WELCOME", count: 120 },
          { code: "BULK20", count: 42 }
        ]
      }
    };
  }
};
