const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  try {
    const token = header.split(' ')[1];
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_customworks_key_2026_jwt_token');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
