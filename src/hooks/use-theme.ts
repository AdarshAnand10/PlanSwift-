
'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeProviderContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const value: ThemeContextType = { theme, setTheme };

  return React.createElement(
    ThemeProviderContext.Provider,
    { value },
    children
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
