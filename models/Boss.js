const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hp: { type: Number, default: 100 },
  attack: { type: Number, default: 10 },
  world: { type: mongoose.Schema.Types.ObjectId, ref: 'World' },
  stage: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' },
  description: String,
  loot: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Boss', bossSchema);
