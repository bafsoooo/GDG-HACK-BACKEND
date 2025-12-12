const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  world: { type: mongoose.Schema.Types.ObjectId, ref: 'World', required: true },
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
  description: String,
  bosses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Boss' }]
}, { timestamps: true });

module.exports = mongoose.model('Stage', stageSchema);
