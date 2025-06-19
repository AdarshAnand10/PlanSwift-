
'use client';

import React from 'react';
import { ThemeProvider } from '@/hooks/use-theme';

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="planshift-ai-theme">
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
