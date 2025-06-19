
'use client';

import Link from 'next/link';
import { FileText, Moon, Sun } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // If current theme is system, determine what to toggle to based on actual resolved system theme
    // Otherwise, just toggle between light and dark
    let currentEffectiveTheme = theme;
    if (theme === 'system' && typeof window !== 'undefined') {
        currentEffectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (currentEffectiveTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold font-headline text-primary">
          <FileText className="h-7 w-7 text-accent" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
