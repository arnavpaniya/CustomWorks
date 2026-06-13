const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

const store = require('../backend/store');

const mockCashfreeDetails = {
  cf_order_id: "6173831782",
  order_amount: "453.00",
  payment_status: "PAID",
  payment_method: "upi",
  cf_payment_id: "cf_pay_test_123456",
  payment_time: "2026-06-13T15:23:16+05:30"
};

async function testDbUpdate() {
  try {
    const orderId = "CW-452995";
    console.log(`Simulating payment completion in DB for order ${orderId}...`);
    
    // Complete the payment
    const updatedOrder = await store.completeOrderPayment(orderId, mockCashfreeDetails);
    
    console.log("\n1. Order updated in DB successfully!");
    console.log("Order Payment Status:", updatedOrder.payment.status);
    console.log("Order Payment History:", JSON.stringify(updatedOrder.payment.paymentHistory, null, 2));
    console.log("Order Status:", updatedOrder.status);
    console.log("Order Status History:", JSON.stringify(updatedOrder.statusHistory, null, 2));

    // Verify payments table insertion
    console.log("\n2. Fetching records from payments table...");
    const res = await store.pool.query('SELECT * FROM payments WHERE order_id = $1', [orderId]);
    console.log("Payments table row count:", res.rowCount);
    console.log("Payments table record:", JSON.stringify(res.rows[0], null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  }
}

testDbUpdate();
