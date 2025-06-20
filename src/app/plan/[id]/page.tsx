
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/shared/Header';
import PlanDisplay from '@/components/features/plan/PlanDisplay';
import LanguageSelector from '@/components/features/plan/LanguageSelector';
import ExportButtons from '@/components/features/plan/ExportButtons';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { BusinessPlan } from '@/types';
import { alterPlanSection } from '@/ai/flows/alter-plan-section';
import { translateBusinessPlan } from '@/ai/flows/translate-business-plan';
import { LOCAL_STORAGE_PLANS_KEY, APP_NAME, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/lib/constants';
import { ArrowLeft, Lock, Info } from 'lucide-react';
import { parseMarkdownToSections } from '@/lib/utils';


export default function PlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const planId = typeof params.id === 'string' ? params.id : undefined;

  const [plans, setPlans] = useLocalStorage<BusinessPlan[]>(LOCAL_STORAGE_PLANS_KEY, []);
  const [currentPlan, setCurrentPlan] = useState<BusinessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [alteringSectionId, setAlteringSectionId] = useState<string | null>(null);
  
  // Simulate user's plan status. Default to 'free' to show the locked state.
  // In a real app, this would come from user authentication context.
  const [userPlanStatus, setUserPlanStatus] = useState<'free' | 'paid'>('free');
  const isLocked = userPlanStatus === 'free';

  useEffect(() => {
    if (planId && plans) {
      const foundPlan = plans.find(p => p.id === planId);
      if (foundPlan) {
        setCurrentPlan(foundPlan);
      } else {
        toast({ title: "Error", description: "Business plan not found.", variant: "destructive" });
        // Optionally redirect: router.push('/dashboard');
      }
    }
    setIsLoading(false);
  }, [planId, plans, toast, router]);

  const updatePlanInStorage = useCallback((updatedPlan: BusinessPlan) => {
    const updatedPlans = plans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
    setPlans(updatedPlans);
    setCurrentPlan(updatedPlan);
  }, [plans, setPlans]);

  const handleSectionUpdate = useCallback((sectionId: string, newContent: string) => {
    if (isLocked) {
      toast({ title: "Upgrade to Edit", description: "You need to upgrade to a paid plan to save changes.", variant: "destructive" });
      return;
    }
    if (currentPlan) {
      const updatedSections = currentPlan.sections.map(sec =>
        sec.id === sectionId ? { ...sec, content: newContent } : sec
      );
      const fullPlanMarkdown = updatedSections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n\n');
      const updatedPlan = { ...currentPlan, sections: updatedSections, fullPlanMarkdown, updatedAt: new Date().toISOString() };
      updatePlanInStorage(updatedPlan);
      toast({ title: "Section Saved", description: `${currentPlan.sections.find(s => s.id === sectionId)?.title} has been updated.` });
    }
  }, [currentPlan, updatePlanInStorage, toast, isLocked]);

  const handleAlterSection = async (sectionId: string, command: string) => {
    if (isLocked) {
      toast({ title: "Upgrade to Use AI", description: "You need to upgrade to a paid plan to use AI editing.", variant: "destructive" });
      return;
    }
    if (!currentPlan) return;
    const sectionToAlter = currentPlan.sections.find(s => s.id === sectionId);
    if (!sectionToAlter) return;

    setAlteringSectionId(sectionId);
    try {
      const result = await alterPlanSection({
        planSection: sectionToAlter.content,
        userCommand: command,
      });
      if (result && result.modifiedPlanSection) {
        handleSectionUpdate(sectionId, result.modifiedPlanSection);
        toast({ title: "AI Edit Applied", description: `Section "${sectionToAlter.title}" was successfully altered by AI.` });
      } else {
        throw new Error("AI did not return modified content.");
      }
    } catch (error) {
      console.error("Failed to alter section with AI:", error);
      toast({
        title: "AI Edit Failed",
        description: (error instanceof Error ? error.message : String(error)) || "Could not apply AI edit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAlteringSectionId(null);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    if (isLocked) {
      toast({ title: "Upgrade to Translate", description: "You need to upgrade to a paid plan to translate your plan.", variant: "destructive" });
      return;
    }
    if (!currentPlan || !currentPlan.fullPlanMarkdown) return;
    if (currentPlan.language === newLanguage) return;

    setIsTranslating(true);
    try {
      const result = await translateBusinessPlan({
        businessPlan: currentPlan.fullPlanMarkdown,
        language: newLanguage,
      });
      if (result && result.translatedPlan) {
        const translatedSections = parseMarkdownToSections(result.translatedPlan);
        const updatedPlan = { 
          ...currentPlan, 
          language: newLanguage, 
          sections: translatedSections, 
          fullPlanMarkdown: result.translatedPlan,
          updatedAt: new Date().toISOString() 
        };
        updatePlanInStorage(updatedPlan);
        toast({ title: "Plan Translated", description: `Business plan translated to ${SUPPORTED_LANGUAGES.find(l => l.code === newLanguage)?.name}.` });
      } else {
        throw new Error("AI did not return translated content.");
      }
    } catch (error) {
      console.error("Failed to translate plan:", error);
      toast({
        title: "Translation Failed",
        description: (error instanceof Error ? error.message : String(error)) || "Could not translate the business plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleExportPDF = () => {
    if (isLocked) {
        toast({ title: "Upgrade to Export", description: "You need to upgrade to a paid plan to export as PDF.", variant: "destructive" });
        return;
    }
    if (!currentPlan) return;
    toast({
      title: "Exporting PDF...",
      description: `Generating PDF for "${currentPlan.name}".`,
    });
    
    const element = document.createElement("a");
    const file = new Blob([currentPlan.fullPlanMarkdown || ''], {type: 'application/pdf'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentPlan.name.replace(/\s+/g, '_')}_${currentPlan.language}.pdf`;
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };


  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingSpinner size={64} />
        <p className="mt-4 text-lg text-primary">Loading plan...</p>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Plan Not Found</h1>
          <p className="text-muted-foreground mb-6">The business plan you are looking for does not exist or could not be loaded.</p>
          <Button onClick={() => router.push('/dashboard')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
           {/* Demo toggle to switch between free/paid views */}
           <div className="mb-6 p-4 rounded-lg bg-secondary border border-primary/20 flex flex-col items-center text-center shadow-sm">
             <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                <p className="font-semibold text-primary">
                  DEMO ONLY: You are currently on the '{userPlanStatus}' plan.
                </p>
             </div>
             <Button
               size="sm"
               variant="link"
               className="text-accent-foreground hover:text-accent-foreground/80"
               onClick={() => setUserPlanStatus(userPlanStatus === 'free' ? 'paid' : 'free')}
             >
               Switch to '{userPlanStatus === 'free' ? 'paid' : 'free'}' view
             </Button>
           </div>
           
          <div className="mb-8">
            <Button onClick={() => router.push('/dashboard')} variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-2">
              {currentPlan.name}
              {isLocked && <Lock className="w-7 h-7 text-accent" />}
            </h1>
            <p className="text-lg text-muted-foreground">Company: {currentPlan.companyName}</p>
            <p className="text-sm text-muted-foreground">Industry: {currentPlan.industry} | Last Updated: {new Date(currentPlan.updatedAt).toLocaleDateString()}</p>

          </div>

          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-input-border rounded-lg bg-card shadow">
            <LanguageSelector
              currentLanguage={currentPlan.language || DEFAULT_LANGUAGE}
              onLanguageChange={handleLanguageChange}
              disabled={isTranslating || !!alteringSectionId || isLocked}
            />
            <ExportButtons
              planName={currentPlan.name}
              onExportPDF={handleExportPDF}
              disabled={isTranslating || !!alteringSectionId || isLocked}
            />
          </div>

          {isTranslating && (
            <div className="my-4 p-4 border border-primary/50 rounded-md bg-primary/10 text-center">
              <LoadingSpinner size={24} className="inline-block mr-2"/>
              <span className="text-primary font-medium">Translating plan, please wait...</span>
            </div>
          )}

          <PlanDisplay
            plan={currentPlan}
            isLocked={isLocked}
            onSectionUpdate={handleSectionUpdate}
            onSectionAlter={handleAlterSection}
            isAlteringSection={(sectionId) => alteringSectionId === sectionId}
          />
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
