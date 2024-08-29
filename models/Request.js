const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'processing', 'completed'], default: 'pending' },
  products: [{
    serialNumber: Number,
    productName: String,
    inputImageUrls: [String],
    outputImageUrls: [String]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
