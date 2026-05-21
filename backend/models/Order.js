const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerSnapshot: {
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String },
    variant: {
      size: { type: String },
      color: { type: String },
      material: { type: String }
    },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    customization: {
      text: { type: String },
      fontStyle: { type: String },
      textColor: { type: String },
      placement: { type: String },
      uploadedImageUrl: { type: String },
      additionalNotes: { type: String }
    },
    designStatus: { type: String, enum: ['pending_approval', 'approved', 'change_requested', 'not_required'], default: 'pending_approval' }
  }],
  pricing: {
    subtotal: { type: Number, required: true },
    discountCode: { type: String },
    discountAmount: { type: Number, default: 0 },
    gst: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },
  payment: {
    status: { type: String, enum: ['pending', 'partial', 'paid', 'cod', 'refunded', 'failed'], default: 'pending' },
    amountPaid: { type: Number, default: 0 },
    amountDue: { type: Number, default: 0 },
    method: { type: String },
    gatewayId: { type: String }
  },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  status: { type: String, enum: ['designing', 'processing', 'ready_to_ship', 'dispatched', 'delivered', 'cancelled', 'returned'], default: 'designing' },
  trackingNumber: { type: String },
  trackingUrl: { type: String },
  invoiceUrl: { type: String },
  adminNotes: [{
    note: { type: String },
    addedBy: { type: String },
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
