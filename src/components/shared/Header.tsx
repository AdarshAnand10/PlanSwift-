
'use client';

import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
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
        <Link href="/" className="flex items-center gap-1 text-2xl font-bold font-headline">
          <span className="text-primary">Plan</span>
          <span className="bg-gradient-to-r from-yellow-500 via-red-600 to-red-700 bg-clip-text text-transparent">
            Insta
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* Example: Link to dashboard, conditionally render if authenticated in future */}
          {/* <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link> */}
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
