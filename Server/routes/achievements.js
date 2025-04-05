const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Achievement = require('../models/Achievement');
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

// Get all achievements
router.get('/', auth, async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

// Get user's achievements
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('achievements');
    res.json(user.achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user achievements', error: error.message });
  }
});

// Check for new achievements
router.post('/check', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const achievements = await Achievement.find();
    const newAchievements = [];

    for (const achievement of achievements) {
      // Skip if user already has this achievement
      if (user.achievements.includes(achievement._id)) continue;

      // Check if user has earned this achievement
      const hasEarned = await achievement.checkEarned(user._id);
      if (hasEarned) {
        // Add achievement to user's achievements
        user.achievements.push(achievement._id);
        user.xp += achievement.xpReward;
        newAchievements.push(achievement);
      }
    }

    if (newAchievements.length > 0) {
      await user.save();
    }

    res.json({
      newAchievements,
      user: {
        xp: user.xp,
        level: user.level
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking achievements', error: error.message });
  }
});

// Create a new achievement (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin (you should implement proper admin check)
    const user = await User.findById(req.userId);
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can create achievements' });
    }

    const achievement = new Achievement(req.body);
    await achievement.save();

    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating achievement', error: error.message });
  }
});

module.exports = router; 