require('dotenv').config();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../admin/.env'), override: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/orders',    require('./routes/orders'));
app.use('/api/designs',   require('./routes/designs'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/invoices',  require('./routes/invoices'));
app.use('/api/returns',   require('./routes/returns'));
app.use('/api/products',  require('./routes/products'));

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Backend running on :${port} using Neon PostgreSQL`)
);
