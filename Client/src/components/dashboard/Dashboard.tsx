import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useHabits, CATEGORIES } from '@/context/HabitContext';
import Stats from '@/components/ui/Stats';
import HabitCard from '@/components/habits/HabitCard';
import HabitForm from '@/components/habits/HabitForm';
import Companion from '@/components/ai/Companion';
import ExampleHabits from '@/components/ExampleHabits';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Flame, Calendar, ListTodo, LogOut, Award, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import Community from '../ui/community';
=======
import { cn } from '@/lib/utils';
>>>>>>> f4b9d5d6c0bd3276c6311c3e651ef26035529769

type Habit = {
  id: string;
  title: string;
  category: string;
  [key: string]: any;
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { habits, getDailyHabits } = useHabits();
  const [showAddHabitDialog, setShowAddHabitDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleImageClick = () => {
    return <Community/>// Mention your route here
  };

  const dailyHabits = getDailyHabits();

  const filteredHabits = selectedCategory
    ? habits.filter(habit => habit.category === selectedCategory)
    : dailyHabits;

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowAddHabitDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-habit-purple">
            Habit<span className="text-habit-blue">Nation</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="mr-3 text-right hidden sm:block">
                <div className='mr-12 cursor-pointer' onClick={()=>handleImageClick} >
                  <img src=".././public/logo1.png" 
                  width={50}
                  height={100} alt="logo"  />

                </div>
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

        <div className="flex justify-between items-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.username || user?.name || 'User'}!
          </h1>

          {/* Hoverable Rewards/Shop Menu */}
          <div className="flex space-x-4 relative z-10">
            {/* Rewards */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredTab('rewards')}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <Button variant="outline" className="flex items-center space-x-1">
                <Award size={16} />
                <span>Rewards</span>
              </Button>
              {hoveredTab === 'rewards' && (
                <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg border border-gray-200 rounded-md p-3 space-y-1">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Reward Options</div>
                  <div className="text-sm text-gray-600 hover:text-habit-purple cursor-pointer">🎟️ Coupons</div>
                  <div className="text-sm text-gray-600 hover:text-habit-purple cursor-pointer">⏳ Time Machine</div>
                  <div className="text-sm text-gray-600 hover:text-habit-purple cursor-pointer">🛡️ Protection Points</div>
                </div>
              )}
            </div>

            {/* Shop */}
            <div
              className="relative"
              onMouseEnter={() => setHoveredTab('shop')}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <Button variant="outline" className="flex items-center space-x-1">
                <User size={16} />
                <span>Shop</span>
              </Button>
              {hoveredTab === 'shop' && (
                <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg border border-gray-200 rounded-md p-3 space-y-1">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Shop Items</div>
                  <div className="text-sm text-gray-600 hover:text-habit-blue cursor-pointer">⌚ Watches</div>
                  <div className="text-sm text-gray-600 hover:text-habit-blue cursor-pointer">👟 Shoes</div>
                  <div className="text-sm text-gray-600 hover:text-habit-blue cursor-pointer">💄 Beauty Products</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Habits Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Today's Habits</h2>
                <Button
                  onClick={() => {
                    setEditingHabit(null);
                    setShowAddHabitDialog(true);
                  }}
                  className="bg-habit-purple text-white hover:bg-habit-purple/90"
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
                

                {/* Daily */}
                <TabsContent value="daily" className="mt-4">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {dailyHabits.length > 0 ? (
                      dailyHabits.map(habit => (
                        <HabitCard key={habit.id} habit={habit} onEdit={handleEditHabit} />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <div className="text-center">
                            <h3 className="font-semibold text-lg mb-2">No habits for today</h3>
                            <p className="text-gray-500 mb-4">Add some habits to get started!</p>
                            <div className="space-y-4">
                              <Button
                                onClick={() => setShowAddHabitDialog(true)}
                                className="bg-primary text-white hover:bg-primary-dark"
                              >
                                Add Your First Habit
                              </Button>
                              {habits.length === 0 && (
                                <div className="pt-4">
                                  <p className="text-gray-500 mb-2">Or start with some example habits:</p>
                                  <ExampleHabits />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* All Habits */}
                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {habits.length > 0 ? (
                      habits.map(habit => (
                        <HabitCard key={habit.id} habit={habit} onEdit={handleEditHabit} />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-10">
                          <div className="text-center">
                            <h3 className="font-semibold text-lg mb-2">No habits yet</h3>
                            <p className="text-gray-500 mb-4">Start by adding some habits to track!</p>
                            <div className="space-y-4">
                              <Button
                                onClick={() => setShowAddHabitDialog(true)}
                                className="bg-primary text-white hover:bg-primary-dark"
                              >
                                Add Your First Habit
                              </Button>
                              <div className="pt-4">
                                <p className="text-gray-500 mb-2">Or start with some example habits:</p>
                                <ExampleHabits />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {/* Categories */}
                <TabsContent value="categories" className="mt-4">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        variant={selectedCategory === null ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => setSelectedCategory(null)}
                      >
                        All
                      </Button>
                      {CATEGORIES.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? 'default' : 'outline'}
                          className={cn(
                            "rounded-full",
                            selectedCategory === category ? "bg-habit-purple text-white" : "text-habit-purple"
                          )}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {selectedCategory ? (
                        habits.filter(habit => habit.category === selectedCategory).length > 0 ? (
                          habits
                            .filter(habit => habit.category === selectedCategory)
                            .map(habit => (
                              <HabitCard key={habit.id} habit={habit} onEdit={handleEditHabit} />
                            ))
                        ) : (
                          <Card>
                            <CardContent className="flex flex-col items-center justify-center py-8">
                              <p className="text-gray-500">
                                No habits in {selectedCategory} category.
                              </p>
                              <Button
                                onClick={() => {
                                  setEditingHabit(null);
                                  setShowAddHabitDialog(true);
                                }}
                                className="mt-4 bg-habit-purple text-white hover:bg-habit-purple/90"
                              >
                                <PlusCircle className="mr-1.5" size={18} />
                                Add {selectedCategory} Habit
                              </Button>
                            </CardContent>
                          </Card>
                        )
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {CATEGORIES.map((category) => {
                            const categoryHabits = habits.filter(h => h.category === category);
                            return (
                              <Card key={category} className="relative overflow-hidden">
                                <CardContent className="p-6">
                                  <h3 className="text-lg font-semibold mb-2">{category}</h3>
                                  <p className="text-sm text-gray-500 mb-4">
                                    {categoryHabits.length} habit{categoryHabits.length !== 1 ? 's' : ''}
                                  </p>
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setSelectedCategory(category)}
                                  >
                                    View Habits
                                  </Button>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
      <Dialog open={showAddHabitDialog} onOpenChange={setShowAddHabitDialog}>
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
