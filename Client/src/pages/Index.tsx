
import React, { useState, useEffect } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from '@/components/dashboard/Dashboard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Award, Zap, Users, Target } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state
  if (isLoading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-2xl font-bold text-habit-purple">
          Loading HabitNation...
        </div>
      </div>
    );
  }

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // If not authenticated, show landing page with login/register form
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-habit-purple to-habit-blue text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Build better habits with <span className="text-yellow-300">HabitNation</span>
              </h1>
              <p className="text-xl mb-6 text-white/90">
                Track, gamify, and transform your daily routines with our powerful habit-building platform.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-yellow-300" size={20} />
                  <span>Create custom habits with flexible schedules</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-yellow-300" size={20} />
                  <span>Earn XP, level up, and unlock achievements</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-yellow-300" size={20} />
                  <span>Get motivation from our AI companion</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-yellow-300" size={20} />
                  <span>Track streaks and monitor your progress</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 bg-gray-50 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Join HabitNation
                  </h2>
                </div>
                <div className="p-6">
                  <AuthForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why HabitNation Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="bg-habit-purple/10 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-habit-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified System</h3>
              <p className="text-gray-600">Turn your habits into a game with XP, levels, and achievements.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="bg-habit-orange/10 p-4 rounded-full mb-4">
                <Target className="h-8 w-8 text-habit-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Tracking</h3>
              <p className="text-gray-600">Customizable schedules and intelligent habit recommendations.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="bg-habit-blue/10 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-habit-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Streak Rewards</h3>
              <p className="text-gray-600">Build momentum with streak tracking and earn bonus rewards.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="bg-habit-teal/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-habit-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Companion</h3>
              <p className="text-gray-600">Get personalized motivation and insights from your AI assistant.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Habits?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully built lasting habits with HabitNation.
          </p>
          <Button className="btn btn-primary text-lg px-8 py-6" onClick={() => window.scrollTo(0, 0)}>
            Get Started Today
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-habit-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold">
                Habit<span className="text-habit-blue">Nation</span>
              </div>
              <p className="text-gray-400 mt-1">Build better habits, one day at a time.</p>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HabitNation. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
