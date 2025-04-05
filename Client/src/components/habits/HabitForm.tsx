import React, { useState } from 'react';
import { Habit, useHabits, CATEGORIES } from '@/context/HabitContext';
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

  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [category, setCategory] = useState(habit?.category || CATEGORIES[0]);
  const [frequency, setFrequency] = useState<Habit['frequency']>(habit?.frequency || 'daily');
  const [schedule, setSchedule] = useState<Habit['schedule']>(habit?.schedule || {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true
  });
  const [timeOfDay, setTimeOfDay] = useState<Habit['timeOfDay']>(habit?.timeOfDay || 'morning');
  const [xpValue, setXpValue] = useState(habit?.xpValue || 50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Habit name is required",
        variant: "destructive",
      });
      return;
    }
    
    const habitData = {
      name,
      description,
      category,
      frequency,
      schedule,
      timeOfDay,
      xpValue,
      isActive: true
    };
    
    if (isEditing && habit) {
      updateHabit(habit.id, habitData);
      toast({
        title: "Habit updated",
        description: `${name} has been updated successfully.`,
      });
    } else {
      createHabit(habitData);
      toast({
        title: "Habit created",
        description: `${name} has been added to your habits.`,
      });
    }
    
    if (onSubmit) {
      onSubmit();
    }
  };

  const handleDayToggle = (day: keyof Habit['schedule']) => {
    setSchedule(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <div>
        <Label htmlFor="name">Habit Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="timeOfDay">Time of Day</Label>
          <Select
            value={timeOfDay}
            onValueChange={(value) => setTimeOfDay(value as Habit['timeOfDay'])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select time of day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="frequency">Frequency</Label>
        <Select
          value={frequency}
          onValueChange={(value) => setFrequency(value as Habit['frequency'])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block mb-2">Schedule</Label>
        <div className="grid grid-cols-7 gap-2">
          {(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const).map((day) => (
            <div key={day} className="flex flex-col items-center">
              <Checkbox 
                id={`day-${day}`}
                checked={schedule[day]}
                onCheckedChange={() => handleDayToggle(day)}
              />
              <Label htmlFor={`day-${day}`} className="text-sm mt-1">
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="xpValue">XP Value</Label>
        <Select
          value={xpValue.toString()}
          onValueChange={(value) => setXpValue(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select XP value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">Medium (50 XP)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
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
        <Button type="submit" className="bg-habit-purple text-white hover:bg-habit-purple/90">
          {isEditing ? 'Update Habit' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
};

export default HabitForm;
