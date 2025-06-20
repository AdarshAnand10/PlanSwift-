
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase } from 'lucide-react';
import { LOCAL_STORAGE_PLANS_KEY } from '@/lib/constants';
import type { BusinessPlan } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlanListCard from './PlanListCard';

export default function PlansSection() {
  const [plans] = useLocalStorage<BusinessPlan[]>(LOCAL_STORAGE_PLANS_KEY, []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a skeleton loader on the server and initial client render to avoid hydration mismatch
    return (
      <div className="space-y-4">
        <div className="h-24 w-full rounded-lg bg-muted/50 animate-pulse"></div>
        <div className="h-24 w-full rounded-lg bg-muted/50 animate-pulse"></div>
        <div className="h-24 w-full rounded-lg bg-muted/50 animate-pulse"></div>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-border rounded-lg">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Business Plans Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">Get started by creating your first business plan.</p>
        <Link href="/plan/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Plan
          </Button>
        </Link>
      </div>
    );
  }

  const sortedPlans = [...plans].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {sortedPlans.map((plan) => (
          <PlanListCard key={plan.id} plan={plan} />
        ))}
      </div>
    </ScrollArea>
  );
}
