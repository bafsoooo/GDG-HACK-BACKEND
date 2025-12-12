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

// ----- Create / Update / Delete operations -----
exports.createWorld = async (req, res) => {
  try {
    const world = new World(req.body);
    await world.save();
    res.status(201).json(world);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateWorld = async (req, res) => {
  try {
    const world = await World.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!world) return res.status(404).json({ message: 'World not found' });
    res.json(world);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteWorld = async (req, res) => {
  try {
    const world = await World.findByIdAndDelete(req.params.id);
    if (!world) return res.status(404).json({ message: 'World not found' });
    res.json({ message: 'World deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStage = async (req, res) => {
  try {
    const stage = new Stage(req.body);
    await stage.save();
    res.status(201).json(stage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stage) return res.status(404).json({ message: 'Stage not found' });
    res.json(stage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStage = async (req, res) => {
  try {
    const stage = await Stage.findByIdAndDelete(req.params.id);
    if (!stage) return res.status(404).json({ message: 'Stage not found' });
    res.json({ message: 'Stage deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBoss = async (req, res) => {
  try {
    const boss = new Boss(req.body);
    await boss.save();
    res.status(201).json(boss);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBoss = async (req, res) => {
  try {
    const boss = await Boss.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!boss) return res.status(404).json({ message: 'Boss not found' });
    res.json(boss);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBoss = async (req, res) => {
  try {
    const boss = await Boss.findByIdAndDelete(req.params.id);
    if (!boss) return res.status(404).json({ message: 'Boss not found' });
    res.json({ message: 'Boss deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createStoreItem = async (req, res) => {
  try {
    const item = new StoreItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStoreItem = async (req, res) => {
  try {
    const item = await StoreItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStoreItem = async (req, res) => {
  try {
    const item = await StoreItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await GameSession.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await GameSession.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ message: 'Session deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
