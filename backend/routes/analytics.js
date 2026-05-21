const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

// GET /api/analytics/summary
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const summary = await store.getAnalyticsSummary();
    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
