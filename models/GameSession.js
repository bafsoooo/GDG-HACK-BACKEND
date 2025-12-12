const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Object },
  score: { type: Number, default: 0 },
  metadata: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('GameSession', gameSessionSchema);
