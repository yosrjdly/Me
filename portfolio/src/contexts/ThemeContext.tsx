'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define our theme types
export type ThemeType = 'terminal' | 'linkedin' | 'messaging' | 'game';

// Define the context type
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'terminal',
  setTheme: () => {},
});

// Create a provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to terminal theme, but check localStorage on client
  const [theme, setTheme] = useState<ThemeType>('terminal');
  const [mounted, setMounted] = useState(false);

  // Only run this on the client
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Get theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType;
      
      // If there's a saved theme, use it
      if (savedTheme && ['terminal', 'linkedin', 'messaging', 'game'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }
    
    // Cleanup function
    return () => {
      setMounted(false);
    };
  }, []);

  // Update theme and save to localStorage
  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', newTheme);
      
      // Add or remove theme-specific classes from the body
      document.body.classList.remove('theme-terminal', 'theme-linkedin', 'theme-messaging', 'theme-game');
      document.body.classList.add(`theme-${newTheme}`);
    }
  };

  // Only render children after mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
} 