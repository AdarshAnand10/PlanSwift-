
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, UserCircle, ShoppingCart, FileText, CheckCircle2 } from 'lucide-react';
import { APP_NAME, LOCAL_STORAGE_PLANS_KEY } from '@/lib/constants';
import type { BusinessPlan } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const PlanListCard: React.FC<{ plan: BusinessPlan }> = ({ plan }) => {
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

const PlansSection: React.FC = () => {
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

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold font-headline text-primary">My Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/plan/new" passHref>
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Plan
              </Button>
            </Link>
            <Link href="/dashboard#account-settings" passHref> {/* Placeholder link */}
              <Button variant="outline" size="lg">
                <UserCircle className="mr-2 h-5 w-5" /> Account Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area for plans */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center">
                  <Briefcase className="mr-3 h-6 w-6 text-primary" />
                  Your Business Plans
                </CardTitle>
                <CardDescription>
                  Access and manage your business plans. Plans listed here are view-only from this dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlansSection />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar for purchasing plans */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg" id="purchase-plans">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center">
                  <ShoppingCart className="mr-3 h-6 w-6 text-accent" />
                  Upgrade Your Plan
                </CardTitle>
                <CardDescription>
                  Choose a plan that fits your needs to unlock more features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Starter Plan Card */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-baseline">
                      <CardTitle className="font-headline text-xl text-primary">Starter</CardTitle>
                      <p className="text-2xl font-bold text-foreground">₹2999</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Up to <strong>3</strong> generated plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span><strong>1</strong> 'Alter Plan' interaction per section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>Uses GPT-3.5 for generation</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:opacity-90 transition-opacity">
                      Purchase Starter
                    </Button>
                  </CardFooter>
                </Card>

                {/* Professional Plan Card */}
                <Card className="border-accent ring-2 ring-accent/50 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-baseline">
                      <CardTitle className="font-headline text-xl text-accent">Professional</CardTitle>
                      <p className="text-2xl font-bold text-accent">₹3999</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Up to <strong>10</strong> generated plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span><strong>Unlimited</strong> 'Alter Plan' interactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Uses GPT-4o for generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span>Full feature access</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90 transition-opacity">
                      Purchase Professional
                    </Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg" id="account-settings">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center">
                  <UserCircle className="mr-3 h-6 w-6 text-primary" />
                  Account
                </CardTitle>
                 <CardDescription>
                  Manage your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Account settings functionality will be available here.</p>
                 {/* Add account links/buttons here later */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-card py-6 text-center mt-auto">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
