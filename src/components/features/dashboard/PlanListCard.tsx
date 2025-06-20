
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BusinessPlan } from '@/types';
import { FileText } from 'lucide-react';

export default function PlanListCard({ plan }: { plan: BusinessPlan }) {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{plan.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Company: {plan.companyName} | Industry: {plan.industry}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/plan/${plan.id}`} passHref>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Plan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
