const { Cashfree } = require("cashfree-pg");

// Configure Cashfree SDK
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX;

/**
 * Creates a payment session with Cashfree for a given order
 * @param {Object} order - The order object
 * @returns {Promise<Object>} The Cashfree response containing payment_session_id
 */
const createPaymentSession = async (order) => {
  try {
    if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      console.warn("Cashfree credentials not found. Ensure CASHFREE_APP_ID and CASHFREE_SECRET_KEY are set in .env");
      throw new Error("Cashfree credentials missing");
    }

    const request = {
      order_amount: order.pricing.totalAmount,
      order_currency: "INR",
      order_id: order.id,
      customer_details: {
        customer_id: order.customerSnapshot.phone.replace(/[^0-9]/g, "") || "cust_unknown",
        customer_phone: order.customerSnapshot.phone.replace(/[^0-9]/g, "").slice(-10) || "9999999999",
        customer_name: order.customerSnapshot.name || "Guest Customer",
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/order-success?order_id={order_id}`
      }
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    return response.data;
  } catch (error) {
    console.error("Error creating Cashfree payment session:", error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Verifies the Cashfree webhook signature
 */
const verifyWebhookSignature = (signature, rawBody, timestamp) => {
  try {
    return Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return false;
  }
};

module.exports = {
  createPaymentSession,
  verifyWebhookSignature
};
