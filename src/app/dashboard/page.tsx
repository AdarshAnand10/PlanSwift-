
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase, UserCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SiteFooter from '@/components/shared/Footer';
import PlansSection from '@/components/features/dashboard/PlansSection';
import PricingCard from '@/components/features/dashboard/PricingCard';

export default function DashboardPage() {
  const starterFeatures = [
    "Up to <strong>3</strong> generated plans",
    "<strong>1</strong> 'Alter Plan' interaction per section",
    "Uses GPT-3.5 for generation"
  ];

  const professionalFeatures = [
    "Up to <strong>10</strong> generated plans",
    "<strong>Unlimited</strong> 'Alter Plan' interactions",
    "Uses GPT-4o for generation",
    "Full feature access"
  ];

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
            <Link href="/dashboard#account-settings" passHref>
              <Button variant="outline" size="lg">
                <UserCircle className="mr-2 h-5 w-5" /> Account Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline flex items-center">
                  <Briefcase className="mr-3 h-6 w-6 text-primary" />
                  Your Business Plans
                </CardTitle>
                <CardDescription>
                  Access and manage your business plans. Click 'View Plan' to see details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlansSection />
              </CardContent>
            </Card>
          </div>

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
                <PricingCard
                  planName="Starter"
                  price="₹2999"
                  features={starterFeatures}
                  buttonText="Purchase Starter"
                  buttonGradient="bg-gradient-to-r from-yellow-500 to-red-500"
                />
                <PricingCard
                  planName="Professional"
                  price="₹3999"
                  features={professionalFeatures}
                  isFeatured={true}
                  buttonText="Purchase Professional"
                  buttonGradient="bg-gradient-to-r from-purple-500 to-indigo-600"
                />
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
