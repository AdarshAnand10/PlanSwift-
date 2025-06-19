
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import IndustryTemplateSelector from './IndustryTemplateSelector';
import { INDUSTRIES } from '@/lib/constants';
import type { GeneratePlanFormValues, IndustryTemplate } from '@/types';
import { Lightbulb, Building, Briefcase, Target, Users, BarChart, Coins, FileSignature } from 'lucide-react';

const formSchema = z.object({
  planName: z.string().min(3, { message: "Plan name must be at least 3 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  industryTemplateId: z.string().min(1, { message: "Please select an industry." }),
  missionStatement: z.string().min(10, { message: "Mission statement is too short." }).max(500),
  valueProposition: z.string().min(10, { message: "Value proposition is too short." }).max(500),
  targetMarket: z.string().min(10, { message: "Target market description is too short." }).max(500),
  competitiveLandscape: z.string().min(10, { message: "Competitive landscape description is too short." }).max(500),
  financialProjections: z.string().min(10, { message: "Financial projections description is too short." }).max(500),
  managementTeam: z.string().min(10, { message: "Management team description is too short." }).max(500),
  fundingRequest: z.string().min(10, { message: "Funding request description is too short." }).max(500),
});

interface PlanGeneratorFormProps {
  onSubmit: (data: GeneratePlanFormValues) => void;
  isLoading: boolean;
}

const PlanGeneratorForm: React.FC<PlanGeneratorFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<GeneratePlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: '',
      companyName: '',
      industryTemplateId: INDUSTRIES[0]?.id || '',
      missionStatement: INDUSTRIES[0]?.predefinedInputs.missionStatement || '',
      valueProposition: INDUSTRIES[0]?.predefinedInputs.valueProposition || '',
      targetMarket: INDUSTRIES[0]?.predefinedInputs.targetMarket || '',
      competitiveLandscape: INDUSTRIES[0]?.predefinedInputs.competitiveLandscape || '',
      financialProjections: INDUSTRIES[0]?.predefinedInputs.financialProjections || '',
      managementTeam: INDUSTRIES[0]?.predefinedInputs.managementTeam || '',
      fundingRequest: INDUSTRIES[0]?.predefinedInputs.fundingRequest || '',
    },
  });

  const selectedIndustryTemplateId = form.watch('industryTemplateId');

  useEffect(() => {
    const selectedTemplate = INDUSTRIES.find(t => t.id === selectedIndustryTemplateId);
    if (selectedTemplate?.predefinedInputs) {
      form.reset({
        ...form.getValues(), // keep existing values for planName, companyName
        industryTemplateId: selectedIndustryTemplateId, // ensure this is set
        missionStatement: selectedTemplate.predefinedInputs.missionStatement || '',
        valueProposition: selectedTemplate.predefinedInputs.valueProposition || '',
        targetMarket: selectedTemplate.predefinedInputs.targetMarket || '',
        competitiveLandscape: selectedTemplate.predefinedInputs.competitiveLandscape || '',
        financialProjections: selectedTemplate.predefinedInputs.financialProjections || '',
        managementTeam: selectedTemplate.predefinedInputs.managementTeam || '',
        fundingRequest: selectedTemplate.predefinedInputs.fundingRequest || '',
      });
    }
  }, [selectedIndustryTemplateId, form]);
  
  const renderFormField = (name: keyof GeneratePlanFormValues, label: string, placeholder: string, Icon: React.ElementType, isTextarea: boolean = false) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-md"><Icon className="w-5 h-5 text-primary" /> {label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea placeholder={placeholder} {...field} rows={3} className="resize-none" />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><FileSignature className="w-7 h-7 text-primary"/> Basic Plan Information</CardTitle>
            <CardDescription>Let's start with the essentials for your new business plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderFormField("planName", "Plan Name", "e.g., My Awesome Tech Startup Plan", FileSignature)}
            {renderFormField("companyName", "Company Name", "e.g., Innovatech Solutions Inc.", Building)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Briefcase className="w-7 h-7 text-primary"/> Industry & Focus</CardTitle>
            <CardDescription>Select an industry template to pre-fill some common details, or customize as you go.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="industryTemplateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Industry Template</FormLabel>
                  <FormControl>
                    <IndustryTemplateSelector
                      selectedTemplateId={field.value}
                      onSelectTemplate={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Lightbulb className="w-7 h-7 text-primary"/> Core Business Details</CardTitle>
            <CardDescription>Provide details about your company's mission, value, market, and competition. These will be used by the AI to generate your plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderFormField("missionStatement", "Mission Statement", "What is your company's core purpose?", Lightbulb, true)}
            {renderFormField("valueProposition", "Value Proposition", "What unique value do you offer to customers?", Target, true)}
            {renderFormField("targetMarket", "Target Market", "Who are your primary customers?", Users, true)}
            {renderFormField("competitiveLandscape", "Competitive Landscape", "Who are your main competitors and what are their strengths/weaknesses?", BarChart, true)}
            {renderFormField("financialProjections", "Financial Projections Summary", "Briefly outline your key financial goals or forecasts.", Coins, true)}
            {renderFormField("managementTeam", "Management Team Overview", "Highlight key members and their expertise.", Users, true)}
            {renderFormField("fundingRequest", "Funding Request Summary (if any)", "Briefly state your funding needs and purpose.", Coins, true)}
          </CardContent>
        </Card>
        
        <CardFooter className="flex justify-end pt-6">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? 'Generating Plan...' : 'Generate Business Plan'}
            {!isLoading && <Lightbulb className="ml-2 h-5 w-5" />}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default PlanGeneratorForm;
