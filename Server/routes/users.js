const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('habits')
      .populate('achievements');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    
    // Check if username or email is already taken
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }
    
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },
      { new: true, select: '-password' }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
});

// Update user password
router.put('/me/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.userId);
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
});

// Get user stats
router.get('/me/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('xp level streak habits achievements')
      .populate('habits')
      .populate('achievements');

    const stats = {
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      totalHabits: user.habits.length,
      activeHabits: user.habits.filter(h => h.isActive).length,
      totalAchievements: user.achievements.length,
      totalXPFromHabits: user.habits.reduce((sum, h) => sum + h.xpValue, 0),
      totalXPFromAchievements: user.achievements.reduce((sum, a) => sum + a.xpReward, 0)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user stats', error: error.message });
  }
});

module.exports = router; 