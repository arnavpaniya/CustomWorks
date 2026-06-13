const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
const axios = require('axios');

const payload = {
  items: [
    {
      productId: "visiting-card-300gsm",
      name: "Premium Visiting Cards",
      price: 1.75,
      quantity: 200
    }
  ],
  address: {
    name: "John Doe",
    phone: "9876543210",
    line1: "123 Main St",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001"
  },
  subtotal: 350,
  gst: 63,
  shipping: 40,
  total: 453,
  paymentMethod: "ONLINE"
};

async function testApi() {
  try {
    const res = await axios.post('http://localhost:4000/api/orders/checkout', payload);
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

testApi();
