
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Default context value. Consumers will get this if not wrapped in a Provider.
const initialThemeContext: ThemeContextType = {
  theme: 'system', // Default to system, will be resolved in provider
  setTheme: () => null, // Placeholder function
};

const ThemeProviderContext = createContext<ThemeContextType>(initialThemeContext);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme || defaultTheme;
    } catch (e) {
      // If localStorage is unavailable or reading fails
      console.warn(`Failed to read theme from localStorage key "${storageKey}":`, e);
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark');

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Add the current effective theme class
    root.classList.add(effectiveTheme);

    // Persist the selected theme (even if it's 'system') to localStorage
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.warn(`Failed to save theme to localStorage key "${storageKey}":`, e);
    }
  }, [theme, storageKey]); // Rerun effect if theme or storageKey changes

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  // Alias the provider component to ensure JSX compatibility
  const ProviderComponent = ThemeProviderContext.Provider;

  return (
    <ProviderComponent value={value}>
      {children}
    </ProviderComponent>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);
  // Check if the context is the initial placeholder or genuinely undefined
  if (context === undefined || context === initialThemeContext) { 
     throw new Error('useTheme must be used within a ThemeProvider that provides a valid context value');
  }
  return context;
};
