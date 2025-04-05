const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Habit = require('../models/Habit');
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

// Get all habits for a user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits', error: error.message });
  }
});

// Create a new habit
router.post('/', auth, async (req, res) => {
  try {
    const habit = new Habit({
      ...req.body,
      user: req.userId
    });

    await habit.save();

    // Add habit to user's habits array
    await User.findByIdAndUpdate(req.userId, {
      $push: { habits: habit._id }
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating habit', error: error.message });
  }
});

// Update a habit
router.put('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit', error: error.message });
  }
});

// Delete a habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Remove habit from user's habits array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { habits: habit._id }
    });

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit', error: error.message });
  }
});

// Mark habit as completed
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    await habit.markCompleted();

    // Update user's XP and level
    const user = await User.findById(req.userId);
    user.xp += habit.xpValue;
    
    // Level up if XP threshold is reached
    const xpForNextLevel = user.level * 1000;
    if (user.xp >= xpForNextLevel) {
      user.level += 1;
    }

    await user.save();

    res.json({
      habit,
      user: {
        xp: user.xp,
        level: user.level
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing habit', error: error.message });
  }
});

module.exports = router; 