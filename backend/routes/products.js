const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const store = require('../store');

// GET /api/products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await store.getProducts();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/products
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, stock, status, variants } = req.body;
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    const newProduct = await store.addProduct({ name, price, stock, status, variants });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/products/:id
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, price, stock, status, variants } = req.body;
    const updated = await store.updateProduct(req.params.id, { name, price, stock, status, variants });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/products/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const success = await store.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product successfully removed from registry' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
