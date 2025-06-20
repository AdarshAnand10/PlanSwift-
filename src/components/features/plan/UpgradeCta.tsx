
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star } from 'lucide-react';
import Link from 'next/link';

const UpgradeCta = () => {
  return (
    <Card className="mt-8 bg-gradient-to-br from-secondary/50 to-background shadow-xl border-primary/50">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-headline mt-4">Unlock Your Full Business Plan</CardTitle>
        <CardDescription>
          You are currently viewing a preview. Upgrade your plan to unlock all sections, editing, and export features.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
         <Link href="/dashboard#purchase-plans" passHref>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:opacity-90 transition-opacity">
                <Star className="mr-2 h-5 w-5" /> Upgrade to Pro
            </Button>
        </Link>
        <Link href="/dashboard#purchase-plans" passHref>
             <Button size="lg" variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UpgradeCta;
