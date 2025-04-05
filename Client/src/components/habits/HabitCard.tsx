import React, { useState } from 'react';
import { Habit, useHabits } from '@/context/HabitContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Flame, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HabitTimer from './HabitTimer';

interface HabitCardProps {
  habit: Habit;
  onEdit?: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit }) => {
  const { completeHabit, deleteHabit } = useHabits();
  const { toast } = useToast();
  const [canComplete, setCanComplete] = useState(false);

  const handleComplete = () => {
    if (!canComplete) {
      toast({
        title: "Timer not completed",
        description: "Please complete the timer before marking the habit as done.",
        variant: "destructive",
      });
      return;
    }

    completeHabit(habit.id);
    toast({
      title: `${habit.name} completed!`,
      description: `You earned ${habit.xpValue} XP!`,
    });
    setCanComplete(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${habit.name}?`)) {
      deleteHabit(habit.id);
      toast({
        title: "Habit deleted",
        description: `${habit.name} has been removed from your habits.`,
      });
    }
  };

  const formatSchedule = (schedule: Habit['schedule']) => {
    const days = Object.entries(schedule)
      .filter(([_, isActive]) => isActive)
      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1, 3));
    
    if (days.length === 7) return 'Every day';
    return days.join(', ');
  };

  const getXPBadge = (xp: number) => {
    let color = 'bg-green-100 text-green-800';
    if (xp >= 100) {
      color = 'bg-orange-100 text-orange-800';
    } else if (xp >= 50) {
      color = 'bg-blue-100 text-blue-800';
    }
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {xp} XP
      </span>
    );
  };

  return (
    <div 
      className={cn(
        "habit-card flex flex-col p-4 bg-white rounded-lg shadow-sm border", 
        "border-l-4 border-l-habit-purple"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <p className="text-gray-600 text-sm">{habit.description}</p>
        </div>
        <div className="flex space-x-1">
          {onEdit && (
            <button 
              onClick={() => onEdit(habit)} 
              className="p-1 text-gray-400 hover:text-habit-purple"
            >
              <Edit size={18} />
            </button>
          )}
          <button 
            onClick={handleDelete} 
            className="p-1 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-purple-100 text-habit-purple px-2 py-0.5 rounded-full text-xs font-medium">
          {habit.category}
        </span>
        
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
          {habit.timeOfDay}
        </span>
        
        {getXPBadge(habit.xpValue)}
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        Schedule: {formatSchedule(habit.schedule)}
      </div>

      <div className="mt-auto">
        <div className="mb-3">
          <HabitTimer 
            duration={habit.duration || 25} 
            onComplete={() => setCanComplete(true)} 
          />
        </div>

        <Button
          onClick={handleComplete}
          className={cn(
            "w-full",
            !canComplete && "opacity-50 cursor-not-allowed"
          )}
          disabled={!canComplete}
        >
          Mark as Complete
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;