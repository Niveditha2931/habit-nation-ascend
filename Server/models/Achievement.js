const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  xpReward: {
    type: Number,
    required: true,
    default: 100
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['streak', 'level', 'habit', 'special'],
    required: true
  },
  requirements: {
    type: Map,
    of: Number,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to check if a user has earned this achievement
achievementSchema.methods.checkEarned = async function(userId) {
  const User = mongoose.model('User');
  const user = await User.findById(userId);
  
  if (!user) return false;
  
  // Check if user already has this achievement
  if (user.achievements.includes(this._id)) return true;
  
  // Check requirements based on category
  switch (this.category) {
    case 'streak':
      return user.streak >= this.requirements.get('streak');
    case 'level':
      return user.level >= this.requirements.get('level');
    case 'habit':
      return user.habits.length >= this.requirements.get('habits');
    case 'special':
      // Special achievements might have custom logic
      return false;
    default:
      return false;
  }
};

module.exports = mongoose.model('Achievement', achievementSchema); 