import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Calendar, Award, Target } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  frequency: string;
  completedDates: string[];
  streak: number;
  xpValue: number;
}

interface StatsProps {
  habits: Habit[];
}

const Stats: React.FC<StatsProps> = ({ habits = [] }) => {
  const calculateCompletionRate = (habits: Habit[]) => {
    if (!habits || habits.length === 0) return 0;
    const completedHabits = habits.filter(habit => 
      habit.completedDates?.includes(new Date().toISOString().split('T')[0])
    );
    return Math.round((completedHabits.length / habits.length) * 100);
  };

  const calculateTotalXP = (habits: Habit[]) => {
    if (!habits || habits.length === 0) return 0;
    return habits.reduce((total, habit) => total + (habit.xpValue || 0), 0);
  };

  const getLongestStreak = (habits: Habit[]) => {
    if (!habits || habits.length === 0) return 0;
    return Math.max(...habits.map(habit => habit.streak || 0));
  };

  const completionRate = calculateCompletionRate(habits);
  const totalXP = calculateTotalXP(habits);
  const longestStreak = getLongestStreak(habits);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {habits.length} habits today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total XP</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalXP}</div>
          <p className="text-xs text-muted-foreground">
            From all habits
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{longestStreak}</div>
          <p className="text-xs text-muted-foreground">
            Days in a row
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{habits.length}</div>
          <p className="text-xs text-muted-foreground">
            Active habits
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
