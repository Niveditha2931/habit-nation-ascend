import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Habit {
  id: string;
  name: string;
  description: string;
  user: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  schedule: string[];
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  streak: number;
  longestStreak: number;
  completedDates: { date: Date; completed: boolean }[];
  xpValue: number;
  isActive: boolean;
  createdAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
  note?: string;
}

export const CATEGORIES = [
  'Health & Fitness',
  'Mindfulness',
  'Learning',
  'Productivity',
  'Relationships',
  'Personal Growth',
  'Other'
];

interface HabitContextType {
  habits: Habit[];
  isLoading: boolean;
  createHabit: (habit: Omit<Habit, 'id' | 'user' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>) => Promise<void>;
  updateHabit: (id: string, habit: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<void>;
  getHabitById: (id: string) => Habit | undefined;
  getHabitsByCategory: (category: string) => Habit[];
  getDailyHabits: () => Habit[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchHabits();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch('http://localhost:5000/api/habits', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }

      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createHabit = async (habitData: Omit<Habit, 'id' | 'user' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates'>) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(habitData)
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      const newHabit = await response.json();
      setHabits(prev => [...prev, newHabit]);
      
      toast({
        title: "Habit created",
        description: "Your new habit has been added successfully.",
      });
    } catch (error) {
      console.error('Error creating habit:', error);
      toast({
        title: "Error",
        description: "Failed to create habit. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateHabit = async (id: string, habitData: Partial<Habit>) => {
    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(habitData)
      });

      if (!response.ok) {
        throw new Error('Failed to update habit');
      }

      const updatedHabit = await response.json();
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
      
      toast({
        title: "Habit updated",
        description: "Your habit has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete habit');
      }

      setHabits(prev => prev.filter(habit => habit.id !== id));
      
      toast({
        title: "Habit deleted",
        description: "Your habit has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const completeHabit = async (id: string) => {
    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch(`http://localhost:5000/api/habits/${id}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to complete habit');
      }

      const data = await response.json();
      setHabits(prev => prev.map(habit => 
        habit.id === id ? data.habit : habit
      ));
      
      toast({
        title: "Habit completed!",
        description: `You earned ${data.habit.xpValue} XP!`,
      });
    } catch (error) {
      console.error('Error completing habit:', error);
      toast({
        title: "Error",
        description: "Failed to complete habit. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getHabitById = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  const getHabitsByCategory = (category: string) => {
    return habits.filter(habit => habit.category === category);
  };

  const getDailyHabits = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return habits.filter(habit => {
      if (!habit.isActive) return false;
      
      const dayOfWeek = today.getDay();
      const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
      
      return habit.schedule.includes(dayName);
    });
  };

  return (
    <HabitContext.Provider value={{
      habits,
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
