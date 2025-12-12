const mongoose = require('mongoose');

const worldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  order: { type: Number, default: 0 },
  thumbnail: String
}, { timestamps: true });

module.exports = mongoose.model('World', worldSchema);
