const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: String, required: true },
  canvasJson: { type: Object }, // Fabric.js or Konva serialized canvas
  previewUrl: { type: String },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  adminNote: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Design', DesignSchema);
