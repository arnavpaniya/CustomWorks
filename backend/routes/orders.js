const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

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
