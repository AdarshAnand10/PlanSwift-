'use client';

import React from 'react';
// Import any global context providers here if needed in the future
// e.g., ThemeProvider, AuthProvider

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // For now, it's a simple pass-through. It can be extended later.
  return <>{children}</>;
};

export default AppProviders;