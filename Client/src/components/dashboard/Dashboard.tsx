import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useHabits, CATEGORIES } from '@/context/HabitContext';
import Stats from '@/components/ui/Stats';
import HabitCard from '@/components/habits/HabitCard';
import HabitForm from '@/components/habits/HabitForm';
import Companion from '@/components/ai/Companion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Flame, Calendar, ListTodo, LogOut, Award, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { habits, getDailyHabits } = useHabits();
  const [showAddHabitDialog, setShowAddHabitDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const navigate = useNavigate();

  const dailyHabits = getDailyHabits();

  const filteredHabits = selectedCategory
    ? habits.filter(habit => habit.category === selectedCategory)
    : dailyHabits;

  const handleEditHabit = (habit: any) => {
    setEditingHabit(habit);
    setShowAddHabitDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-habit-purple">
              Habit<span className="text-habit-blue">Nation</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="mr-3 text-right hidden sm:block">
                <div className="font-medium">{user?.name}</div>
                <div className="text-sm text-gray-500">Level {user?.level}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-habit-purple/10 flex items-center justify-center text-habit-purple font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <Stats />
        </section>
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.username}!</h1>
          <Button onClick={() => navigate('/habits/new')}>
            <Plus className="mr-2" size={18} />
            Add Habit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Today's Habits */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Today's Habits</h2>
                <Button 
                  onClick={() => {
                    setEditingHabit(null);
                    setShowAddHabitDialog(true);
                  }}
                  className="btn btn-primary"
                >
                  <PlusCircle className="mr-1.5" size={18} />
                  Add Habit
                </Button>
              </div>
              
              <Tabs defaultValue="daily" className="mb-6">
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="daily" className="data-[state=active]:bg-white">
                    <Calendar className="mr-1.5" size={16} />
                    Daily
                  </TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-white">
                    <ListTodo className="mr-1.5" size={16} />
                    All Habits
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="data-[state=active]:bg-white">
                    <Award className="mr-1.5" size={16} />
                    Categories
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily" className="mt-4">
                  <div className="space-y-4">
                    {dailyHabits.length > 0 ? (
                      dailyHabits.map(habit => (
                        <HabitCard 
                          key={habit.id} 
                          habit={habit} 
                          onEdit={handleEditHabit}
                        />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <div className="text-center">
                            <h3 className="font-semibold text-lg mb-2">No habits for today</h3>
                            <p className="text-gray-500 mb-4">Add a new habit to get started on your journey!</p>
                            <Button 
                              onClick={() => setShowAddHabitDialog(true)}
                              className="btn btn-primary"
                            >
                              Add Your First Habit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4">
                    {habits.length > 0 ? (
                      habits.map(habit => (
                        <HabitCard 
                          key={habit.id} 
                          habit={habit} 
                          onEdit={handleEditHabit}
                        />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <p className="text-gray-500">You don't have any habits yet.</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="categories" className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Button>
                    {CATEGORIES.map(category => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setSelectedCategory(category.name)}
                        style={{
                          backgroundColor: selectedCategory === category.name ? category.color : 'transparent',
                          color: selectedCategory === category.name ? 'white' : 'inherit',
                          borderColor: category.color
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    {filteredHabits.length > 0 ? (
                      filteredHabits.map(habit => (
                        <HabitCard 
                          key={habit.id} 
                          habit={habit} 
                          onEdit={handleEditHabit}
                        />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                          <p className="text-gray-500">
                            {selectedCategory ? `No habits in ${selectedCategory} category.` : 'No habits for today.'}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          </div>
          
          {/* AI Companion */}
          <div>
            <h2 className="text-xl font-bold mb-4">AI Companion</h2>
            <div className="h-[600px]">
              <Companion />
            </div>
          </div>
        </div>
      </main>
      
      {/* Add/Edit Habit Dialog */}
      <Dialog 
        open={showAddHabitDialog} 
        onOpenChange={setShowAddHabitDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingHabit ? 'Edit Habit' : 'Create New Habit'}</DialogTitle>
          </DialogHeader>
          <HabitForm 
            habit={editingHabit}
            onSubmit={() => {
              setShowAddHabitDialog(false);
              setEditingHabit(null);
            }}
            onCancel={() => {
              setShowAddHabitDialog(false);
              setEditingHabit(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
