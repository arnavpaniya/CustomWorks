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

// GET /api/orders/:id/verify-payment
router.get('/:id/verify-payment', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await store.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If order is already paid, return success directly
    if (order.payment.status === 'paid') {
      return res.json({ success: true, status: 'PAID', order });
    }

    // Call service to fetch details from Cashfree
    let cashfreeDetails;
    try {
      cashfreeDetails = await cashfreeService.verifyPayment(orderId);
    } catch (cfErr) {
      console.error(`Cashfree verification error for order ${orderId}:`, cfErr.message);
      return res.status(400).json({ error: 'Failed to verify payment with Cashfree API' });
    }

    if (cashfreeDetails.payment_status === 'PAID') {
      // Mark order as paid in DB
      const updatedOrder = await store.completeOrderPayment(orderId, cashfreeDetails);
      return res.json({ success: true, status: 'PAID', order: updatedOrder });
    }

    res.json({
      success: false,
      status: cashfreeDetails.payment_status,
      message: `Payment status is currently ${cashfreeDetails.payment_status}`
    });
  } catch (err) {
    console.error("Order verification error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/orders/webhook
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    const rawBody = JSON.stringify(req.body);

    const isValid = cashfreeService.verifyWebhookSignature(signature, rawBody, timestamp);
    if (!isValid) {
      console.warn("Invalid webhook signature received");
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    console.log("Cashfree Webhook received:", event);

    if (event.event_time && event.data && event.data.order && event.data.payment) {
      const orderId = event.data.order.order_id;
      const paymentStatus = event.data.payment.payment_status;
      
      if (paymentStatus === 'SUCCESS') {
        const cashfreeDetails = {
          cf_order_id: event.data.order.cf_order_id,
          order_amount: event.data.order.order_amount,
          payment_status: 'PAID',
          payment_method: event.data.payment.payment_group || 'cashfree',
          cf_payment_id: event.data.payment.cf_payment_id,
          payment_time: event.data.payment.payment_completion_time
        };
        await store.completeOrderPayment(orderId, cashfreeDetails);
        console.log(`Order ${orderId} successfully marked as PAID via webhook`);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
