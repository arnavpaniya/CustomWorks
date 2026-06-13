const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');
const cashfreeService = require('../services/cashfreeService');

// GET /api/orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await store.getOrders();
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/orders/checkout (Public route for storefront)
router.post('/checkout', async (req, res) => {
  try {
    const { items, address, subtotal, gst, shipping, total, paymentMethod } = req.body;
    
    // Basic validation
    if (!items || !items.length || !address) {
      return res.status(400).json({ error: 'Invalid checkout data' });
    }

    const orderData = {
      customerSnapshot: {
        name: address.name,
        phone: address.phone,
        email: address.email || ''
      },
      shippingAddress: {
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2 || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode
      },
      items: items,
      pricing: {
        subtotal,
        gst,
        shippingCharge: shipping,
        totalAmount: total
      },
      paymentMethod: paymentMethod || "ONLINE"
    };

    const newOrder = await store.createOrder(orderData);
    if (!newOrder) {
      throw new Error("Failed to create order in database");
    }

    if (paymentMethod === "COD") {
      return res.json({
        orderId: newOrder.id,
        paymentMethod: "COD"
      });
    }

    // Create Cashfree session
    const cashfreeSession = await cashfreeService.createPaymentSession(newOrder);

    res.json({
      orderId: newOrder.id,
      paymentSessionId: cashfreeSession.payment_session_id,
      paymentMethod: "ONLINE"
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: 'Failed to initiate checkout' });
  }
});

// GET /api/orders/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await store.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await store.updateOrderStatus(req.params.id, status, note, req.admin ? req.admin.username : undefined);
    if (!order) return res.status(404).json({ error: 'Order not found or invalid transition' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/orders/:id/notes
router.post('/:id/notes', authMiddleware, async (req, res) => {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) return res.status(400).json({ error: 'Note text is required' });
    const order = await store.addOrderNote(req.params.id, note.trim(), req.admin ? req.admin.username : undefined);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/orders/:id/payments
router.post('/:id/payments', authMiddleware, async (req, res) => {
  try {
    const order = await store.recordOrderPayment(req.params.id, req.admin ? req.admin.username : undefined);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
