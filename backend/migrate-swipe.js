require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    console.log('Adding Swipe columns to orders table...');
    await pool.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS swipe_invoice_id VARCHAR(100);');
    await pool.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS swipe_invoice_url TEXT;');
    console.log('Migration successful!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
}

migrate();
