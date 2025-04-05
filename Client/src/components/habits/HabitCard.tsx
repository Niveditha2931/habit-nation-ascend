
import React from 'react';
import { Habit, useHabits } from '@/context/HabitContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Circle, Flame, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onEdit?: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit }) => {
  const { completeHabit, deleteHabit } = useHabits();
  const { toast } = useToast();

  const handleComplete = () => {
    completeHabit(habit.id);
    toast({
      title: `${habit.title} completed!`,
      description: `You earned ${habit.xpReward} XP! Current streak: ${habit.streakCount + 1}`,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${habit.title}?`)) {
      deleteHabit(habit.id);
      toast({
        title: "Habit deleted",
        description: `${habit.title} has been removed from your habits.`,
      });
    }
  };

  const formatDays = (days: number[]) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    if (days.length === 7) return 'Every day';
    
    return days.map(day => dayNames[day]).join(', ');
  };

  const getDifficultyBadge = (priority: 'low' | 'medium' | 'high') => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
    };
    
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div 
      className={cn(
        "habit-card", 
        habit.completedToday ? "habit-card-active" : "",
        "border-l-4"
      )}
      style={{ borderLeftColor: habit.color }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{habit.title}</h3>
          <p className="text-habit-gray text-sm">{habit.description}</p>
        </div>
        <div className="flex space-x-1">
          {onEdit && (
            <button 
              onClick={() => onEdit(habit)} 
              className="p-1 text-habit-gray hover:text-habit-purple"
            >
              <Edit size={18} />
            </button>
          )}
          <button 
            onClick={handleDelete} 
            className="p-1 text-habit-gray hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-purple-100 text-habit-purple px-2 py-0.5 rounded-full text-xs font-medium">
          {habit.category}
        </span>
        
        {habit.schedule !== 'custom' && (
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {habit.schedule}
          </span>
        )}
        
        {getDifficultyBadge(habit.priority)}
      </div>
      
      <div className="text-xs text-habit-gray mb-3">
        Schedule: {formatDays(habit.scheduleDays)}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Flame size={16} className="text-habit-orange mr-1" />
            <span className="text-sm font-medium">{habit.streakCount} streak</span>
          </div>
          <div className="text-sm font-medium">
            {habit.xpReward} XP
          </div>
        </div>
        
        <Button
          onClick={handleComplete}
          disabled={habit.completedToday}
          variant="ghost"
          className={cn(
            "hover:bg-habit-purple/10", 
            habit.completedToday ? "text-green-500" : "text-habit-purple"
          )}
        >
          {habit.completedToday ? (
            <CheckCircle className="mr-1.5" size={18} />
          ) : (
            <Circle className="mr-1.5" size={18} />
          )}
          {habit.completedToday ? 'Completed' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
};

export default HabitCard;
