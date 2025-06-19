
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const initialState: ThemeContextType = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeContextType>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props // Kept for potential future use, matches next-themes structure
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      return localStorage.getItem(storageKey) || defaultTheme;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return defaultTheme;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme = theme;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      effectiveTheme = systemTheme;
    }

    root.classList.add(effectiveTheme);

    try {
      localStorage.setItem(storageKey, theme); // Store the user's preference (system, light, or dark)
    } catch (e) {
      console.error('Error setting localStorage:', e);
    }
  }, [theme, storageKey]);

  const value: ThemeContextType = {
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme);
    },
  };

  return React.createElement(
    ThemeProviderContext.Provider,
    { value: value, ...props }, // Spread props here
    children
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined || context === initialState && initialState.setTheme === (() => null)) {
    // The initialState check is a bit more robust for the default
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
