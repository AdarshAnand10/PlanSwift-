
'use client';

import { APP_NAME } from '@/lib/constants';
import React, { useState, useEffect } from 'react';

const SiteFooter = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentYear = new Date().getFullYear();

  // Render a placeholder on the server and the initial client render,
  // then the actual content after mounting. This prevents any hydration mismatch
  // if the server and client are in different years (e.g., around New Year's Eve).
  return (
    <footer className="border-t bg-card py-6 text-center mt-auto">
      <p className="text-sm text-muted-foreground">
        {isMounted ? `© ${currentYear} ${APP_NAME}. All rights reserved.` : `\u00A0`}
      </p>
    </footer>
  );
};

export default SiteFooter;
