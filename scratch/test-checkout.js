const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));

require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const store = require('../backend/store');
const cashfreeService = require('../backend/services/cashfreeService');

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Loaded" : "Not Loaded");
console.log("CASHFREE_APP_ID:", process.env.CASHFREE_APP_ID ? "Loaded" : "Not Loaded");
console.log("CASHFREE_SECRET_KEY:", process.env.CASHFREE_SECRET_KEY ? "Loaded" : "Not Loaded");
console.log("CASHFREE_ENVIRONMENT:", process.env.CASHFREE_ENVIRONMENT);

const mockOrderData = {
  customerSnapshot: {
    name: "Test User",
    phone: "9876543210",
    email: "test@example.com"
  },
  shippingAddress: {
    name: "Test User",
    phone: "9876543210",
    line1: "123 Test St",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001"
  },
  items: [
    {
      productId: "visiting-card-300gsm",
      name: "Premium Visiting Cards",
      price: 1.75,
      quantity: 200
    }
  ],
  pricing: {
    subtotal: 350,
    gst: 63,
    shippingCharge: 40,
    totalAmount: 453
  },
  paymentMethod: "ONLINE"
};

async function runTest() {
  try {
    console.log("\n1. Testing createOrder in DB...");
    const order = await store.createOrder(mockOrderData);
    console.log("Order created successfully in DB, ID:", order.id);

    console.log("\n2. Testing Cashfree order creation...");
    const session = await cashfreeService.createPaymentSession(order);
    console.log("Cashfree payment session created successfully!");
    console.log("payment_session_id:", session.payment_session_id);
    process.exit(0);
  } catch (err) {
    console.error("\nTEST FAILED!");
    if (err.response && err.response.data) {
      console.error("Cashfree API Error Details:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err);
    }
    process.exit(1);
  }
}

runTest();
