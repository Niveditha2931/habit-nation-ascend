import React from 'react';
import { Card } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { useHabits } from '@/context/HabitContext';

const Stats: React.FC = () => {
  const { habits } = useHabits();

  const calculateTotalXP = () => {
    if (!habits || habits.length === 0) return 0;
    return habits.reduce((total, habit) => total + (habit.xpValue || 0), 0);
  };

  const getLongestStreak = () => {
    if (!habits || habits.length === 0) return 0;
    return Math.max(...habits.map(habit => habit.longestStreak || 0));
  };

  const totalXP = calculateTotalXP();
  const longestStreak = getLongestStreak();

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <Card className="flex flex-row items-start w-full p-6 bg-highlight shadow-none gap-6 justify-between">
        <div className="flex flex-row gap-6">
          {/* Companion Image */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-32 h-25 rounded-2xl bg-accent overflow-hidden">
              <img 
                src="image.png"
                alt="Companion" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-10 h-10">
              <img 
                src="https://media.istockphoto.com/id/1208589081/vector/romantic-half-heart-vector-illustration-isolated-white-background.jpg?s=612x612&w=0&k=20&c=DBK8ju6UkAc5Azmgwy8PLS10eyLjonvC64BPcWv2cco="
                alt="Heart"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          {/* Avatar and Stats */}
          <div className="flex flex-row items-start gap-6 ms-10">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-accent">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/027/294/895/non_2x/imaginative-and-lovable-game-character-for-tshirt-graphic-generative-ai-free-png.png"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats Container */}
            <div className="flex flex-col gap-4 m-10 me-10">
              {/* Streak */}
              <div className="flex items-center gap-2">
                <Flame className="h-10 w-10 text-primary" />
                <span className="text-2xl font-semibold text-primary">{longestStreak}</span>
              </div>

              {/* XP Progress */}
              <div className="w-48">
                <div className="flex justify-between text-xl text-primary mb-1">
                  <span>XP</span>
                  <span>{totalXP}/1000</span>
                </div>
                <div className="w-full bg-accent/20 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((totalXP / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated GIF */}
        <div className="w-30 h-40">
          <img 
            src="https://i.pinimg.com/originals/f6/92/45/f6924534601bf5ee4c11051a7f3c9efa.gif"
            alt="Animated Character"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      </Card>
    </div>
  );
};

export default Stats;
