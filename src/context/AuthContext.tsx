
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  streakCount: number;
  avatarUrl: string;
  joinedAt: Date;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a user in localStorage
    const storedUser = localStorage.getItem('habitNationUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mocked login for now
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        level: 5,
        xp: 1250,
        streakCount: 7,
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        joinedAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('habitNationUser', JSON.stringify(mockUser));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mocked registration for now
      const mockUser: User = {
        id: '1',
        name,
        email,
        level: 1,
        xp: 0,
        streakCount: 0,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        joinedAt: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('habitNationUser', JSON.stringify(mockUser));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('habitNationUser');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
