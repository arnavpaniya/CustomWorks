const axios = require('axios');

const SWIPE_API_KEY = process.env.SWIPE_API_KEY;
const SWIPE_BASE_URL = 'https://api.getswipe.in/api';

/**
 * Service to handle interactions with the Swipe Billing API
 */
class SwipeService {
  /**
   * Create an invoice in Swipe
   * @param {Object} orderData - Our local order object
   */
  async createInvoice(orderData) {
    if (!SWIPE_API_KEY) {
      console.warn('Swipe API key is not configured. Skipping Swipe invoice creation.');
      return null;
    }

    try {
      const payload = {
        customer: {
          name: orderData.customerSnapshot.name,
          phone: orderData.customerSnapshot.phone || '',
          email: orderData.customerSnapshot.email || '',
          address: orderData.shippingAddress.line1 + ', ' + orderData.shippingAddress.line2,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          pincode: orderData.shippingAddress.pincode
        },
        items: orderData.items.map(item => ({
          name: item.productName,
          description: item.variant ? Object.values(item.variant).join(' - ') : '',
          quantity: item.quantity,
          rate: item.unitPrice,
          tax: 18 // Example standard GST, can be modified based on exact item requirements
        })),
        settings: {
          round_off: true,
          terms: "Thank you for shopping with CustomWorks."
        }
      };

      const response = await axios.post(`${SWIPE_BASE_URL}/invoices`, payload, {
        headers: {
          'Authorization': `Bearer ${SWIPE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.success) {
        return {
          invoiceId: response.data.data.id,
          invoiceUrl: response.data.data.pdf_url
        };
      }
      
      console.error('Swipe API responded with error:', response.data);
      return null;
    } catch (error) {
      console.error('Failed to create Swipe invoice:', error.message);
      return null;
    }
  }
}

module.exports = new SwipeService();
