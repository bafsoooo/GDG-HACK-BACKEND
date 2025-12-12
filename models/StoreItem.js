const mongoose = require('mongoose');

const storeItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  type: { type: String, enum: ['consumable', 'equipment', 'skins', 'other'], default: 'other' },
  stats: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('StoreItem', storeItemSchema);
