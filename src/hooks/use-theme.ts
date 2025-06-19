
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// This is the initial state provided to createContext.
// It ensures 'context' in useTheme is never undefined.
const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null, // Default no-op function
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Guard against window being undefined during SSR or build time
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      const item = window.localStorage.getItem(storageKey) as Theme | null;
      return item ? item : defaultTheme;
    } catch (error) {
      // Log error but don't break execution
      console.error('Error reading theme from localStorage', error);
      return defaultTheme;
    }
  });

  useEffect(() => {
    // Guard against window being undefined
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme = theme;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      // Ensure systemTheme is 'light' or 'dark'
      if (systemTheme === 'light' || systemTheme === 'dark') {
        root.classList.add(systemTheme);
      }
    } else {
      // Ensure theme is 'light' or 'dark'
       if (theme === 'light' || theme === 'dark') {
        root.classList.add(theme);
      }
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    // Guard against window being undefined
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.error('Error saving theme to localStorage', e);
      }
    }
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  // Alias the Provider component as suggested for stricter JSX parsers
  const ProviderComponent = ThemeProviderContext.Provider;

  return (
    <ProviderComponent value={value}>
      {children}
    </ProviderComponent>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  // This check is from the user's provided "current code" snapshot.
  // Given ThemeProviderContext is initialized with `initialState` (an object),
  // `context` will always be `initialState` if `useTheme` is called outside a
  // ThemeProvider. Thus, `context` will never be `undefined`.
  // However, to match the provided code structure, this check is included.
  if (context === undefined) { // This was the exact check in the user's file.
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
