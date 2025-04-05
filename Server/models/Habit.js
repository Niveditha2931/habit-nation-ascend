const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  schedule: {
    type: Map,
    of: Boolean,
    default: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    }
  },
  timeOfDay: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'anytime'],
    default: 'anytime'
  },
  streak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  completedDates: [{
    date: Date,
    completed: Boolean
  }],
  xpValue: {
    type: Number,
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to mark habit as completed
habitSchema.methods.markCompleted = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const existingEntry = this.completedDates.find(
    entry => entry.date.getTime() === today.getTime()
  );
  
  if (!existingEntry) {
    this.completedDates.push({ date: today, completed: true });
    this.streak += 1;
    
    if (this.streak > this.longestStreak) {
      this.longestStreak = this.streak;
    }
  }
  
  return this.save();
};

module.exports = mongoose.model('Habit', habitSchema); 