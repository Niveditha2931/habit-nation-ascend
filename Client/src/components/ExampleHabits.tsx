import React from 'react';
import { Button } from '@/components/ui/button';
import { useHabits } from '@/context/HabitContext';
import { exampleHabits } from '@/data/exampleHabits';

const ExampleHabits: React.FC = () => {
  const { createHabit } = useHabits();

  const addExampleHabits = async () => {
    try {
      for (const habit of exampleHabits) {
        await createHabit(habit);
      }
    } catch (error) {
      console.error('Error adding example habits:', error);
    }
  };

  return (
    <div className="p-4">
      <Button 
        onClick={addExampleHabits}
        className="bg-primary hover:bg-primary-dark text-white"
      >
        Add Example Habits
      </Button>
    </div>
  );
};

export default ExampleHabits; 