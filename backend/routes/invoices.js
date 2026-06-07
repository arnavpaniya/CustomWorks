const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

const swipeService = require('../services/swipeService');

// POST /api/invoices/:orderId
router.post('/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Fetch the order data first
    const order = await store.getOrderById(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Generate Swipe invoice
    const swipeResult = await swipeService.createInvoice(order);
    
    if (swipeResult) {
      // Update DB with swipe info
      const updatedOrder = await store.updateSwipeInvoice(orderId, swipeResult.invoiceId, swipeResult.invoiceUrl);
      // Also update regular invoiceUrl to point to swipe for backward compatibility
      await store.updateOrderInvoiceUrl(orderId, swipeResult.invoiceUrl);
      
      res.json({ orderId, invoiceUrl: swipeResult.invoiceUrl, swipeInvoiceId: swipeResult.invoiceId, order: updatedOrder });
    } else {
      // Fallback
      const path = `/uploads/invoices/${orderId}.pdf`;
      const updatedOrder = await store.updateOrderInvoiceUrl(orderId, path);
      res.json({ orderId, invoiceUrl: path, order: updatedOrder });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/invoices/:orderId
router.get('/:orderId', authMiddleware, async (req, res) => {
  try {
    const order = await store.getOrderById(req.params.orderId);
    if (!order || !order.invoiceUrl) {
      return res.status(404).send('Invoice not found for this order.');
    }
    // Redirect to the actual invoice URL (Swipe PDF or placeholder path)
    res.redirect(order.invoiceUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
