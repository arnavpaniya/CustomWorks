const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

const { Cashfree } = require("cashfree-pg");
const cashfreeService = require('../backend/services/cashfreeService');

// Use the instance or call cashfree.PGFetchOrder directly
const { CFEnvironment } = require("cashfree-pg");
const cashfree = new Cashfree(
  process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
    ? CFEnvironment.PRODUCTION 
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "",
  process.env.CASHFREE_SECRET_KEY || ""
);
cashfree.XApiVersion = "2023-08-01";

async function testFetch() {
  try {
    // Let's fetch the order we created earlier: CW-452995
    console.log("Fetching order CW-452995...");
    const response = await cashfree.PGFetchOrder("CW-452995");
    console.log("Order Response data:", JSON.stringify(response.data, null, 2));

    console.log("\nFetching payments for CW-452995...");
    const paymentsRes = await cashfree.PGOrderFetchPayments("CW-452995");
    console.log("Payments Response data:", JSON.stringify(paymentsRes.data, null, 2));
  } catch (error) {
    console.error("Fetch failed!");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

testFetch();
