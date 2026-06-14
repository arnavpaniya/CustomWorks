const { Cashfree, CFEnvironment } = require("cashfree-pg");

// Configure and instantiate Cashfree SDK instance
const cashfree = new Cashfree(
  process.env.CASHFREE_ENVIRONMENT === "PRODUCTION" 
    ? CFEnvironment.PRODUCTION 
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID || "",
  process.env.CASHFREE_SECRET_KEY || ""
);

// Explicitly set API version to match the expected version
cashfree.XApiVersion = "2023-08-01";

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
        return_url: `${process.env.FRONTEND_URL || "https://www.customworks.in"}/order-success?order_id={order_id}`
      }
    };

    const response = await cashfree.PGCreateOrder(request);
    return response.data;
  } catch (error) {
    console.error("Error creating Cashfree payment session:", error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Fetches order and payments from Cashfree to verify payment status
 */
const verifyPayment = async (orderId) => {
  try {
    const orderRes = await cashfree.PGFetchOrder(orderId);
    const orderData = orderRes.data;

    let paymentDetails = {
      cf_order_id: orderData.cf_order_id,
      order_amount: orderData.order_amount,
      payment_status: orderData.order_status,
      payment_method: null,
      cf_payment_id: null,
      payment_time: null
    };

    if (orderData.order_status === 'PAID') {
      try {
        const paymentsRes = await cashfree.PGOrderFetchPayments(orderId);
        const successfulPayment = paymentsRes.data.find(p => p.payment_status === 'SUCCESS');
        if (successfulPayment) {
          paymentDetails.cf_payment_id = successfulPayment.cf_payment_id;
          if (successfulPayment.payment_details) {
            paymentDetails.payment_method = Object.keys(successfulPayment.payment_details)[0];
          } else {
            paymentDetails.payment_method = successfulPayment.payment_group || 'cashfree';
          }
          paymentDetails.payment_time = successfulPayment.payment_completion_time;
        }
      } catch (payErr) {
        console.error(`Failed to fetch payment details for ${orderId}:`, payErr.message);
      }
    }

    return paymentDetails;
  } catch (error) {
    console.error(`Failed to fetch order from Cashfree for ${orderId}:`, error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Verifies the Cashfree webhook signature
 */
const verifyWebhookSignature = (signature, rawBody, timestamp) => {
  try {
    return cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return false;
  }
};

module.exports = {
  createPaymentSession,
  verifyPayment,
  verifyWebhookSignature
};
