import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Simulated AI responses based on user's progress
const motivationalResponses = [
  "Great job keeping your streak! You're building powerful habits day by day.",
  "Remember why you started. Each small step is progress toward your goals.",
  "Consistency is key to transformation. You're doing fantastic!",
  "Your dedication is inspiring. Keep up the amazing work!",
  "Small daily improvements lead to remarkable results over time.",
  "You've got this! Each habit you complete strengthens your resolve.",
  "Today's efforts become tomorrow's results. Keep pushing!",
  "Need motivation? Remember how good it feels when you complete your habits.",
  "Success isn't always about greatness, but about consistency.",
  "You're building an impressive streak! Momentum is on your side.",
];

const suggestionResponses = [
  "Based on your current habits, have you considered adding a short meditation practice?",
  "Reading for just 15 minutes a day compounds to over 90 hours in a year!",
  "Many users find that morning habits are completed more consistently.",
  "For your fitness goals, consider adding a stretching routine on your rest days.",
  "Drinking water first thing in the morning can boost your energy levels.",
  "Journaling pairs well with your existing mindfulness habits.",
  "Try the 2-minute rule: if something takes less than 2 minutes, do it now.",
  "Setting a specific time for your habits increases completion rates by 40%.",
  "Your consistency is building - this is the perfect time to increase your challenge level.",
  "Have you tracked your mood alongside your habits? It can reveal interesting patterns.",
];

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const Companion: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${user?.username || 'there'}! I'm your HabitNation companion. How can I help you with your habits today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for new achievements when component mounts
    checkAchievements();
  }, []);

  const checkAchievements = async () => {
    try {
      const token = localStorage.getItem('habitNationToken');
      const response = await fetch('http://localhost:5000/api/achievements/check', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check achievements');
      }

      const data = await response.json();
      
      if (data.newAchievements.length > 0) {
        const achievementMessage = {
          id: Date.now().toString(),
          text: `Congratulations! You've earned ${data.newAchievements.length} new achievement${data.newAchievements.length > 1 ? 's' : ''}!`,
          sender: 'ai' as const,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, achievementMessage]);
        
        data.newAchievements.forEach((achievement: any) => {
          const achievementDetail = {
            id: Date.now().toString(),
            text: `🏆 ${achievement.name}: ${achievement.description}`,
            sender: 'ai' as const,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, achievementDetail]);
        });
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get user stats for context
      const token = localStorage.getItem('habitNationToken');
      const statsResponse = await fetch('http://localhost:5000/api/users/me/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!statsResponse.ok) {
        throw new Error('Failed to fetch user stats');
      }

      const stats = await statsResponse.json();
      
      // Generate AI response based on user's progress and input
      let response: string;
      
      if (input.toLowerCase().includes('motivation') || input.toLowerCase().includes('inspire')) {
        response = generateMotivationalResponse(stats);
      } else if (input.toLowerCase().includes('suggest') || input.toLowerCase().includes('recommend')) {
        response = generateSuggestionResponse(stats);
      } else if (input.toLowerCase().includes('progress') || input.toLowerCase().includes('stats')) {
        response = generateProgressResponse(stats);
      } else {
        response = "I'm here to help you build better habits. Try asking me about your progress, for motivation, or for suggestions!";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMotivationalResponse = (stats: any) => {
    const responses = [
      `You're doing amazing! With ${stats.streak} days streak and ${stats.totalHabits} habits, you're building a strong foundation for success.`,
      `Your dedication is inspiring! Level ${stats.level} with ${stats.xp} XP shows your commitment to growth.`,
      `Keep pushing forward! You've completed ${stats.activeHabits} habits today, and that's something to be proud of.`,
      `Remember why you started. Each of your ${stats.totalHabits} habits is a step toward your goals.`,
      `Your ${stats.streak} day streak is impressive! Keep the momentum going.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateSuggestionResponse = (stats: any) => {
    const responses = [
      `Based on your current progress, consider adding a morning routine to boost your ${stats.streak} day streak.`,
      `You've mastered ${stats.totalHabits} habits! How about adding a new challenge to reach level ${stats.level + 1}?`,
      `Your completion rate is ${Math.round((stats.activeHabits / stats.totalHabits) * 100)}%. Try focusing on consistency with your existing habits.`,
      `With ${stats.xp} XP, you're close to leveling up! Adding a new habit could help you reach the next milestone.`,
      `Your ${stats.streak} day streak is impressive! Consider adding a complementary habit to strengthen your routine.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateProgressResponse = (stats: any) => {
    return `Here's your progress summary:
• Level: ${stats.level}
• XP: ${stats.xp}
• Current Streak: ${stats.streak} days
• Total Habits: ${stats.totalHabits}
• Active Habits: ${stats.activeHabits}
• Total Achievements: ${stats.totalAchievements}
• XP from Habits: ${stats.totalXPFromHabits}
• XP from Achievements: ${stats.totalXPFromAchievements}`;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="text-habit-purple mr-2" size={18} />
          AI Companion
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-0">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-habit-purple text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center mb-1">
                    <Bot size={14} className="mr-1" />
                    <span className="text-xs font-medium">HabitBot</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your progress, for motivation, or suggestions..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Companion;
