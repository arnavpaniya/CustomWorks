const router = require('express').Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  const expectedUsername = process.env.ADMIN_USERNAME || 'mohit';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'mohit123';

  if (username !== expectedUsername)
    return res.status(401).json({ error: 'Invalid credentials' });

  const valid = password === expectedPassword;
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const secret = process.env.JWT_SECRET || 'super_secret_customworks_key_2026_jwt_token';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  const token = jwt.sign(
    { username, role: 'admin' },
    secret,
    { expiresIn }
  );

  res.json({ token, username });
});

module.exports = router;
