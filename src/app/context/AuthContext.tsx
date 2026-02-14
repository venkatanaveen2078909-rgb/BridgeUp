import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

// Application-specific user data
interface User {
  id: string;
  email: string;
  name: string;
  initials: string;
  misScore: number;
  level: string;
  streak: number;
  location?: string;
  joined?: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const mapUser = (apiUser: any): User => {
    const name = apiUser.fullName || apiUser.email.split('@')[0];
    const initials = (name.split(' ').map((n: string) => n[0]).join('') || 'U').toUpperCase().slice(0, 2);

    return {
      id: apiUser.id,
      email: apiUser.email,
      name,
      initials,
      misScore: 0,
      level: 'Newcomer',
      streak: 0,
      location: 'Your City',
      joined: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.auth.signin({ email, password });
      if (data.token) {
        setToken(data.token);
        setUser(mapUser(data.user));
        return { error: null };
      } else {
        return { error: { message: data.message || 'Login failed' } };
      }
    } catch (err: any) {
      return { error: { message: err.message || 'Network error' } };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const data = await api.auth.signup({ email, password, fullName: name });
      if (data.token) {
        setToken(data.token);
        setUser(mapUser(data.user));
        return { error: null };
      } else {
        return { error: { message: data.message || 'Signup failed' } };
      }
    } catch (err: any) {
      return { error: { message: err.message || 'Network error' } };
    }
  };

  const signInWithGoogle = async () => {
    console.warn('Google Auth not implemented in Express backend yet');
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
