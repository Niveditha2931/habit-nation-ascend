import { Habit } from '@/context/HabitContext';

type CreateHabitData = Omit<Habit, 'id' | 'user' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>;

export const exampleHabits: CreateHabitData[] = [
  {
    name: "Morning Meditation",
    description: "Start your day with 10 minutes of mindful meditation",
    category: "Mindfulness",
    frequency: "daily",
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    timeOfDay: "morning",
    xpValue: 50,
    isActive: true,
    duration: 10
  },
  {
    name: "Exercise Routine",
    description: "30 minutes of physical activity",
    category: "Health & Fitness",
    frequency: "daily",
    schedule: {
      monday: true,
      wednesday: true,
      friday: true,
      tuesday: false,
      thursday: false,
      saturday: false,
      sunday: false
    },
    timeOfDay: "evening",
    xpValue: 100,
    isActive: true,
    duration: 30
  },
  {
    name: "Read a Book",
    description: "Read for at least 20 minutes",
    category: "Learning",
    frequency: "daily",
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    timeOfDay: "evening",
    xpValue: 75,
    isActive: true,
    duration: 20
  },
  {
    name: "Drink Water",
    description: "Drink 8 glasses of water throughout the day",
    category: "Health & Fitness",
    frequency: "daily",
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    timeOfDay: "morning",
    xpValue: 30,
    isActive: true,
    duration: 5
  },
  {
    name: "Practice Coding",
    description: "Spend 1 hour coding on personal projects",
    category: "Learning",
    frequency: "daily",
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    timeOfDay: "afternoon",
    xpValue: 150,
    isActive: true,
    duration: 60
  },
  {
    name: "Journal Writing",
    description: "Write about your day and reflect on your experiences",
    category: "Personal Growth",
    frequency: "daily",
    schedule: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    timeOfDay: "evening",
    xpValue: 50,
    isActive: true,
    duration: 15
  }
]; 