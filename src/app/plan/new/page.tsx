
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateBusinessPlan } from '@/ai/flows/generate-business-plan';
import type { GenerateBusinessPlanInput } from '@/ai/flows/generate-business-plan';
import PlanGeneratorForm from '@/components/features/plan/PlanGeneratorForm';
import Header from '@/components/shared/Header';
import { useToast } from '@/hooks/use-toast';
import type { BusinessPlan, GeneratePlanFormValues } from '@/types';
import { generateUniqueId, parseMarkdownToSections } from '@/lib/utils';
import { LOCAL_STORAGE_PLANS_KEY, INDUSTRIES, DEFAULT_LANGUAGE, APP_NAME } from '@/lib/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewPlanPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useLocalStorage<BusinessPlan[]>(LOCAL_STORAGE_PLANS_KEY, []);

  const handleSubmit = async (data: GeneratePlanFormValues) => {
    setIsLoading(true);
    try {
      const selectedTemplate = INDUSTRIES.find(t => t.id === data.industryTemplateId);
      if (!selectedTemplate) {
        toast({ title: "Error", description: "Invalid industry template selected.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      
      const aiInput: GenerateBusinessPlanInput = {
        companyName: data.companyName,
        industry: selectedTemplate.predefinedInputs.industry || data.industryTemplateId,
        missionStatement: data.missionStatement,
        valueProposition: data.valueProposition,
        targetMarket: data.targetMarket,
        competitiveLandscape: data.competitiveLandscape,
        financialProjections: data.financialProjections,
        managementTeam: data.managementTeam,
        fundingRequest: data.fundingRequest,
      };

      const result = await generateBusinessPlan(aiInput);
      
      if (result && result.businessPlan) {
        const newPlanId = generateUniqueId();
        const currentDate = new Date().toISOString();
        const parsedSections = parseMarkdownToSections(result.businessPlan);

        const newBusinessPlan: BusinessPlan = {
          id: newPlanId,
          name: data.planName,
          companyName: data.companyName,
          industry: selectedTemplate.name,
          missionStatement: data.missionStatement,
          valueProposition: data.valueProposition,
          targetMarket: data.targetMarket,
          competitiveLandscape: data.competitiveLandscape,
          financialProjections: data.financialProjections,
          managementTeam: data.managementTeam,
          fundingRequest: data.fundingRequest,
          language: DEFAULT_LANGUAGE,
          sections: parsedSections,
          fullPlanMarkdown: result.businessPlan,
          createdAt: currentDate,
          updatedAt: currentDate,
        };

        setPlans([...(plans || []), newBusinessPlan]);
        toast({ title: "Success!", description: "Your new business plan has been generated." });
        router.push(`/plan/${newPlanId}`);
      } else {
        throw new Error("AI did not return a business plan.");
      }
    } catch (error) {
      console.error("Failed to generate business plan:", error);
      toast({
        title: "Generation Failed",
        description: (error instanceof Error ? error.message : String(error)) || "Could not generate the business plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline text-primary">{APP_NAME}</h1>
            <p className="mt-2 text-xl text-muted-foreground">Let's craft your new business plan!</p>
            <p className="mt-1 text-sm text-muted-foreground">Fill in the details below. Our AI will generate a first draft for you.</p>
          </div>
          {isLoading && (
            <div className="fixed inset-0 bg-background/80 flex flex-col items-center justify-center z-50">
              <LoadingSpinner size={64} />
              <p className="mt-4 text-lg text-primary font-semibold">Generating your plan, please wait...</p>
              <p className="text-muted-foreground">This might take a moment.</p>
            </div>
          )}
          <PlanGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
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
