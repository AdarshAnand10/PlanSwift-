import Link from 'next/link';
import { FileText } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

const Header = () => {
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
          {/* Future navigation links can go here, e.g., Dashboard, Profile */}
          {/* <Link href="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground">
            Dashboard
          </Link> */}
        </nav>
