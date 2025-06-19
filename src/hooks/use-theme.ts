
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

// Create an alias for the provider component with a capitalized name
const ProviderComponent = ThemeProviderContext.Provider;

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'planshift-ai-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      return storedTheme || defaultTheme;
    } catch (e) {
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
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = systemPrefersDark ? 'dark' : 'light';
    }
    
    // Add the current effective theme class
    root.classList.add(effectiveTheme);

    // Persist the selected theme (even if it's 'system') to localStorage
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.warn(`Failed to save theme to localStorage key "${storageKey}":`, e);
    }
  }, [theme, storageKey]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ProviderComponent value={value}>
      {children}
    </ProviderComponent>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);
  // Check if the context is the initial placeholder or genuinely undefined after provider mounts
  if (context === undefined || context === initialThemeContext && typeof window !== 'undefined') { 
     // Check typeof window to ensure this error isn't thrown during SSR if context hasn't resolved yet
     // but it should generally be available client-side if ThemeProvider is wrapping the app.
     throw new Error('useTheme must be used within a ThemeProvider that provides a valid context value');
  }
  // If context is initialThemeContext but it's SSR and window is undefined,
  // it's okay for now, it will re-render on client.
  // This primarily guards against client-side misuse.
  return context;
};
