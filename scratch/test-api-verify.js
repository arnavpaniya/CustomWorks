const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
const axios = require('axios');

async function testVerify() {
  try {
    const orderId = "CW-452995";
    console.log(`Calling verify-payment API for order ${orderId}...`);
    const res = await axios.get(`http://localhost:4000/api/orders/${orderId}/verify-payment`);
    console.log("API Response Status:", res.status);
    console.log("API Response Data:", JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error("API Request Failed!");
    if (error.response) {
      console.error("Response Error:", error.response.status, error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testVerify();
