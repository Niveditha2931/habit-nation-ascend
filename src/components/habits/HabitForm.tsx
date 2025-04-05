
import React, { useState, useEffect } from 'react';
import { Habit, Schedule, useHabits, CATEGORIES } from '@/context/HabitContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type HabitFormProps = {
  habit?: Habit;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const HabitForm: React.FC<HabitFormProps> = ({ habit, onSubmit, onCancel }) => {
  const isEditing = !!habit;
  const { createHabit, updateHabit } = useHabits();
  const { toast } = useToast();

  const [title, setTitle] = useState(habit?.title || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [category, setCategory] = useState(habit?.category || 'Health');
  const [schedule, setSchedule] = useState<Schedule>(habit?.schedule || '7-day');
  const [scheduleDays, setScheduleDays] = useState<number[]>(habit?.scheduleDays || [0, 1, 2, 3, 4, 5, 6]);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(habit?.priority || 'medium');
  const [xpReward, setXpReward] = useState(habit?.xpReward || 10);
  const [color, setColor] = useState(habit?.color || CATEGORIES[0].color);

  useEffect(() => {
    // Set color based on selected category
    const categoryObj = CATEGORIES.find(cat => cat.name === category);
    if (categoryObj) {
      setColor(categoryObj.color);
    }
  }, [category]);

  useEffect(() => {
    // Set schedule days based on schedule type
    if (schedule === '7-day') {
      setScheduleDays([0, 1, 2, 3, 4, 5, 6]);
    } else if (schedule === '3-day') {
      setScheduleDays([1, 3, 5]); // Mon, Wed, Fri
    } else if (schedule === '30-day') {
      // For simplicity, we're just setting all days for 30-day schedule
      setScheduleDays([0, 1, 2, 3, 4, 5, 6]);
    }
  }, [schedule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Habit name is required",
        variant: "destructive",
      });
      return;
    }
    
    const habitData = {
      title,
      description,
      category,
      schedule,
      scheduleDays,
      priority,
      xpReward,
      color,
    };
    
    if (isEditing && habit) {
      updateHabit(habit.id, habitData);
      toast({
        title: "Habit updated",
        description: `${title} has been updated successfully.`,
      });
    } else {
      createHabit(habitData);
      toast({
        title: "Habit created",
        description: `${title} has been added to your habits.`,
      });
    }
    
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleDayToggle = (day: number) => {
    if (schedule !== 'custom') {
      setSchedule('custom');
    }
    
    if (scheduleDays.includes(day)) {
      setScheduleDays(scheduleDays.filter(d => d !== day));
    } else {
      setScheduleDays([...scheduleDays, day].sort((a, b) => a - b));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div>
        <Label htmlFor="title">Habit Name</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What habit would you like to build?"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your habit (optional)"
          className="mt-1"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={priority}
            onValueChange={(val: 'low' | 'medium' | 'high') => setPriority(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (5 XP)</SelectItem>
              <SelectItem value="medium">Medium (10 XP)</SelectItem>
              <SelectItem value="high">High (20 XP)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="schedule">Schedule</Label>
        <Select
          value={schedule}
          onValueChange={(val: Schedule) => setSchedule(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7-day">Every day</SelectItem>
            <SelectItem value="3-day">3 days a week (Mon, Wed, Fri)</SelectItem>
            <SelectItem value="30-day">Monthly cycle</SelectItem>
            <SelectItem value="custom">Custom days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {schedule === 'custom' && (
        <div>
          <Label className="block mb-2">Custom Schedule</Label>
          <div className="flex space-x-2 flex-wrap gap-y-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={day} className="flex items-center space-x-1">
                <Checkbox 
                  id={`day-${index}`}
                  checked={scheduleDays.includes(index)}
                  onCheckedChange={() => handleDayToggle(index)}
                />
                <Label htmlFor={`day-${index}`} className="text-sm cursor-pointer">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Habit' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
};

export default HabitForm;
