
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useHabits } from '@/context/HabitContext';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Zap, Calendar, Activity } from 'lucide-react';

const Stats: React.FC = () => {
  const { user } = useAuth();
  const { habits, habitLogs } = useHabits();

  // Calculate completion rate
  const calculateCompletionRate = () => {
    if (habitLogs.length === 0) return 0;
    
    const completed = habitLogs.filter(log => log.completed).length;
    return Math.round((completed / habitLogs.length) * 100);
  };

  // Find longest streak
  const getLongestStreak = () => {
    if (habits.length === 0) return 0;
    
    return Math.max(...habits.map(habit => habit.streakCount));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="bg-white border border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-habit-purple/10 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-habit-purple" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Level</p>
              <h3 className="text-2xl font-bold">{user?.level || 1}</h3>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{user?.xp || 0} / {1000 * (user?.level || 1)} XP</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-habit-purple rounded-full"
                style={{ 
                  width: `${Math.min(100, ((user?.xp || 0) / (1000 * (user?.level || 1))) * 100)}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-habit-orange/10 p-3 rounded-full">
              <Zap className="h-6 w-6 text-habit-orange" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Streak</p>
              <h3 className="text-2xl font-bold">{user?.streakCount || 0} days</h3>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Longest streak</span>
              <span>{getLongestStreak()} days</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-habit-orange rounded-full"
                style={{ 
                  width: `${user?.streakCount ? (user.streakCount / Math.max(getLongestStreak(), 1)) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-habit-blue/10 p-3 rounded-full">
              <Target className="h-6 w-6 text-habit-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold">{calculateCompletionRate()}%</h3>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Target</span>
              <span>90%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-habit-blue rounded-full"
                style={{ width: `${Math.min(calculateCompletionRate(), 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border border-gray-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-habit-teal/10 p-3 rounded-full">
              <Activity className="h-6 w-6 text-habit-teal" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Habits</p>
              <h3 className="text-2xl font-bold">{habits.length}</h3>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Completed Today</span>
              <span>{habits.filter(h => h.completedToday).length} / {habits.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-habit-teal rounded-full"
                style={{ 
                  width: habits.length ? `${(habits.filter(h => h.completedToday).length / habits.length) * 100}%` : '0%' 
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
