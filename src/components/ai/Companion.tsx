
import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

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
      text: `Hi ${user?.name || 'there'}! I'm your HabitNation companion. How can I help you with your habits today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking
    setTimeout(() => {
      // Generate AI response
      let response: string;
      
      if (input.toLowerCase().includes('motivation') || input.toLowerCase().includes('inspire')) {
        response = motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
      } else if (input.toLowerCase().includes('suggest') || input.toLowerCase().includes('recommend')) {
        response = suggestionResponses[Math.floor(Math.random() * suggestionResponses.length)];
      } else {
        response = "I'm here to help you build better habits. Try asking me for motivation, suggestions, or insights about your current habits!";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
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
                <p className="text-sm">{message.text}</p>
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
            placeholder="Ask for motivation or suggestions..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Companion;
