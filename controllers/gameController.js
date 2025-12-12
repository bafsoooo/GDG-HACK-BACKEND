const Boss = require('../models/Boss');
const World = require('../models/World');
const Stage = require('../models/Stage');
const StoreItem = require('../models/StoreItem');
const GameSession = require('../models/GameSession');

exports.getBosses = async (req, res) => {
  try {
    const bosses = await Boss.find().populate('world stage');
    res.json(bosses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWorlds = async (req, res) => {
  try {
    const worlds = await World.find().sort('order');
    res.json(worlds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStagesByWorld = async (req, res) => {
  try {
    const stages = await Stage.find({ world: req.params.worldId }).populate('bosses');
    res.json(stages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStoreItems = async (req, res) => {
  try {
    const items = await StoreItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.saveSession = async (req, res) => {
  try {
    const payload = req.body;
    const session = new GameSession({ user: req.user, progress: payload.progress || {}, score: payload.score || 0, metadata: payload.metadata || {} });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await GameSession.find({ user: req.user }).sort('-createdAt');
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
