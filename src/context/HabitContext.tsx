
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type Schedule = '3-day' | '7-day' | '30-day' | 'custom';

export type Habit = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  schedule: Schedule;
  scheduleDays: number[];
  streakCount: number;
  totalCompletions: number;
  lastCompleted: Date | null;
  createdAt: Date;
  color: string;
  completedToday: boolean;
  xpReward: number;
  priority: 'low' | 'medium' | 'high';
};

export type HabitLog = {
  id: string;
  habitId: string;
  userId: string;
  date: Date;
  completed: boolean;
  note: string;
};

type HabitContextType = {
  habits: Habit[];
  habitLogs: HabitLog[];
  isLoading: boolean;
  createHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'streakCount' | 'totalCompletions' | 'lastCompleted' | 'completedToday'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string, note?: string) => void;
  getHabitById: (id: string) => Habit | undefined;
  getHabitsByCategory: (category: string) => Habit[];
  getDailyHabits: () => Habit[];
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Sample categories with colors
export const CATEGORIES = [
  { name: 'Health', color: '#8B5CF6' },
  { name: 'Fitness', color: '#F97316' },
  { name: 'Learning', color: '#0EA5E9' },
  { name: 'Productivity', color: '#14B8A6' },
  { name: 'Mindfulness', color: '#D946EF' },
  { name: 'Other', color: '#6B7280' },
];

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Mock data loading
      const storedHabits = localStorage.getItem(`habitNation_habits_${user.id}`);
      const storedLogs = localStorage.getItem(`habitNation_logs_${user.id}`);
      
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      } else {
        // Add sample habits for new users
        const sampleHabits: Habit[] = [
          {
            id: '1',
            userId: user.id,
            title: 'Morning Meditation',
            description: 'Start the day with 10 minutes of mindfulness',
            category: 'Mindfulness',
            schedule: '7-day',
            scheduleDays: [0, 1, 2, 3, 4, 5, 6],
            streakCount: 3,
            totalCompletions: 5,
            lastCompleted: new Date(Date.now() - 86400000),
            createdAt: new Date(Date.now() - 86400000 * 10),
            color: '#D946EF',
            completedToday: false,
            xpReward: 10,
            priority: 'medium',
          },
          {
            id: '2',
            userId: user.id,
            title: 'Read for 30 minutes',
            description: 'Read books to improve knowledge',
            category: 'Learning',
            schedule: '7-day',
            scheduleDays: [0, 1, 2, 3, 4, 5, 6],
            streakCount: 5,
            totalCompletions: 12,
            lastCompleted: new Date(Date.now() - 86400000),
            createdAt: new Date(Date.now() - 86400000 * 15),
            color: '#0EA5E9',
            completedToday: false,
            xpReward: 15,
            priority: 'medium',
          },
          {
            id: '3',
            userId: user.id,
            title: 'Workout',
            description: 'Exercise for 30 minutes',
            category: 'Fitness',
            schedule: '3-day',
            scheduleDays: [1, 3, 5],
            streakCount: 2,
            totalCompletions: 8,
            lastCompleted: new Date(Date.now() - 86400000 * 2),
            createdAt: new Date(Date.now() - 86400000 * 20),
            color: '#F97316',
            completedToday: false,
            xpReward: 20,
            priority: 'high',
          },
        ];
        
        setHabits(sampleHabits);
        localStorage.setItem(`habitNation_habits_${user.id}`, JSON.stringify(sampleHabits));
      }
      
      if (storedLogs) {
        setHabitLogs(JSON.parse(storedLogs));
      }
      
      setIsLoading(false);
    }
  }, [user]);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (user && habits.length > 0) {
      localStorage.setItem(`habitNation_habits_${user.id}`, JSON.stringify(habits));
    }
  }, [habits, user]);

  // Save habit logs to localStorage whenever they change
  useEffect(() => {
    if (user && habitLogs.length > 0) {
      localStorage.setItem(`habitNation_logs_${user.id}`, JSON.stringify(habitLogs));
    }
  }, [habitLogs, user]);

  const createHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'streakCount' | 'totalCompletions' | 'lastCompleted' | 'completedToday'>) => {
    if (!user) return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      userId: user.id,
      streakCount: 0,
      totalCompletions: 0,
      lastCompleted: null,
      createdAt: new Date(),
      completedToday: false,
      ...habitData,
    };
    
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, habitData: Partial<Habit>) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === id ? { ...habit, ...habitData } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setHabitLogs(prev => prev.filter(log => log.habitId !== id));
  };

  const completeHabit = (id: string, note: string = '') => {
    if (!user) return;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Check if habit exists
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    
    // Create a log entry
    const newLog: HabitLog = {
      id: Date.now().toString(),
      habitId: id,
      userId: user.id,
      date: now,
      completed: true,
      note,
    };
    
    setHabitLogs(prev => [...prev, newLog]);
    
    // Update the habit
    const lastCompleted = habit.lastCompleted 
      ? new Date(habit.lastCompleted) 
      : null;
    
    // Calculate streak - incremented if (last completion was yesterday OR this is the first completion)
    let newStreakCount = habit.streakCount;
    
    if (!lastCompleted) {
      // First completion
      newStreakCount = 1;
    } else {
      const lastCompletedDate = new Date(lastCompleted);
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Check if the last completion was yesterday
      if (lastCompletedDate.getFullYear() === yesterday.getFullYear() && 
          lastCompletedDate.getMonth() === yesterday.getMonth() && 
          lastCompletedDate.getDate() === yesterday.getDate()) {
        newStreakCount += 1;
      } else if (lastCompletedDate.getFullYear() === today.getFullYear() && 
                lastCompletedDate.getMonth() === today.getMonth() && 
                lastCompletedDate.getDate() === today.getDate()) {
        // Already completed today, do nothing
      } else {
        // Streak broken if last completion was not yesterday
        newStreakCount = 1;
      }
    }
    
    updateHabit(id, {
      lastCompleted: now,
      completedToday: true,
      streakCount: newStreakCount,
      totalCompletions: habit.totalCompletions + 1,
    });
  };

  const getHabitById = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  const getHabitsByCategory = (category: string) => {
    return habits.filter(habit => habit.category === category);
  };

  const getDailyHabits = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    return habits.filter(habit => {
      // For all days schedule types
      if (habit.schedule === '7-day') {
        return true;
      }
      
      // Check if today is in the scheduleDays array
      return habit.scheduleDays.includes(dayOfWeek);
    });
  };

  return (
    <HabitContext.Provider value={{
      habits,
      habitLogs,
      isLoading,
      createHabit,
      updateHabit,
      deleteHabit,
      completeHabit,
      getHabitById,
      getHabitsByCategory,
      getDailyHabits,
    }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
