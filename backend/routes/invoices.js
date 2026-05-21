const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

// POST /api/invoices/:orderId
router.post('/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const path = `/uploads/invoices/${orderId}.pdf`;
    
    const order = await store.updateOrderInvoiceUrl(orderId, path);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    res.json({ orderId, invoiceUrl: path, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/invoices/:orderId
router.get('/:orderId', authMiddleware, (req, res) => {
  res.send('Invoice PDF stream placeholder. Accessible at ' + `/uploads/invoices/${req.params.orderId}.pdf`);
});

module.exports = router;
