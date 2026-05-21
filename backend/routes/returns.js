const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

// GET /api/returns
router.get('/', authMiddleware, async (req, res) => {
  try {
    const returnsRes = await store.getReturns();
    res.json({ returns: returnsRes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/returns/:id
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const claim = await store.resolveReturnClaim(id, status, note);
    if (!claim) return res.status(404).json({ error: 'Return claim not found' });
    res.json(claim);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
