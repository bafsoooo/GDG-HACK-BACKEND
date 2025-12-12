require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

module.exports = async function (req, res, next) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    // attach user id to request
    req.user = payload.id;
    // optional: fetch user
    try {
      req.userDoc = await User.findById(req.user).select('-password');
    } catch (e) {
      req.userDoc = null;
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
