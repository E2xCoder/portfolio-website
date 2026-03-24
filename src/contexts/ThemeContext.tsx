"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Güvenli localStorage helper
const safeStorage = {
  get: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      if (typeof window.localStorage === 'undefined') return null;
      if (typeof window.localStorage.getItem !== 'function') return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      if (typeof window === 'undefined') return;
      if (typeof window.localStorage === 'undefined') return;
      if (typeof window.localStorage.setItem !== 'function') return;
      window.localStorage.setItem(key, value);
    } catch {
      // sessizce geç
    }
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = safeStorage.get('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
      setTheme(systemPreference);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    safeStorage.set('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}