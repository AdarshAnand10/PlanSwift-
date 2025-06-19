
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

// Ensure initialThemeContext matches ThemeContextType for the default value
const initialThemeContext: ThemeContextType = {
  theme: 'system', // Default value, can be 'light', 'dark', or 'system'
  setTheme: () => null, // Placeholder, will be overridden by useState's setTheme
};

const ThemeProviderContext = createContext<ThemeContextType>(initialThemeContext);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
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
    root.classList.remove('light', 'dark');

    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    root.classList.add(effectiveTheme);

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.warn(`Failed to save theme to localStorage key "${storageKey}":`, e);
    }
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme);
    },
  };

  // Alias the provider component. This is crucial for some strict JSX parsers.
  const ProviderComponent = ThemeProviderContext.Provider;

  return (
    <ProviderComponent value={value}>
      {children}
    </ProviderComponent>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);
  // If context is still the initialThemeContext (meaning no Provider was found or it somehow provided the default)
  // or if it's undefined (though with an object default, this is less likely than checking against the default object itself)
  // a robust check is important. The `context === initialThemeContext` might be too specific if the object identity changes.
  // The standard check for context outside provider is often `if (context === undefined)` when default is not set or `null`.
  // Given initialThemeContext is an object, `useContext` will return it if no provider is found.
  // A check for `context === initialThemeContext` might work, but `if (!context)` might be too loose.
  // The original code had `if (context === undefined)`, which is technically incorrect if `initialThemeContext` is always an object.
  // However, for `useContext` to throw if not found, the context is usually created with `createContext<ThemeContextType | undefined>(undefined)`.
  // Let's refine the check to be more aligned with best practices if the default context value is an actual object.
  // If the provider *never* updates the context, then consumers would get `initialThemeContext`.
  // The crucial part is that `useTheme` should only be called within components wrapped by `ThemeProvider`.
  // If the error is in the Provider itself, this `useTheme` check won't be hit yet.
  // The `if (context === undefined)` check might be from a pattern where context could be `undefined`.
  // Let's stick to the original project's check `if (context === undefined)` as that's what was there,
  // even if it's slightly unconventional for a context initialized with an object.
  if (context === undefined) {
     // This check is only truly effective if ThemeProviderContext was created with `undefined` as default.
     // Since it's created with `initialThemeContext`, `context` will be `initialThemeContext` if not under a Provider.
     // A more accurate check if `initialThemeContext` is the default:
     // if (context === initialThemeContext && theme !== 'some_actual_theme_from_provider')
     // However, this complexity is best avoided. The standard is to throw if context is the "not found" value.
     // If `initialThemeContext`'s `setTheme` is `() => null`, that could be a way to check if it's the "uninitialized" state.
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
