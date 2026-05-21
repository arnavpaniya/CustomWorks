const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

// GET /api/designs/pending
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const pending = await store.getPendingDesigns();
    res.json({ pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/designs/:orderId/:itemId/approve
router.patch('/:orderId/:itemId/approve', authMiddleware, async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const order = await store.approveDesignItem(orderId, itemId, req.admin ? req.admin.username : 'Mohit (Admin)');
    if (!order) return res.status(404).json({ error: 'Order or item not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/designs/:orderId/:itemId/reject
router.patch('/:orderId/:itemId/reject', authMiddleware, async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { reason } = req.body;
    if (!reason || !reason.trim()) return res.status(400).json({ error: 'Rejection reason is required' });
    const order = await store.rejectDesignItem(orderId, itemId, reason.trim(), req.admin ? req.admin.username : 'Mohit (Admin)');
    if (!order) return res.status(404).json({ error: 'Order or item not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
